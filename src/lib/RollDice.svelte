<script lang="ts">
	import rollDice from 'src/helpers/rollDice';

	import Dice from './Dice.svelte';

	export let dice: number | null;
	export let setDice: (newValue: number) => void;
	export let disabled: boolean;
</script>

<div class="roll-dice">
	{#if dice}
		<Dice die={dice} />
	{/if}
	{#if !dice}
		<button
			on:click={(e) => {
				e.preventDefault();
				setDice(rollDice());
			}}
			{disabled}>Roll Dice</button
		>
	{/if}
</div>

<style>
	.roll-dice {
		margin-top: 0.8rem;
		height: 2rem;
	}
</style>
