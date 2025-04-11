<template>
    <VContainer fluid height="100%" class="pa-0">
        <VSkeletonLoader
            :loading="requestingLocation"
            theme="image"
            height="100%"
        >
            <GoogleMap
                ref="mapRef"
                :api-key="KEY"
                :center="userLocation"
                :zoom="18"
                :libraries="['marker', 'maps', 'geocoding']"
                :styles="[
                    {
                        featureType: 'poi',
                        stylers: [{ visibility: 'off' }],
                    },
                ]"
                disable-default-ui
                style="width: 100%; height: calc(100vh - 64px)"
                @click="onClickMap"
            >
                <UserMarker v-bind="userLocation" />
                <ReportMarker
                    v-if="mapRef?.ready && mapRef?.api"
                    :model="report"
                    :geocoder="new mapRef.api.Geocoder()"
                />
            </GoogleMap>
        </VSkeletonLoader>
    </VContainer>
</template>

<script setup lang="ts">
    import { onMounted, ref } from 'vue';
    import { GoogleMap } from 'vue3-google-map';
    import { ReportModel } from '@/models/ReportModel';
    import { factoryReport } from '@/helpers';
    import ReportMarker from '@/components/ReportMarker.vue';
    import UserMarker from '@/components/UserMarker.vue';

    export type Location = {
        lat: number;
        lng: number;
    };

    const KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    const mapRef = ref<InstanceType<typeof GoogleMap> | null>(null);
    const requestingLocation = ref(false);
    const locationGranted = ref(false);
    const userLocation = ref<Location>({
        lat: -8.0594898,
        lng: -34.9531772,
    });

    function onClickMap(event: any) {
        if (event.placeId) {
            event.stop();
        }
    }

    const report = new ReportModel(factoryReport());

    onMounted(() => {
        requestingLocation.value = true;

        navigator.geolocation.watchPosition(
            (position) => {
                userLocation.value = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };
                requestingLocation.value = false;
                locationGranted.value = true;
            },
            () => {
                requestingLocation.value = false;
                locationGranted.value = false;
            },
            { enableHighAccuracy: true, maximumAge: 0, timeout: 10000 },
        );
    });
</script>
