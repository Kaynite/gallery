<template>
    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg mb-4">
                <user-data />
            </div>
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <change-password />
            </div>
        </div>
    </div>
</template>

<script>
import UserData from "@/components/profile/UserData.vue";
import ChangePassword from "@/components/profile/ChangePassword.vue";

export default {
    name: "Profile",
    components: {
        UserData,
        ChangePassword,
    },
};
</script>

<style>
.notification-content {
    font-size: 14px;
}
</style>
