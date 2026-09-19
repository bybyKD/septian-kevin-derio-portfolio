"use client"

import Link from "next/link"

import { BrandAssetsMenu } from "@/registry/components/brand-assets-menu"

export default function BrandAssetsMenuDemo() {
  return (
    <div className="flex flex-col items-center gap-4">
      <BrandAssetsMenu
        logomark={<DerioMark />}
        logomarkSVG={LOGOMARK_SVG}
        logotypeSVG={LOGOTYPE_SVG}
        brandGuidelinesURL="https://example.com/brand-guidelines"
        brandAssetsURL="https://example.com/brand-assets.zip"
      >
        <Link href="/" aria-label="Home">
          <DerioMark className="h-8 text-foreground" />
        </Link>
      </BrandAssetsMenu>

      <div className="text-sm text-muted-foreground">
        <span className="hidden pointer-fine:inline-block">
          Right-click the logo
        </span>
        <span className="hidden pointer-coarse:inline-block">
          Press & hold the logo
        </span>
      </div>
    </div>
  )
}

const LOGOMARK_SVG =
  '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 256 256"><path fill="currentColor" d="M0 0h64v256H0V0ZM192 0h64v256h-64V0ZM64 0h128v64H64V0ZM64 192h128v64H64v-64Z"/></svg>'

const LOGOTYPE_SVG =
  '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 512 128"><path fill="currentColor" d="M0 0h32v128H0V0ZM96 0h32v128H96V0ZM32 0h64v32H32V0ZM32 96h64v32H32V96Z"/><text x="148" y="94" fill="currentColor" fontSize="96" fontFamily="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace" fontWeight="700" letterSpacing="4">ERIO</text></svg>'

function DerioMark(props: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 256 256"
      aria-hidden
      {...props}
    >
      <path
        fill="currentColor"
        d="M0 0h64v256H0V0ZM192 0h64v256h-64V0ZM64 0h128v64H64V0ZM64 192h128v64H64v-64Z"
      />
    </svg>
  )
}
