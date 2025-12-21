export default {

    //
    // EXPENSE MUTATIONS
    //
    addExpenseAsFirst(state, payload) {
        state.expense.unshift(payload);
    },
    addExpenseAsLast(state, payload) {
        state.expense.push(payload);
    },
    editExpense(state, payload) {
        const id = payload.id;
        const data = payload.data;

        const expanse = state.expense;
        const index = expanse.findIndex(ex => ex.id === id);
        state.expense[index] = data;
    },
    deleteExpense(state, payload) {
        const idList = payload;
        const expanse = state.expense;
        if (idList.length > 0) {
            idList.forEach(id => {
                const index = expanse.findIndex(ex => ex.id === id);
                state.expense.splice(index, 1);
            });
        }
    },
    deleteAllExpense(state) {
        state.expense = [];
    },
    typeExpenseReset(state) {
        state.typeExpenses = [];
    },
    typeExpensesAdd(state, payload) {
        state.typeExpenses.push(payload);
    },

    //
    // AUTH MUTATIONS
    //
    setUser(state, payload) {
        state.user = payload;
    },
    setToken(state, payload) {
        state.token = payload;
    },

    logout(state) {
        state.token = '';
        state.user = null;
    },


    //
    // INCOME MUTATIONS
    //
    addIncomeAsFirst(state, payload) {
        state.incomes.unshift(payload);
    },
    addIncomeAsLast(state, payload) {
        state.incomes.push(payload);
    },
    editIncome(state, payload) {
        const id = payload.id;
        const data = payload.data;

        const incomes = state.incomes;
        const index = incomes.findIndex(inc => inc.id === id);
        state.incomes[index] = data;
    },
    deleteIncome(state, payload) {
        const idList = payload;
        const income = state.incomes;
        if (idList.length > 0) {
            idList.forEach(id => {
                const index = income.findIndex(income => income.id === id);
                state.incomes.splice(index, 1);
            });
        }
    },
    deleteAllIncome(state) {
        state.incomes = [];
    },


    //
    // BUDGET MUTATIONS
    //
    setBudgetIdState(state, payload) {
        state.budget_id_state = payload;
    },
}