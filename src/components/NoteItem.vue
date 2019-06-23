<template>
    <li class="item note">
        <div class="label" @click="open" @contextmenu.prevent.stop="$refs.note.open($event, note)">
            <span class="icon-circle"></span>
            {{note.name}}
        </div>
        <VueContext ref="note">
            <template slot-scope="child" v-if="child.data">
                <li>
                    <a href="#" @click.prevent="deleteNote(child.data._id)">delete</a>
                </li>
                <li>
                    <a href="#" @click.prevent="renameNote(child.data._id)">rename</a>
                </li>
            </template>
        </VueContext>
    </li>
</template>

<script>
import { mapState } from 'vuex'
import { VueContext } from 'vue-context'

export default {
    name: 'NoteItem',
    components: { VueContext },

    props: {
        id: {
            required: false
        }
    },
    data() {
        return {
            note: false
        }
    },
    created() {
        this.note = this.notes.filter(n => n._id === this.id)[0]
    },
    computed: {
        ...mapState('note', ['notes'])
    },
    methods: {
        open() {
            this.$store.dispatch('note/open', {
                _id: this.note._id
            })
        },
        renameNote(id) {
            let newName = window.prompt('Enter the new name for this note')
            if (newName && newName.length) {
                this.$store.dispatch('note/update', {
                    _id: id,
                    name: newName
                })
            }
        },
        deleteNote(id) {
            this.$store.dispatch('note/delete', {
                _id: id
            })
        }
    }
}
</script>

<style>
</style>