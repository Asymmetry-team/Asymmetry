export const nav = [
  {
    text: "მთავარი",
    path: "/",
  },
  {
    text: "ჩვენ შესახებ",
    path: "/about",
  },
  {
    text: "სერვისები",
    path: "/services",
  },
  {
    text: "ბლოგი",
    path: "/blog",
  },
  {
    text: "პროექტები",
    path: "/projects",
  },
  {
    text: "კონტაქტი",
    path: "/contact",
  },
];
// Each service is also its own SEO landing page at /services/<slug>. `name` is
// the keyword-rich H1 / card label, `metaTitle`/`metaDescription` feed <head>,
// `intro` is the page lead, `details` is the "what's included" list.
export const featured = [
  {
    cover: "/images/hero/h1.png",
    iconify: "mdi:ruler-square-compass",
    name: "არქიტექტურული მომსახურება",
    short: "არქიტექტურული მომსახურება",
    slug: "arqiteqturuli-momsakhureba",
    total: "",
    metaTitle: "არქიტექტურული მომსახურება თბილისში | Asymmetry",
    metaDescription:
      "სრული არქიტექტურული მომსახურება — კერძო სახლის, კორპუსის და 1 კლასის შენობის პროექტირება. Asymmetry არქიტექტურული სტუდია საქართველოში.",
    intro:
      "Asymmetry გთავაზობთ სრულ არქიტექტურულ მომსახურებას — იდეის კონცეფციიდან დეტალურ არქიტექტურულ პროექტამდე. ვქმნით ფუნქციურ და ესთეტიკურ სივრცეებს ნებისმიერი ტიპის ობიექტისთვის: კერძო სახლი, მრავალბინიანი კორპუსი თუ 1 კლასის შენობა.",
    details: [
      "არქიტექტურული პროექტი",
      "3D ვიზუალიზაცია და ფოტომონტაჟი",
      "ფასადები და გეგმარება",
    ],
    children: [
      {
        iconify: "mdi:home-outline",
        name: "კერძო სახლის პროექტირება",
        short: "კერძო სახლის პროექტირება",
        slug: "kerdzo-sakhlis-proeqtireba",
        total: "",
        metaTitle: "კერძო სახლის პროექტირება — ფასი და ვადები | Asymmetry",
        metaDescription:
          "კერძო სახლის პროექტირება საქართველოში: ესკიზური და სამუშაო პროექტი, გეოლოგიური დასკვნა, ხარჯთაღრიცხვა. გაიგეთ ფასი და ვადები Asymmetry-სგან.",
        intro:
          "კერძო სახლის პროექტირება მოიცავს სრულ საპროექტო დოკუმენტაციას — ესკიზური იდეიდან სამუშაო ნახაზებამდე. ვითვალისწინებთ მიწის ნაკვეთის თავისებურებებს, გეოლოგიას და თქვენს საჭიროებებს.",
        details: [
          "ესკიზური პროექტი",
          "სამუშაო ნახაზები",
          "3D ვიზუალიზაცია",
          "ხარჯთაღრიცხვა",
        ],
      },
      {
        iconify: "mdi:office-building-outline",
        name: "კორპუსის პროექტირება",
        short: "კორპუსის პროექტირება",
        slug: "korpusis-proeqtireba",
        total: "",
        metaTitle: "კორპუსის პროექტირება — მრავალბინიანი შენობა | Asymmetry",
        metaDescription:
          "მრავალბინიანი და კომერციული კორპუსების არქიტექტურული პროექტირება — გეგმარება, ფასადები, საერთო სივრცეები. Asymmetry.",
        intro:
          "კორპუსის პროექტირება მოიცავს მრავალბინიანი და კომერციული შენობების სრულ არქიტექტურულ დაგეგმარებას — ფუნქციური გეგმარებიდან ფასადებამდე, ნორმებისა და ინსოლაციის სრული დაცვით.",
        details: [
          "მოცულობით-სივრცითი კონცეფცია",
          "ბინების გეგმარება",
          "ფასადები",
          "საერთო სივრცეები",
        ],
      },
      {
        iconify: "mdi:home-city-outline",
        name: "1 კლასის შენობის პროექტირება",
        short: "1 კლასის შენობა",
        slug: "1-klasis-shenobis-proeqtireba",
        total: "",
        metaTitle: "1 კლასის შენობის პროექტირება | Asymmetry",
        metaDescription:
          "პირველი კლასის (მარტივი) შენობების პროექტირება — გამარტივებული ნებართვა და ოპტიმალური ღირებულება. Asymmetry.",
        intro:
          "1 კლასის შენობის პროექტირება შეეხება მარტივ, მცირე ზომის ობიექტებს, რომლებსაც გამარტივებული ნებართვის რეჟიმი აქვთ. ვამზადებთ სრულ დოკუმენტაციას სწრაფად და ოპტიმალურ ფასად.",
        details: [
          "არქიტექტურული ესკიზი",
          "ტექნიკური დოკუმენტაცია",
          "ნებართვის თანხლება",
        ],
      },
    ],
  },
  {
    cover: "/images/hero/h2.png",
    iconify: "mdi:crane",
    name: "კონსტრუქციული მომსახურება",
    short: "კონსტრუქციული მომსახურება",
    slug: "konstruqciuli-momsakhureba",
    total: "",
    metaTitle: "კონსტრუქციული მომსახურება და დასკვნა | Asymmetry",
    metaDescription:
      "კონსტრუქციული პროექტი, დასკვნა და ექსპერტიზა — შენობის სიმტკიცისა და უსაფრთხოების გარანტია. Asymmetry არქიტექტურული სტუდია.",
    intro:
      "კონსტრუქციული მომსახურება უზრუნველყოფს შენობის სიმტკიცესა და უსაფრთხოებას. ვამზადებთ კონსტრუქციულ პროექტს, დასკვნასა და ექსპერტიზას მოქმედი ნორმების სრული დაცვით.",
    details: [
      "კონსტრუქციული პროექტი",
      "კონსტრუქციული დასკვნა",
      "კონსტრუქციული ექსპერტიზა",
    ],
  },
  {
    cover: "/images/hero/h3.png",
    iconify: "mdi:terrain",
    name: "გეოლოგიური მომსახურება",
    short: "გეოლოგიური მომსახურება",
    slug: "geologiuri-momsakhureba",
    total: "",
    metaTitle: "გეოლოგიური მომსახურება და დასკვნა | Asymmetry",
    metaDescription:
      "საინჟინრო-გეოლოგიური კვლევა, გეოლოგიური დასკვნა და ექსპერტიზა მშენებლობის ნებართვისთვის. Asymmetry საქართველო.",
    intro:
      "გეოლოგიური მომსახურება მოიცავს მიწის ნაკვეთის საინჟინრო-გეოლოგიურ კვლევას. გრუნტის თვისებების ცოდნა საფუძვლის სწორად დაპროექტების წინაპირობაა.",
    details: [
      "საინჟინრო-გეოლოგიური კვლევა",
      "გეოლოგიური დასკვნა",
      "გეოლოგიური ექსპერტიზა",
    ],
  },
  {
    cover: "/images/hero/h7.png",
    iconify: "mdi:road-variant",
    name: "საგზაო სქემები",
    short: "საგზაო სქემები",
    slug: "sagzao-skhemebi",
    total: "",
    metaTitle: "საგზაო მოძრაობის სქემები | Asymmetry",
    metaDescription:
      "საგზაო მოძრაობის სქემა, სატრანსპორტო და საპატრულო თანხმობა მშენებლობის ნებართვისთვის. Asymmetry საქართველო.",
    intro:
      "საგზაო სქემები და შესაბამისი თანხმობები აუცილებელია ობიექტის ნებართვისთვის. ვამზადებთ სრულ პაკეტს შესაბამის უწყებებთან შესათანხმებლად.",
    details: [
      "საგზაო მოძრაობის სქემა",
      "სატრანსპორტო თანხმობა",
      "საპატრულო თანხმობა",
    ],
  },
  {
    cover: "/images/hero/h10.png",
    iconify: "mdi:map-marker-distance",
    name: "გეოდეზიური სამუშაოები",
    short: "გეოდეზიური სამუშაოები",
    slug: "geodeziuri-samushaoebi",
    total: "",
    metaTitle: "გეოდეზიური სამუშაოები და ტოპოგრაფია | Asymmetry",
    metaDescription:
      "გეოდეზიური სამუშაოები: ტოპოგრაფიული აზომვა, აზომვითი ნახაზი და წერტილების დასმა. ზუსტი საწყისი მონაცემები — Asymmetry.",
    intro:
      "გეოდეზიური სამუშაოები უზრუნველყოფს პროექტის ზუსტ საწყის მონაცემებს. ვასრულებთ ტოპოგრაფიულ აზომვას და წერტილების დასმას ობიექტზე.",
    details: ["ტოპოგრაფიული აზომვა", "აზომვითი ნახაზი", "წერტილების დასმა"],
  },
]

