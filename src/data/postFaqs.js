// "ხშირი კითხვები" blocks shown at the end of blog posts (accordion) and
// emitted as FAQPage JSON-LD — short, direct answers that Google and AI
// assistants (ChatGPT / Bing) quote. Keep the numbers in line with the site:
// architectural project GEL 10–40 per m², design docs ~4–8 weeks, Class II
// approval ~3–4 months, Class I = up to 60 m² and 5 m high.
// `en` mirrors `ka` index-for-index.

const PRICE_Q = {
  ka: {
    q: "როგორ გავიგო ჩემი სახლის პროექტის ზუსტი ფასი?",
    a: "გამოგვიგზავნეთ ნაკვეთის საკადასტრო კოდი და სასურველი ფართი (ფასის კალკულატორით ან WhatsApp-ით +995 571 14 14 69). ნაკვეთს უფასოდ შევამოწმებთ და ფიქსირებულ ფასს წინასწარ გეტყვით — ფასი და ვადები ხელშეკრულებით ფიქსირდება.",
  },
  en: {
    q: "How do I get the exact price of my house design?",
    a: "Send us the plot's cadastral code and the floor area you want (via the price calculator or WhatsApp +995 571 14 14 69). We check the plot for free and tell you a fixed price in advance — price and timelines are fixed in the contract.",
  },
}

