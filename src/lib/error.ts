
import { toast } from "react-hot-toast";

export function handleValidationErrors(errors: Record<string, string[]>) {
    Object.keys(errors).forEach((field) => {
      toast.error(errors[field][0]);
    });
}