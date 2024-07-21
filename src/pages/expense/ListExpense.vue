<template>
    <div class="col-md-12 list-expense">
        <div class="card">
            <div class="my-card-body">
                <div class="row">
                    <div class="col control-checkbox" v-if="statusOpenOption">
                        <div class="box-checkbox-centered">
                            <input type="checkbox" v-model="isChecked" class="form-check-input">
                        </div>
                    </div>
                    <div class="col">
                        <div class="content" @click="clickToDetail">
                            <div class="tanggal">{{ vdate }}</div>
                            <div class="nominal">Rp {{ vnominal }} {{ statusOpenOption }}</div>
                            <div class="keterangan">{{ vketerangan }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, watch, defineProps, defineEmits, defineModel } from 'vue';


const props = defineProps(['showOption', 'id', 'tanggal', 'nominal', 'keterangan']);
const emit = defineEmits(['clickDetail', 'onCheckboxClick']);

let statusOpenOption = ref(props.showOption);
const idExpense = ref(props.id);
const vdate = ref(formatTanggal(props.tanggal))
const vnominal = ref(props.nominal)
const vketerangan = ref(props.keterangan)
const isChecked = defineModel('isChecked');

watch(() => props.showOption, (newValue) => {
    statusOpenOption.value = newValue;
});

watch(() => isChecked.value, (newValue) => {
    emit('onCheckboxClick', {
        status: newValue,
        id: idExpense.value,
    });
});


function clickToDetail() {
    emit('clickDetail', props.id);
}


function formatTanggal(tanggalString) {
    // Buat objek Date dari string input
    const tanggal = new Date(tanggalString);

    // Array nama hari
    const namaHari = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];

    // Dapatkan nama hari
    const hari = namaHari[tanggal.getDay()];

    // Dapatkan tanggal, bulan, dan tahun
    const dd = String(tanggal.getDate()).padStart(2, '0');
    const mm = String(tanggal.getMonth() + 1).padStart(2, '0'); // Januari adalah 0!
    const yyyy = tanggal.getFullYear();

    // Gabungkan dalam format yang diinginkan
    return `${hari}, ${dd}-${mm}-${yyyy}`;
}
</script>

<style scoped>
.list-expense {
    margin-top: 8px !important;
}

.control-checkbox {
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
</style>