import { writable } from 'svelte/store';
import type { dataBlock } from './consts.js';
import shortUUID from 'short-uuid';

export const data = writable<dataBlock[]>([
	{
		name: 'header',
		id: shortUUID('123456').generate(),
		data: {
			text: 'hello friend',
			level: 1
		}
	}
]);

export const workingBlock = writable<{ state: 'focused' | 'editing'; id: string }>(null);