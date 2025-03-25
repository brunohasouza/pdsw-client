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
                <div class="mb-2 text-center">
                    <VAvatar size="128" color="grey-lighten-2">
                        <VImg
                            v-if="pictureUrl"
                            aspect-ratio="1"
                            :src="pictureUrl"
                        />
                        <VIcon
                            v-else
                            icon="mdi-account"
                            size="64"
                            color="grey"
                        />
                    </VAvatar>
                </div>
                <VFileInput
                    v-model="picture.value.value"
                    variant="outlined"
                    label="Foto de perfil"
                    density="comfortable"
                    class="mb-2"
                    accept="image/png, image/jpeg, image/jpg"
                    prepend-icon="mdi-camera"
                    clearable
                />
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
    </VContainer>
</template>

<script setup lang="ts">
    import { useField, useForm } from 'vee-validate';
    import { ref, watchEffect } from 'vue';
    import * as yup from 'yup';

    export type UserBody = {
        email: string;
        password: string;
        name: string;
        picture: File;
    };

    const REQUIRED_FIELD = 'Campo obrigatório';

    const loading = ref(false);
    const pictureUrl = ref('');

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
            picture: yup.mixed().nullable(),
        }),
    });

    const picture = useField<File>('picture');
    const name = useField<string>('name');
    const email = useField<string>('email');
    const password = useField<string>('password');
    const confirm = useField<string>('confirm');

    const onSubmit = handleSubmit((values) => {
        loading.value = true;
    });

    watchEffect(() => {
        if (!picture.value.value) {
            pictureUrl.value = '';
            return;
        }

        const reader = new FileReader();
        reader.onload = (event) => {
            pictureUrl.value = event.target?.result as string;
        };

        reader.readAsDataURL(picture.value.value as Blob);
    });
</script>
