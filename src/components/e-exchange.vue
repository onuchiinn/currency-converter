<template lang="pug">
    .card.card_fix(v-if="selectBox.length")
        label.text_subtitle Валюта:
        select.select(v-model="selected" @change="selectCharCode")
            option.option(v-for="option in selectBox" :value="option.CharCode") {{option.name}}
        .text_subtitle.exchange-inform Доступно:
            .text_bold {{readyMoney}} {{selected}}
        .text_subtitle Хочу:
        .flex
            button.global__btn.flex-grow(@click="isBuy = true") Купить
            button.global__btn.flex-grow(@click="isBuy = false") Продать
        input.input(placeholder="0,000", @input="inputValue")
        .text_subtitle.exchange-inform {{changeButtons.result}}
            .text_bold {{price}} ₽
        button.global__btn.exchange-button(@click="send") {{changeButtons.action}}
</template>

<script>
    import {mapGetters, mapMutations} from "vuex"

    export default {
        name: "e-exchange",
        data: () => ({
            inputMoney: Number,
            isBuy: true,
            selected: null,
        }),
        props: {
            valutes: Array
        },
        methods: {
            ...mapMutations([
                "CHOSE_ACTIVE_VALUTE", "CHANGE_BALANCE"
            ]),
            selectDefaultValue() {
                //-вызываем при первичной отрисовке(в 'created') для выбора текущей валюты в select'e
                this.selected = this.selectBox[0].CharCode
                this.CHOSE_ACTIVE_VALUTE(this.valutes[0])
            },
            selectCharCode() {
                //-сравниваем доступные валюты и названия в select, если совпадает, пушим в состояние выбранную валюту
                this.valutes.forEach(el => {
                    el.CharCode == this.selected ? this.CHOSE_ACTIVE_VALUTE(el) : ""
                })
            },
            send() {
                const findValute = (item) => {
                    return this.BALANCE.find(el => el.CharCode === item)
                }
                const math = (a, b, c, d) => {
                    //-проверяем хватает ли нам денег для совершения операции.
                    //-Если хотим купить больше чем есть денег => оставляем начальные значения.
                    if (a.amount - b >= 0) {
                        c.amount = c.amount + +d
                        a.amount = a.amount - b
                    }
                    return {newMoneyValute: c, rurValute: a}
                }
                const newMoneyValute = findValute(this.ACTIVE_VALUTE.CharCode)
                const rurValute = findValute("RUR")
                if (this.isBuy) {
                    //-расчеты при покупке
                    const result = math(rurValute, this.price, newMoneyValute, this.inputMoney)
                    this.CHANGE_BALANCE({newMoneyValute: result.newMoneyValute, rurValute: result.rurValute})
                } else {
                    //-расчеты при продаже
                    const result = math(newMoneyValute, this.inputMoney, rurValute, this.price)
                    this.CHANGE_BALANCE({newMoneyValute: result.newMoneyValute, rurValute: result.rurValute})
                }

            },
            inputValue(e) {
                e.target.value = e.target.value.replace(/[^0-9.]+/g, '');
                if (e.target.value.indexOf(".") != '-1') {
                    e.target.value = e.target.value.substring(0, e.target.value.indexOf(".") + 3)
                }
                this.inputMoney = e.target.value
            }

        },
        computed: {
            ...mapGetters([
                "ACTIVE_VALUTE",
                "BALANCE"
            ]),
            selectBox() {
                //-список options для заполнения select'a
                let arr = []
                this.valutes.forEach(el => {
                    arr.push({name: `${el.Name}(${el.CharCode})`, value: el.Value, CharCode: el.CharCode})
                })
                return arr
            },
            price() {
                //Предварительный расчет стоимости (Поле 'Заплачу' || 'Получу')
                if (this.ACTIVE_VALUTE.Value * this.inputMoney) {
                    return this.ACTIVE_VALUTE.Value / this.ACTIVE_VALUTE.Nominal * this.inputMoney
                } else return "0,00"
            },
            readyMoney() {
                //отображает сумму выбранной валюты доступной на счету (Поле 'Доступно')
                let item
                this.BALANCE.forEach(el => {
                    el.CharCode == this.ACTIVE_VALUTE.CharCode ? item = el : ""
                })
                return item ? item = item.amount : "0,00"
            },

            changeButtons() {
                return (this.isBuy) ? {action: "Купить", result: "Заплачу:"} : {
                    action: "Продать",
                    result: "Получу:"
                }
            }
        },
        created() {
            this.selectDefaultValue()
        }
    }
</script>

<style scoped>

</style>