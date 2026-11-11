type LogoProps = {
  variant?: 'navy' | 'white'
  className?: string
}

export function Logo({ variant = 'navy', className }: LogoProps) {
  return (
    <span className="logo-lockup">
      <img
        src={`/assets/sealsi-logo-${variant}.png`}
        alt="SEALSI"
        width={880}
        height={283}
        className={className}
        decoding="async"
      />
    </span>
  )
}
