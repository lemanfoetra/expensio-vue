export default {
    addExpense(state, payload) {
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

    setUser(state, payload) {
        state.user = payload;
    },
    setToken(state, payload) {
        state.token = payload;
    },

    logout(state) {
        state.token = '';
        state.user = null;
    }
}