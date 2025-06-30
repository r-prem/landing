<script lang="ts">
	let services = [
		{ title: 'WEB DEVELOPMENT', description: 'Modern websites & web applications built with cutting-edge tech' },
		{ title: 'MOBILE APPS', description: 'Native & cross-platform mobile solutions that perform' },
		{ title: 'AI INTEGRATION', description: 'Smart AI-powered features and machine learning solutions' },
		{ title: 'CONSULTING', description: 'Technical guidance & architecture decisions for your project' }
	];


</script>

<svelte:head>
	<title>Raffael Prem - Freelance Software Developer | Web & Mobile Solutions</title>
	<meta name="description" content="Freelance Software Developer specializing in modern web applications, mobile apps, and AI integration. Based in Linz, Austria. Bold solutions for bold ideas." />
	<meta name="keywords" content="freelance developer, software developer, web development, mobile apps, AI integration, Linz, Austria, React, Svelte, TypeScript, Node.js" />
	
	<!-- Open Graph -->
	<meta property="og:title" content="Raffael Prem - Freelance Software Developer" />
	<meta property="og:description" content="Freelance Software Developer specializing in modern web applications, mobile apps, and AI integration. Based in Linz, Austria." />
	<meta property="og:url" content="https://rprem.com/" />
	<meta property="og:type" content="website" />
	
	<!-- Twitter -->
	<meta name="twitter:title" content="Raffael Prem - Freelance Software Developer" />
	<meta name="twitter:description" content="Freelance Software Developer specializing in modern web applications, mobile apps, and AI integration. Based in Linz, Austria." />
	
	<!-- Structured Data -->
	<script type="application/ld+json">
	{
		"@context": "https://schema.org",
		"@type": "Person",
		"name": "Raffael Prem",
		"jobTitle": "Freelance Software Developer",
		"description": "Freelance Software Developer specializing in web development, mobile apps, and AI integration",
		"url": "https://rprem.com",
		"email": "raffaelprem@gmail.com",
		"address": {
			"@type": "PostalAddress",
			"addressLocality": "Linz",
			"addressCountry": "AT"
		},
		"sameAs": [
			"https://www.linkedin.com/in/raffael-prem/"
		],
		"knowsAbout": [
			"Web Development",
			"Mobile App Development", 
			"AI Integration",
			"JavaScript",
			"TypeScript",
			"React",
			"Svelte",
			"Node.js",
			"Python"
		],
		"worksFor": {
			"@type": "Organization",
			"name": "Raffael Prem",
			"url": "https://rprem.com"
		}
	}
	</script>
	
	<script type="application/ld+json">
	{
		"@context": "https://schema.org",
		"@type": "WebSite",
		"name": "Raffael Prem - Freelance Software Developer",
		"url": "https://rprem.com",
		"description": "Freelance Software Developer specializing in web development, mobile apps, and AI integration",
		"author": {
			"@type": "Person",
			"name": "Raffael Prem"
		},
		"potentialAction": {
			"@type": "ContactAction",
			"target": "mailto:raffaelprem@gmail.com",
			"name": "Contact"
		}
	}
	</script>
</svelte:head>

