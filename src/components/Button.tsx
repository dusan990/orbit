import { ButtonHTMLAttributes, ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

type ButtonProps<E extends ElementType> = {
   children: ReactNode;
   as?: E;
	iconStart?: React.ReactNode;
	iconEnd?: React.ReactNode;
   variant: "btn-primary" | "btn-default" | "btn-ghost";
   onClick?: React.MouseEventHandler<HTMLButtonElement>;
   tabIndex?: number;
}

const Button = <E extends ElementType = "button">({
   children,
   as,
   variant,
   onClick,
   iconStart,
   iconEnd,
   tabIndex = 0,
   ...props
}: ButtonProps<E> & ComponentPropsWithoutRef<E>) => {
   const Component = as || "button";
   
   return (
      <Component 
         variant={variant}
         className={
            `btn ${variant}` +
            `${iconStart ? ' btn_icon-lead ' : ''}`
            + `${iconEnd ? ' btn_icon-trail' : ''}`
         }
         onClick={onClick}
         tabIndex={tabIndex}
         {...props}
      >
         {iconStart}
         {children}
         {iconEnd}
      </Component>
   )
}

export default Button;