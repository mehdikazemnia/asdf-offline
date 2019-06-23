<template>
    <nav @contextmenu.prevent="$refs.category.open($event, root)">
        <ul id="base-list">
            <CategoryItem v-for="id of root.categories" :key="id" :id="id"/>
            <NoteItem v-for="id of root.notes" :key="id" :id="id"/>
        </ul>
        <VueContext ref="category">
            <template slot-scope="child" v-if="child.data">
                <li>
                    <a href="#" @click.prevent="createCategory(child.data._id)">add category</a>
                </li>
                <li>
                    <a href="#" @click.prevent="createNote(child.data._id)">add note</a>
                </li>
            </template>
        </VueContext>
    </nav>
</template>

<script>
import { VueContext } from 'vue-context'
import CategoryItem from './CategoryItem.vue'
import NoteItem from './NoteItem.vue'
import { mapState } from 'vuex'

export default {
    components: { CategoryItem, NoteItem, VueContext },
    computed: {
        ...mapState('category', ['categories']),
        ...mapState('note', ['notes']),
        root() {
            return this.categories.filter(c => c._id === 'c0')[0]
        }
    },
    methods: {
        createCategory() {
            this.$store.dispatch('category/create', {
                name: 'Untitled Category',
                parent: 'c0'
            })
        },
        createNote() {
            this.$store.dispatch('note/create', {
                name: 'Untitled Note',
                content: '...',
                parent: 'c0'
            })
        }
    },
    created() {
        console.log(this.$store.state.category.categories)
    }
}
</script>

<style>
nav {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
}
nav > #base-list {
    width: 100%;
    height: 90%;
}
.v-context {
    min-width: 8rem !important;
    padding: 2px 0px !important;
    background-color: #fafafa !important;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.1),
        0 3px 1px -2px rgba(0, 0, 0, 0.1), 0 1px 5px 0 rgba(0, 0, 0, 0.05) !important;
}
.v-context > li > a {
    padding: 4px !important;
    font-size: 0.85em;
    opacity: 0.9;
}
.v-context > li > a:hover {
    background-color: rgba(0, 0, 0, 0.05) !important;
}

.list,
.item {
    list-style: none;
}
.item {
    position: relative;
}
.item::after {
    position: absolute;
    content: '';
    top: 10px;
    left: -20px;
    border-left: 1px dashed #777;
    border-top: 1px dashed #777;
    border-radius: 5px 0 0 0;
    width: 3px;
    height: calc(100% - 20px);
    z-index: 29;
}
.item > .label {
    font-size: 14px;
    height: 22px;
    line-height: 22px;
    cursor: pointer;
    user-select: none;
    position: relative;
}
.item > .label::before {
    content: '';
    position: absolute;
    top: -10px;
    left: -20px;
    border-left: 1px dashed #777;
    border-bottom: 1px dashed #777;
    border-radius: 0 0 0 5px;
    width: 20px;
    height: 20px;
    z-index: 29;
}
.item > .label > span {
    display: inline-block;
    width: 12px;
    height: 20px;
    text-align: right;
    line-height: 20px;
    margin-left: -8px;
    z-index: 30;
    background-color: #fafafa;
    position: relative;
    vertical-align: top;
}
.item > .label > span:before {
    margin: 0;
    font-size: 14px;
    vertical-align: top;
    margin-left: 1px;
}
.item > .label > span.icon-circle:before {
    font-size: 8px;
    margin-top: 1px;
}
.item > .list {
    padding-left: 20px;
}
.item.collapse > .list {
    display: none;
}

#base-list > .item > .label::before,
#base-list > .item::after,
.item:last-child::after,
.item.collapse::after {
    display: none;
}
</style>