import Link from "next/link"
import { addQueryParams } from "@/utils/url"
import { ArrowRightIcon } from "lucide-react"

import { UTM_PARAMS } from "@/config/site"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { TechnologyItem } from "@/features/technology/components/technology-item"
import { TECHNOLOGIES } from "@/features/technology/data"

import { Panel, PanelDescription, PanelHeader, PanelTitle } from "./panel"

const ID = "technologies"

export function Technologies() {
  return (
    <Panel id={ID} className="screen-line-bottom-none">
      <PanelHeader>
        <PanelTitle>
          Technology
          <span className="block sm:hidden" />, everyday
        </PanelTitle>

        <PanelDescription>
          The tools I grab for when designing, building, and shipping.
        </PanelDescription>
      </PanelHeader>

      <div className="relative py-4">
        <div className="pointer-events-none absolute inset-0 -z-1 grid grid-cols-1 gap-4 max-sm:hidden sm:grid-cols-2">
          <div className="border-r border-line" />
          <div className="border-l border-line" />
        </div>

        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {TECHNOLOGIES.map((item) => (
            <ListItem key={item.name}>
              <TechnologyItem
                className="min-h-20 flex-col gap-2 [&_svg]:size-7"
                href={addQueryParams(item.url, UTM_PARAMS)}
                aria-label={`${item.name} website`}
              >
                <span className="flex items-center justify-center text-foreground [&_svg]:size-7">
                  {item.icon}
                </span>
                <span className="font-mono text-xs text-muted-foreground">
                  {item.name}
                </span>
              </TechnologyItem>
            </ListItem>
          ))}
        </ul>
      </div>

      <div className="screen-line-top -mb-px flex justify-center py-4">
        <Button
          className="gap-2 pr-2.5 pl-3 shadow-[inset_0_0_1px] shadow-foreground/20"
          variant="secondary"
          size="sm"
          nativeButton={false}
          render={<Link href="/technologies" />}
        >
          All technologies
          <ArrowRightIcon />
        </Button>
      </div>
    </Panel>
  )
}

function ListItem({ className, ...props }: React.ComponentProps<"li">) {
  return (
    <li
      className={cn(
        "max-sm:screen-line-top max-sm:screen-line-bottom",
        "sm:nth-[2n+1]:screen-line-top sm:nth-[2n+1]:screen-line-bottom",
        className
      )}
      {...props}
    />
  )
}
