<script setup lang="ts">
import type { MultipleChoiceQuestion } from '@/types/Choice';
import { onMounted, watch } from 'vue';

const props=defineProps<{
 questions:MultipleChoiceQuestion[],
 currentIndex:number;
 correctAnswer:string;
 userAnswer:string | null;
}>()

</script>


<template>
       <div class="answer-wrapper">
         <div class="container" :class="{
          'success': userAnswer === questions[currentIndex].correctAnswer && userAnswer === correctAnswer, // Green if correct
          'failed': userAnswer !== questions[currentIndex].correctAnswer && userAnswer !== correctAnswer,  // Red if incorrect
        }" >
         <p v-if="userAnswer === questions[currentIndex].correctAnswer">{{ questions[currentIndex].shoutMessageSuccess.split(',')[0] }}
        <br/>
        <span>{{ questions[currentIndex].shoutMessageSuccess.split(',')[1] }}</span>
         </p>
         <p v-if="userAnswer !== questions[currentIndex].correctAnswer">{{ questions[currentIndex].shoutMessageError.split(',')[0]}}
         <br/>
         <span>{{ questions[currentIndex].shoutMessageError.split(',')[1] }}</span>
         </p>
        </div>
       </div>
</template>

<style scoped>
  .answer-wrapper{
    margin-top: 1.2em;
  }

  .success{
    border-radius: .45em;
    padding: .90em;
    color: green;
    background-color: rgb(195, 233, 195);
    box-shadow: 1px 1px 1px rgb(236, 233, 233);
    transition: all .5s ease-in-out;
  }

  .failed{
    border-radius: .45em;
    padding: .90em;
    color: red;
    background-color:rgb(247, 203, 203);
    box-shadow: 1px 1px 1px rgb(236, 233, 233);
    transition: all .5s ease-in-out;
  }
</style>