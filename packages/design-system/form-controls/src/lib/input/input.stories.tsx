import type { Meta, StoryObj } from "@storybook/react-vite";
import { FormProvider, useForm } from "react-hook-form";
import { PrimaryButton } from "@cb/apricot-react";
import { Input } from "./input";

function InputDemo() {
  const methods = useForm({
    defaultValues: {
      username: "",
      email: ""
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
        <Input
          name="username"
          required
          rules={{ minLength: { value: 3, message: "Must be at least 3 characters" } }}
          mainClassName="cb-margin-bottom-16"
        />
        <Input
          name="email"
          required
          rules={{ pattern: { value: /\S+@\S+\.\S+/, message: "Invalid email" } }}
          mainClassName="cb-margin-bottom-16"
        />
        <PrimaryButton type="submit">Submit</PrimaryButton>
      </form>
    </FormProvider>
  );
}

const meta: Meta<typeof Input> = {
  component: Input,
  title: "Input",
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
type Story = StoryObj<typeof Input>;

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
    label: "Custom Field Label",
    required: true
  }
};

export const WithValidation: Story = {
  args: {
    name: "demo",
    required: true,
    rules: { minLength: { value: 5, message: "Must be at least 5 characters" } }
  }
};

export const FullForm: Story = {
  render: () => <InputDemo />
};
