<template>
    <li class="item" :class="['category',collapseClass]">
        <div
            class="label"
            @click="toggleCollapse"
            @contextmenu.prevent.stop="$refs.category.open($event, category)"
        >
            <span :class="icon"></span>
            {{category.name}}
        </div>
        <ul class="list">
            <CategoryItem v-for="id of category.categories" :key="id" :id="id"/>
            <NoteItem v-for="id of category.notes" :key="id" :id="id"/>
        </ul>
        <VueContext ref="category">
            <template slot-scope="child" v-if="child.data">
                <li>
                    <a href="#" @click.prevent="renameCategory(child.data._id)">rename</a>
                </li>
                <li>
                    <a href="#" @click.prevent="createCategory(child.data._id)">add category</a>
                </li>
                <li>
                    <a href="#" @click.prevent="createNote(child.data._id)">add note</a>
                </li>
                <li>
                    <a href="#" @click.prevent="deleteCategory(child.data._id)">delete</a>
                </li>
            </template>
        </VueContext>
    </li>
</template>

<script>
import { mapState } from 'vuex'
import { VueContext } from 'vue-context'
import NoteItem from './NoteItem.vue'

export default {
    name: 'CategoryItem',
    components: { NoteItem, VueContext },

    props: {
        id: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            category: false,
            collapse: true
        }
    },
    created() {
        this.category = this.categories.filter(c => c._id === this.id)[0]
    },
    computed: {
        ...mapState('category', ['categories']),
        icon() {
            if (this.collapse) return 'icon-right-dir'
            return 'icon-down-dir'
        },
        collapseClass() {
            if (this.collapse) return 'collapse'
            else return ''
        }
    },
    methods: {
        createNote() {
            this.$store.dispatch('note/create', {
                name: 'Untitled Note',
                content: '...',
                parent: this.category._id
            })
        },
        toggleCollapse() {
            this.collapse = !this.collapse
        },
        createCategory(id) {
            this.$store.dispatch('category/create', {
                name: 'Untitled Category',
                parent: id
            })
        },
        renameCategory(id) {
            let newName = window.prompt('Enter the new name for this category')
            if (newName && newName.length) {
                this.$store.dispatch('category/update', {
                    _id: id,
                    name: newName
                })
            }
        },
        deleteCategory() {
            let rand = Math.round(Math.random() * 10)
            let sign = prompt(
                'delete category "' + this.category.name + '"? ' + rand
            )
            if (sign == 'yes please ' + rand) {
                this.$store.dispatch('category/delete', {
                    _id: this.category._id
                })
            } else {
                alert('wrong answer !')
            }
        }
    }
}
</script>

<style>
</style>