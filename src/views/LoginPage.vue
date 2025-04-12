<template>
    <VContainer class="d-flex align-center justify-center" min-height="100vh">
        <VCard
            :loading="loading"
            width="100%"
            max-width="25rem"
            subtitle="Insira suas credenciais"
            title="Login"
            variant="flat"
            tile
        >
            <template #loader="{ isActive }">
                <VProgressLinear
                    :active="isActive"
                    color="primary"
                    height="1"
                    indeterminate
                />
            </template>
            <VForm class="px-4 pb-4" @submit.prevent="onSubmit">
                <VTextField
                    v-model="email.value.value"
                    label="E-mail"
                    variant="outlined"
                    class="mb-2"
                    :error-messages="email.errorMessage.value"
                    :disabled="loading"
                />
                <VTextField
                    v-model="password.value.value"
                    label="Senha"
                    variant="outlined"
                    type="password"
                    class="mb-2"
                    :error-messages="password.errorMessage.value"
                    :disabled="loading"
                />
                <VBtn
                    block
                    color="primary"
                    type="submit"
                    variant="flat"
                    class="mb-2"
                    :loading="loading"
                    >Entrar</VBtn
                >
                <VBtn
                    block
                    color="primary"
                    type="submit"
                    variant="tonal"
                    :loading="loading"
                    :to="{ name: 'signup' }"
                    >Cadastre-se</VBtn
                >
            </VForm>
        </VCard>
        <VSnackbar v-model="snackbar" color="error">{{
            errorMessage
        }}</VSnackbar>
    </VContainer>
</template>

<script setup lang="ts">
    import { ref } from 'vue';
    import { useRouter } from 'vue-router';
    import { useField, useForm } from 'vee-validate';
    import * as yup from 'yup';
    import { AuthService } from '@/services';
    import { UnauthorizedError } from '@/services/http-errors';

    export type LoginData = {
        email: string;
        password: string;
    };

    const REQUIRED_FIELD = 'Campo obrigatório';

    const loading = ref(false);
    const errorMessage = ref('');
    const snackbar = ref(false);
    const router = useRouter();

    const { handleSubmit } = useForm<LoginData>({
        validationSchema: yup.object({
            email: yup
                .string()
                .email('E-mail inválido')
                .required(REQUIRED_FIELD),
            password: yup.string().required(REQUIRED_FIELD),
        }),
    });

    const email = useField('email');
    const password = useField('password');

    const onSubmit = handleSubmit(async (values) => {
        loading.value = true;

        const service = new AuthService();

        try {
            const response = await service.login({
                email: values.email,
                password: values.password,
            });

            snackbar.value = false;
            localStorage.setItem('token', response);
            router.replace({ name: 'home' });
        } catch (error) {
            if (error instanceof UnauthorizedError) {
                errorMessage.value = 'E-mail ou senha inválidos';
            } else {
                errorMessage.value = 'Erro ao fazer login';
            }

            snackbar.value = true;
        }

        loading.value = false;
    });
</script>

<style scoped></style>
