import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import { createApp } from 'vue';
import App from './App.vue';

import { library } from "@fortawesome/fontawesome-svg-core";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";

library.add(faCircleUser );

createApp(App)
.component("font-awesome-icon", FontAwesomeIcon)
.mount("#app");
