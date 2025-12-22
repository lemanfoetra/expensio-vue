<template>
    <div class="page page-center">
        <div class="container container-tight py-4">
            <div class="text-center mb-4">
                <h2>XPay</h2>
                <h4>By Texva.id</h4>
            </div>

            <div v-if="!validForm" class="alert alert-danger" role="alert">
                {{ errorAlert.value }}
            </div>

            <div class="card card-md">
                <div class="card-body">
                    <h2 class="h2 text-center mb-4">Login to your account</h2>
                    <form @submit.prevent="sumbitLogin">
                        <div class="mb-3">
                            <label class="form-label">Email address</label>
                            <input type="email" class="form-control" v-model="email" autocomplete="off">
                            <div class="invalid-feedback">Invalid feedback</div>
                        </div>
                        <div class="mb-2">
                            <label class="form-label">
                                Password
                                <!-- <span class="form-label-description">
                                    <a href="#">I forgot password</a>
                                </span> -->
                            </label>
                            <div class="input-group input-group-flat">
                                <input id="password" type="password" class="form-control" v-model="password"
                                    autocomplete="off">
                                <span class="input-group-text">
                                    <a href="#" @click="showPassword" type="button" class="link-secondary"
                                        title="Show password"
                                        data-bs-toggle="tooltip"><!-- Download SVG icon from http://tabler-icons.io/i/eye -->
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                            viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                            stroke-linecap="round" stroke-linejoin="round" class="icon">
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                            <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                                            <path
                                                d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" />
                                        </svg>
                                    </a>
                                </span>
                            </div>
                        </div>
                        <!-- <div class="mb-2">
                            <label class="form-check">
                                <input type="checkbox" class="form-check-input" />
                                <span class="form-check-label">Remember me on this device</span>
                            </label>
                        </div> -->
                        <div class="form-footer">
                            <button v-if="!loadingLogin" type="submit" class="btn btn-primary w-100">Sign in</button>
                            <button v-else type="button" class="disabled btn btn-primary w-100">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round"
                                    class="icon icon-tabler icons-tabler-outline icon-tabler-loader">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <path d="M12 6l0 -3" />
                                    <path d="M16.25 7.75l2.15 -2.15" />
                                    <path d="M18 12l3 0" />
                                    <path d="M16.25 16.25l2.15 2.15" />
                                    <path d="M12 18l0 3" />
                                    <path d="M7.75 16.25l-2.15 2.15" />
                                    <path d="M6 12l-3 0" />
                                    <path d="M7.75 7.75l-2.15 -2.15" />
                                </svg>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <!-- <div class="text-center text-secondary mt-3">
                Don't have account yet?
                <router-link to="/home">Go to expense</router-link>
            </div> -->
        </div>
    </div>
</template>

<script setup>
import { ref, computed, watch, defineModel } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex'

const router = useRouter();
const store = useStore();
const email = defineModel('email');
const password = defineModel('password');

const validForm = ref(true);
const errorLogin = ref('');
const loadingLogin = ref(false);
const showInputPassword = ref(false);

watch([email, password], () => {
    validForm.value = true;
    errorLogin.value = '';
});

const errorAlert = computed(function () {
    return errorLogin;
})


async function sumbitLogin() {
    loadingLogin.value = true;
    try {
        if (email.value === '' || password.value === '') {
            throw new Error("Mohon isi semua inputan.");
        }

        const url = 'http://127.0.0.1:8000/api/login';
        const data = {
            email: email.value,
            password: password.value
        };
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            const statusCode = response.status;
            if (statusCode === 401) {
                throw new Error("Email atau password yang Anda masukan salah.");
            }
        }
        const result = await response.json();
        if (!result.access_token) {
            throw new Error("Login gagal silahkan coba kembali.");
        }

        // SIMPAN KE LOCAL STOAGE
        if (response.status === 200) {
            localStorage.setItem('access_token', result.access_token);
            localStorage.setItem('user', JSON.stringify(result));
            store.dispatch('setToken', result.access_token);
            store.dispatch('setUser', result);

            loadingLogin.value = false;
            const token = localStorage.getItem('access_token');
            if ((token || null) !== null) {
                router.push('/home');
            }
        }
        throw new Error('Login gagal silahkan coba kembali.');

    } catch (er) {
        validForm.value = false;
        errorLogin.value = er.message;
        loadingLogin.value = false;
    }
}

function showPassword() {
    const passwordField = document.getElementById('password');
    showInputPassword.value = !showInputPassword.value;
    if (showInputPassword.value) {
        passwordField.type = 'text';
    } else {
        passwordField.type = 'password';
    }
}
</script>