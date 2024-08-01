<template>
    <div class="page">
        <header class="navbar navbar-expand-md navbar-light d-print-none">
            <div class="container-xl">
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar-menu">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <h1 class="navbar-brand navbar-brand-autodark d-none-navbar-horizontal pe-0 pe-md-3">
                    <div>
                        <span>Expensio</span>
                        <div style="font-size: 12px; color: gray; margin-top: 5px;">
                            Improve your spending 
                        </div>
                    </div>
                </h1>
                <div class="navbar-nav flex-row order-md-last">
                    <div class="nav-item dropdown">
                        <a href="#" class="nav-link d-flex lh-1 text-reset p-0" data-bs-toggle="dropdown"
                            aria-label="Open user menu">
                            <span class="avatar avatar-sm"
                                style="background-image: url(./static/avatars/me.png)"></span>
                            <div class="d-none d-xl-block ps-2">
                                <div>{{ user.name }}</div>
                                <div class="mt-1 small text-muted">
                                    {{ user.email }}
                                </div>
                            </div>
                        </a>
                        <div class="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                            <!-- <a href="#" class="dropdown-item">Settings</a>
                            <a href="#" class="dropdown-item">Profile</a>
                            <div class="dropdown-divider"></div> -->
                            <button type="button" @click="logout" class="dropdown-item">Logout</button>
                        </div>
                    </div>
                </div>
            </div>
        </header>
        <header class="navbar-expand-md">
            <div class="collapse navbar-collapse" id="navbar-menu">
                <div class="navbar">
                    <div class="container-xl">
                        <div class="row flex-fill align-items-center">
                            <div class="col">
                                <ul class="navbar-nav">
                                    <li :class="classActive('/home')">
                                        <router-link class="nav-link" to="/home">
                                            <span class="nav-link-icon d-md-none d-lg-inline-block">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                    viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                                    class="icon icon-tabler icons-tabler-outline icon-tabler-dashboard">
                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                    <path d="M12 13m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                                                    <path d="M13.45 11.55l2.05 -2.05" />
                                                    <path d="M6.4 20a9 9 0 1 1 11.2 0z" />
                                                </svg>
                                            </span>
                                            <span class="nav-link-title">
                                                Dashboard dan Analisis
                                            </span>
                                        </router-link>
                                    </li>
                                    <!-- <li :class="classActive('/planning')">
                                        <router-link class="nav-link" to="/planning">
                                            <span class="nav-link-icon d-md-none d-lg-inline-block">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                    viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                                    class="icon icon-tabler icons-tabler-outline icon-tabler-checklist">
                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                    <path
                                                        d="M9.615 20h-2.615a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v8" />
                                                    <path d="M14 19l2 2l4 -4" />
                                                    <path d="M9 8h4" />
                                                    <path d="M9 12h2" />
                                                </svg>
                                            </span>
                                            <span class="nav-link-title">
                                                Perencanaan
                                            </span>
                                        </router-link>
                                    </li>
                                    <li :class="classActive('/income')">
                                        <router-link class="nav-link" to="/income">
                                            <span class="nav-link-icon d-md-none d-lg-inline-block">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                    viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                                    class="icon icon-tabler icons-tabler-outline icon-tabler-database-export">
                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                    <path
                                                        d="M4 6c0 1.657 3.582 3 8 3s8 -1.343 8 -3s-3.582 -3 -8 -3s-8 1.343 -8 3" />
                                                    <path
                                                        d="M4 6v6c0 1.657 3.582 3 8 3c1.118 0 2.183 -.086 3.15 -.241" />
                                                    <path d="M20 12v-6" />
                                                    <path
                                                        d="M4 12v6c0 1.657 3.582 3 8 3c.157 0 .312 -.002 .466 -.005" />
                                                    <path d="M16 19h6" />
                                                    <path d="M19 16l3 3l-3 3" />
                                                </svg>
                                            </span>
                                            <span class="nav-link-title">
                                                Pemasukan
                                            </span>
                                        </router-link>
                                    </li> -->
                                    <li :class="classActive('/expense')">
                                        <router-link class="nav-link" to="/expense">
                                            <span class="nav-link-icon d-md-none d-lg-inline-block">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                    viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                                    class="icon icon-tabler icons-tabler-outline icon-tabler-database-import">
                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                    <path
                                                        d="M4 6c0 1.657 3.582 3 8 3s8 -1.343 8 -3s-3.582 -3 -8 -3s-8 1.343 -8 3" />
                                                    <path
                                                        d="M4 6v6c0 1.657 3.582 3 8 3c.856 0 1.68 -.05 2.454 -.144m5.546 -2.856v-6" />
                                                    <path d="M4 12v6c0 1.657 3.582 3 8 3c.171 0 .341 -.002 .51 -.006" />
                                                    <path d="M19 22v-6" />
                                                    <path d="M22 19l-3 -3l-3 3" />
                                                </svg>
                                            </span>
                                            <span class="nav-link-title">
                                                Pengeluaran
                                            </span>
                                        </router-link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
        <router-view></router-view>
    </div>
</template>

<script>
import { ref, watch, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

export default {
    setup() {
        const route = useRoute();
        const router = useRouter();
        const store = useStore();

        let routeOpened = ref(route.path);

        watch(
            () => route.path,
            (newPath) => {
                routeOpened.value = newPath;
            }
        )

        const user = computed(function () {
            const us = store.getters.getUser;
            return us.user;
        });


        function classActive(reuteName) {
            if (routeOpened.value === reuteName) {
                return "nav-item active";
            }
            return "nav-item";
        }

        function logout() {
            store.dispatch('logout');
            router.push('/');
        }

        return {
            classActive,
            logout,

            user
        }
    }
}
</script>