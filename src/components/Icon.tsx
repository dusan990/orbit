import { ComponentPropsWithoutRef, ElementType } from 'react';
import PropTypes from 'prop-types';
// https://github.com/marella/material-symbols/tree/main/material-symbols#readme

type IconProps<E extends ElementType> = {
   name: string;
   className?: String;
}

const Icon = <E extends ElementType = "span">({
   name,
   className
}: IconProps<E> & ComponentPropsWithoutRef<E>) => {
   return (
      <span className={`${className} material-icon material-symbols-outlined`}>{name}</span>
   );
};

export default Icon;
