import React, { forwardRef, ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    children: React.ReactNode;
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ children, className = "", ...props }, ref) => {
    return (
        <button
            ref={ref}
            className={`inline-flex items-center rounded-md bg-gray-900 px-4 py-2 text-sm text-white transition duration-150 ease-in-out hover:bg-gray-600 ${className}`}
            {...props}
        >
            {children}
        </button>
    );
});

Button.displayName = "Button";

export { Button };


{/* <svg className="mr-3 -ml-1 size-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> */ }