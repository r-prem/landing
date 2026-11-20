<script lang="ts">
	import { page } from '$app/state';
	import './theme.css';
	let { children } = $props();
	const variants = [
		{ href: '/variants/marks', label: 'Marks' },
		{ href: '/variants/brand', label: 'Brand' },
		{ href: '/variants/a', label: 'A · Datasheet' },
		{ href: '/variants/b', label: 'B · History' },
		{ href: '/variants/c', label: 'C · Bench' }
	];
</script>

<svelte:head>
	<link
		href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&family=Geist+Mono:wght@400;500&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<div class="rp">
	{@render children()}
</div>

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
		gap: 2px;
		padding: 3px;
		border-radius: 10px;
		background: #161616;
		font: 500 12px/1 'Geist Mono', ui-monospace, monospace;
		box-shadow: 0 8px 24px -8px #0008;
	}
	a {
		color: #bdbdb8;
		text-decoration: none;
		padding: 8px 10px;
		border-radius: 7px;
		white-space: nowrap;
	}
	a.active {
		background: #fff;
		color: #161616;
	}
</style>
