<template>
    <CustomMarker
        :options="{ position: report.position, anchorPoint: 'CENTER' }"
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
    import { CustomMarker } from 'vue3-google-map';
    import type { ReportModel } from '@/models/ReportModel';
    import type { DeepReadonly } from 'vue';

    defineProps<{ report: DeepReadonly<ReportModel> }>();
</script>
