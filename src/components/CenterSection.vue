
<template>
    <section id="center-section">
        <editor-content class="editor__content" :editor="editor"/>
        <div style="display:none">{{this.innitialContent}}</div>
    </section>
</template>

<script>
// import Icon from 'Components/Icon'
import { Editor, EditorContent, EditorMenuBar } from 'tiptap'
import {
    Blockquote,
    CodeBlock,
    HardBreak,
    Heading,
    OrderedList,
    BulletList,
    ListItem,
    TodoItem,
    TodoList,
    Bold,
    Code,
    Italic,
    Link,
    History
} from 'tiptap-extensions'
let editor = (editor = new Editor({
    extensions: [
        new Blockquote(),
        new BulletList(),
        new CodeBlock(),
        new HardBreak(),
        new ListItem(),
        new OrderedList(),
        new TodoItem(),
        new TodoList(),
        new Bold(),
        new Code(),
        new Italic(),
        new Link(),
        new History(),
        new Heading({ levels: [1, 2, 3, 4] })
    ]
}))
export default {
    components: {
        EditorContent,
        EditorMenuBar
    },
    data() {
        return {
            keepInBounds: true,
            editor: editor,
            hasOpened: true
        }
    },
    methods: {
        setContent() {}
    },
    computed: {
        innitialContent() {
            return this.$store.getters['note/getById'](
                this.$store.state.note.opened
            ).content
        }
    },
    created() {
        let that = this
        this.editor.setContent(this.innitialContent)
        this.editor.on('update', function({ getHTML }) {
            that.$store.dispatch('note/update', {
                _id: that.$store.state.note.opened,
                content: this.getHTML()
            })
        })
    },
    beforeUpdate() {
        if (this.$store.state.note.opened !== this.hasOpened) {
            this.hasOpened = this.$store.state.note.opened
            this.editor.setContent(this.innitialContent)
        }
    },
    beforeDestroy() {
        this.editor.destroy()
    }
}
</script>
<style>
#center-section {
    width: calc(100% - 480px);
    min-width: 500px;
    height: 100vh;
    overflow-y: auto;
    background: #fafafa;
    padding: 60px;
}
#center-section h1 {
    font-size: 1.9em;
}
#center-section h2 {
    font-size: 1.5em;
}
#center-section h3 {
    font-size: 1.25em;
}
#center-section h4 {
    font-size: 1.1em;
}
#center-section :focus,
#center-section .ProseMirror-focused {
    outline: none !important;
}
#center-section :after,
#center-section :before {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}
#center-section html {
    font-family: -apple-system, BlinkMacSystemFont, San Francisco, Roboto,
        Segoe UI, Helvetica Neue, sans-serif;
    font-size: 18px;
    color: #000;
    line-height: 1.5;
}
#center-section body {
    margin: 0;
}
#center-section a {
    color: inherit;
}
#center-section blockquote,
#center-section h1,
#center-section h2,
#center-section h3,
#center-section ol,
#center-section p,
#center-section pre,
#center-section ul {
    margin: 1rem 0;
}
#center-section blockquote:first-child,
#center-section h1:first-child,
#center-section h2:first-child,
#center-section h3:first-child,
#center-section ol:first-child,
#center-section p:first-child,
#center-section pre:first-child,
#center-section ul:first-child {
    margin-top: 0;
}
#center-section blockquote:last-child,
#center-section h1:last-child,
#center-section h2:last-child,
#center-section h3:last-child,
#center-section ol:last-child,
#center-section p:last-child,
#center-section pre:last-child,
#center-section ul:last-child {
    margin-bottom: 0;
}
#center-section h1,
#center-section h2,
#center-section h3 {
    line-height: 1.3;
}
#center-section .button {
    font-weight: 700;
    display: -webkit-inline-box;
    display: -ms-inline-flexbox;
    display: inline-flex;
    background: transparent;
    border: 0;
    color: #000;
    padding: 0.2rem 0.5rem;
    margin-right: 0.2rem;
    border-radius: 3px;
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.1);
}
#center-section .button:hover {
    background-color: rgba(0, 0, 0, 0.15);
}
#center-section .message {
    background-color: rgba(0, 0, 0, 0.05);
    color: rgba(0, 0, 0, 0.7);
    padding: 1rem;
    border-radius: 6px;
    margin-bottom: 1.5rem;
    font-style: italic;
}
#center-section .editor {
    position: relative;
    max-width: 30rem;
    margin: 0 auto 5rem;
}
#center-section .editor__content {
    word-wrap: break-word;
    height: 100%;
}
#center-section .editor__content * {
    caret-color: currentColor;
}
#center-section .editor__content pre {
    padding: 0.7rem 1rem;
    border-radius: 5px;
    background: #000;
    color: #fff;
    font-size: 0.8rem;
    overflow-x: auto;
}
#center-section .editor__content pre code {
    display: block;
}
#center-section .editor__content p code {
    display: inline-block;
    padding: 0 0.4rem;
    border-radius: 5px;
    font-size: 0.8rem;
    font-weight: 700;
    background: rgba(0, 0, 0, 0.1);
    color: rgba(0, 0, 0, 0.8);
}
#center-section .editor__content ol,
#center-section .editor__content ul {
    padding-left: 1rem;
}
#center-section .editor__content li > ol,
#center-section .editor__content li > p,
#center-section .editor__content li > ul {
    margin: 0;
}
#center-section .editor__content a {
    color: inherit;
}
#center-section .editor__content blockquote {
    border-left: 3px solid rgba(0, 0, 0, 0.1);
    color: rgba(0, 0, 0, 0.8);
    padding-left: 0.8rem;
    font-style: italic;
}
#center-section .editor__content blockquote p {
    margin: 0;
}
#center-section .editor__content img {
    max-width: 100%;
    border-radius: 3px;
}
#center-section .editor__content table {
    border-collapse: collapse;
    table-layout: fixed;
    width: 100%;
    margin: 0;
    overflow: hidden;
}
#center-section .editor__content table td,
#center-section .editor__content table th {
    min-width: 1em;
    border: 2px solid #ddd;
    padding: 3px 5px;
    vertical-align: top;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    position: relative;
}
#center-section .editor__content table td > *,
#center-section .editor__content table th > * {
    margin-bottom: 0;
}
#center-section .editor__content table th {
    font-weight: 700;
    text-align: left;
}
#center-section .editor__content table .selectedCell:after {
    z-index: 2;
    position: absolute;
    content: '';
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: rgba(200, 200, 255, 0.4);
    pointer-events: none;
}
#center-section .editor__content table .column-resize-handle {
    position: absolute;
    right: -2px;
    top: 0;
    bottom: 0;
    width: 4px;
    z-index: 20;
    background-color: #adf;
    pointer-events: none;
}
#center-section .editor__content .tableWrapper {
    margin: 1em 0;
    overflow-x: auto;
}
#center-section .editor__content .resize-cursor {
    cursor: ew-resize;
    cursor: col-resize;
}
#center-section .menubar {
    margin-bottom: 1rem;
    -webkit-transition: visibility 0.2s 0.4s, opacity 0.2s 0.4s;
    transition: visibility 0.2s 0.4s, opacity 0.2s 0.4s;
}
#center-section .menubar.is-hidden {
    visibility: hidden;
    opacity: 0;
}
#center-section .menubar.is-focused {
    visibility: visible;
    opacity: 1;
    -webkit-transition: visibility 0.2s, opacity 0.2s;
    transition: visibility 0.2s, opacity 0.2s;
}
#center-section .menubar__button {
    font-weight: 700;
    display: -webkit-inline-box;
    display: -ms-inline-flexbox;
    display: inline-flex;
    background: transparent;
    border: 0;
    color: #000;
    padding: 0.2rem 0.5rem;
    margin-right: 0.2rem;
    border-radius: 3px;
    cursor: pointer;
}
#center-section .menubar__button:hover {
    background-color: rgba(0, 0, 0, 0.05);
}
#center-section .menubar__button.is-active {
    background-color: rgba(0, 0, 0, 0.1);
}
#center-section .menubar span.menubar__button {
    font-size: 13.3333px;
}
#center-section .menububble {
    position: absolute;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    z-index: 20;
    background: #000;
    border-radius: 5px;
    padding: 0.3rem;
    margin-bottom: 0.5rem;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);
    visibility: hidden;
    opacity: 0;
    -webkit-transition: opacity 0.2s, visibility 0.2s;
    transition: opacity 0.2s, visibility 0.2s;
}
#center-section .menububble.is-active {
    opacity: 1;
    visibility: visible;
}
#center-section .menububble__button {
    display: -webkit-inline-box;
    display: -ms-inline-flexbox;
    display: inline-flex;
    background: transparent;
    border: 0;
    color: #fff;
    padding: 0.2rem 0.5rem;
    margin-right: 0.2rem;
    border-radius: 3px;
    cursor: pointer;
}
#center-section .menububble__button:last-child {
    margin-right: 0;
}
#center-section .menububble__button:hover {
    background-color: hsla(0, 0%, 100%, 0.1);
}
#center-section .menububble__button.is-active {
    background-color: hsla(0, 0%, 100%, 0.2);
}
#center-section .menububble__form {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
}
#center-section .menububble__input {
    font: inherit;
    border: none;
    background: transparent;
    color: #fff;
}
</style>