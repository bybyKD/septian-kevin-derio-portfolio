import { cn } from "@/lib/utils"

export function TechnologyItem({
  className,
  ...props
}: React.ComponentProps<"a">) {
  return (
    <a
      className={cn(
        "flex items-center justify-center transition-[background-color] ease-out hover:bg-accent-muted",
        className
      )}
      target="_blank"
      rel="noopener"
      {...props}
    />
  )
}
