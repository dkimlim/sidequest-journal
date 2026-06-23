// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig, fontProviders } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: 'https://dkimlim.github.io',
	base: '/sidequest-journal',
	integrations: [mdx(), sitemap()],
	fonts: [
		{
		name: "Bitcount Prop Single",
		cssVariable: "--bitcount",
		provider: fontProviders.google()
		},
		{
		name: "Outfit",
		cssVariable: "--outfit",
		provider: fontProviders.google()
		}
	]
});
