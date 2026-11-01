import { BENEFITS } from '../data/site'

export function BenefitsBar() {
  return (
    <section className="benefit-bar" aria-label="Les quatre fonctions de la formule">
      <div className="wrap">
        {BENEFITS.map((benefit) => (
          <div className="benefit" key={benefit.icon}>
            <img
              src={`/assets/icon-${benefit.icon}.svg`}
              alt=""
              width={128}
              height={128}
              loading="lazy"
              decoding="async"
            />
            <div>
              {benefit.title}
              <span>{benefit.text}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
