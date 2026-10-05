// English translations of the real Google reviews (googleReviews.json), keyed
// by reviewer name (lower-case). Shown only in the EN version, always with a
// "Translated from Georgian" note; a review without an entry here (e.g. a new
// one fetched at build time) is shown in its original Georgian, unlabelled.

const TEXT_EN = {
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
