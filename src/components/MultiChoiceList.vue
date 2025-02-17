<script setup lang="ts">
import type { Options } from '@/types/Choice';

const props=defineProps<{
  option:Options[];
  correctAnswer:string;
  userAnswer:string | null
}>()

const emit=defineEmits(["selectedOption"]);

function handleSelectOption(option:string){
  emit("selectedOption",option)
  console.log(option)
}
</script>


<template>
<ul>
    <li v-for="item in props.option" :key="item.id">
     {{ console.log(correctAnswer) }}
      <button :class="{
          'button-success': userAnswer === item.id && userAnswer === correctAnswer, // Green if correct
          'button-failed': userAnswer === item.id && userAnswer !== correctAnswer  // Red if incorrect
        }"  class="item-button"  @click="handleSelectOption(item.id)">
        <span style="font-weight:bold; font-size: larger;">{{ item.id.toUpperCase() }}</span>
        <span>{{ item.text }}</span>
      </button>
    </li>
  </ul>
</template>


<style scoped>
  ul{
    
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    list-style: none;
    margin-top: .25em;

  }
  li{
    list-style: none;
    width: 100%;
    margin-top: .75em;
}

  li button{
    width: 100%;
    padding: 30px;
    cursor: pointer;
    border-radius: 1.2em;

    box-shadow:  1px 1px 2px rgb(235, 231, 231);
   }

  .item-button{
     display: flex;
     height: 100%;
     align-items: center;
     width: 100%;
     background-color: transparent;
     border: 1px solid gray;

  }

  .button-success{
    border:2px solid green;
    background-color: rgb(195, 233, 195);

  }

  .button-failed{
    border: 2px solid red;
    background-color: rgb(247, 203, 203);
  }

  .item-button span{
    margin-left: 5px;
    margin-right: 5px;
  }
</style>
