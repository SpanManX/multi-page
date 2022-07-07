<template>
    <div class="layout">
        <div>
            <layoutMenu></layoutMenu>
        </div>
        <div>
            div1
        </div>
        <div>
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
        </div>
    </div>
</template>

<script>
    import layoutMenu from '../components/layoutMenu'

    export default {
        name: "layout",
        components: {
            layoutMenu,
        }
    }
</script>

<style scoped>
    .layout {
        height: 100%;
        display: grid;
        grid-template-columns: 200px calc(100% - 200px);
        grid-template-rows: 100px;
    }

    .layout > div:nth-child(1) {
        grid-row-start: 1;
        grid-row-end: 3;
    }

    .layout > div:nth-child(2) {
        background: #42b983;
    }

    .layout > div:nth-child(3) {
        grid-column-start: 2;
        grid-column-end: 3;
        background: aquamarine;
    }
</style>
