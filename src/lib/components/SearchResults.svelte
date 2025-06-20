<script lang="ts">
	import type { VehicleResult, Pagination } from '$lib/types/vehicle';
	import VehicleCard from './VehicleCard.svelte';
	import PaginationComponent from './Pagination.svelte';

	export let results: VehicleResult[] = [];
	export let pagination: Pagination | null = null;
	export let isLoading = false;
	export let searchQuery = '';

	// Calculate total pages based on pagination data
	$: totalPages = pagination ? Math.ceil(pagination.total / pagination.max) : 1;
	$: currentPage = pagination ? Math.floor(pagination.offset / pagination.max) + 1 : 1;

	function handlePageChange(event: CustomEvent<{ page: number }>) {
		const newPage = event.detail.page;
		const newOffset = (newPage - 1) * (pagination?.max || 20);

		// Dispatch event to parent component to handle the page change
		dispatch('pageChange', { offset: newOffset, max: pagination?.max || 20 });
	}

	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher<{
		pageChange: { offset: number; max: number };
	}>();
</script>

<div class="mt-6">
	{#if isLoading}
		<div class="flex items-center justify-center py-12">
			<div class="border-primary h-12 w-12 animate-spin rounded-full border-t-2 border-b-2"></div>
		</div>
	{:else if results.length === 0}
		<div class="rounded-lg bg-white p-8 text-center shadow">
			<h3 class="mb-2 text-lg font-medium text-gray-900">No vehicles found</h3>
			<p class="text-gray-500">Try adjusting your search query</p>
		</div>
	{:else}
		<div class="mb-4">
			<h2 class="text-lg font-medium text-gray-900">
				Search results for "{searchQuery}"
				{#if pagination}
					<span class="text-sm font-normal text-gray-500">
						(Showing {pagination.offset + 1}-{Math.min(
							pagination.offset + results.length,
							pagination.total
						)} of {pagination.total})
					</span>
				{/if}
			</h2>
		</div>

		<div class="space-y-4">
			{#each results as vehicle (vehicle.vehicleId)}
				<VehicleCard {vehicle} />
			{/each}
		</div>

		{#if pagination && pagination.total > pagination.max}
			<PaginationComponent {currentPage} {totalPages} on:pageChange={handlePageChange} />
		{/if}
	{/if}
</div>
