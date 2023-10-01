<script setup lang="ts">
import { ref } from 'vue';

import { bracketAdapter } from './methods/bracketAdapter';
import { fetchPhase } from './methods/fetchPhase';
import { readConfig } from './methods/readConfig';
import { readPhaseFromUrl } from './methods/readPhaseFromUrl';
import FrontPage from './components/FrontPage.vue';
import BracketComponent from './components/BracketComponent.vue';

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
  <FrontPage v-if="groupId === -1" />

  <BracketComponent :bracket="{ winners, losers, grands }" :config="config" v-else-if="message.length === 0"
    class="bracket" />

  <div v-else>
    {{ message }}
  </div>
</template>