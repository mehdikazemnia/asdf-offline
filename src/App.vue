<template>
    <div id="app">
        <Main/>
    </div>
</template>

<script>
import Main from '@/views/Main.vue'
export default {
    components: { Main }
}
</script>


<style lang="scss">
#app {
    font-family: sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #444;
    -webkit-filter: invert(100%);
}

@font-face {
    font-family: 'asdf-custom-001';
    src: url('./assets/fonts/icon/asdf-custom-001.eot?43638304');
    src: url('./assets/fonts/icon/asdf-custom-001.eot?43638304#iefix')
            format('embedded-opentype'),
        url('./assets/fonts/icon/asdf-custom-001.woff2?43638304')
            format('woff2'),
        url('./assets/fonts/icon/asdf-custom-001.woff?43638304') format('woff'),
        url('./assets/fonts/icon/asdf-custom-001.ttf?43638304')
            format('truetype'),
        url('./assets/fonts/icon/asdf-custom-001.svg?43638304#asdf-custom-001')
            format('svg');
    font-weight: normal;
    font-style: normal;
}

[class^='icon-']:before,
[class*=' icon-']:before {
    font-family: 'asdf-custom-001';
    font-style: normal;
    font-weight: normal;
    speak: none;
    display: inline-block;
    text-decoration: inherit;
    width: 1em;
    margin-right: 0.1em;
    text-align: center;
    opacity: 0.8;
    font-variant: normal;
    text-transform: none;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

.icon-ok-circle:before {
    content: '\e800';
}
.icon-cancel-circle:before {
    content: '\e801';
}
.icon-plus-circle:before {
    content: '\e802';
}
.icon-minus-circle:before {
    content: '\e803';
}
.icon-down-dir:before {
    content: '\e804';
}
.icon-up-dir:before {
    content: '\e805';
}
.icon-left-dir:before {
    content: '\e806';
}
.icon-right-dir:before {
    content: '\e807';
}
.icon-circle-empty:before {
    content: '\f10c';
}
.icon-circle:before {
    content: '\f111';
}
.icon-dot-circled:before {
    content: '\f192';
}
.icon-circle-thin:before {
    content: '\f1db';
}
</style>
