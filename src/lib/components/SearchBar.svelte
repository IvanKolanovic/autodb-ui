<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { z } from 'zod';

	const dispatch = createEventDispatcher<{
		search: { query: string };
	}>();

	export let placeholder = 'Search for cars (e.g. "Audi Q3")';
	export let value = '';

	const searchSchema = z.string().min(2, {
		message: 'Search query must be at least 2 characters'
	});

	let error: string | null = null;

	function handleSearch() {
		try {
			searchSchema.parse(value);
			error = null;
			dispatch('search', { query: value });
		} catch (e) {
			if (e instanceof z.ZodError) {
				error = e.errors[0].message;
			} else {
				error = 'An error occurred';
			}
		}
	}

	function handleKeyDown(event: KeyboardEvent) {
		if (event.key === 'Enter') {
			event.preventDefault();
			handleSearch();
		}
	}
</script>

<div class="mx-auto flex w-full max-w-2xl flex-col">
	<div class="flex w-full gap-2">
		<input
			type="text"
			bind:value
			{placeholder}
			on:keydown={handleKeyDown}
			class="focus:ring-primary flex-1 rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:outline-none"
		/>
		<button
			on:click={handleSearch}
			class="bg-primary hover:bg-primary/90 focus:ring-primary rounded-md px-4 py-2 text-white focus:ring-2 focus:ring-offset-2 focus:outline-none"
		>
			Search
		</button>
	</div>
	{#if error}
		<p class="mt-1 text-sm text-red-500">{error}</p>
	{/if}
</div>