<main class="min-h-screen bg-white">
	<!-- Hero Section -->
	<section class="relative overflow-hidden bg-black text-white">
		<div class="absolute inset-0 bg-gradient-to-r from-yellow-400 to-pink-500 opacity-10"></div>
		<div class="relative max-w-6xl mx-auto px-6 py-20 lg:py-32">
			<div class="text-center">
				<h1 class="text-6xl lg:text-8xl font-black tracking-tighter mb-8 transform -rotate-1">
					SOFTWARE
					<span class="block text-blue-400 transform rotate-1">DEVELOPER</span>
				</h1>
				<div class="inline-block bg-white text-black px-8 py-4 text-xl font-bold border-4 border-black transform rotate-2 shadow-[8px_8px_0px_0px_theme(colors.blue.400)]">
					FREELANCER • PROBLEM SOLVER • CODE ARTIST
				</div>
				<p class="text-xl lg:text-2xl font-bold mt-12 max-w-3xl mx-auto leading-tight">
					I BUILD <span class="bg-blue-400 text-black px-2">BOLD</span> DIGITAL SOLUTIONS 
					THAT <span class="bg-pink-500 text-white px-2">PERFORM</span> AND 
					<span class="bg-blue-400 text-black px-2">SCALE</span>
				</p>
			</div>
		</div>
	</section>

	<!-- Services Section -->
	<section class="bg-blue-400 py-20">
		<div class="max-w-6xl mx-auto px-6">
			<h2 class="text-5xl lg:text-7xl font-black text-center mb-16 transform -rotate-1">
				WHAT I DO
			</h2>
			<div class="grid md:grid-cols-2 gap-8">
				{#each services as service}
					<div class="bg-white border-4 border-black p-8 transform hover:rotate-1 transition-transform duration-300 shadow-[8px_8px_0px_0px_theme(colors.black)]">
						<h3 class="text-2xl font-black mb-4 text-black">{service.title}</h3>
						<p class="text-lg font-semibold text-gray-800">{service.description}</p>
					</div>
				{/each}
			</div>
		</div>
	</section>



	<!-- Skills Section -->
	<section class="bg-pink-500 py-20">
		<div class="max-w-6xl mx-auto px-6">
			<h2 class="text-5xl lg:text-7xl font-black text-center mb-16 transform -rotate-1">
				TECH STACK
			</h2>
			<div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
				{#each ['JAVASCRIPT', 'TYPESCRIPT', 'REACT', 'SVELTE', 'NODE.JS', 'PYTHON', 'POSTGRESQL', 'ANGULAR', 'REACT NATIVE', 'DOCKER', 'GIT', 'FIGMA'] as tech}
					<div class="bg-white text-black p-4 border-4 border-black font-black text-center transform hover:rotate-3 transition-transform duration-300 shadow-[4px_4px_0px_0px_theme(colors.black)]">
						{tech}
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- CTA Section -->
	<section class="bg-black text-white py-20">
		<div class="max-w-4xl mx-auto px-6 text-center">
			<h2 class="text-5xl lg:text-7xl font-black mb-8 transform rotate-1">
				LET'S BUILD
				<span class="block text-blue-400 transform -rotate-1">SOMETHING</span>
				<span class="block text-pink-500 transform rotate-1">AMAZING</span>
			</h2>
			<p class="text-xl lg:text-2xl font-bold mb-12 max-w-2xl mx-auto">
				Ready to turn your ideas into reality? Let's discuss your project and create something that stands out.
			</p>
			<div class="flex justify-center">
				<a 
					href="mailto:raffaelprem@gmail.com" 
					class="neobrutalism-button bg-blue-400 text-black px-8 py-4 text-xl font-black border-4 border-white transition-all duration-150 shadow-[8px_8px_0px_0px_theme(colors.white)] hover:shadow-[12px_12px_0px_0px_theme(colors.white)]"
				>
					GET IN TOUCH
				</a>
			</div>
		</div>
	</section>

	<!-- Footer -->
	<footer class="bg-white border-t-8 border-black py-12">
		<div class="max-w-6xl mx-auto px-6">
			<div class="flex flex-col md:flex-row justify-between items-center">
				<div class="mb-6 md:mb-0">
					<h3 class="text-3xl font-black text-black transform -rotate-1">RAFFAEL PREM</h3>
					<p class="text-lg font-semibold text-gray-800">Freelance Software Developer</p>
				</div>
				<div class="flex flex-col sm:flex-row gap-4">
					<a href="https://www.linkedin.com/in/raffael-prem/" class="neobrutalism-button bg-black text-white px-6 py-3 font-black border-2 border-black text-center transition-all duration-150 shadow-[4px_4px_0px_0px_theme(colors.gray.400)]">
						LINKEDIN
					</a>
					<a href="/imprint" class="neobrutalism-button bg-blue-400 text-black px-6 py-3 font-black border-2 border-black text-center transition-all duration-150 shadow-[4px_4px_0px_0px_theme(colors.gray.400)]">
						IMPRINT
					</a>
				</div>
			</div>
		</div>
	</footer>
</main>

<style>
	/* Custom neobrutalism animations */
	@keyframes shake {
		0%, 100% { transform: translateX(0); }
		25% { transform: translateX(-2px) rotate(-0.5deg); }
		75% { transform: translateX(2px) rotate(0.5deg); }
	}
	
	:global(body) {
		font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
	}
	
	/* Neobrutalism button press animation */
	.neobrutalism-button {
		position: relative;
		transform-origin: center;
		user-select: none;
		cursor: pointer;
	}
	
	.neobrutalism-button:active {
		transform: translateY(4px) !important;
		box-shadow: 2px 2px 0px 0px rgba(0, 0, 0, 0.8) !important;
		transition: all 0.1s ease !important;
	}
	
	/* Specific button variations */
	.neobrutalism-button.bg-blue-400:active {
		box-shadow: 2px 2px 0px 0px rgba(255, 255, 255, 0.8) !important;
	}
	
	.neobrutalism-button.bg-pink-500:active {
		box-shadow: 2px 2px 0px 0px rgba(255, 255, 255, 0.8) !important;
	}
	
	.neobrutalism-button.bg-black:active {
		box-shadow: 2px 2px 0px 0px rgba(156, 163, 175, 0.8) !important;
	}
</style>
