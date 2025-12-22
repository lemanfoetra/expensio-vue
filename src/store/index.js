import { createStore } from "vuex";
import getters from './getters'
import mutations from './mutations'
import actions from './actions'

const store = createStore({
    state() {
        return {
            expense: [],
            token: '',
            user: '',
            typeExpenses: [],
            incomes: [],
            budget_id_state: 0,
        }
    },
    mutations: mutations,
    getters: getters,
    actions: actions,
});
export default store;