import { createRouter, createWebHistory } from "vue-router";
import store from "@/store";
import Home from "@/views/Home.vue";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import Upload from "@/views/Upload.vue";
import Image from "@/views/Image.vue";
import NotFound from "@/views/404.vue";
import Profile from "@/views/Profile.vue";

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
        meta: {
            requiresAuth: true,
            title: "Homepage",
        },
    },
    {
        path: "/login",
        name: "Login",
        component: Login,
        meta: {
            requiresGuest: true,
            title: "Login",
        },
    },
    {
        path: "/register",
        name: "Register",
        component: Register,
        meta: {
            requiresGuest: true,
            title: "Register",
        },
    },
    {
        path: "/upload",
        name: "Upload",
        component: Upload,
        meta: {
            requiresAuth: true,
            title: "Upload",
        },
    },
    {
        path: "/profile",
        name: "Profile",
        component: Profile,
        meta: {
            requiresAuth: true,
            title: "Profile",
        },
    },
    {
        path: "/image/:id",
        name: "Image",
        component: Image,
        meta: {
            requiresAuth: true,
            title: "Display Image",
        },
    },
    {
        path: "/404",
        name: "404",
        component: NotFound,
        meta: {
            title: "404",
        },
    },
    {
        path: "/:catchAll(.*)*",
        redirect: { name: "404" },
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

router.beforeEach(function (to, from, next) {
    if (to.meta.requiresAuth) {
        if (store.state.isAuthenticated) {
            return next();
        } else {
            return next({ name: "Login" });
        }
    }
    if (to.meta.requiresGuest) {
        if (store.state.isAuthenticated) {
            return next({ name: "Home" });
        } else {
            return next();
        }
    }
    return next();
});

export default router;
