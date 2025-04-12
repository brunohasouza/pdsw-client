<template>
    <VContainer fluid height="100%" class="pa-0">
        <VSkeletonLoader
            :loading="requesting || loading"
            theme="image"
            height="100%"
        >
            <GoogleMap
                :api-key="KEY"
                :center="position"
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
                <UserMarker v-bind="position" />
                <ReportMarker
                    v-for="report in reports"
                    :key="report.id"
                    :report="report"
                />
            </GoogleMap>
        </VSkeletonLoader>
        <VSnackbar v-model="snackbar.show" :color="snackbar.color" vertical>
            {{ snackbar.text }}
            <template #actions>
                <VBtn
                    color="white"
                    variant="text"
                    density="comfortable"
                    @click="fetchData"
                    >Recarregar</VBtn
                >
            </template>
        </VSnackbar>
    </VContainer>
</template>

<script setup lang="ts">
    import { onMounted, reactive, ref } from 'vue';
    import { GoogleMap } from 'vue3-google-map';
    import { useGeolocation } from '@/composables';
    import UserMarker from '@/components/UserMarker.vue';
    import { ReportService } from '@/services';
    import type { ReportModel } from '@/models/ReportModel';
    import ReportMarker from '@/components/ReportMarker.vue';

    export type Location = {
        lat: number;
        lng: number;
    };

    const KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    const { position, requesting } = useGeolocation();
    const loading = ref(false);
    const reports = ref<ReportModel[]>([]);
    const snackbar = reactive({
        color: 'error',
        text: '',
        show: false,
    });

    const onClickMap = (event: any) => event.placeId && event.stop();

    async function fetchData() {
        loading.value = true;
        snackbar.show = false;

        const service = new ReportService();

        try {
            reports.value = await service.index();
        } catch (error) {
            snackbar.text = 'Erro ao carregar os denúncias';
            snackbar.show = true;
        }

        loading.value = false;
    }

    onMounted(async () => fetchData());
</script>
