export default {
  name: "project",
  title: "პროექტი",
  type: "document",
  fields: [
    {
      name: "name",
      title: "პროექტის სახელი",
      type: "string",
      description: "მაგ. „თანამედროვე კერძო სახლი — დიღომი“",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "slug",
      title: "URL მისამართი (Slug)",
      type: "slug",
      description: "ავტომატურად იქმნება სახელიდან — დააჭირე „Generate“",
      options: { source: "name", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "images",
      title: "ფოტოები",
      type: "array",
      description: "პირველი ფოტო გამოჩნდება „პროექტების“ სიაში (ქავერი)",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [{ name: "alt", title: "Alt ტექსტი (SEO)", type: "string" }],
        },
      ],
      validation: (Rule) => Rule.min(1).required(),
    },
    {
      name: "location",
      title: "მდებარეობა",
      type: "string",
      description: "მაგ. „ქ. თბილისი, ს. დიღომი“",
    },
    {
      name: "price",
      title: "ფართობი / ფასი",
      type: "string",
      description: "მაგ. „380 მ²“",
    },
    {
      name: "desc",
      title: "აღწერა",
      type: "text",
      rows: 4,
    },
    {
      name: "publishedAt",
      title: "დამატების თარიღი",
      type: "datetime",
      description: "სიაში დალაგების რიგითობა (ახალი ჯერ)",
      initialValue: () => new Date().toISOString(),
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
    select: { title: "name", subtitle: "location", media: "images.0" },
  },
};
