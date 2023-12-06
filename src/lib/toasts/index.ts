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
export const successEditToast: ToastSettings = {
  message: `Deck updated successfully`,
  timeout: 3000,
  background: "variant-filled-success",
}

export const successSavedSettignsToast: ToastSettings = {
  message: `Settings saved successfully`,
  timeout: 3000,
  background: "variant-filled-success",
}

export const allFlashcardsLearnedToast: ToastSettings = {
  message: `All flashcards learned!`,
  timeout: 3000,
  background: "variant-filled-success",
}