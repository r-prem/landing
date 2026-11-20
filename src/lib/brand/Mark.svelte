<script lang="ts">
	// The RP mark: R and P routed as traces (45° bends only) ending on three
	// through-hole pads at an equal pitch, like a three-pin part.
	let {
		size = 48,
		ink = 'currentColor',
		hole = 'var(--copper, #b87333)',
		holes = true,
		title = 'Raffael Prem'
	}: { size?: number; ink?: string; hole?: string; holes?: boolean; title?: string } = $props();
	// Below 24px the traces get thicker and the drill holes go.
	const small = $derived(size < 24);
	const w = $derived(small ? 6.5 : 5);
	const r = $derived(small ? 6 : 5);
</script>

<svg width={size} height={size * (52 / 70)} viewBox="-2 -2 70 52" role="img" aria-label={title}>
	<g fill="none" stroke={ink} stroke-width={w} stroke-linejoin="miter">
		<path d="M6 41 V6 H19 L25 12 V16 L19 22 H6 M12 22 L24 34 V41" />
		<path d="M42 41 V6 H55 L61 12 V16 L55 22 H42" />
	</g>
	<g fill={ink}>
		<circle cx="6" cy="42" {r} />
		<circle cx="24" cy="42" {r} />
		<circle cx="42" cy="42" {r} />
	</g>
	{#if holes && !small}
		<g fill={hole}>
			<circle cx="6" cy="42" r="2" />
			<circle cx="24" cy="42" r="2" />
			<circle cx="42" cy="42" r="2" />
		</g>
	{/if}
</svg>
