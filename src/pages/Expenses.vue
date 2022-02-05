<template>
    <h1 class="title">Расходы</h1>
    <!-- Create card block -->
    <form>
        <h2>Создать карточку:</h2>
        <input v-model="obj.title" type="text" placeholder="Название"> 
        <input v-model="obj.category" type="text" list="expenses_category" placeholder="Выберите категорию">

        <datalist id="expenses_category">
            <option value="family">Семья</option>
            <option value="health">Здоровье</option>
            <option value="groceries">Продукты</option>
            <option value="restaurant">Кафе</option>
            <option value="leisure">Досуг</option>
            <option value="transport">Транспорт</option>
            <option value="gifts">Подарки</option>
            <option value="shopping">Покупки</option>
        </datalist>

        <input v-model="obj.value" type="number" placeholder="Значение" required> 

        <textarea v-model="obj.description" type="text" placeholder="Дополнительное описание"></textarea>

        <my-button class="btn--medium" v-if="obj.value" @click="btnClick">Создать</my-button>
    </form>

    <!-- Search and sort block -->
    <form>
        <my-input type="text" :model-value="searchQuery" @update:model-value="setSearchQuery" placeholder="Поиск:" />
        <h2>Сортировать по:</h2>
        <my-select :model-value="selectedSort"  @update:model-value="setSelectedSort" :options="sortOptions" />
    </form>
    
    <!-- Display card block -->
    <div v-for="card in sortedAndSearchedCard" :key="card.id">
        <div class="card" v-if="card.type === 'expenses'">
            <div class="card__data">
                <div>Название: {{ card.title }}</div>
                <div>Категория: {{ card.category }}</div>
                <div>Значение: {{ card.value }}₽ </div>
                <div>Описание: {{ card.description }}</div>
                <div>Дата создания: {{ card.date }}</div>
            </div>
            <div class="card__option">
                <my-button class="btn--small" @click="removeCard(card); updateExpenses()">X</my-button>
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
                type: 'expenses',
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
        }),
        
        btnClick() {
            this.createCard(this.obj);
            this.updateExpenses();
        },

        ...mapActions({
            updateExpenses: 'card/updateExpenses',
        })
    },
    computed: {
        ...mapState({
            cards: state => state.card.cards,
            selectedSort: state => state.card.selectedSort,
            searchQuery: state => state.card.searchQuery,
            sortOptions: state => state.card.sortOptions,
        }),

        ...mapGetters({
            sortedCard: 'card/sortedCard',
            sortedAndSearchedCard: 'card/sortedAndSearchedCard',
       }) 
    }
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