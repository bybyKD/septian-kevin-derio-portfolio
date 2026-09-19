import { LogosCarousel } from "@/registry/components/logos-carousel"
import { TECHNOLOGIES } from "@/features/technology/data"

import { HandwrittenArrow, HandwrittenNote } from "./handwritten-note"
import { Panel } from "./panel"

export function TechnologiesCarousel() {
  return (
    <Panel className="@container screen-line-bottom-none screen-line-top-none">
      <div className="pointer-events-none absolute inset-0 -z-1 grid grid-cols-3 *:border-r *:border-dashed *:border-line @2xl:grid-cols-4">
        <div />
        <div />
        <div className="@max-2xl:hidden" />
      </div>

      <div className="flex justify-center">
        <div className="bg-background px-2 py-4">
          <h2 className="text-center text-sm/none font-medium text-muted-foreground">
            Technologies I use
          </h2>
        </div>
      </div>

      <div className="screen-line-bottom h-px" />

      <ul className="sr-only">
        {TECHNOLOGIES.map((item) => (
          <li key={item.name}>{item.name}</li>
        ))}
      </ul>

      <div
        className="grid grid-cols-3 items-center py-3 text-muted-foreground @2xl:hidden"
        aria-hidden
      >
        {TECHNOLOGIES.map((item) => (
          <span
            key={item.name}
            className="flex items-center justify-center [&_svg]:size-8"
          >
            {item.icon}
          </span>
        ))}
      </div>

      <div className="@max-2xl:hidden" aria-hidden>
        <LogosCarousel
          className="w-full py-4 text-muted-foreground"
          columnCount={6}
        >
          {TECHNOLOGIES.map((item) => (
            <span
              key={item.name}
              className="flex items-center justify-center [&_svg]:size-8"
            >
              {item.icon}
            </span>
          ))}
        </LogosCarousel>
      </div>

      <HandwrittenNote
        className="top-6 right-full mr-3 hidden w-20 flex-col items-end lg:flex"
        aria-hidden
      >
        <span className="-rotate-6">my toolkit</span>
        <HandwrittenArrow className="size-7 -scale-x-100 -rotate-6" />
      </HandwrittenNote>
    </Panel>
  )
}
