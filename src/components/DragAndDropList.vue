<script setup lang="ts">
import type { DragDropQuestion } from '@/types/Choice';
import { computed, onMounted, ref, watch } from 'vue';
import draggable from 'vuedraggable';

  const props=defineProps<{
     answers:{id:number,answer:string,hasDropped:boolean,draggable:boolean}[];
     draggedQuestion:string;
     dragCurrentIndex:number;
  }>();

  const isDragStart=ref<boolean>(false);
  const dragId=ref<string | null>(null);

//   const newAnswer=ref(props.answers);

//   watch(newAnswer, (newVal) => {
//   newVal.forEach((item) => {
//     if (item.hasDropped) {
//       item.draggable = false; // Disable dragging
//     }
//   });

// });
const getGroup = (items:{id:number,answer:string,hasDropped:boolean,draggable:boolean} []) => {
  return {
    name: 'dropZone',
    pull: items.some(item => item.draggable) ? 'clone' : false, // Allow cloning only if at least one item is not dropped
    put: false,
  };
};
</script>


<template>
     <span>{{ draggedQuestion }}</span>
       <div class="drag-grid-wrapper">
         <div>
         <draggable v-model="props.answers"   :sort="false"   :item-key="`id`" :group="getGroup(props.answers)"  @start="isDragStart = true"  @end="isDragStart = false" ghost-class="dragging" drag-class="moving" class="drag-container"  >
          <template #item="{element}" >
            <div class="item" :key="element.id" :draggable="!element.hasDropped"    :class="{
                'item-light':!element.hasDropped,
                'item-blur':element.hasDropped
                }" :style="element.hasDropped ? 'pointer-events: none; opacity: 0.5; cursor: default;' : 'opacity:1;'">{{element.answer}}</div>
          </template>
          </draggable>
          </div>
      </div>
</template>


<style scoped>

.drag-wrapper > span {
    text-align: center;
    width: 100%;
    display: flex;
    justify-content: center;
}
.drag-grid-wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 1em;
  justify-content: center;
  align-items: center;
}

.drag-container {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 1em;
  justify-content: center;
}

.item{
    padding: 1.5em;
  text-align: center;
  color: white;
  background-color: rgb(58, 55, 55);
  border-radius: 8px;
  cursor: grab;
  transition: background-color 0.2s ease;
  box-shadow: 1px 2px 5px #ffffff;
}

.item-light {
    color: white;
    background-color: rgb(58, 55, 55); 
    transition: background-color 0.2s ease;
    box-shadow: 1px 2px 5px #ffeeee;
}

.item-blur{

  color: grey;
  background-color: rgb(255, 254, 254);
  transition: background-color 0.2s ease;
  box-shadow:1px 2px 5px #b9b7b7 ;
}

.item-drag:active {
  cursor: grabbing;
}

@media screen and (max-width: 768px) {
  .item {
    flex: 1 1 calc(50% - 0.5em);
    max-width: calc(50% - 0.5em);
  }
}
.dragging {
  opacity: 0.5;
  background-color: rgba(58, 55, 55, 0.7);
}

.moving {
  background-color: rgba(243, 238, 238, 0.8);
  border: 2px dashed #fff;
}

</style>
