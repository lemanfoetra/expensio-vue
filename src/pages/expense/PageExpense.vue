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
                                <button v-if="showButtonDelete" @click="deleteMultipleExpense" type="button"
                                    class="btn btn-danger d-none d-sm-inline-block">
                                    <svg v-if="!loadingDetele" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                        viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                        stroke-linecap="round" stroke-linejoin="round"
                                        class="icon icon-tabler icons-tabler-outline icon-tabler-x">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                        <path d="M18 6l-12 12" />
                                        <path d="M6 6l12 12" />
                                    </svg>
                                    <svg v-else xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                        viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                        stroke-linecap="round" stroke-linejoin="round"
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
                                    Hapus
                                </button>
                                <button v-if="showButtonDelete" @click="deleteMultipleExpense" type="button"
                                    class="btn btn-danger d-sm-none btn-icon">
                                    <svg v-if="!loadingDetele" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                        viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                        stroke-linecap="round" stroke-linejoin="round"
                                        class="icon icon-tabler icons-tabler-outline icon-tabler-x">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                        <path d="M18 6l-12 12" />
                                        <path d="M6 6l12 12" />
                                    </svg>
                                    <svg v-else xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                        viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                        stroke-linecap="round" stroke-linejoin="round"
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
import { loadExpense, deleteExpense } from '../../hooks/crud_expense'
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
let loadingDetele = ref(false);
let listIdExpense = ref([]);


onMounted(async () => {
    loadingExpeses.value = true;
    try {
        const token = store.getters.getToken;
        const result = await loadExpense(token);

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

async function deleteMultipleExpense() {
    loadingDetele.value = true;
    try {
        if (listIdExpense.value.length > 0) {
            for await (const id of listIdExpense.value) {
                const result = await deleteExpense(store.getters.getToken, id);
                // const result = await response.json();
                if (result.success !== true) {
                    throw new Error('Hapus data gagal.')
                }
            }

            store.dispatch('deleteExpense', listIdExpense.value);
            listIdExpense.value = [];
        }
        loadingDetele.value = false;
    } catch (error) {
        loadingDetele.value = false;
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