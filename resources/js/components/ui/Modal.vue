<template>
    <Transition name="fade">
        <div
            v-if="showing"
            class="fixed inset-0 w-full h-screen flex items-center justify-center bg-smoke-800 z-50"
            @click.self="closeIfShown"
            :class="customCSS.background"
        >
            <div
                class="relative max-h-screen w-full max-w-2xl bg-white shadow-lg rounded-lg p-8 flex flex-col"
                :class="customCSS.modal"
            >
                <div class="flex w-full justify-between items-center mb-5">
                    <h4 class="text-xl font-bold">{{ title }}</h4>
                    <button
                        v-if="showClose"
                        aria-label="close"
                        class="text-xl text-gray-500"
                        :class="customCSS.close"
                        @click.prevent="close"
                    >
                        ×
                    </button>
                </div>

                <div class="overflow-auto max-h-screen w-full">
                    <slot />
                </div>
            </div>
        </div>
    </Transition>
</template>

<script>
export default {
    props: {
        showing: {
            required: true,
            type: Boolean,
        },
        showClose: {
            type: Boolean,
            default: true,
        },
        backgroundClose: {
            type: Boolean,
            default: true,
        },
        css: {
            type: Object,
            required: false,
        },
        title: {
            type: String,
            required: false
        }
    },
    computed: {
        customCSS() {
            return {
                ...{
                    background: "",
                    modal: "",
                    close: "",
                },
                ...this.css,
            };
        },
    },
    watch: {
        showing(value) {
            if (value) {
                return document
                    .querySelector("body")
                    .classList.add("overflow-hidden");
            }
            return document
                .querySelector("body")
                .classList.remove("overflow-hidden");
        },
    },
    methods: {
        close() {
            document.querySelector("body").classList.remove("overflow-hidden");
            this.$emit("close");
        },
        closeIfShown() {
            if (this.showClose && this.backgroundClose) {
                this.close();
            }
        },
    },
    mounted: function () {
        if (this.showClose) {
            document.addEventListener("keydown", (e) => {
                if (e.key === "Escape") {
                    this.close();
                }
            });
        }
    },
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
    transition: all 0.6s;
}
.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>
