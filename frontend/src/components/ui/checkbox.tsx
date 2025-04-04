import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";
import { cn } from "../../utils";
import { cva } from "class-variance-authority";

// const buttonVariants = cva(
//     "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
//     {
//         variants: {
//             variant: {
//                 default: "bg-primary text-primary-foreground hover:bg-primary/90",
//                 destructive:
//                     "bg-destructive text-destructive-foreground hover:bg-destructive/90",
//                 outline:
//                     "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
//                 secondary:
//                     "bg-secondary text-secondary-foreground hover:bg-secondary/80",
//                 ghost: "hover:bg-accent hover:text-accent-foreground",
//                 link: "text-primary underline-offset-4 hover:underline",
//             },
//             size: {
//                 default: "h-10 px-4 py-2",
//                 sm: "h-9 rounded-md px-3",
//                 lg: "h-11 rounded-md px-8",
//                 icon: "h-10 w-10",
//             },
//         },
//         defaultVariants: {
//             variant: "default",
//             size: "default",
//         },
//     }
// )

const Checkbox = React.forwardRef<
    React.ElementRef<typeof CheckboxPrimitive.Root>,
    React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => {
    console.log(props)
    return (
        <CheckboxPrimitive.Root
            ref={ref}
            className={cn(
                "h-4 w-4 shrink-0 rounded overflow-hidden border border-gray-900 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-gray-900 data-[state=checked]:text-white flex items-center justify-center",
                className || ""
            )
            }
            {...props}
        >


            <CheckboxPrimitive.Indicator>
                <svg focusable="false"
                    aria-hidden="true" viewBox="0 0 24 24" data-testid="CheckIcon" className="size-4 text-current fill-current">
                    <path d="M9 16.17 5.53 12.7a.9959.9959 0 0 0-1.41 0c-.39.39-.39 1.02 0 1.41l4.18 4.18c.39.39 1.02.39 1.41 0L20.29 7.71c.39-.39.39-1.02 0-1.41a.9959.9959 0 0 0-1.41 0L9 16.17z"></path>
                </svg>
            </CheckboxPrimitive.Indicator>
        </CheckboxPrimitive.Root >
    )
})
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox };


