<template>
    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-6 bg-white border-b border-gray-200">
                    <section
                        class="border border-dashed border-gray-300 h-48 flex justify-center items-center rounded-lg cursor-pointer"
                        :class="{
                            'bg-indigo-500 transition-colors text-white':
                                isDragging,
                        }"
                        @drag.prevent=""
                        @dragstart.prevent=""
                        @dragenter.prevent="isDragging = true"
                        @dragend.prevent="isDragging = false"
                        @dragleave.prevent="isDragging = false"
                        @dragover.prevent="isDragging = true"
                        @drop.prevent="upload($event)"
                    >
                        Drag and drop your files here
                    </section>
                    <section>
                        <div
                            v-for="(upload, index) in uploads"
                            :key="index"
                            class="py-2"
                        >
                            <p class="mb-1">{{ upload.filename }}</p>
                            <div
                                class="w-full bg-gray-200 rounded-full h-4 mb-2"
                            >
                                <div
                                    class="h-4 rounded-full"
                                    :class="upload.variant"
                                    :style="{
                                        width: `${upload.uploadProgress}%`,
                                    }"
                                ></div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Upload",
    data() {
        return {
            isDragging: false,
            uploads: [],
        };
    },
    methods: {
        upload(event) {
            this.isDragging = false;
            const files = [...event.dataTransfer.files];
            files.forEach((file) => {
                const cancelSource = axios.CancelToken.source();
                let index =
                    this.uploads.push({
                        filename: file.name,
                        uploadProgress: 0,
                        variant: "bg-indigo-600",
                        source: cancelSource,
                    }) - 1;

                let formData = new FormData();
                formData.append("file", file);
                axios
                    .post("/api/media", formData, {
                        cancelToken: cancelSource.token,
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                        onUploadProgress: function (progressEvent) {
                            this.uploads[index].uploadProgress = parseInt(
                                Math.round(
                                    (progressEvent.loaded /
                                        progressEvent.total) *
                                        100
                                )
                            );
                        }.bind(this),
                    })
                    .then((res) => {
                        this.uploads[index].variant = "bg-green-500";
                    })
                    .catch((error) => {
                        this.uploads[index].variant = "bg-red-500";
                    });
            });
        },
    },
    beforeRouteLeave(to, from, next) {
        for(const upload of this.uploads) {
            upload.source.cancel();
        }
        next();
    }
};
</script>
