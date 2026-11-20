// Placeholder content shared by all design variants. Swap for real values once a direction is picked.

export const person = {
	name: 'Raffael Prem',
	first: 'Raffael',
	city: 'Linz',
	country: 'Austria',
	tz: 'Europe/Vienna',
	email: 'hello@rprem.com',
	linkedin: 'https://www.linkedin.com/in/raffael-prem/',
	github: 'https://github.com/',
	role: 'Software engineer',
	company: 'Company Name',
	companyUrl: '#',
	since: '2025',
	about: [
		'I write software for a living and solder things for fun. Most of my week is TypeScript and Postgres; most of my weekends end with a multimeter on the desk.',
		'I like small tools that do one job well, hardware you can open up, and code that still makes sense a year later.'
	]
};

export type Status = 'active' | 'live' | 'shelved';

export type Project = {
	id: string;
	name: string;
	kind: 'software' | 'hardware';
	year: number;
	status: Status;
	blurb: string;
	parts: string[];
	url: string;
};

export const projects: Project[] = [
	{
		id: 'P-01',
		name: 'Project Alpha',
		kind: 'software',
		year: 2026,
		status: 'active',
		blurb: 'A web app that reads incoming documents and fills in the boring parts.',
		parts: ['SvelteKit', 'Postgres', 'Python'],
		url: '#'
	},
	{
		id: 'P-02',
		name: 'Split keyboard',
		kind: 'hardware',
		year: 2025,
		status: 'live',
		blurb: '36 keys, hand-wired, running custom firmware. Typed this sentence.',
		parts: ['RP2040', 'QMK', 'KiCad'],
		url: '#'
	},
	{
		id: 'P-03',
		name: 'Room sensors',
		kind: 'hardware',
		year: 2025,
		status: 'live',
		blurb: 'Six battery-powered sensors reporting temperature and CO₂ to a box in the hallway.',
		parts: ['ESP32', 'MQTT', 'Home Assistant'],
		url: '#'
	},
	{
		id: 'P-04',
		name: 'Project Delta',
		kind: 'software',
		year: 2024,
		status: 'shelved',
		blurb: 'A CLI that turned out to be a solution looking for a problem.',
		parts: ['Rust', 'SQLite'],
		url: '#'
	}
];

export const interests = {
	software: ['TypeScript', 'Svelte', 'Postgres', 'Rust', 'Local-first apps'],
	hardware: ['Microcontrollers', 'Mechanical keyboards', '3D printing', 'Homelab', 'PCB design']
};

export type Rev = { rev: string; date: string; what: string; note: string; current?: boolean };

export const history: Rev[] = [
	{ rev: 'D', date: '2025', what: 'Software engineer, Company Name', note: 'Product features end to end', current: true },
	{ rev: 'C', date: '2022', what: 'Freelance developer', note: 'Web and mobile apps for clients in Austria' },
	{ rev: 'B', date: '2019', what: 'First paid project', note: 'A booking site that is still online' },
	{ rev: 'A', date: '2014', what: 'First Arduino', note: 'Blinked an LED, never stopped' }
];

export const now = 'Wiring a second batch of sensors and shipping Project Alpha’s first paid plan.';
