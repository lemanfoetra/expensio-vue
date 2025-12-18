<template>
    <form class="modal-content" @submit.prevent="submitForm">
        <div>
            <div class="modal-header">
                <h5 class="modal-title">Tambah Pemasukan</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div v-if="statusMemuat" class="box-loading">
                    <Loading v-model:active="statusMemuat" :is-full-page="false" />
                </div>
                <div v-else>
                    <div class="form-floating mb-3">
                        <input type="date" class="form-control" id="income_date" v-model.trim="income_date" autocomplete="off">
                        <label for="income_date">Tanggal</label>
                    </div>
                    <div class="form-floating mb-3">
                        <input type="number" min="0" class="form-control" id="amount" v-model.trim="amount"
                            utocomplete="off">
                        <label for="amount">Nominal Pemasukan</label>
                    </div>
                    <div class="form-floating mb-3">
                        <textarea class="form-control" id="source" v-model.trim="source" rows="10"></textarea>
                        <label for="source">Sumber Pemasukan</label>
                    </div>
                </div>
            </div>
            <div class="modal-footer text-center">
                <button id="btn-close-modal" type="button" style="display: none;" data-bs-dismiss="modal"></button>
                <button type="button" class="btn btn-danger" data-bs-dismiss="modal" :disabled="loadingPost">
                    Batal
                </button>
                <button v-if="!loadingPost" type="submit" class="btn btn-primary" @click="save">Simpan</button>
                <button v-else type="button" class="disabled btn btn-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
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
                    Simpan
                </button>
            </div>
        </div>
    </form>
</template>

<script setup>
import { ref, watch, defineModel, defineEmits, defineProps } from 'vue';
import { useStore } from 'vuex'

import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';
import { insertIncome, updateIncome, showIncome } from '@/hooks/crud_incomes';

const store = useStore();
const emit = defineEmits(['submit']);
const props = defineProps(['id_income', 'typeExpenses']);

const income_date = defineModel('income_date');
const amount = defineModel('amount');
const source = defineModel('source');

const id_income = ref(0);
const statusMemuat = ref(false);
const loadingPost = ref(false);
const typeExpenses = ref(props.typeExpenses);

watch(() => props.id_income, (newValue) => {
    id_income.value = newValue;
    if (id_income.value == 0) {
        income_date.value = '';
        amount.value = '';
        source.value = '';
    } else {
        // LOAD DATA EDIT (EXISTING)
        loadExistingData(id_income.value);
    }
});

watch(() => props.typeExpenses, (newValue) => {
    typeExpenses.value = newValue;
});

/**
 * load existing expense from server
 */
async function loadExistingData(id) {
    statusMemuat.value = true;
    try {
        const result = await showIncome(store.getters.getToken, id);

        if (result.success !== true) {
            throw new Error(result.message);
        }

        income_date.value = result.data.income_date;
        amount.value = result.data.amount;
        source.value = result.data.source;

        const newData = {
            id: result.data.id,
            income_date: result.data.income_date,
            amount: result.data.amount,
            source: result.data.source,
            id_tipe_expense: result.data.id_tipe_expense,
            tipe_expense: result.data.tipe_expense,
        }
        store.dispatch('editIncome', {
            'id': id_income.value,
            'data': newData,
        });

        statusMemuat.value = false;
    } catch (error) {
        alert(error.message);
        statusMemuat.value = false;
    }
}


async function submitForm() {
    loadingPost.value = true;
    try {

        // Validasi From
        if ((income_date.value || '') === '' || (amount.value || '') === '' || (source.value || '') === '') {
            throw new Error('Mohon isi semua bidang isian');
        }

        // Initiate data
        const dataPost = {
            income_date: income_date.value,
            amount: amount.value,
            source: source.value,
        }

        // Action on submit
        if (id_income.value) {
            // Edit Expanse
            const result = await updateIncome(store.getters.getToken, id_income.value, dataPost);
            if (result.success !== true) {
                throw new Error('Edit data gagal.')
            }
            dataPost.id = id_income.value;
            store.dispatch('editIncome', {
                'id': id_income.value,
                'data': dataPost,
            });
        } else {
            // Add Expense to server
            const result = await insertIncome(
                store.getters.getToken,
                dataPost
            );
            if (result.success !== true) {
                throw new Error('Tambah data gagal');
            }
            dataPost.id = result.data.id;
            store.dispatch('addIncome', dataPost);
        }

        // Reset data when submit success
        income_date.value = '';
        amount.value = '';
        source.value = '';
        id_income.value = 0;

        // CLOSE modal
        loadingPost.value = false;
        document.getElementById('btn-close-modal').click();
        emit('submit', dataPost);

    } catch (error) {
        loadingPost.value = false;
        alert(error.message);
    }
}
</script>

<style scoped>
.box-loading {
    padding-top: 40px;
    padding-bottom: 40px;
}

.modal-footer {
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
}
</style>