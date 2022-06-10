<script setup lang="ts">
defineProps({
    name: {
        type: String,
        default: ""
    },
    score: {
        type: Number,
        required: true
    },
    winner: {
        type: Boolean,
        required: true
    }
});
</script>

<template>
    <div class="player-container">
        <div class="name-container">{{ name.split(" / ")[0] }}<br />{{ name.split(" / ")[1] }}</div>
        <div :class="{ 'winner': winner, 'score-container': true }">{{ isNaN(score) ? "-" : score }}</div>
    </div>
</template>

<style>
@import "@/assets/base.css";

.player-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background-color: var(--score-container-background);
}

.name-container {
    text-align: left;
    background-color: var(--name-container-background);
    color: var(--name-text);
    padding-left: 0.5em;
    padding-right: 0.5em;
    width: 130px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
}

.score-container::before {
    content: "";
    width: 1px;
    height: 100%;
    position: absolute;
    left: 0;
    background-color: var(--name-score-separator);
}

.score-container {
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--score-text);
    width: 2em;
    background-color: var(--score-container-background);
}

.winner {
    background-color: var(--winner-score-background);
    color: var(--winner-score-text);
    font-weight: bolder;
}
</style>