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
                            <div class="nominal">
                                <div>Budget Rp{{ budget }}</div>
                                <div>Rp{{ formatCurrency(props.sisa) }} sisa</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, watch, defineProps, defineEmits, defineModel } from 'vue';


const props = defineProps(['showOption', 'id_tipe', 'tipe', 'budget', 'sisa', 'total_expense']);
const emit = defineEmits(['onClickList', 'onCheckboxClick']);

let statusOpenOption = ref(props.showOption);
const id_tipe = ref(props.id_tipe);
const budget = ref(formatCurrency(props.budget))
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

.content{
    width: 100%;
}

.nominal {
    display: flex;
    justify-content: space-between;
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
</style>