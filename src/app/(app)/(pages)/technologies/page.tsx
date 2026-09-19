import type { Metadata } from "next"
import { addQueryParams } from "@/utils/url"

import { UTM_PARAMS, X_HANDLE } from "@/config/site"
import { jsonLdBreadcrumbList, JsonLdScript } from "@/lib/json-ld"
import {
  PageHeading,
  PageHeadingDescription,
  PageHeadingTagline,
  PageHeadingTitle,
} from "@/components/page-heading"
import { TechnologyItem } from "@/features/technology/components/technology-item"
import { TECHNOLOGIES } from "@/features/technology/data"
import type { Technology } from "@/features/technology/types"

const title = "Technologies"
const description =
  "The tools and frameworks I reach for across the whole stack."

const ogImage = `/og/simple?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}`

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/technologies",
  },
  openGraph: {
    url: "/technologies",
    type: "website",
    images: {
      url: ogImage,
      width: 1200,
      height: 630,
      alt: title,
    },
  },
  twitter: {
    card: "summary_large_image",
    site: X_HANDLE,
    creator: X_HANDLE,
    images: [ogImage],
  },
}

export default function Page() {
  const categories = groupByCategory(TECHNOLOGIES)

  return (
    <>
      <JsonLdScript
        data={jsonLdBreadcrumbList([
          {
            name: "Home",
            href: "/",
          },
          {
            name: "Technologies",
            href: "/technologies",
          },
        ])}
      />

      <div>
        <PageHeading>
          <PageHeadingTagline>Technologies</PageHeadingTagline>
          <PageHeadingTitle>The stack I build with.</PageHeadingTitle>
          <PageHeadingDescription>{description}</PageHeadingDescription>
        </PageHeading>

        <div className="h-4" />
        <div className="screen-line-bottom h-px" />

        {Object.entries(categories).map(([category, items]) => (
          <TechnologyGroup key={category} category={category} items={items} />
        ))}

        <div className="screen-line-top h-4" />
      </div>
    </>
  )
}

function TechnologyGroup({
  category,
  items,
}: {
  category: string
  items: Technology[]
}) {
  return (
    <div>
      <h2 className="p-4 font-heading text-sm/none font-medium tracking-wider text-muted-foreground">
        {category}
      </h2>

      <ul className="grid grid-cols-2 gap-4 px-4 pb-4 sm:grid-cols-3 lg:grid-cols-4">
        {items.map((item) => (
          <li key={item.name}>
            <TechnologyItem
              href={addQueryParams(item.url, UTM_PARAMS)}
              aria-label={`${item.name} website`}
              className="flex h-24 flex-col items-center justify-center gap-3 rounded-xl bg-surface p-4 inset-ring-1 inset-ring-border/64 hover:bg-accent-muted"
            >
              <span
                className="flex size-8 items-center justify-center text-foreground [&_svg]:size-full [&_svg]:p-0.5"
                aria-hidden
              >
                {item.icon}
              </span>
              <span className="font-mono text-xs text-muted-foreground">
                {item.name}
              </span>
            </TechnologyItem>
          </li>
        ))}
      </ul>
    </div>
  )
}

function groupByCategory(items: Technology[]): Record<string, Technology[]> {
  return items.reduce<Record<string, Technology[]>>((acc, item) => {
    for (const category of item.categories) {
      ;(acc[category] ??= []).push(item)
    }
    return acc
  }, {})
}
