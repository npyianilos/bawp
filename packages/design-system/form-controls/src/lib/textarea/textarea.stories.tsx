import type { Meta, StoryObj } from "@storybook/react-vite";
import { FormProvider, useForm } from "react-hook-form";
import { PrimaryButton } from "@cb/apricot-react";
import { TextArea } from "./textarea";

function TextAreaDemo() {
  const methods = useForm({
    defaultValues: {
      description: "",
      feedback: "",
      message: ""
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
        <TextArea
          name="description"
          required
          rules={{ minLength: { value: 10, message: "Must be at least 10 characters" } }}
          rows={3}
          mainClassName="cb-margin-bottom-16"
        />
        <TextArea
          name="feedback"
          label="Your Feedback"
          rows={4}
          mainClassName="cb-margin-bottom-16"
        />
        <TextArea
          name="message"
          required
          rules={{ maxLength: { value: 200, message: "Maximum 200 characters" } }}
          rows={5}
          mainClassName="cb-margin-bottom-16"
        />
        <PrimaryButton type="submit">Submit</PrimaryButton>
      </form>
    </FormProvider>
  );
}

const meta: Meta<typeof TextArea> = {
  component: TextArea,
  title: "TextArea",
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
type Story = StoryObj<typeof TextArea>;

export const Default: Story = {
  args: {
    name: "demo",
    rows: 3
  }
};

export const Required: Story = {
  args: {
    name: "demo",
    required: true,
    rows: 3
  }
};

export const WithCustomLabel: Story = {
  args: {
    name: "demo",
    label: "Please provide detailed feedback",
    rows: 4
  }
};

export const Condensed: Story = {
  args: {
    name: "demo",
    label: "Comment",
    condensed: true,
    rows: 2
  }
};

export const WithValidation: Story = {
  args: {
    name: "demo",
    required: true,
    rules: { minLength: { value: 20, message: "Must be at least 20 characters" } },
    rows: 4
  }
};

export const FullForm: Story = {
  render: () => <TextAreaDemo />
};
