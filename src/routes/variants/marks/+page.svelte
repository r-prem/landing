<script lang="ts">
	import Wire from '$lib/brand/Wire.svelte';

	type Solid = { kind: 'solid'; id: string; name: string; idea: string; shape: 'tetra' | 'octa' | 'icosa'; yaw: number; pitch: number };
	type Flat = { kind: 'flat'; id: string; name: string; idea: string; svg: (s: number) => string };

	// Flat line marks are drawn in a 100 × 100 box; `s` is the stroke width in px.
	const tri = (pts: number[][]) => `M${pts.map((p) => p.join(' ')).join(' L')}Z`;

	function mesh(s: number) {
		const p: Record<string, number[]> = { A: [10, 72], B: [34, 28], C: [56, 60], D: [82, 20], E: [90, 72], F: [42, 90] };
		const t = ['ABC', 'BDC', 'CDE', 'ACF', 'CEF'];
		const lines = t.map((k) => `<path d="${tri([...k].map((c) => p[c]))}" class="ln" stroke-width="${s}"/>`).join('');
		return `<path d="${tri(['B', 'D', 'C'].map((c) => p[c]))}" class="fill"/>${lines}<circle cx="82" cy="20" r="3.6" class="node"/>`;
	}

	function construction(s: number) {
		const h = (72 * Math.sqrt(3)) / 2;
		const A = [50, 14], B = [14, 14 + h], C = [86, 14 + h];
		const G = [50, 14 + (2 * h) / 3];
		const r = 72 / (2 * Math.sqrt(3));
		const mid = (a: number[], b: number[]) => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
		const med = [[A, mid(B, C)], [B, mid(A, C)], [C, mid(A, B)]]
			.map(([a, b]) => `<path d="M${a.join(' ')} L${b.join(' ')}" class="ln dash" stroke-width="${s * 0.75}"/>`)
			.join('');
		return `${med}<circle cx="${G[0]}" cy="${G[1]}" r="${r}" class="ln blue" stroke-width="${s}"/><path d="${tri([A, B, C])}" class="ln" stroke-width="${s}"/><circle cx="${G[0]}" cy="${G[1]}" r="3.4" class="node"/>`;
	}

	function nested(s: number) {
		let t = [[50, 10], [10, 80], [90, 80]];
		let out = '';
		for (let i = 0; i < 9; i++) {
			out += `<path d="${tri(t)}" class="ln${i === 8 ? ' blue' : ''}" stroke-width="${s * (i === 0 ? 1 : 0.8)}"/>`;
			const k = 0.16;
			t = t.map((p, j) => {
				const q = t[(j + 1) % 3];
				return [p[0] + (q[0] - p[0]) * k, p[1] + (q[1] - p[1]) * k];
			});
		}
		return out + `<circle cx="50" cy="10" r="3.4" class="node"/>`;
	}

	const marks: (Solid | Flat)[] = [
		{ kind: 'solid', id: '01', name: 'Tetra', shape: 'tetra', yaw: 60, pitch: -35,
			idea: 'The simplest solid: four triangles. Drawn like a technical drawing, hidden edges dashed, one face in cobalt. It turns when you hover.' },
		{ kind: 'solid', id: '02', name: 'Octa', shape: 'octa', yaw: 22, pitch: -24,
			idea: 'Eight triangles, two pyramids base to base. Reads as a diamond from the front and as a structure once it turns.' },
		{ kind: 'solid', id: '03', name: 'Icosa', shape: 'icosa', yaw: 18, pitch: -12,
			idea: 'Twenty triangles, the start of every sphere in a 3D printer file or a game engine. A globe made of the smallest possible part.' },
		{ kind: 'flat', id: '04', name: 'Mesh', svg: mesh,
			idea: 'A small piece of a triangulated surface, the way a slicer or a renderer sees the world. One cell filled, one node lit.' },
		{ kind: 'flat', id: '05', name: 'Construction', svg: construction,
			idea: 'An equilateral triangle with its incircle and medians, as drawn with a compass and ruler. Geometry showing its working.' },
		{ kind: 'flat', id: '06', name: 'Spiral', svg: nested,
			idea: 'A triangle redrawn inside itself, each time turned a little. Iteration in nine lines.' }
	];
</script>

<svelte:head>
	<title>Raffael Prem e.U. · Mark directions</title>
</svelte:head>

