<script lang="ts">
	import Mark from '$lib/brand/Mark.svelte';
	import Lockup from '$lib/brand/Lockup.svelte';

	const colours = [
		{ name: 'Ink', token: '--text', hex: '#161616', role: 'Text, the mark, rules.' },
		{ name: 'Paper', token: '--bg', hex: '#F3F3F1', role: 'Ground. A grey, not a cream.' },
		{ name: 'Line', token: '--line', hex: '#E2E2DF', role: 'Hairlines and grids.' },
		{ name: 'Muted', token: '--muted', hex: '#75756F', role: 'Labels, captions, metadata.' },
		{ name: 'Copper', token: '--copper', hex: '#B0682A', role: 'Live right now. Nothing else.' }
	];

	const scale = [
		{ px: 64, use: 'Page title' },
		{ px: 36, use: 'Section' },
		{ px: 22, use: 'Lead' },
		{ px: 16, use: 'Body' },
		{ px: 12, use: 'Mono label' }
	];

	const voice = [
		['Write “I”.', 'It is one person. No “we”, no “our team”.'],
		['Sentence case.', 'Headlines too. No exclamation marks, no emoji.'],
		['Numbers with units.', '“6 sensors, 2 years on one cell”, not “efficient and scalable”.'],
		['Say what it is.', 'A keyboard, a booking app, a sensor. Not a “solution”.']
	];

	// Construction drawing: grid every 6 units, pitch 18 units = 2.54 mm.
	const dots: [number, number][] = [];
	for (let x = 0; x <= 66; x += 6) for (let y = 0; y <= 48; y += 6) dots.push([x, y]);
</script>

<svelte:head>
	<title>Raffael Prem e.U. · Brand</title>
</svelte:head>

<header class="top wrap">
	<Lockup size={30} />
	<span class="mono muted">Brand sheet · rev A · Nov 2026</span>
</header>

<section class="hero wrap">
	<div class="hero-mark">
		<Mark size={260} />
	</div>
	<div class="hero-text">
		<p class="mono muted">Raffael Prem e.U. · Linz, Austria</p>
		<h1>A three-pin part.</h1>
		<p class="lead">
			The mark is R and P routed as copper traces and dropped onto three pads at a 2.54 mm pitch,
			the spacing of every breadboard and pin header. It reads as initials to most people and as a
			component to the ones who solder.
		</p>
	</div>
</section>

