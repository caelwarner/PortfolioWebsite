<template>
	<Project title="Infernal Expansion" subtitle="Minecraft Mod" imgSrc="/index/infernal-expansion.png" :buttons="[
		{ label: 'Project Page', link: 'https://curseforge.com/minecraft/mc-mods/infernal-expansion' },
		{ label: 'Source Code', link: 'https://github.com/infernalstudios/Infernal-Expansion' },
		{ label: 'Contribution Stats', link: 'https://github.com/infernalstudios/Infernal-Expansion/graphs/contributors' }
	]" :blogPosts="[
		{ title: 'My Involvement', link: '/my-involvement', date: '2022/09/26' }
	]">
		<p>
			Infernal Expansion is a modification, or mod, for Minecraft written in Java that expands on the base game.
			It's currently at over 6.5 million downloads This mod is developed by a small team of around five people but
			supported by a much larger community. We get ideas, game design feedback and even art assets from our
			community. We use Git as our VCS and then host the repo on GitHub. Our git repo has over 1100 commits made
			and almost 200 pull requests.
		</p>
		<p>
			Since our team is so small each of us is an integral part of the whole equation, we all have to pull our
			weight. Personally, I have over 200 commits made. I've worked a lot on procedural world generation and
			porting between versions of Minecraft. I've also done a lot of miscellaneous work adding new entities,
			blocks and items, cleaning up old code, and fixing bugs.
		</p>
	</Project>
</template>
