import React, { useCallback, forwardRef, useEffect, useRef } from 'react';
import { TextfieldProps } from './types';

const Textfield = React.forwardRef<HTMLInputElement, TextfieldProps>(({
   appearance = 'fill',
   isDisabled,
   visibility,
   addonAfterInput,
   addonBeforeInput,
   id,
   onFocus,
   onBlur,
   onMouseDown,
   type = "text",
   className,
   placeholder,
   onChange,
   label,
   children,
   ...props
}:TextfieldProps , ref ) => {

   return (
      <div className='inputWrapper'>
         {label && 
            <label htmlFor={id} className="input_label">
               {label}
            </label>
         }

         <div
            data-disabled={isDisabled ? isDisabled : undefined}
            // data-invalid={isInvalid ? isInvalid : undefined}
            // onMouseDown={handleOnMouseDown}
            className='inputWrapper__fieldContainer'
         >
            {addonBeforeInput}
            <input
               id={id}
               type={type}
               disabled={isDisabled}
               ref={ref}
               placeholder={placeholder}
               className={'inputField inputField--' + appearance}
               onChange={onChange}
               {...props}
            />
            {children}
            {addonAfterInput}
         </div>
      </div>
   );
});

export default Textfield;