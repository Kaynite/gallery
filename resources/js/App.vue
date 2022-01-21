<template>
    <div>
        <app-navigation></app-navigation>
        <app-header></app-header>
        <router-view></router-view>
    </div>
    <notifications position="bottom right" class="mb-2" />
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
