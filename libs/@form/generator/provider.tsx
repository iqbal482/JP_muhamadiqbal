import { createContext } from "react";
import { Forms, FormsShapes } from "./type";



export const FormContext = createContext<Forms<FormsShapes[]>>({
  scheme: [],
  values: {},
  validator: {},
  theme: "chakra-ui",
  handleResetScheme: () => undefined,
  id: "",
  encoding: "application/x-www-form-urlencoded",
  url: "",
});


export const FormProvider = FormContext.Provider;

/**
 * 描述
 * @date 2022-09-17
 * @return {any}
 */
export function useFormContext<T extends Forms<FormsShapes>>(): T{
  return FormContext as unknown as T;
}