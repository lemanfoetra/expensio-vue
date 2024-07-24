<template>
    <input type="date" :value="modelValue" class="date-filter" @input="updateValue($event.target.value)" />
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

defineProps({
    modelValue: String,
});

const emit = defineEmits(['update:modelValue']);

function updateValue(value) {
    emit('update:modelValue', value);
}
</script>


<style scoped>
.date-filter {
    border: 1px solid #0054a6;
    border-radius: 5px;
    padding: 3px;
    margin-right: 10px;
    margin-left: 10px;
    margin-top: 2px;
}
</style>