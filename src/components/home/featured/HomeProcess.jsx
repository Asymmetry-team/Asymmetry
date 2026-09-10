import React from "react"
import { Link } from "react-router-dom"
import { Icon } from "@iconify/react"
import { processSteps } from "../../data/Data"
import { useLang } from "../../../i18n"

// The "როგორ ვმუშაობთ" process bubble. Rendered inside <Featured> beside the
// services bubble on desktop, and separately (via <Home>) between the projects
// and the blog on mobile — only one copy is visible at a time (display swap).
const HomeProcess = ({ className = "" }) => {
  const { t, tr } = useLang()
  return (
    <div className={`bubble proc-bubble ${className}`}>
      <div className="bubble-head">
        <span className="bubble-title grad-head grad-head-3">
          {t("home.process")}
        </span>
      </div>
      <div className="proc-grid">
        {processSteps.map((s, i) => (
          <Link className="proc-card" to={`/process/${s.slug}`} key={i}>
            <span className="proc-num-bg" aria-hidden="true">
              {i + 1}
            </span>
            <span className="proc-ico">
              <Icon icon={s.icon} />
            </span>
            <div className="proc-panel">
              <span className="proc-label">{`${i + 1} ${tr("ეტაპი")}`}</span>
              <h4>{tr(s.title)}</h4>
              <span className="proc-underline" aria-hidden="true" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default HomeProcess
