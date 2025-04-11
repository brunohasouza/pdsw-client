<template>
    <CustomMarker :options="options">
        <div class="user-marker"></div>
    </CustomMarker>
</template>

<script setup lang="ts">
    import { computed } from 'vue';
    import { CustomMarker } from 'vue3-google-map';
    import type { Location } from '@/views/HomePage.vue';

    const props = defineProps<Location>();

    const options = computed<google.maps.CustomMarkerOptions>(() => ({
        position: {
            lat: props.lat,
            lng: props.lng,
        },
        anchorPoint: 'CENTER',
    }));
</script>

<style scoped lang="scss">
    .user-marker {
        width: 1rem;
        height: 1rem;
        background-color: #346834;
        border-radius: 50%;
        outline: 0.375rem solid rgba($color: #346834, $alpha: 0.3);
    }
</style>
