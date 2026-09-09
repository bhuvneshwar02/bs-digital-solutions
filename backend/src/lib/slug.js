import slugify from 'slugify'

export function toSlug(value) {
  return slugify(String(value || ''), { lower: true, strict: true, trim: true })
}

// Returns a slug unique within `Model`, ignoring the document `excludeId`.
export async function uniqueSlug(Model, source, excludeId) {
  const base = toSlug(source) || 'item'
  let candidate = base
  let n = 2
  // eslint-disable-next-line no-await-in-loop
  while (await Model.exists({ slug: candidate, _id: { $ne: excludeId ?? null } })) {
    candidate = `${base}-${n}`
    n += 1
  }
  return candidate
}
