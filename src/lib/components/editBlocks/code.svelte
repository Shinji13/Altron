<script lang="ts">
	import { SvelteComponent, getContext, type ComponentType } from 'svelte';
	import Select from '../extra/select.svelte';
	import type { updateDataType } from '../../utils/consts';
	import Textarea from '../extra/textarea.svelte';
	export let content: { text: string; lang: string };
	export let id: string;
	export let active = false;
	const languages = getContext('languages') as string[];
	const view: ComponentType<SvelteComponent<{ text: string; lang: string }>> = getContext('Code');
	const updateData: updateDataType = getContext('updateData');
</script>

{#if active}
	<div class="codeEdit">
		<Select
			label="Code language"
			preSelected={{ label: content.lang, value: content.lang }}
			elements={languages.map((el) => ({ value: el, label: el }))}
			changeHandler={(detail) => {
				updateData(id, (el) => {
					if (el.name == 'code') el.data.lang = detail.value;
				});
			}}
		/>
		<div>
			<span>The code</span>
			<Textarea
				textLevel={0}
				textContent={content.text}
				changeHandler={(text) => {
					updateData(id, (el) => {
						if (el.name == 'code') el.data.text = text;
					});
				}}
			/>
		</div>
	</div>
{:else}
	<svelte:component this={view} {...content} />
{/if}

<style>
	.codeEdit {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 15px;
	}
	.codeEdit :global(::-webkit-scrollbar) {
		width: 0.5rem;
	}
	.codeEdit :global(::-webkit-scrollbar-track) {
		background: color-mix(in srgb, var(--secondaryColor) 40%, white 40%);
	}
	.codeEdit :global(::-webkit-scrollbar-thumb) {
		background: var(--secondaryColor);
	}
	.codeEdit div {
		display: flex;
		flex-direction: column;
		gap: 5px;
	}
	.codeEdit div span {
		margin-left: 10px;
		font-weight: bold;
		color: var(--textColor);
		font-size: var(--small);
	}
</style>
