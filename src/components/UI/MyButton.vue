<template>
    <button class="btn">
        <slot></slot>
    </button>
</template>

<script>
export default {
    name: 'my-btn'
}
</script>

<style lang="scss" scoped>
    .btn {
        width: 100%;
        padding: 10px;

        background-color: white;
        border: 1px solid black;

        font-size: 25px;
        color: black;

        &:hover {
            background-color: black;
            color: white;
        }

        &--medium {
            width: 43%;
        }

        &--small {
            width: 5%;
            padding: 3px;
        }
    }
</style>