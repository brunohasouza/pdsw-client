<template>
    <VContainer class="d-flex align-center justify-center" min-height="100vh">
        <VCard
            :loading="loading"
            width="100%"
            max-width="25rem"
            subtitle="Cadastre-se preenchendo os campos abaixo"
            title="Crie sua conta"
            variant="flat"
            tile
        >
            <template #loader="{ isActive }">
                <VProgressLinear
                    :active="isActive"
                    color="primary"
                    indeterminate
                />
            </template>
            <VForm class="px-4 pb-4" @submit.prevent="onSubmit">
                <VTextField
                    v-model="name.value.value"
                    label="Nome"
                    variant="outlined"
                    class="mb-2"
                    :error-messages="name.errorMessage.value"
                    :disabled="loading"
                />
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
                    class="mb-2"
                    type="password"
                    :error-messages="password.errorMessage.value"
                    :disabled="loading"
                />
                <VTextField
                    v-model="confirm.value.value"
                    label="Repita sua senha"
                    variant="outlined"
                    class="mb-2"
                    type="password"
                    :error-messages="confirm.errorMessage.value"
                    :disabled="loading"
                />
                <VBtn
                    :loading="loading"
                    block
                    text="Criar conta"
                    type="submit"
                    variant="flat"
                    color="primary"
                    class="mb-2"
                />
                <VBtn
                    :loading="loading"
                    :to="{ name: 'login' }"
                    block
                    text="Voltar para login"
                    variant="tonal"
                    color="primary"
                />
            </VForm>
        </VCard>
        <VSnackbar v-model="snackbar.show" :color="snackbar.color">{{
            snackbar.message
        }}</VSnackbar>
    </VContainer>
</template>

<script setup lang="ts">
    import { reactive, ref } from 'vue';
    import { useField, useForm } from 'vee-validate';
    import * as yup from 'yup';
    import { useRouter } from 'vue-router';
    import { AuthService } from '@/services';

    export type UserBody = {
        email: string;
        password: string;
        name: string;
        picture: File;
    };

    const REQUIRED_FIELD = 'Campo obrigatório';
    const router = useRouter();

    const loading = ref(false);
    const snackbar = reactive({
        color: 'primary',
        message: '',
        show: false,
    });

    const { handleSubmit } = useForm<UserBody>({
        validationSchema: yup.object({
            name: yup.string().required(REQUIRED_FIELD),
            email: yup
                .string()
                .email('E-mail inválido')
                .required(REQUIRED_FIELD),
            password: yup.string().required(REQUIRED_FIELD),
            confirm: yup
                .string()
                .oneOf([yup.ref('password')], 'Senhas não conferem')
                .required(REQUIRED_FIELD),
        }),
    });

    const name = useField<string>('name');
    const email = useField<string>('email');
    const password = useField<string>('password');
    const confirm = useField<string>('confirm');

    const onSubmit = handleSubmit(async (values) => {
        loading.value = true;

        const service = new AuthService();

        try {
            await service.signup({
                email: values.email,
                password: values.password,
                name: values.name,
            });

            snackbar.color = 'success';
            snackbar.message =
                'Conta criada com sucesso. Redirigindo para login...';
            snackbar.show = true;

            setTimeout(() => router.replace({ name: 'login' }), 3000);
        } catch (error) {
            snackbar.color = 'error';
            snackbar.message = 'Erro ao criar conta';
            snackbar.show = true;
        }

        loading.value = false;
    });
</script>
