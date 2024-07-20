<template>
    <div>
        <div class="page-wrapper">
            <!-- Page header -->
            <div class="page-header d-print-none">
                <div class="container-xl">
                    <div class="row g-2 align-items-center">
                        <div class="col">
                            <h2 class="page-title">
                                Pengeluaran
                            </h2>
                        </div>
                        <!-- Page title actions -->
                        <div class="col-auto ms-auto d-print-none">
                            <div class="btn-list">
                                <button v-if="showButtonDelete" @click="deleteExpense" type="button"
                                    class="btn btn-danger d-none d-sm-inline-block">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                        stroke-linejoin="round"
                                        class="icon icon-tabler icons-tabler-outline icon-tabler-x">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                        <path d="M18 6l-12 12" />
                                        <path d="M6 6l12 12" />
                                    </svg>
                                    Hapus</button>
                                <button v-if="showButtonDelete" @click="deleteExpense" type="button"
                                    class="btn btn-danger d-sm-none btn-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                        stroke-linejoin="round"
                                        class="icon icon-tabler icons-tabler-outline icon-tabler-x">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                        <path d="M18 6l-12 12" />
                                        <path d="M6 6l12 12" />
                                    </svg>
                                </button>


                                <button type="button" style="display: none;" id="buton_open_modal"
                                    data-bs-toggle="modal" data-bs-target="#modal-simple"></button>
                                <button @click="addForm" type="button" class="btn btn-primary d-none d-sm-inline-block"
                                    data-bs-toggle="modal" data-bs-target="#modal-simple">
                                    <!-- Download SVG icon from http://tabler-icons.io/i/plus -->
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                        stroke-linejoin="round" class="icon">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                        <path d="M12 5l0 14" />
                                        <path d="M5 12l14 0" />
                                    </svg>
                                    Tambah Pengeluaran
                                </button>
                                <button @click="addForm" type="button" class="btn btn-primary d-sm-none btn-icon"
                                    data-bs-toggle="modal" data-bs-target="#modal-simple"
                                    aria-label="Create new report">
                                    <!-- Download SVG icon from http://tabler-icons.io/i/plus -->
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                        stroke-linejoin="round" class="icon">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                        <path d="M12 5l0 14" />
                                        <path d="M5 12l14 0" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="page-body">
            <div class="container-xl">
                <div class="row row-deck row-cards">
                    <div class="col-md-12">
                        <loading v-model:active="loadingExpeses" :is-full-page="true" />
                    </div>
                    <list-expense v-for="expense in expenses" :key="expense.key" :id="expense.id"
                        :tanggal="expense.date" :nominal="expense.nominal" :keterangan="expense.deskripsi"
                        @click-detail="editForm" @on-checkbox-click="onCheckboxClick">
                    </list-expense>
                </div>
            </div>
        </div>
    </div>

    <div class="modal modal-blur fade" id="modal-simple" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <form-expense @submit="onSubmited" :idExpense="idExpense"></form-expense>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex'
// import { useRouter } from 'vue-router'

// directive
// import vLongPress from '../../components/directives/v-long-press.js';

// component
import ListExpense from './ListExpense.vue';
import FormExpense from './FormExpense.vue';
import Loading from 'vue-loading-overlay';

// const router = useRouter();
const store = useStore();
let idExpense = ref(0);
let loadingExpeses = ref(false);
let listIdExpense = ref([]);


onMounted(async () => {
    loadingExpeses.value = true;

    try {
        const token = store.getters.getToken;
        const url = 'http://expense.ardynsulaeman.cloud/api/expense';
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });
        if (!response.ok) {
            throw new Error("Gagal memuat data.");
        }
        const result = await response.json();

        if (!result.success === true) {
            throw new Error("Gagal memuat data.");
        }
        store.dispatch('deleteAllExpense');
        result.data.forEach(expense => {
            store.dispatch('addExpense', {
                date: expense.date,
                nominal: expense.nominal,
                deskripsi: expense.deskripsi,
                id: expense.id,
            });
        });
        loadingExpeses.value = false;
    } catch (error) {
        loadingExpeses.value = false;
        alert(error.message);
    }
})


const expenses = computed(function () {
    const datas = store.getters.expenses;
    return datas;
});


const showButtonDelete = computed(function () {
    if (listIdExpense.value.length > 0) {
        return true;
    }
    return false;
});

function addForm() {
    idExpense.value = 0;
}

function editForm(data) {
    idExpense.value = data;
    document.getElementById('buton_open_modal').click();
}

async function deleteExpense() {
    try {
        if (listIdExpense.value.length > 0) {
            for await (const id of listIdExpense.value) {
                const url = `http://expense.ardynsulaeman.cloud/api/expense/${id}`;
                const response = await fetch(url, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${store.getters.getToken}`
                    }
                });
                if (!response.ok) {
                    throw new Error("Hapus data gagal.");
                }
                const result = await response.json();
                if (result.success !== true) {
                    throw new Error('Hapus data gagal.')
                }
            }

            store.dispatch('deleteExpense', listIdExpense.value);
            listIdExpense.value = [];
        }
    } catch (error) {
        alert(error.message);
    }
}

function onSubmited() {
    idExpense.value = 0;
}

function onCheckboxClick(value) {
    if (value.status) {
        listIdExpense.value.push(value.id);
    } else {
        const index = listIdExpense.value.findIndex(ex => ex === value.id);
        if (index > -1) {
            listIdExpense.value.splice(index, 1);
        }
    }
}
</script>