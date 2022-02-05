
export const balanceModule = {
    namespaced: true,
    state: () => ({
        balance: 0,
    }),
    getters: {
        
    },
    mutations: {
        setBalance(state, value) {
            state.balance = value;
        },
    },
    actions: {
        
    },
}