<template>
  <div class="bracket">

    <div class="winners bracketstage" style="grid-row: 1; grid-column: 1;">
      <Round v-for="round in bracket.winners" :round="round" :show-round-name="config.showRoundNames"
        v-bind:key="round.name" />
    </div>
    <div class="losers bracketstage">
      <Round v-for="round in bracket.losers" :round="round" :show-round-name="config.showRoundNames"
        v-bind:key="round.name" />
    </div>
    <div class="grands bracketstage">
      <Round v-for="round in bracket.grands" :round="round" :show-round-name="config.showRoundNames"
        v-bind:key="round.name" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';
import Round from './RoundComponent.vue';

type BracketProp = {
  winners: BracketRound[],
  losers: BracketRound[],
  grands: BracketRound[]
}

defineProps({
  bracket: {
    type: Object as PropType<BracketProp>,
    required: true
  },
  config: {
    type: Object as PropType<Config>,
    required: true
  }
});
</script>

<style>
@import '@/assets/base.css';

.bracket {
  background-color: var(--bracket-background);
  border-radius: 15px;
  display: grid;
  user-select: none;
}

.bracketstage {
  display: flex;
  justify-content: right;
}

.bracketstage>* {
  margin: 0 25px;
}

.winners {
  grid-row: 1;
  grid-column: 1;
}

.losers {
  grid-row: 2;
  grid-column: 1;
}

.grands {
  grid-column: 2;
  grid-row: 1 / span 2;
}</style>