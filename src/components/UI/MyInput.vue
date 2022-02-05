<template>
    <input :value="modelValue" @input="updateInput" class="input" type="text">
</template>

<script>
export default {
    name: 'my-input',
    props: {
        modelValue: [String, Number],
    },
    methods: {
        updateInput(event) {
            this.$emit('update:modelValue', event.target.value);
        }
    }
}
</script>

<style lang="scss" scoped>
.input {
    display: block;
    width: 100%;
    border: 1px solid black;
    padding: 10px 6px;
    margin: 10px -6px 10px 0;

    &--w50 {
        width: 50%;
    }
}
</style>