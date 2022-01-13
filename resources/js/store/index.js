import { createStore } from "vuex";

export default createStore({
    state: {
        isAuthenticated: false,
        user: {},
    },
    mutations: {
        authenticate(state) {
            state.isAuthenticated = true;
        },
        logout(state) {
            state.isAuthenticated = false;
        },
        userData: (state, data) => {
            state.user = data;
        },
    },
    actions: {
        login({ commit }, payload) {
            return new Promise((resolve, reject) => {
                axios
                    .post("/login", payload)
                    .then(async (response) => {
                        await axios.get("/api/user").then((res) => {
                            commit("authenticate");
                            commit("userData", res.data);
                        });
                        resolve(response);
                    })
                    .catch((error) => {
                        reject(error.response);
                    });
            });
        },
        register({ commit }, payload) {
            return new Promise((resolve, reject) => {
                axios
                    .post("/register", payload)
                    .then(async (response) => {
                        await axios.get("/api/user").then((res) => {
                            commit("authenticate");
                            commit("userData", res.data);
                        });
                        resolve(response);
                    })
                    .catch((error) => {
                        reject(error.response);
                    });
            });
        },
        async logout({ commit }) {
            try {
                await axios.post("logout");
                commit("logout");
            } catch (error) {}
        },
        async attemptLogin({ commit }) {
            try {
                const res = await axios.get("/api/user");
                commit("authenticate");
                commit("userData", res.data);
            } catch (error) {}
        },
    },
});
