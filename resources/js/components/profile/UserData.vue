<template>
    <div class="p-6 bg-white border-b border-gray-200">
        <form @submit.prevent="updateUserData">
            <p class="block mb-6">User Settings</p>
            <div>
                <label
                    class="block font-medium text-sm text-gray-700"
                    for="name"
                >
                    Name
                </label>

                <input
                    type="text"
                    v-model="user.name"
                    class="rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 block mt-1 w-full"
                />
                <small class="text-red-600">
                    {{ errors.name }}
                </small>
            </div>
            <div class="mt-4">
                <label
                    class="block font-medium text-sm text-gray-700"
                    for="email"
                >
                    Email
                </label>

                <input
                    type="text"
                    v-model="user.email"
                    class="rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 block mt-1 w-full"
                />
                <small class="text-red-600">
                    {{ errors.email }}
                </small>
            </div>
            <div class="flex items-center justify-center mt-4">
                <button
                    type="submit"
                    class="inline-flex items-center px-8 py-3 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:ring ring-gray-300 disabled:opacity-25 transition ease-in-out duration-150 ml-3"
                >
                    Save
                </button>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    name: "UserData",
    data() {
        return {
            user: {},
            errors: {},
        };
    },
    methods: {
        updateUserData() {
            axios
                .post("/api/profile", this.user)
                .then((res) => {
                    this.errors = {};
                    this.$store.commit("userData", { ...this.user });
                    this.$notify({
                        type: "success",
                        text: res.data.message,
                    });
                })
                .catch((error) => {
                    for (let [key, value] of Object.entries(
                        error.response.data.errors
                    )) {
                        this.errors[key] = value[0];
                    }
                });
        },
    },
    created() {
        this.user = { ...this.$store.getters.user };
    },
};
</script>

<style></style>
