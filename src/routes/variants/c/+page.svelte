<script lang="ts">
	import { onMount } from 'svelte';
	import { person, projects, now, stack } from '$lib/content';

	const letters = person.name.toUpperCase().split('');
	let spans: HTMLSpanElement[] = $state([]);
	let open = $state(0);
	let time = $state('');

	onMount(() => {
		const fmt = new Intl.DateTimeFormat('en-GB', {
			timeZone: person.tz,
			hour: '2-digit',
			minute: '2-digit',
			second: '2-digit'
		});
		const tick = () => (time = fmt.format(new Date()));
		tick();
		const t = setInterval(tick, 1000);
		return () => clearInterval(t);
	});

	function stretch(e: PointerEvent) {
		if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
		for (const s of spans) {
			if (!s) continue;
			const r = s.getBoundingClientRect();
			const d = Math.hypot(e.clientX - (r.left + r.width / 2), e.clientY - (r.top + r.height / 2));
			const k = Math.max(0, 1 - d / 320);
			s.style.fontVariationSettings = `'wdth' ${62 + k * 63}, 'wght' ${700 + k * 200}`;
		}
	}
	function reset() {
		for (const s of spans) if (s) s.style.fontVariationSettings = '';
	}
</script>

<svelte:head>
	<title>Variant C · Signal</title>
	<link
		href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,300..900&family=IBM+Plex+Mono:wght@400;500&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<div class="page">
	<header class="top mono">
		<span>{person.city.split(',')[0]} {time}</span>
		<span class="status"><i></i>{person.available ? 'Taking projects' : 'Booked'}</span>
		<a href="mailto:{person.email}">{person.email}</a>
	</header>

	<section class="hero" onpointermove={stretch} onpointerleave={reset} role="presentation">
		<h1 aria-label={person.name}>
			{#each letters as l, i}
				<span bind:this={spans[i]} class:gap={l === ' '} aria-hidden="true">{l}</span>
			{/each}
		</h1>
		<div class="hero-foot">
			<p class="role">
				<span class="mono tag">Day job</span>
				{person.role} at <a href={person.companyUrl}>{person.company}</a>.
				<span class="muted">{person.jobBlurb}</span>
			</p>
			<a class="cta" href="mailto:{person.email}">
				<span>Start a project</span>
				<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 19 19 5M8 5h11v11" /></svg>
			</a>
		</div>
	</section>

	<div class="marquee mono" aria-label="Tools: {stack.join(', ')}">
		<div class="track" aria-hidden="true">
			{#each [0, 1] as _}
				{#each stack as s}<span>{s}</span><b>✳</b>{/each}
			{/each}
		</div>
	</div>

	<section class="work">
		<div class="head">
			<h2>Things I’m building</h2>
			<span class="mono muted">({String(projects.length).padStart(2, '0')})</span>
		</div>

		<ul class="acc">
			{#each projects as p, i}
				<li class:open={open === i} style="--h:{p.hue}">
					<button
						class="row"
						aria-expanded={open === i}
						onclick={() => (open = open === i ? -1 : i)}
					>
						<span class="mono muted">{String(i + 1).padStart(2, '0')}</span>
						<span class="title">{p.name}</span>
						<span class="mono muted kind">{p.kind}</span>
						<span class="mono state {p.status}">{p.status}</span>
						<span class="plus" aria-hidden="true"></span>
					</button>
					<div class="panel">
						<div class="inner">
							<div class="visual" aria-hidden="true">
								{#each Array(12) as _, k}
									<span style="--k:{k}"></span>
								{/each}
							</div>
							<div class="info">
								<p>{p.blurb}</p>
								<p class="mono muted">{p.stack.join(' — ')} · {p.year}</p>
								<a href={p.url} class="link">Visit project ↗</a>
							</div>
						</div>
					</div>
				</li>
			{/each}
		</ul>
	</section>

	<section class="now">
		<span class="mono tag">Now</span>
		<ul>
			{#each now as n, i}
				<li><span class="mono muted">{String(i + 1).padStart(2, '0')}</span>{n}</li>
			{/each}
		</ul>
	</section>

	<footer>
		<a class="mega" href="mailto:{person.email}">Let’s talk<span>→</span></a>
		<div class="mono links">
			<a href={person.linkedin}>LinkedIn</a>
			<a href={person.github}>GitHub</a>
			<a href="/imprint">Imprint</a>
			<span class="muted">© {new Date().getFullYear()}</span>
		</div>
	</footer>
</div>

<style>
	.page {
		--bg: #0d0d0f;
		--fg: #f2f0ea;
		--muted: #8b8a85;
		--line: #26262a;
		--blue: #4d7cff;
		--pink: #ff5fa2;
		background: var(--bg);
		color: var(--fg);
		font-family: 'Archivo', system-ui, sans-serif;
		min-height: 100vh;
		overflow-x: clip;
	}
	a {
		color: inherit;
	}
	.mono {
		font-family: 'IBM Plex Mono', ui-monospace, monospace;
		font-size: 12px;
		text-transform: uppercase;
		letter-spacing: 0.04em;
	}
	.muted {
		color: var(--muted);
	}
	.top {
		display: flex;
		justify-content: space-between;
		gap: 16px;
		padding: 18px clamp(16px, 3vw, 40px);
		border-bottom: 1px solid var(--line);
		font-variant-numeric: tabular-nums;
	}
	.top a {
		text-decoration: none;
		text-transform: none;
	}
	.top a:hover {
		color: var(--blue);
	}
	.status {
		display: flex;
		align-items: center;
		gap: 8px;
	}
	.status i {
		width: 7px;
		height: 7px;
		border-radius: 50%;
		background: #3ddc84;
		animation: blink 1.6s steps(2) infinite;
	}
	@keyframes blink {
		50% {
			opacity: 0.25;
		}
	}

	.hero {
		padding: clamp(40px, 10vh, 120px) clamp(16px, 3vw, 40px) clamp(32px, 6vh, 64px);
	}
	h1 {
		font-size: clamp(56px, 13.2vw, 240px);
		line-height: 0.82;
		letter-spacing: -0.02em;
		display: flex;
		flex-wrap: wrap;
		user-select: none;
	}
	h1 span {
		font-variation-settings:
			'wdth' 62,
			'wght' 700;
		transition: font-variation-settings 0.25s cubic-bezier(0.2, 0.8, 0.2, 1);
	}
	h1 span.gap {
		width: 0.25em;
	}
	h1 span:nth-child(n + 9) {
		color: var(--blue);
	}
	.hero-foot {
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
		gap: 32px;
		margin-top: clamp(32px, 6vh, 64px);
	}
	.role {
		max-width: 56ch;
		font-size: clamp(18px, 1.7vw, 22px);
		line-height: 1.4;
	}
	.role a {
		text-decoration-color: var(--blue);
		text-underline-offset: 4px;
	}
	.tag {
		display: inline-block;
		background: var(--pink);
		color: #000;
		padding: 2px 8px;
		margin-right: 10px;
		vertical-align: 3px;
		transform: rotate(-3deg);
	}
	.cta {
		flex-shrink: 0;
		display: inline-flex;
		align-items: center;
		gap: 14px;
		padding: 18px 22px 18px 26px;
		border-radius: 99px;
		background: var(--fg);
		color: var(--bg);
		font-weight: 600;
		font-size: 17px;
		text-decoration: none;
		transition: background 0.25s;
	}
	.cta svg {
		width: 22px;
		height: 22px;
		fill: none;
		stroke: currentColor;
		stroke-width: 2;
		transition: transform 0.35s cubic-bezier(0.3, 1.6, 0.5, 1);
	}
	.cta:hover {
		background: var(--blue);
		color: #fff;
	}
	.cta:hover svg {
		transform: rotate(45deg);
	}

	.marquee {
		border-block: 1px solid var(--line);
		overflow: hidden;
		padding: 14px 0;
		font-size: 14px;
	}
	.track {
		display: flex;
		gap: 28px;
		width: max-content;
		animation: slide 32s linear infinite;
	}
	.track b {
		color: var(--pink);
		font-weight: 400;
	}
	.marquee:hover .track {
		animation-play-state: paused;
	}
	@keyframes slide {
		to {
			transform: translateX(-50%);
		}
	}

	.work {
		padding: clamp(56px, 10vh, 112px) clamp(16px, 3vw, 40px);
	}
	.head {
		display: flex;
		align-items: baseline;
		gap: 12px;
		margin-bottom: 24px;
	}
	h2 {
		font-size: clamp(28px, 3.4vw, 44px);
		font-variation-settings: 'wdth' 80;
		font-weight: 700;
		letter-spacing: -0.02em;
	}
	.acc {
		list-style: none;
		padding: 0;
		border-top: 1px solid var(--line);
	}
	.acc li {
		border-bottom: 1px solid var(--line);
	}
	.row {
		all: unset;
		box-sizing: border-box;
		width: 100%;
		display: grid;
		grid-template-columns: 48px 1fr 140px 100px 28px;
		align-items: center;
		gap: 16px;
		padding: 22px 0;
		cursor: pointer;
	}
	.row:focus-visible {
		outline: 2px solid var(--blue);
		outline-offset: 4px;
	}
	.title {
		font-size: clamp(26px, 4.2vw, 60px);
		font-weight: 700;
		font-variation-settings: 'wdth' 70;
		letter-spacing: -0.02em;
		line-height: 1;
		transition:
			font-variation-settings 0.4s,
			color 0.3s;
	}
	.row:hover .title,
	.open .title {
		font-variation-settings: 'wdth' 110;
		color: hsl(var(--h) 90% 70%);
	}
	.state {
		justify-self: start;
	}
	.state.live {
		color: #3ddc84;
	}
	.state.building {
		color: #ffc24d;
	}
	.plus {
		position: relative;
		width: 18px;
		height: 18px;
		justify-self: end;
	}
	.plus::before,
	.plus::after {
		content: '';
		position: absolute;
		inset: 8px 0;
		background: currentColor;
		transition: transform 0.35s cubic-bezier(0.3, 1.4, 0.5, 1);
	}
	.plus::after {
		transform: rotate(90deg);
	}
	.open .plus::after {
		transform: rotate(0);
	}
	.open .plus::before {
		transform: rotate(180deg);
	}
	.panel {
		display: grid;
		grid-template-rows: 0fr;
		transition: grid-template-rows 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
	}
	.open .panel {
		grid-template-rows: 1fr;
	}
	.panel > .inner {
		overflow: hidden;
		display: grid;
		grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
		gap: 32px;
	}
	.open .inner {
		padding-bottom: 28px;
	}
	.visual {
		margin-left: 64px;
		aspect-ratio: 16 / 9;
		border-radius: 10px;
		background: hsl(var(--h) 60% 18%);
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 6px;
		padding: 14px;
	}
	.visual span {
		border-radius: 50%;
		background: hsl(calc(var(--h) + var(--k) * 6) 80% 62%);
		opacity: calc(0.25 + (var(--k) / 16));
		aspect-ratio: 1;
		align-self: center;
		justify-self: center;
		width: 100%;
		max-height: 100%;
		scale: 0.4;
		transition: scale 0.6s cubic-bezier(0.3, 1.6, 0.5, 1) calc(var(--k) * 30ms);
	}
	.open .visual span {
		scale: 0.85;
	}
	.visual span:nth-child(3n) {
		border-radius: 6px;
	}
	.info {
		display: flex;
		flex-direction: column;
		gap: 14px;
		font-size: clamp(17px, 1.5vw, 20px);
		line-height: 1.45;
		max-width: 44ch;
	}
	.link {
		font-weight: 600;
		text-decoration: none;
		color: hsl(var(--h) 90% 70%);
	}
	.link:hover {
		text-decoration: underline;
	}

	.now {
		display: grid;
		grid-template-columns: 200px 1fr;
		padding: 0 clamp(16px, 3vw, 40px) clamp(56px, 10vh, 112px);
	}
	.now .tag {
		align-self: start;
		justify-self: start;
	}
	.now ul {
		list-style: none;
		padding: 0;
		font-size: clamp(22px, 2.6vw, 36px);
		font-variation-settings: 'wdth' 85;
		line-height: 1.25;
	}
	.now li {
		display: flex;
		gap: 16px;
		align-items: baseline;
	}

	footer {
		border-top: 1px solid var(--line);
		padding: clamp(40px, 8vh, 96px) clamp(16px, 3vw, 40px) 24px;
	}
	.mega {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: clamp(60px, 15vw, 260px);
		font-weight: 800;
		font-variation-settings: 'wdth' 62;
		letter-spacing: -0.03em;
		line-height: 0.85;
		text-decoration: none;
		transition:
			font-variation-settings 0.6s cubic-bezier(0.2, 0.8, 0.2, 1),
			color 0.3s;
	}
	.mega span {
		color: var(--pink);
		transition: transform 0.5s cubic-bezier(0.3, 1.6, 0.5, 1);
	}
	.mega:hover {
		font-variation-settings: 'wdth' 100;
		color: var(--blue);
	}
	.mega:hover span {
		transform: translateX(-0.1em) rotate(-20deg);
	}
	.links {
		display: flex;
		gap: 24px;
		flex-wrap: wrap;
		margin-top: 40px;
	}
	.links a {
		text-decoration: none;
	}
	.links a:hover {
		color: var(--blue);
	}

	@media (max-width: 860px) {
		.top a {
			display: none;
		}
		.hero-foot {
			flex-direction: column;
			align-items: flex-start;
		}
		.row {
			grid-template-columns: 32px 1fr auto 20px;
		}
		.kind {
			display: none;
		}
		.panel > .inner {
			grid-template-columns: 1fr;
		}
		.visual {
			margin-left: 0;
		}
		.now {
			grid-template-columns: 1fr;
			gap: 16px;
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.track {
			animation: none;
		}
		.status i {
			animation: none;
		}
	}
</style>
