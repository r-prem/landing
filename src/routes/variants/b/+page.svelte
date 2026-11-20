<script lang="ts">
	import { person, projects, now, stack } from '$lib/content';

	type Card = { id: string; x: number; y: number; r: number; z: number };

	// positions in % of desk width / px from top
	let cards = $state<Card[]>([
		{ id: 'job', x: 4, y: 40, r: -2, z: 1 },
		{ id: 'p0', x: 38, y: 10, r: 3, z: 2 },
		{ id: 'p1', x: 68, y: 70, r: -4, z: 3 },
		{ id: 'p2', x: 44, y: 330, r: -1.5, z: 4 },
		{ id: 'p3', x: 74, y: 380, r: 5, z: 5 },
		{ id: 'now', x: 6, y: 380, r: 2, z: 6 },
		{ id: 'note', x: 24, y: 600, r: -6, z: 7 }
	]);
	let top = 10;
	let dragging = $state<string | null>(null);
	let desk: HTMLElement;
	let start = { px: 0, py: 0, x: 0, y: 0 };
	let moved = false;

	const get = (id: string) => cards.find((c) => c.id === id)!;

	function down(e: PointerEvent, id: string) {
		if (matchMedia('(max-width: 900px)').matches) return;
		const c = get(id);
		c.z = ++top;
		dragging = id;
		moved = false;
		start = { px: e.clientX, py: e.clientY, x: c.x, y: c.y };
		(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
	}
	function move(e: PointerEvent) {
		if (!dragging) return;
		const c = get(dragging);
		const w = desk.clientWidth;
		const dx = e.clientX - start.px;
		const dy = e.clientY - start.py;
		if (Math.abs(dx) + Math.abs(dy) > 4) moved = true;
		c.x = Math.min(88, Math.max(-4, start.x + (dx / w) * 100));
		c.y = Math.max(-20, start.y + dy);
		c.r = Math.max(-8, Math.min(8, dx * 0.02));
	}
	function up() {
		if (!dragging) return;
		const c = get(dragging);
		c.r = Math.round((Math.random() - 0.5) * 8);
		dragging = null;
	}
	function guardClick(e: MouseEvent) {
		if (moved) e.preventDefault();
	}
	function style(id: string) {
		const c = get(id);
		return `--x:${c.x}%;--y:${c.y}px;--r:${c.r}deg;z-index:${c.z}`;
	}
</script>

<svelte:head>
	<title>Variant B · Desk</title>
	<link
		href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,600;12..96,800&family=Caveat:wght@500&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<svelte:window onpointermove={move} onpointerup={up} />

<div class="page">
	<nav>
		<a href="/variants/b" class="logo">rp<span>.</span></a>
		<div class="links">
			<a href="#desk">Work</a>
			<a href={person.linkedin}>LinkedIn</a>
			<a class="pill" href="mailto:{person.email}">Get in touch</a>
		</div>
	</nav>

	<header class="hero">
		<h1>
			Hi, I’m {person.first}.<br />
			I build <span class="hl">useful</span> things<br class="br" /> for the web &amp; your pocket.
		</h1>
		<p class="sub">
			{person.role} by day, side-project hoarder by night. Based in {person.city}.
		</p>
		<p class="hint" aria-hidden="true">psst, the cards below are draggable ↓</p>
	</header>

	<main id="desk" class="desk" class:busy={dragging} bind:this={desk}>
		<article class="card job" style={style('job')} onpointerdown={(e) => down(e, 'job')}>
			<div class="tape"></div>
			<p class="label">Currently</p>
			<h2>{person.role}</h2>
			<p class="at">@ <a href={person.companyUrl} onclick={guardClick}>{person.company}</a></p>
			<p class="text">{person.jobBlurb}</p>
			<p class="since">since {person.since}</p>
		</article>

		{#each projects as p, i}
			<a
				href={p.url}
				class="card project"
				style="{style('p' + i)};--h:{p.hue}"
				onpointerdown={(e) => down(e, 'p' + i)}
				onclick={guardClick}
				draggable="false"
			>
				<div class="shot">
					<span class="badge {p.status}">{p.status}</span>
					<svg viewBox="0 0 100 60" aria-hidden="true">
						<circle cx={20 + i * 14} cy="28" r="18" fill="hsl({p.hue} 90% 80%)" />
						<rect x="52" y="16" width="34" height="6" rx="3" fill="#fff8" />
						<rect x="52" y="28" width="22" height="6" rx="3" fill="#fff6" />
						<rect x="52" y="40" width="28" height="6" rx="3" fill="#fff4" />
					</svg>
				</div>
				<div class="meta">
					<h3>{p.name}</h3>
					<span>{p.kind} · {p.year}</span>
				</div>
				<p class="text">{p.blurb}</p>
				<ul class="chips">
					{#each p.stack as s}<li>{s}</li>{/each}
				</ul>
			</a>
		{/each}

		<article class="card now" style={style('now')} onpointerdown={(e) => down(e, 'now')}>
			<p class="label">Now</p>
			<ul>
				{#each now as n}<li>{n}</li>{/each}
			</ul>
		</article>

		<article class="card note" style={style('note')} onpointerdown={(e) => down(e, 'note')}>
			<p>things I reach for:</p>
			<p class="stack">{stack.slice(0, 6).join(' · ')}</p>
		</article>
	</main>

	<section class="cta">
		<h2>Got a project that needs<br />a pair of hands?</h2>
		<a class="button" href="mailto:{person.email}">
			<span>Write me an email</span>
			<span class="arrow">→</span>
		</a>
	</section>

	<footer>
		<span>© {new Date().getFullYear()} {person.name}</span>
		<span><a href={person.github}>GitHub</a> · <a href="/imprint">Imprint</a></span>
	</footer>
</div>

<style>
	.page {
		--bg: #eeece4;
		--ink: #16231d;
		--muted: #5d6a63;
		--green: #1f4d3a;
		--yellow: #ffd84d;
		--card: #fffdf7;
		background: var(--bg);
		color: var(--ink);
		font-family: 'Bricolage Grotesque', system-ui, sans-serif;
		min-height: 100vh;
		overflow-x: clip;
	}
	a {
		color: inherit;
	}
	nav {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20px clamp(16px, 4vw, 48px);
	}
	.logo {
		font-weight: 800;
		font-size: 26px;
		text-decoration: none;
		letter-spacing: -0.04em;
	}
	.logo span {
		color: #e4572e;
	}
	.links {
		display: flex;
		gap: 22px;
		align-items: center;
		font-size: 15px;
	}
	.links a {
		text-decoration: none;
	}
	.pill {
		background: var(--ink);
		color: var(--bg) !important;
		padding: 9px 16px;
		border-radius: 99px;
		transition: transform 0.2s;
	}
	.pill:hover {
		transform: rotate(-3deg) scale(1.04);
	}

	.hero {
		padding: clamp(48px, 10vh, 110px) clamp(16px, 4vw, 48px) 32px;
		max-width: 1100px;
	}
	h1 {
		font-size: clamp(40px, 6.6vw, 92px);
		line-height: 0.98;
		letter-spacing: -0.045em;
		font-weight: 800;
	}
	.hl {
		background: var(--yellow);
		padding: 0 0.12em;
		border-radius: 0.12em;
		display: inline-block;
		transform: rotate(-2deg);
	}
	.sub {
		margin-top: 24px;
		font-size: clamp(17px, 1.6vw, 21px);
		color: var(--muted);
		max-width: 46ch;
	}
	.hint {
		font-family: 'Caveat', cursive;
		font-size: 24px;
		color: #e4572e;
		margin-top: 28px;
		transform: rotate(-2deg);
	}

	.desk {
		position: relative;
		height: 860px;
		margin: 0 clamp(8px, 2vw, 24px);
		border-radius: 28px;
		background-color: var(--green);
		background-image: radial-gradient(#ffffff1f 1.2px, transparent 1.2px);
		background-size: 22px 22px;
		box-shadow: inset 0 2px 30px #0004;
		touch-action: pan-y;
	}
	.card {
		position: absolute;
		left: var(--x);
		top: calc(var(--y) + 40px);
		width: 300px;
		background: var(--card);
		border-radius: 14px;
		padding: 16px;
		transform: rotate(var(--r));
		box-shadow:
			0 1px 0 #0000000d,
			0 10px 24px -8px #0006;
		cursor: grab;
		user-select: none;
		text-decoration: none;
		transition:
			transform 0.35s cubic-bezier(0.3, 1.5, 0.5, 1),
			box-shadow 0.25s;
	}
	.card:hover {
		box-shadow:
			0 1px 0 #0000000d,
			0 22px 40px -12px #0007;
	}
	.desk.busy .card {
		transition: box-shadow 0.25s;
		cursor: grabbing;
	}
	.label {
		font-size: 12px;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: var(--muted);
		font-weight: 600;
	}
	.text {
		font-size: 14.5px;
		line-height: 1.45;
		color: var(--muted);
		margin-top: 8px;
	}

	.job {
		width: 320px;
		background: var(--yellow);
		padding: 22px;
	}
	.job h2 {
		font-size: 30px;
		line-height: 1;
		letter-spacing: -0.03em;
		margin-top: 8px;
	}
	.job .at {
		font-size: 18px;
		margin-top: 4px;
	}
	.job .text {
		color: #3d3a20;
	}
	.since {
		font-family: 'Caveat', cursive;
		font-size: 22px;
		margin-top: 10px;
	}
	.tape {
		position: absolute;
		top: -12px;
		left: 50%;
		width: 90px;
		height: 24px;
		translate: -50% 0;
		rotate: -4deg;
		background: #ffffffa8;
		box-shadow: 0 1px 2px #0002;
	}

	.shot {
		position: relative;
		aspect-ratio: 5 / 3;
		border-radius: 8px;
		background: hsl(var(--h) 55% 48%);
		overflow: hidden;
	}
	.shot svg {
		width: 100%;
		height: 100%;
		transition: transform 0.5s cubic-bezier(0.3, 1.4, 0.5, 1);
	}
	.project:hover .shot svg {
		transform: scale(1.08) rotate(-2deg);
	}
	.badge {
		position: absolute;
		top: 8px;
		left: 8px;
		font-size: 11px;
		font-weight: 600;
		padding: 2px 8px;
		border-radius: 99px;
		background: #fff;
		text-transform: capitalize;
	}
	.badge.live::before {
		content: '● ';
		color: #23a55a;
	}
	.badge.building::before {
		content: '● ';
		color: #e4a72e;
	}
	.badge.paused::before {
		content: '● ';
		color: #999;
	}
	.meta {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		margin-top: 12px;
	}
	.meta h3 {
		font-size: 21px;
		letter-spacing: -0.03em;
	}
	.meta span {
		font-size: 12px;
		color: var(--muted);
	}
	.chips {
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
		list-style: none;
		padding: 0;
		margin-top: 12px;
	}
	.chips li {
		font-size: 12px;
		padding: 3px 9px;
		border-radius: 99px;
		background: hsl(var(--h) 60% 92%);
		color: hsl(var(--h) 50% 25%);
	}

	.now {
		width: 280px;
		background: #f7f4ff;
	}
	.now ul {
		padding-left: 18px;
		margin-top: 8px;
		font-size: 16px;
		line-height: 1.45;
	}
	.note {
		width: 230px;
		background: #ffb8a1;
		font-family: 'Caveat', cursive;
		font-size: 24px;
		line-height: 1.15;
		border-radius: 2px;
	}
	.note .stack {
		font-size: 20px;
		margin-top: 6px;
	}

	.cta {
		padding: clamp(72px, 14vh, 140px) clamp(16px, 4vw, 48px);
		text-align: center;
	}
	.cta h2 {
		font-size: clamp(34px, 5vw, 68px);
		line-height: 1;
		letter-spacing: -0.04em;
		font-weight: 800;
	}
	.button {
		display: inline-flex;
		gap: 12px;
		align-items: center;
		margin-top: 36px;
		background: #e4572e;
		color: #fff;
		padding: 18px 28px;
		border-radius: 99px;
		font-size: 19px;
		font-weight: 600;
		text-decoration: none;
		box-shadow: 0 6px 0 #a63a1a;
		transition:
			transform 0.15s,
			box-shadow 0.15s;
	}
	.button:hover {
		transform: translateY(-2px);
		box-shadow: 0 8px 0 #a63a1a;
	}
	.button:active {
		transform: translateY(5px);
		box-shadow: 0 1px 0 #a63a1a;
	}
	.arrow {
		transition: transform 0.3s cubic-bezier(0.3, 1.6, 0.5, 1);
	}
	.button:hover .arrow {
		transform: translateX(6px);
	}
	footer {
		display: flex;
		justify-content: space-between;
		padding: 24px clamp(16px, 4vw, 48px);
		font-size: 14px;
		color: var(--muted);
		border-top: 1px solid #0001;
	}

	@media (max-width: 900px) {
		.links a:not(.pill) {
			display: none;
		}
		.hint,
		.br {
			display: none;
		}
		.desk {
			height: auto;
			display: grid;
			gap: 20px;
			padding: 28px 16px;
		}
		.card {
			position: relative;
			left: auto;
			top: auto;
			width: auto;
			cursor: default;
			transform: rotate(calc(var(--r) * 0.4));
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.card,
		.shot svg {
			transition: none;
		}
	}
</style>