<section class="block wrap">
	<p class="tag mono">01 Construction</p>
	<div class="body two">
		<figure class="drawing">
			<svg viewBox="-14 -10 96 80" role="img" aria-label="Construction drawing of the mark on its grid">
				{#each dots as [x, y]}
					<circle cx={x} cy={y} r="0.45" class="gdot" />
				{/each}
				<g fill="none" class="trace" stroke-width="5" stroke-linejoin="miter">
					<path d="M6 41 V6 H19 L25 12 V16 L19 22 H6 M12 22 L24 34 V41" />
					<path d="M42 41 V6 H55 L61 12 V16 L55 22 H42" />
				</g>
				<g class="pad">
					<circle cx="6" cy="42" r="5" /><circle cx="24" cy="42" r="5" /><circle cx="42" cy="42" r="5" />
				</g>
				<g class="drill">
					<circle cx="6" cy="42" r="2" /><circle cx="24" cy="42" r="2" /><circle cx="42" cy="42" r="2" />
				</g>
				<!-- centre lines and pitch dimensions -->
				<g class="dim">
					<path d="M6 49 V58 M24 49 V58 M42 49 V58" />
					<path d="M6 55 H24 M24 55 H42" />
					<path d="M6 55 l2 -1.2 v2.4z M24 55 l-2 -1.2 v2.4z M24 55 l2 -1.2 v2.4z M42 55 l-2 -1.2 v2.4z" class="arrow" />
				</g>
				<text x="15" y="53" class="dimtext">2.54</text>
				<text x="33" y="53" class="dimtext">2.54</text>
				<g class="dim">
					<path d="M68 6 H74 M68 22 H74 M71 6 V22" />
				</g>
				<text x="76" y="15" class="dimtext" style="text-anchor:start">bowl</text>
				<text x="61" y="31" class="note">45°</text>
				<path d="M58 28 L56 26" class="dim" />
			</svg>
			<figcaption class="mono muted">Grid at a third of a pitch. Every vertex sits on it.</figcaption>
		</figure>
		<ul class="rules">
			<li><span class="mono">Pitch</span>Pads sit 2.54 mm apart, measured centre to centre. They never move.</li>
			<li><span class="mono">Bends</span>Traces turn at 45° or 90°, never on a curve. Corners are chamfered, like routed copper.</li>
			<li><span class="mono">Drill</span>Copper shows only in the drill holes. Below 24 px the holes close and the traces thicken.</li>
			<li><span class="mono">Clear space</span>One pad diameter on every side. Nothing else touches the mark.</li>
		</ul>
	</div>
</section>

<section class="block wrap">
	<p class="tag mono">02 Sizes</p>
	<div class="body">
		<div class="sizes">
			{#each [128, 64, 32, 20, 16] as s}
				<div class="size">
					<div class="size-box"><Mark size={s} /></div>
					<span class="mono muted">{s} px</span>
				</div>
			{/each}
		</div>
		<div class="lockups">
			<div class="lockup-box"><Lockup size={44} /></div>
			<div class="lockup-box"><Lockup size={44} stacked /></div>
			<div class="lockup-box inverse"><Lockup size={44} /></div>
		</div>
	</div>
</section>

<section class="block wrap">
	<p class="tag mono">03 Colour</p>
	<div class="body">
		<p class="lead">
			Near-monochrome, like a datasheet. Copper is the only colour and it has one job: it marks what
			is live right now. A project in progress, the current job, an open slot.
		</p>
		<ul class="swatches">
			{#each colours as c}
				<li>
					<span class="chip" style="background: var({c.token})"></span>
					<span class="sw-name">{c.name}</span>
					<span class="mono muted">{c.hex}</span>
					<span class="sw-role">{c.role}</span>
				</li>
			{/each}
		</ul>
	</div>
</section>

<section class="block wrap">
	<p class="tag mono">04 Type</p>
	<div class="body">
		<div class="specimen">
			<div>
				<p class="mono muted">Geist · 400 / 600</p>
				<p class="big">Aa Rr Pp 0123</p>
			</div>
			<div>
				<p class="mono muted">Geist Mono · 400</p>
				<p class="big monoface">Aa Rr Pp 0123</p>
			</div>
		</div>
		<ol class="scale">
			{#each scale as s}
				<li>
					<span class="mono muted">{s.px}</span>
					<span class:monoface={s.px === 12} style="font-size:{s.px}px">{s.use}</span>
				</li>
			{/each}
		</ol>
	</div>
</section>

<section class="block wrap">
	<p class="tag mono">05 Voice</p>
	<div class="body">
		<dl class="voice">
			{#each voice as [rule, why]}
				<div><dt>{rule}</dt><dd>{why}</dd></div>
			{/each}
		</dl>
	</div>
</section>

<section class="block wrap">
	<p class="tag mono">06 In use</p>
	<div class="body uses">
		<figure>
			<div class="card front">
				<Mark size={56} />
				<span class="mono">rprem.com</span>
			</div>
			<figcaption class="mono muted">Business card, front · 85 × 55 mm</figcaption>
		</figure>
		<figure>
			<div class="card back">
				<div>
					<p class="c-name">Raffael Prem</p>
					<p class="c-role">Software and hardware</p>
				</div>
				<div class="c-lines mono">
					<span>hello@rprem.com</span>
					<span>Scharitzerstraße 5, 4020 Linz</span>
				</div>
				<span class="c-pads" aria-hidden="true"><i></i><i></i><i></i></span>
			</div>
			<figcaption class="mono muted">Back</figcaption>
		</figure>
		<figure class="wide">
			<div class="invoice">
				<div class="inv-head">
					<Lockup size={30} />
					<div class="mono inv-meta">
						<span>Rechnung</span><b>2026-041</b>
						<span>Datum</span><b>20.11.2026</b>
						<span>GISA</span><b>37738174</b>
					</div>
				</div>
				<table class="mono">
					<thead><tr><th>Pos</th><th>Leistung</th><th>Std</th><th>Betrag</th></tr></thead>
					<tbody>
						<tr><td>1</td><td>Entwicklung Buchungssystem, Sprint 3</td><td>32,0</td><td>€ 0,00</td></tr>
						<tr><td>2</td><td>Hosting und Wartung, November</td><td>4,0</td><td>€ 0,00</td></tr>
					</tbody>
				</table>
				<p class="mono muted inv-foot">Raffael Prem e.U. · Scharitzerstraße 5 · 4020 Linz · Magistrat der Stadt Linz</p>
			</div>
			<figcaption class="mono muted">Invoice header. Same grid, same mono for every number.</figcaption>
		</figure>
		<figure>
			<div class="tabs">
				<div class="tab"><Mark size={16} /><span>Raffael Prem</span></div>
				<div class="tab dim-tab"><span class="fake"></span><span>Inbox</span></div>
			</div>
			<figcaption class="mono muted">Favicon at 16 px, holes closed</figcaption>
		</figure>
		<figure>
			<div class="avatar"><Mark size={70} ink="#F3F3F1" /></div>
			<figcaption class="mono muted">Avatar on ink</figcaption>
		</figure>
	</div>
</section>

<footer class="wrap foot">
	<Lockup size={22} />
	<span class="mono muted">Placeholder amounts on the invoice. Card copy is a draft.</span>
</footer>

<style>
	.top {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-block: 22px;
		border-bottom: 1px solid var(--line);
		gap: 16px;
		flex-wrap: wrap;
	}
	.hero {
		display: grid;
		grid-template-columns: auto 1fr;
		align-items: end;
		gap: clamp(32px, 6vw, 96px);
		padding-block: clamp(56px, 10vh, 120px);
	}
	.hero-mark {
		color: var(--text);
	}
	.hero-text {
		display: grid;
		gap: 20px;
		min-width: 0;
	}
	h1 {
		font-size: clamp(44px, 6vw, 80px);
		line-height: 0.95;
	}

	.block {
		display: grid;
		grid-template-columns: 180px minmax(0, 1fr);
		gap: 24px;
		padding-block: 48px;
		border-top: 1px solid var(--line);
	}
	.tag {
		color: var(--muted);
		padding-top: 4px;
	}
	.body {
		display: grid;
		gap: 32px;
		min-width: 0;
	}
	.two {
		grid-template-columns: minmax(0, 1.3fr) minmax(0, 1fr);
		align-items: start;
	}

	.drawing {
		background: var(--surface);
		border: 1px solid var(--line);
		border-radius: 12px;
		padding: 20px;
		display: grid;
		gap: 12px;
	}
	.drawing svg {
		width: 100%;
		height: auto;
	}
	.gdot {
		fill: var(--faint);
	}
	.trace {
		stroke: var(--text);
		opacity: 0.92;
	}
	.pad {
		fill: var(--text);
	}
	.drill {
		fill: var(--copper);
	}
	.dim {
		fill: none;
		stroke: var(--copper);
		stroke-width: 0.35;
	}
	.arrow {
		fill: var(--copper);
		stroke: none;
	}
	.dimtext,
	.note {
		font-family: var(--mono);
		font-size: 3px;
		fill: var(--copper);
		text-anchor: middle;
	}
	.rules {
		list-style: none;
		padding: 0;
		display: grid;
		gap: 0;
		border-top: 1px solid var(--line-strong);
	}
	.rules li {
		display: grid;
		grid-template-columns: 96px 1fr;
		gap: 12px;
		padding-block: 14px;
		border-bottom: 1px solid var(--line);
		color: var(--body);
		font-size: 15px;
		line-height: 1.5;
	}
	.rules .mono {
		color: var(--text);
		padding-top: 2px;
	}

	.sizes {
		display: flex;
		align-items: flex-end;
		gap: 28px;
		flex-wrap: wrap;
	}
	.size {
		display: grid;
		gap: 10px;
		justify-items: start;
	}
	.lockups {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
		gap: 16px;
	}
	.lockup-box {
		border: 1px solid var(--line);
		border-radius: 12px;
		padding: 36px 28px;
		background: var(--surface);
		display: flex;
		align-items: center;
		min-height: 160px;
	}
	.lockup-box.inverse {
		background: var(--text);
		color: var(--bg);
		border-color: var(--text);
		--muted: var(--faint);
	}

	.swatches {
		list-style: none;
		padding: 0;
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
		gap: 16px;
	}
	.swatches li {
		display: grid;
		gap: 6px;
	}
	.chip {
		height: 96px;
		border-radius: 10px;
		border: 1px solid var(--line);
		margin-bottom: 6px;
	}
	.sw-name {
		font-weight: 600;
	}
	.sw-role {
		color: var(--body);
		font-size: 14px;
		line-height: 1.45;
	}

	.specimen {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
		gap: 24px;
	}
	.big {
		font-size: clamp(48px, 7vw, 96px);
		font-weight: 600;
		letter-spacing: -0.04em;
		line-height: 1.05;
		margin-top: 8px;
	}
	.monoface {
		font-family: var(--mono);
		font-weight: 400;
		letter-spacing: -0.02em;
	}
	.scale {
		list-style: none;
		padding: 0;
		border-top: 1px solid var(--line-strong);
	}
	.scale li {
		display: grid;
		grid-template-columns: 56px 1fr;
		align-items: baseline;
		padding-block: 12px;
		border-bottom: 1px solid var(--line);
		font-weight: 600;
		letter-spacing: -0.02em;
		overflow: hidden;
		white-space: nowrap;
	}

	.voice {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
		gap: 24px 32px;
		margin: 0;
	}
	.voice dt {
		font-weight: 600;
		font-size: 19px;
		letter-spacing: -0.02em;
	}
	.voice dd {
		margin: 6px 0 0;
		color: var(--body);
		line-height: 1.5;
	}

	.uses {
		grid-template-columns: repeat(2, minmax(0, 1fr));
	}
	.uses figure {
		display: grid;
		gap: 10px;
		align-content: start;
		min-width: 0;
	}
	.uses .wide {
		grid-column: 1 / -1;
	}
	.card {
		aspect-ratio: 85 / 55;
		max-width: 100%;
		border-radius: 8px;
		padding: 7%;
		box-shadow: var(--shadow);
		position: relative;
	}
	.card.front {
		background: #161616;
		color: #f3f3f1;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		--copper: #d58c4e;
	}
	.card.front .mono {
		color: #9a9a95;
		align-self: flex-end;
	}
	.card.back {
		background: #fbfbfa;
		color: #161616;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	.c-name {
		font-weight: 600;
		font-size: clamp(18px, 2vw, 24px);
		letter-spacing: -0.03em;
	}
	.c-role {
		color: #75756f;
		margin-top: 2px;
	}
	.c-lines {
		display: grid;
		gap: 4px;
		color: #4a4a47;
	}
	.c-pads {
		position: absolute;
		right: 7%;
		top: 9%;
		display: flex;
		gap: 10px;
	}
	.c-pads i {
		width: 12px;
		height: 12px;
		border-radius: 50%;
		background: #161616;
		box-shadow: inset 0 0 0 3.5px #161616, inset 0 0 0 6px #b0682a;
	}
	.c-pads i:first-child {
		box-shadow: inset 0 0 0 3.5px #161616, inset 0 0 0 6px #d58c4e;
	}

	.invoice {
		background: #fbfbfa;
		color: #161616;
		border-radius: 8px;
		padding: clamp(20px, 4vw, 40px);
		box-shadow: var(--shadow);
		display: grid;
		gap: 28px;
		--muted: #75756f;
		overflow-x: auto;
	}
	.inv-head {
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
		gap: 24px;
		flex-wrap: wrap;
	}
	.inv-meta {
		display: grid;
		grid-template-columns: auto auto;
		gap: 4px 16px;
		color: #75756f;
	}
	.inv-meta b {
		color: #161616;
		font-weight: 500;
		text-align: right;
	}
	.invoice table {
		width: 100%;
		border-collapse: collapse;
		font-variant-numeric: tabular-nums;
		min-width: 460px;
	}
	.invoice th {
		text-align: left;
		font-weight: 400;
		color: #75756f;
		border-bottom: 1px solid #161616;
		padding: 8px 0;
	}
	.invoice td {
		padding: 10px 0;
		border-bottom: 1px solid #e2e2df;
	}
	.invoice th:nth-child(n + 3),
	.invoice td:nth-child(n + 3) {
		text-align: right;
	}
	.invoice td:nth-child(2) {
		font-family: var(--sans);
	}
	.inv-foot {
		font-size: 11px;
	}

	.tabs {
		display: flex;
		gap: 2px;
		background: var(--line);
		padding: 8px 8px 0;
		border-radius: 10px 10px 0 0;
	}
	.tab {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 10px 14px;
		background: var(--surface);
		border-radius: 8px 8px 0 0;
		font-size: 13px;
		color: var(--text);
		min-width: 0;
	}
	.dim-tab {
		background: transparent;
		color: var(--muted);
	}
	.fake {
		width: 16px;
		height: 16px;
		border-radius: 4px;
		background: var(--faint);
	}
	.avatar {
		width: 128px;
		height: 128px;
		border-radius: 50%;
		background: #161616;
		display: grid;
		place-items: center;
		--copper: #d58c4e;
	}

	.foot {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 16px;
		flex-wrap: wrap;
		padding-block: 40px 96px;
		border-top: 1px solid var(--line);
	}

	@media (max-width: 860px) {
		.hero,
		.block,
		.two,
		.uses {
			grid-template-columns: minmax(0, 1fr);
		}
		.hero-mark :global(svg) {
			width: 180px;
			height: auto;
		}
	}
</style>
