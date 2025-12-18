<template>
    <div class="col-md-12 list-expense">
        <div class="card">
            <div class="my-card-body">
                <div class="expense_box">
                    <div class="control-checkbox" v-if="statusOpenOption">
                        <div class="box-checkbox-centered">
                            <input type="checkbox" v-model="isChecked" class="form-check-input"
                                style="border: 1px solid #0054a6">
                        </div>
                    </div>
                    <div class="expense_item_column" @click="clickToDetail">
                        <div class="content">
                            <div class="tanggal">{{ source }}</div>
                            <div class="nominal">Rp {{ amount }}</div>
                            <div class="keterangan">{{ income_date }}</div>
                        </div>
                        <div class="expense_tipe">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, watch, defineProps, defineEmits, defineModel } from 'vue';


const props = defineProps(['showOption', 'id', 'source', 'income_date', 'amount']);
const emit = defineEmits(['clickDetail', 'onCheckboxClick']);

let statusOpenOption = ref(props.showOption);
const id_income = ref(props.id);
const income_date = ref(formatTanggal(props.income_date))
const amount = ref(formatCurrency(props.amount))
const isChecked = defineModel('isChecked');

watch(() => props.showOption, (newValue) => {
    statusOpenOption.value = newValue;
});

watch(() => isChecked.value, (newValue) => {
    emit('onCheckboxClick', {
        status: newValue,
        id: id_income.value,
    });
});


function clickToDetail() {
    emit('clickDetail', props.id);
}


function formatTanggal(tanggalString) {
    // Mengubah string menjadi objek Date
    const tanggal = new Date(tanggalString);

    // Menentukan hari dalam bahasa Indonesia
    const hari = tanggal.toLocaleDateString('id-ID', { weekday: 'long' });

    // Menentukan tanggal, bulan, dan tahun dalam bahasa Indonesia
    const tanggalFormatted = tanggal.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

    // Menggabungkan hari dan tanggal yang sudah diformat
    return `${hari}, ${tanggalFormatted}`;
}

function formatCurrency(nilai) {
    const formatter = new Intl.NumberFormat('id-ID');
    return formatter.format(nilai);
}
</script>

<style scoped>
.list-expense {
    margin-top: 8px !important;
}

.control-checkbox {
    margin-right: 20px;
    max-width: 50px !important;
    text-align: center !important;
}

.box-checkbox-centered {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60px;
}

.widht_100 {
    width: 101% !important;
}

.tanggal {
    font-size: 14px;
    font-weight: bold;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
}

.nominal {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
}

.keterangan {
    font-size: 14px;
    color: gray;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
}

.my-card-body {
    padding: 15px !important;
}

.width_100px {
    width: 50px !important;
}

.expense_box {
    display: flex;
}

.expense_item_column {
    display: flex;
    justify-content: space-between;
    width: 100%;
}

.expense_tipe {}
</style>