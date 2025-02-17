<script setup lang="ts">
import type { MultipleChoiceQuestion } from '@/types/Choice';
import Score from './Score.vue';
import { ref, watch } from 'vue';
import MultiChoiceList from './MultiChoiceList.vue';
import CheckAnswer from '../components/CheckAnswer.vue';

   const props=defineProps<{
      questions:MultipleChoiceQuestion[]
   }>();

   const score=ref<number>(0);

   const currentIndex=ref<number>(0);
   const correctAnswer=ref<string>(props.questions[currentIndex.value].correctAnswer);
   const updateScore=ref<number>(props.questions[currentIndex.value].goalScore)
    const selectedOption = ref<string | null>(null);

    const handleSelectedOption = (optionId: string) => {
    selectedOption.value = optionId;
};

watch(selectedOption,()=>{
   if(selectedOption.value === correctAnswer.value){
     score.value = score.value + parseInt(updateScore.value.toString())
   }
}, { immediate: true })

 const handleNext=()=>{

    currentIndex.value = (currentIndex.value+1) % props.questions.length;
    selectedOption.value=null;
    

 }

 watch(currentIndex, () => {
 
  correctAnswer.value = props.questions[currentIndex.value].correctAnswer;
});

</script>


<template>
    <div class="multichoice-container">
      <div   class="question-wrapper">
       <div class="score-wrapper" >
         <span>Goal:{{ props.questions[currentIndex].goalScore}}points</span>
         <span>
            <Score :score="score"/>
         </span>
       </div>
      
       <div class="container">
        <div>
          <div class="heading">   
         <h2 style="font-weight:900;">Question {{ props.questions[currentIndex].id }}</h2>
         <button class="next-btn" v-if="selectedOption === correctAnswer" @click="handleNext">Next Question</button>
         </div>

         <p >{{ props.questions[currentIndex].question }}</p>
         </div>

         <div class="question-list">
           <MultiChoiceList :option="props.questions[currentIndex].options" :userAnswer="selectedOption" :correctAnswer="correctAnswer" :currentIndex="currentIndex" @selected-option="handleSelectedOption"/>  
         </div>
       </div>
       </div>
       <CheckAnswer v-if="selectedOption !== null" :questions="questions"  :userAnswer="selectedOption" :currentIndex="currentIndex" :correctAnswer="correctAnswer" /> 
    </div>
</template> 


<style scoped>
.multichoice-container{
    width: 100%;
    height: 100%;
    padding-left: 5px;
    padding-right: 5px;
    margin: auto;
}

@media screen and (max-width:768px) {
    .multichoice-container{
        padding-left:8px;
        padding-right: 8px;
    }
}

.heading{
    width: 100%;
    display: flex;
    justify-content: space-between;
}

.question-wrapper{
    width: 100%;
    margin-top: 25px;
    color: black;
}

.score-wrapper{
    width: 100%;
    display: flex;
    justify-content: space-between;
    background-color: blue;
    align-items: center;
    padding: 1em;
    border-radius:.25em;
}

.container{
    width: 100%;
   margin: 0 auto;
    margin-top: .35em;
}

.container > p{
  font-size: 1.5em;
}

.question-list{
    width: 100%;
}

</style>