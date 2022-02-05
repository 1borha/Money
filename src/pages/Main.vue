<template>
    <div>Учитывать расходы и доходы?<input type="checkbox" v-model="balanceCheckbox"></div>
    <div v-if="balanceCheckbox">
        Текущий бюджет: {{ balance + income - expenses }}₽
    </div>
    <div v-else>
        Текущий бюджет: {{ balance }}₽
    </div>
    <div>Установить баланс:</div>
    <form>
        <input v-model="value" type="number">
        <my-button class="btn--medium" @click="setBalance(value)">Установить</my-button>
    </form>  
</template>

<script>
import  {mapState, mapMutations, mapGetters } from 'vuex';
import MyButton from '../components/UI/MyButton.vue';
import MyInput from '../components/UI/MyInput.vue';
import MySelect from '../components/UI/MySelect.vue';

export default {
    components: { MyButton },
    data() {
        return {
            value: 0,
            balanceCheckbox: false,
        }
    },
    methods: {
        ...mapMutations({
            setBalance: 'balance/setBalance',
        }),
  
    },
    computed: {
        ...mapState({
            balance: state => state.balance.balance,
            cards: state => state.card.cards,
            income: state => state.card.income,
            expenses: state => state.card.expenses,
        }),
    },
}
</script>

<style lang="scss" scoped>
    
</style>