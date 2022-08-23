<script lang="ts">
	import calculateRowValue from 'src/helpers/calculateRowValue';

	import type { Board } from 'src/types/board';
	import type { PlayerNum } from 'src/types/PlayerNum';
	import RollDice from './RollDice.svelte';
	import Row from './Row.svelte';

	export let board: Board;
	export let setBoard: (newBoard: Board) => void;

	export let playerNum: PlayerNum;
	export let switchTurn: (currentPlayer: PlayerNum) => void;
	export let attack: (dice: number, row: number, attacker: PlayerNum) => void;

	export let mobile: undefined | boolean;

	/** is this component the current turn's player? */
	export let active: boolean;
	/** is this component the winner? */
	export let victor: boolean | null;

	let dice: number | null = null;
	const setDice = (newValue: number) => {
		dice = newValue;
	};

	const addDice = (row: number) => {
		if (board[row].length < 3) {
			board[row].push(dice);
			setBoard(board);
			attack(dice, row, playerNum);
			setDice(null);
			switchTurn(playerNum);
		}
	};

	const valueOfPlayer = (values: Array<number[]>) => {
		let total: number = 0;

		for (const row of values) {
			total += calculateRowValue(row);
		}

		return total;
	};
</script>

{#if !mobile}
	<div
		class={`player p${playerNum}${mobile ? ' mobile' : ''}${
			active ? ' current' : ''
		}${victor ? ' victor' : ''}`}
	>
		<div class="rows">
			{#each board as row, index}
				<div class="col">
					<button
						class="addButton"
						disabled={!dice || board[index].length >= 3}
						on:click={() => addDice(index)}>Add</button
					>
					<Row nums={row} value={calculateRowValue(row)} />
				</div>
			{/each}
		</div>

		<RollDice {dice} {setDice} disabled={!active} rotate={false} />
	</div>
{/if}
{#if mobile}
	<div
		class={`player p${playerNum}${mobile ? ' mobile' : ''}${
			active ? ' current' : ''
		}${victor ? ' victor' : ''}`}
	>
		<RollDice {dice} {setDice} disabled={!active} rotate={true} />

		<div class="rows">
			{#each board as row, index}
				<div class="col upside-down">
					<Row nums={row} value={calculateRowValue(row)} rotate={true} />
					<button
						class="addButton rotate"
						disabled={!dice || board[index].length >= 3}
						on:click={() => addDice(index)}>Add</button
					>
				</div>
			{/each}
		</div>
	</div>
{/if}

<style>
	.player {
		display: flex;
		flex-direction: column;
		align-items: center;
		border-radius: 5px;
		padding: 8px 8px 8px 8px;
	}

	.p1 {
		grid-area: player1;
	}

	.p2 {
		grid-area: player2;
	}

	.rotate {
		transform: rotate(180deg);
	}

	.current:not(.victor) {
		outline: rgba(68, 185, 228, 0.268) solid 2px;
		background-color: rgba(68, 185, 228, 0.058);
	}

	.victor {
		outline: rgba(79, 231, 68, 0.693) solid 2px;
		background-color: rgba(79, 231, 68, 0.381);
	}

	/* .mobile {
		transform: rotate(180deg);
	} */
</style>
