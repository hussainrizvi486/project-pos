/* eslint-disable @typescript-eslint/no-explicit-any */

import * as React from "react"

const MOBILE_BREAKPOINT = 768


export function cn(...args: (string)[]): string {
    return args.filter(String).join(" ");
}


export function useIsMobile() {
    const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

    React.useEffect(() => {
        const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
        const onChange = () => {
            setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
        }
        mql.addEventListener("change", onChange)
        setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
        return () => mql.removeEventListener("change", onChange)
    }, [])

    return !!isMobile
}



export function decimal(value: any, precision = 2) {
    const v = isNaN(parseFloat(value)) ? 0 : parseFloat(value);
    return v.toFixed(precision);
}
