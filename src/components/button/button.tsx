import { component$ } from "@builder.io/qwik";
import type { FormProps } from "@builder.io/qwik-city";
import { Form } from "@builder.io/qwik-city";

type ButtonProps = {
  formAction: FormProps<any, any>["action"];
  message: string;
};

const Button = component$(({ formAction, message }: ButtonProps) => {
  return (
    <Form action={formAction}>
      <button>{message}</button>
    </Form>
  );
});

export default Button;