// Flat list of every service page (top-level + architecture sub-pages) for
// routing / lookup by slug.
export const serviceIndex = featured.flatMap((s) => [
  s,
  ...(s.children || []),
])

// "როგორ ვმუშაობთ" steps — each is also its own page at /process/<slug>.
export const processSteps = [
  {
    slug: "konsultacia",
    icon: "mdi:comment-search-outline",
    title: "კონსულტაცია",
    text: "ვხვდებით, ვსწავლობთ სივრცეს, ბიუჯეტსა და თქვენს ხედვას.",
    metaTitle: "კონსულტაცია — სამუშაო პროცესი | Asymmetry",
    metaDescription:
      "პირველი ეტაპი — უფასო კონსულტაცია: ვსწავლობთ სივრცეს, ბიუჯეტსა და თქვენს ხედვას.",
    intro:
      "პირველი შეხვედრა ეთმობა თქვენი საჭიროებების გაცნობას. ვსწავლობთ მიწის ნაკვეთს ან სივრცეს, ვაზუსტებთ ბიუჯეტსა და ვადებს და ერთად ვსახავთ პროექტის ხედვას.",
    details: ["სივრცის/ნაკვეთის შესწავლა", "ბიუჯეტისა და ვადების განსაზღვრა", "ხედვისა და მიზნების დაზუსტება"],
  },
  {
    slug: "koncefcia",
    icon: "mdi:cube-scan",
    title: "კონცეფცია",
    text: "3D ვიზუალიზაცია და მასალების პალიტრა დასამტკიცებლად.",
    metaTitle: "კონცეფცია — სამუშაო პროცესი | Asymmetry",
    metaDescription:
      "მეორე ეტაპი — კონცეფცია: 3D ვიზუალიზაცია და მასალების პალიტრა დასამტკიცებლად.",
    intro:
      "ვქმნით პროექტის კონცეფციას — მოცულობით-სივრცით გადაწყვეტას, 3D ვიზუალიზაციასა და მასალების პალიტრას, რომელსაც ერთად ვამტკიცებთ სამუშაო პროექტზე გადასვლამდე.",
    details: ["ესკიზური კონცეფცია", "3D ვიზუალიზაცია", "მასალების პალიტრა"],
  },
  {
    slug: "samushao-proeqti",
    icon: "mdi:ruler-square-compass",
    title: "პროექტის შეთანხმება",
    text: "ტექნიკური ნახაზები, სპეციფიკაციები და ხარჯთაღრიცხვა.",
    metaTitle: "პროექტის შეთანხმება — სამუშაო პროცესი | Asymmetry",
    metaDescription:
      "მესამე ეტაპი — სამუშაო პროექტი: ტექნიკური ნახაზები, სპეციფიკაციები და ხარჯთაღრიცხვა.",
    intro:
      "დამტკიცებული კონცეფციის საფუძველზე ვამზადებთ სრულ სამუშაო დოკუმენტაციას — ტექნიკურ ნახაზებს, სპეციფიკაციებსა და ხარჯთაღრიცხვას, რომლითაც მშენებლობა ხორციელდება.",
    details: ["ტექნიკური ნახაზები", "სპეციფიკაციები", "ხარჯთაღრიცხვა"],
  },
  {
    slug: "avtoris-zedamxedveloba",
    icon: "mdi:check-decagram-outline",
    title: "ავტორის ზედამხედველობა",
    text: "ვაკონტროლებთ შესრულებას, სანამ ბოლო დეტალი დგება.",
    metaTitle: "ავტორის ზედამხედველობა — სამუშაო პროცესი | Asymmetry",
    metaDescription:
      "მეოთხე ეტაპი — ავტორის ზედამხედველობა: ვაკონტროლებთ შესრულებას ბოლო დეტალამდე.",
    intro:
      "მშენებლობის მიმდინარეობისას ვახორციელებთ ავტორის ზედამხედველობას — ვამოწმებთ, რომ ყველა დეტალი პროექტის შესაბამისად სრულდება.",
    details: ["შესრულების კონტროლი", "პროექტთან შესაბამისობა", "დეტალების ზედამხედველობა"],
  },
]

