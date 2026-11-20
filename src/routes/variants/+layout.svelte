<script lang="ts">
	import { page } from '$app/state';
	let { children } = $props();
	const variants = [
		{ href: '/variants/a', label: 'A · Index' },
		{ href: '/variants/b', label: 'B · Desk' },
		{ href: '/variants/c', label: 'C · Signal' }
	];
</script>

{@render children()}

<nav class="switcher" aria-label="Design variants">
	{#each variants as v}
		<a href={v.href} class:active={page.url.pathname === v.href}>{v.label}</a>
	{/each}
</nav>

<style>
	.switcher {
		position: fixed;
		bottom: 16px;
		left: 50%;
		translate: -50% 0;
		z-index: 100;
		display: flex;
		gap: 4px;
		padding: 4px;
		border-radius: 99px;
		background: #111c;
		backdrop-filter: blur(8px);
		font: 500 13px/1 system-ui, sans-serif;
	}
	a {
		color: #fff;
		text-decoration: none;
		padding: 8px 12px;
		border-radius: 99px;
		white-space: nowrap;
	}
	a.active {
		background: #fff;
		color: #111;
	}
</style>
