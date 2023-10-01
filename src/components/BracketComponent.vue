<template>
  <div class="winners bracketstage" style="grid-row: 1; grid-column: 1;">
    <Round v-for="round in bracket.winners" :round="round" :show-round-name="config.showRoundNames" v-bind:key="round.name" />
  </div>
  <div class="losers bracketstage">
    <Round v-for="round in bracket.losers" :round="round" :show-round-name="config.showRoundNames" v-bind:key="round.name" />
  </div>
  <div class="grands bracketstage">
    <Round v-for="round in bracket.grands" :round="round" :show-round-name="config.showRoundNames" v-bind:key="round.name" />
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';

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