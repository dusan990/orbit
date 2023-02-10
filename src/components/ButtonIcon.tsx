import { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

type ButtonIconProps<E extends ElementType> = {
   as?: E;
   icon?: React.ReactNode;
   variant: "btn-icon--primary" | "btn-icon--default" | "btn-icon--ghost";
   onClick?: React.MouseEventHandler<HTMLButtonElement>;
   tabIndex?: number;
}

const ButtonIcon = <E extends ElementType = "button">({
   as,
   variant,
   onClick,
   icon,
   tabIndex = 0,
   ...props
}: ButtonIconProps<E> & ComponentPropsWithoutRef<E>) => {
   const Component = as || "button";
   
   return (
      <Component 
         variant={variant}
         icon={icon}
         className={
            `btn ${variant}`
         }
         onClick={onClick}
         tabIndex={tabIndex}
         {...props}
      >
         {icon}
      </Component>
   )
}

export default ButtonIcon;