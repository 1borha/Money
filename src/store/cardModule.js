

export const cardModule = {
    
    namespaced: true,
    state: () => ({
        cards: [],

        income: 0,
        expenses: 0,

        payment: 0,

        selectedSort: '',
        searchQuery: '',
        sortOptions: [
            {value: 'title', name: 'По названию'},
            {value: 'category', name: 'По категории'},
            {value: 'date', name: 'По дате создания'},
        ],
    }),
    getters: {
        sortedCard(state) {
            return [...state.cards].sort((card1, card2) => card1[state.selectedSort]?.localeCompare(card2[state.selectedSort]));
        },
        sortedAndSearchedCard(state, getters) {
            return getters.sortedCard.filter(card => card.title.toLowerCase().includes(state.searchQuery.toLowerCase()))
        }
    },
    mutations: {
        /* CARD */ 
        createCard(state, obj) {
            const newCard = {
                id: Date.now(),
                title: obj.title,  
                category: obj.category,  
                value: obj.value,  
                description: obj.description,  
                date: (new Date()).toISOString().slice(0,10),
                type: obj.type,
                deadline: obj.deadline,
                
            }
            state.cards.push(newCard);
        },

        removeCard(state, card) {
            state.cards = state.cards.filter(c => c.id !== card.id);
        },

        /* Search and sort */
        setSelectedSort(state, selectedSort) {
            state.selectedSort = selectedSort;
        },

        setSearchQuery(state, searchQuery) {
            state.searchQuery = searchQuery;
        },

        /* Income and Expenses */
        updateIncome: (state) => {
            state.income = state.cards
                .filter(card => {
                    return (card.type == "income")
                })
                .reduce( (sum, current) => {
                    return sum + current.value;
                }, 0);   
        },

        updateExpenses: (state) => {
            state.expenses = state.cards
                .filter(card => {
                    return (card.type == "expenses")
                })
                .reduce( (sum, current) => {
                    return sum + current.value;
                }, 0);   
        },

        /* Plan */
        setPayment(state, payment) {
            state.payment = +payment;
        },

        makePayment(state, card) {
            if (state.payment > 0) {
                card.value -= state.payment;
                state.payment = 0;
            }
        },

        checkPlan(state, card) {
            if(card.value <= 0) {
                state.cards = state.cards.filter(c => c.id !== card.id);
            }
        },
    },
    actions: {
        updateIncome: ({commit}) => {
            commit('updateIncome');
        },

        updateExpenses: ({commit}) => {
            commit('updateExpenses');
        },

        updatePlan: ({commit}, card) => {
            commit('makePayment', card);
            commit('checkPlan', card);
        }
    },
}