<template>
    <div id="left-section">
        <nav></nav>
    </div>
</template>

<script>
export default {
    data() {
        return {}
    },
    computed: {
        tree() {
            return this.$store.state.tree.tree
        }
    }
}
</script>

<style>
#left-section {
    min-width: 240px;
    width: 240px;
    height: 100vh;
    overflow-y: auto;
    background: #fafafa;
    padding: 20px;
}

#left-section > nav {
    width: 100%;
    height: 100%;
}
</style>