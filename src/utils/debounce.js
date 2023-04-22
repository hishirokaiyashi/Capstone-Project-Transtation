import { toast } from "react-toastify";

function debounce(func, delay) {
    let isClickingTooFast = false;
    let toastDisplayed = false;

    return function (...args) {
        if (!isClickingTooFast) {
            isClickingTooFast = true;
            toastDisplayed = false;
            setTimeout(() => {
                isClickingTooFast = false;
            }, delay);
            return func.apply(this, args);
        } else if (!toastDisplayed) {
            toastDisplayed = true;
            toast.info("Bạn đang nhấn quá nhiều lần!");
            setTimeout(() => {
                toastDisplayed = false;
            }, delay);
        }
    }
}

export default debounce