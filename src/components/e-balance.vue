<template lang="pug">
    .card
        .text_title.table__title Баланс
        table.table
            transition-group(enter-active-class="fade-enter-active" leave-active-class="fade-leave-active" name="fade")
                tr(v-for="(item, index) in BALANCE" :key="index" v-if="item.amount > 0 ").table-row
                    td.table-element.table-element_max {{item.CharCode}}
                    td.table-element.table-element_max {{item.amount}}

</template>

<script>
    import {mapGetters} from "vuex"

    export default {
        name: "e-balance",
        computed: {
            ...mapGetters([
                "BALANCE"
            ])
        }
    }
</script>

<style scoped>

</style>