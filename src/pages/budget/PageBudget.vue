<template>
    <div>
        <div class="page-wrapper">
            <!-- Page header -->
            <div class="page-header d-print-none">
                <div class="container-xl">
                    <div class="row g-2 align-items-center">
                        <div class="col">
                            <h2 class="page-title">
                                Atur Budget
                            </h2>
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
                                    <div v-if="showButtonDelete" class="box-action-hapus">
                                        <button @click="deleteMultipleIncomes" type="button"
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

                    <div v-if="loadingIncomes" class="col-md-12">
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

                    <div v-else-if="!loadingIncomes && budgets.length == 0">
                        <div class="card mt-2 col-md-12">
                            <div style="padding: 10px; text-align: center;">
                                Tidak ada data
                            </div>
                        </div>
                    </div>
                    <div v-else>
                        <ListBudget v-for="budget in budgets" :key="budget.id_tipe" :id_tipe="budget.id_tipe"
                            :tipe="budget.tipe" :budget="budget.budget" :sisa="budget.sisa"
                            :total_expense="budget.total_expense" @on-click-list="onListClick"
                            @on-checkbox-click="onCheckboxClick" :show-option="showOption">
                        </ListBudget>
                    </div>

                     <div class="col-md-12 mt-3">
                        <button type="button" @click="onButtonAddClick" style="width: 100%;"
                            class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#modal-simple">Tambah
                            Tipe Budget</button>
                        <button type="button" style="display: none;" id="buton_open_modal"
                            class="btn btn-outline-primary" data-bs-toggle="modal"
                            data-bs-target="#modal-simple"></button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="modal modal-blur fade" id="modal-simple" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <form-budget @submit="onSumbitForm"></form-budget>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, defineModel } from 'vue';
import { useStore } from 'vuex'

// component
import ListBudget from './ListBudget.vue';
import { api_budget_delete, api_budget_list } from '@/hooks/api_budget';
import FormBudget from './FormBudget.vue';

// const router = useRouter();
const store = useStore();
let loadingIncomes = ref(false);
let loadingDetele = ref(false);
let listIdBudget = ref([]);
const checkShowOption = defineModel('showOption');
const budgets = ref([]);

const showButtonDelete = computed(function () {
    if (listIdBudget.value.length > 0) {
        return true;
    }
    return false;
});

/**
 * Show checklist di list budget ketika cheklist option di klik
 */
const showOption = computed(function () {
    return checkShowOption.value;
});



onMounted(async () => {
    await loadBudgetList();
})

/**
 * Load budget dari server
 */
async function loadBudgetList() {
    loadingIncomes.value = true;
    try {
        const token = store.getters.getToken;
        const result = await api_budget_list(token);

        budgets.value = [];
        for (let index = 0; index < result.data.length; index++) {
            const data = result.data[index];
            budgets.value.push({
                key: data.tipe_expense_id,
                id_tipe: data.tipe_expense_id,
                tipe: data.tipe,
                budget: data.budget,
                total_expense: data.total_expense,
                sisa: data.sisa,
            });
        }

        if (!result.success === true) {
            throw new Error("Gagal memuat data.");
        }
        loadingIncomes.value = false;
    } catch (error) {
        loadingIncomes.value = false;
        alert(error.message);
    }
}


/**
 * Checklist opsi
 */
function changeOption() {
    if (checkShowOption.value && listIdBudget.value > 0) {
        listIdBudget.value = [];
    }
}


async function deleteMultipleIncomes() {
    if (!confirm('Anda yakin hapus?')) {
        return;
    }
    loadingDetele.value = true;
    try {
        if (listIdBudget.value.length > 0) {
            for await (const id of listIdBudget.value) {
                const result = await api_budget_delete(store.getters.getToken, id);
                // const result = await response.json();
                if (result.success !== true) {
                    throw new Error('Hapus data gagal.')
                }
            }
            listIdBudget.value = [];
        }
        loadingDetele.value = false;
        await loadBudgetList();
    } catch (error) {
        loadingDetele.value = false;
        alert(error.message);
    }
}


function onCheckboxClick(value) {
    if (value.status) {
        listIdBudget.value.push(value.id);
    } else {
        const index = listIdBudget.value.findIndex(ex => ex === value.id);
        if (index > -1) {
            listIdBudget.value.splice(index, 1);
        }
    }
}


function onButtonAddClick() {
    store.dispatch('setBudgetIdState', 0);
}


function onListClick(id_tipe) {
    store.dispatch('setBudgetIdState', id_tipe);
    document.getElementById('buton_open_modal').click();
}

async function onSumbitForm() {
    await loadBudgetList();
    store.dispatch('setBudgetIdState', 0);
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