<template>
    <h1>top8.stream</h1>
    <p>
        Paste the start.gg link to the bracket you want to show, and hit Go!
    </p>
    <div class="form-container">
        <input type="text" placeholder="start.gg bracket link...">
        <input type="button" value="Go!">
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';

onMounted(() => {
    const input = document.querySelector("input[type=text]") as HTMLInputElement;
    const button = document.querySelector("input[type=button]") as HTMLInputElement;

    const navigate = () => {
        const contents = input.value;
        const bracketId = contents.split('/').pop();
        
        window.location.href += bracketId;
    }

    button.onclick = navigate;
    input.onkeydown = (event) => {
        if (event.code === "Enter") navigate();
    }
})
</script>

<style scoped>

* {
    --form-height: 3rem;
}

h1 {
    position: fixed;
    top: 1rem;
    left: 1rem;
}

p {
    font-size: large;
}

input[type=text] {
    all: unset;

    background-color: white;

    border-top-left-radius: calc(var(--form-height) * 0.5);
    border-bottom-left-radius: calc(var(--form-height) * 0.5);

    min-height: var(--form-height);
    min-width: 50ch;
    padding-inline: 1rem;
}

input[type=button]{
    border: 0; /* Remove default */
    border-radius: 0;

    border-top-right-radius: calc(var(--form-height) * 0.5);
    border-bottom-right-radius: calc(var(--form-height) * 0.5);

    font-weight: bold;
    font-size: large;

    min-height: var(--form-height);
    min-width: var(--form-height);

    background-color: #13aa52;
    color: white;

    &:hover {
        background-color: forestgreen;
        cursor: pointer;
    }
}
</style>