<template>
    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-6 bg-white border-b border-gray-200">
                    <img :src="image.url" alt="" class="max-w-full mx-auto">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Image",
    data: () => ({
        image: null
    }),
    created() {
        const id = this.$route.params.id;
        axios.get(`/api/media/${id}`).then((res) => {
            this.image = res.data;
        }).catch(() => {
            this.$router.push("/404");
        })
    }
};
</script>
