export default {
    isAuthenticated(state) {
        return !!state.token;
    },

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
    }
}