<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>

<div class="flex min-h-screen flex-col">
	<header class="bg-white shadow">
		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div class="flex h-16 justify-between">
				<div class="flex">
					<div class="flex flex-shrink-0 items-center">
						<a href="/" class="text-primary text-xl font-bold">AutoDB</a>
					</div>
					<nav class="ml-6 flex space-x-8">
						<a
							href="/"
							class="border-primary inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium text-gray-900"
						>
							Dashboard
						</a>
						<a
							href="/about"
							class="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
						>
							About
						</a>
					</nav>
				</div>
			</div>
		</div>
	</header>

	<main class="w-full flex-grow bg-gray-50">
		<div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
			<slot />
		</div>
	</main>

	<footer class="sticky bottom-0 z-10 mt-auto w-full border-t border-gray-200 bg-white shadow-md">
		<div class="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
			<div class="flex justify-between">
				<p class="text-sm text-gray-500">© 2023 AutoDB. All rights reserved.</p>
				<div class="flex space-x-6">
				
				</div>
			</div>
		</div>
	</footer>
</div>