<div class="pal">
	<header class="top wrap">
		<p class="mono muted">Raffael Prem e.U. · Mark directions, round 3 · Nov 2026</p>
		<ul class="swatches mono">
			<li><i style="background:var(--ink)"></i>Ink</li>
			<li><i style="background:var(--cobalt)"></i>Cobalt</li>
			<li><i style="background:var(--amber)"></i>Amber</li>
		</ul>
	</header>

	<section class="intro wrap">
		<h1>Line drawings, all triangles.</h1>
		<p class="lead">
			Every 3D model, every file a printer slices and every frame a GPU draws is made of triangles.
			These marks are drawn the way a technical drawing would show them: thin lines, hidden edges
			dashed. Cobalt fills one face, amber marks one point. The solids are live geometry; hover to
			turn them.
		</p>
	</section>

	<section class="grid wrap">
		{#each marks as m}
			<article class="cell" data-spin>
				<div class="stage">
					{#if m.kind === 'solid'}
						<Wire shape={m.shape} size={220} yaw={m.yaw} pitch={m.pitch} stroke={1.6} />
					{:else}
						<svg viewBox="0 0 100 100" width="220" height="220" class="flat">{@html m.svg(0.9)}</svg>
					{/if}
				</div>
				<div class="row">
					<div class="smalls">
						{#if m.kind === 'solid'}
							<Wire shape={m.shape} size={40} yaw={m.yaw} pitch={m.pitch} stroke={1.3} spin={false} />
							<Wire shape={m.shape} size={20} yaw={m.yaw} pitch={m.pitch} stroke={1.1} spin={false} node={false} />
						{:else}
							<svg viewBox="0 0 100 100" width="40" height="40" class="flat">{@html m.svg(3)}</svg>
							<svg viewBox="0 0 100 100" width="20" height="20" class="flat">{@html m.svg(5.5)}</svg>
						{/if}
						<span class="lockup">
							{#if m.kind === 'solid'}
								<Wire shape={m.shape} size={26} yaw={m.yaw} pitch={m.pitch} stroke={1.2} spin={false} />
							{:else}
								<svg viewBox="0 0 100 100" width="26" height="26" class="flat">{@html m.svg(4.5)}</svg>
							{/if}
							Raffael Prem
						</span>
					</div>
					<span class="mono muted">{m.id}</span>
				</div>
				<h2>{m.name}</h2>
				<p class="idea">{m.idea}</p>
			</article>
		{/each}
	</section>
</div>

<style>
	.pal {
		--ink: #17171c;
		--paper: #f4f4f2;
		--cobalt: #2e5bff;
		--amber: #ffa81e;
		--hidden: #a3a3ab;
	}
	@media (prefers-color-scheme: dark) {
		.pal {
			--ink: #ececef;
			--paper: #0b0b0d;
			--cobalt: #6d8bff;
			--amber: #ffb53d;
			--hidden: #55555c;
		}
	}
	.top {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 16px;
		flex-wrap: wrap;
		padding-block: 22px;
		border-bottom: 1px solid var(--line);
	}
	.swatches {
		display: flex;
		gap: 16px;
		list-style: none;
		padding: 0;
		color: var(--muted);
	}
	.swatches li {
		display: flex;
		align-items: center;
		gap: 6px;
	}
	.swatches i {
		width: 10px;
		height: 10px;
		border-radius: 2px;
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
		grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
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
		border-radius: 8px;
		background-image:
			linear-gradient(var(--line-subtle, var(--line)) 1px, transparent 1px),
			linear-gradient(90deg, var(--line-subtle, var(--line)) 1px, transparent 1px);
		background-size: 24px 24px;
		background-position: center;
	}
	.flat {
		overflow: visible;
		max-width: 100%;
	}
	.flat :global(.ln) {
		fill: none;
		stroke: var(--ink);
		stroke-linejoin: round;
		stroke-linecap: round;
	}
	.flat :global(.ln.blue) {
		stroke: var(--cobalt);
	}
	.flat :global(.ln.dash) {
		stroke: var(--hidden);
		stroke-dasharray: 3 3;
	}
	.flat :global(.fill) {
		fill: var(--cobalt);
		opacity: 0.16;
	}
	.flat :global(.node) {
		fill: var(--amber);
		stroke: var(--surface);
		stroke-width: 1.2;
	}
	.row {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 8px;
	}
	.smalls {
		display: flex;
		gap: 14px;
		align-items: center;
		min-width: 0;
	}
	.lockup {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		font-weight: 600;
		letter-spacing: -0.02em;
		font-size: 15px;
		padding-left: 14px;
		border-left: 1px solid var(--line);
		white-space: nowrap;
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
