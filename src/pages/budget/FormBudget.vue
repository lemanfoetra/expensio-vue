<template>
    <form class="modal-content" @submit.prevent="submitForm">
        <div>
            <div class="modal-header">
                <h5 class="modal-title">Budget</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div v-if="statusMemuat" class="box-loading">
                    <Loading v-model:active="statusMemuat" :is-full-page="false" />
                </div>
                <div v-else>
                     <div class="form-floating mb-3">
                        <textarea class="form-control" id="tipe" v-model.trim="tipe" rows="10"></textarea>
                        <label for="tipe">Nama Tipe Budget</label>
                    </div>
                    <div class="form-floating mb-3">
                        <input type="number" min="0" class="form-control" id="budget" v-model.trim="budget"
                            utocomplete="off">
                        <label for="budget">Nominal Budget</label>
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
import { ref, watch, defineModel, defineEmits } from 'vue';
import { useStore } from 'vuex'

import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';
import { api_budget_insert, api_budget_show, api_budget_update } from '@/hooks/api_budget';

const store = useStore();
const emit = defineEmits(['submit']);

const budget = defineModel('budget');
const tipe = defineModel('tipe');

const id_tipe = ref(0);
const statusMemuat = ref(false);
const loadingPost = ref(false);

watch(() => store.getters.getBudgetIdState, (newValue) => {
    id_tipe.value = newValue;
    if (id_tipe.value == 0) {
        budget.value = '';
        tipe.value = '';
    } else {
        // LOAD DATA EDIT (EXISTING)
        loadExistingData(id_tipe.value);
    }
});

/**
 * load existing budget from server
 */
async function loadExistingData(id) {
    statusMemuat.value = true;
    try {
        const result = await api_budget_show(store.getters.getToken, id);
        console.log(result);

        if (result.success !== true) {
            throw new Error(result.message);
        }

        budget.value = result.data.budget;
        tipe.value = result.data.tipe;

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
        if ((budget.value || '') === '' || (tipe.value || '') === '') {
            throw new Error('Mohon isi semua bidang isian');
        }

        // Initiate data
        const dataPost = {
            budget: budget.value,
            tipe: tipe.value,
        }

        // Action on submit
        if (id_tipe.value) {
            // Edit Budget
            const result = await api_budget_update(store.getters.getToken, id_tipe.value, dataPost);
            if (result.success !== true) {
                throw new Error('Edit data gagal.')
            }
        } else {
            // Add Budget to server
            const result = await api_budget_insert(
                store.getters.getToken,
                dataPost
            );
            if (result.success !== true) {
                throw new Error('Tambah data gagal');
            }
        }

        // Reset data when submit success
        budget.value = '';
        tipe.value = '';

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