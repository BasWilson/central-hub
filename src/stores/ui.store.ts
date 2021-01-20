import { action, makeAutoObservable, computed } from "mobx"

export class UIStore {

    loading = true;
    showToast: (options: { duration: number, message: string, type: "success" | "info" | "error" }) => void = () => { }

    constructor() {
        makeAutoObservable(this);
    }

    /* Loading */
    @action
    setLoading = (loading: boolean) => {
        this.loading = loading;
    }
}