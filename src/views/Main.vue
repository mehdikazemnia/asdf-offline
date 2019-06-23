<template>
    <main>
        <LeftSection/>
    </main>
</template>

<script>
import LeftSection from '@/components/LeftSection.vue'
export default {
    components: {
        LeftSection
    },
    created() {
        // this.$store.state.category.categories = []
        // this.$store.state.note.notes = []
        // make the root if not already there
        // this code will run only the first time
        if (
            !this.$store.state.category.categories.filter(c => c._id == 'c0')
                .length
        ) {
            this.$store.commit('category/CREATE_ROOT')
        }
    }
}
</script>


<style>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
</style>

