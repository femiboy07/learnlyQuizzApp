<script setup lang="ts">
import type { DragDropPair, DragDropQuestion } from '@/types/Choice';
import DragAndDropList from '../components/DragAndDropList.vue';
import { computed, nextTick, ref, watch } from 'vue';
import draggable from 'vuedraggable';

   const props=defineProps<{
     selectedType:string;
     questions:DragDropQuestion[];

   }>()
   const activeDropIndex=ref<number | null>(null)
   const dragCurrentIndex=ref<number>(0);
  
    const currentQuestion = computed(() => props.questions[dragCurrentIndex.value]); ;
    const localQuestions = ref([...props.questions]); 
    const answers = ref(
  localQuestions.value[dragCurrentIndex.value].pairs.map((pair) => ({
    id: Number(pair.id),
    answer: pair.answer,
    hasDropped:pair.hasDropped,
    draggable:pair.draggable

  }))

);

watch(currentQuestion, (newQuestion) => {
  answers.value = newQuestion.pairs.map((pair) => ({
    id: Number(pair.id),
    answer: pair.answer,
    hasDropped: pair.hasDropped,
    draggable:pair.draggable
  }));
}, { immediate: true });

const handleDragEnter=(index:number)=>{
    activeDropIndex.value=index;
}

const handleDragLeave=(index:number)=>{
    if (activeDropIndex.value === index) {
    activeDropIndex.value = null;
  }
}

interface DragEvent {
    added?: {
        element: {
            id: number;
            answer: string;
            hasDropped:boolean;
        };
        newIndex: number;
    };
}

const reloadQuestion = async () => {
    const questionIndex = dragCurrentIndex.value;
    if (questionIndex < localQuestions.value.length) {
        localQuestions.value[questionIndex].pairs = localQuestions.value[questionIndex].pairs.map((pair) => ({
            ...pair,
            hasDropped: false,
            droppedAnswer:[]
        }));
    }

    answers.value = [];

    await nextTick(); // Ensure Vue updates the DOM before setting new answers

    answers.value = localQuestions.value[questionIndex].pairs.map((pair) => ({
        id: Number(pair.id),
        answer: pair.answer,
        hasDropped: pair.hasDropped,
        draggable: true,
        correct:false,
        displayAnswer:"",
        droppedAnswer: []
    }));
};
const nextQuestion = () => {
    if (dragCurrentIndex.value < props.questions.length - 1) {
        dragCurrentIndex.value += 1;
    } else {
        alert("No more questions!");
    }
};

const getPairStyle = (pair:any) => {
    console.log(pair)
  if (pair.hasDropped) {
    console.log(pair)
    return pair.correct ? "correct" : "incorrect";
  }
  return "default-pair";
};

const handleCheckDrop = (index:number,event: DragEvent) => {
    try{
    const { added } = event;
    if (!added) return;

    // Find dropped answer
    const droppedAnswer = added.element;
    const targetQuestion=currentQuestion.value.pairs[index]
     targetQuestion.hasDropped=true;
     droppedAnswer.hasDropped =true;
    
     
    if (targetQuestion) {
       
        if (targetQuestion.answer === droppedAnswer.answer) {
            console.log("✅ Correct Match:", droppedAnswer.answer);
            targetQuestion.correct=true
            targetQuestion.displayAnswer = droppedAnswer.answer; 
            //set variable to style
        } else {    
            console.log("❌ Incorrect Match:", droppedAnswer.answer);
            targetQuestion.correct=false
            //set variable to style
            // Move answer back to the answer list
            targetQuestion.displayAnswer = targetQuestion.answer; 
            // answers.value.concat(droppedAnswer);
             // Reset drop zone
            //  droppedAnswer.answer=save;
        }
    }
}catch(error){
    console.log(error)
}
    
};
</script>


