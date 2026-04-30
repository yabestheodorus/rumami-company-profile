'use client'

import React from 'react'

interface LogoSVGProps extends React.SVGProps<SVGSVGElement> {
  draw?: boolean
}

export default function LogoSVG({ className, draw = false, ...props }: LogoSVGProps) {
  return (
    <svg
      viewBox="0 0 500 500"
      fill="none"
      stroke="currentColor"
      strokeLinecap="butt"
      strokeLinejoin="miter"
      strokeMiterlimit={10}
      className={className}
      data-draw={draw ? "true" : undefined}
      {...props}
    >
      <g transform="matrix(2.1923787,0,0,2.1923787,-835.04523,-335.43742)">
        <path
          transform="rotate(90,495.869,258.173)"
          strokeWidth="14"
          d="M 441.172465,208.464615 l 29.616545,-50.000005 108.939,-0.58303 0.24432,100.22286 0.20884,99.64884 -109.39216,0.71135 -59.23309,-100.00001 Z"
          pathLength={1}
          style={{ '--i': 0 } as any}
        />
        <path
          transform="rotate(90,496.419,261.105)"
          strokeWidth="14"
          d="M 468.54338,232.534215 l 15.09386,-28.738405 55.51999,-0.33511 0.12452,57.6049 0.10643,57.27497 -55.75094,0.40886 -30.18772,-57.47681 Z"
          pathLength={1}
          style={{ '--i': 1 } as any}
        />
        <line
          strokeWidth="14"
          y2="321.75562"
          x2="596.26697"
          y1="321.46909"
          x1="396.84003"
          pathLength={1}
          style={{ '--i': 2 } as any}
        />
        <path
          transform="rotate(104,434.641,186.545)"
          strokeWidth="6"
          d="M 430.10331,186.545245 l 0,-4.609455 9.07506,9.21891 -9.07506,0 Z"
          pathLength={1}
          style={{ '--i': 3 } as any}
        />
      </g>
    </svg>
  )
}
