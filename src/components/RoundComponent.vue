<script setup lang="ts">
import type { PropType } from 'vue';

import Set from "./SetComponent.vue";

defineProps({
    round: {
        type: Object as PropType<BracketRound>,
        required: true,
    },
    showRoundName: {
        type: Boolean,
        required: true
    }
});
</script>

<template>
    <div class="round-container">
        <div class="round-name" v-if="showRoundName">
            {{ round.name }}
        </div>
        <div class="sets-container">
            <Set v-for="set in round.sets" :set="set" :id="set.id" v-bind:key="set.id" />
        </div>
    </div>
</template>

<style>

.round-container {
    display: flex;
    flex-direction: column;
}

.sets-container {
    height: 100%;
    display: flex;
    flex-direction: column;
}

.sets-container > * {
    padding: 15px 0;
}
</style>