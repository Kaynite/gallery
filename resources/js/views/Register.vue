<template>
    <div class="font-sans text-gray-900 antialiased">
        <div
            class="flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100"
        >
            <div
                class="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg"
            >
                <form @submit.prevent="register">
                    <div>
                        <label
                            class="block font-medium text-sm text-gray-700"
                            for="email"
                        >
                            Name
                        </label>

                        <input
                            @input="clearErrors"
                            v-model="form.name"
                            type="text"
                            class="rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 block mt-1 w-full"
                        />
                        <small class="text-red-600">{{ errors.name }}</small>
                    </div>

                    <div class="mt-4">
                        <label
                            class="block font-medium text-sm text-gray-700"
                            for="email"
                        >
                            Email
                        </label>

                        <input
                            @input="clearErrors"
                            v-model="form.email"
                            type="email"
                            class="rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 block mt-1 w-full"
                        />
                        <small class="text-red-600">{{ errors.email }}</small>
                    </div>

                    <!-- Password -->
                    <div class="mt-4">
                        <label
                            class="block font-medium text-sm text-gray-700"
                            for="password"
                        >
                            Password
                        </label>

                        <input
                            v-model="form.password"
                            type="password"
                            class="rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 block mt-1 w-full"
                        />
                        <small class="text-red-600">{{
                            errors.password
                        }}</small>
                    </div>

                    <div class="mt-4">
                        <label
                            class="block font-medium text-sm text-gray-700"
                            for="password"
                        >
                            Confirm Password
                        </label>

                        <input
                            v-model="form.password_confirmation"
                            type="password"
                            class="rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 block mt-1 w-full"
                        />
                        <small class="text-red-600">{{
                            errors.password_confirmation
                        }}</small>
                    </div>

                    <div class="flex items-center justify-end mt-4">
                        <button
                            type="submit"
                            class="inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:ring ring-gray-300 disabled:opacity-25 transition ease-in-out duration-150 ml-3"
                        >
                            Register
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Register",
    data() {
        return {
            form: {
                name: "",
                email: "",
                password: "",
                password_confirmation: "",
            },
            errors: {},
        };
    },
    methods: {
        register() {
            this.$store
                .dispatch("register", this.form)
                .then(() => {
                    this.$router.push({ name: "Home" });
                })
                .catch((error) => {
                    for (let [key, value] of Object.entries(
                        error.data.errors
                    )) {
                        this.errors[key] = value[0];
                    }
                });
        },
        clearErrors() {
            if (!_.isEmpty(this.errors)) {
                this.errors = {};
            }
        },
    },
};
</script>
