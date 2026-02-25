import type { Meta, StoryObj } from "@storybook/react-vite";
import { FormProvider, useForm } from "react-hook-form";
import { PrimaryButton } from "@cb/apricot-react";
import { Checkbox } from "./checkbox";

function CheckboxDemo() {
  const methods = useForm({
    defaultValues: {
      acceptTerms: false,
      subscribeNewsletter: false,
      agreePolicy: false
    }
  });

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(data => {
          console.log("Submitted:", data);
        })}
        style={{ maxWidth: "480px", padding: "24px" }}
      >
        <Checkbox name="acceptTerms" required className="cb-margin-bottom-16" />
        <Checkbox
          name="subscribeNewsletter"
          label="Subscribe to our newsletter"
          className="cb-margin-bottom-16"
        />
        <Checkbox
          name="agreePolicy"
          label="I agree to the privacy policy"
          required
          className="cb-margin-bottom-16"
        />
        <PrimaryButton type="submit">Submit</PrimaryButton>
      </form>
    </FormProvider>
  );
}

const meta: Meta<typeof Checkbox> = {
  component: Checkbox,
  title: "Checkbox",
  decorators: [
    Story => {
      const methods = useForm({ defaultValues: { demo: false } });
      return (
        <FormProvider {...methods}>
          <div style={{ maxWidth: "480px", padding: "24px" }}>
            <Story />
          </div>
        </FormProvider>
      );
    }
  ]
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: {
    name: "demo"
  }
};

export const Required: Story = {
  args: {
    name: "demo",
    required: true
  }
};

export const WithCustomLabel: Story = {
  args: {
    name: "demo",
    label: "I accept the terms and conditions",
    required: true
  }
};

export const Condensed: Story = {
  args: {
    name: "demo",
    label: "Compact checkbox",
    condensed: true
  }
};

export const FullForm: Story = {
  render: () => <CheckboxDemo />
};
