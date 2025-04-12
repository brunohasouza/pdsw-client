<template>
    <VAppBar flat class="px-3" color="primary">
        <template #prepend>
            <VAppBarNavIcon @click.stop="drawer = !drawer" />
        </template>
        <VAppBarTitle>LixAcumulado</VAppBarTitle>
    </VAppBar>
    <VNavigationDrawer v-model="drawer">
        <VList :items="items" nav color="primary" />
        <template #append>
            <VDivider />
            <VList nav>
                <VListItem
                    prepend-icon="mdi-logout"
                    @click="logout"
                    title="Sair"
                />
            </VList>
        </template>
    </VNavigationDrawer>
    <VMain>
        <RouterView />
    </VMain>
</template>

<script setup lang="ts">
    import { AuthService } from '@/services';
    import { ref } from 'vue';
    import { useRouter } from 'vue-router';

    const router = useRouter();
    const drawer = ref(false);
    const items = [
        {
            title: 'Mapa',
            value: 'home',
            props: {
                prependIcon: 'mdi-map',
                to: { name: 'home' },
                color: 'primary',
            },
        },
        {
            title: 'Minhas denúncias',
            value: 'reports',
            props: {
                prependIcon: 'mdi-trash-can',
                to: { name: 'reports' },
                color: 'primary',
            },
        },
    ];

    function logout() {
        const service = new AuthService();
        service.logout().then(() => router.replace({ name: 'login' }));
    }
</script>

<style scoped></style>
