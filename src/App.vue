<template lang="pug">
    .container
        .layout
            e-exchange(v-if="VALUTES.length" :valutes="VALUTES")
            e-info(:valutes="VALUTES")
            e-balance
</template>

<script>

    import eExchange from "@/components/e-exchange"
    import eInfo from "@/components/e-info"
    import eBalance from "@/components/e-balance"
    import {mapGetters, mapActions} from "vuex"

    export default {
        name: 'App',

        components: {
            eExchange,
            eInfo,
            eBalance
        },

        data: () => ({}),
        methods: {
            ...mapActions([
                "GET_VALUTES"
            ]),
        },
        computed: {
            ...mapGetters([
                "VALUTES"
            ]),
        },
        created() {
            this.GET_VALUTES()
        }
    };
</script>
