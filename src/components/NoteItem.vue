<template>
    <li class="item note">
        <div class="label" @contextmenu.prevent.stop="$refs.note.open($event, note)">
            <span class="icon-circle"></span>
            {{note.name}}
        </div>
        <VueContext ref="note">
            <template slot-scope="child" v-if="child.data">
                <li>
                    <a href="#" @click.prevent="deleteNote(child.data)">delete</a>
                </li>
                <li>
                    <a href="#" @click.prevent="renameNote(child.data)">rename</a>
                </li>
            </template>
        </VueContext>
    </li>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'CategoryItem',
    props: {
        id: {
            type: String,
            required: true
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
    }
}
</script>

<style>
</style>