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
    background-color: var(--color-background-soft);
}

.name-container {
    text-align: left;
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
    background-color: var(--color-background-mute);
}

.score-container {
    display: flex;
    align-items: center;
    text-align: center;
    padding-left: 0.5em;
    padding-right: 0.5em;
    background-color: var(--color-background-mute);
}

.winner {
    background-color: rgb(180, 90, 58);
    font-weight: bolder;
}
</style>