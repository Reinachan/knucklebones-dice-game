<script lang="ts">
	import dice1 from '../assets/dice1.png';
	import dice2 from '../assets/dice2.png';
	import dice3 from '../assets/dice3.png';
	import dice4 from '../assets/dice4.png';
	import dice5 from '../assets/dice5.png';
	import dice6 from '../assets/dice6.png';

	export let die: number;
</script>

{#if die === 1}
	<img src={dice1} alt="dice 1" class="dice" />
{/if}

{#if die === 2}
	<img src={dice2} alt="dice 2" class="dice" />
{/if}

{#if die === 3}
	<img src={dice3} alt="dice 3" class="dice" />
{/if}

{#if die === 4}
	<img src={dice4} alt="dice 4" class="dice" />
{/if}

{#if die === 5}
	<img src={dice5} alt="dice 5" class="dice" />
{/if}

{#if die === 6}
	<img src={dice6} alt="dice 6" class="dice" />
{/if}
