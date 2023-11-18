import type { ToastSettings } from "@skeletonlabs/skeleton";

export const errorToast: ToastSettings = {
  message: "Something went wrong",
  timeout: 3000,
  background: "variant-filled-error",
};
export const successDeleteToast: ToastSettings = {
  message: `Deck deleted successfully`,
  timeout: 3000,
  background: "variant-filled-success",
};