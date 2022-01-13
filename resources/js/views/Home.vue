<template>
    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div
                    class="p-6 bg-white border-b border-gray-200"
                    v-if="media.length > 0"
                >
                    <section class="grid grid-cols-4 gap-3">
                        <router-link
                            :to="{ name: 'Image', params: { id: image.id } }"
                            v-for="image in media"
                            :key="image.id"
                            class="border rounded overflow-hidden h-48 relative"
                        >
                            <button
                                class="absolute top-0 right-0 bg-red-500 text-white z-50 px-5"
                                @click.prevent="attemptDelete(image.id)"
                            >
                                x
                            </button>
                            <img
                                :src="image.url"
                                alt=""
                                class="object-cover h-full w-full"
                            />
                        </router-link>
                    </section>
                    <pagination
                        class="border-0"
                        :current="currentPage"
                        :total="total"
                        :per-page="perPage"
                        @page-changed="list"
                    />
                </div>
                <div
                    class="p-6 bg-white border-b border-gray-200 text-center"
                    v-else
                >
                    You have no images in your account.
                    <router-link :to="{ name: 'Upload' }" class="text-blue-500"
                        >Start Uploading now.</router-link
                    >
                </div>
            </div>
        </div>
    </div>
    <Modal
        :showing="showModal"
        @close="showModal = false"
        :showClose="true"
        :backgroundClose="true"
        title="Delete Image"
    >
        <p class="mt-5">Are you sure you want to delete this image?</p>
        <div class="mt-5 flex justify-end gap-3">
            <button
                class="px-6 py-3 bg-gray-500 rounded text-white"
                @click="showModal = false"
            >
                Cancel
            </button>
            <button
                class="px-6 py-3 bg-red-500 rounded text-white"
                @click="deleteImage"
            >
                Delete
            </button>
        </div>
    </Modal>
</template>

<script>
import AppNavigation from "@/components/layout/Navigation.vue";
import AppHeader from "@/components/layout/Header.vue";
import Pagination from "@/components/Pagination.vue";
import Modal from "@/components/ui/Modal.vue";

export default {
    name: "App",
    components: { AppNavigation, AppHeader, Pagination, Modal },
    data: () => ({
        media: [],
        currentPage: 1,
        total: 0,
        perPage: 0,
        showModal: false,
        toDelete: null,
    }),
    methods: {
        async list(page) {
            this.currentPage = page;
            await axios
                .get(`/api/media/?page=${page}`)
                .then((res) => {
                    this.perPage = res.data.per_page;
                    this.total = res.data.total;
                    this.media = res.data.data;
                })
                .catch((error) => {});
        },
        attemptDelete(id) {
            this.showModal = true;
            this.toDelete = id;
        },
        deleteImage() {
            axios.delete(`/api/media/${this.toDelete}`).then(() => {
                this.showModal = false;
                this.list();
            });
        },
    },
    created() {
        this.list();
    },
};
</script>
