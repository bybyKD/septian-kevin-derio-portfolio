export function DerioMark(props: React.ComponentProps<"svg">) {
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

export function getMarkSVG() {
  return `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 256 256"><path fill="currentColor" d="M0 0h64v256H0V0ZM192 0h64v256h-64V0ZM64 0h128v64H64V0ZM64 192h128v64H64v-64Z"/></svg>`
}
