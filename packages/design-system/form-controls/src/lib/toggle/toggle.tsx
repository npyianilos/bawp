import { ComponentProps } from "react";
import {
  useController,
  useFormContext,
  type Control,
  type FieldValues,
  type RegisterOptions
} from "react-hook-form";
import { ToggleSwitch as ApricotToggleSwitch } from "@cb/apricot-react";
import { startCase } from "lodash-es";

type ApricotToggleSwitchProps = ComponentProps<typeof ApricotToggleSwitch>;

type ToggleSwitchProps = Omit<ApricotToggleSwitchProps, "on" | "onChange"> & {
  /** Field name — must match a key in your form's type */
  name: string;
  /** Validation rules (required, etc.) */
  rules?: RegisterOptions;
  /** Optionally pass control explicitly; otherwise uses FormProvider context */
  control?: Control<FieldValues>;
};

export function ToggleSwitch({
  name,
  rules,
  control,
  ariaLabel,
  additionalDesc,
  ...toggleProps
}: ToggleSwitchProps) {
  const resolvedLabel = ariaLabel ?? additionalDesc ?? startCase(name);

  const formContext = useFormContext();
  const {
    field,
    fieldState: { error }
  } = useController({
    name,
    control: control ?? formContext.control,
    rules
  });

  return (
    <ApricotToggleSwitch
      {...toggleProps}
      ariaLabel={resolvedLabel}
      additionalDesc={additionalDesc}
      on={!!field.value}
      onChange={(on) => field.onChange(on)}
    />
  );
}
