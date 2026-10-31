import React from "react"
import { useLang } from "../../i18n"
import "./founderBadge.css"

export const FOUNDER_PHOTO = "/images/customer/team-1.jpg"

// Photo + name + role of the founder, for the dark blog hero.
const FounderBadge = ({ prefix }) => {
  const { tr } = useLang()
  const name = tr("ლაშა კირვალიძე")
  return (
    <div className="founder-badge">
      <img src={FOUNDER_PHOTO} alt={name} width="52" height="52" loading="lazy" />
      <div className="founder-badge-text">
        <span className="founder-badge-name">
          {prefix ? `${prefix} ${name}` : name}
        </span>
        <span className="founder-badge-role">{tr("დამფუძნებელი/მთ. არქიტექტორი")}</span>
      </div>
    </div>
  )
}

export default FounderBadge
