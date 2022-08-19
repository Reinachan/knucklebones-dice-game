<script lang="ts">
	import Dice from './Dice.svelte';

	export let nums: number[];
	export let value: number;
</script>

{#each nums as die}
	<Dice {die} />
{/each}

<strong class="value">{value}</strong>
