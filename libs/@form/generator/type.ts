import React from "react";

type GeneratorTypeFromArray<T extends ReadonlyArray<unknown>> =
  T extends ReadonlyArray<infer GeneratorTypeFromArray>
    ? GeneratorTypeFromArray
    : never;

export const listFieldType = [
  "appendix",
  "button",
  "checkbox",
  "code-editor",
  "date",
  "datetime",
  "email",
  "boolean",
  "file",
  "hidden",
  "hidden-array",
  "hidden-object",
  "image",
  "month",
  "number",
  "password",
  "radio",
  "range",
  "reset",
  "sign",
  "multiselect",
  "async-multiselect",
  "select",
  "select-string",
  "async-select",
  "submit",
  "tel",
  "text",
  "textarea",
  "time",
  "url",
];

const typeInputFieldsList = [...listFieldType] as const;

export type typeInputFields = GeneratorTypeFromArray<
  typeof typeInputFieldsList
>;

export interface FormsShapes {
  id: string;
  name: string;
  label: string;
  type: typeInputFields;
  accept?: string;
  listValue?: string;
  required: boolean;
  component?: React.JSXElementConstructor<any>;
  // isDepend: boolean;
  // dependedRules?: dependedObjType[];
  // dependedAction?: dependedActionType;
  isAppend: boolean;
  errorMessage: string;
  helperMessage?: string;
  masking?: string;
  minLength?: number | string;
  maxLength?: number | string;
  max?: number | string | Date;
  min?: number | string | Date;
  value: any
  default?: string | Date | boolean;
}

export type Form = {
  id: string;
  url: string;
  encoding: string;
};

export type Forms<Values> = {
  scheme: Values;
  values?: any;
  validator?: any;
  theme?: string;
  handleResetScheme?: (d: Values) => void;
} & Form;
