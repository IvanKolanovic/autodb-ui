<script lang="ts">
	// Mock data for dashboard stats
	const stats = [
		{ title: 'Total Vehicles', value: '24,583', change: '+5.2%', changeType: 'positive' },
		{ title: 'Active Recalls', value: '1,245', change: '-2.1%', changeType: 'negative' },
		{ title: 'Safety Complaints', value: '3,782', change: '+1.8%', changeType: 'positive' },
		{ title: 'Investigations', value: '142', change: '0%', changeType: 'neutral' }
	];

	// Mock data for popular searches
	const popularSearches = [
		'Toyota Camry',
		'Honda Civic',
		'Ford F-150',
		'Tesla Model 3',
		'Chevrolet Silverado'
	];

	// Mock data for recent recalls
	const recentRecalls = [
		{
			make: 'Toyota',
			model: 'RAV4',
			year: 2022,
			issue: 'Brake system malfunction',
			date: '2023-05-15'
		},
		{
			make: 'Ford',
			model: 'Explorer',
			year: 2021,
			issue: 'Airbag deployment issue',
			date: '2023-05-10'
		},
		{
			make: 'Honda',
			model: 'Accord',
			year: 2023,
			issue: 'Steering control problem',
			date: '2023-05-08'
		},
		{
			make: 'Tesla',
			model: 'Model Y',
			year: 2022,
			issue: 'Software update required',
			date: '2023-05-01'
		}
	];
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

<div class="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
	<!-- Recent recalls -->
	<div class="rounded-lg bg-white p-4 shadow lg:col-span-2">
		<h3 class="mb-4 text-lg font-medium text-gray-900">Recent Recalls</h3>
		<div class="overflow-x-auto">
			<table class="min-w-full divide-y divide-gray-200">
				<thead class="bg-gray-50">
					<tr>
						<th
							class="px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
							>Vehicle</th
						>
						<th
							class="px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
							>Issue</th
						>
						<th
							class="px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
							>Date</th
						>
					</tr>
				</thead>
				<tbody class="divide-y divide-gray-200 bg-white">
					{#each recentRecalls as recall}
						<tr>
							<td class="px-4 py-3 text-sm whitespace-nowrap text-gray-900"
								>{recall.year} {recall.make} {recall.model}</td
							>
							<td class="px-4 py-3 text-sm text-gray-500">{recall.issue}</td>
							<td class="px-4 py-3 text-sm whitespace-nowrap text-gray-500">{recall.date}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>

	<!-- Popular searches -->
	<div class="rounded-lg bg-white p-4 shadow">
		<h3 class="mb-4 text-lg font-medium text-gray-900">Popular Searches</h3>
		<ul class="space-y-3">
			{#each popularSearches as search, i}
				<li class="flex items-center">
					<span
						class="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-gray-100 text-sm font-medium text-gray-800"
						>{i + 1}</span
					>
					<span class="ml-3 text-gray-700">{search}</span>
				</li>
			{/each}
		</ul>
	</div>
</div>

<div class="mb-8 rounded-lg bg-white p-4 shadow">
	<h3 class="mb-4 text-lg font-medium text-gray-900">Vehicle Safety Trends</h3>
	<div class="flex h-64 items-center justify-center rounded bg-gray-100">
		<p class="text-gray-500">Chart placeholder - Vehicle safety data visualization</p>
	</div>
</div>
