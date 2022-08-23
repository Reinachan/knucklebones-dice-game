<script lang="ts">
	export let start: () => void;
	export let startMobileMode: () => void;
</script>

<div class="info">
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
			start();
		}}>Start Desktop Mode</button
	>
	<button
		on:click={() => {
			startMobileMode();
		}}>Start Mobile Mode</button
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
</div>
