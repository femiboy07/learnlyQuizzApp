<script setup lang="ts">
import { defineProps, defineEmits, ref } from 'vue';

const buttonRef = ref<HTMLButtonElement | null>(null);
defineExpose({ buttonRef });
// Props
const selectedType=defineProps<{
  selectedType: string | null;
}>();

console.log(selectedType.selectedType)

// Emit event
const emit = defineEmits<{
  (e: "update:type", type: string): void;
}>();
</script>

<template>
  <div class="wrap-button">
    <button ref="buttonRef" @click="emit('update:type', 'multiple-choice')">Multiple Choice</button>
    <button ref="buttonRef" @click="emit('update:type', 'drag-and-drop')">Drag & Drop</button>
  </div>
</template>

<style scoped>
.wrap-button {
  margin-top: 20px;
   
}
button {
  margin: 5px;
  padding: 10px;
  outline: none;
  border-radius: 5%;
  box-shadow:  0px 1px 5px grey;
  border: none;

  cursor: pointer;
}

button:hover{
    background-color: blue;
    color: white;
    transition: all .5s ease-in-out;
}
</style>