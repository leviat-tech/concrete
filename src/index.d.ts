
import { ComponentCustomProperties } from 'vue';

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $L: (value: string, params?: { capitalize?: boolean }) => string;
        $l: (value: string, params?: { capitalize?: boolean }) => string;
    }
}

