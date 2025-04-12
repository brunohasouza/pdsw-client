<template>
    <VContainer fluid>
        <template v-if="loading">
            <div class="report-item-heading">
                <p>Data</p>
                <p>Endereço</p>
                <p>Tipo</p>
                <p>Status</p>
            </div>
            <div v-for="n in 10" :key="n" class="report-item-skeleton">
                <VSkeletonLoader type="heading" />
                <VSkeletonLoader type="heading" />
                <VSkeletonLoader type="heading" />
                <VSkeletonLoader type="heading" />
            </div>
        </template>
        <template v-else-if="reports.length === 0">
            <VEmptyState
                icon="mdi-magnify"
                title="Nenhuma denúncia encontrada."
                text="Registre uma denúncia de lixo e atualize esta tela novamente, por favor."
                text-width="360"
            />
        </template>
        <template v-else>
            <VDataTable :items="items" hide-default-footer />
        </template>
        <VSnackbar
            v-model="snackbar.show"
            :text="snackbar.text"
            :color="snackbar.color"
            vertical
        >
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
    import {
        factoryReportModelList,
        type ReportModel,
    } from '@/models/ReportModel';
    import { ReportService } from '@/services';
    import { computed, onMounted, reactive, ref } from 'vue';

    const loading = ref(false);
    const reports = ref<ReportModel[]>([]);
    const snackbar = reactive({
        color: 'error',
        text: '',
        show: false,
    });

    const items = computed(() => reports.value.map((report) => report.toTable));

    async function fetchData() {
        loading.value = true;
        snackbar.show = false;

        const service = new ReportService();

        try {
            reports.value = await service.index(1231);
        } catch (error) {
            snackbar.color = 'error';
            snackbar.text = 'Erro ao carregar os denúncias';
            snackbar.show = true;
        }

        loading.value = false;
    }

    onMounted(async () => fetchData());
</script>

<style scoped lang="scss">
    .report-item-skeleton,
    .report-item-heading {
        display: grid;
        grid-template-columns: 15% 1fr 15% 15%;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);

        &:last-child {
            border-bottom: none;
        }
    }

    .report-item-heading {
        p {
            margin: 1rem;
            font-weight: 500;
            font-size: 0.875rem;
        }
    }
</style>
