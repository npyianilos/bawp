import { ComponentProps } from "react";
import {
  useController,
  useFormContext,
  type Control,
  type FieldValues,
  type RegisterOptions
} from "react-hook-form";
import { Input as ApricotInput } from "@cb/apricot-react";
import { startCase } from "lodash-es";

type ApricotInputProps = ComponentProps<typeof ApricotInput>;

type InputProps = Omit<ApricotInputProps, "value" | "onChange" | "onBlur"> & {
  /** Field name — must match a key in your form's type */
  name: string;
  /** Validation rules (required, minLength, pattern, etc.) */
  rules?: RegisterOptions;
  /** Optionally pass control explicitly; otherwise uses FormProvider context */
  control?: Control<FieldValues>;
};

export function Input({
  name,
  rules,
  control,
  floating = true,
  label,
  required,
  ...inputProps
}: InputProps) {
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
    <ApricotInput
      {...inputProps}
      label={resolvedLabel}
      floating={floating}
      required={required}
      value={field.value ?? ""}
      onChange={(_e, val) => field.onChange(val)}
      onBlur={field.onBlur}
      validation={error ? "error" : inputProps.validation}
      validationMsg={error?.message ?? inputProps.validationMsg}
    />
  );
}
