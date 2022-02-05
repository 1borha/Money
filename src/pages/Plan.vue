<template>
    <h1 class="title">План</h1>
    <!-- Create card block -->
    <form>
        <h2>Создать карточку:</h2>
        <input v-model="obj.title" type="text" placeholder="Название"> 

        <textarea v-model="obj.description" type="text" placeholder="Описание"></textarea>

        <input v-model="obj.value" type="number" placeholder="Значение" required> 

        <input v-model="obj.deadline" type="text" placeholder="Дедлайн" onfocus="(this.type='date')">

        <my-button class="btn--medium" v-if="obj.value" @click="btnClick">Создать</my-button>
    </form>

    <!-- Search block -->
    <form>
        <my-input type="text" :model-value="searchQuery" @update:model-value="setSearchQuery" placeholder="Поиск:" />
    </form>
    
    <!-- Display card block -->
    <div v-for="card in sortedAndSearchedCard" :key="card.id">
        <div class="card" v-if="card.type === 'plan'">
            <div class="card__data">
                <div>Название: {{ card.title }}</div>
                <div>Значение: {{ card.value }}₽ </div>
                <div>Описание: {{ card.description }}</div>
                <div>Дата создания: {{ card.date }}</div>
                <div>Дата дедлайна: {{ card.deadline }}</div>
                <div>Дней до дедлайна: {{ timeToDeadline(card.date, card.deadline) }}</div>
            </div>
            <div class="card__option">
                <my-input class="input--w50" type="number" @update:model-value="setPayment" @keyup.enter="updatePlan(card)" placeholder="Внести сумму" />
                <my-button class="btn--small" @click="removeCard(card)">X</my-button>
            </div>
        </div>
    </div>
</template>

<script>
import  {mapState, mapMutations, mapGetters, mapActions } from 'vuex';
import MyButton from '../components/UI/MyButton.vue';
import MyInput from '../components/UI/MyInput.vue';
import MySelect from '../components/UI/MySelect.vue';

export default {
  components: { MyButton, MyInput, MySelect },
    data() {
        return {
            obj: {
                type: 'plan',
                title: '',
            },
        }
    },
    methods: {
        ...mapMutations({
            createCard: 'card/createCard',
            removeCard: 'card/removeCard',
            setSelectedSort: 'card/setSelectedSort',
            setSearchQuery: 'card/setSearchQuery',
            setPayment: 'card/setPayment',
            makePayment: 'card/makePayment',
        }),

        btnClick() {
            this.createCard(this.obj);
        },

        ...mapActions( {
            updatePlan: 'card/updatePlan',
        }),

        timeToDeadline(currentDate, deadlineDate) {
            let current = Date.parse(currentDate);
            let deadline = Date.parse(deadlineDate);

            if(current >= deadline) {
                return "none"
            } else {
                return Math.ceil((deadline - current) / (1000 * 60 * 60 * 24)) 
            }
        },

    },
    computed: {
        ...mapState({
            cards: state => state.card.cards,
            selectedSort: state => state.card.selectedSort,
            searchQuery: state => state.card.searchQuery,
            sortOptions: state => state.card.sortOptions,
            payment: state => state.card.payment,
            
        }),

       ...mapGetters({
            sortedCard: 'card/sortedCard',
            sortedAndSearchedCard: 'card/sortedAndSearchedCard',
       }) 
    },
    
}
</script>

<style lang="scss" scoped>
    .title {
        margin-bottom: 10px;

        font-size: 50px;
        font-weight: 700;
        text-align: center;
    }

    .card {
        width: 75%;
        border: 1px solid black;
        padding: 15px;
        margin-top: 10px;
    }

</style>