import { useState } from 'react';
import { RadioButton, RadioButtonGroup } from '@cb/apricot-react';
import styles from './form-controls.module.scss';

export interface BawpFormControlsProps {
  /** Layout direction for the radio group */
  vertical?: boolean;
  /** Initially selected value (uncontrolled) */
  defaultValue?: string;
  /** Whether a selection is required */
  required?: boolean;
}

export function BawpFormControls({
  vertical = false,
  defaultValue,
  required = false,
}: BawpFormControlsProps) {
  const [selected, setSelected] = useState(defaultValue ?? '');

  return (
    <div className={styles['container']}>
      <RadioButtonGroup
        legend="Preferred contact method"
        name="contact-method"
        vertical={vertical}
        value={selected}
        required={required}
        onChange={(value) => setSelected(value)}
      >
        <RadioButton value="email" label="Email" />
        <RadioButton value="phone" label="Phone" />
        <RadioButton value="sms" label="SMS" />
        <RadioButton value="mail" label="Mail" disabled />
      </RadioButtonGroup>
    </div>
  );
}

export default BawpFormControls;
