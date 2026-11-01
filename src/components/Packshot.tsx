type PackshotProps = {
  className?: string
  priority?: boolean
  alt?: string
  sizes?: string
}

const PACKSHOT_ALT =
  'Bouteille SEALSI Oceanic Scent 5 litres, bleue avec bouchon doré et étiquette étoile'

export function Packshot({
  className,
  priority = false,
  alt = PACKSHOT_ALT,
  sizes,
}: PackshotProps) {
  return (
    <img
      src="/assets/sealsi-oceanic-packshot.webp"
      srcSet={[
        '/assets/sealsi-oceanic-packshot-320.webp 320w',
        '/assets/sealsi-oceanic-packshot-480.webp 480w',
        '/assets/sealsi-oceanic-packshot.webp 575w',
        '/assets/sealsi-oceanic-packshot-640.webp 640w',
      ].join(', ')}
      sizes={sizes}
      alt={alt}
      width={575}
      height={1200}
      className={className}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      decoding="async"
    />
  )
}
