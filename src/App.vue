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

let message = ref("");

const groupId = readPhaseFromUrl();

const config: Config = readConfig();

if (groupId !== -1) {
  fetchPhase(groupId)
    .then((response) => {
      const bracket = bracketAdapter(response.data.phaseGroup);

      switch (bracket.type) {
        case "DOUBLE_ELIMINATION":
          if (!config.losersOnly)
            winners.value = bracket.winners.rounds;


          if (!config.winnersOnly)
            losers.value = bracket.losers.rounds;


          if (!config.winnersOnly && !config.losersOnly)
            grands.value = bracket.grands.rounds;

          break;

        case "SINGLE_ELIMINATION":
          winners.value = bracket.winners.rounds;

          break;

        case "ROUND_ROBIN":
          winners.value = bracket.rounds;
      }
    }).catch(reason => {
      message.value = (reason as Error).message;
    });
}
</script>

<template>
  <div v-if="groupId === -1" style="text-align: center;">
    <h2>Hello!</h2> To use this site, add the group number of a start.gg bracket to the end of the address bar.
    <br />
    For example: <a href="https://top8.stream/1819860">https://top8.stream/1819860</a>
    <br />
    For more information, see <a href="https://github.com/jakobkg/top8.stream">the Github page</a>
  </div>
  <div v-else-if="message.length === 0" class="bracket">
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
  <div v-else>
    {{ message }}
  </div>
</template>

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
}
</style>
