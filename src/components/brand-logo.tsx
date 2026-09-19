import { cn } from "@/lib/utils"

type BrandLogoProps = {
  className?: string
  mark?: boolean
}

export function BrandLogo({ className, mark = false }: BrandLogoProps) {
  if (mark) {
    return (
      <img
        src="/favicon-32x32.png"
        alt=""
        aria-hidden
        draggable={false}
        className={cn("size-5 shrink-0", className)}
      />
    )
  }

  return (
    <span
      aria-hidden
      className={cn(
        "flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-neutral-950",
        className
      )}
    >
      <img
        src="/logo.png"
        alt=""
        draggable={false}
        className="size-full object-contain p-1"
      />
    </span>
  )
}
