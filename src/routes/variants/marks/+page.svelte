<script lang="ts">
	// Logo directions built from triangles and plain geometry. Each draws in a 100 × 100 box.
	type Mark = { id: string; name: string; idea: string; svg: string };

	const marks: Mark[] = [
		{ id: '01', name: 'Slash', idea: 'Two right triangles with a gap between them. A parallelogram that has been cut once.',
			svg: `<path d="M10 76 L46 24 L46 76Z"/><path d="M54 24 L90 24 L54 76Z"/>` },
		{ id: '02', name: 'Fold', idea: 'A sheet with one corner folded over. The triangle is the fold.',
			svg: `<path d="M16 14 H84 V54 H54 V84 H16Z"/><path d="M60 60 H84 L60 84Z"/>` },
		{ id: '03', name: 'Balance', idea: 'A triangle standing on its tip, exactly on a line. Slightly unlikely, perfectly still.',
			svg: `<path d="M24 22 H76 L50 74Z"/><rect x="18" y="78" width="64" height="5"/>` },
		{ id: '04', name: 'Hourglass', idea: 'Two triangles touching at one point. Time, a latch, a meeting.',
			svg: `<path d="M26 14 H74 L50 48Z"/><path d="M50 52 L74 86 H26Z"/>` },
		{ id: '05', name: 'Lift', idea: 'A small triangle floating above a large one. Something leaving the ground.',
			svg: `<path d="M12 86 L50 34 L88 86Z"/><path d="M42 26 L50 14 L58 26Z"/>` },
		{ id: '06', name: 'Pinwheel', idea: 'Three triangles turning around a point. Reads as motion without an arrow.',
			svg: `<g transform="translate(50 52)"><path d="M0 0 L0 -38 L30 -20Z"/><path d="M0 0 L0 -38 L30 -20Z" transform="rotate(120)"/><path d="M0 0 L0 -38 L30 -20Z" transform="rotate(240)"/></g>` },
		{ id: '07', name: 'Bite', idea: 'A right triangle with a small triangle taken out of its long side.',
			svg: `<path fill-rule="evenodd" d="M14 86 H86 V14Z M50 50 L60 60 L64 46Z"/>` },
		{ id: '08', name: 'Tiles', idea: 'Four half-squares in a 2 × 2 grid. One of them is turned the other way.',
			svg: `<path d="M14 14 H48 L14 48Z"/><path d="M52 14 H86 L52 48Z"/><path d="M14 52 H48 L14 86Z"/><path d="M86 52 V86 H52Z"/>` },
		{ id: '09', name: 'Half', idea: 'An outline triangle, half filled. A state between off and on.',
			svg: `<path d="M50 16 L88 82 H12Z" fill="none" stroke-width="5" stroke-linejoin="miter"/><path d="M50 16 L50 82 H12Z"/>` },
		{ id: '10', name: 'Notch', idea: 'A square with a triangle notch cut into its top edge. A fitting, a slot, a key.',
			svg: `<path d="M16 16 H40 L50 32 L60 16 H84 V84 H16Z"/>` },
		{ id: '11', name: 'Shift', idea: 'Two equal triangles, one stepped forward. A frame of a small movement.',
			svg: `<path d="M10 80 L36 30 L62 80Z" opacity=".28"/><path d="M38 80 L64 30 L90 80Z"/>` },
		{ id: '12', name: 'Corner', idea: 'A single right triangle sitting in the corner of an empty square frame.',
			svg: `<path d="M14 14 H86 V86 H14Z" fill="none" stroke-width="4"/><path d="M14 52 L52 86 H14Z"/>` }
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
	<p class="mono muted">Raffael Prem e.U. · Mark directions, round 2 · Nov 2026</p>
</header>

<section class="intro wrap">
	<h1>Round two. No letters.</h1>
	<p class="lead">
		Twelve abstract marks, all triangles. None of them spells anything; the name sits next to it.
		Each is shown large, at 32 and 16 px, and on ink.
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
