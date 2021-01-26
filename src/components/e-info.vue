<template lang="pug">
    .card.card_white
        .text_title.text_title_shadow Курс валют на {{date}}
        table.table
            tr.table-header
                td.table-title.table-title_first Код
                td.table-title Единиц
                td.table-title Курс
            tr(v-for="(item, index) in valutes" :key="index").table-row
                td.table-element.table-element_first {{item.CharCode}}
                td.table-element {{item.Nominal}}
                td.table-element(:style="{color: changeColor(item)}") {{matchValutes(item)}}

</template>

<script>
    export default {
        name: "e-info",
        data: () => ({
            date: new Date().toLocaleDateString()
        }),
        props: {
            valutes: Array
        },
        methods: {
            matchValutes(el) {
                let result
                //-для сравнения в формате 11,11 - 22,22 (вместо 11,11111 - 22,2222)
                const delNumber = (item) => Math.floor(item * 100) / 100
                const current = delNumber(el.Value)
                const old = delNumber(el.Previous)
                if (current < old) {
                    result = "-" + (old - current).toFixed(1)
                    result === "-0.0" ? result = "-0.1" : ""
                } else if (current > old) {
                    result = "+" + (current - old).toFixed(1)
                    result === "+0.0" ? result = "+0.1" : ""
                } else {
                    result = "0.0"
                }
                return el.Value + " (" + result + ")"
            },
            changeColor(el) {
                let current = Math.floor(el.Value * 100) / 100
                let old = Math.floor(el.Previous * 100) / 100
                if (current < old) return "#F62434"
                else if (current > old) return "#00B956"
                else return "black"
            }
        }
    }
</script>

<style scoped>

</style>