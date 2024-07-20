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
            <div class="modal-footer" style="text-align: center;">
                <button id="btn-close-modal" type="button" class="btn btn-danger" data-bs-dismiss="modal">Batal</button>
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

const store = useStore();
const emit = defineEmits(['submit']);
const props = defineProps(['idExpense']);

const validForm = ref(true);
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


function loadExistingExpanse(id) {
    statusMemuat.value = true;
    const expense = store.getters.expenseById(id);
    date.value = expense.date;
    nominal.value = expense.nominal;
    deskripsi.value = expense.deskripsi;
    statusMemuat.value = false;

}


async function submitForm() {
    loadingPost.value = true;
    try {
        validForm.value = true;
        if (date.value === '' || nominal.value === '' || deskripsi.value === '') {
            validForm.value = false;
        }
        if (!validForm.value) {
            alert('Mohon isi semua bidang isian');
            return;
        }

        const data = {
            date: date.value,
            nominal: nominal.value,
            deskripsi: deskripsi.value
        }

        if (idExpense.value) {
            // Edit Expanse
            const url = `http://expense.ardynsulaeman.cloud/api/expense/${idExpense.value}`;
            const dataPost = {
                date: data.date,
                nominal: data.nominal,
                deskripsi: data.deskripsi,
            };
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${store.getters.getToken}`
                },
                body: JSON.stringify(dataPost)
            });
            if (!response.ok) {
                throw new Error("Edit data gagal.");
            }
            const result = await response.json();
            if (result.success !== true) {
                throw new Error('Edit data gagal.')
            }
            data.id = idExpense.value;
            store.dispatch('editExpense', {
                'id': idExpense.value,
                'data': data,
            });
        } else {
            // Add Expanse
            const url = 'http://expense.ardynsulaeman.cloud/api/expense';
            const dataPost = {
                date: data.date,
                nominal: data.nominal,
                deskripsi: data.deskripsi,
            };
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${store.getters.getToken}`
                },
                body: JSON.stringify(dataPost)
            });
            if (!response.ok) {
                throw new Error("Tambah data gagal.");
            }
            const result = await response.json();
            if (result.success === true) {
                data.id = result.data.id;
                store.dispatch('addExpense', data);
            }
        }

        date.value = '';
        nominal.value = '';
        deskripsi.value = '';
        idExpense.value = 0;

        // CLOSE modal
        loadingPost.value = false;
        document.getElementById('btn-close-modal').click();
        emit('submit', data);

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
</style>