export const list = [
  {
    id: 16,
    images: [
      "/images/houses/h-16/1.jpg",
      "/images/houses/h-16/2.jpg",
      "/images/houses/h-16/3.jpg",
    ],
    name: "თანამედროვე კერძო სახლი ფანჩატურით — დიღომი",
    desc:
      "380 მ²-ზე გაშლილი თანამედროვე საცხოვრებელი სახლი დამოუკიდებელი ფანჩატურით. სუფთა გეომეტრია, დიდი მინის ღიობები და ბუნებრივ გარემოსთან ჰარმონია ქმნის კომფორტულ და პრესტიჟულ საცხოვრებელს.",
    location: "ქ. თბილისი, ს. დიღომი",
    price: "380 მ²",
  },
  {
    id: 6,
    images: [
      "/images/houses/h-6/1.png",
      "/images/houses/h-6/2.png",
      "/images/houses/h-6/3.png",
    ],
    name: "ორსართულიანი კერძო სახლის პროექტი — დიღომი",
    desc:
      "288 მ² ორსართულიანი კერძო სახლი დიღომში — ფუნქციური გეგმარება, ბუნებრივი განათება და თანამედროვე ფასადური გადაწყვეტა, რომელიც ესთეტიკას პრაქტიკულობას უთავსებს.",
    location: "ქ. თბილისი, ს. დიღომი",
    price: "288 მ²",
  },
  {
    id: 17,
    images: [
      "/images/houses/h-17/3.jpg",
      "/images/houses/h-17/2.jpg",
      "/images/houses/h-17/1.jpg",
    ],
    name: "თანამედროვე საცხოვრებელი სახლი — ვარკეთილი",
    desc:
      "320 მ² თანამედროვე საცხოვრებელი სახლი — გახსნილი სივრცეები, დიდი ტერასები და მინიმალისტური ფასადი, რომელიც ოჯახის ცხოვრების რიტმზეა მორგებული.",
    location: "ქ. თბილისი, ვარკეთილის მეურნეობა",
    price: "320 მ²",
  },
  {
    id: 18,
    images: [
      "/images/houses/h-18/2.jpg",
      "/images/houses/h-18/1.jpg",
      "/images/houses/h-18/3.jpg",
    ],
    name: "მინიმალისტური კერძო სახლი — შინდისი",
    desc:
      "300 მ² მინიმალისტური საცხოვრებელი სახლი შინდისში — მკაფიო ხაზები, ბუნებრივი მასალები და გააზრებული განათება, რომელიც სიმშვიდისა და კომფორტის განცდას ქმნის.",
    location: "ქ. თბილისი, ს. შინდისი",
    price: "300 მ²",
  },
  {
    id: 4,
    images: ["/images/houses/h-4/1.png", "/images/houses/h-4/2.png"],
    name: "ენერგოეფექტური კერძო სახლი — ნავდარაანთკარი",
    desc:
      "255 მ² ენერგოეფექტური კერძო სახლი — გააზრებული ორიენტაცია, ხარისხიანი თბოიზოლაცია და თანამედროვე ინჟინერია, რომელიც კომუნალურ ხარჯს ამცირებს.",
    location: "მცხეთის მუნიციპალიტეტი, ს. ნავდარაანთკარი",
    price: "255 მ²",
    year: "2025 წელი",
  },
  {
    id: 7,
    images: [
      "/images/houses/h-7/1.png",
      "/images/houses/h-7/2.png",
      "/images/houses/h-7/3.png",
    ],
    name: "თანამედროვე კერძო სახლის პროექტი — მისაქციელი",
    desc:
      "223 მ² თანამედროვე კერძო სახლი მისაქციელში — კომპაქტური, მაგრამ სივრცობრივად მოქნილი გადაწყვეტა ბუნებრივ ლანდშაფტთან ერთიანობაში.",
    location: "მცხეთის მუნიციპალიტეტი, ს. მისაქციელი",
    price: "223 მ²",
    year: "2025 წელი",
  },
  {
    id: 1,
    images: [
      "/images/houses/h-1/1.png",
      "/images/houses/h-1/2.png",
      "/images/houses/h-1/3.png",
    ],
    name: "მარანი და სადეგუსტაციო სივრცე — დიღომი",
    desc:
      "118 მ² მარანი დახვეწილი სადეგუსტაციო სივრცით — ავთენტური ატმოსფერო, ბუნებრივი მასალები და დეტალებზე ორიენტირებული დიზაინი ღვინის კულტურისთვის.",
    location: "თბილისი, ს.დიღომი",
    price: "118 მ²",
    year: "2025 წელი",
  },
  {
    id: 2,
    images: [
      "/images/houses/h-2/1.png",
      "/images/houses/h-2/2.png",
      "/images/houses/h-2/3.png",
    ],
    name: "საოჯახო სასტუმროს პროექტი — ბორჯომი",
    desc:
      "680 მ² საოჯახო სასტუმრო ბორჯომში — სტუმართმოყვარე, კომფორტული ინტერიერი და ფასადი, რომელიც ქალაქის კურორტულ ხასიათს ეხმიანება.",
    location: "ქ. ბორჯომი",
    price: "680 მ²",
    year: "2025 წელი",
  },
  {
    id: 3,
    images: [
      "/images/houses/h-3/1.png",
      "/images/houses/h-3/2.png",
      "/images/houses/h-3/3.png",
      "/images/houses/h-3/4.png",
    ],
    name: "პრემიუმ კერძო სახლი — საგურამო",
    desc:
      "347 მ² პრემიუმ კლასის კერძო სახლი საგურამოში — ფართო სივრცეები, ხარისხიანი მასალები და ბუნებრივ გარემოზე გახსნილი არქიტექტურა.",
    location: "მცხეთის მუნიციპალიტეტი, ს. საგურამო",
    price: "347 მ²",
    year: "2025 წელი",
  },
  {
    id: 5,
    images: ["/images/houses/h-5/1.png", "/images/houses/h-5/2.png"],
    name: "აგარაკის პროექტი — დაბა სიონი",
    desc:
      "98 მ² მყუდრო აგარაკი დაბა სიონში — ბუნებასთან სიახლოვე, ხის დეტალები და კომფორტული დასასვენებელი სივრცე.",
    location: "თიანეთის მუნიციპალიტეტი, დაბა სიონი",
    price: "98 მ²",
    year: "2024 წელი",
  },
  {
    id: 8,
    images: [
      "/images/houses/h-8/1.png",
      "/images/houses/h-8/2.png",
      "/images/houses/h-8/3.png",
    ],
    name: "ფანჩატური და ლანდშაფტის დიზაინი — წყნეთი",
    desc:
      "248 მ² ფანჩატური და ლანდშაფტის დიზაინი წყნეთში — გარე სივრცის გააზრებული ორგანიზაცია, მწვანე ზონები და დასვენების კუთხეები.",
    location: "ქ.თბილისი, ს. წყნეთი",
    price: "248 მ²",
    year: "2024 წელი",
  },
  {
    id: 9,
    images: [
      "/images/houses/h-9/1.png",
      "/images/houses/h-9/2.png",
      "/images/houses/h-9/3.png",
    ],
    name: "თანამედროვე კერძო სახლი — ივერთუბანი",
    desc:
      "278 მ² თანამედროვე კერძო სახლი ივერთუბანში — სუფთა მოცულობები, ბუნებრივი შუქი და ფუნქციური საოჯახო გეგმარება.",
    location: "ქ.თბილისი, ივერთუბანი",
    price: "278 მ²",
    year: "2023 წელი",
  },
  {
    id: 10,
    images: [
      "/images/houses/h-10/1.png",
      "/images/houses/h-10/2.png",
      "/images/houses/h-10/3.png",
      "/images/houses/h-10/4.png",
    ],
    name: "ხის ფასადიანი კერძო სახლი — წინანდალი",
    desc:
      "245 მ² კერძო სახლი ხის ფასადური დეტალებით წინანდალში — თბილი მასალები, ბუნებრივ გარემოსთან ჰარმონია და თანამედროვე კომფორტი.",
    location: "თელავის მუნიციპალიტეტი, ს. წინანდალი",
    price: "245 მ²",
    year: "2023 წელი",
  },
  {
    id: 11,
    images: ["/images/houses/h-11/1.png", "/images/houses/h-11/2.png"],
    name: "ხის კარკასული კერძო სახლი — მისაქციელი",
    desc:
      "123 მ² ხის კარკასული საცხოვრებელი სახლი — ეკოლოგიური მასალები, სწრაფი მშენებლობა და მყუდრო, ბუნებრივი ინტერიერი.",
    location: "მცხეთის მინიციპალიტეტი, ს. მისაქციელი",
    price: "123 მ²",
    year: "2022 წელი",
  },
  {
    id: 12,
    images: [
      "/images/houses/h-12/1.png",
      "/images/houses/h-12/2.png",
      "/images/houses/h-12/3.png",
      "/images/houses/h-12/4.png",
    ],
    name: "კერძო სახლის ინტერიერის დიზაინი — ნავდარაანთკარი",
    desc:
      "164 მ² კერძო სახლის ინტერიერის დიზაინი — ფუნქციური ზონირება, თბილი პალიტრა და დეტალებზე ორიენტირებული გადაწყვეტები.",
    location: "მცხეთის მინიციპალიტეტი, ს. ნავდარაანთკარი",
    price: "164 მ²",
    year: "2022 წელი",
  },
  {
    id: 13,
    images: [
      "/images/houses/h-13/1.png",
      "/images/houses/h-13/2.png",
      "/images/houses/h-13/3.png",
      "/images/houses/h-13/4.png",
      "/images/houses/h-13/5.png",
      "/images/houses/h-13/6.png",
    ],
    name: "თანამედროვე ინტერიერის დიზაინი — დიღომი",
    desc:
      "218 მ² თანამედროვე ინტერიერის დიზაინი დიღომში — სივრცის განცდა, ბუნებრივი მასალები და გააზრებული განათება.",
    location: "ქ.თბილისი, ს. დიღომი",
    price: " 218 მ²",
    year: "2025 წელი",
  },
  {
    id: 14,
    images: [
      "/images/houses/h-14/1.png",
      "/images/houses/h-14/2.png",
      "/images/houses/h-14/3.png",
    ],
    name: "ბინის ინტერიერის დიზაინი — ნუცუბიძე",
    desc:
      "78 მ² ბინის ინტერიერის დიზაინი — ჭკვიანი გეგმარება მცირე ფართზე, სინათლე და თანამედროვე ესთეტიკა.",
    location: "ქ.თბილისი ნუცუბიძის ქ.125ა",
    price: "78 მ²",
    year: "2024 წელი",
  },
  {
    id: 15,
    images: [
      "/images/houses/h-15/1.png",
      "/images/houses/h-15/2.png",
      "/images/houses/h-15/3.png",
    ],
    name: "ბინის ინტერიერის დიზაინი — ფალიაშვილის ქუჩა",
    desc:
      "68 მ² ბინის ინტერიერის დიზაინი ფალიაშვილის ქუჩაზე — კომპაქტური, ელეგანტური და მაქსიმალურად ფუნქციური სივრცე.",
    location: "ქ.თბილისი, ფალიაშვილის ქ.59",
    price: "68 მ²",
    year: "2023 წელი",
  },
];
export const team = [
  {
    cover: "/images/customer/team-1.jpg",
    address: "ლაშა კირვალიძე",
    name: "დამფუძნებელი/მთ. არქიტექტორი",
    icon: [
      <a href="https://www.facebook.com/profile.php?id=100092504264433">
        <i class="fa-brands fa-facebook-f"></i>
      </a>,
      <a href="https://www.tiktok.com/@asymmetry.architecture">
        <i class="fab fa-tiktok"></i>
      </a>,
      <a href="https://www.instagram.com/studio.asymmetry/">
        <i class="fa-brands fa-instagram"></i>
      </a>,
    ],
  },
  {
    cover: "/images/customer/team-3.jpg",
    address: "კახა შონია",
    name: "არქიტექტორი/ენერგოეფექტურობა",
    icon: [
      <a href="https://www.facebook.com/profile.php?id=100092504264433">
        <i class="fa-brands fa-facebook-f"></i>
      </a>,
      <a href="https://www.tiktok.com/@asymmetry.architecture">
        <i class="fab fa-tiktok"></i>
      </a>,
      <a href="https://www.instagram.com/studio.asymmetry/">
        <i class="fa-brands fa-instagram"></i>
      </a>,
    ],
  },
  {
    cover: "/images/customer/team-4.jpg",
    address: "ანა დიასამიძე",
    name: "არქიტექტორი",
    icon: [
      <a href="https://www.facebook.com/profile.php?id=100092504264433">
        <i class="fa-brands fa-facebook-f"></i>
      </a>,
      <a href="https://www.tiktok.com/@asymmetry.architecture">
        <i class="fab fa-tiktok"></i>
      </a>,
      <a href="https://www.instagram.com/studio.asymmetry/">
        <i class="fa-brands fa-instagram"></i>
      </a>,
    ],
  },
  {
    cover: "/images/customer/team-5.jpg",
    address: "ნუგზარ კევლიშვილი",
    name: "კონსტრუქტორი",
    icon: [
      <a href="https://www.facebook.com/profile.php?id=100092504264433">
        <i class="fa-brands fa-facebook-f"></i>
      </a>,
      <a href="https://www.tiktok.com/@asymmetry.architecture">
        <i class="fab fa-tiktok"></i>
      </a>,
      <a href="https://www.instagram.com/studio.asymmetry/">
        <i class="fa-brands fa-instagram"></i>
      </a>,
    ],
  },
  {
    cover: "/images/customer/team-6.jpg",
    address: "ბიჭიკო მესტვირიშვილი",
    name: "ინტერიერის დიზაინერი",
    icon: [
      <a href="https://www.facebook.com/profile.php?id=100092504264433">
        <i class="fa-brands fa-facebook-f"></i>
      </a>,
      <a href="https://www.tiktok.com/@asymmetry.architecture">
        <i class="fab fa-tiktok"></i>
      </a>,
      <a href="https://www.instagram.com/studio.asymmetry/">
        <i class="fa-brands fa-instagram"></i>
      </a>,
    ],
  },
  {
    cover: "/images/customer/team-7.jpg",
    address: "ნათია მესტვირიშვილი",
    name: "პროგრამული უზრუნველყოფის სპეციალისტი",
    icon: [
      <a href="https://www.facebook.com/profile.php?id=100092504264433">
        <i class="fa-brands fa-facebook-f"></i>
      </a>,
      <a href="https://www.tiktok.com/@asymmetry.architecture">
        <i class="fab fa-tiktok"></i>
      </a>,
      <a href="https://www.instagram.com/studio.asymmetry/">
        <i class="fa-brands fa-instagram"></i>
      </a>,
    ],
  },
];

