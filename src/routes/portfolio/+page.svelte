<script lang="ts">
	let projects = [
		{
			id: 1,
			title: 'PITCHINTELLIGENCE',
			subtitle: 'AI-powered pitch deck analysis for investors',
			description: 'Advanced AI platform that analyzes pitch decks and provides actionable insights for investors. Uses machine learning to evaluate business models, market opportunities, and investment potential.',
			tech: ['SVELTEKIT', 'POSTGRESQL', 'AI/ML'],
			image: '/images/portfolio/pitchintelligence.png',
			liveUrl: 'https://pitch-intelligence.com',
			githubUrl: 'https://github.com/example/pitch-intelligence',
			status: 'LIVE',
			year: '2024'
		},
		{
			id: 2,
			title: 'FINTECH MOBILE APP',
			subtitle: 'React Native + Backend',
			description: 'Cross-platform mobile banking app with biometric authentication, real-time transactions, and investment portfolio tracking. Handles $2M+ in transactions.',
			tech: ['REACT NATIVE', 'TYPESCRIPT', 'SUPABASE', 'PLAID API'],
			image: '/images/portfolio/fintech-app.png',
			liveUrl: 'https://example-fintech.com',
			githubUrl: 'https://github.com/example/fintech',
			status: 'LIVE',
			year: '2024'
		},
		{
			id: 3,
			title: 'AI CONTENT GENERATOR',
			subtitle: 'SvelteKit + OpenAI Integration',
			description: 'Smart content creation platform using GPT-4 and DALL-E. Generates blog posts, social media content, and marketing copy with custom brand voice.',
			tech: ['SVELTEKIT', 'OPENAI API', 'PYTHON', 'DOCKER'],
			image: '/images/portfolio/ai-content-generator.png',
			liveUrl: 'https://example-ai.com',
			githubUrl: 'https://github.com/example/ai-content',  
			status: 'BETA',
			year: '2024'
		},
		{
			id: 4,
			title: 'CRYPTO ANALYTICS DASHBOARD',
			subtitle: 'Angular + Real-time APIs',
			description: 'Professional cryptocurrency trading dashboard with real-time price feeds, portfolio tracking, and technical analysis indicators for day traders.',
			tech: ['ANGULAR', 'WEBSOCKETS', 'CHARTJS', 'REDIS'],
			image: '/images/portfolio/crypto-dashboard.png',
			liveUrl: 'https://example-crypto.com',
			githubUrl: 'https://github.com/example/crypto',
			status: 'LIVE',
			year: '2023'
		},
		{
			id: 5,
			title: 'RESTAURANT MANAGEMENT SYSTEM',
			subtitle: 'Full-Stack + Mobile POS',
			description: 'Complete restaurant solution with online ordering, kitchen management, inventory tracking, and mobile POS system. Serving 50+ restaurants.',
			tech: ['SVELTE', 'NODE.JS', 'MONGODB', 'REACT NATIVE'],
			image: '/images/portfolio/restaurant-system.png',
			liveUrl: 'https://example-restaurant.com',
			githubUrl: 'https://github.com/example/restaurant',
			status: 'LIVE',
			year: '2023'
		},
		{
			id: 6,
			title: 'SOCIAL MEDIA SCHEDULER',
			subtitle: 'Next.js + Social APIs',
			description: 'Multi-platform social media management tool with AI-powered content suggestions, optimal posting times, and comprehensive analytics dashboard.',
			tech: ['NEXT.JS', 'SOCIAL APIS', 'POSTGRESQL', 'AI/ML'],
			image: '/images/portfolio/social-scheduler.png',
			liveUrl: 'https://example-social.com',
			githubUrl: 'https://github.com/example/social',
			status: 'LIVE',
			year: '2023'
		}
	];

	let selectedCategory = 'ALL';
	let categories = ['ALL', 'WEB APPS', 'MOBILE APPS', 'AI PROJECTS', 'E-COMMERCE'];

	$: filteredProjects = selectedCategory === 'ALL' 
		? projects 
		: projects.filter(project => {
			switch(selectedCategory) {
				case 'WEB APPS': return ['AI-powered pitch deck analysis for investors', 'SvelteKit + OpenAI Integration', 'Angular + Real-time APIs', 'Next.js + Social APIs'].includes(project.subtitle);
				case 'MOBILE APPS': return project.subtitle.includes('Mobile') || project.subtitle.includes('React Native');
				case 'AI PROJECTS': return project.tech.includes('AI/ML') || project.tech.includes('OPENAI API');
				case 'E-COMMERCE': return project.subtitle.includes('E-commerce') || project.title.includes('RESTAURANT');
				default: return true;
			}
		});
</script>

