<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let currentPage = 1;
	export let totalPages = 1;
	export let maxVisiblePages = 5;

	const dispatch = createEventDispatcher<{
		pageChange: { page: number };
	}>();

	function goToPage(page: number) {
		if (page !== currentPage && page >= 1 && page <= totalPages) {
			dispatch('pageChange', { page });
		}
	}

	$: pages = getVisiblePages(currentPage, totalPages, maxVisiblePages);

	function getVisiblePages(current: number, total: number, max: number): number[] {
		if (total <= max) {
			return Array.from({ length: total }, (_, i) => i + 1);
		}

		const half = Math.floor(max / 2);
		let start = current - half;
		let end = current + half;

		if (start < 1) {
			end += 1 - start;
			start = 1;
		}

		if (end > total) {
			start -= end - total;
			end = total;
		}

		start = Math.max(start, 1);

		return Array.from({ length: end - start + 1 }, (_, i) => start + i);
	}
</script>

<div class="my-4 flex items-center justify-center space-x-2">
	<!-- Previous button -->
	<button
		class="rounded border border-gray-300 px-3 py-1 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
		disabled={currentPage === 1}
		on:click={() => goToPage(currentPage - 1)}
	>
		Previous
	</button>

	<!-- First page if not visible -->
	{#if !pages.includes(1)}
		<button
			class="rounded border border-gray-300 px-3 py-1 hover:bg-gray-100"
			on:click={() => goToPage(1)}
		>
			1
		</button>
		{#if !pages.includes(2)}
			<span class="px-1">...</span>
		{/if}
	{/if}

	<!-- Page numbers -->
	{#each pages as page}
		<button
			class="rounded border px-3 py-1 {currentPage === page
				? 'bg-primary text-white'
				: 'border-gray-300 hover:bg-gray-100'}"
			on:click={() => goToPage(page)}
		>
			{page}
		</button>
	{/each}

	<!-- Last page if not visible -->
	{#if !pages.includes(totalPages) && totalPages > 1}
		{#if !pages.includes(totalPages - 1)}
			<span class="px-1">...</span>
		{/if}
		<button
			class="rounded border border-gray-300 px-3 py-1 hover:bg-gray-100"
			on:click={() => goToPage(totalPages)}
		>
			{totalPages}
		</button>
	{/if}

	<!-- Next button -->
	<button
		class="rounded border border-gray-300 px-3 py-1 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
		disabled={currentPage === totalPages}
		on:click={() => goToPage(currentPage + 1)}
	>
		Next
	</button>
</div>
