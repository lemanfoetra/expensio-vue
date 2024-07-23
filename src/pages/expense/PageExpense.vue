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
                <div class="row">
                    <div class="col-md-12">
                        <div class="card">
                            <div class="content-filter">
                                <div class="row">
                                    <div class="col control-checkbox">
                                        <input type="checkbox" @change="changeOption" v-model="checkShowOption"
                                            class="form-check-input" style="margin-top: 6px; margin-bottom: 6px; border: 1px solid #0054a6"
                                            :disabled="showButtonDelete">
                                    </div>
                                    <div class="col">
                                        <button v-if="showButtonDelete" @click="deleteMultipleExpense" type="button"
                                            class="action-button-delete btn-sm" :disabled="loadingDetele">
                                            <span v-if="!loadingDetele">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                    viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                                    class="icon icon-tabler icons-tabler-outline icon-tabler-trash">
                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                    <path d="M4 7l16 0" />
                                                    <path d="M10 11l0 6" />
                                                    <path d="M14 11l0 6" />
                                                    <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                                                    <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                                                </svg>
                                            </span>
                                            <span v-else>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                    viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
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
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-if="loadingExpeses" class="col-md-12">
                        <div class="card mt-2">
                            <div style="padding: 10px; text-align: center;">
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
                                Memuat ...
                            </div>
                        </div>
                    </div>
                    <div v-else-if="!loadingExpeses && expenses.length == 0">
                        <div class="card mt-2">
                            <div style="padding: 10px; text-align: center;">
                                Tidak ada data
                            </div>
                        </div>
                    </div>
                    <div v-else>
                        <list-expense v-for="expense in expenses" :key="expense.key" :id="expense.id"
                            :tanggal="expense.date" :nominal="expense.nominal" :keterangan="expense.deskripsi"
                            @click-detail="editForm" @on-checkbox-click="onCheckboxClick" :show-option="showOption">
                        </list-expense>
                    </div>
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
import { ref, computed, onMounted, defineModel } from 'vue';
import { useStore } from 'vuex'
import { loadExpense, deleteExpense } from '../../hooks/crud_expense'
// import { useRouter } from 'vue-router'

// directive
// import vLongPress from '../../components/directives/v-long-press.js';

// component
import ListExpense from './ListExpense.vue';
import FormExpense from './FormExpense.vue';
// import Loading from 'vue-loading-overlay';

// const router = useRouter();
const store = useStore();
let idExpense = ref(0);
let loadingExpeses = ref(false);
let loadingDetele = ref(false);
let listIdExpense = ref([]);
const checkShowOption = defineModel('showOption');


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


const showOption = computed(function () {
    return checkShowOption.value;
});


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
            store.dispatch('addExpenseLast', {
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


function changeOption() {
    if (checkShowOption.value && listIdExpense.value > 0) {
        listIdExpense.value = [];
    }
}


function addForm() {
    idExpense.value = 0;
}

function editForm(data) {
    idExpense.value = data;
    document.getElementById('buton_open_modal').click();
}

async function deleteMultipleExpense() {
    if(!confirm('Anda yakin hapus?')){
        return;
    }
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

<style scoped>
.content-filter {
    padding: 10px;
    margin-bottom: 0px !important;
}

.control-checkbox {
    max-width: 50px !important;
    text-align: center !important;
}

.action-button-delete {
    border: 1px solid rgb(220, 78, 65);
    background-color: transparent;
    color: rgb(220, 78, 65);
    padding: 5px 8px 5px 8px;
    border-radius: 3px;
}

.action-button-delete:hover {
    background-color: antiquewhite;
}
</style>