<template>
    <CustomMarker
        v-if="position"
        :options="{ position, anchorPoint: 'CENTER' }"
    >
        <VBtn
            icon="mdi-trash-can-outline"
            density="comfortable"
            color="primary"
            variant="elevated"
        />
    </CustomMarker>
</template>

<script setup lang="ts">
    import { onMounted, ref } from 'vue';
    import { CustomMarker } from 'vue3-google-map';
    import type { ReportModel } from '@/models/ReportModel';
    import type { Location } from '@/views/HomePage.vue';

    const props = defineProps<{
        model: ReportModel;
        geocoder: google.maps.Geocoder;
    }>();

    const position = ref<Location>();

    onMounted(() => {
        props.geocoder.geocode(
            { address: props.model.fullAddress },
            (results, status) => {
                if (status === google.maps.GeocoderStatus.OK && results?.[0]) {
                    position.value = {
                        lat: results[0].geometry.location.lat(),
                        lng: results[0].geometry.location.lng(),
                    };
                } else {
                    console.error(
                        'Geocode was not successful for the following reason: ' +
                            status,
                    );
                }
            },
        );
    });
</script>
