import { useEffect, useState } from 'react'
import { adminApi } from './lib/adminApi'
import { Button, Card, Field, Input, Textarea } from './ui'
import { useAuth } from '../auth/AuthContext'

const linesToPairs = (text, keys) =>
  text
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean)
    .map((l) => {
      const parts = l.split('|').map((p) => p.trim())
      return Object.fromEntries(keys.map((k, i) => [k, parts[i] || '']))
    })

const pairsToLines = (arr = [], keys) => arr.map((o) => keys.map((k) => o[k]).join(' | ')).join('\n')
const linesToArr = (t) => t.split('\n').map((s) => s.trim()).filter(Boolean)
const arrToLines = (a = []) => a.join('\n')

export default function SiteSettingsPage() {
  const { isAdmin } = useAuth()
  const [s, setS] = useState(null)
  const [status, setStatus] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    adminApi.getSettings().then(setS)
  }, [])

  if (!s) return <p className="text-sm text-slate">Loading…</p>

  const brand = s.brand || {}
  const hero = s.hero || {}
  const hireMe = s.hireMe || {}
  const about = s.about || {}
  const seo = s.seo || {}

  const setBrand = (k) => (e) => setS((p) => ({ ...p, brand: { ...p.brand, [k]: e.target.value } }))
  const setHero = (k) => (e) => setS((p) => ({ ...p, hero: { ...p.hero, [k]: e.target.value } }))
  const setHire = (k) => (e) => setS((p) => ({ ...p, hireMe: { ...p.hireMe, [k]: e.target.value } }))
  const setAbout = (k) => (e) => setS((p) => ({ ...p, about: { ...p.about, [k]: e.target.value } }))
  const setSeo = (k) => (e) => setS((p) => ({ ...p, seo: { ...p.seo, [k]: e.target.value } }))

  const save = async () => {
    setSaving(true)
    setStatus('')
    try {
      const patch = {
        brand: s.brand,
        footerBlurb: s.footerBlurb,
        nav: linesToPairs(s._navText ?? pairsToLines(s.nav, ['label', 'to']), ['label', 'to']).map((n, i) => ({
          ...n,
          order: i,
        })),
        trustedBy: linesToArr(s._trustedText ?? arrToLines(s.trustedBy)),
        commitments: linesToPairs(
          s._commitText ?? pairsToLines(s.commitments, ['title', 'description']),
          ['title', 'description'],
        ),
        hero: {
          ...s.hero,
          stats: linesToPairs(s._statsText ?? pairsToLines(s.hero?.stats, ['value', 'label']), ['value', 'label']),
        },
        hireMe: s.hireMe,
        about: {
          ...s.about,
          storyParagraphs: linesToArr(s._storyText ?? arrToLines(s.about?.storyParagraphs)),
        },
        seo: s.seo,
      }
      const updated = await adminApi.saveSettings(patch)
      setS(updated)
      setStatus('Saved. Refresh the public site to see changes.')
    } catch (e) {
      setStatus(e.message || 'Save failed')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-semibold text-ink">Site settings</h1>
        {isAdmin && (
          <Button onClick={save} disabled={saving}>
            {saving ? 'Saving…' : 'Save all'}
          </Button>
        )}
      </div>
      {!isAdmin && <p className="text-sm text-marigold-dark">You have editor access — site settings are read-only.</p>}
      {status && <p className="text-sm text-teal">{status}</p>}

      <Card title="Brand & contact">
        <div className="grid sm:grid-cols-2 gap-4">
          {['name', 'short', 'tagline', 'founder', 'location', 'domain', 'email', 'phone', 'whatsapp', 'googleReview', 'linkedin', 'github', 'instagram', 'instagramBusiness', 'facebook', 'freelancer'].map(
            (k) => (
              <Field key={k} label={k}>
                <Input value={brand[k] || ''} onChange={setBrand(k)} disabled={!isAdmin} />
              </Field>
            ),
          )}
        </div>
        <Field label="whatsapp" hint="digits only, with country code — e.g. 918791986336" />
      </Card>

      <Card title="Navigation & footer">
        <Field label="Nav items — one per line, format: Label | /path">
          <Textarea
            rows={7}
            defaultValue={pairsToLines(s.nav, ['label', 'to'])}
            onChange={(e) => setS((p) => ({ ...p, _navText: e.target.value }))}
            disabled={!isAdmin}
          />
        </Field>
        <Field label="Footer blurb">
          <Textarea value={s.footerBlurb || ''} onChange={(e) => setS((p) => ({ ...p, footerBlurb: e.target.value }))} disabled={!isAdmin} />
        </Field>
        <Field label="“Built & trusted by” — one name per line">
          <Textarea
            rows={6}
            defaultValue={arrToLines(s.trustedBy)}
            onChange={(e) => setS((p) => ({ ...p, _trustedText: e.target.value }))}
            disabled={!isAdmin}
          />
        </Field>
      </Card>

      <Card title="How I work — commitments">
        <Field label="One per line, format: Title | Description" hint="Shown on Home, Pricing and Start-a-project.">
          <Textarea
            rows={6}
            defaultValue={pairsToLines(s.commitments, ['title', 'description'])}
            onChange={(e) => setS((p) => ({ ...p, _commitText: e.target.value }))}
            disabled={!isAdmin}
          />
        </Field>
      </Card>

      <Card title="Home hero">
        <Field label="Status text (small line above headline)">
          <Input value={hero.statusText || ''} onChange={setHero('statusText')} disabled={!isAdmin} />
        </Field>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Headline — lead">
            <Input value={hero.titleLead || ''} onChange={setHero('titleLead')} disabled={!isAdmin} />
          </Field>
          <Field label="Headline — accent (coloured)">
            <Input value={hero.titleAccent || ''} onChange={setHero('titleAccent')} disabled={!isAdmin} />
          </Field>
        </div>
        <Field label="Description">
          <Textarea value={hero.description || ''} onChange={setHero('description')} disabled={!isAdmin} />
        </Field>
        <Field label="Stats — one per line, format: value | label">
          <Textarea
            rows={4}
            defaultValue={pairsToLines(hero.stats, ['value', 'label'])}
            onChange={(e) => setS((p) => ({ ...p, _statsText: e.target.value }))}
            disabled={!isAdmin}
          />
        </Field>
        <Field
          label="Hero image URL"
          hint="Leave blank to show the built-in illustration. Paste a URL to use a photo instead."
        >
          <Input value={hero.image || ''} onChange={setHero('image')} disabled={!isAdmin} placeholder="https://…" />
        </Field>
      </Card>

      <Card title="“Hire me” section (Home + About)">
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Eyebrow">
            <Input value={hireMe.eyebrow || ''} onChange={setHire('eyebrow')} disabled={!isAdmin} />
          </Field>
          <Field label="CTA label">
            <Input value={hireMe.ctaLabel || ''} onChange={setHire('ctaLabel')} disabled={!isAdmin} />
          </Field>
        </div>
        <Field label="Title">
          <Input value={hireMe.title || ''} onChange={setHire('title')} disabled={!isAdmin} />
        </Field>
        <Field label="Description">
          <Textarea rows={4} value={hireMe.description || ''} onChange={setHire('description')} disabled={!isAdmin} />
        </Field>
      </Card>

      <Card title="About page">
        <Field label="Hero title">
          <Input value={about.heroTitle || ''} onChange={setAbout('heroTitle')} disabled={!isAdmin} />
        </Field>
        <Field label="Hero description">
          <Textarea value={about.heroDescription || ''} onChange={setAbout('heroDescription')} disabled={!isAdmin} />
        </Field>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Story eyebrow">
            <Input value={about.storyEyebrow || ''} onChange={setAbout('storyEyebrow')} disabled={!isAdmin} />
          </Field>
          <Field label="Story title">
            <Input value={about.storyTitle || ''} onChange={setAbout('storyTitle')} disabled={!isAdmin} />
          </Field>
        </div>
        <Field label="Story paragraphs — one per line">
          <Textarea
            rows={6}
            defaultValue={arrToLines(about.storyParagraphs)}
            onChange={(e) => setS((p) => ({ ...p, _storyText: e.target.value }))}
            disabled={!isAdmin}
          />
        </Field>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Mission">
            <Textarea value={about.mission || ''} onChange={setAbout('mission')} disabled={!isAdmin} />
          </Field>
          <Field label="Vision">
            <Textarea value={about.vision || ''} onChange={setAbout('vision')} disabled={!isAdmin} />
          </Field>
        </div>
        <Field label="“Why trust” title">
          <Input value={about.trustTitle || ''} onChange={setAbout('trustTitle')} disabled={!isAdmin} />
        </Field>
        <Field label="“Why trust” description">
          <Textarea value={about.trustDescription || ''} onChange={setAbout('trustDescription')} disabled={!isAdmin} />
        </Field>
        <Field
          label="Story image URL"
          hint="Leave blank to show the built-in illustration. Paste a URL (e.g. an AI-generated portrait) to use a photo."
        >
          <Input value={about.image || ''} onChange={setAbout('image')} disabled={!isAdmin} placeholder="https://…" />
        </Field>
      </Card>

      <Card title="SEO / meta tags">
        <Field label="Page title">
          <Input value={seo.title || ''} onChange={setSeo('title')} disabled={!isAdmin} />
        </Field>
        <Field label="Meta description">
          <Textarea value={seo.description || ''} onChange={setSeo('description')} disabled={!isAdmin} />
        </Field>
        <Field label="OG title">
          <Input value={seo.ogTitle || ''} onChange={setSeo('ogTitle')} disabled={!isAdmin} />
        </Field>
        <Field label="OG description">
          <Textarea value={seo.ogDescription || ''} onChange={setSeo('ogDescription')} disabled={!isAdmin} />
        </Field>
      </Card>
    </div>
  )
}
