<template>
    <form class="modal-content" @submit.prevent="submitForm">
        <div>
            <div class="modal-header">
                <h5 class="modal-title">Pengeluaran</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div v-if="statusMemuat" class="box-loading">
                    <loading v-model:active="statusMemuat" :is-full-page="false" />
                </div>
                <div v-else>
                    <div class="form-floating mb-3">
                        <input type="date" class="form-control" id="date" v-model.trim="date" autocomplete="off">
                        <label for="date">Tanggal</label>
                    </div>
                    <div class="form-floating mb-3">
                        <input type="number" min="0" class="form-control" id="nominal" v-model.trim="nominal"
                            utocomplete="off">
                        <label for="nominal">Nominal Pengeluaran</label>
                    </div>
                    <div class="form-floating mb-3">
                        <textarea class="form-control" id="deskripsi" v-model.trim="deskripsi" rows="10"></textarea>
                        <label for="deskripsi">Deskripsi</label>
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
import { insertExpense, updateExpense, showExpense } from '../../hooks/crud_expense'

import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';

const store = useStore();
const emit = defineEmits(['submit']);
const props = defineProps(['idExpense']);

const date = defineModel('date');
const nominal = defineModel('nominal');
const deskripsi = defineModel('deskripsi');
const idExpense = ref(0);
const statusMemuat = ref(false);
const loadingPost = ref(false);

watch(() => props.idExpense, (newValue) => {
    idExpense.value = newValue;
    if (idExpense.value == 0) {
        date.value = '';
        nominal.value = '';
        deskripsi.value = '';
    } else {
        // LOAD DATA EDIT (EXISTING)
        loadExistingExpanse(idExpense.value);
    }
});

/**
 * load existing expense from server
 */
async function loadExistingExpanse(id) {
    statusMemuat.value = true;
    try {
        const result = await showExpense(store.getters.getToken, id);

        if (result.success !== true) {
            throw new Error(result.message);
        }

        date.value = result.data.date;
        nominal.value = result.data.nominal;
        deskripsi.value = result.data.deskripsi;

        const newData = {
            id: result.data.id,
            date: result.data.date,
            nominal: result.data.nominal,
            deskripsi: result.data.deskripsi,
        }
        store.dispatch('editExpense', {
            'id': idExpense.value,
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
        if ((date.value || '') === '' || (nominal.value || '') === '' || (deskripsi.value || '') === '') {
            throw new Error('Mohon isi semua bidang isian');
        }

        // Initiate data
        const dataPost = {
            date: date.value,
            nominal: nominal.value,
            deskripsi: deskripsi.value
        }

        // Action on submit
        if (idExpense.value) {
            // Edit Expanse
            const result = await updateExpense(store.getters.getToken, idExpense.value, dataPost);
            if (result.success !== true) {
                throw new Error('Edit data gagal.')
            }
            dataPost.id = idExpense.value;
            store.dispatch('editExpense', {
                'id': idExpense.value,
                'data': dataPost,
            });
        } else {
            // Add Expense to server
            const result = await insertExpense(
                store.getters.getToken,
                dataPost
            );
            if (result.success !== true) {
                throw new Error('Tambah data gagal');
            }
            dataPost.id = result.data.id;
            store.dispatch('addExpense', dataPost);
        }

        // Reset data when submit success
        date.value = '';
        nominal.value = '';
        deskripsi.value = '';
        idExpense.value = 0;

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