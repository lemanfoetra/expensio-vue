export default {
    //
    // EXPENSE ACTIONS
    //  
    addExpense(context, data) {
        data.key = Math.floor(Math.random() * 100000);
        context.commit('addExpenseAsFirst', data);
    },
    addExpenseLast(context, data) {
        data.key = Math.floor(Math.random() * 100000);
        context.commit('addExpenseAsLast', data);
    },
    editExpense(context, data) {
        data.data.key = Math.floor(Math.random() * 100000);
        context.commit('editExpense', data);
    },
    deleteExpense(context, idList) {
        context.commit('deleteExpense', idList);
    },
    deleteAllExpense(context) {
        context.commit('deleteAllExpense');
    },

    setUser(context, user) {
        context.commit('setUser', user);
    },
    setToken(context, token) {
        context.commit('setToken', token);
    },

    logout(context) {
        localStorage.removeItem('access_token');
        localStorage.removeItem('user');
        context.commit('logout');
    },

    typeExpenseReset(context) {
        context.commit('typeExpenseReset');
    },

    typeExpensesAdd(context, data) {
        data.key = Math.floor(Math.random() * 100000);
        context.commit('typeExpensesAdd', data);
    },


    // 
    // INCOME ACTIONS
    // 
    addIncome(context, data) {
        data.key = Math.floor(Math.random() * 100000);
        context.commit('addIncomeAsFirst', data);
    },
    addIncomeLast(context, data) {
        data.key = Math.floor(Math.random() * 100000);
        context.commit('addIncomeAsLast', data);
    },
    editIncome(context, data) {
        data.data.key = Math.floor(Math.random() * 100000);
        context.commit('editIncome', data);
    },
    deleteIncome(context, idList) {
        context.commit('deleteIncome', idList);
    },
    deleteAllIncome(context) {
        context.commit('deleteAllIncome');
    },
}