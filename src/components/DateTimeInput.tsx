import type { ComponentProps } from "react";
import { TextInput } from "./TextInput";

type DateTimeInputProps = Omit<ComponentProps<typeof TextInput>, "type"> & {
  /** Which native picker to use. Defaults to a combined date + time. */
  mode?: "datetime-local" | "date" | "time";
};

/*
 * Date & Time picker — a native input in the same shell as TextInput.
 * Native gives an accessible, OS-appropriate calendar/time surface that a
 * guard or visitor already knows how to use, with zero clipping risk.
 */
export function DateTimeInput({
  mode = "datetime-local",
  ...rest
}: DateTimeInputProps) {
  return <TextInput type={mode} {...rest} />;
}
