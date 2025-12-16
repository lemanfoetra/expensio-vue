<template>
    <div>
        <div class="page-wrapper">
            <!-- Page header -->
            <div class="page-header d-print-none">
                <div class="container-xl">
                    <div class="row g-2 align-items-center">
                        <div class="col">
                            <h2 class="page-title">
                                Pemasukan
                            </h2>
                        </div>
                        <!-- Page title actions -->
                        <div class="col-auto ms-auto d-print-none">
                            <div class="btn-list">
                                <button type="button" style="display: none;" id="buton_open_modal"
                                    data-bs-toggle="modal" data-bs-target="#modal-simple"></button>
                                <button @click="addForm" type="button" class="btn btn-primary d-none d-sm-inline-block"
                                    data-bs-toggle="modal" data-bs-target="#modal-simple" :disabled="loadingFormData">
                                    <!-- Download SVG icon from http://tabler-icons.io/i/plus -->
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                        stroke-linejoin="round" class="icon">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                        <path d="M12 5l0 14" />
                                        <path d="M5 12l14 0" />
                                    </svg>
                                    Tambah Pemasukan
                                </button>
                                <button @click="addForm" type="button" class="btn btn-primary d-sm-none btn-icon"
                                    data-bs-toggle="modal" data-bs-target="#modal-simple" :disabled="loadingFormData">
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
                                <div class="">
                                    <div class="control-checkbox">
                                        <input type="checkbox" @change="changeOption" v-model="checkShowOption"
                                            class="form-check-input"
                                            style="margin-top: 6px; margin-bottom: 6px; border: 1px solid #0054a6"
                                            :disabled="showButtonDelete">
                                    </div>

                                    <div v-if="!showButtonDelete" class="box-filter-date">
                                        Filter
                                        <date-filter v-model="filterDateFirst"></date-filter>
                                        <svg style="margin-bottom: 7px" xmlns="http://www.w3.org/2000/svg" width="24"
                                            height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                            stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                            class="icon icon-tabler icons-tabler-outline icon-tabler-arrow-narrow-right">
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                            <path d="M5 12l14 0" />
                                            <path d="M15 16l4 -4" />
                                            <path d="M15 8l4 4" />
                                        </svg>
                                        <date-filter v-model="filterDateLast"></date-filter>
                                    </div>

                                    <div v-if="showButtonDelete" class="box-action-hapus">
                                        <button @click="deleteMultipleExpense" type="button"
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
                    <div v-else-if="!loadingExpeses && incomes.length == 0">
                        <div class="card mt-2">
                            <div style="padding: 10px; text-align: center;">
                                Tidak ada data
                            </div>
                        </div>
                    </div>
                    <div v-else>
                        <list-income v-for="income in incomes" :key="income.key" :id="income.id"
                            :tanggal="income.date" :nominal="income.nominal" :keterangan="income.deskripsi"
                            :tipe_expense="income.tipe_expense" :id_tipe_expense="income.id_tipe_expense" @click-detail="editForm"
                            @on-checkbox-click="onCheckboxClick" :show-option="showOption">
                        </list-income>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="modal modal-blur fade" id="modal-simple" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <form-income @submit="onSubmited" :idExpense="idExpense" :type-incomes="typeExpenses"></form-income>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, defineModel, watch } from 'vue';
import { useStore } from 'vuex'
import { loadExpense, deleteExpense, getTypeExpense } from '../../hooks/crud_expense'
import { getStartAndEndOfWeek } from '../../hooks/helpers';

// component
import ListIncome from './ListIncome.vue';
import DateFilter from './DateFilter.vue';

// const router = useRouter();
const store = useStore();
let idExpense = ref(0);
let loadingExpeses = ref(false);
let loadingDetele = ref(false);
const loadingFormData = ref(false);
let listIdExpense = ref([]);
const typeExpenses = ref([]);
const checkShowOption = defineModel('showOption');
const filterDateFirst = ref('');
const filterDateLast = ref('');


const incomes = computed(function () {
    const datas = store.getters.incomes;
    return datas;
});


const showButtonDelete = computed(function () {
    if (listIdExpense.value.length > 0) {
        return true;
    }
    return false;
});

/**
 * Show checklist di list income ketika cheklist option di klik
 */
const showOption = computed(function () {
    return checkShowOption.value;
});

/**
 * Load income ketika filter tanggal berubah dan ketika halaman pertama kali dimuat
 */
watch([filterDateFirst, filterDateLast], async (newValue) => {
    await loadIncomeFromServer(
        {
            'firstDay': newValue[0],
            'lastDay': newValue[1],
        }
    );
});


onMounted(async () => {
    // Default day filter
    const today = new Date();
    const result = getStartAndEndOfWeek(today)
    filterDateFirst.value = result.startOfWeek;
    filterDateLast.value = result.endOfWeek;
    await loadListTypeExpense();
})

/**
 * Load income dari server
 */
async function loadIncomeFromServer(params) {
    loadingExpeses.value = true;
    try {
        const token = store.getters.getToken;
        const result = await loadExpense(token, params);

        if (!result.success === true) {
            throw new Error("Gagal memuat data.");
        }
        store.dispatch('deleteAllExpense');
        result.data.forEach(income => {
            store.dispatch('addExpenseLast', {
                date: income.date,
                nominal: income.nominal,
                deskripsi: income.deskripsi,
                id: income.id,
                id_tipe_expense: income.id_tipe_expense,
                tipe_expense: income.tipe_expense,
            });
        });
        loadingExpeses.value = false;
    } catch (error) {
        loadingExpeses.value = false;
        alert(error.message);
    }
}

async function loadListTypeExpense() {
    loadingFormData.value = true;
    try {
        const token = store.getters.getToken;
        const result = await getTypeExpense(token);

        typeExpenses.value = [];
        result.data.forEach(element => {
            const newData = {
                id: element.id,
                tipe: element.tipe,
            };
            typeExpenses.value.push(newData);
        });
        loadingFormData.value = false;
    } catch (error) {
        loadingFormData.value = false;
        alert(error.message);
    }
}

/**
 * Checklist opsi
 */
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
    if (!confirm('Anda yakin hapus?')) {
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
    white-space: nowrap;
    overflow-x: auto;
}

.control-checkbox {
    display: inline;
    padding-left: 10px;
    max-width: 45px !important;
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

.box-filter-date {
    display: inline;
    margin-left: 10px;
}

.box-action-hapus {
    display: inline;
    margin-left: 20px;
}
</style>