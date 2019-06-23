<template>
    <div id="left-section">
        <TreeMenu/>
    </div>
</template>

<script>
import TreeMenu from './TreeMenu.vue'
export default {
    components: { TreeMenu }
}
</script>

<style>
#left-section {
    max-width: 240px;
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