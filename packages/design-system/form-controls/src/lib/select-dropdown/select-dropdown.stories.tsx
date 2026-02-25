import type { Meta, StoryObj } from "@storybook/react-vite";
import { FormProvider, useForm } from "react-hook-form";
import { PrimaryButton } from "@cb/apricot-react";
import { SelectDropdown } from "./select-dropdown";

function SelectDropdownDemo() {
  const methods = useForm({
    defaultValues: {
      color: "",
      size: "",
      country: ""
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
        <SelectDropdown
          name="color"
          required
          values={[
            { label: "Red", value: "red" },
            { label: "Blue", value: "blue" },
            { label: "Green", value: "green" },
            { label: "Yellow", value: "yellow" }
          ]}
          mainClassName="cb-margin-bottom-16"
        />
        <SelectDropdown
          name="size"
          label="T-Shirt Size"
          required
          values={[
            { label: "Small", value: "sm" },
            { label: "Medium", value: "md" },
            { label: "Large", value: "lg" },
            { label: "Extra Large", value: "xl" }
          ]}
          mainClassName="cb-margin-bottom-16"
        />
        <SelectDropdown
          name="country"
          values={[
            { label: "United States", value: "us" },
            { label: "Canada", value: "ca" },
            { label: "United Kingdom", value: "uk" },
            { label: "Australia", value: "au" }
          ]}
          mainClassName="cb-margin-bottom-16"
        />
        <PrimaryButton type="submit">Submit</PrimaryButton>
      </form>
    </FormProvider>
  );
}

const meta: Meta<typeof SelectDropdown> = {
  component: SelectDropdown,
  title: "SelectDropdown",
  decorators: [
    Story => {
      const methods = useForm({ defaultValues: { demo: "" } });
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
type Story = StoryObj<typeof SelectDropdown>;

export const Default: Story = {
  args: {
    name: "demo",
    values: [
      { label: "Option 1", value: "1" },
      { label: "Option 2", value: "2" },
      { label: "Option 3", value: "3" }
    ]
  }
};

export const Required: Story = {
  args: {
    name: "demo",
    required: true,
    values: [
      { label: "Option 1", value: "1" },
      { label: "Option 2", value: "2" },
      { label: "Option 3", value: "3" }
    ]
  }
};

export const WithCustomLabel: Story = {
  args: {
    name: "demo",
    label: "Choose your favorite",
    required: true,
    values: [
      { label: "Apple", value: "apple" },
      { label: "Banana", value: "banana" },
      { label: "Cherry", value: "cherry" }
    ]
  }
};

export const FullForm: Story = {
  render: () => <SelectDropdownDemo />
};
