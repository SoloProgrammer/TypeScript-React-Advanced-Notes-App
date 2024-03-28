import toast, { ToastOptions, ToastType } from "react-hot-toast";

type ToastTypes = {
  type?: ToastType;
};
export function showToast(msg: string, options?: ToastOptions & ToastTypes) {
  const toastId = toast(msg, options);
  return toastId;
}