export const footer = [
  {
    title: "საკონტაქტო ინფორმაცია",
    text: [
      {
        list: "Facebook",
        href: "https://www.facebook.com/profile.php?id=100092504264433",
      },
      { list: "Instagram", href: "https://www.instagram.com/studio.asymmetry/" },
      { list: "TikTok", href: "https://www.tiktok.com/@studio_asymmetry" },
      {
        list: "YouTube",
        href: "https://www.youtube.com/@connect.asymmetry/featured",
      },
      {
        list: "connectasymmetry@gmail.com",
        href: "mailto:connectasymmetry@gmail.com",
      },
      { list: "571 14 14 69", href: "tel:+995571141469" },
    ],
  },
  {
    title: "სამუშაო საათები",
    text: [
      { day: "ორშაბათი", time: "10:00 - 20:00" },
      { day: "სამშაბათი", time: "10:00 - 20:00" },
      { day: "ოთხშაბათი", time: "10:00 - 20:00" },
      { day: "ხუთშაბათი", time: "10:00 - 20:00" },
      { day: "პარასკევი", time: "10:00 - 20:00" },
      { day: "შაბათი", time: "10:00 - 20:00" },
      { day: "კვირა", time: "დასვენება" },
    ],
  },
  {
    title: "კომპანია",
    text: [
      { list: "მთავარი", href: "/" },
      { list: "ჩვენ შესახებ", href: "/about" },
      { list: "სერვისები", href: "/services" },
      { list: "პროექტები", href: "/projects" },
      { list: "ბლოგი", href: "/blog" },
      { list: "კონტაქტი", href: "/contact" },
    ],
  },
];
