<template>
    <div id="layout">
        <LayoutHeader />
        <LayoutMain />
        <LayoutNav />
    </div>
</template>
<script>
import LayoutHeader from './Header';
import LayoutMain from './Main';
import LayoutNav from './Nav';
export default {
    name: 'layout',
    components: {
        LayoutHeader,
        LayoutMain,
        LayoutNav
    }
}
</script>
<style lang="sass" scoped>

</style>
