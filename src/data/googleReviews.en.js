// English translations of the real Google reviews (googleReviews.json), keyed
// by reviewer name (lower-case). Shown only in the EN version, always with a
// "Translated from Georgian" note; a review without an entry here (e.g. a new
// one fetched at build time) is shown in its original Georgian, unlabelled.

const TEXT_EN = {
  "forbidden history":
    "Many thanks to Mr. Lasha for his professionalism and excellent work! Every detail was considered accurately and with taste. If you are looking for quality architectural services, I truly recommend Asymmetry as a team of professionals.",
  "abed elgani yosuf":
    "A wonderful person, top-level architecture, the best service with the best ideas, and perfect English, so the language barrier was never a problem for me. Simply ideal.",
  "alex khaja":
    "I'm satisfied and recommend this company. I got the full architectural services package at a reduced price and in very good quality!",
  "zviad bendeliani":
    "My friends and I had Lasha design 11 houses, practically a small neighbourhood, and we are very pleased with his professionalism and approach, his attention to detail, his knowledge and how he sees the work through to the end. The best architectural service, and Lasha's own attitude to the work also stands out. After this project I recommended him to many people, many of my friends worked with Lasha, and they all thanked me for recommending him.",
  "mariam tkavadze":
    "I really like your architecture: a modern, refined and distinctive design. A professional approach and aesthetics! ❤️",
  "nino kvelashvili":
    "I'm very satisfied with Asymmetry's architectural services.",
  "achi mamuchashvili":
    "We designed a private house. I'm very satisfied with the service and the prices.",
  "teona jikia":
    "A professional approach, excellent taste and quality service. I'm very pleased with the result!",
  "lizi nutsubidze":
    "We designed the architectural project of a private house with Lasha. I really liked their architectural service and got a premium-quality project at an affordable price.",
  "zurab dolenjashvili":
    "We designed a private house. I'm very satisfied with the service and the price.",
  "atosi zurabiani":
    "I'm satisfied with the architectural services.",
  "anamaria gvishiani":
    "The best architectural services, thank you.",
  "mariam gvelesiani":
    "The best architecture company ❤️❤️❤️",
  "la la":
    "I'm very pleased to have worked with this architecture company. The team stands out for its professionalism and responsibility. Ideas and wishes are taken into account as far as possible. I sincerely recommend it to anyone looking for a reliable, professional company.",
  "leon jango":
    "We designed a private house. I'm very satisfied with Asymmetry's architectural service and price. I recommend them!",
  "ლუკა გოგიჩაშვილი":
    "The best architectural services.",
  "lasha gogaladze":
    "The best architectural services, I'm very satisfied 👍👍👍👍",
  "andria zurabiani":
    "I'm very satisfied with Asymmetry's architectural services. The prices are very reasonable and the quality is premium.",
  "bela bolqvadze":
    "If you want a highly professional architect to work with you simply and calmly, someone well versed in every matter who cares about making your plans happen and goes through every detail with you with great professionalism, from my personal experience I would recommend Lasha. I'm very satisfied with his service and he is a pleasure to communicate with. My full recommendation and support, best of luck ❤️",
  "dato xvedelidze":
    "The best service. Trustworthy and reliable.",
  "saba ichkitidze":
    "I'm very satisfied with the architectural services. Lasha is a professional in his work and field, and I recommend him without hesitation ❤️",
  "armazi dundua":
    "Architectural project — fast, refined, tasteful!\nArchitecture company — affordable, high-quality, reliable!",
  "inga vatchridze":
    "I'm very happy with the service I received. The professionalism, responsibility and quality really stand out. While working on the architectural project, he paid close attention to every detail and took my ideas into account precisely and with taste. Communication was also very good and easy.\n\nIf you're looking for a professional architect and high-quality architectural services, I definitely recommend them! Many thanks to Lasha for the excellent work. 👏",
  "nika losaberidze":
    "I needed architectural services without unnecessary complications or delays. Working with you was the right decision.",
  "saba supatashvili":
    "It's very rare to find an architect who understands what the client wants so well. The design and planning were done at the highest level. Thank you for a comfortable collaboration",
  "dato giorgadze": "Reliable and professional architectural services",
  "natia mestvirishvili":
    "I'm very happy with the service ✌️ A high level of professionalism and an excellent vision in architecture.\nCommunication is also incredibly easy and fast.\nI definitely recommend them to anyone who needs high-quality architectural services",
  "gio axaladze":
    "Professionalism, creativity and a sense of responsibility showed throughout the project, which in my opinion is essential for every architect. Thank you…",
  "manana khuchua":
    "Reliable, professional architectural services — I'd recommend them from personal experience",
  "iliko daraselia":
    "Very professional architectural services. They go through every client's problem in detail and offer the best options. The highest-quality architectural service I've ever received in Georgia.\n\nMany thanks to the Asymmetry team 👏",
  "anano machavariani": "The most reliable and professional team 💜💜",
  "cps xsx":
    "I was very happy with the service. The work was done professionally, to a high standard and within the agreed timeline. I especially want to highlight the high level of the architectural services and the responsible approach to the project. I'll definitely recommend them to others.",
  "salome tchitchikoshvili":
    "I'm very happy with the architectural project by \"Asymmetry's architects\". A professional, responsible team with great taste. They took my ideas into account precisely, and in the end we got a very high-quality, refined result. Most importantly, communication with them is easy and pleasant — and yes, I received the service within the agreed timeline 🙏 I definitely recommend them! 👏",
  "veni tchurgulashvili":
    "Choosing this team was one of the best decisions I've made. We put together the house design without hassle or delays, and it turned out exactly as I had imagined 🤍 Thank you!",
  "shorena dzigava":
    "They have very good projects and excellent architectural work 😊 True professionals at what they do 🫶🏼",
  "anastasia vachridze": "Top-quality service",
  "tiko vachridze": "They create amazing projects ♥️!",
  "tornike chaganava":
    "I was looking for high-quality and affordable architectural services, and I was recommended Asymmetry's architects. We went through everything together, and in the end it turned out exactly as I wanted. They have a friendly and professional atmosphere — I'll definitely recommend them",
  "nina nina":
    "The best and most professional architectural services. I'd truly recommend them to everyone from personal experience ❤️",
  "teo chanturia": "A different vision, comfortable service and high quality🌟",
  "tsiklauri maria": "The best architecture company! I'm happy with my house ❤️",
  "natia marsagishvili": "Country house project🏘️",
  "მაკა ჭარაქაშვილი": "They have very good architectural projects 🫶",
  "amir yar":
    "The best architecture company! I'm very happy with the house design and the price! 🙏🏼🙏🏼",
}

// "4 კვირის წინ · Google" → "4 weeks ago · Google"
const roleEn = (role = "") =>
  role
    .replace(/ამ კვირაში/, "This week")
    .replace(/(\d+)\s*კვირის წინ/, (_, n) => `${n} week${n === "1" ? "" : "s"} ago`)
    .replace(/(\d+)\s*თვის წინ/, (_, n) => `${n} month${n === "1" ? "" : "s"} ago`)
    .replace(/(\d+)\s*წლის წინ/, (_, n) => `${n} year${n === "1" ? "" : "s"} ago`)

// EN view of one review: { text, role, translated }
export const reviewEn = (r) => {
  const t = TEXT_EN[(r.name || "").trim().toLowerCase()]
  return { text: t || r.text, role: roleEn(r.role), translated: Boolean(t) }
}