export const postFaqs = {
  "beletazhiani-sakhlis-proeqti": {
    ka: [
      {
        q: "რა არის ბელეტაჟიანი სახლი?",
        a: "ბელეტაჟიანი სახლის მთავარი საცხოვრებელი სართული მიწიდან აწეულია და ქვედა (ცოკოლის) სართულზე დგას, რომელიც ავტოფარეხს, მარანს, საწყობს ან ტექნიკურ ოთახებს ეთმობა.",
      },
      {
        q: "რა ღირს ბელეტაჟიანი სახლის პროექტი?",
        a: "პროექტის ფასი 10–40 ლარია კვ.მ-ზე, ქვედა სართულის ჩათვლით. მაგალითად, 120 + 60 კვ.მ (სულ 180 კვ.მ) — დაახლოებით 1 800–7 200 ლარი.",
      },
      {
        q: "ითვლება თუ არა ქვედა სართული სახლის ფართში?",
        a: "როგორც წესი, დიახ — ქვედა სართულის ფართი საერთო ფართში ითვლება და გავლენას ახდენს შენობის კლასსა და K2 კოეფიციენტზე. ზუსტად ნაკვეთის პირობებით მოწმდება.",
      },
      PRICE_Q.ka,
    ],
    en: [
      {
        q: "What is a bel-étage house?",
        a: "In a bel-étage house the main living floor is raised above the ground and stands on a lower (semi-basement) floor used for a garage, wine cellar, storage or technical rooms.",
      },
      {
        q: "How much does a bel-étage house design cost?",
        a: "The design costs GEL 10–40 per m², lower floor included. For example, 120 + 60 m² (180 m² in total) is about GEL 1,800–7,200.",
      },
      {
        q: "Does the lower floor count towards the house's floor area?",
        a: "Usually yes — the lower floor area counts towards the total and affects the building class and the K2 coefficient. It is checked exactly against the plot conditions.",
      },
      PRICE_Q.en,
    ],
  },
  "sakhlis-proeqti-60-kv-m": {
    ka: [
      {
        q: "რა ღირს 60 კვ.მ სახლის პროექტი?",
        a: "60 კვ.მ სახლის არქიტექტურული პროექტი დაახლოებით 600–2 400 ლარი ჯდება (10–40 ლარი კვ.მ-ზე).",
      },
      {
        q: "60 კვ.მ სახლი I კლასის შენობაა?",
        a: "დიახ, თუ ფართი 60 კვ.მ-ს და სიმაღლე 5 მ-ს არ აღემატება. I კლასის შეთანხმება მუნიციპალიტეტებში დაახლოებით 1 კვირა, თბილისში — დაახლოებით 1 თვე გრძელდება.",
      },
      {
        q: "რამდენი საძინებელი ეტევა 60 კვ.მ სახლში?",
        a: "1–2 საძინებელი, გაერთიანებული მისაღები და სამზარეულო (22–26 კვ.მ) და სააბაზანო.",
      },
      PRICE_Q.ka,
    ],
    en: [
      {
        q: "How much does a 60 m² house design cost?",
        a: "A 60 m² house architectural project costs about GEL 600–2,400 (GEL 10–40 per m²).",
      },
      {
        q: "Is a 60 m² house a Class I building?",
        a: "Yes, if the floor area does not exceed 60 m² and the height 5 m. Class I approval takes about 1 week in municipalities and about 1 month in Tbilisi.",
      },
      {
        q: "How many bedrooms fit into a 60 m² house?",
        a: "1–2 bedrooms, an open-plan living room and kitchen (22–26 m²) and a bathroom.",
      },
      PRICE_Q.en,
    ],
  },
  "sakhlis-proeqti-120-kv-m": {
    ka: [
      {
        q: "რა ღირს 120 კვ.მ სახლის პროექტი?",
        a: "120 კვ.მ სახლის არქიტექტურული პროექტი დაახლოებით 1 200–4 800 ლარი ჯდება (10–40 ლარი კვ.მ-ზე).",
      },
      {
        q: "რამდენი საძინებელი ეტევა 120 კვ.მ სახლში?",
        a: "3 საძინებელი, მათ შორის მასტერ-საძინებელი, ფართო მისაღები სამზარეულოთი (40–45 კვ.მ) და 2 სააბაზანო.",
      },
      {
        q: "რამდენ ხანს გრძელდება 120 კვ.მ სახლის შეთანხმება?",
        a: "120 კვ.მ სახლი II კლასისაა: პროექტი 4–8 კვირაში მზადდება, შეთანხმება და ნებართვა კი დაახლოებით 3–4 თვე გრძელდება.",
      },
      PRICE_Q.ka,
    ],
    en: [
      {
        q: "How much does a 120 m² house design cost?",
        a: "A 120 m² house architectural project costs about GEL 1,200–4,800 (GEL 10–40 per m²).",
      },
      {
        q: "How many bedrooms fit into a 120 m² house?",
        a: "3 bedrooms including a master bedroom, a spacious living room with kitchen (40–45 m²) and 2 bathrooms.",
      },
      {
        q: "How long does approval of a 120 m² house take?",
        a: "A 120 m² house is Class II: the design takes 4–8 weeks, approval and the permit about 3–4 months.",
      },
      PRICE_Q.en,
    ],
  },
  "arqiteqturuli-proeqtis-fasi": {
    ka: [
      {
        q: "რა ღირს არქიტექტურული პროექტი 1 კვ.მ-ზე?",
        a: "ასიმეტრიაში არქიტექტურული პროექტის ფასი 10-დან 40 ლარამდეა კვ.მ-ზე. სად მოხვდება თქვენი პროექტი ამ დიაპაზონში, დამოკიდებულია ფართზე, შენობის კლასზე, ნაკვეთის პირობებზე და მომსახურების მოცულობაზე.",
      },
      {
        q: "რა შედის არქიტექტურული პროექტის ფასში?",
        a: "სრულ არქიტექტურულ მომსახურებაში შედის ნაკვეთის შემოწმება, კონცეფცია და 3D ვიზუალიზაცია, სამუშაო ნახაზები და პროექტის შეთანხმება. კონსტრუქციული პროექტი, გეოლოგია და ნებართვის აღება შეიძლება იმავე გუნდმა გააკეთოს — ზუსტად რა შედის, ხელშეკრულებაში იწერება.",
      },
      {
        q: "რამდენ ხანში მზადდება არქიტექტურული პროექტი?",
        a: "კერძო სახლის საპროექტო დოკუმენტაცია, როგორც წესი, 4–8 კვირაში მზადდება. II კლასის შენობის შეთანხმება და მშენებლობის ნებართვა მერიაში დაახლოებით 3–4 თვე გრძელდება.",
      },
      PRICE_Q.ka,
    ],
    en: [
      {
        q: "How much does an architectural project cost per m²?",
        a: "At Asymmetry an architectural project costs GEL 10 to 40 per m². Where your project falls in that range depends on the floor area, building class, plot conditions and the scope of service.",
      },
      {
        q: "What is included in the price of an architectural project?",
        a: "Full architectural services include a plot check, concept and 3D visualisation, working drawings and project approval. Structural design, geology and the building permit can be done by the same team — exactly what is included is written into the contract.",
      },
      {
        q: "How long does an architectural project take?",
        a: "Design documentation for a private house usually takes 4–8 weeks. Approval of a Class II building and the building permit take about 3–4 months at City Hall.",
      },
      PRICE_Q.en,
    ],
  },
  "kerdzo-sakhlis-proektireba-pasi-vadebi-da-shetankhmeba": {
    ka: [
      {
        q: "რა ღირს კერძო სახლის პროექტი?",
        a: "კერძო სახლის არქიტექტურული პროექტი 10–40 ლარი ღირს კვ.მ-ზე: მაგალითად, 100 კვ.მ სახლი დაახლოებით 1 000–4 000 ლარი, 150 კვ.მ — 1 500–6 000 ლარი.",
      },
      {
        q: "რამდენ ხანს გრძელდება სახლის პროექტირება და შეთანხმება?",
        a: "პროექტი 4–8 კვირაში მზადდება, II კლასის სახლის შეთანხმება და მშენებლობის ნებართვა კი დაახლოებით 3–4 თვე გრძელდება. I კლასის (60 კვ.მ-მდე) შენობის შეთანხმება გაცილებით სწრაფია.",
      },
      {
        q: "სჭირდება თუ არა კერძო სახლს მშენებლობის ნებართვა?",
        a: "60 კვ.მ-ზე მეტი სახლი II კლასის შენობაა და მას სრული საპროექტო დოკუმენტაცია და მერიაში შეთანხმება სჭირდება. 60 კვ.მ-მდე და 5 მ-მდე სიმაღლის შენობა I კლასისაა — მისი შეთანხმება მარტივია.",
      },
      PRICE_Q.ka,
    ],
    en: [
      {
        q: "How much does a private house design cost?",
        a: "A private house architectural project costs GEL 10–40 per m²: for example a 100 m² house is about GEL 1,000–4,000, a 150 m² house GEL 1,500–6,000.",
      },
      {
        q: "How long do house design and approval take?",
        a: "The project takes 4–8 weeks; approval of a Class II house and the building permit take about 3–4 months. Approval of a Class I building (up to 60 m²) is much faster.",
      },
      {
        q: "Does a private house need a building permit?",
        a: "A house over 60 m² is a Class II building and needs full design documentation and approval at City Hall. A building up to 60 m² and 5 m high is Class I — its approval is simple.",
      },
      PRICE_Q.en,
    ],
  },
  "sakhlis-proeqti-100-kv-m": {
    ka: [
      {
        q: "რა ღირს 100 კვ.მ სახლის პროექტი?",
        a: "100 კვ.მ სახლის არქიტექტურული პროექტი დაახლოებით 1 000–4 000 ლარი ჯდება (10–40 ლარი კვ.მ-ზე), ნაკვეთის პირობებისა და მომსახურების მოცულობის მიხედვით.",
      },
      {
        q: "რამდენი საძინებელი ეტევა 100 კვ.მ სახლში?",
        a: "კარგად დაგეგმილ 100 კვ.მ სახლში 2–3 საძინებელი, გაერთიანებული მისაღები და სამზარეულო (35–40 კვ.მ) და 1–2 სააბაზანო ეტევა.",
      },
      {
        q: "რომელ კლასს მიეკუთვნება 100 კვ.მ სახლი?",
        a: "100 კვ.მ სახლი II კლასის შენობაა (60–500 კვ.მ), ამიტომ მერიაში შეთანხმება სჭირდება — დაახლოებით 3–4 თვე.",
      },
      PRICE_Q.ka,
    ],
    en: [
      {
        q: "How much does a 100 m² house design cost?",
        a: "A 100 m² house architectural project costs about GEL 1,000–4,000 (GEL 10–40 per m²), depending on the plot conditions and the scope of service.",
      },
      {
        q: "How many bedrooms fit into a 100 m² house?",
        a: "A well-planned 100 m² house fits 2–3 bedrooms, an open-plan living room and kitchen (35–40 m²) and 1–2 bathrooms.",
      },
      {
        q: "Which class is a 100 m² house?",
        a: "A 100 m² house is a Class II building (60–500 m²), so it needs approval at City Hall — about 3–4 months.",
      },
      PRICE_Q.en,
    ],
  },
  "sakhlis-proeqti-150-kv-m": {
    ka: [
      {
        q: "რა ღირს 150 კვ.მ სახლის პროექტი?",
        a: "150 კვ.მ სახლის არქიტექტურული პროექტი დაახლოებით 1 500–6 000 ლარი ჯდება (10–40 ლარი კვ.მ-ზე). ზუსტ ფასს წინასწარ, ხელშეკრულებით ვაფიქსირებთ.",
      },
      {
        q: "რამდენი საძინებელი ეტევა 150 კვ.მ სახლში?",
        a: "150 კვ.მ სახლში 3–4 საძინებელი ეტევა, მათ შორის მასტერ-საძინებელი საკუთარი სააბაზანოთი, ასევე ფართო მისაღები და კაბინეტი ან სტუმრის ოთახი.",
      },
      {
        q: "რა ზომის ნაკვეთი სჭირდება 150 კვ.მ ერთსართულიან სახლს?",
        a: "დამოკიდებულია K1 კოეფიციენტზე: K1 = 0.25-ის დროს დაახლოებით 600 კვ.მ ნაკვეთი. მცირე ნაკვეთზე ჯობს ორსართულიანი ვარიანტი (მაგ. 80 + 70 კვ.მ).",
      },
      PRICE_Q.ka,
    ],
    en: [
      {
        q: "How much does a 150 m² house design cost?",
        a: "A 150 m² house architectural project costs about GEL 1,500–6,000 (GEL 10–40 per m²). We fix the exact price in advance, in the contract.",
      },
      {
        q: "How many bedrooms fit into a 150 m² house?",
        a: "A 150 m² house fits 3–4 bedrooms, including a master bedroom with its own bathroom, plus a spacious living room and a study or guest room.",
      },
      {
        q: "What plot size does a 150 m² one-storey house need?",
        a: "It depends on the K1 coefficient: with K1 = 0.25 about a 600 m² plot. On a small plot a two-storey option (e.g. 80 + 70 m²) works better.",
      },
      PRICE_Q.en,
    ],
  },
  "ertsartuliani-sakhlis-proeqti": {
    ka: [
      {
        q: "რა ღირს ერთსართულიანი სახლის პროექტი?",
        a: "ერთსართულიანი სახლის არქიტექტურული პროექტი 10–40 ლარი ღირს კვ.მ-ზე: 100 კვ.მ — დაახლოებით 1 000–4 000 ლარი, 150 კვ.მ — 1 500–6 000 ლარი.",
      },
      {
        q: "რა ზომის ნაკვეთი სჭირდება ერთსართულიან სახლს?",
        a: "დამოკიდებულია K1 კოეფიციენტზე. მაგალითად, K1 = 0.3-ის დროს 120 კვ.მ ერთსართულიან სახლს დაახლოებით 400 კვ.მ ნაკვეთი სჭირდება.",
      },
      {
        q: "ერთსართულიანი თუ ორსართულიანი — რომელი ჯობს?",
        a: "ერთსართულიანი მოსახერხებელია ყველა ასაკისთვის და ეზოსთან პირდაპირ კავშირშია, მაგრამ მეტ მიწას იკავებს. პატარა ან დახრილ ნაკვეთზე ორსართულიანი ჯობს.",
      },
      PRICE_Q.ka,
    ],
    en: [
      {
        q: "How much does a one-storey house design cost?",
        a: "A one-storey house architectural project costs GEL 10–40 per m²: 100 m² is about GEL 1,000–4,000, 150 m² about GEL 1,500–6,000.",
      },
      {
        q: "What plot size does a one-storey house need?",
        a: "It depends on the K1 coefficient. For example, with K1 = 0.3 a 120 m² one-storey house needs a plot of about 400 m².",
      },
      {
        q: "One storey or two — which is better?",
        a: "A one-storey house suits every age and connects directly to the garden, but takes up more land. On a small or sloping plot a two-storey house works better.",
      },
      PRICE_Q.en,
    ],
  },
  "orsartuliani-sakhlis-proeqti": {
    ka: [
      {
        q: "რა ღირს ორსართულიანი სახლის პროექტი?",
        a: "ორსართულიანი სახლის არქიტექტურული პროექტი 10–40 ლარი ღირს კვ.მ-ზე — მაგალითად, 150 კვ.მ სახლი დაახლოებით 1 500–6 000 ლარი.",
      },
      {
        q: "რატომ ავირჩიოთ ორსართულიანი სახლი?",
        a: "ორსართულიანი სახლი ნაკლებ მიწას იკავებს, ეზო მეტი რჩება და საძინებლები მეორე სართულზე უფრო მშვიდია — ეს განსაკუთრებით მნიშვნელოვანია მცირე ნაკვეთზე.",
      },
      {
        q: "რამდენ ხანში მზადდება ორსართულიანი სახლის პროექტი?",
        a: "საპროექტო დოკუმენტაცია 4–8 კვირაში მზადდება, II კლასის სახლის შეთანხმება და ნებართვა კი დაახლოებით 3–4 თვე გრძელდება.",
      },
      PRICE_Q.ka,
    ],
    en: [
      {
        q: "How much does a two-storey house design cost?",
        a: "A two-storey house architectural project costs GEL 10–40 per m² — for example a 150 m² house is about GEL 1,500–6,000.",
      },
      {
        q: "Why choose a two-storey house?",
        a: "A two-storey house takes up less land, leaves more garden and the bedrooms upstairs are quieter — especially important on a small plot.",
      },
      {
        q: "How long does a two-storey house design take?",
        a: "Design documentation takes 4–8 weeks; approval of a Class II house and the permit take about 3–4 months.",
      },
      PRICE_Q.en,
    ],
  },
  "sakhlis-proeqti-80-kv-m": {
    ka: [
      {
        q: "რა ღირს 80 კვ.მ სახლის პროექტი?",
        a: "80 კვ.მ სახლის არქიტექტურული პროექტი დაახლოებით 800–3 200 ლარი ჯდება (10–40 ლარი კვ.მ-ზე).",
      },
      {
        q: "რამდენი საძინებელი ეტევა 80 კვ.მ სახლში?",
        a: "2 საძინებელი (ან 3 პატარა ოთახით), გაერთიანებული მისაღები სამზარეულოთი (30–35 კვ.მ) და სააბაზანო.",
      },
      {
        q: "სჭირდება თუ არა 80 კვ.მ სახლს ნებართვა?",
        a: "დიახ, 80 კვ.მ სახლი II კლასისაა: შეთანხმება და ნებართვა დაახლოებით 3–4 თვე გრძელდება. გამარტივებული I კლასისთვის სახლი 60 კვ.მ-მდე უნდა იყოს.",
      },
      PRICE_Q.ka,
    ],
    en: [
      {
        q: "How much does an 80 m² house design cost?",
        a: "An 80 m² house architectural project costs about GEL 800–3,200 (GEL 10–40 per m²).",
      },
      {
        q: "How many bedrooms fit into an 80 m² house?",
        a: "2 bedrooms (or 3 with a small room), an open-plan living room with kitchen (30–35 m²) and a bathroom.",
      },
      {
        q: "Does an 80 m² house need a permit?",
        a: "Yes, an 80 m² house is Class II: approval and the permit take about 3–4 months. For the simplified Class I the house must be up to 60 m².",
      },
      PRICE_Q.en,
    ],
  },
  "mansardiani-sakhlis-proeqti": {
    ka: [
      {
        q: "რა ღირს მანსარდიანი სახლის პროექტი?",
        a: "მანსარდიანი სახლის არქიტექტურული პროექტი 10–40 ლარი ღირს კვ.მ-ზე — მაგალითად, 120 კვ.მ სახლი დაახლოებით 1 200–4 800 ლარი.",
      },
      {
        q: "რით განსხვავდება მანსარდა მეორე სართულისგან?",
        a: "მანსარდა სახურავის ქვეშ, დახრილ სივრცეშია: ნაკლები კედელი და ფასადია, ამიტომ მშენებლობა ხშირად იაფია, მაგრამ სასარგებლო ფართი ნაკლებია.",
      },
      {
        q: "რას მივაქციოთ ყურადღება მანსარდის დაპროექტებისას?",
        a: "სახურავის დახრასა და სიმაღლეს, კარგ თბოიზოლაციას, ბუნებრივ განათებას (სახურავის ფანჯრები, დორმერები) და კიბის სწორ ადგილს.",
      },
      PRICE_Q.ka,
    ],
    en: [
      {
        q: "How much does a mansard house design cost?",
        a: "A mansard house architectural project costs GEL 10–40 per m² — for example a 120 m² house is about GEL 1,200–4,800.",
      },
      {
        q: "How does a mansard differ from a second storey?",
        a: "A mansard is under the roof, in a sloped space: fewer walls and less facade make construction often cheaper, but the usable area is smaller.",
      },
      {
        q: "What should you watch for when designing a mansard?",
        a: "Roof pitch and height, good insulation, natural light (roof windows, dormers) and the right position for the stairs.",
      },
      PRICE_Q.en,
    ],
  },
  "sakhlis-fasadis-dizaini": {
    ka: [
      {
        q: "რა ღირს სახლის ფასადის დიზაინი?",
        a: "ახალი სახლის ფასადი არქიტექტურული პროექტის ნაწილია (10–40 ლარი კვ.მ-ზე). არსებული სახლის ფასადის ცალკე დიზაინის ფასი ზომასა და სირთულეზეა დამოკიდებული და წინასწარ ფიქსირდება.",
      },
      {
        q: "რომელი სტილი ჯობს კერძო სახლის ფასადისთვის?",
        a: "პოპულარულია თანამედროვე მინიმალიზმი, სკანდინავიური და კლასიკური სტილი. საუკეთესოდ ორი-სამი მასალის კომბინაცია მუშაობს — მაგ. შელესილი ფასადი ხის ან ქვის აქცენტებით.",
      },
      {
        q: "შეიძლება თუ არა ძველი სახლის ფასადის განახლება?",
        a: "დიახ: ვზომავთ შენობას, ვქმნით ვარიანტებს 3D ვიზუალიზაციით და ვამზადებთ ნახაზებს. თუ იერსახე მნიშვნელოვნად იცვლება, შეთანხმება შეიძლება დაგჭირდეთ.",
      },
      PRICE_Q.ka,
    ],
    en: [
      {
        q: "How much does house facade design cost?",
        a: "For a new house the facade is part of the architectural project (GEL 10–40 per m²). A separate facade design for an existing house is priced by size and complexity and fixed in advance.",
      },
      {
        q: "Which style is best for a private house facade?",
        a: "Modern minimalist, Scandinavian and classic styles are popular. A combination of two or three materials works best — e.g. render with wood or stone accents.",
      },
      {
        q: "Can an old house facade be renovated?",
        a: "Yes: we measure the building, create options with 3D visualisation and prepare drawings. If the appearance changes significantly, approval may be needed.",
      },
      PRICE_Q.en,
    ],
  },
}
