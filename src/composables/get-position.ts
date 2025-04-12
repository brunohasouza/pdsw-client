import type { Location } from '@/views/HomePage.vue';
import { onMounted, reactive, ref } from 'vue';

export const useGeolocation = () => {
    const requesting = ref(false);
    const granted = ref(false);
    const position = reactive<Location>({
        lat: -8.0594898,
        lng: -34.9531772,
    });

    onMounted(() => {
        requesting.value = true;

        navigator.geolocation.getCurrentPosition(
            (p) => {
                position.lat = p.coords.latitude;
                position.lng = p.coords.longitude;
                requesting.value = false;
                granted.value = true;
            },
            () => {
                requesting.value = false;
                granted.value = false;
            },
            { enableHighAccuracy: true, maximumAge: 0, timeout: 10000 },
        );
    });

    return { granted, position, requesting };
};
