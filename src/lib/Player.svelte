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

	export let active: boolean;

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

<div class={`player p${playerNum}`}>
	<RollDice {dice} {setDice} disabled={!active} />

	<div class="rows">
		{#each board as row, index}
			<div class="col">
				<button
					disabled={!dice || board[index].length >= 3}
					on:click={() => addDice(index)}>Add</button
				>
				<Row nums={row} value={calculateRowValue(row)} />
			</div>
		{/each}
	</div>
</div>

<style>
	.player {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.p1 {
		grid-area: player1;
	}

	.p2 {
		grid-area: player2;
	}
</style>
