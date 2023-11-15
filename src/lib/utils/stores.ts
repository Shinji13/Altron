import { writable } from 'svelte/store';
import type { dataBlock, updateDataType } from './consts.js';
import { setContext } from 'svelte';

export function createDataStore() {
	const data = writable<dataBlock[]>([]);
	const updateData: updateDataType = (id: string, cb: (el: dataBlock) => void) => {
		data.update((prev) => {
			prev.forEach((el) => {
				if (el.id == id) {
					cb(el);
				}
			});
			return prev;
		});
	};
	setContext('data', data);
	setContext('updateData', updateData);
	return data;
}

export function createWorkingBlockStore() {
	const workingBlock = writable<{ state: 'focused' | 'editing'; id: string }>(null);
	setContext('workingBlock', workingBlock);
	return workingBlock;
}
