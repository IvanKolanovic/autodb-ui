<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import SearchBar from '$lib/components/SearchBar.svelte';
	import SearchResults from '$lib/components/SearchResults.svelte';
	import { searchVehicles } from '$lib/api/vehicle-api';
	import type { VehicleResult, Pagination } from '$lib/types/vehicle';

	let searchQuery = $state('');
	let results: VehicleResult[] = $state([]);
	let pagination: Pagination | null = $state(null);
	let isLoading = $state(false);
	let error: string | null = $state(null);

	// Get the search query from URL parameters
	$effect(() => {
		const urlQuery = $page.url.searchParams.get('q');
		if (urlQuery && urlQuery !== searchQuery) {
			searchQuery = urlQuery;
			performSearch(searchQuery);
		}
	});

	// Function to perform the search
	async function performSearch(query: string, offset = 0, max = 20) {
		if (!query) return;

		isLoading = true;
		error = null;

		try {
			const response = await searchVehicles(query, offset, max);

			if (response.isSuccess) {
				results = response.data.results;
				pagination = response.data.meta.pagination;
			} else {
				error = 'Failed to fetch search results';
				results = [];
				pagination = null;
			}
		} catch (err) {
			console.error('Error searching vehicles:', err);
			error = 'An error occurred while searching';
			results = [];
			pagination = null;
		} finally {
			isLoading = false;
		}
	}

	// Handle search from the search bar
	function handleSearch(event: CustomEvent<{ query: string }>) {
		const query = event.detail.query;
		if (query) {
			// Update URL without reloading the page
			const url = new URL(window.location.href);
			url.searchParams.set('q', query);
			window.history.pushState({}, '', url);

			searchQuery = query;
			performSearch(query);
		}
	}

	// Handle page change from pagination component
	function handlePageChange(event: CustomEvent<{ offset: number; max: number }>) {
		const { offset, max } = event.detail;
		performSearch(searchQuery, offset, max);

		// Scroll to top when changing pages
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}
</script>

<svelte:head>
	<title>Search Results - AutoDB</title>
</svelte:head>

<div class="space-y-6">
	<div>
		<h1 class="text-2xl font-bold text-gray-900">Vehicle Search</h1>
		<div class="mt-4">
			<SearchBar on:search={handleSearch} value={searchQuery} />
		</div>
	</div>

	{#if error}
		<div class="rounded-md bg-red-50 p-4">
			<div class="flex">
				<div class="flex-shrink-0">
					<svg
						class="h-5 w-5 text-red-400"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<path
							fill-rule="evenodd"
							d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
							clip-rule="evenodd"
						/>
					</svg>
				</div>
				<div class="ml-3">
					<h3 class="text-sm font-medium text-red-800">Error</h3>
					<div class="mt-2 text-sm text-red-700">
						<p>{error}</p>
					</div>
				</div>
			</div>
		</div>
	{/if}

	<SearchResults
		{results}
		{pagination}
		{isLoading}
		{searchQuery}
		on:pageChange={handlePageChange}
	/>
</div>
