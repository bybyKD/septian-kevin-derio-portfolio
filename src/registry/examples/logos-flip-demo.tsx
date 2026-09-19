import { LogosFlip } from "@/registry/components/logos-flip"
import { TECHNOLOGIES } from "@/features/technology/data"

export default function LogosFlipDemo() {
  return (
    <LogosFlip className="w-full text-foreground [--column-count:2] sm:[--column-count:4]">
      {TECHNOLOGIES.map((item) => (
        <span
          key={item.name}
          className="flex items-center justify-center [&_svg]:size-8"
        >
          {item.icon}
        </span>
      ))}
    </LogosFlip>
  )
}
