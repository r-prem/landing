<script lang="ts">
	import Mark from './Mark.svelte';
	let { size = 32, stacked = false }: { size?: number; stacked?: boolean } = $props();
</script>

<span class="lockup" class:stacked style="--s:{size}px">
	<Mark {size} />
	<span class="name">Raffael Prem<span class="form">e.U.</span></span>
</span>

<style>
	.lockup {
		display: inline-flex;
		align-items: flex-end;
		gap: calc(var(--s) * 0.32);
		line-height: 1;
	}
	.lockup.stacked {
		flex-direction: column;
		align-items: flex-start;
		gap: calc(var(--s) * 0.4);
	}
	.name {
		font-family: var(--sans, system-ui);
		font-weight: 600;
		font-size: calc(var(--s) * 0.56);
		letter-spacing: -0.03em;
		/* sits on the pad line */
		padding-bottom: calc(var(--s) * 0.04);
		white-space: nowrap;
	}
	.form {
		font-family: var(--mono, monospace);
		font-weight: 400;
		font-size: 0.62em;
		letter-spacing: 0;
		margin-left: 0.45em;
		color: var(--muted, #75756f);
	}
</style>
