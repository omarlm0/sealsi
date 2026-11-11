import { useLanguage } from '../i18n/LanguageContext'

export function BenefitsBar() {
  const { c } = useLanguage()

  return (
    <section className="benefit-bar" aria-label={c.benefits.aria}>
      <div className="wrap">
        {c.benefits.items.map((benefit) => (
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
