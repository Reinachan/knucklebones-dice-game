<script lang="ts">
	import rollDice from 'src/helpers/rollDice';

	import Dice from './Dice.svelte';

	export let dice: number | null;
	export let setDice: (newValue: number) => void;
	export let disabled: boolean;
	export let rotate: boolean = false;
</script>

<div class={'roll-dice' + (rotate ? ' rotate' : '')}>
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
		margin-bottom: 0.8rem;
		height: 2.5rem;

		display: flex;
		align-items: center;
		align-content: center;
	}

	.roll-dice button {
		height: 2.5rem;
		width: 7rem;
	}

	.rotate {
		transform: rotate(180deg);
	}
</style>
