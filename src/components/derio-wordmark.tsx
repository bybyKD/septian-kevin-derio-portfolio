export function DerioWordmark(props: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 512 128"
      aria-hidden
      {...props}
    >
      <path
        fill="currentColor"
        d="M0 0h32v128H0V0ZM96 0h32v128H96V0ZM32 0h64v32H32V0ZM32 96h64v32H32V96Z"
      />
      <text
        x="148"
        y="94"
        fill="currentColor"
        fontSize="96"
        fontFamily="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
        fontWeight="700"
        letterSpacing="4"
      >
        ERIO
      </text>
    </svg>
  )
}

export function getWordmarkSVG() {
  return `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 512 128"><path fill="currentColor" d="M0 0h32v128H0V0ZM96 0h32v128H96V0ZM32 0h64v32H32V0ZM32 96h64v32H32V96Z"/><text x="148" y="94" fill="currentColor" fontSize="96" fontFamily="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace" fontWeight="700" letterSpacing="4">ERIO</text></svg>`
}
