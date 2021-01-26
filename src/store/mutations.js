export default {

    PUT_VALUTES: (state, items) => {
        let arr = []
        for (let key in items) {
            arr.push(items[key])
        }
        state.valutes = arr
    },
    PUT_BALANCE: (state, items) => {
        let arr = []
        for (let key in items) {
            let obj = {
                CharCode: items[key].CharCode,
                amount: 0
            }
            arr.push(obj)
        }
        arr.unshift({
            CharCode: "RUR",
            amount: 10000
        })
        state.balance = arr
    },

    CHOSE_ACTIVE_VALUTE: (state, item) => {
        state.activeValute = item
    },

    CHANGE_BALANCE: (state, {newMoneyValute, rurValute}) => {
        for (let el of state.balance) {
            el.CharCode === newMoneyValute.CharCode ? el = newMoneyValute : ""
            el.CharCode === rurValute.CharCode ? el = rurValute : ""
        }
    },


}
