<script lang="ts">
	import {
		Card,
		CardContent,
		CardDescription,
		CardHeader,
		CardTitle
	} from '$lib/components/ui/card';
	import { Tabs, TabsContent, TabsList, TabsTrigger } from '$lib/components/ui/tabs';

</script>

<svelte:head>
	<title>About - AutoDB</title>
	<meta
		name="description"
		content="Learn about AutoDB - your comprehensive vehicle safety and information platform"
	/>
</svelte:head>

<div class="container mx-auto px-4 py-8">
	<div class="mb-10 text-center">
		<h1 class="mb-3 text-4xl font-bold tracking-tight text-gray-900">About AutoDB</h1>
		<p class="mx-auto max-w-3xl text-xl text-gray-600">
			Your trusted source for comprehensive vehicle safety and performance data.
		</p>
	</div>

	<Tabs value="mission" class="mx-auto w-full max-w-4xl">
		<TabsList class="mb-8 grid w-full grid-cols-2">
			<TabsTrigger value="mission">Our Mission</TabsTrigger>
			<TabsTrigger value="features">Features</TabsTrigger>
		</TabsList>

		<TabsContent value="mission">
			<Card>
				<CardHeader>
					<CardTitle>Our Mission</CardTitle>
					<CardDescription>Making vehicle safety data accessible to everyone</CardDescription>
				</CardHeader>
				<CardContent>
					<div class="prose prose-slate max-w-none">
						<p class="lead text-lg">
							At AutoDB, we believe that informed consumers make better decisions when purchasing
							and maintaining vehicles.
						</p>

						<p class="my-4">
							Founded in 2025, AutoDB was created with a simple but powerful mission: to democratize
							access to vehicle safety and performance data. We understand that navigating the
							complex world of automotive safety can be challenging, which is why we've built a
							platform that aggregates critical information from trusted sources and presents it in
							an easy-to-understand format.
						</p>

						<h3 class="mt-6 mb-3 text-xl font-semibold">Our Values</h3>

						<div class="my-6 grid grid-cols-1 gap-4 md:grid-cols-3">
							<div class="rounded-lg bg-blue-50 p-4">
								<h4 class="font-medium text-blue-700">Transparency</h4>
								<p class="text-sm text-gray-700">
									We believe in providing clear, unbiased information about all vehicles.
								</p>
							</div>
							<div class="rounded-lg bg-green-50 p-4">
								<h4 class="font-medium text-green-700">Accessibility</h4>
								<p class="text-sm text-gray-700">
									Vehicle safety data should be available and understandable to everyone.
								</p>
							</div>
							<div class="rounded-lg bg-amber-50 p-4">
								<h4 class="font-medium text-amber-700">Reliability</h4>
								<p class="text-sm text-gray-700">
									We source our data from trusted, authoritative sources in the automotive industry.
								</p>
							</div>
						</div>

						<h3 class="mt-6 mb-3 text-xl font-semibold">Data Sources</h3>
						<p>AutoDB aggregates data from various reliable sources, including:</p>
						<ul class="list-disc space-y-1 pl-5">
							<li>National Highway Traffic Safety Administration (NHTSA)</li>
							<li>Insurance Institute for Highway Safety (IIHS)</li>
							<li>Vehicle manufacturers</li>
							<li>Consumer reports and feedback</li>
						</ul>
					</div>
				</CardContent>
			</Card>
		</TabsContent>

		<TabsContent value="features">
			<Card>
				<CardHeader>
					<CardTitle>Features</CardTitle>
					<CardDescription
						>Comprehensive tools to research vehicle safety and performance</CardDescription
					>
				</CardHeader>
				<CardContent>
					<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
						<div class="rounded-lg border p-5">
							<div class="mb-4 flex items-center">
								<div class="mr-3 rounded-full bg-blue-100 p-2">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										class="h-6 w-6 text-blue-700"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
										/>
									</svg>
								</div>
								<h3 class="text-lg font-semibold">Advanced Search</h3>
							</div>
							<p class="text-gray-600">
								Search for vehicles by make, model, year, and trim level to find detailed
								specifications and safety information.
							</p>
						</div>

						<div class="rounded-lg border p-5">
							<div class="mb-4 flex items-center">
								<div class="mr-3 rounded-full bg-green-100 p-2">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										class="h-6 w-6 text-green-700"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
										/>
									</svg>
								</div>
								<h3 class="text-lg font-semibold">Safety Ratings</h3>
							</div>
							<p class="text-gray-600">
								Access comprehensive safety ratings and crash test results from NHTSA and IIHS.
							</p>
						</div>

						<div class="rounded-lg border p-5">
							<div class="mb-4 flex items-center">
								<div class="mr-3 rounded-full bg-red-100 p-2">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										class="h-6 w-6 text-red-700"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
										/>
									</svg>
								</div>
								<h3 class="text-lg font-semibold">Recall Alerts</h3>
							</div>
							<p class="text-gray-600">
								Stay informed about recalls and safety issues affecting your vehicle or vehicles
								you're interested in.
							</p>
						</div>

						<div class="rounded-lg border p-5">
							<div class="mb-4 flex items-center">
								<div class="mr-3 rounded-full bg-purple-100 p-2">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										class="h-6 w-6 text-purple-700"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
										/>
									</svg>
								</div>
								<h3 class="text-lg font-semibold">Complaint Database</h3>
							</div>
							<p class="text-gray-600">
								Read and submit vehicle complaints to help identify emerging safety issues.
							</p>
						</div>
					</div>
				</CardContent>
			</Card>
		</TabsContent>
	</Tabs>

	<div class="mx-auto mt-12 max-w-4xl rounded-lg bg-blue-50 p-8">
		<h2 class="mb-6 text-center text-2xl font-bold">Contact Us</h2>
		<div class="flex flex-col items-center justify-center gap-8 md:flex-row">
			<div class="text-center md:text-left">
				<h3 class="mb-2 text-lg font-medium">Get in Touch</h3>
				<p class="mb-4 text-gray-600">Have questions or feedback? We'd love to hear from you!</p>
				<a
					href="mailto:info@autodb.example.com"
					class="focus-visible:ring-ring ring-offset-background bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-10 items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
				>
					Contact Support
				</a>
			</div>
			<div class="hidden h-20 w-px bg-blue-200 md:block"></div>
			<div class="text-center md:text-left">
				<h3 class="mb-2 text-lg font-medium">Follow Us</h3>
				<p class="mb-4 text-gray-600">Stay updated with the latest automotive safety news.</p>
				<div class="flex justify-center gap-4 md:justify-start">
					<a href="#" class="text-gray-600 hover:text-blue-600">
						<span class="sr-only">Twitter</span>
						<svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
							<path
								d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"
							></path>
						</svg>
					</a>
					<a href="#" class="text-gray-600 hover:text-blue-600">
						<span class="sr-only">LinkedIn</span>
						<svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
							<path
								fill-rule="evenodd"
								d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
								clip-rule="evenodd"
							></path>
						</svg>
					</a>
					<a href="#" class="text-gray-600 hover:text-blue-600">
						<span class="sr-only">Facebook</span>
						<svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
							<path
								fill-rule="evenodd"
								d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
								clip-rule="evenodd"
							></path>
						</svg>
					</a>
				</div>
			</div>
		</div>
	</div>
</div>
