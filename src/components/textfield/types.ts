import React, { AllHTMLAttributes, FormEventHandler } from 'react';

export interface TextfieldProps extends AllHTMLAttributes<HTMLInputElement> {
   appearance?: 'fill' | 'outline' | 'subtle';
   // isCompact?: boolean;
   isDisabled?: boolean;
   // isInvalid?: boolean;
   // isReadOnly?: boolean;
   // isRequired?: boolean;
   visibility?: boolean
   addonAfterInput?: React.ReactNode;
   addonBeforeInput?: React.ReactNode;
   // onMouseDown?: React.MouseEventHandler<HTMLElement>;
   id?: string;
   name?: string;
   type: string;
   className?: string;
   placeholder?: string;
   onChange?: FormEventHandler<HTMLInputElement>;
   label?: string
}