import { toast } from "react-hot-toast";

const notification = {
  success: (message: string) => {
    toast.success(message);
  },

  error: (message: string) => {
    toast.error(message);
  },

  info: (message: string) => {
    toast(message);
  },
};

export { notification };
