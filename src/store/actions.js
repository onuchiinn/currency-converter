import axios from "axios"

export default {

    async GET_VALUTES({commit}) {
        try {
            await axios.get(`https://www.cbr-xml-daily.ru/daily_json.js`)
                .then((response) => {
                    (commit('PUT_VALUTES', response.data.Valute)),
                        (commit('PUT_BALANCE', response.data.Valute))
                });
        } catch (e) {
            console.log(e)
        }
    }

}
