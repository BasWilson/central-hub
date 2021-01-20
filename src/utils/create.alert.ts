import Toastify from "toastify-js";
import { UIStore } from "../stores/ui.store";

export default function (message: string, type: "info" | "success" | "error" = "info") {
    Toastify({
        text: message,
        duration: 4000,
        position: "right",
        gravity: "bottom",
        close: true
    }).showToast()
}