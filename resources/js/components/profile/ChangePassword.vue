<template>
    <div class="p-6 bg-white border-b border-gray-200">
        <form @submit.prevent="changePassword">
            <p class="block mb-6">Change Password</p>
            <div>
                <label
                    class="block font-medium text-sm text-gray-700"
                    for="name"
                >
                    Current Passoword
                </label>

                <input
                    type="password"
                    v-model="form.password"
                    class="rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 block mt-1 w-full"
                />
                <small class="text-red-600">
                    {{ errors.password }}
                </small>
            </div>
            <div class="mt-4">
                <label
                    class="block font-medium text-sm text-gray-700"
                    for="email"
                >
                    New Password
                </label>

                <input
                    type="password"
                    v-model="form.new_password"
                    class="rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 block mt-1 w-full"
                />
                <small class="text-red-600">
                    {{ errors.new_password }}
                </small>
            </div>
            <div class="mt-4">
                <label
                    class="block font-medium text-sm text-gray-700"
                    for="email"
                >
                    Confirm New Password
                </label>

                <input
                    type="password"
                    v-model="form.new_password_confirmation"
                    class="rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 block mt-1 w-full"
                />
            </div>
            <div class="flex items-center justify-center mt-4">
                <button
                    type="submit"
                    class="inline-flex items-center px-8 py-3 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:ring ring-gray-300 disabled:opacity-25 transition ease-in-out duration-150 ml-3"
                >
                    Change Password
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
            form: {
                password: "",
                new_password: "",
                new_password_confirmation: "",
            },
            errors: {},
        };
    },
    methods: {
        changePassword() {
            axios
                .post("/api/profile/password", this.form)
                .then((res) => {
                    this.errors = {};
                    this.$notify({
                        type: "success",
                        text: res.data.message,
                    });
                })
                .catch((error) => {
                    console.log(error.response.data.errors);

                    for (let [key, messages] of Object.entries(
                        error.response.data.errors
                    )) {
                        this.errors[key] = messages[0];
                    }
                });
        },
    },
};
</script>

<style></style>
