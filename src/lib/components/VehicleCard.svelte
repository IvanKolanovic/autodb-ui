<script lang="ts">
	import type { VehicleResult } from '$lib/types/vehicle';

	export let vehicle: VehicleResult;

	// Create a URL-friendly ID for the vehicle that includes YMMT parameters
	const createVehicleUrlId = () => {
		let id = `${vehicle.modelYear}-${vehicle.make}-${vehicle.vehicleModel}`;

		if (vehicle.trim) {
			id += `-${vehicle.trim}`;
		}

		if (vehicle.series) {
			id += `-${vehicle.series}`;
		}

		return encodeURIComponent(id);
	};
</script>

<a
	href={`/vehicle/${createVehicleUrlId()}`}
	class="block rounded-lg border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md"
>
	<div class="p-4">
		<div class="flex items-start">
			<div class="mr-4 h-24 w-24 flex-shrink-0">
				{#if vehicle.vehiclePicture}
					<img
						src={vehicle.vehiclePicture}
						alt="{vehicle.make} {vehicle.vehicleModel}"
						class="h-full w-full rounded object-cover"
					/>
				{:else}
					<div class="flex h-full w-full items-center justify-center rounded bg-gray-200">
						<span class="text-gray-500">No image</span>
					</div>
				{/if}
			</div>
			<div class="flex-1">
				<h3 class="text-lg font-semibold text-gray-900">
					{vehicle.modelYear}
					{vehicle.make}
					{vehicle.vehicleModel}
				</h3>
				<div class="mt-1 text-sm text-gray-600">
					<div class="flex flex-wrap gap-x-4 gap-y-1">
						{#if vehicle.trim}
							<span>Trim: {vehicle.trim}</span>
						{/if}
						{#if vehicle.series}
							<span>Series: {vehicle.series}</span>
						{/if}
						{#if vehicle.class}
							<span>Class: {vehicle.class}</span>
						{/if}
					</div>
				</div>
				<div class="mt-2 flex flex-wrap gap-2">
					<span
						class="inline-flex items-center rounded bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-800"
					>
						Recalls: {vehicle.recallsCount}
					</span>
					<span
						class="inline-flex items-center rounded bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800"
					>
						Complaints: {vehicle.complaintsCount}
					</span>
					<span
						class="inline-flex items-center rounded bg-purple-100 px-2 py-0.5 text-xs font-medium text-purple-800"
					>
						Investigations: {vehicle.investigationsCount}
					</span>
				</div>
			</div>
		</div>
	</div>
</a>
