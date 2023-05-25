import React from "react";
import { FormProvider } from "./provider";
import { Forms, FormsShapes } from "./type";


/**
 * 描述
 * @date 2022-09-17
 * @param {any} form:Forms<T>
 * @return {any}
 */
export function BuildInteractiveForm<T extends FormsShapes>(form: Forms<T>): Forms<T> {
  if (form.encoding === "multipart/form-data") {
    // handling multipart
    const formData = new FormData();
    form.values = formData.append(form.scheme.name, form.scheme.value);
  }
  form.handleResetScheme = () => {
    form.values = {};
  };

  return form;
}


/**
 * 描述
 * @date 2022-09-17
 * @param {any} props:Forms<FormsShapes>
 * @return {any}
 */
export function FormWrapper<T extends Forms<FormsShapes[]>>(props: T): JSX.Element {
  const FormComponent = (item: FormsShapes) => {
    if(item.component)
      return React.createElement(item.component , {...item})
    return null;
  }

  return (
    <FormProvider value={props}>
      <form id={props.id} method="post" action={props.url} encType={props.encoding}>
        {props.scheme?.map((item, idx) => {
          return <div key={idx}>{
            <FormComponent {...item} />
          }</div>;
        })}
      </form>
    </FormProvider>
  );
}