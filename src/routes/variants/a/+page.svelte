<script lang="ts">
	import { onMount } from 'svelte';
	import { person, projects, now, stack } from '$lib/content';

	const words = ['software', 'products', 'tools', 'small bets'];
	let wi = $state(0);
	let time = $state('');
	let hovered = $state<number | null>(null);
	let mx = $state(0);
	let my = $state(0);

	onMount(() => {
		const fmt = new Intl.DateTimeFormat('en-GB', {
			timeZone: person.tz,
			hour: '2-digit',
			minute: '2-digit'
		});
		const tick = () => (time = fmt.format(new Date()));
		tick();
		const t1 = setInterval(tick, 10_000);
		const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
		const t2 = reduce ? 0 : setInterval(() => (wi = (wi + 1) % words.length), 2400);
		return () => {
			clearInterval(t1);
			if (t2) clearInterval(t2);
		};
	});

	function move(e: PointerEvent) {
		mx = e.clientX;
		my = e.clientY;
	}
</script>

<svelte:head>
	<title>Variant A · Index</title>
	<link
		href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500&family=Instrument+Sans:wght@400;500;600&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<div class="page" onpointermove={move}>
	<header class="bar">
		<span class="mono">RP</span>
		<span class="mono dim">{person.city} · {time || '--:--'}</span>
		<a class="mono" href="mailto:{person.email}">Say hi ↗</a>
	</header>

	<section class="hero">
		<p class="mono dim kicker">
			{#if person.available}<span class="dot"></span> Open for a few projects{/if}
		</p>
		<h1>
			{person.first} makes
			<span class="swap" aria-live="polite">
				{#key wi}<em class="word">{words[wi]}</em>{/key}
			</span>
			<br />that people <span class="scribble">actually</span> use.
		</h1>
	</section>

	<section class="grid">
		<div class="col-label mono dim">01 — Day job</div>
		<div class="job">
			<p class="lead">
				{person.role} at
				<a href={person.companyUrl}>{person.company}</a>
				<span class="mono dim small">since {person.since}</span>
			</p>
			<p class="body">{person.jobBlurb}</p>
		</div>
	</section>

	<section class="grid">
		<div class="col-label mono dim">02 — Projects</div>
		<ol class="list" onpointerleave={() => (hovered = null)}>
			{#each projects as p, i}
				<li>
					<a
						href={p.url}
						class="row"
						class:faded={hovered !== null && hovered !== i}
						onpointerenter={() => (hovered = i)}
						onfocus={() => (hovered = i)}
						onblur={() => (hovered = null)}
					>
						<span class="mono dim n">{String(i + 1).padStart(2, '0')}</span>
						<span class="name">{p.name}</span>
						<span class="body blurb">{p.blurb}</span>
						<span class="mono dim meta">{p.kind} · {p.year}</span>
						<span class="mono status {p.status}">{p.status}</span>
					</a>
				</li>
			{/each}
		</ol>
	</section>

	<section class="grid">
		<div class="col-label mono dim">03 — Now</div>
		<ul class="now">
			{#each now as item}<li>{item}</li>{/each}
		</ul>
	</section>

	<section class="grid">
		<div class="col-label mono dim">04 — Tools</div>
		<p class="tools">
			{#each stack as s, i}<span>{s}{#if i < stack.length - 1}<i>,</i>{/if}</span>{/each}
		</p>
	</section>

	<footer>
		<a class="big" href="mailto:{person.email}">
			<span>Let’s make something</span>
			<em>good.</em>
		</a>
		<div class="foot mono dim">
			<a href={person.linkedin}>LinkedIn</a>
			<a href={person.github}>GitHub</a>
			<a href="/imprint">Imprint</a>
			<span>© {new Date().getFullYear()}</span>
		</div>
	</footer>

	{#if hovered !== null}
		{@const p = projects[hovered]}
		<div class="preview" style="--h:{p.hue}; transform: translate({mx + 24}px, {my - 90}px) rotate(-3deg)">
			<div class="pv-inner">
				<span>{p.name}</span>
				<small>{p.stack.join(' / ')}</small>
			</div>
		</div>
	{/if}
</div>

<style>
	.page {
		--paper: #f3efe6;
		--ink: #1b1a17;
		--dim: #7a7466;
		--line: #d9d2c3;
		--accent: #e2502b;
		background: var(--paper);
		color: var(--ink);
		min-height: 100vh;
		font-family: 'Instrument Sans', system-ui, sans-serif;
		padding: 0 clamp(16px, 5vw, 72px);
		overflow-x: clip;
	}
	.mono {
		font-family: 'JetBrains Mono', ui-monospace, monospace;
		font-size: 12px;
		letter-spacing: 0.02em;
		text-transform: uppercase;
	}
	.dim {
		color: var(--dim);
	}
	a {
		color: inherit;
	}
	.bar {
		display: flex;
		justify-content: space-between;
		padding: 22px 0;
		border-bottom: 1px solid var(--line);
	}
	.bar a {
		text-decoration: none;
	}
	.bar a:hover {
		color: var(--accent);
	}

	.hero {
		padding: clamp(64px, 14vh, 160px) 0 clamp(56px, 10vh, 120px);
	}
	.kicker {
		display: flex;
		align-items: center;
		gap: 8px;
		margin-bottom: 28px;
	}
	.dot {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: #3aa65b;
		box-shadow: 0 0 0 0 #3aa65b80;
		animation: pulse 2s infinite;
	}
	@keyframes pulse {
		70% {
			box-shadow: 0 0 0 8px #3aa65b00;
		}
	}
	h1 {
		font-family: 'Instrument Serif', serif;
		font-weight: 400;
		font-size: clamp(44px, 8.4vw, 128px);
		line-height: 0.98;
		letter-spacing: -0.02em;
		max-width: 16ch;
	}
	.swap {
		display: inline-grid;
	}
	.word {
		color: var(--accent);
		animation: in 0.6s cubic-bezier(0.2, 0.8, 0.2, 1);
	}
	@keyframes in {
		from {
			opacity: 0;
			transform: translateY(0.25em) rotate(2deg);
			filter: blur(4px);
		}
	}
	.scribble {
		position: relative;
		white-space: nowrap;
	}
	.scribble::after {
		content: '';
		position: absolute;
		left: -2%;
		right: -2%;
		bottom: 0.02em;
		height: 0.18em;
		background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 12' preserveAspectRatio='none'%3E%3Cpath d='M2 8 C 40 2, 80 11, 120 5 S 180 4, 198 7' fill='none' stroke='%23e2502b' stroke-width='3' stroke-linecap='round'/%3E%3C/svg%3E")
			no-repeat center / 100% 100%;
	}

	.grid {
		display: grid;
		grid-template-columns: 180px 1fr;
		gap: 24px;
		padding: 40px 0;
		border-top: 1px solid var(--line);
	}
	.col-label {
		padding-top: 8px;
	}
	.lead {
		font-family: 'Instrument Serif', serif;
		font-size: clamp(28px, 3.4vw, 44px);
		line-height: 1.1;
	}
	.lead a {
		font-style: italic;
		text-decoration-thickness: 1px;
		text-underline-offset: 4px;
	}
	.lead a:hover {
		color: var(--accent);
	}
	.small {
		font-size: 11px;
		vertical-align: middle;
		margin-left: 8px;
	}
	.body {
		font-size: 16px;
		line-height: 1.55;
		color: #4a463d;
		max-width: 52ch;
		margin-top: 12px;
	}

	.list {
		list-style: none;
		padding: 0;
		margin: 0;
	}
	.row {
		display: grid;
		grid-template-columns: 40px minmax(0, 1.1fr) minmax(0, 1.4fr) 140px 80px;
		align-items: baseline;
		gap: 16px;
		padding: 18px 0;
		border-bottom: 1px solid var(--line);
		text-decoration: none;
		transition:
			opacity 0.3s,
			padding 0.3s;
	}
	.row:hover,
	.row:focus-visible {
		padding-left: 12px;
		outline: none;
	}
	.row.faded {
		opacity: 0.35;
	}
	.name {
		font-family: 'Instrument Serif', serif;
		font-size: clamp(26px, 3vw, 38px);
		line-height: 1;
	}
	.row .blurb {
		margin: 0;
		font-size: 14px;
	}
	.status {
		justify-self: end;
		font-size: 10px;
		padding: 3px 8px;
		border: 1px solid currentColor;
		border-radius: 99px;
	}
	.status.live {
		color: #2f8a4c;
	}
	.status.building {
		color: var(--accent);
	}
	.status.paused {
		color: var(--dim);
	}

	.now {
		list-style: none;
		padding: 0;
		margin: 0;
		font-family: 'Instrument Serif', serif;
		font-size: clamp(22px, 2.4vw, 30px);
		line-height: 1.35;
	}
	.now li::before {
		content: '→ ';
		color: var(--accent);
	}
	.tools {
		font-family: 'Instrument Serif', serif;
		font-style: italic;
		font-size: clamp(22px, 2.4vw, 30px);
		line-height: 1.35;
		max-width: 34ch;
		display: flex;
		flex-wrap: wrap;
		column-gap: 0.3em;
	}
	.tools span {
		transition: color 0.2s;
	}
	.tools span:hover {
		color: var(--accent);
	}
	.tools i {
		color: var(--dim);
	}

	footer {
		border-top: 1px solid var(--ink);
		padding: clamp(56px, 12vh, 140px) 0 28px;
	}
	.big {
		display: block;
		font-family: 'Instrument Serif', serif;
		font-size: clamp(48px, 10vw, 156px);
		line-height: 0.95;
		letter-spacing: -0.02em;
		text-decoration: none;
	}
	.big em {
		color: var(--accent);
		display: inline-block;
		transition: transform 0.5s cubic-bezier(0.3, 1.6, 0.4, 1);
	}
	.big:hover em {
		transform: rotate(-6deg) translateY(-6px);
	}
	.foot {
		display: flex;
		gap: 24px;
		flex-wrap: wrap;
		margin-top: 64px;
	}
	.foot a {
		text-decoration: none;
	}
	.foot a:hover {
		color: var(--ink);
	}

	.preview {
		position: fixed;
		left: 0;
		top: 0;
		width: 240px;
		height: 160px;
		pointer-events: none;
		z-index: 10;
		transition: transform 0.18s cubic-bezier(0.2, 0.8, 0.2, 1);
		border-radius: 6px;
		background:
			radial-gradient(circle at 25% 30%, hsl(var(--h) 85% 72%) 0 22%, transparent 23%),
			repeating-linear-gradient(-45deg, hsl(var(--h) 60% 40% / 0.15) 0 2px, transparent 2px 10px),
			hsl(var(--h) 55% 52%);
		box-shadow: 0 20px 40px -12px #0005;
		animation: pop 0.25s cubic-bezier(0.3, 1.5, 0.5, 1);
	}
	@keyframes pop {
		from {
			scale: 0.6;
			opacity: 0;
		}
	}
	.pv-inner {
		position: absolute;
		inset: auto 12px 12px;
		color: #fff;
		display: flex;
		flex-direction: column;
	}
	.pv-inner span {
		font-family: 'Instrument Serif', serif;
		font-size: 26px;
	}
	.pv-inner small {
		font-family: 'JetBrains Mono', monospace;
		font-size: 10px;
		opacity: 0.85;
	}

	@media (max-width: 860px) {
		.grid {
			grid-template-columns: 1fr;
			gap: 12px;
		}
		.row {
			grid-template-columns: 32px 1fr auto;
		}
		.row .blurb {
			grid-column: 2 / -1;
		}
		.row .meta {
			grid-column: 2;
		}
		.row .status {
			grid-row: 1;
			grid-column: 3;
		}
		.preview {
			display: none;
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.word,
		.preview,
		.dot {
			animation: none;
		}
	}
</style>
