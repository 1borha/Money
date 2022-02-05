import { createStore } from "vuex";
import { cardModule } from "./cardModule";
import { balanceModule } from "./balanceModule";

export default createStore({
    modules: {
        balance: balanceModule,
        card: cardModule,
    }
})