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
        a: "პროექტის ფასი 10–40 ლარს შორის მერყეობს კვ.მ-ზე, სამუშაოს მიხედვით, ქვედა სართულის ჩათვლით.",
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
        a: "The design ranges from GEL 10 to 40 per m², depending on the work: the architectural project only or the full service for City Hall approval, lower floor included.",
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
        a: "60 კვ.მ სახლის არქიტექტურული პროექტის ფასი 10–40 ლარს შორის მერყეობს კვ.მ-ზე, სამუშაოს მიხედვით.",
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
        a: "The architectural project for a 60 m² house ranges from GEL 10 to 40 per m², depending on the work.",
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
        a: "120 კვ.მ სახლის არქიტექტურული პროექტის ფასი 10–40 ლარს შორის მერყეობს კვ.მ-ზე, სამუშაოს მიხედვით.",
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
        a: "The architectural project for a 120 m² house ranges from GEL 10 to 40 per m², depending on the work.",
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
        a: "ასიმეტრიაში არქიტექტურული პროექტის ფასი 10-დან 40 ლარამდე მერყეობს კვ.მ-ზე (გააჩნია სამუშაოს: მხოლოდ არქიტექტურული პროექტი თუ სრული მომსახურება მერიაში შესათანხმებლად). სად მოხვდება თქვენი პროექტი ამ დიაპაზონში, დამოკიდებულია ფართზე, შენობის კლასზე, ნაკვეთის პირობებზე და მომსახურების მოცულობაზე.",
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
        a: "At Asymmetry an architectural project ranges from GEL 10 to 40 per m², depending on the work: the architectural project only or the full service for City Hall approval. Where your project falls in that range depends on the floor area, building class, plot conditions and the scope of service.",
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
        a: "კერძო სახლის არქიტექტურული პროექტი 10–40 ლარს შორის მერყეობს კვ.მ-ზე, სამუშაოს მიხედვით.",
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
        a: "A private house architectural project ranges from GEL 10 to 40 per m², depending on the work: the architectural project only or the full service for City Hall approval.",
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
        a: "100 კვ.მ სახლის არქიტექტურული პროექტის ფასი 10–40 ლარს შორის მერყეობს კვ.მ-ზე, სამუშაოს მიხედვით, ნაკვეთის პირობებისა და მომსახურების მოცულობის მიხედვით.",
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
        a: "The architectural project for a 100 m² house ranges from GEL 10 to 40 per m², depending on the work, depending on the plot conditions and the scope of service.",
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
        a: "150 კვ.მ სახლის არქიტექტურული პროექტის ფასი 10–40 ლარს შორის მერყეობს კვ.მ-ზე, სამუშაოს მიხედვით. ზუსტ ფასს წინასწარ, ხელშეკრულებით ვაფიქსირებთ.",
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
        a: "The architectural project for a 150 m² house ranges from GEL 10 to 40 per m², depending on the work. We fix the exact price in advance, in the contract.",
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
        a: "ერთსართულიანი სახლის არქიტექტურული პროექტი 10–40 ლარს შორის მერყეობს კვ.მ-ზე, სამუშაოს მიხედვით.",
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
        a: "A one-storey house architectural project ranges from GEL 10 to 40 per m², depending on the work: the architectural project only or the full service for City Hall approval.",
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
        a: "ორსართულიანი სახლის არქიტექტურული პროექტი 10–40 ლარს შორის მერყეობს კვ.მ-ზე, სამუშაოს მიხედვით.",
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
        a: "A two-storey house architectural project ranges from GEL 10 to 40 per m², depending on the work: the architectural project only or the full service for City Hall approval.",
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
        a: "80 კვ.მ სახლის არქიტექტურული პროექტის ფასი 10–40 ლარს შორის მერყეობს კვ.მ-ზე, სამუშაოს მიხედვით.",
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
        a: "The architectural project for a 80 m² house ranges from GEL 10 to 40 per m², depending on the work.",
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
        a: "მანსარდიანი სახლის არქიტექტურული პროექტი 10–40 ლარს შორის მერყეობს კვ.მ-ზე, სამუშაოს მიხედვით.",
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
        a: "A mansard house architectural project ranges from GEL 10 to 40 per m², depending on the work: the architectural project only or the full service for City Hall approval.",
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
        a: "ახალი სახლის ფასადი არქიტექტურული პროექტის ნაწილია (10–40 ლარი კვ.მ-ზე, სამუშაოს მიხედვით). არსებული სახლის ფასადის ცალკე დიზაინის ფასი ზომასა და სირთულეზეა დამოკიდებული და წინასწარ ფიქსირდება.",
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
        a: "For a new house the facade is part of the architectural project (GEL 10–40 per m², depending on the work). A separate facade design for an existing house is priced by size and complexity and fixed in advance.",
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
  "arqiteqturuli-nakhazebi": {
    ka: [
      {
        q: "რა ნახაზები შედის არქიტექტურულ პროექტში?",
        a: "გენერალური გეგმა, სართულების გეგმები, ჭრილები, ფასადები, სახურავის გეგმა, კვანძები და დეტალები, კარ-ფანჯრის სპეციფიკაცია, ფართობების ექსპლიკაცია და 3D ვიზუალიზაცია.",
      },
      {
        q: "რა განსხვავებაა ესკიზურ და სამუშაო პროექტს შორის?",
        a: "ესკიზური პროექტი განსაზღვრავს შენობის მოცულობას, გეგმარებას და იერსახეს. სამუშაო პროექტი დეტალური ტექნიკური დოკუმენტაციაა, რომლითაც მშენებელი მუშაობს.",
      },
      {
        q: "რა ნახაზები სჭირდება მშენებლობის ნებართვას?",
        a: "დამოკიდებულია შენობის კლასზე: I კლასის მცირე ობიექტს გამარტივებული პაკეტი სჭირდება, II და III კლასის შენობებს კი სრული არქიტექტურული და კონსტრუქციული პროექტი.",
      },
      PRICE_Q.ka,
    ],
    en: [
      {
        q: "Which drawings does an architectural project include?",
        a: "A site plan, floor plans, sections, facades, a roof plan, details, a door and window schedule, an area schedule and a 3D visualisation.",
      },
      {
        q: "What is the difference between a concept design and working drawings?",
        a: "The concept design defines the building's volume, layout and appearance. Working drawings are the detailed technical documentation the builder works from.",
      },
      {
        q: "Which drawings does a building permit require?",
        a: "It depends on the building class: a small Class I building needs a simplified package, while Class II and III buildings need a full architectural and structural project.",
      },
      PRICE_Q.en,
    ],
  },
  "rogor-avirchiot-arqiteqturuli-kompania": {
    ka: [
      {
        q: "როგორ ავირჩიოთ სანდო არქიტექტურული კომპანია?",
        a: "შეამოწმეთ რეალური პროექტების პორტფოლიო, Google-ის შეფასებების ტექსტები, ვინ ამზადებს კონსტრუქციულ ნაწილს, უძღვება თუ არა კომპანია შეთანხმებას და წერია თუ არა ვადები და გადახდის ეტაპები ხელშეკრულებაში.",
      },
      {
        q: "რა არის წითელი დროშა არქიტექტურული კომპანიის არჩევისას?",
        a: "ზუსტი ფასი ნაკვეთის გაცნობამდე, უარი წერილობით ხელშეკრულებაზე, პორტფოლიო მხოლოდ ვიზუალიზაციებით, ნებართვის აღების თქვენთვის დატოვება და გაურკვეველი პასუხი ვადებზე.",
      },
      {
        q: "რატომ ჯობია არქიტექტურა და კონსტრუქცია ერთ გუნდში?",
        a: "როცა ყველა ნაწილი ერთ გუნდშია, ნახაზები ერთმანეთს ემთხვევა და რამდენიმე შემსრულებლის კოორდინაცია თქვენ არ გიწევთ.",
      },
      PRICE_Q.ka,
    ],
    en: [
      {
        q: "How do you choose a reliable architecture company?",
        a: "Check a portfolio of real projects, the text of its Google reviews, who prepares the structural part, whether the company handles approval, and whether timelines and payment stages are in the contract.",
      },
      {
        q: "What are the red flags when choosing an architecture company?",
        a: "An exact price before seeing the plot, refusing a written contract, a portfolio of visualisations only, leaving the permit to you, and vague answers about timelines.",
      },
      {
        q: "Why is it better to have architecture and structure in one team?",
        a: "When every part is in one team, the drawings match each other and you don't have to coordinate several contractors.",
      },
      PRICE_Q.en,
    ],
  },
  "kerdzo-sakhlis-msheneblobis-gzamkvlevi": {
    ka: [
      {
        q: "საიდან დავიწყო კერძო სახლის აშენება?",
        a: "მიწის ნაკვეთის შემოწმებით: ზონა, საკადასტრო მონაცემები, K1 და K2 კოეფიციენტები, რელიეფი და შეზღუდვები. სწორედ ეს განსაზღვრავს, რა ზომის სახლი შეიძლება აშენდეს.",
      },
      {
        q: "რა ეტაპებისგან შედგება სახლის აშენება?",
        a: "ნაკვეთის შემოწმება, არქიტექტურული პროექტი, კონსტრუქციული და საინჟინრო ნაწილი, შეთანხმება და მშენებლობის ნებართვა, შემდეგ მშენებლობა და ავტორის ზედამხედველობა.",
      },
      {
        q: "რა შეცდომები ჯდება ყველაზე ძვირი?",
        a: "დიზაინის დაწყება ნაკვეთის შემოწმებამდე, მშენებლობის დაწყება ნებართვამდე, სამუშაოების სხვადასხვა ადამიანთან გაფანტვა და კონცეფციის ხშირი ცვლილება.",
      },
      PRICE_Q.ka,
    ],
    en: [
      {
        q: "Where do I start when building a private house?",
        a: "With a plot check: zone, cadastral data, K1 and K2 coefficients, terrain and restrictions. This determines what size of house can be built.",
      },
      {
        q: "What are the stages of building a house?",
        a: "Plot check, architectural project, structural and engineering part, approval and building permit, then construction with architect's supervision.",
      },
      {
        q: "Which mistakes cost the most?",
        a: "Starting the design before checking the plot, starting construction before the permit, splitting the work among different people and frequently changing the concept.",
      },
      PRICE_Q.en,
    ],
  },
  "msheneblobis-nebartvis-agheba-sakartveloshi": {
    ka: [
      {
        q: "რამდენ ხანს გრძელდება მშენებლობის ნებართვის აღება?",
        a: "I კლასი: მუნიციპალიტეტებში დაახლოებით 1 კვირა, თბილისში 1 თვემდე. II კლასი: პრაქტიკაში დაახლოებით 3–4 თვე, პროექტირებასთან ერთად. III კლასის ვადა წინასწარ ზუსტად ვერ ითქმება.",
      },
      {
        q: "რა დოკუმენტებია საჭირო მშენებლობის ნებართვისთვის?",
        a: "ძირითადად ამონაწერი საჯარო რეესტრიდან, საკადასტრო რუკა, არქიტექტურულ-სამშენებლო პირობები, შეთანხმებული არქიტექტურული და კონსტრუქციული პროექტი და საჭიროებისას გეოლოგიური და გეოდეზიური დასკვნები. ზუსტი სია კლასსა და მუნიციპალიტეტზეა დამოკიდებული.",
      },
      {
        q: "რა ეტაპები აქვს ნებართვის აღებას?",
        a: "სამი ეტაპი: მიწის სამშენებლო პირობების დადგენა, არქიტექტურული პროექტის შეთანხმება და მშენებლობის ნებართვის გაცემა.",
      },
      PRICE_Q.ka,
    ],
    en: [
      {
        q: "How long does getting a building permit take?",
        a: "Class I: about 1 week in municipalities, up to 1 month in Tbilisi. Class II: in practice about 3–4 months, including design. The Class III timeline can't be stated exactly in advance.",
      },
      {
        q: "Which documents does a building permit require?",
        a: "Mainly a public registry extract, a cadastral map, the architectural and building conditions, an approved architectural and structural project and, where needed, geological and geodetic reports. The exact list depends on the class and municipality.",
      },
      {
        q: "What are the stages of getting a permit?",
        a: "Three stages: setting the plot's building conditions, approving the architectural project and issuing the building permit.",
      },
      PRICE_Q.en,
    ],
  },
  "mitsis-nakvetis-shemotsmeba-k1-k2": {
    ka: [
      {
        q: "რა არის K1 კოეფიციენტი?",
        a: "K1 გვიჩვენებს, ნაკვეთის რა ნაწილი შეიძლება დაიკავოს შენობამ მიწაზე. მაგალითად, K1 = 0.5-ის დროს 500 კვ.მ ნაკვეთზე შენობის დაფარვის ფართობი მაქსიმუმ 250 კვ.მ-ია.",
      },
      {
        q: "რა არის K2 კოეფიციენტი?",
        a: "K2 განსაზღვრავს ყველა სართულის ჯამურ დასაშვებ ფართობს. მაგალითად, K2 = 1.5-ის დროს 500 კვ.მ ნაკვეთზე შენობის საერთო ფართობი მაქსიმუმ 750 კვ.მ-ია.",
      },
      {
        q: "რა შევამოწმო მიწის ნაკვეთის ყიდვამდე?",
        a: "ამონაწერი და საკადასტრო მონაცემები, ზონა, K1 და K2 კოეფიციენტები, რელიეფი, მისასვლელი გზა და შესაძლო შეზღუდვები.",
      },
      PRICE_Q.ka,
    ],
    en: [
      {
        q: "What is the K1 coefficient?",
        a: "K1 shows what share of the plot the building may cover. For example, with K1 = 0.5 a 500 m² plot allows a building footprint of up to 250 m².",
      },
      {
        q: "What is the K2 coefficient?",
        a: "K2 sets the total permitted floor area across all storeys. For example, with K2 = 1.5 a 500 m² plot allows a total floor area of up to 750 m².",
      },
      {
        q: "What should I check before buying a plot?",
        a: "The registry extract and cadastral data, the zone, K1 and K2 coefficients, terrain, road access and possible restrictions.",
      },
      PRICE_Q.en,
    ],
  },
  "fasadis-masalebi-aguri-panelebi-filebi": {
    ka: [
      {
        q: "რომელი ფასადის მასალაა ყველაზე ეკონომიური?",
        a: "ყველაზე ეკონომიური და გავრცელებული გადაწყვეტაა დეკორატიული ბათქაში თბოიზოლაციის ფილაზე, თუმცა დროთა განმავლობაში შეიძლება შეღებვა დასჭირდეს.",
      },
      {
        q: "რომელი ფასადის მასალა არ საჭიროებს მოვლას?",
        a: "ფასადის აგური და კერამოგრანიტის ან ქვის ფილები გამძლეა და თითქმის არ საჭიროებს მოვლას.",
      },
      {
        q: "როგორ ავირჩიოთ ფასადის მასალა?",
        a: "გაითვალისწინეთ ბიუჯეტი მონტაჟისა და მოვლის ჩათვლით, კლიმატი, სტილი და ენერგოეფექტურობა. ხშირად საუკეთესო შედეგს 2–3 მასალის კომბინაცია იძლევა.",
      },
      PRICE_Q.ka,
    ],
    en: [
      {
        q: "Which facade material is the most economical?",
        a: "The most economical and common solution is decorative render on insulation boards, although it may need repainting over time.",
      },
      {
        q: "Which facade material needs almost no upkeep?",
        a: "Facing brick and porcelain or stone tiles are durable and need almost no upkeep.",
      },
      {
        q: "How do you choose a facade material?",
        a: "Consider the budget including installation and upkeep, the climate, the style and energy efficiency. A combination of 2–3 materials often gives the best result.",
      },
      PRICE_Q.en,
    ],
  },
  "ufaso-sakhlis-proeqtebi-meriisgan": {
    ka: [
      {
        q: "არსებობს თუ არა მერიის უფასო სახლის პროექტები?",
        a: "თბილისის მერიას წარსულში ჰქონდა კონკურსები, რომელთა პროექტები მსურველებს უფასოდ გადაეცემოდა. პირობები დროთა განმავლობაში იცვლება, ამიტომ აქტუალური ინფორმაცია მერიაში ან მუნიციპალიტეტში გადაამოწმეთ.",
      },
      {
        q: "შეიძლება თუ არა მზა პროექტით პირდაპირ აშენება?",
        a: "ჩვეულებრივ არა: პროექტი ნაკვეთის K1 და K2 კოეფიციენტებს, ზონას, რელიეფსა და გრუნტს უნდა მოერგოს.",
      },
      {
        q: "რა სჭირდება მზა პროექტს მშენებლობის დასაწყებად?",
        a: "ჩვეულებრივ ტოპოგრაფიული აზომვა, გეოლოგიური კვლევა, ნაკვეთზე მორგება, კონსტრუქციული პროექტი, მერიასთან შეთანხმება და მშენებლობის ნებართვა.",
      },
      PRICE_Q.ka,
    ],
    en: [
      {
        q: "Are there free house designs from City Hall?",
        a: "Tbilisi City Hall has held competitions in the past whose designs were given to applicants for free. Conditions change over time, so check the current information with City Hall or your municipality.",
      },
      {
        q: "Can you build directly from a ready-made design?",
        a: "Usually not: the design has to be adapted to the plot's K1 and K2 coefficients, zone, terrain and soil.",
      },
      {
        q: "What does a ready-made design need before construction?",
        a: "Usually a topographic survey, a geological survey, adaptation to the plot, a structural design, approval at City Hall and a building permit.",
      },
      PRICE_Q.en,
    ],
  },
  "sakhlis-proeqtebi-mza-tu-individualuri": {
    ka: [
      {
        q: "მზა სახლის პროექტი ჯობს თუ ინდივიდუალური?",
        a: "მზა პროექტი გამოდგება სწორ, სტანდარტულ ნაკვეთზე, თუ გეგმარება ოჯახს სრულად ერგება. დახრილ ან არასტანდარტულ ნაკვეთზე, მკაცრი K1/K2-ის დროს ინდივიდუალური ჯობს.",
      },
      {
        q: "შეიძლება თუ არა მზა პროექტით პირდაპირ აშენება?",
        a: "ჩვეულებრივ არა: საჭიროა ნაკვეთზე მორგება, აზომვა, გეოლოგია, კონსტრუქციული პროექტი, შეთანხმება და მშენებლობის ნებართვა.",
      },
      {
        q: "რა ღირს სახლის პროექტი?",
        a: "ასიმეტრიაში ფასი 10–40 ლარს შორის მერყეობს კვ.მ-ზე, სამუშაოს მიხედვით, და წინასწარ ფიქსირდება ხელშეკრულებით.",
      },
      PRICE_Q.ka,
    ],
    en: [
      {
        q: "Is a ready-made or a custom house design better?",
        a: "A ready-made design works on a flat, standard plot if the layout fully suits the family. On a sloping or non-standard plot, or with strict K1/K2, a custom design is better.",
      },
      {
        q: "Can you build directly from a ready-made design?",
        a: "Usually not: it needs adapting to the plot, a survey, geology, a structural design, approval and a building permit.",
      },
      {
        q: "How much does a house design cost?",
        a: "At Asymmetry the price ranges from GEL 10 to 40 per m², depending on the work, and is fixed in advance in the contract.",
      },
      PRICE_Q.en,
    ],
  },
  "tanamedrove-sakhlis-proeqti": {
    ka: [
      {
        q: "რით გამოირჩევა თანამედროვე სახლი?",
        a: "მარტივი ფორმებით, დიდი ფანჯრებით, ღია გეგმარებითა და ბუნებრივი მასალების კომბინაციით.",
      },
      {
        q: "დიდი ფანჯრები სახლს ხომ არ გადაახურებს?",
        a: "თუ მინა მზის მიმართულებასთან ერთად არ დაიგეგმა, შეიძლება. ამიტომ ფანჯრების განლაგება პროექტის ეტაპზე უნდა გადაწყდეს.",
      },
      {
        q: "რა მოიცავს თანამედროვე სახლის პროექტი?",
        a: "ნაკვეთის შემოწმებას, კონცეფციას და 3D ვიზუალიზაციას, სამუშაო ნახაზებს, კონსტრუქციულ პროექტს და მშენებლობის ნებართვის აღებას, მომსახურების მოცულობის მიხედვით.",
      },
      PRICE_Q.ka,
    ],
    en: [
      {
        q: "What sets a modern house apart?",
        a: "Simple forms, large windows, an open layout and a combination of natural materials.",
      },
      {
        q: "Won't large windows overheat the house?",
        a: "They can if the glazing isn't planned with the direction of the sun, so window placement should be decided at the design stage.",
      },
      {
        q: "What does a modern house design include?",
        a: "A plot check, concept and 3D visualisation, working drawings, a structural design and obtaining the building permit, depending on the scope of service.",
      },
      PRICE_Q.en,
    ],
  },
  "konstruqciuli-proeqti": {
    ka: [
      {
        q: "რა არის კონსტრუქციული პროექტი?",
        a: "დოკუმენტაცია, რომელიც აღწერს საძირკველს, სვეტებს, კედლებს, გადახურვებს და სხვა მზიდ ელემენტებს, რათა შენობა უსაფრთხოდ იდგეს.",
      },
      {
        q: "რატომ სჭირდება კონსტრუქციულ პროექტს გეოლოგია?",
        a: "საძირკვლის ტიპი გრუნტზეა დამოკიდებული, ამიტომ გათვლა გეოლოგიურ დასკვნას ეყრდნობა.",
      },
      {
        q: "სჭირდება თუ არა კონსტრუქციული პროექტი ნებართვას?",
        a: "II და III კლასის შენობებს სრული არქიტექტურული და კონსტრუქციული პროექტი სჭირდებათ.",
      },
      PRICE_Q.ka,
    ],
    en: [
      {
        q: "What is a structural design?",
        a: "Documentation of the foundation, columns, walls, slabs and other load-bearing elements, so the building stands safely.",
      },
      {
        q: "Why does a structural design need geology?",
        a: "The foundation type depends on the soil, so the calculation relies on a geological report.",
      },
      {
        q: "Does a building permit require a structural design?",
        a: "Class II and III buildings need a full architectural and structural project.",
      },
      PRICE_Q.en,
    ],
  },
}
