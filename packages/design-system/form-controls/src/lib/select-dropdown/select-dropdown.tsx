import { ComponentProps } from "react";
import {
  useController,
  useFormContext,
  type Control,
  type FieldValues,
  type RegisterOptions
} from "react-hook-form";
import { SelectDropdown as ApricotSelectDropdown } from "@cb/apricot-react";
import { startCase } from "lodash-es";

type ApricotSelectDropdownProps = ComponentProps<typeof ApricotSelectDropdown>;

type SelectDropdownProps = Omit<ApricotSelectDropdownProps, "value" | "onChange" | "onBlur"> & {
  /** Field name — must match a key in your form's type */
  name: string;
  /** Validation rules (required, minLength, pattern, etc.) */
  rules?: RegisterOptions;
  /** Optionally pass control explicitly; otherwise uses FormProvider context */
  control?: Control<FieldValues>;
};

export function SelectDropdown({
  name,
  rules,
  control,
  floating = true,
  label,
  required,
  ...selectProps
}: SelectDropdownProps) {
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
    <ApricotSelectDropdown
      {...selectProps}
      label={resolvedLabel}
      floating={floating}
      required={required}
      value={field.value ?? ""}
      onChange={val => field.onChange(val)}
      onBlur={field.onBlur}
      validation={error ? "error" : selectProps.validation}
      validationMsg={error?.message ?? selectProps.validationMsg}
    />
  );
}
