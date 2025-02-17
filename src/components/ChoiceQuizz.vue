<script setup lang="ts">
import type { DragDropQuestion, MultipleChoiceQuestion, QuizData, Quizz } from '@/types/Choice';
import { onMounted, ref } from 'vue';
import MultiChoice from '../components/MultiChoice.vue';
import Loading from '../components/Loading.vue';
import Error from './Error.vue';
import DragAndDropChoice from './DragAndDropChoice.vue';


const props = defineProps<{
  type: string
}>();

const questions = ref<(MultipleChoiceQuestion | DragDropQuestion)[] | null>(null);
const selectedType = ref<string | null>(props.type);
const isLoading=ref<boolean>(false);
const isError=ref<Error | null>(null)
onMounted(()=>{
  const fetchSelectionType=async()=>{
    try{
     isLoading.value=true
     const res=await fetch('./data.json') ;
     const data=await res.json() as QuizData;
     console.log(data)
     selectedType.value=props.type
      
     questions.value=(data[props.type as keyof QuizData] as unknown as (MultipleChoiceQuestion | DragDropQuestion)[]) 
     isLoading.value=false
     console.log(questions.value)
    }catch(error){
      isError.value=error as Error
    }
  }
  fetchSelectionType()
})

console.log(questions.value,"questions") //asyncronous would render first 

</script>

/**
 this component is in charge of fetching questions by their type and passing the props to indiviual 
 components that need it 
*/

<template>
    <Loading v-if="isLoading === true"/>
    <Error v-if="isError"/>
    <MultiChoice v-if="selectedType === 'multiple-choice' && questions !== null" :questions="questions as MultipleChoiceQuestion[]"/>
    <DragAndDropChoice   v-if="selectedType === 'drag-and-drop' && questions !== null" :selected-type="selectedType" :questions="questions as DragDropQuestion[]" />
</template>
 
