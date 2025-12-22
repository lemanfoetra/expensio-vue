<template>
    <div class="col-md-12 list-expense">
        <div class="card">
            <div class="my-card-body">
                <div class="expense_box">
                    <div class="control-checkbox" v-if="statusOpenOption">
                        <div>
                            <input type="checkbox" v-model="isChecked" class="form-check-input"
                                style="border: 1px solid #0054a6">
                        </div>
                    </div>
                    <div class="expense_item_column" @click="onClickList">
                        <div class="content">
                            <div class="keterangan">{{ tipe }}</div>
                            <div class="nominal mt-2">
                                <div class="list">
                                    <div class="list-title">Budget</div>
                                    <div class="list-value">Rp{{ formatCurrency(budget) }}</div>
                                </div>
                                <div class="list">
                                    <div class="list-title">Terpakai</div>
                                    <div class="list-value">Rp{{ formatCurrency(total_expense) }}</div>
                                </div>
                                <div class="list">
                                    <div class="list-title black"><b>Sisa</b></div>
                                    <div class="list-value black">
                                        <b>Rp{{ formatCurrency(props.sisa) }}</b>
                                    </div>
                                </div>
                            </div>
                            <div class="mt-2">
                                <div v-if="progress < 100" class="progress" style=" height: 18px;">
                                    <div class="progress-bar" role="progressbar" :style="`width: ${progress}%`" aria-valuenow="25"
                                        aria-valuemin="0" aria-valuemax="100">{{ progress }} %</div>
                                </div>
                                <div v-else class="progress" style=" height: 18px;">
                                    <div class="progress-bar bg-danger" role="progressbar" :style="`width: ${progress}%`" aria-valuenow="25"
                                        aria-valuemin="0" aria-valuemax="100">{{ progress }} %</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, watch, defineProps, defineEmits, defineModel, computed } from 'vue';


const props = defineProps(['showOption', 'id_tipe', 'tipe', 'budget', 'sisa', 'total_expense']);
const emit = defineEmits(['onClickList', 'onCheckboxClick']);

let statusOpenOption = ref(props.showOption);
const id_tipe = ref(props.id_tipe);
const isChecked = defineModel('isChecked');

watch(() => props.showOption, (newValue) => {
    statusOpenOption.value = newValue;
});

watch(() => isChecked.value, (newValue) => {
    emit('onCheckboxClick', {
        status: newValue,
        id: id_tipe.value,
    });
});

const progress = computed(() => {
    if (props.budget > 0) {
        const result = (props.total_expense * 100) / props.budget;
        return Math.round(result);
    }
    return 0;
})

function onClickList() {
    emit('onClickList', props.id_tipe);
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
    text-align: center !important;

    display: flex;
    justify-content: center;
    align-items: center;
}

.widht_100 {
    width: 101% !important;
}

.content {
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

.keterangan {
    font-weight: 600;
    font-size: 16px;
}

.list {
    display: flex;
    justify-content: space-between;
    width: 100%;
}

.list-title {
    color: gray;
}

.list-value {
    color: gray;
}

.black {
    color: #000 !important;
}
</style>