<template>
    <div class="drag-drop-wrapper" >
     
    <div class="drop-wrapper">
        <h3 style="text-align: center; margin-bottom: 25px;">{{ props.questions[dragCurrentIndex].question }}</h3>
        <div class="drop-grid-wrapper">
        <div 
        v-for="(element, index) in currentQuestion.pairs" 
        :key="element.id" 
        class="question-item"
        @dragenter="handleDragEnter(index)"
        @dragleave="handleDragLeave(index)"
        @touchmove="handleDragEnter(index)"
        @touchcancel="handleDragLeave(index)"
        :class="[getPairStyle(element)]"
        >
         <!-- Each question has its own droppable draggable -->
         <div class="drop-zone" :class="{ 'filled': element.droppedAnswer.length }">  
            <span v-if="!element.droppedAnswer.length">{{ element.question }}</span>
          <draggable :key="element.id" v-model="element.droppedAnswer" 
            :sort="false" 
            item-key="`id`"
            :draggable="false" 
            :group="{ name: 'dropZone', pull: false, put: element.droppedAnswer.length ? false : true }"
            @change="handleCheckDrop(index, $event)"
            class="drop-area"
            
        
            >
           
            <template #item="{ element: droppedAnswer,index }">
            <div class="dropped-answer" :class="{ 'item-light': element.hasDropped, 'item-blur': !element.hasDropped }" >
                {{element.displayAnswer ||  droppedAnswer.answer }}
                <font-awesome-icon icon="fa-solid fa-close" v-if="element.hasDropped && element.answer !== droppedAnswer.answer "/>
                <font-awesome-icon icon="fa-solid fa-check" v-if="element.hasDropped && element.answer === droppedAnswer.answer "/>
              </div>
            </template>
          
          </draggable>  
          </div>

        </div>
      </div>
    </div> 

    <div class="drag-wrapper">
       <DragAndDropList :drag-current-index="dragCurrentIndex" :draggedQuestion="currentQuestion.dragQuestion"  :answers="answers"/> 
    </div>

       <div class="btn-wrapper">
        <button class="reload-button"  @click="reloadQuestion" style="margin-right: .95em; cursor: pointer;">
            <font-awesome-icon icon="fa-solid fa fa-refresh" size="xl" /> 
        </button>
        <button class="next-btn" @click="nextQuestion" v-if="currentQuestion.pairs.every((item)=>item.hasDropped)">
            Continue
            <font-awesome-icon icon="fa-solid fa-arrow-right" />
        </button>

       
       </div>

    </div>
</template>

<style>
.drag-drop-wrapper{
    max-width: 100%;
    min-height: 100%;
    display: flex;
    flex-direction: column;
    justify-items: center;
    align-items: center;
    padding:20px;
    margin: 0 auto;
    scroll-snap-type: mandatory;

}

@media screen and (max-width:768px) {
    .drag-drop-wrapper{
        padding-left:8px;
        padding-right: 8px;
    }
}

.drop-wrapper{
    margin-top: 5em;
    width: 100%;
    
}


.drop-grid-wrapper{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  gap: 10px;
}



.question-item{
   
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 1 1 calc(33.3% - 0.5em);
  max-width: calc(33.3% - 0.5em);
  background: #f8f8f8;
  padding: 12px;
  border-radius: 10px;
  min-height: 60px;
  border: 2px dashed #ddd;
}

.drop-zone {
  flex: 0 0 100%;
  
  /* min-height: 50px; */
  /* min-width: 50px; */
  text-align: center;
  padding: 8px;
  border-radius: 10px;
  transition: all 0.3s ease-in-out;
  
}


.drop-area {
  min-width: 100%;
  min-height: 100%;
  
}
.dropped-answer {
   flex: 1 1 100%;
  width: 100%;
  background:transparent;
  color: white;
  border-radius: 8px;
  text-align: center;
  font-weight: bold;
  
}

.correct {
  background: #4caf50 !important;
  color: white !important;
}
.default-pair {
  background: #f8f8f8;
  border: 2px dashed #ddd;
}

.incorrect {
  background: #e57373 !important;
  color: white !important;
}

.next-btn{
    outline: none;
    border: none;
    color: white;
    padding-left: 6em;
    padding-right: 6em;
    min-height: 4.2em;
    border-radius: .45em;
    background-color: rgb(33, 33, 240);
    cursor: pointer;

}

.reload-button{
    outline: none;
    border: none;
    color: black;
    /* padding-left: 6em;
    padding-right: 6em; */
    padding: 1.5em;
    min-height: 4.2em;
    border-radius: 50%; 
    box-shadow: 1px 2px 4px rgb(240, 238, 237);
    margin-left: .25em;
}

.btn-wrapper{
   width: 100%;
   display: flex;
   justify-content: center;
   margin-left: .25em; 

}

@media screen and (max-width:768px) {
 
.question-item{
   
    
   flex: 1 1 calc(50% - 0.5em); /* 2 items per row */
   max-width: calc(50% - 0.5em);

padding: 3em;
text-align: center;
background-color:rgb(241, 238, 238) ;
}
}

.drag-wrapper{
    margin-top: 2.5em;
    
    /* min-height: 15em;
     position: fixed;  */
    border-top-left-radius: 5em;
    border-top-right-radius: 5em;

    /* bottom: 0;
    left: 0;
    right:0;  */
    
    /* background-color: beige; */
    padding: 25px;
    

}

 




</style>