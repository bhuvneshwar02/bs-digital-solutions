# Docs

## how-this-site-was-built.html
A full plain-language + technical explainer of the whole system (stack,
architecture, database, admin panel, security, SEO, deployment, glossary).

Regenerate the PDF from it with Chrome:

```
chrome --headless=new --no-pdf-header-footer \
  --print-to-pdf="How-bsinnovationsolutions-was-built.pdf" \
  "file:///ABSOLUTE/PATH/TO/docs/how-this-site-was-built.html"
```

The generated PDF is gitignored (it's a build output).
