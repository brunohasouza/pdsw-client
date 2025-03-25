<template>
    <VAppBar flat class="px-3">
        <VSpacer />
        <VTabs align-tabs="center" color="teal">
            <VTab :to="{ name: 'home' }" text="Cooperativas" />
        </VTabs>
        <VSpacer />
        <VBtn size="small" variant="outlined" color="error">Sair</VBtn>
    </VAppBar>
    <VMain>
        <RouterView />
    </VMain>
</template>

<script setup lang="ts"></script>

<style scoped></style>
