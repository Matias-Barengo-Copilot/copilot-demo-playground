# Demo mocks (stand-in for DB)

One JSON file per landing category. Each file exports an array of demos.

**Files:** `recruitment-hr.json`, `marketing-seo.json`, `customer-support.json`, `ecommerce.json`, `operations.json`, `finance.json`

**Per-demo shape:**

```json
{
  "id": "unique-id",
  "slug": "url-slug",
  "title": "Demo title",
  "description": "Short description.",
  "narrative": "How this fits Mountain View Coffee.",
  "tags": ["Optional", "Tags"]
}
```

Used by `lib/demos-mock.ts`. Add or edit entries here to change what appears under each category on the landing and under `/demos/business-functions/[categorySlug]`.
