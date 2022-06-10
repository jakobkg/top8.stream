<script setup lang="ts">
import { ref } from 'vue';

import Round from './components/RoundComponent.vue';
import { bracketAdapter } from './methods/bracketAdapter';
import { fetchPhase } from './methods/fetchPhase';
import { readConfig } from './methods/readConfig';
import { readPhaseFromUrl } from './methods/readPhaseFromUrl';

let winners = ref(new Array<BracketRound>());
let losers = ref(new Array<BracketRound>());
let grands = ref(new Array<BracketRound>());

const phaseId = readPhaseFromUrl();

const config: Config = readConfig();

if (phaseId !== -1) {
  fetchPhase(phaseId)
    .then((response) => {
      try {
        const stages = bracketAdapter(response.data.phase);
        if (!config.losersOnly) {
          winners.value = stages[0].rounds;
        }

        if (!config.winnersOnly) {
          losers.value = stages[1].rounds;
        }

        if (!config.winnersOnly && !config.losersOnly)
        grands.value = stages[2].rounds;
        
      } catch (error) {
        console.warn("API response error, invalid phase ID provided");
        console.warn(error)
      }
    });
}
</script>

<template>
  <div class="bracket">
    <div class="winners bracketstage" style="grid-row: 1; grid-column: 1;">
      <Round v-for="round in winners" :round="round" :show-round-name="config.showRoundNames" v-bind:key="round.name" />
    </div>
    <div class="losers bracketstage">
      <Round v-for="round in losers" :round="round" :show-round-name="config.showRoundNames" v-bind:key="round.name" />
    </div>
    <div class="grands bracketstage">
      <Round v-for="round in grands" :round="round" :show-round-name="config.showRoundNames" v-bind:key="round.name" />
    </div>
  </div>
</template>

<style>
@import '@/assets/base.css';

.bracket {
  background-color: var(--bracket-background);
  border-radius: 15px;
  display: grid;
}

.bracketstage {
  display: flex;
  justify-content: right;
}

.bracketstage > * {
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
}
</style>
