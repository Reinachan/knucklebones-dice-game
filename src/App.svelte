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
	{#if !!victoryMessage}
		<h1>{victoryMessage}</h1>
	{/if}

	<Player
		board={player1}
		setBoard={setPlayer1}
		{switchTurn}
		playerNum={PlayerNum.One}
		active={!!victoryMessage ? false : turn === PlayerNum.One}
		{attack}
	/>
	<Player
		board={player2}
		setBoard={setPlayer2}
		{switchTurn}
		playerNum={PlayerNum.Two}
		active={!!victoryMessage ? false : turn === PlayerNum.Two}
		{attack}
	/>

	<footer>
		<a href="https://www.flaticon.com/free-icons/dice" title="dice icons">
			Dice icons created by Google - Flaticon
		</a>
	</footer>
</main>

<style>
</style>
