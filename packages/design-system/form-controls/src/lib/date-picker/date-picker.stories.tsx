import type { Meta, StoryObj } from "@storybook/react-vite";
import { FormProvider, useForm } from "react-hook-form";
import { PrimaryButton } from "@cb/apricot-react";
import { DatePicker } from "./date-picker";

// ---------------------------------------------------------------------------
// Full‑form demos
// ---------------------------------------------------------------------------

function SingleDateDemo() {
  const methods = useForm<{ birthday: Date | null }>({
    defaultValues: { birthday: null }
  });

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(data => {
          console.log("Submitted:", data);
        })}
        style={{ maxWidth: "480px", padding: "24px" }}
      >
        <div className="cb-margin-bottom-16">
          <DatePicker name="birthday" required singlePanel />
        </div>
        <PrimaryButton type="submit">Submit</PrimaryButton>
      </form>
    </FormProvider>
  );
}

function DateRangeDemo() {
  const methods = useForm<{
    tripDates: { start: Date | null; end: Date | null } | null;
  }>({
    defaultValues: { tripDates: null }
  });

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(data => {
          console.log("Submitted:", data);
        })}
        style={{ maxWidth: "600px", padding: "24px" }}
      >
        <div className="cb-margin-bottom-16">
          <DatePicker
            name="tripDates"
            singleDate={false}
            startLabel="Departure"
            endLabel="Return"
            footer
            required
          />
        </div>
        <PrimaryButton type="submit">Submit</PrimaryButton>
      </form>
    </FormProvider>
  );
}

// ---------------------------------------------------------------------------
// Storybook meta
// ---------------------------------------------------------------------------

const meta: Meta<typeof DatePicker> = {
  component: DatePicker,
  title: "DatePicker",
  decorators: [
    Story => {
      const methods = useForm({ defaultValues: { demo: null } });
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
type Story = StoryObj<typeof DatePicker>;

export const Default: Story = {
  args: {
    name: "demo",
    singlePanel: true
  }
};

export const Required: Story = {
  args: {
    name: "demo",
    required: true,
    singlePanel: true
  }
};

export const WithFooter: Story = {
  args: {
    name: "demo",
    singlePanel: true,
    footer: true
  }
};

export const SingleDateForm: Story = {
  render: () => <SingleDateDemo />
};

export const DateRangeForm: Story = {
  render: () => <DateRangeDemo />
};