<svelte:head>
	<title>Portfolio - Raffael Prem | Freelance Software Developer Projects</title>
	<meta name="description" content="Explore my portfolio of web applications, mobile apps, and AI-powered solutions. Real projects with real results - e-commerce platforms, fintech apps, AI tools, and more." />
	<meta name="keywords" content="portfolio, web development projects, mobile apps, AI projects, e-commerce, fintech, software developer portfolio, React, Svelte, Node.js" />
	
	<!-- Open Graph -->
	<meta property="og:title" content="Portfolio - Raffael Prem | Freelance Software Developer" />
	<meta property="og:description" content="Explore my portfolio of web applications, mobile apps, and AI-powered solutions. Real projects with real results." />
	<meta property="og:url" content="https://rprem.com/portfolio" />
	<meta property="og:type" content="website" />
	
	<!-- Twitter -->
	<meta name="twitter:title" content="Portfolio - Raffael Prem | Freelance Software Developer" />
	<meta name="twitter:description" content="Explore my portfolio of web applications, mobile apps, and AI-powered solutions. Real projects with real results." />
	
	<!-- Structured Data -->
	<script type="application/ld+json">
	{
		"@context": "https://schema.org",
		"@type": "CollectionPage",
		"name": "Portfolio - Raffael Prem",
		"description": "Portfolio of web applications, mobile apps, and AI-powered solutions",
		"url": "https://rprem.com/portfolio",
		"mainEntity": {
			"@type": "ItemList",
			"itemListElement": [
				{
					"@type": "SoftwareApplication",
					"name": "E-COMMERCE REVOLUTION",
					"description": "Modern e-commerce platform built with React, Node.js, and PostgreSQL",
					"applicationCategory": "WebApplication",
					"operatingSystem": "Web Browser",
					"url": "https://example-ecommerce.com",
					"author": {
						"@type": "Person",
						"name": "Raffael Prem"
					}
				},
				{
					"@type": "SoftwareApplication", 
					"name": "FINTECH MOBILE APP",
					"description": "Cross-platform mobile banking app with biometric authentication",
					"applicationCategory": "MobileApplication",
					"operatingSystem": "iOS, Android",
					"url": "https://example-fintech.com",
					"author": {
						"@type": "Person",
						"name": "Raffael Prem"
					}
				},
				{
					"@type": "SoftwareApplication",
					"name": "AI CONTENT GENERATOR", 
					"description": "Smart content creation platform using GPT-4 and DALL-E",
					"applicationCategory": "WebApplication",
					"operatingSystem": "Web Browser",
					"url": "https://example-ai.com",
					"author": {
						"@type": "Person",
						"name": "Raffael Prem"
					}
				}
			]
		}
	}
	</script>
</svelte:head>

