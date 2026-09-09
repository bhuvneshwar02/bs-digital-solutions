// Serialise data for an inline <script type="application/ld+json"> tag.
// Escapes the sequences that could otherwise break out of the <script> element
// or be mis-parsed as HTML / JS (line/paragraph separators are invalid in JS
// string literals).
const LS = String.fromCharCode(0x2028)
const PS = String.fromCharCode(0x2029)

export function jsonLd(data) {
  return JSON.stringify(data)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026')
    .split(LS)
    .join('\\u2028')
    .split(PS)
    .join('\\u2029')
}
