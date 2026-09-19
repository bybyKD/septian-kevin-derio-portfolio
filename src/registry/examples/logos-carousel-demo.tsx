import { LogosCarousel } from "@/registry/components/logos-carousel"
import { TECHNOLOGIES } from "@/features/technology/data"

export default function LogosCarouselDemo() {
  return (
    <LogosCarousel className="w-full py-4 text-foreground" columnCount={6}>
      {TECHNOLOGIES.map((item) => (
        <span
          key={item.name}
          className="flex items-center justify-center [&_svg]:size-8"
        >
          {item.icon}
        </span>
      ))}
    </LogosCarousel>
  )
}
