import { ComponentProps } from "react";
import {
  useController,
  useFormContext,
  type Control,
  type FieldValues,
  type RegisterOptions
} from "react-hook-form";
import { TextArea as ApricotTextArea } from "@cb/apricot-react";
import { startCase } from "lodash-es";

type ApricotTextAreaProps = ComponentProps<typeof ApricotTextArea>;

type TextAreaProps = Omit<ApricotTextAreaProps, "value" | "onChange" | "onBlur"> & {
  /** Field name — must match a key in your form's type */
  name: string;
  /** Validation rules (required, minLength, maxLength, pattern, etc.) */
  rules?: RegisterOptions;
  /** Optionally pass control explicitly; otherwise uses FormProvider context */
  control?: Control<FieldValues>;
};

export function TextArea({
  name,
  rules,
  control,
  floating = true,
  label,
  required,
  ...textAreaProps
}: TextAreaProps) {
  const resolvedLabel = label ?? startCase(name);

  const resolvedRules: RegisterOptions = { ...rules };
  if (required && !resolvedRules.required) {
    resolvedRules.required = `${resolvedLabel} is required`;
  }

  const formContext = useFormContext();
  const {
    field,
    fieldState: { error }
  } = useController({
    name,
    control: control ?? formContext.control,
    rules: resolvedRules
  });

  return (
    <ApricotTextArea
      {...textAreaProps}
      label={resolvedLabel}
      floating={floating}
      required={required}
      value={field.value ?? ""}
      onChange={field.onChange}
      onBlur={field.onBlur}
      validation={error ? "error" : textAreaProps.validation}
      validationMsg={error?.message ?? textAreaProps.validationMsg}
    />
  );
}
