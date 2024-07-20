export default {
    addExpense(context, data) {
        data.key = Math.floor(Math.random() * 100000);
        context.commit('addExpense', data);
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
    }
}