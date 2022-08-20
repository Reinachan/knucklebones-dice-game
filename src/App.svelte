<script lang="ts">
	import { validate_each_argument } from 'svelte/internal';
	import calculateRowValue from './helpers/calculateRowValue';

	import Player from './lib/Player.svelte';

	import type { Board } from './types/board';
	import { PlayerNum } from './types/PlayerNum';

	let player1: Board = [[], [], []];
	let player2: Board = [[], [], []];

	let turn = PlayerNum.Start;

	let victoryMessage = null;

	const switchTurn = (nextTurn: PlayerNum) => {
		switch (nextTurn) {
			case PlayerNum.One: {
				turn = PlayerNum.Two;
				checkVictory(player1);
				break;
			}
			case PlayerNum.Two: {
				turn = PlayerNum.One;
				checkVictory(player2);
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
			const p1Value = valueOfPlayer(player1);
			const p2Value = valueOfPlayer(player2);

			if (p1Value === p2Value) {
				victoryMessage = `Tie at ${p1Value}x${p2Value}`;
			}
			if (p1Value > p2Value) {
				victoryMessage = `Player 1 wins ${p1Value}x${p2Value}`;
			}
			if (p1Value < p2Value) {
				victoryMessage = `Player 2 wins ${p2Value}x${p1Value}`;
			}
			turn = PlayerNum.End;
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
	{#if turn === PlayerNum.Start}
		<h1>Knucklebones</h1>

		<h2>Rules</h2>
		<p>Multiple dice of the same value on the same column gets multiplied.</p>
		<p>
			Placing a dice of the same value on the same column as your opponent will
			destroy their dice.
		</p>
		<p>When a player fills their board, the player with the most points win.</p>
		<br />
		<button
			on:click={() => {
				turn = PlayerNum.One;
			}}>Start Game</button
		>

		<footer>
			<p>
				<a href="https://github.com/Reinachan/knucklebones-dice-game"
					>Source code</a
				> is available on GitHub!
			</p>
			<p>
				<a href="https://www.flaticon.com/free-icons/dice" title="dice icons">
					Dice icons created by<wbr /> Google - Flaticon
				</a>
			</p>
			<p>Game based on Knucklebones from Cult of the Lamb</p>
		</footer>
	{/if}
	{#if turn !== PlayerNum.Start}
		<div class="boards">
			<Player
				board={player1}
				setBoard={setPlayer1}
				{switchTurn}
				playerNum={PlayerNum.One}
				active={!!victoryMessage ? false : turn === PlayerNum.One}
				{attack}
			/>
			{#if turn !== PlayerNum.End}
				<h2>Player {turn}'s turn</h2>
			{/if}
			{#if turn === PlayerNum.End}
				<h2>
					{victoryMessage}
				</h2>
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
	{/if}
</main>

<style>
	.boards {
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: auto;
		grid-template-areas:
			'player1'
			'turn'
			'player2';
		gap: 1rem;
		width: 100%;
	}

	h2 {
		grid-area: turn;
	}

	h1 {
		font-size: clamp(1rem, 8.5vw, 4rem);
	}

	footer {
		margin-top: 5rem;
	}
</style>
