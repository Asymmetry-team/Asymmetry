import React, { useEffect, useRef } from "react"
import { Icon } from "@iconify/react"
import Heading from "../../common/Heading"
import "./process.css"

const steps = [
  {
    icon: "mdi:comment-search-outline",
    title: "კონსულტაცია",
    text: "ვხვდებით, ვსწავლობთ სივრცეს, ბიუჯეტსა და თქვენს ხედვას.",
  },
  {
    icon: "mdi:cube-scan",
    title: "კონცეფცია",
    text: "3D ვიზუალიზაცია და მასალების პალიტრა დასამტკიცებლად.",
  },
  {
    icon: "mdi:ruler-square-compass",
    title: "სამუშაო პროექტი",
    text: "ტექნიკური ნახაზები, სპეციფიკაციები და ხარჯთაღრიცხვა.",
  },
  {
    icon: "mdi:check-decagram-outline",
    title: "ავტორის ზედამხედველობა",
    text: "ვაკონტროლებთ შესრულებას, სანამ ბოლო დეტალი დგება.",
  },
]

const Process = () => {
  const frameRef = useRef(null)

  // Same scroll-reveal pattern as the project cards: cards start invisible and
  // fade UP as they scroll in. Skipped for the ReactSnap prerender pass so the
  // baked HTML doesn't carry animation state (avoids hydration mismatch); also
  // falls back to showing every card when there is no IntersectionObserver.
  useEffect(() => {
    const el = frameRef.current
    if (!el) return
    if (typeof navigator !== "undefined" && navigator.userAgent === "ReactSnap")
      return
    const cards = el.querySelectorAll(".reveal-card")
    if (typeof IntersectionObserver === "undefined") {
      cards.forEach((c) => c.classList.add("in"))
      return
    }
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.intersectionRatio >= 0.15) e.target.classList.add("in")
          else if (e.intersectionRatio === 0) e.target.classList.remove("in")
        }),
      { threshold: [0, 0.15] }
    )
    cards.forEach((c) => io.observe(c))
    return () => io.disconnect()
  }, [])

  return (
    <section className='process padding' id='home-process'>
      <div className='container'>
        <Heading title='როგორ ვმუშაობთ' subtitle='' accent />

        <div className='process-grid' ref={frameRef}>
          {steps.map((s, i) => (
            <div className='process-card reveal-card' key={i}>
              <span className='process-num'>{`0${i + 1}`}</span>
              <span className='process-ico'>
                <Icon icon={s.icon} />
              </span>
              <h4>{s.title}</h4>
              <p>{s.text}</p>
              {i < steps.length - 1 && (
                <Icon icon='mdi:arrow-right' className='process-arrow' />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Process
