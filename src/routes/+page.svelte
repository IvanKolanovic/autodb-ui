<script lang="ts">
	import { goto } from '$app/navigation';
	import SearchBar from '$lib/components/SearchBar.svelte';
	import Dashboard from '$lib/components/Dashboard.svelte';

	let searchQuery = '';

	function handleSearch(event: CustomEvent<{ query: string }>) {
		const query = event.detail.query;
		if (query) {
			goto(`/search?q=${encodeURIComponent(query)}`);
		}
	}
</script>

<svelte:head>
	<title>AutoDB - Car Research Dashboard</title>
</svelte:head>

<div class="space-y-8">
	<div class="text-center">
		<h1 class="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">Research Cars with AutoDB</h1>
		<p class="mx-auto max-w-2xl text-lg text-gray-500">
			Find detailed information about vehicles, recalls, safety ratings, and more.
		</p>

		<div class="mt-8">
			<SearchBar on:search={handleSearch} bind:value={searchQuery} />
		</div>
	</div>

	<Dashboard />
</div>
