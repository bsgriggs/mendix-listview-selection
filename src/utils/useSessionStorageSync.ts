import { useSyncExternalStore } from "react";

const sessionStorageStore = {
    getSnapshot: (key: string) => sessionStorage.getItem(key),
    subscribe: (key: string, callback: () => void) => {
        window.addEventListener("storage", e => {
            if (e.key === key) {
                callback();
            }
        });
        return () => window.removeEventListener("storage", callback);
    },
    setValue: (key: string, value: string) => {
        sessionStorage.setItem(key, value);
        window.dispatchEvent(new StorageEvent("storage", { key }));
    },
    removeItem: (key: string) => {
        sessionStorage.removeItem(key);
    }
};

export default function useSessionStorageSync(
    key: string,
    defaultValue: string | null
): [string, (newValue: string | null) => void] {
    const getSnapshot = (): string => sessionStorageStore.getSnapshot(key) ?? JSON.stringify(defaultValue);
    const storeValue = useSyncExternalStore(callback => sessionStorageStore.subscribe(key, callback), getSnapshot);

    const setValue = (newValue: string | null): void => {
        if (newValue == null) {
            sessionStorageStore.removeItem(key);
        } else {
            sessionStorageStore.setValue(key, newValue);
        }
    };

    return [storeValue, setValue];
}
