<script lang="ts">
	// Wireframe solid drawn like a technical drawing: visible edges solid, hidden edges dashed,
	// one face tinted cobalt, one vertex marked amber. Turns slowly on hover.
	import { onMount } from 'svelte';

	type V = [number, number, number];
	let {
		shape = 'tetra',
		size = 160,
		yaw = 32,
		pitch = -22,
		stroke = 1.6,
		spin = true,
		accentFace = true,
		node = true
	}: {
		shape?: 'tetra' | 'octa' | 'icosa';
		size?: number;
		yaw?: number;
		pitch?: number;
		stroke?: number;
		spin?: boolean;
		accentFace?: boolean;
		node?: boolean;
	} = $props();

	const PHI = (1 + Math.sqrt(5)) / 2;
	const SOLIDS: Record<string, V[]> = {
		tetra: [
			[1, 1, 1],
			[1, -1, -1],
			[-1, 1, -1],
			[-1, -1, 1]
		],
		octa: [
			[1, 0, 0],
			[-1, 0, 0],
			[0, 1, 0],
			[0, -1, 0],
			[0, 0, 1],
			[0, 0, -1]
		],
		icosa: [
			[-1, PHI, 0], [1, PHI, 0], [-1, -PHI, 0], [1, -PHI, 0],
			[0, -1, PHI], [0, 1, PHI], [0, -1, -PHI], [0, 1, -PHI],
			[PHI, 0, -1], [PHI, 0, 1], [-PHI, 0, -1], [-PHI, 0, 1]
		]
	};

	const sub = (a: V, b: V): V => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
	const dist = (a: V, b: V) => Math.hypot(...sub(a, b));
	const cross = (a: V, b: V): V => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];

	// Faces: every triple of vertices that are pairwise one edge apart.
	const verts = $derived(SOLIDS[shape]);
	const faces = $derived.by(() => {
		const v = verts;
		let edge = Infinity;
		for (let i = 0; i < v.length; i++) for (let j = i + 1; j < v.length; j++) edge = Math.min(edge, dist(v[i], v[j]));
		const near = (i: number, j: number) => Math.abs(dist(v[i], v[j]) - edge) < 1e-6;
		const out: number[][] = [];
		for (let i = 0; i < v.length; i++)
			for (let j = i + 1; j < v.length; j++)
				for (let k = j + 1; k < v.length; k++) if (near(i, j) && near(j, k) && near(i, k)) out.push([i, j, k]);
		return out;
	});
	const edges = $derived.by(() => {
		const m = new Map<string, number[]>();
		faces.forEach((f, fi) =>
			[[f[0], f[1]], [f[1], f[2]], [f[0], f[2]]].forEach(([a, b]) => {
				const key = a < b ? `${a}-${b}` : `${b}-${a}`;
				m.set(key, [...(m.get(key) ?? []), fi]);
			})
		);
		return [...m.entries()].map(([k, fs]) => ({ a: +k.split('-')[0], b: +k.split('-')[1], fs }));
	});

	let t = $state(0);
	let hovering = false;
	let el: SVGSVGElement;

	function rot(p: V): V {
		const y = ((yaw + t) * Math.PI) / 180;
		const x = (pitch * Math.PI) / 180;
		const [px, py, pz] = p;
		const x1 = px * Math.cos(y) + pz * Math.sin(y);
		const z1 = -px * Math.sin(y) + pz * Math.cos(y);
		const y2 = py * Math.cos(x) - z1 * Math.sin(x);
		const z2 = py * Math.sin(x) + z1 * Math.cos(x);
		return [x1, y2, z2];
	}

	const R = $derived(Math.max(...verts.map((v) => Math.hypot(...v))));
	const P = $derived(verts.map(rot));
	const front = $derived(
		faces.map((f) => {
			const [a, b, c] = f.map((i) => P[i]);
			let n = cross(sub(b, a), sub(c, a));
			const cen: V = [(a[0] + b[0] + c[0]) / 3, (a[1] + b[1] + c[1]) / 3, (a[2] + b[2] + c[2]) / 3];
			if (n[0] * cen[0] + n[1] * cen[1] + n[2] * cen[2] < 0) n = [-n[0], -n[1], -n[2]];
			return n[2] > 0;
		})
	);
	// The tinted face and the marked vertex are fixed at rest so they travel with the solid.
	const pick = $derived.by(() => {
		const rest = verts.map((v) => {
			const y = (yaw * Math.PI) / 180, x = (pitch * Math.PI) / 180;
			const x1 = v[0] * Math.cos(y) + v[2] * Math.sin(y);
			const z1 = -v[0] * Math.sin(y) + v[2] * Math.cos(y);
			return [x1, v[1] * Math.cos(x) - z1 * Math.sin(x), v[1] * Math.sin(x) + z1 * Math.cos(x)];
		});
		let face = 0, best = -Infinity;
		faces.forEach((f, i) => {
			const z = f.reduce((s, k) => s + rest[k][2], 0) + f.reduce((s, k) => s + rest[k][1], 0) * 0.3;
			if (z > best) { best = z; face = i; }
		});
		let top = 0;
		rest.forEach((p, i) => { if (p[1] > rest[top][1]) top = i; });
		return { face, top };
	});

	const pad = 0.14;
	const sx = (p: V) => 50 + (p[0] / R) * 50 * (1 - pad);
	const sy = (p: V) => 50 - (p[1] / R) * 50 * (1 - pad);

	onMount(() => {
		if (!spin || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
		let raf = 0, last = performance.now(), speed = 0;
		const loop = (now: number) => {
			const dt = Math.min(50, now - last);
			last = now;
			speed += ((hovering ? 40 : 0) - speed) * Math.min(1, dt / 300);
			t += (speed * dt) / 1000;
			raf = requestAnimationFrame(loop);
		};
		raf = requestAnimationFrame(loop);
		const on = () => (hovering = true), off = () => (hovering = false);
		const host = el.closest('[data-spin]') ?? el;
		host.addEventListener('pointerenter', on);
		host.addEventListener('pointerleave', off);
		return () => {
			cancelAnimationFrame(raf);
			host.removeEventListener('pointerenter', on);
			host.removeEventListener('pointerleave', off);
		};
	});
</script>

<svg bind:this={el} width={size} height={size} viewBox="0 0 100 100" class="wire" aria-hidden="true">
	{#if accentFace}
		{@const f = faces[pick.face]}
		<path
			class="face"
			class:back={!front[pick.face]}
			d="M{sx(P[f[0]])} {sy(P[f[0]])} L{sx(P[f[1]])} {sy(P[f[1]])} L{sx(P[f[2]])} {sy(P[f[2]])}Z"
		/>
	{/if}
	{#each edges as e}
		{@const vis = e.fs.some((i) => front[i])}
		<line
			x1={sx(P[e.a])} y1={sy(P[e.a])} x2={sx(P[e.b])} y2={sy(P[e.b])}
			class:back-edge={!vis}
			class:hot={accentFace && e.fs.includes(pick.face) && vis}
			stroke-width={stroke}
			vector-effect="non-scaling-stroke"
		/>
	{/each}
	{#if node}
		<circle cx={sx(P[pick.top])} cy={sy(P[pick.top])} r={Math.max(2.2, 260 / size / 2.2)} class="node" />
	{/if}
</svg>

<style>
	.wire {
		overflow: visible;
		max-width: 100%;
	}
	line {
		stroke: var(--ink, currentColor);
		stroke-linecap: round;
	}
	line.back-edge {
		stroke: var(--hidden, #9a9aa2);
		stroke-dasharray: 3 3;
		opacity: 0.75;
	}
	line.hot {
		stroke: var(--cobalt, #2e5bff);
	}
	.face {
		fill: var(--cobalt, #2e5bff);
		opacity: 0.16;
	}
	.face.back {
		opacity: 0.06;
	}
	.node {
		fill: var(--amber, #ffb020);
		stroke: var(--paper, #fff);
		stroke-width: 1.2;
		vector-effect: non-scaling-stroke;
	}
</style>
