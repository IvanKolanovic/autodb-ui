<script lang="ts">
	import { onMount } from 'svelte';
	import {
		getDashboardAnalytics,
		type RecentRecall,
		type RecallsByManufacturer,
		type MostRecalledVehicle
	} from '$lib/api/dashboard-api';
	import { Skeleton } from '$lib/components/ui/skeleton';
	import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';

	// Mock data for dashboard stats
	const stats = [
		{ title: 'Total Vehicles', value: '24,583', change: '+5.2%', changeType: 'positive' },
		{ title: 'Active Recalls', value: '1,245', change: '-2.1%', changeType: 'negative' },
		{ title: 'Safety Complaints', value: '3,782', change: '+1.8%', changeType: 'positive' },
		{ title: 'Investigations', value: '142', change: '0%', changeType: 'neutral' }
	];

	// State for dashboard data
	let recentRecalls: RecentRecall[] = [];
	let recallsByManufacturer: RecallsByManufacturer[] = [];
	let mostRecalledVehicles: MostRecalledVehicle[] = [];
	let isLoading = true;
	let error: string | null = null;

	// Calculate the maximum recall count for the bar chart
	$: maxRecallCount = recallsByManufacturer.length
		? Math.max(...recallsByManufacturer.map((item) => item.recallCount))
		: 0;

	// Fetch dashboard data on component mount
	onMount(async () => {
		try {
			const response = await getDashboardAnalytics(10, 10, 5);
			if (response.isSuccess) {
				recentRecalls = response.data.recentRecalls;
				recallsByManufacturer = response.data.recallsByManufacturer || [];
				mostRecalledVehicles = response.data.mostRecalledVehicles || [];
			} else {
				error = response.error || 'Failed to fetch dashboard data';
			}
		} catch (err) {
			error = err instanceof Error ? err.message : 'An unknown error occurred';
		} finally {
			isLoading = false;
		}
	});
</script>

<div class="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
	{#each stats as stat}
		<div class="rounded-lg bg-white p-4 shadow">
			<h3 class="text-sm font-medium text-gray-500">{stat.title}</h3>
			<div class="mt-1 flex items-baseline">
				<p class="text-2xl font-semibold text-gray-900">{stat.value}</p>
				<p
					class="ml-2 text-sm font-medium {stat.changeType === 'positive'
						? 'text-green-600'
						: stat.changeType === 'negative'
							? 'text-red-600'
							: 'text-gray-500'}"
				>
					{stat.change}
				</p>
			</div>
		</div>
	{/each}
</div>

<div class="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
	<!-- Top Manufacturers by Recalls -->
	<Card>
		<CardHeader>
			<CardTitle>Top Manufacturers by Recalls</CardTitle>
		</CardHeader>
		<CardContent>
			{#if isLoading}
				<div class="space-y-2">
					{#each Array(5) as _}
						<Skeleton class="h-10 w-full" />
					{/each}
				</div>
			{:else if error}
				<div class="p-4 text-center text-red-500">
					<p>Error loading data: {error}</p>
				</div>
			{:else if recallsByManufacturer.length === 0}
				<div class="p-4 text-center text-gray-500">
					<p>No manufacturer data found</p>
				</div>
			{:else}
				<div class="space-y-4">
					{#each recallsByManufacturer as item}
						<div class="space-y-1">
							<div class="flex items-center justify-between">
								<span class="text-sm font-medium">{item.manufacturer}</span>
								<span class="text-sm font-medium">{item.recallCount}</span>
							</div>
							<div class="h-2 w-full overflow-hidden rounded-full bg-gray-200">
								<div
									class="h-full rounded-full bg-blue-600"
									style="width: {(item.recallCount / maxRecallCount) * 100}%"
								></div>
							</div>
						</div>
					{/each}
				</div>
			{/if}
		</CardContent>
	</Card>

	<!-- Most Recalled Vehicles -->
	<Card>
		<CardHeader>
			<CardTitle>Most Recalled Manufacturer by Problem</CardTitle>
		</CardHeader>
		<CardContent>
			{#if isLoading}
				<div class="space-y-2">
					{#each Array(5) as _}
						<Skeleton class="h-16 w-full" />
					{/each}
				</div>
			{:else if error}
				<div class="p-4 text-center text-red-500">
					<p>Error loading data: {error}</p>
				</div>
			{:else if mostRecalledVehicles.length === 0}
				<div class="p-4 text-center text-gray-500">
					<p>No vehicle data found</p>
				</div>
			{:else}
				<div class="space-y-4">
					{#each mostRecalledVehicles as item, i}
						<div class="rounded-lg border border-gray-200 p-3">
							<div class="flex items-start justify-between">
								<div>
									<div class="flex items-center">
										<span
											class="mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 text-sm font-medium"
											>{i + 1}</span
										>
										<h4 class="font-medium">{item.manufacturer}</h4>
									</div>
									<p class="mt-1 text-sm text-gray-600">{item.issueDescription}</p>
								</div>
								<div
									class="ml-4 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600"
								>
									<span class="font-medium">{item.recallCount}</span>
								</div>
							</div>
						</div>
					{/each}
				</div>
			{/if}
		</CardContent>
	</Card>
</div>

<!-- Recent recalls - now full width -->
<div class="mb-8 rounded-lg bg-white p-4 shadow">
	<h3 class="mb-4 text-lg font-medium text-gray-900">Recent Recalls</h3>
	<div class="overflow-x-auto">
		{#if isLoading}
			<div class="space-y-2">
				{#each Array(5) as _}
					<Skeleton class="h-12 w-full" />
				{/each}
			</div>
		{:else if error}
			<div class="p-4 text-center text-red-500">
				<p>Error loading recalls: {error}</p>
			</div>
		{:else if recentRecalls.length === 0}
			<div class="p-4 text-center text-gray-500">
				<p>No recent recalls found</p>
			</div>
		{:else}
			<table class="min-w-full divide-y divide-gray-200">
				<thead class="bg-gray-50">
					<tr>
						<th
							class="px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
							>Manufacturer</th
						>
						<th
							class="px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
							>Subject</th
						>
						<th
							class="px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
							>Component</th
						>
						<th
							class="px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
							>Date</th
						>
						<th
							class="px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
							>NHTSA ID</th
						>
					</tr>
				</thead>
				<tbody class="divide-y divide-gray-200 bg-white">
					{#each recentRecalls as recall}
						<tr>
							<td class="px-4 py-3 text-sm whitespace-nowrap text-gray-900"
								>{recall.manufacturer}</td
							>
							<td class="px-4 py-3 text-sm text-gray-500">{recall.subject}</td>
							<td class="px-4 py-3 text-sm text-gray-500">{recall.component || 'N/A'}</td>
							<td class="px-4 py-3 text-sm whitespace-nowrap text-gray-500"
								>{recall.reportReceivedDate}</td
							>
							<td class="px-4 py-3 text-sm whitespace-nowrap text-gray-500">{recall.nhtsaId}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		{/if}
	</div>
</div>
