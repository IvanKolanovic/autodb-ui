<script lang="ts">
	import { onMount, afterUpdate } from 'svelte';
	import {
		getDashboardAnalytics,
		type RecentRecall,
		type RecallsByManufacturer,
		type MostRecalledVehicle,
		type RecallsByYear,
		type CrashTestPerformance,
		type RolloverResistanceData
	} from '$lib/api/dashboard-api';
	import { Skeleton } from '$lib/components/ui/skeleton';
	import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';
	import {
		Chart,
		BarController,
		CategoryScale,
		LinearScale,
		BarElement,
		Title,
		Tooltip,
		Legend,
		ScatterController,
		PointElement
	} from 'chart.js';

	// Register Chart.js components
	Chart.register(
		BarController,
		CategoryScale,
		LinearScale,
		BarElement,
		Title,
		Tooltip,
		Legend,
		ScatterController,
		PointElement
	);

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
	let recallsByYear: RecallsByYear[] = [];
	let crashTestPerformance: CrashTestPerformance[] = [];
	let rolloverResistanceData: RolloverResistanceData[] = [];
	let isLoading = true;
	let error: string | null = null;

	// Chart references
	let yearChartCanvas: HTMLCanvasElement;
	let manufacturerChartCanvas: HTMLCanvasElement;
	let crashTestChartCanvas: HTMLCanvasElement;
	let rolloverChartCanvas: HTMLCanvasElement;
	let yearChart: Chart | null = null;
	let manufacturerChart: Chart | null = null;
	let crashTestChart: Chart | null = null;
	let rolloverChart: Chart | null = null;

	// Calculate the maximum recall count for the bar chart
	$: maxRecallCount = recallsByManufacturer.length
		? Math.max(...recallsByManufacturer.map((item) => item.recallCount))
		: 0;

	// Update year chart when data changes
	$: if (yearChartCanvas && recallsByYear.length > 0 && !isLoading) {
		updateYearChart();
	}

	// Update manufacturer chart when data changes
	$: if (manufacturerChartCanvas && recallsByManufacturer.length > 0 && !isLoading) {
		updateManufacturerChart();
	}

	// Update crash test chart when data changes
	$: if (crashTestChartCanvas && crashTestPerformance.length > 0 && !isLoading) {
		updateCrashTestChart();
	}

	// Update rollover chart when data changes
	$: if (rolloverChartCanvas && rolloverResistanceData.length > 0 && !isLoading) {
		updateRolloverChart();
	}

	// Function to create or update the year chart
	function updateYearChart() {
		if (yearChart) {
			yearChart.destroy();
		}

		const ctx = yearChartCanvas.getContext('2d');
		if (!ctx) return;

		yearChart = new Chart(ctx, {
			type: 'bar',
			data: {
				labels: recallsByYear.map((item) => item.year.toString()),
				datasets: [
					{
						label: 'Number of Recalls',
						data: recallsByYear.map((item) => item.count),
						backgroundColor: 'rgba(59, 130, 246, 0.8)', // blue-500 with opacity
						borderColor: 'rgb(37, 99, 235)', // blue-600
						borderWidth: 1
					}
				]
			},
			options: {
				responsive: true,
				maintainAspectRatio: false,
				plugins: {
					legend: {
						display: false
					},
					title: {
						display: false
					},
					tooltip: {
						callbacks: {
							title: (tooltipItems: any[]) => {
								return `Year: ${tooltipItems[0].label}`;
							},
							label: (tooltipItem: any) => {
								return `Recalls: ${tooltipItem.raw}`;
							}
						}
					}
				},
				scales: {
					y: {
						beginAtZero: true,
						grid: {
							color: 'rgba(156, 163, 175, 0.2)' // gray-400 with opacity
						},
						ticks: {
							font: {
								size: 12
							}
						}
					},
					x: {
						grid: {
							display: false
						},
						ticks: {
							font: {
								size: 12
							}
						}
					}
				}
			}
		});
	}

	// Function to create or update the manufacturer chart
	function updateManufacturerChart() {
		if (manufacturerChart) {
			manufacturerChart.destroy();
		}

		const ctx = manufacturerChartCanvas.getContext('2d');
		if (!ctx) return;

		manufacturerChart = new Chart(ctx, {
			type: 'bar',
			data: {
				labels: recallsByManufacturer.map((item) => item.manufacturer),
				datasets: [
					{
						label: 'Number of Recalls',
						data: recallsByManufacturer.map((item) => item.recallCount),
						backgroundColor: 'rgba(59, 130, 246, 0.8)', // blue-500 with opacity
						borderColor: 'rgb(37, 99, 235)', // blue-600
						borderWidth: 1
					}
				]
			},
			options: {
				indexAxis: 'y', // Horizontal bar chart
				responsive: true,
				maintainAspectRatio: false,
				plugins: {
					legend: {
						display: false
					},
					title: {
						display: false
					},
					tooltip: {
						callbacks: {
							label: (tooltipItem: any) => {
								return `Recalls: ${tooltipItem.raw}`;
							}
						}
					}
				},
				scales: {
					y: {
						grid: {
							display: false
						},
						ticks: {
							font: {
								size: 12
							}
						}
					},
					x: {
						beginAtZero: true,
						grid: {
							color: 'rgba(156, 163, 175, 0.2)' // gray-400 with opacity
						},
						ticks: {
							font: {
								size: 12
							}
						}
					}
				}
			}
		});
	}

	// Function to create or update the crash test performance chart
	function updateCrashTestChart() {
		if (crashTestChart) {
			crashTestChart.destroy();
		}

		const ctx = crashTestChartCanvas.getContext('2d');
		if (!ctx) return;

		crashTestChart = new Chart(ctx, {
			type: 'bar',
			data: {
				labels: crashTestPerformance.map((item) => item.manufacturer),
				datasets: [
					{
						label: 'Passed Tests',
						data: crashTestPerformance.map((item) => item.passedTests),
						backgroundColor: 'rgba(34, 197, 94, 0.8)', // green-500 with opacity
						borderColor: 'rgb(22, 163, 74)', // green-600
						borderWidth: 1
					},
					{
						label: 'Failed Tests',
						data: crashTestPerformance.map((item) => item.failedTests),
						backgroundColor: 'rgba(239, 68, 68, 0.8)', // red-500 with opacity
						borderColor: 'rgb(220, 38, 38)', // red-600
						borderWidth: 1
					}
				]
			},
			options: {
				responsive: true,
				maintainAspectRatio: false,
				plugins: {
					legend: {
						position: 'top'
					},
					title: {
						display: false
					},
					tooltip: {
						callbacks: {
							label: (tooltipItem: any) => {
								const dataset = tooltipItem.dataset.label;
								const value = tooltipItem.raw;
								const totalTests = crashTestPerformance[tooltipItem.dataIndex].totalTests;
								const percentage = ((value / totalTests) * 100).toFixed(1);
								return `${dataset}: ${value} (${percentage}%)`;
							}
						}
					}
				},
				scales: {
					y: {
						beginAtZero: true,
						stacked: false,
						grid: {
							color: 'rgba(156, 163, 175, 0.2)' // gray-400 with opacity
						},
						ticks: {
							font: {
								size: 12
							}
						}
					},
					x: {
						stacked: false,
						grid: {
							display: false
						},
						ticks: {
							font: {
								size: 12
							}
						}
					}
				}
			}
		});
	}

	// Function to create or update the rollover resistance chart
	function updateRolloverChart() {
		if (rolloverChart) {
			rolloverChart.destroy();
		}

		const ctx = rolloverChartCanvas.getContext('2d');
		if (!ctx) return;

		rolloverChart = new Chart(ctx, {
			type: 'scatter',
			data: {
				datasets: [
					{
						label: 'Rollover Resistance vs. Vehicle Weight',
						data: rolloverResistanceData.map((item) => ({
							x: item.weight,
							y: item.rolloverResistance
						})),
						backgroundColor: 'rgba(99, 102, 241, 0.8)', // indigo-500 with opacity
						borderColor: 'rgb(79, 70, 229)', // indigo-600
						borderWidth: 1,
						pointRadius: 6,
						pointHoverRadius: 8
					}
				]
			},
			options: {
				responsive: true,
				maintainAspectRatio: false,
				plugins: {
					tooltip: {
						callbacks: {
							label: (tooltipItem: any) => {
								const index = tooltipItem.dataIndex;
								const item = rolloverResistanceData[index];
								return [
									`Manufacturer: ${item.manufacturer}`,
									`Model: ${item.model}`,
									`Weight: ${item.weight} lbs`,
									`Rollover Resistance: ${item.rolloverResistance.toFixed(2)}`
								];
							}
						}
					}
				},
				scales: {
					y: {
						title: {
							display: true,
							text: 'Rollover Resistance'
						},
						beginAtZero: true,
						grid: {
							color: 'rgba(156, 163, 175, 0.2)' // gray-400 with opacity
						}
					},
					x: {
						title: {
							display: true,
							text: 'Vehicle Weight (lbs)'
						},
						grid: {
							color: 'rgba(156, 163, 175, 0.2)' // gray-400 with opacity
						}
					}
				}
			}
		});
	}

	// Fetch dashboard data on component mount
	onMount(async () => {
		try {
			const response = await getDashboardAnalytics(10, 10, 5);
			if (response.isSuccess) {
				recentRecalls = response.data.recentRecalls;
				recallsByManufacturer = response.data.recallsByManufacturer || [];
				mostRecalledVehicles = response.data.mostRecalledVehicles || [];
				recallsByYear = response.data.recallsByYear || [];
				crashTestPerformance = response.data.crashTestPerformance || [];
				rolloverResistanceData = response.data.rolloverResistanceData || [];
			} else {
				error = response.error || 'Failed to fetch dashboard data';
			}
		} catch (err) {
			error = err instanceof Error ? err.message : 'An unknown error occurred';
		} finally {
			isLoading = false;
		}
	});

	// Clean up charts when component is destroyed
	onMount(() => {
		return () => {
			if (yearChart) {
				yearChart.destroy();
			}
			if (manufacturerChart) {
				manufacturerChart.destroy();
			}
			if (crashTestChart) {
				crashTestChart.destroy();
			}
			if (rolloverChart) {
				rolloverChart.destroy();
			}
		};
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

<!-- Recalls by Year Chart using Chart.js -->
<div class="mb-8">
	<Card>
		<CardHeader>
			<CardTitle>Total Number of Recalls by Year</CardTitle>
		</CardHeader>
		<CardContent>
			{#if isLoading}
				<div class="h-[400px]">
					<Skeleton class="h-full w-full" />
				</div>
			{:else if error}
				<div class="p-4 text-center text-red-500">
					<p>Error loading data: {error}</p>
				</div>
			{:else if recallsByYear.length === 0}
				<div class="p-4 text-center text-gray-500">
					<p>No yearly recall data found</p>
				</div>
			{:else}
				<div class="h-[400px] w-full">
					<canvas bind:this={yearChartCanvas}></canvas>
				</div>
			{/if}
		</CardContent>
	</Card>
</div>

<div class="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
	<!-- Top Manufacturers by Recalls -->
	<Card>
		<CardHeader>
			<CardTitle>Top Manufacturers by Recalls</CardTitle>
		</CardHeader>
		<CardContent>
			{#if isLoading}
				<div class="h-[400px]">
					<Skeleton class="h-full w-full" />
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
				<div class="h-[400px] w-full">
					<canvas bind:this={manufacturerChartCanvas}></canvas>
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

<!-- New charts section -->
<div class="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
	<!-- Crash Test Performance Chart -->
	<Card>
		<CardHeader>
			<CardTitle>Crash Test Performance by Manufacturer</CardTitle>
		</CardHeader>
		<CardContent>
			{#if isLoading}
				<div class="h-[400px]">
					<Skeleton class="h-full w-full" />
				</div>
			{:else if error}
				<div class="p-4 text-center text-red-500">
					<p>Error loading data: {error}</p>
				</div>
			{:else if crashTestPerformance.length === 0}
				<div class="p-4 text-center text-gray-500">
					<p>No crash test data found</p>
				</div>
			{:else}
				<div class="h-[400px] w-full">
					<canvas bind:this={crashTestChartCanvas}></canvas>
				</div>
			{/if}
		</CardContent>
	</Card>

	<!-- Rollover Resistance vs. Vehicle Weight Chart -->
	<Card>
		<CardHeader>
			<CardTitle>Rollover Resistance vs. Vehicle Weight</CardTitle>
		</CardHeader>
		<CardContent>
			{#if isLoading}
				<div class="h-[400px]">
					<Skeleton class="h-full w-full" />
				</div>
			{:else if error}
				<div class="p-4 text-center text-red-500">
					<p>Error loading data: {error}</p>
				</div>
			{:else if rolloverResistanceData.length === 0}
				<div class="p-4 text-center text-gray-500">
					<p>No rollover resistance data found</p>
				</div>
			{:else}
				<div class="h-[400px] w-full">
					<canvas bind:this={rolloverChartCanvas}></canvas>
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
