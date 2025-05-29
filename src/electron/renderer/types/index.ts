import type { API } from '@/electron/bridge';

declare global {
    interface Window {
        API: typeof API;
    }
}
