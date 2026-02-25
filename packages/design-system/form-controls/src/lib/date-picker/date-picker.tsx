import { ComponentProps } from "react";
import {
  useController,
  useFormContext,
  type Control,
  type FieldValues,
  type RegisterOptions
} from "react-hook-form";
import { DatePicker as ApricotDatePicker } from "@cb/apricot-react";
import { startCase } from "lodash-es";

type ApricotDatePickerProps = ComponentProps<typeof ApricotDatePicker>;

/**
 * The actual shape returned by the underlying CBDatePicker callbacks
 * (onSelect, onUpdate, etc.).  The published TS types declare
 * `(event: Event) => void` which is incorrect — the real argument is
 * this object.
 */
interface DatePickerEvent {
  dateObj: { start: Date | null; end: Date | null };
  momentObj: { start: unknown; end: unknown };
}

type DatePickerProps = Omit<
  ApricotDatePickerProps,
  "onSelect" | "onUpdate" | "startDate" | "endDate"
> & {
  /** Field name — must match a key in your form's type */
  name: string;
  /** Validation rules (required, minLength, pattern, etc.) */
  rules?: RegisterOptions;
  /** Optionally pass control explicitly; otherwise uses FormProvider context */
  control?: Control<FieldValues>;
  /**
   * Called after the wrapper writes to react‑hook‑form so consumers can
   * run side‑effects.  Receives the raw event from apricot.
   */
  onSelect?: (event: DatePickerEvent) => void;
  onUpdate?: (event: DatePickerEvent) => void;
};

/**
 * react‑hook‑form wrapper for the apricot `DatePicker`.
 *
 * ## Stored value
 * - **singleDate mode** (default): stores a `Date | null`.
 * - **range mode** (`singleDate={false}`): stores
 *   `{ start: Date | null; end: Date | null }`.
 *
 * ## When the value is committed
 * - If `footer` is enabled (shows Reset / Update buttons) the value is
 *   written on **Update** click.
 * - Otherwise the value is written on every **onSelect**.
 */
export function DatePicker({
  name,
  rules,
  control,
  singleDate = true,
  footer,
  singleLabel,
  startLabel,
  endLabel,
  required,
  onSelect: externalOnSelect,
  onUpdate: externalOnUpdate,
  ...pickerProps
}: DatePickerProps) {
  const resolvedLabel = singleLabel ?? startLabel ?? startCase(name);

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

  /** Extract the value to store in RHF from the event object. */
  const extractValue = (e: DatePickerEvent) => (singleDate ? e.dateObj.start ?? null : e.dateObj);

  /**
   * Decide which callback writes to RHF:
   * - with footer → onUpdate (user clicks "Update")
   * - without footer → onSelect (immediate)
   */
  const handleSelect = (e: unknown) => {
    const event = e as DatePickerEvent;
    if (!footer) {
      field.onChange(extractValue(event));
    }
    externalOnSelect?.(event);
  };

  const handleUpdate = (e: unknown) => {
    const event = e as DatePickerEvent;
    field.onChange(extractValue(event));
    externalOnUpdate?.(event);
  };

  // Derive initial start/end dates from the current field value so the
  // calendar opens to the right month when a value already exists.
  const currentValue = field.value;
  const startDate = singleDate && currentValue instanceof Date ? currentValue : currentValue?.start;
  const endDate = !singleDate ? currentValue?.end : undefined;

  return (
    <ApricotDatePicker
      {...pickerProps}
      singleDate={singleDate}
      footer={footer}
      required={required}
      singleLabel={singleDate ? resolvedLabel : undefined}
      startLabel={!singleDate ? resolvedLabel : startLabel}
      endLabel={endLabel}
      startDate={startDate}
      endDate={endDate}
      onSelect={handleSelect as unknown as ApricotDatePickerProps["onSelect"]}
      onUpdate={handleUpdate as unknown as ApricotDatePickerProps["onUpdate"]}
      validationStartInput={error ? "error" : pickerProps.validationStartInput}
      validationMsgStartInput={error?.message ?? pickerProps.validationMsgStartInput}
    />
  );
}
