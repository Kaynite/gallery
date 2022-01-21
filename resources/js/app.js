require("./bootstrap");

import { createApp } from "vue";
import VueClickAway from "vue3-click-away";
import Notifications from '@kyvg/vue3-notification'
import router from "@/router";
import store from "@/store";
import App from "@/App.vue";

store.dispatch("attemptLogin").then(() => {
    const app = createApp(App);

    app.use(router);
    app.use(store);
    app.use(VueClickAway)
    app.use(Notifications)
    app.mount("#app");
});
