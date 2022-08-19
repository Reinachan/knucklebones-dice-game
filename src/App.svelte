<script lang="ts">
	import { validate_each_argument } from 'svelte/internal';
	import calculateRowValue from './helpers/calculateRowValue';

	import Player from './lib/Player.svelte';

	import type { Board } from './types/board';
	import { PlayerNum } from './types/PlayerNum';

	let player1: Board = [[], [], []];
	let player2: Board = [[], [], []];

	let turn = PlayerNum.One;

	let victoryMessage = null;

	const switchTurn = (nextTurn: PlayerNum) => {
		switch (nextTurn) {
			case PlayerNum.One: {
				checkVictory(player1);
				turn = PlayerNum.Two;
				break;
			}
			case PlayerNum.Two: {
				checkVictory(player2);
				turn = PlayerNum.One;
				break;
			}
		}
	};

	const checkVictory = (player: Board) => {
		if (
			player[0].length === 3 &&
			player[1].length === 3 &&
			player[2].length === 3
		) {
			if (valueOfPlayer(player1) === valueOfPlayer(player2)) {
				victoryMessage = 'Scores are even';
			}
			if (valueOfPlayer(player1) > valueOfPlayer(player2)) {
				victoryMessage = 'Player 1 wins';
			}
			if (valueOfPlayer(player1) < valueOfPlayer(player2)) {
				victoryMessage = 'Player 2 wins';
			}
		}
	};

	const valueOfPlayer = (values: Array<number[]>) => {
		let total: number = 0;

		for (const row of values) {
			total += calculateRowValue(row);
		}

		return total;
	};

	const setPlayer1 = (newBoard: Board) => {
		player1 = newBoard;
	};

	const setPlayer2 = (newBoard: Board) => {
		player2 = newBoard;
	};

	const attack = (dice: number, row: number, attacker: PlayerNum) => {
		console.log(dice);
		console.log(row);
		console.log(attacker);

		switch (attacker) {
			case PlayerNum.One: {
				const modifiedRow = player2[row].filter((value) => value !== dice);
				const newPlayer = player2.map((x, index) =>
					index === row ? modifiedRow : x
				);
				player2 = newPlayer;
				break;
			}
			case PlayerNum.Two: {
				const modifiedRow = player1[row].filter((value) => value !== dice);
				const newPlayer = player1.map((x, index) =>
					index === row ? modifiedRow : x
				);
				player1 = newPlayer;
				break;
			}
		}
	};
</script>

<main>
	<h1>Knucklebones</h1>
	<div class="boards">
		<Player
			board={player1}
			setBoard={setPlayer1}
			{switchTurn}
			playerNum={PlayerNum.One}
			active={!!victoryMessage ? false : turn === PlayerNum.One}
			{attack}
		/>
		{#if !!victoryMessage}
			<h2>{victoryMessage}</h2>
		{/if}
		{#if !victoryMessage}
			<h2>Player {turn}'s turn</h2>
		{/if}
		<Player
			board={player2}
			setBoard={setPlayer2}
			{switchTurn}
			playerNum={PlayerNum.Two}
			active={!!victoryMessage ? false : turn === PlayerNum.Two}
			{attack}
		/>
	</div>

	<footer>
		<a href="https://www.flaticon.com/free-icons/dice" title="dice icons">
			Dice icons created by<wbr /> Google - Flaticon
		</a>
		<p>Game based on Knucklebones from Cult of the Lamb</p>
	</footer>
</main>

<style>
	.boards {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-template-rows: min-content max-content;
		grid-template-areas:
			'victory victory'
			'player1 player2';
		gap: 2rem;
		column-gap: 5rem;
		width: 100%;
	}

	h2 {
		grid-area: victory;
	}

	h1 {
		font-size: clamp(1rem, 8.5vw, 4rem);
	}

	@media screen and (max-width: 650px) {
		.boards {
			grid-template-columns: auto;
			grid-template-rows: auto;
			grid-template-areas:
				'player1'
				'victory'
				'player2';
		}
	}

	footer {
		margin-top: 5rem;
	}
</style>
