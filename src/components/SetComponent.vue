<script setup lang="ts">
import { onMounted, type PropType } from "vue";

import Player from "./PlayerComponent.vue";
import { player1Won, player2Won } from "@/methods/bracketSetHelpers";

const props = defineProps({
    set: {
        type: Object as PropType<BracketSet>,
        required: true
    }
});

onMounted(() => {
    const svg = document.getElementById("connector") as SVGElement | null;
    if (svg === null) return;

    if (props.set.children) {
        props.set.children.forEach(child => {
            const childElem = document.getElementById(child.id);
            const thisElem = document.getElementById(props.set.id);

            if (childElem !== null && thisElem !== null) {
                const thisRect = thisElem.getBoundingClientRect();
                const childRect = childElem.getBoundingClientRect();

                const x_dist = thisRect.x - (childRect.x + childRect.width);

                var lineFromThis = document.createElementNS('http://www.w3.org/2000/svg',"line");
                lineFromThis.setAttribute("x1", `${thisRect.x}`);
                lineFromThis.setAttribute("y1", `${thisRect.y + thisRect.height / 2}`);
                lineFromThis.setAttribute("x2", `${thisRect.x - (x_dist / 2)}`);
                lineFromThis.setAttribute("y2", `${thisRect.y + thisRect.height / 2}`);
                svg.append(lineFromThis);

                var verticalLine = document.createElementNS('http://www.w3.org/2000/svg',"line");
                verticalLine.setAttribute("x1", `${thisRect.x - (x_dist / 2)}`);
                verticalLine.setAttribute("y1", `${thisRect.y + thisRect.height / 2}`);
                verticalLine.setAttribute("x2", `${thisRect.x - (x_dist / 2)}`);
                verticalLine.setAttribute("y2", `${childRect.y + childRect.height / 2}`);
                svg.append(verticalLine);

                var lineToChild = document.createElementNS('http://www.w3.org/2000/svg',"line");
                lineToChild.setAttribute("x1", `${thisRect.x - (x_dist / 2)}`);
                lineToChild.setAttribute("y1", `${childRect.y + childRect.height / 2}`);
                lineToChild.setAttribute("x2", `${thisRect.x - x_dist}`);
                lineToChild.setAttribute("y2", `${childRect.y + childRect.height / 2}`);
                svg.append(lineToChild);
            }
        });
    }
})

</script>

<template>
    <div class="set-container">
        <div class="player-elements">
            <Player :name="set.slots[0].name" :score="set.slots[0].score" :winner="player1Won(set)" />
            <Player class="bottom" :name="set?.slots[1].name" :score="set?.slots[1].score"
                :winner="player2Won(set)" />
        </div>
    </div>
</template>

<style>
@import '@/assets/base.css';

:root {
    --corner-radius: 5px;
}

.player-elements {
    border-radius: var(--corner-radius);
    overflow: hidden;
}

.set-container {
    display: flex;
    flex-direction: column;
    user-select: none;
    margin: auto;
}

.bottom {
    padding-top: 1px;
}

.bottom::after {
    content: "";
    position: absolute;
    top: -1px;
    height: 2px;
    width: 100%;
    background-color: var(--color-background-mute);
}
</style>