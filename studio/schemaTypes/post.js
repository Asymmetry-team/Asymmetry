export default {
  name: "post",
  title: "ბლოგის სტატია",
  type: "document",
  fields: [
    {
      name: "title",
      title: "სათაური",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "slug",
      title: "URL მისამართი (Slug)",
      type: "slug",
      description: "ავტომატურად იქმნება სათაურიდან — დააჭირე „Generate“",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "mainImage",
      title: "მთავარი ფოტო",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", title: "Alt ტექსტი (SEO)", type: "string" }],
    },
    {
      name: "excerpt",
      title: "მოკლე აღწერა (სიაში და SEO-სთვის)",
      type: "text",
      rows: 3,
    },
    {
      name: "publishedAt",
      title: "გამოქვეყნების თარიღი",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    },
    {
      name: "author",
      title: "ავტორი",
      type: "string",
    },
    {
      name: "body",
      title: "სტატიის ტექსტი",
      type: "array",
      of: [
        { type: "block" },
        {
          type: "image",
          options: { hotspot: true },
          fields: [{ name: "alt", title: "Alt ტექსტი", type: "string" }],
        },
      ],
    },
  ],
  orderings: [
    {
      title: "ახალი ჯერ",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "title", media: "mainImage", subtitle: "publishedAt" },
  },
};
