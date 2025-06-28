<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import type { DetailedVehicleResult, ApiResponse } from '$lib/types/vehicle';
	import { getVehicleByYMMT } from '$lib/api/vehicle-api';

	let vehicle: DetailedVehicleResult | null = $state(null);
	let isLoading = $state(true);
	let error: string | null = $state(null);

	const vehicleId = $page.params.id;

	// Tabs for vehicle details
	const tabs = [
		{ id: 'overview', label: 'Overview' },
		{ id: 'recalls', label: 'Recalls' },
		{ id: 'complaints', label: 'Complaints' },
		{ id: 'safety', label: 'Safety Ratings' }
	];

	let activeTab = $state('overview');

	onMount(async () => {
		try {
			// Parse the vehicle ID to extract YMMT parameters
			// Expected format: modelYear-make-model-trim-series
			const decodedId = decodeURIComponent(vehicleId);
			const parts = decodedId.split('-');
			if (parts.length < 3) {
				error = 'Invalid vehicle ID format';
				isLoading = false;
				return;
			}

			const modelYear = parseInt(parts[0], 10);
			const make = parts[1];
			const model = parts[2];
			const trim = parts.length > 3 ? parts[3] : undefined;
			const series = parts.length > 4 ? parts[4] : undefined;

			console.log('Fetching vehicle with params:', { modelYear, make, model, trim, series });

			// Get detailed vehicle info using the YMMT endpoint
			const detailedResponse = await getVehicleByYMMT(modelYear, make, model, trim, series);

			console.log('API response:', detailedResponse);

			if (detailedResponse.data.results && detailedResponse.data.results.length > 0) {
				// The API response should include safety ratings and safety issues
				vehicle = detailedResponse.data.results[0];
			} else {
				error = 'Vehicle not found';
			}
		} catch (err) {
			error = 'An error occurred while loading vehicle data';
			console.error(err);
		} finally {
			isLoading = false;
		}
	});

	function setActiveTab(tabId: string) {
		activeTab = tabId;
	}

	// Helper function to format a date string
	function formatDate(dateString: string | null): string {
		if (!dateString) return 'N/A';

		try {
			const date = new Date(dateString);
			return date.toLocaleDateString('en-US', {
				year: 'numeric',
				month: 'long',
				day: 'numeric'
			});
		} catch (e) {
			return dateString;
		}
	}
</script>

<svelte:head>
	<title
		>{vehicle ? `${vehicle.modelYear} ${vehicle.make} ${vehicle.vehicleModel}` : 'Vehicle Details'} -
		AutoDB</title
	>
</svelte:head>

