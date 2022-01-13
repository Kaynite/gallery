<template>
    <div>
        <app-navigation></app-navigation>
        <app-header></app-header>
        <router-view></router-view>
    </div>
</template>

<script>
import AppNavigation from "@/components/layout/Navigation.vue";
import AppHeader from "@/components/layout/Header.vue";
export default {
    name: "App",
    components: { AppNavigation, AppHeader },
    data: () => ({
        message: "Hello World",
    })
};
</script>
