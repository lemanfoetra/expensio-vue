export default {
    isAuthenticated(state) {
        return !!state.token;
    },

    //
    // EXPENSE GETTERS
    //
    expenses(state) {
        return state.expense;
    },

    expenseById: (state) => (id) => {
        const expanse = state.expense;
        const index = expanse.findIndex(ex => ex.id === id);
        return expanse[index];
    },

    getUser(state) {
        let user = state.user;
        if (user === '') {
            user = JSON.parse(localStorage.getItem('user'));
        }
        return user;
    },
    getToken(state) {
        let token = state.token;
        if (token === '') {
            token = localStorage.getItem('access_token');
        }
        return token;
    },

    getTypeExpenses(state) {
        return state.typeExpenses;
    },


    //
    // INCOME GETTERS
    //
    incomes(state) {
        return state.incomes;
    },

    incomesById: (state) => (id) => {
        const incomes = state.incomes;
        const index = incomes.findIndex(income => income.id === id);
        return incomes[index];
    },

    //
    // BUDGET GETTERS
    //
    getBudgetIdState(state) {
        return state.budget_id_state;
    },
}