<div>
	{#if isLoading}
		<div class="flex items-center justify-center py-12">
			<div class="border-primary h-12 w-12 animate-spin rounded-full border-t-2 border-b-2"></div>
		</div>
	{:else if error}
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
	{:else if vehicle}
		<div class="overflow-hidden rounded-lg bg-white shadow">
			<!-- Vehicle header -->
			<div class="flex items-start px-4 py-5 sm:px-6">
				<div class="mr-4 flex-shrink-0">
					{#if vehicle.vehiclePicture}
						<img
							src={vehicle.vehiclePicture}
							alt="{vehicle.make} {vehicle.vehicleModel}"
							class="h-32 w-32 rounded object-cover"
						/>
					{:else}
						<div class="flex h-32 w-32 items-center justify-center rounded bg-gray-200">
							<span class="text-gray-500">No image</span>
						</div>
					{/if}
				</div>
				<div>
					<h1 class="text-2xl font-bold text-gray-900">
						{vehicle.modelYear}
						{vehicle.make}
						{vehicle.vehicleModel}
					</h1>
					<div class="mt-1 space-y-1 text-sm text-gray-600">
						{#if vehicle.trim}
							<p>Trim: {vehicle.trim}</p>
						{/if}
						{#if vehicle.series}
							<p>Series: {vehicle.series}</p>
						{/if}
						{#if vehicle.class}
							<p>Class: {vehicle.class}</p>
						{/if}
						{#if vehicle.manufacturer}
							<p>Manufacturer: {vehicle.manufacturer}</p>
						{/if}
					</div>
				</div>
			</div>

			<!-- Tabs -->
			<div class="border-b border-gray-200">
				<nav class="-mb-px flex">
					{#each tabs as tab}
						<button
							class="border-b-2 px-4 py-2 text-sm font-medium {activeTab === tab.id
								? 'border-primary text-primary'
								: 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'}"
							onclick={() => setActiveTab(tab.id)}
						>
							{tab.label}
							{#if tab.id === 'recalls' && vehicle.recallsCount > 0}
								<span class="ml-1 rounded-full bg-blue-100 px-2 py-0.5 text-xs text-blue-800"
									>{vehicle.recallsCount}</span
								>
							{:else if tab.id === 'complaints' && vehicle.complaintsCount > 0}
								<span class="ml-1 rounded-full bg-amber-100 px-2 py-0.5 text-xs text-amber-800"
									>{vehicle.complaintsCount}</span
								>
							{/if}
						</button>
					{/each}
				</nav>
			</div>

			<!-- Tab content -->
			<div class="px-4 py-5 sm:p-6">
				{#if activeTab === 'overview'}
					<div>
						<h2 class="mb-4 text-lg font-medium text-gray-900">Vehicle Overview</h2>
						<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
							<div class="rounded-md bg-gray-50 p-4">
								<h3 class="mb-2 text-sm font-medium text-gray-500">Safety Ratings</h3>
								<p class="text-gray-700">{vehicle.ncapRated ? 'NCAP Rated' : 'Not NCAP Rated'}</p>
							</div>

							<div class="rounded-md bg-gray-50 p-4">
								<h3 class="mb-2 text-sm font-medium text-gray-500">Vehicle Status</h3>
								<p class="text-gray-700">{vehicle.active ? 'Active' : 'Inactive'}</p>
							</div>

							<div class="rounded-md bg-gray-50 p-4">
								<h3 class="mb-2 text-sm font-medium text-gray-500">Recalls</h3>
								<p class="text-gray-700">{vehicle.recallsCount} recalls issued</p>
							</div>

							<div class="rounded-md bg-gray-50 p-4">
								<h3 class="mb-2 text-sm font-medium text-gray-500">Complaints</h3>
								<p class="text-gray-700">{vehicle.complaintsCount} complaints filed</p>
							</div>

							<div class="rounded-md bg-gray-50 p-4">
								<h3 class="mb-2 text-sm font-medium text-gray-500">Investigations</h3>
								<p class="text-gray-700">{vehicle.investigationsCount} investigations</p>
							</div>

							<div class="rounded-md bg-gray-50 p-4">
								<h3 class="mb-2 text-sm font-medium text-gray-500">Communications</h3>
								<p class="text-gray-700">
									{vehicle.manufacturerCommunicationsCount} manufacturer communications
								</p>
							</div>
						</div>
					</div>
				{:else if activeTab === 'recalls'}
					<div>
						<h2 class="mb-4 text-lg font-medium text-gray-900">Recalls</h2>
						{#if vehicle.safetyIssues?.recalls && vehicle.safetyIssues.recalls.length > 0}
							<div class="space-y-4">
								{#each vehicle.safetyIssues.recalls as recall}
									<div class="rounded-lg border border-gray-200 bg-white p-4">
										<h3 class="text-md font-medium text-gray-900">{recall.subject}</h3>
										<p class="mt-1 text-sm text-gray-500">Campaign: {recall.nhtsaCampaignNumber}</p>
										<p class="text-sm text-gray-500">
											Date: {formatDate(recall.reportReceivedDate)}
										</p>

										<div class="mt-3">
											<h4 class="text-sm font-medium text-gray-700">Summary:</h4>
											<p class="mt-1 text-sm text-gray-600">{recall.summary}</p>
										</div>

										<div class="mt-3">
											<h4 class="text-sm font-medium text-gray-700">Consequence:</h4>
											<p class="mt-1 text-sm text-gray-600">{recall.consequence}</p>
										</div>

										<div class="mt-3">
											<h4 class="text-sm font-medium text-gray-700">Corrective Action:</h4>
											<p class="mt-1 text-sm text-gray-600">{recall.correctiveAction}</p>
										</div>

										{#if recall.components && recall.components.length > 0}
											<div class="mt-3">
												<h4 class="text-sm font-medium text-gray-700">Affected Components:</h4>
												<ul class="mt-1 list-inside list-disc text-sm text-gray-600">
													{#each recall.components as component}
														<li>{component.name}</li>
													{/each}
												</ul>
											</div>
										{/if}
									</div>
								{/each}
							</div>
						{:else if vehicle.recallsCount > 0}
							<p class="mb-4 text-gray-500">
								This vehicle has {vehicle.recallsCount} recalls. Detailed information is not available
								at this time.
							</p>
						{:else}
							<p class="text-gray-500">No recalls found for this vehicle.</p>
						{/if}
					</div>
				{:else if activeTab === 'complaints'}
					<div>
						<h2 class="mb-4 text-lg font-medium text-gray-900">Complaints</h2>
						{#if vehicle.safetyIssues?.complaints && vehicle.safetyIssues.complaints.length > 0}
							<div class="space-y-4">
								{#each vehicle.safetyIssues.complaints as complaint}
									<div class="rounded-lg border border-gray-200 bg-white p-4">
										<div class="flex justify-between">
											<div>
												<p class="text-sm text-gray-500">
													Filed: {formatDate(complaint.dateFiled)}
												</p>
												{#if complaint.dateOfIncident}
													<p class="text-sm text-gray-500">
														Incident Date: {formatDate(complaint.dateOfIncident)}
													</p>
												{/if}
											</div>
											<div class="text-right">
												{#if complaint.crash}
													<span
														class="inline-flex items-center rounded bg-red-100 px-2 py-0.5 text-xs font-medium text-red-800"
													>
														Crash
													</span>
												{/if}
												{#if complaint.fire}
													<span
														class="ml-1 inline-flex items-center rounded bg-orange-100 px-2 py-0.5 text-xs font-medium text-orange-800"
													>
														Fire
													</span>
												{/if}
											</div>
										</div>

										<div class="mt-3">
											<p class="text-sm text-gray-600">{complaint.description}</p>
										</div>

										{#if complaint.components && complaint.components.length > 0}
											<div class="mt-3">
												<h4 class="text-sm font-medium text-gray-700">Affected Components:</h4>
												<ul class="mt-1 list-inside list-disc text-sm text-gray-600">
													{#each complaint.components as component}
														<li>{component.name}</li>
													{/each}
												</ul>
											</div>
										{/if}
									</div>
								{/each}
							</div>
						{:else if vehicle.complaintsCount > 0}
							<p class="mb-4 text-gray-500">
								This vehicle has {vehicle.complaintsCount} complaints. Detailed information is not available
								at this time.
							</p>
						{:else}
							<p class="text-gray-500">No complaints found for this vehicle.</p>
						{/if}
					</div>
				{:else if activeTab === 'investigations'}
					<div>
						<h2 class="mb-4 text-lg font-medium text-gray-900">Investigations</h2>
						{#if vehicle.safetyIssues?.investigations && vehicle.safetyIssues.investigations.length > 0}
							<div class="space-y-4">
								<p class="text-gray-500">Investigation details available.</p>
							</div>
						{:else if vehicle.investigationsCount > 0}
							<p class="mb-4 text-gray-500">
								This vehicle has {vehicle.investigationsCount} investigations. Detailed information is
								not available at this time.
							</p>
						{:else}
							<p class="text-gray-500">No investigations found for this vehicle.</p>
						{/if}
					</div>
				{:else if activeTab === 'safety'}
					<div>
						<h2 class="mb-4 text-lg font-medium text-gray-900">Safety Ratings</h2>
						{#if vehicle.safetyRatings?.crashTestRatings && vehicle.safetyRatings.crashTestRatings.length > 0}
							<div class="mb-6">
								<h3 class="text-md mb-3 font-medium text-gray-800">Crash Test Ratings</h3>
								<div class="space-y-4">
									{#each vehicle.safetyRatings.crashTestRatings as crashTest}
										<div class="rounded-lg border border-gray-200 bg-white p-4">
											<h4 class="text-md font-medium text-gray-900">{crashTest.display}</h4>
											<p class="mb-3 text-sm text-gray-500">Type: {crashTest.type}</p>

											{#if crashTest.ratings && crashTest.ratings.length > 0}
												<div class="mt-2 grid grid-cols-1 gap-4 md:grid-cols-2">
													{#each crashTest.ratings as rating}
														<div class="rounded bg-gray-50 p-3">
															<div class="flex items-center justify-between">
																<span class="text-sm font-medium text-gray-700"
																	>{rating.display}</span
																>
																<span
																	class="text-sm font-bold {rating.rating === '5'
																		? 'text-green-600'
																		: rating.rating === '4'
																			? 'text-green-500'
																			: rating.rating === '3'
																				? 'text-yellow-500'
																				: rating.rating === '2'
																					? 'text-orange-500'
																					: 'text-red-500'}"
																>
																	{rating.rating} / 5
																</span>
															</div>
															{#if rating.notes}
																<p class="mt-1 text-xs text-gray-500">{rating.notes}</p>
															{/if}
														</div>
													{/each}
												</div>
											{/if}
										</div>
									{/each}
								</div>
							</div>
						{/if}

						{#if vehicle.safetyRatings?.safetyFeatures && vehicle.safetyRatings.safetyFeatures.length > 0}
							<div class="mb-6">
								<h3 class="text-md mb-3 font-medium text-gray-800">Safety Features</h3>
								<div class="space-y-4">
									{#each vehicle.safetyRatings.safetyFeatures as category}
										<div class="rounded-lg border border-gray-200 bg-white p-4">
											<h4 class="text-md font-medium text-gray-900">{category.category}</h4>
											{#if category.notes}
												<p class="mb-2 text-sm text-gray-500">{category.notes}</p>
											{/if}

											{#if category.features && category.features.length > 0}
												<div class="mt-2">
													<ul class="divide-y divide-gray-200">
														{#each category.features as feature}
															<li class="py-2">
																<div class="flex justify-between">
																	<span class="text-sm text-gray-700">{feature.label}</span>
																	<span
																		class="text-sm font-medium {feature.value === 'Standard'
																			? 'text-green-600'
																			: feature.value === 'Optional'
																				? 'text-blue-600'
																				: 'text-gray-500'}"
																	>
																		{feature.value}
																	</span>
																</div>
																{#if feature.notes}
																	<p class="mt-1 text-xs text-gray-500">{feature.notes}</p>
																{/if}
															</li>
														{/each}
													</ul>
												</div>
											{/if}
										</div>
									{/each}
								</div>
							</div>
						{/if}

						{#if !vehicle.safetyRatings?.crashTestRatings && !vehicle.safetyRatings?.safetyFeatures}
							<p class="text-gray-500">No safety rating information available for this vehicle.</p>
						{/if}
					</div>
				{/if}
			</div>
		</div>
	{/if}
</div>
 