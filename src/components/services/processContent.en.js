// English overlay for processContent.js — merged with localize(ka, en) when the
// language is EN. Same keys and array indices as the Georgian; anything missing
// falls back to Georgian. Georgian stays the prerendered, SEO version.
export const processContentEn = {
  konsultacia: {
    metaTitle: "Architect Consultation — Checking a Plot Before You Buy | Asymmetry",
    metaDescription: "An architect's consultation before buying a plot: we check the building conditions, building class, timelines and price. Just tell us the cadastral code.",
    hero: {
      eyebrow: "How we work · Step 1",
      h1: "Architect Consultation",
      imageAlt: "Architect consultation — checking a plot of land | Asymmetry",
    },
    faq: [
      { q: "Why do you need an architect's consultation before buying land?", a: "Because the plot may not meet the building conditions — you could buy it and then be unable to build anything. The architect first checks the plot's building conditions, so your money isn't spent for nothing." },
      { q: "What information do you need to check a plot?", a: "The plot's cadastral code is enough. With this code we review the plot's building conditions — the functional zone, development parameters, geodynamics and restriction zones." },
      { q: "What does the building class determine?", a: "The building class (I, II or III) is set by floor area and height, and determines the permit and approval procedure. Class I — 0–60 m² and up to 5 m; Class II — 60–500 m² and up to 12 m; Class III — 500–6000 m², with the height depending on the functional zone." },
      { q: "How long does project approval take?", a: "For Class I projects (0–60 m²): about 1 week in a municipality, 1 month in Tbilisi. For Class II projects (60–500 m²): 3–4 months in a municipality, 3–4 months in Tbilisi." },
      { q: "How is the price calculated?", a: "To get a price, write to us (on desktop) or call us (on mobile) and give us the plot's cadastral code and the building's approximate floor area. With these two details we calculate an individual cost." },
    ],
  },

  koncefcia: {
    metaTitle: "Concept Design and 3D Visualisation | Asymmetry",
    metaDescription: "Concept design and 3D visualisation: massing, facades and a material palette — see your building before construction. Step 2 of our process.",
    hero: {
      eyebrow: "How we work · Step 2",
      h1: "Concept and 3D Visualisation",
      lead: "Before we draw a single line of the working drawings, we make the idea visible. At the concept stage we create the massing, photorealistic 3D visualisation and a material palette — so you can see and approve your building before construction begins.",
      tag: { label: "3D visualisation" },
      badges: ["Massing", "3D visualisation", "Material palette", "Facade concept"],
      imageAlt: "Concept design and 3D visualisation | Asymmetry",
    },
    stats: [{ l: "photorealistic renders" }, { v: "Ext+Int", l: "exterior and interior" }, { v: "2nd", l: "of 4 steps" }, { l: "revisions until approval" }],
    sections: [
      { h2: "What is a concept design?", p: [
        "A concept is the visible, spatial expression of the project's main idea — the building's massing, the logic of the layout, the character of the facade and the language of materials. It's the stage where we make the key aesthetic and functional decisions before moving on to detailed technical drawings.",
      ] },
      { h2: "What does 3D visualisation include?", p: [
        "3D visualisation turns the project from a picture into reality. We create photorealistic renders — of both the exterior and the interior — showing the proportions, lighting, materials and colours. This rules out misunderstandings and lets you make changes while they're still on screen, not during construction.",
      ] },
    ],
    includes: [
      { title: "Massing", text: "The building's mass, proportions and position on the plot." },
      { title: "3D visualisation", text: "Photorealistic renders — exterior and interior." },
      { title: "Material palette", text: "Choosing materials and colours for the facade and interior." },
      { title: "Layout options", text: "A functional layout solution and alternatives." },
      { title: "Facade concept", text: "The facade's character, rhythm and architectural language." },
      { title: "Approval and revisions", text: "We refine the details until you fully approve them." },
    ],
    process: [
      { title: "Analysing the idea", text: "We build on the vision agreed at the consultation." },
      { title: "Massing", text: "We create the building's mass and the logic of the layout." },
      { title: "3D and materials", text: "We prepare the visualisation and the material palette." },
      { title: "Approval", text: "We agree the concept before moving on to the working drawings." },
    ],
    advantages: [
      { title: "See it before it's built", text: "You see the result in a render before any money is spent." },
      { title: "Changes on screen", text: "Revising a visualisation is cheaper than revising a building." },
      { title: "Aesthetics + function", text: "We balance a beautiful form with a comfortable space." },
      { title: "Your approval", text: "We only move on to the working drawings once you agree." },
    ],
    faq: [
      { q: "Is 3D visualisation included in the project?", a: "Yes. The concept stage includes photorealistic 3D visualisation, so you can see and refine the building before construction." },
      { q: "Can I make changes to the concept?", a: "Of course. That's exactly what the concept is for — to refine it together. We work on the details until you fully approve them." },
      { q: "What's the difference between the concept and the working drawings?", a: "The concept sets the idea and the main decisions (visualisation, materials); the working drawings turn that approved idea into detailed technical documentation." },
    ],
  },

  "samushao-proeqti": {
    metaTitle: "Project Approval and Working Drawings | Asymmetry",
    metaDescription: "Working drawings: detailed technical drawings, junction details, specifications and a cost estimate for construction. Asymmetry, step 3.",
    hero: {
      eyebrow: "How we work · Step 3",
      h1: "Working Drawings and Approval",
      lead: "The approved concept comes to life in the working drawings. We prepare detailed technical drawings, specifications and a cost estimate — the documentation the builder works from directly, with no inaccuracies.",
      tag: { label: "Working drawings" },
      badges: ["Technical drawings", "Specifications", "Cost estimate", "Junction details"],
      imageAlt: "Working drawings and technical drawings | Asymmetry",
    },
    stats: [{ l: "accurate drawings" }, { v: "Specs", l: "materials and junctions" }, { v: "3rd", l: "of 4 steps" }, { l: "complete documentation" }],
    sections: [
      { h2: "What are working drawings?", p: [
        "Working drawings are the detailed technical documentation the building is actually built from. If the concept answers the question \"what will it be like\", the working drawings answer \"exactly how\" — every dimension, junction, material and element is fixed in the drawings.",
      ] },
      { h2: "Why can't a building be built without working drawings?", p: [
        "Without working drawings, the builder is forced to make decisions on site, \"by eye\" — which leads to mistakes, disputes and extra costs. Accurate documentation makes construction predictable: it's clear what is done, with what, and how.",
      ] },
    ],
    includes: [
      { title: "Technical drawings", text: "Plans, sections and elevations the builder works from." },
      { title: "Junction details", text: "Accurate detailing of complex and important junctions." },
      { title: "Specifications", text: "A detailed list of materials and elements." },
      { title: "Cost estimate", text: "Calculating the cost of materials and work." },
      { title: "Coordinating the parts", text: "Aligning the architecture, structure and engineering." },
      { title: "Project approval", text: "Preparing the documentation for subsequent approval." },
    ],
    process: [
      { title: "Approved concept", text: "We start from the concept you've approved." },
      { title: "Technical drawings", text: "We prepare detailed plans, sections and junctions." },
      { title: "Specs and cost estimate", text: "We draw up the specifications and the cost estimate." },
      { title: "Approval", text: "We prepare the package for subsequent approval." },
    ],
    advantages: [
      { title: "Accurate and unambiguous", text: "Every dimension is fixed — the builder doesn't have to \"guess\" anything." },
      { title: "Predictable costs", text: "The cost estimate makes the budget clear and manageable." },
      { title: "Less risk", text: "Complete documentation reduces mistakes and disputes." },
      { title: "Coordinated parts", text: "Architecture and engineering don't contradict each other." },
    ],
    faq: [
      { q: "What do the working drawings include?", a: "The working drawings include detailed technical drawings, junction details, specifications and a cost estimate — everything needed to run construction accurately." },
      { q: "Is a cost estimate included?", a: "Yes. The working drawings come with a cost estimate that helps you plan and control the budget realistically." },
      { q: "Can I order just the working drawings?", a: "Yes, if you already have an approved concept or sketch. If not, we'll go through the concept stage first." },
    ],
  },

  "avtoris-zedamxedveloba": {
    metaTitle: "Architect's Supervision — Construction Quality Control | Asymmetry",
    metaDescription: "Architect's supervision: the architect makes sure construction follows the project exactly — down to the last detail. Asymmetry, step 4.",
    hero: {
      eyebrow: "How we work · Step 4",
      h1: "Architect's Supervision",
      lead: "A good project can be ruined by poor execution. Architect's supervision means the architect monitors quality during construction — so every detail is built exactly as the project intends.",
      tag: { label: "Quality control" },
      badges: ["Workmanship control", "Compliance with the project", "Supervision of details", "Quality guarantee"],
      imageAlt: "Architect's supervision on a construction site | Asymmetry",
    },
    stats: [{ l: "compliance with the project" }, { v: "Detail", l: "down to the last detail" }, { v: "4th", l: "of 4 steps" }, { l: "quality guarantee" }],
    sections: [
      { h2: "What is architect's (author's) supervision?", p: [
        "Architect's supervision is a service in which the project's author — the architect — follows the construction process and checks whether the work is really being done according to the project. It's the bridge between the idea on paper and the real, finished building.",
      ] },
      { h2: "What does architect's supervision give you?", p: [
        "Many small decisions are made during construction — and quality hides in the details. The architect's involvement ensures these decisions don't drift away from the overall design, that discrepancies are fixed in time, and that the final result matches exactly what you approved.",
      ] },
    ],
    includes: [
      { title: "Workmanship control", text: "We check whether the work is being done to a high standard." },
      { title: "Compliance with the project", text: "We compare what's built with the project — with no deviations." },
      { title: "Supervision of details", text: "We control junctions and details right to the end." },
      { title: "Coordination with the builder", text: "We work with the crew to resolve questions quickly." },
      { title: "Managing changes", text: "We resolve issues that come up on site in line with the project's logic." },
      { title: "Quality guarantee", text: "The final result matches the approved project." },
    ],
    process: [
      { title: "Supervision plan", text: "We set out which construction stages we check, and what." },
      { title: "Site inspections", text: "We visit the site regularly and check the work." },
      { title: "Comparison with the project", text: "We compare the completed work with the approved project." },
      { title: "Correction and sign-off", text: "We fix discrepancies in time and confirm the quality." },
    ],
    advantages: [
      { title: "The design, all the way through", text: "The finished building matches the project exactly." },
      { title: "Preventing mistakes", text: "Discrepancies are fixed early and cheaply." },
      { title: "Protecting your costs", text: "Avoiding rework protects your budget." },
      { title: "Peace of mind", text: "You know a professional is overseeing the process." },
    ],
    faq: [
      { q: "What does architect's supervision mean?", a: "It means the architect who authored the project checks during construction whether the work is being done exactly according to the project." },
      { q: "Is architect's supervision mandatory?", a: "In some cases it's a condition of the permit, but regardless of that, it's the best guarantee of quality — it ensures the project is built without changes." },
      { q: "How does supervision work in practice?", a: "The architect regularly inspects the site, compares the completed work with the project, coordinates with the builder and fixes discrepancies in time." },
    ],
  },
}
