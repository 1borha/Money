<template>
    <div class="navbar">
        <div class="navbar__btns">
            <my-btn @click="$router.push('/')">Счёт</my-btn>
            <my-btn @click="$router.push('/expenses')">Расходы</my-btn>
            <my-btn @click="$router.push('/income')">Доходы</my-btn>
            <my-btn @click="$router.push('/plan')">План</my-btn>
        </div>
    </div>
</template>

<script>

export default {

}
</script>

<style lang="scss" scoped>

.navbar {
    position: fixed;
    width: 100%;

}

.navbar__btns {
    display: flex;
  
}

</style>