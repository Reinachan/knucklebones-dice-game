<script lang="ts">
	import Dice from './Dice.svelte';

	export let nums: number[];
	export let value: number;
	export let rotate: boolean = false;

	const order = rotate ? [2, 1, 0] : [0, 1, 2];
</script>

{#each order as i}
	<div><Dice die={nums[i]} /></div>
{/each}

<strong class={'value' + (rotate ? ' rotate' : '')}>{value}</strong>

<style>
	.rotate {
		transform: rotate(180deg);
	}
</style>
