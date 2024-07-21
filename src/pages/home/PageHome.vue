<template>
    <div>
        <div class="page-wrapper">
            <!-- Page header -->
            <div class="page-header d-print-none">
                <div class="container-xl">
                    <div class="row g-2 align-items-center">
                        <div class="col">
                            <h2 class="page-title">
                                Dashboard dan Analisis
                            </h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="page-body">
            <div class="container-xl">
                <div class="row">
                    <div class="col-sm-6 col-md-4 mb-2">
                        <div class="card card-sm">
                            <div class="card-body">
                                <div class="row align-items-center">
                                    <div class="col-auto">
                                        <span
                                            class="bg-facebook text-white avatar"><!-- Download SVG icon from http://tabler-icons.io/i/brand-facebook -->
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                                stroke-linecap="round" stroke-linejoin="round"
                                                class="icon icon-tabler icons-tabler-outline icon-tabler-businessplan">
                                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                <path d="M16 6m-5 0a5 3 0 1 0 10 0a5 3 0 1 0 -10 0" />
                                                <path d="M11 6v4c0 1.657 2.239 3 5 3s5 -1.343 5 -3v-4" />
                                                <path d="M11 10v4c0 1.657 2.239 3 5 3s5 -1.343 5 -3v-4" />
                                                <path d="M11 14v4c0 1.657 2.239 3 5 3s5 -1.343 5 -3v-4" />
                                                <path d="M7 9h-2.5a1.5 1.5 0 0 0 0 3h1a1.5 1.5 0 0 1 0 3h-2.5" />
                                                <path d="M5 15v1m0 -8v1" />
                                            </svg>
                                        </span>
                                    </div>
                                    <div class="col">
                                        <div class="font-weight-medium">
                                            <span v-if="!loadJumlahHariIni">Rp {{ formatCurrency(jumlahPengeluaranHariIni) }}</span>
                                            <span v-else>...</span>
                                        </div>
                                        <div class="text-secondary">
                                            Pengeluaran Hari Ini
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-sm-6 col-md-4 mb-2">
                        <div class="card card-sm">
                            <div class="card-body">
                                <div class="row align-items-center">
                                    <div class="col-auto">
                                        <span
                                            class="bg-facebook text-white avatar"><!-- Download SVG icon from http://tabler-icons.io/i/brand-facebook -->
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                                stroke-linecap="round" stroke-linejoin="round"
                                                class="icon icon-tabler icons-tabler-outline icon-tabler-businessplan">
                                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                <path d="M16 6m-5 0a5 3 0 1 0 10 0a5 3 0 1 0 -10 0" />
                                                <path d="M11 6v4c0 1.657 2.239 3 5 3s5 -1.343 5 -3v-4" />
                                                <path d="M11 10v4c0 1.657 2.239 3 5 3s5 -1.343 5 -3v-4" />
                                                <path d="M11 14v4c0 1.657 2.239 3 5 3s5 -1.343 5 -3v-4" />
                                                <path d="M7 9h-2.5a1.5 1.5 0 0 0 0 3h1a1.5 1.5 0 0 1 0 3h-2.5" />
                                                <path d="M5 15v1m0 -8v1" />
                                            </svg>
                                        </span>
                                    </div>
                                    <div class="col">
                                        <div class="font-weight-medium">
                                            <span v-if="!loadJumlahBulanIni">Rp {{ formatCurrency(jumlahPengeluaranBulanIni) }}</span>
                                            <span v-else>...</span>
                                        </div>
                                        <div class="text-secondary">
                                            Pengeluaran Bulan Ini
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-sm-6 col-md-4 mb-2">
                        <div class="card card-sm">
                            <div class="card-body">
                                <div class="row align-items-center">
                                    <div class="col-auto">
                                        <span
                                            class="bg-facebook text-white avatar"><!-- Download SVG icon from http://tabler-icons.io/i/brand-facebook -->
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                                stroke-linecap="round" stroke-linejoin="round"
                                                class="icon icon-tabler icons-tabler-outline icon-tabler-report-analytics">
                                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                <path
                                                    d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2" />
                                                <path
                                                    d="M9 3m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z" />
                                                <path d="M9 17v-5" />
                                                <path d="M12 17v-1" />
                                                <path d="M15 17v-3" />
                                            </svg>
                                        </span>
                                    </div>
                                    <div class="col">
                                        <div class="font-weight-medium">
                                            -
                                        </div>
                                        <div class="text-secondary">
                                            Analisis
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-6">
                        <div class="card">
                            <div class="card-header">
                                <h4 class="modal-title">Rincian Pengeluaran Hari ini</h4>
                            </div>
                            <div class="card-body">
                                <div class="table-responsive">
                                    <table class="table table-border">
                                        <thead></thead>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="card">
                            <div class="card-header">
                                <h4 class="modal-title">Rincian Pengeluaran Bulan Ini</h4>
                            </div>
                            <div class="card-body">
                                <div class="table-responsive">
                                    <table class="table table-border">
                                        <thead></thead>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script setup>
import { ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import { pengeluaranHariIni, pengeluaranBulanIni } from '../../hooks/dashboard_api';

const store = useStore();
const loadJumlahHariIni = ref(false);
const jumlahPengeluaranHariIni = ref(0);

const loadJumlahBulanIni = ref(false);
const jumlahPengeluaranBulanIni = ref(0);

onMounted(async () => {
    try {
        await loadPengeluaranHariIni();
        await loadPengeluaranBulanIni();

    } catch (error) {
        alert(error.message);
    }
})


async function loadPengeluaranHariIni() {
    try {
        loadJumlahHariIni.value = true;
        const token = store.getters.getToken;
        const result = await pengeluaranHariIni(token);
        if (result.success !== true) {
            throw new Error(result.message);
        }
        jumlahPengeluaranHariIni.value = result.data;
        loadJumlahHariIni.value = false;
    } catch (error) {
        alert(error.message);
    }
}


async function loadPengeluaranBulanIni() {
    try {
        loadJumlahBulanIni.value = true;
        const token = store.getters.getToken;
        const result = await pengeluaranBulanIni(token);
        if (result.success !== true) {
            throw new Error(result.message);
        }
        jumlahPengeluaranBulanIni.value = result.data;
        loadJumlahBulanIni.value = false;
    } catch (error) {
        alert(error.message);
    }
}

function formatCurrency(nilai) {
    const formatter = new Intl.NumberFormat('id-ID');
    return formatter.format(nilai);
}
</script>