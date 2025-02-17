interface BaseQuestion {
    id: number;
    question: string;
    shoutMessageSuccess:string;
    shoutMessageError:string;
    
  }

  export type Options={
     id:string;
     text:string
  }

  
  
  // Multiple Choice Type
  export interface MultipleChoiceQuestion extends BaseQuestion {
    type: "multiple-choice";
    options: Options[];
    goalScore:number;
    correctAnswer: string;
  }
  
  // Drag-and-Drop Type
  export interface DragDropPair {
    id: string;
    question: string;
    hasDropped:boolean;
    correct:boolean;
    displayAnswer:string;
    answer: string;
    droppedAnswer:[];
    draggable:boolean;
  }
  
  export interface DragDropQuestion extends BaseQuestion {
    type: "drag-and-drop";
    dragQuestion:string;
    pairs: DragDropPair[];
  }

  export type Quizz = {
    [key: string]: (MultipleChoiceQuestion | DragDropQuestion)[];
  } 
  
  // Full Quiz Data Type
 export interface QuizData {
    "multiple-choice": Quizz;
    "drag-and-drop": Quizz;
  }