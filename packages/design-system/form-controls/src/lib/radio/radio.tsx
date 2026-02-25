import { ComponentProps } from 'react';
import {
  useController,
  useFormContext,
  type Control,
  type FieldValues,
  type RegisterOptions,
} from 'react-hook-form';
import { RadioButtonGroup as ApricotRadioButtonGroup } from '@cb/apricot-react';
import { startCase } from 'lodash-es';

type ApricotRadioButtonGroupProps = ComponentProps<
  typeof ApricotRadioButtonGroup
>;

type RadioButtonGroupProps = Omit<
  ApricotRadioButtonGroupProps,
  'value' | 'onChange'
> & {
  /** Field name — must match a key in your form's type */
  name: string;
  /** Validation rules (required, etc.) */
  rules?: RegisterOptions;
  /** Optionally pass control explicitly; otherwise uses FormProvider context */
  control?: Control<FieldValues>;
};

export function RadioButtonGroup({
  name,
  rules,
  control,
  legend,
  required,
  children,
  ...radioGroupProps
}: RadioButtonGroupProps) {
  const resolvedLegend = legend ?? startCase(name);

  const resolvedRules: RegisterOptions = { ...rules };
  if (required && !resolvedRules.required) {
    resolvedRules.required = `${resolvedLegend} is required`;
  }

  const formContext = useFormContext();
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control: control ?? formContext.control,
    rules: resolvedRules,
  });

  return (
    <ApricotRadioButtonGroup
      {...radioGroupProps}
      name={name}
      legend={resolvedLegend}
      required={required}
      value={field.value ?? ''}
      onChange={(value) => field.onChange(value)}
      validation={error ? 'error' : radioGroupProps.validation}
      validationMsg={error?.message ?? radioGroupProps.validationMsg}
    >
      {children}
    </ApricotRadioButtonGroup>
  );
}
