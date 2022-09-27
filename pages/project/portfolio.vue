<template>
	<Project title="Portfolio" subtitle="Generic Subtitle" imgSrc="/index/portfolio-front-page.png" :buttons="[
		{ label: 'View Source', link: 'https://caelwarner.com/gh/PortfolioWebsite' }
	]" :blogPosts="[
		{ title: 'Developing my Portfolio', link: '/developing-my-portfolio', date: '2022/09/19' },
		{ title: 'Choosing a Sphere', link: '/choosing-a-sphere', date: '2022/09/21' },
		{ title: 'Improving Planet Performance', link: '/improving-planet-performance', date: '2022/09/21' }
	]">
		<p>
			This site is built using Nuxt.js and Typescript. The 3D elements are made using three.js.
		</p>
	</Project>
</template>
