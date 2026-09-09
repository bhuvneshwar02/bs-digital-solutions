import { useState } from 'react'
import { Button, Field, Input, Textarea, inputClass } from '../ui'
import ImagePicker from './ImagePicker'
import { useContent } from '../../content/ContentContext'

const titleize = (s) => s.replace(/([A-Z])/g, ' $1').replace(/^./, (c) => c.toUpperCase())

function toFormValue(field, value) {
  if (field.type === 'list') return Array.isArray(value) ? value.join('\n') : value || ''
  if (field.type === 'tags') return Array.isArray(value) ? value.join(', ') : value || ''
  if (field.type === 'boolean') return Boolean(value)
  return value ?? ''
}

function fromFormValue(field, value) {
  if (field.type === 'list')
    return String(value)
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean)
  if (field.type === 'tags')
    return String(value)
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)
  if (field.type === 'boolean') return Boolean(value)
  return value
}

export default function EntityForm({ schema, initial, onSubmit, onCancel, saving }) {
  const content = useContent()
  const [form, setForm] = useState(() => {
    const base = {}
    for (const f of schema.fields) base[f.name] = toFormValue(f, initial?.[f.name])
    base.published = initial?.published ?? true
    return base
  })
  const [error, setError] = useState('')

  const set = (name) => (e) => {
    const value = e?.target?.type === 'checkbox' ? e.target.checked : e?.target?.value
    setForm((f) => ({ ...f, [name]: value }))
  }

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    const payload = { published: form.published }
    for (const f of schema.fields) payload[f.name] = fromFormValue(f, form[f.name])
    try {
      await onSubmit(payload)
    } catch (err) {
      setError(err.message || 'Save failed')
    }
  }

  const selectOptions = (from) => {
    if (from === 'serviceCategories') return content.serviceCategories.map((c) => ({ value: c.key, label: c.label }))
    return []
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-4">
      {schema.fields.map((f) => {
        const label = f.label || titleize(f.name)
        if (f.type === 'boolean') {
          return (
            <label key={f.name} className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={form[f.name]} onChange={set(f.name)} />
              {label}
            </label>
          )
        }
        return (
          <Field key={f.name} label={label + (f.required ? ' *' : '')} hint={f.hint}>
            {f.type === 'textarea' || f.type === 'list' ? (
              <Textarea rows={f.rows || (f.type === 'list' ? 6 : 3)} value={form[f.name]} onChange={set(f.name)} required={f.required} />
            ) : f.type === 'image' ? (
              <ImagePicker value={form[f.name]} onChange={(v) => setForm((s) => ({ ...s, [f.name]: v }))} />
            ) : f.type === 'select' ? (
              <select className={inputClass} value={form[f.name]} onChange={set(f.name)} required={f.required}>
                <option value="">— choose —</option>
                {selectOptions(f.from).map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            ) : (
              <Input value={form[f.name]} onChange={set(f.name)} required={f.required} />
            )}
          </Field>
        )
      })}

      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" checked={form.published} onChange={set('published')} />
        Published (visible on the live site)
      </label>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex gap-2 pt-2">
        <Button type="submit" disabled={saving}>
          {saving ? 'Saving…' : 'Save'}
        </Button>
        <Button type="button" variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  )
}
