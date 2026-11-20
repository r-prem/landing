// Placeholder content shared by all design variants.
// Swap these values for real ones once a direction is picked.

export const person = {
	name: 'Raffael Prem',
	first: 'Raffael',
	city: 'Linz, Austria',
	tz: 'Europe/Vienna',
	email: 'hello@rprem.com',
	linkedin: 'https://www.linkedin.com/in/raffael-prem/',
	github: 'https://github.com/',
	role: 'Software Engineer',
	company: 'Company Name',
	companyUrl: '#',
	since: '2025',
	jobBlurb:
		'Building product features end to end: from the database schema to the last pixel of the UI.',
	available: true
};

export type Project = {
	name: string;
	kind: string;
	year: string;
	status: 'live' | 'building' | 'paused';
	blurb: string;
	stack: string[];
	url: string;
	hue: number; // used for generated visuals
};

export const projects: Project[] = [
	{
		name: 'Project Alpha',
		kind: 'SaaS',
		year: '2026',
		status: 'building',
		blurb: 'A short, specific sentence about what this does and who it is for.',
		stack: ['SvelteKit', 'Postgres', 'Python'],
		url: '#',
		hue: 18
	},
	{
		name: 'Project Beta',
		kind: 'Mobile app',
		year: '2025',
		status: 'live',
		blurb: 'One line on the problem, one on how it solves it. No buzzwords.',
		stack: ['React Native', 'TypeScript'],
		url: '#',
		hue: 205
	},
	{
		name: 'Project Gamma',
		kind: 'Open source',
		year: '2025',
		status: 'live',
		blurb: 'A small tool that scratched an itch and somehow got users.',
		stack: ['Node.js', 'CLI'],
		url: '#',
		hue: 150
	},
	{
		name: 'Project Delta',
		kind: 'Experiment',
		year: '2024',
		status: 'paused',
		blurb: 'Weekend experiment. Shelved, but taught me a lot.',
		stack: ['Svelte', 'WebGL'],
		url: '#',
		hue: 280
	}
];

export const stack = [
	'TypeScript',
	'Svelte',
	'React',
	'Node.js',
	'Python',
	'Postgres',
	'React Native',
	'Docker',
	'Figma'
];

export const now = [
	'Shipping Project Alpha’s first paid plan',
	'Learning Rust, slowly',
	'Running along the Danube before work'
];
