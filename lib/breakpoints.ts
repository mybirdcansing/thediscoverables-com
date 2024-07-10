export enum Breakpoints {
  xs = 430,
  sm = 640,
  md = 768,
  lg = 936,
  xl = 1280,
  '2xl' = 1536,
}

export const BreakpointValues = {
  xs: `${Breakpoints.xs}px`,
  sm: `${Breakpoints.sm}px`,
  md: `${Breakpoints.md}px`,
  lg: `${Breakpoints.lg}px`,
  xl: `${Breakpoints.xl}px`,
  '2xl': `${Breakpoints['2xl']}px`,
}
