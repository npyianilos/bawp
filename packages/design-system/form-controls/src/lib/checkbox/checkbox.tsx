import { ComponentProps } from "react";
import {
  useController,
  useFormContext,
  type Control,
  type FieldValues,
  type RegisterOptions
} from "react-hook-form";
import { Checkbox as ApricotCheckbox } from "@cb/apricot-react";
import { startCase } from "lodash-es";

type ApricotCheckboxProps = ComponentProps<typeof ApricotCheckbox>;

type CheckboxProps = Omit<ApricotCheckboxProps, "checked" | "onChange"> & {
  /** Field name — must match a key in your form's type */
  name: string;
  /** Validation rules (required, etc.) */
  rules?: RegisterOptions;
  /** Optionally pass control explicitly; otherwise uses FormProvider context */
  control?: Control<FieldValues>;
};

export function Checkbox({
  name,
  rules,
  control,
  label,
  required,
  ...checkboxProps
}: CheckboxProps) {
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
    <ApricotCheckbox
      {...checkboxProps}
      label={resolvedLabel}
      required={required}
      checked={!!field.value}
      onChange={checked => field.onChange(checked)}
      validation={error ? "error" : checkboxProps.validation}
      validationMsg={error?.message ?? checkboxProps.validationMsg}
    />
  );
}
