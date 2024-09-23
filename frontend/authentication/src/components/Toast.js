import { toast } from "react-toastify";

export const handleSuccess = (message) => {
  toast.success(message, {
    position: "top-right",
    className: "bg-green-500 text-white", // Tailwind classes for toast background
    bodyClassName: "text-sm font-medium", // Customize the text inside the toast
    progressClassName: "bg-white", // Customize the progress bar if you have it enabled
    });
};

export const handleError = (message) => {
  toast.error(message, {
    position: "top-right",
    className: "bg-red-500 text-white", // Tailwind classes for error
    bodyClassName: "text-sm font-medium",
    progressClassName: "bg-white",
  });
};
