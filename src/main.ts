import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { faClose } from '@fortawesome/free-solid-svg-icons'
import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck'
import { faArrowAltCircleRight } from '@fortawesome/free-solid-svg-icons'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { faArrowsSpin } from '@fortawesome/free-solid-svg-icons'
import { faRefresh } from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add([faUserSecret,faClose,faCheck,faArrowAltCircleRight,faArrowRight,faArrowsSpin,faRefresh])

import App from './App.vue'


const app = createApp(App).component('font-awesome-icon', FontAwesomeIcon);

app.use(createPinia())

app.mount('#app')
