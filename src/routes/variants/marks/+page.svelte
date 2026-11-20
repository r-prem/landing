<script lang="ts">
	// Logo directions built from triangles and plain geometry. Each draws in a 100 × 100 box.
	type Mark = { id: string; name: string; idea: string; svg: string };

	const marks: Mark[] = [
		{
			id: 'A',
			name: 'Pennant',
			idea: 'A P made of one bar and one triangle. Also reads as a flag and as a play button: start something.',
			svg: `<rect x="24" y="14" width="14" height="72"/><path d="M38 14 L78 34 L38 54Z"/>`
		},
		{
			id: 'B',
			name: 'R and P, two parts',
			idea: 'P is a bar and a triangle; R is the same plus a second triangle for the leg. Two letters, three shapes.',
			svg: `<rect x="8" y="18" width="10" height="64"/><path d="M18 18 L44 33 L18 48Z"/><path d="M18 48 L44 82 L24 82 L18 74Z"/><rect x="56" y="18" width="10" height="64"/><path d="M66 18 L92 33 L66 48Z"/>`
		},
		{
			id: 'C',
			name: 'Diode',
			idea: 'The schematic symbol for a diode: current flows one way. A triangle that means something to anyone who reads circuits.',
			svg: `<rect x="6" y="47" width="22" height="6"/><path d="M28 24 L66 50 L28 76Z"/><rect x="66" y="24" width="8" height="52"/><rect x="74" y="47" width="20" height="6"/>`
		},
		{
			id: 'D',
			name: 'Pin 1',
			idea: 'A chip seen from above. Every IC marks pin 1 with a cut corner; here the cut is the whole logo.',
			svg: `<path d="M44 14 H86 V86 H14 V44Z"/><path d="M14 14 H30 L14 30Z"/>`
		},
		{
			id: 'E',
			name: 'Half-square RP',
			idea: 'R and P set on a 3 × 5 grid of squares and half-squares. Pixel type, but only 45° triangles allowed.',
			svg: `<g transform="translate(6 20)">${grid(['sst', 's.s', 'ssb', 's.r', 's.s'])}</g><g transform="translate(54 20)">${grid(['sst', 's.s', 'ssb', 's..', 's..'])}</g>`
		},
		{
			id: 'F',
			name: 'Prompt',
			idea: 'A run triangle and a cursor. What is on screen right before something starts working.',
			svg: `<path d="M14 26 L50 50 L14 74Z"/><rect x="58" y="66" width="30" height="8"/>`
		}
	];

	// s = full square, q = square, t = triangle top-right corner cut, b = bottom-right cut, r = leg triangle
	function grid(rows: string[]) {
		const u = 12;
		let out = '';
		rows.forEach((row, y) =>
			[...row].forEach((c, x) => {
				const X = x * u,
					Y = y * u;
				if (c === 's' || c === 'q') out += `<rect x="${X}" y="${Y}" width="${u}" height="${u}"/>`;
				if (c === 't') out += `<path d="M${X} ${Y} L${X + u} ${Y + u} L${X} ${Y + u}Z"/>`;
				if (c === 'b') out += `<path d="M${X} ${Y} L${X + u} ${Y} L${X} ${Y + u}Z"/>`;
				if (c === 'r') out += `<path d="M${X} ${Y} L${X + u} ${Y + u} L${X} ${Y + u}Z"/>`;
			})
		);
		return out;
	}
</script>

<svelte:head>
	<title>Raffael Prem e.U. · Mark directions</title>
</svelte:head>

<header class="top wrap">
	<p class="mono muted">Raffael Prem e.U. · Mark directions · Nov 2026</p>
</header>

<section class="intro wrap">
	<h1>Six marks, mostly triangles.</h1>
	<p class="lead">
		Each one is a handful of flat shapes on a grid. Shown large, at favicon size, and on ink. Copper
		is held back for the site, so every mark here is one colour.
	</p>
</section>

<section class="grid wrap">
	{#each marks as m}
		<article class="cell">
			<div class="stage">
				<svg viewBox="0 0 100 100" class="big" aria-label="{m.name} mark">{@html m.svg}</svg>
			</div>
			<div class="row">
				<div class="smalls">
					<svg viewBox="0 0 100 100" width="32" height="32" aria-hidden="true">{@html m.svg}</svg>
					<svg viewBox="0 0 100 100" width="16" height="16" aria-hidden="true">{@html m.svg}</svg>
					<span class="ink"><svg viewBox="0 0 100 100" width="28" height="28" aria-hidden="true">{@html m.svg}</svg></span>
				</div>
				<span class="mono muted">{m.id}</span>
			</div>
			<h2>{m.name}</h2>
			<p class="idea">{m.idea}</p>
		</article>
	{/each}
</section>

<style>
	.top {
		padding-block: 22px;
		border-bottom: 1px solid var(--line);
	}
	.intro {
		display: grid;
		gap: 16px;
		padding-block: clamp(48px, 8vh, 96px) 40px;
	}
	h1 {
		font-size: clamp(40px, 5.5vw, 72px);
		line-height: 0.95;
	}
	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		gap: 1px;
		padding-block: 0 96px;
	}
	.cell {
		display: grid;
		gap: 12px;
		align-content: start;
		padding: 20px;
		background: var(--surface);
		outline: 1px solid var(--line);
		min-width: 0;
	}
	.stage {
		aspect-ratio: 1;
		max-width: 100%;
		display: grid;
		place-items: center;
		background-image: radial-gradient(var(--line) 1px, transparent 1px);
		background-size: 12px 12px;
		border-radius: 8px;
	}
	.big {
		width: 62%;
		height: auto;
		fill: var(--text);
	}
	/* a hair of stroke in the fill colour closes anti-aliasing seams where shapes meet */
	.cell :global(svg) {
		stroke: currentColor;
		stroke-width: 0.6;
		stroke-linejoin: miter;
		color: var(--text);
	}
	.ink :global(svg) {
		color: var(--bg);
	}
	.row {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.smalls {
		display: flex;
		gap: 14px;
		align-items: center;
		fill: var(--text);
	}
	.ink {
		display: grid;
		place-items: center;
		width: 44px;
		height: 44px;
		border-radius: 10px;
		background: var(--text);
		fill: var(--bg);
	}
	h2 {
		font-size: 22px;
		margin-top: 4px;
	}
	.idea {
		color: var(--body);
		font-size: 15px;
		line-height: 1.5;
	}
</style>