<main class="min-h-screen bg-white">
	<!-- Header -->
	<section class="bg-black text-white py-20">
		<div class="max-w-6xl mx-auto px-6">
			<div class="text-center">
				<h1 class="text-6xl lg:text-8xl font-black tracking-tighter mb-8 transform -rotate-1">
					MY
					<span class="block text-blue-400 transform rotate-1">PORTFOLIO</span>
				</h1>
				<p class="text-xl lg:text-2xl font-bold max-w-3xl mx-auto">
					Real projects. Real results. <span class="bg-pink-500 px-2">BOLD</span> solutions that make an impact.
				</p>
				<div class="mt-8">
					<a href="/" class="neobrutalism-button inline-block bg-white text-black px-6 py-3 text-lg font-black border-4 border-white transition-all duration-150 shadow-[8px_8px_0px_0px_theme(colors.blue.400)]">
						← BACK TO HOME
					</a>
				</div>
			</div>
		</div>
	</section>

	<!-- Filter Categories -->
	<section class="bg-blue-400 py-12">
		<div class="max-w-6xl mx-auto px-6">
			<div class="flex flex-wrap justify-center gap-4">
				{#each categories as category}
					<button 
						class="neobrutalism-button px-6 py-3 font-black border-4 border-black transition-all duration-150 {selectedCategory === category ? 'bg-black text-white shadow-[6px_6px_0px_0px_theme(colors.white)]' : 'bg-white text-black shadow-[4px_4px_0px_0px_theme(colors.black)] hover:shadow-[6px_6px_0px_0px_theme(colors.black)]'}"
						on:click={() => selectedCategory = category}
					>
						{category}
					</button>
				{/each}
			</div>
		</div>
	</section>

	<!-- Projects Grid -->
	<section class="py-20">
		<div class="max-w-7xl mx-auto px-6">
			<div class="grid lg:grid-cols-2 gap-12">
				{#each filteredProjects as project}
					<div class="neobrutalism-card bg-white border-4 border-black p-8 transform hover:-rotate-1 transition-all duration-300 shadow-[12px_12px_0px_0px_theme(colors.black)] hover:shadow-[16px_16px_0px_0px_theme(colors.black)]">
						<!-- Project Image -->
						<div class="border-4 border-black h-64 mb-6 overflow-hidden transform rotate-1">
							{#if project.image}
								<img 
									src={project.image} 
									alt="{project.title} screenshot" 
									class="w-full h-full object-cover"
									loading="lazy"
								/>
							{:else}
								<!-- Fallback placeholder -->
								<div class="bg-gray-200 h-full flex items-center justify-center">
									<div class="text-center">
										<div class="text-4xl mb-2">🚀</div>
										<div class="font-black text-lg">PROJECT SCREENSHOT</div>
										<div class="text-sm font-semibold">600x400 pixels</div>
									</div>
								</div>
							{/if}
						</div>

						<!-- Project Info -->
						<div class="mb-6">
							<div class="flex items-center justify-between mb-4">
															<div class="inline-block bg-blue-400 text-black px-4 py-2 font-black border-2 border-black transform -rotate-2">
								{project.year}
							</div>
								<div class="inline-block px-4 py-2 font-black border-2 border-black transform rotate-2 {project.status === 'LIVE' ? 'bg-green-400 text-black' : 'bg-yellow-400 text-black'}">
									{project.status}
								</div>
							</div>
							
							<h2 class="text-3xl lg:text-4xl font-black text-black mb-2 transform -rotate-1">
								{project.title}
							</h2>
							<h3 class="text-xl font-bold text-gray-700 mb-4">
								{project.subtitle}
							</h3>
							<p class="text-lg font-semibold text-gray-800 leading-relaxed mb-6">
								{project.description}
							</p>
						</div>

						<!-- Tech Stack -->
						<div class="mb-6">
							<h4 class="text-lg font-black mb-3">TECH STACK:</h4>
							<div class="flex flex-wrap gap-2">
								{#each project.tech as tech}
									<span class="bg-black text-white px-3 py-1 text-sm font-black border-2 border-black transform hover:rotate-3 transition-transform duration-300">
										{tech}
									</span>
								{/each}
							</div>
						</div>

						<!-- Project Links -->
						<div class="flex flex-col sm:flex-row gap-4">
							<a 
								href={project.liveUrl} 
								target="_blank"
								class="neobrutalism-button bg-pink-500 text-white px-6 py-3 font-black border-4 border-black text-center transition-all duration-150 shadow-[4px_4px_0px_0px_theme(colors.black)] hover:shadow-[6px_6px_0px_0px_theme(colors.black)]"
							>
								VIEW LIVE
							</a>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- CTA Section -->
	<section class="bg-black text-white py-20">
		<div class="max-w-4xl mx-auto px-6 text-center">
			<h2 class="text-5xl lg:text-7xl font-black mb-8 transform rotate-1">
				READY TO BUILD
				<span class="block text-pink-500 transform -rotate-1">YOUR PROJECT?</span>
			</h2>
			<p class="text-xl lg:text-2xl font-bold mb-12 max-w-2xl mx-auto">
				Let's create something amazing together. From concept to deployment, I've got you covered.
			</p>
			<div class="flex flex-col sm:flex-row gap-6 justify-center items-center">
				<a 
					href="mailto:raffaelprem@gmail.com" 
					class="neobrutalism-button bg-blue-400 text-black px-8 py-4 text-xl font-black border-4 border-white transition-all duration-150 shadow-[8px_8px_0px_0px_theme(colors.white)] hover:shadow-[12px_12px_0px_0px_theme(colors.white)]"
				>
					START A PROJECT
				</a>
				<a 
					href="/" 
					class="neobrutalism-button bg-pink-500 text-white px-8 py-4 text-xl font-black border-4 border-white transition-all duration-150 shadow-[8px_8px_0px_0px_theme(colors.white)] hover:shadow-[12px_12px_0px_0px_theme(colors.white)]"
				>
					BACK TO HOME
				</a>
			</div>
		</div>
	</section>
</main>

<style>
	/* Custom animations for portfolio items */
	@keyframes fadeInUp {
		from {
			opacity: 0;
			transform: translateY(30px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
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
	
	.neobrutalism-button.bg-white:active {
		box-shadow: 2px 2px 0px 0px rgba(0, 0, 0, 0.8) !important;
	}
	
	.neobrutalism-button.bg-black:active {
		box-shadow: 2px 2px 0px 0px rgba(255, 255, 255, 0.8) !important;
	}
	
	/* Neobrutalism card press animation */
	.neobrutalism-card {
		position: relative;
		transform-origin: center;
		user-select: none;
		cursor: pointer;
	}
	
	.neobrutalism-card:active {
		transform: translateY(6px) rotate(0deg) !important;
		box-shadow: 4px 4px 0px 0px rgba(0, 0, 0, 0.8) !important;
		transition: all 0.1s ease !important;
	}
</style> 