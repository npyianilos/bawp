import type { Meta, StoryObj } from "@storybook/react-vite";
import { FormProvider, useForm } from "react-hook-form";
import { PrimaryButton } from "@cb/apricot-react";
import { ToggleSwitch } from "./toggle";

function ToggleDemo() {
  const methods = useForm({
    defaultValues: {
      darkMode: false,
      emailNotifications: true,
      autoSave: false,
      twoFactorAuth: false
    }
  });

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit((data) => {
          console.log("Submitted:", data);
        })}
        style={{ maxWidth: "480px", padding: "24px" }}
      >
        <ToggleSwitch
          name="darkMode"
          additionalDesc="Dark Mode"
          additionalDescClass="cb-margin-bottom-8"
          mainClassName="cb-margin-bottom-24"
        />
        <ToggleSwitch
          name="emailNotifications"
          additionalDesc="Email Notifications"
          additionalDescClass="cb-margin-bottom-8"
          mainClassName="cb-margin-bottom-24"
        />
        <ToggleSwitch
          name="autoSave"
          additionalDesc="Auto-save"
          additionalDescClass="cb-margin-bottom-8"
          mainClassName="cb-margin-bottom-24"
        />
        <ToggleSwitch
          name="twoFactorAuth"
          additionalDesc="Two-Factor Authentication"
          additionalDescClass="cb-margin-bottom-8"
          mainClassName="cb-margin-bottom-24"
        />
        <PrimaryButton type="submit">Save Settings</PrimaryButton>
      </form>
    </FormProvider>
  );
}

const meta: Meta<typeof ToggleSwitch> = {
  component: ToggleSwitch,
  title: "ToggleSwitch",
  decorators: [
    (Story) => {
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
type Story = StoryObj<typeof ToggleSwitch>;

export const Default: Story = {
  args: {
    name: "demo",
    ariaLabel: "Toggle demo"
  }
};

export const WithDescription: Story = {
  args: {
    name: "demo",
    additionalDesc: "Enable this feature",
    additionalDescClass: "cb-margin-bottom-8"
  }
};

export const CustomLabels: Story = {
  args: {
    name: "demo",
    onLabel: "Yes",
    offLabel: "No",
    ariaLabel: "Agree to terms"
  }
};

export const Condensed: Story = {
  args: {
    name: "demo",
    condensed: true,
    ariaLabel: "Compact toggle"
  }
};

export const LabelOnLeft: Story = {
  args: {
    name: "demo",
    labelPosition: "left",
    onLabel: "Active",
    offLabel: "Inactive",
    ariaLabel: "Toggle status"
  }
};

export const FullForm: Story = {
  render: () => <ToggleDemo />
};
