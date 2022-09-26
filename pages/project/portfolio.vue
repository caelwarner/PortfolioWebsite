<template>
	<Project title="Portfolio" subtitle="Generic Subtitle" imgSrc="/index/portfolio-front-page.png" :buttons="[
		{ label: 'View Source', link: 'https://caelwarner.com/gh/PortfolioWebsite' }
	]" :blogPosts="[
		{ title: 'Developing my Portfolio', link: '/developing-my-portfolio', date: '2022/09/19' },
		{ title: 'Choosing a Sphere', link: '/choosing-a-sphere', date: '2022/09/21' },
		{ title: 'Improving Planet Performance', link: '/improving-planet-performance', date: '2022/09/21' }
	]">
		<p>
			Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel sem efficitur, tempus eros eu, dictum sem.
			Suspendisse malesuada lobortis orci, vitae sodales nunc volutpat a. Sed porta ornare ante, a accumsan tellus
			aliquam a. Praesent ac odio arcu. Duis nulla odio, efficitur sed lobortis id, eleifend id massa. Duis accumsan
			nibh nec sollicitudin viverra. Vestibulum sagittis justo in pellentesque faucibus. Nullam blandit eu elit nec
			molestie. Pellentesque quis malesuada orci. Sed auctor efficitur commodo. Mauris nec lobortis nulla. Nam
			malesuada orci pretium erat tristique, quis accumsan tortor volutpat.
		</p>
		<p>
			Vivamus posuere erat quam, non consectetur erat vehicula sed. Aliquam molestie sapien at eros ornare, ut
			ultrices urna hendrerit. Nulla vitae sem vestibulum lectus vestibulum pellentesque. Integer vestibulum volutpat
			nulla. Etiam suscipit velit est, non varius dolor interdum viverra. Donec rhoncus justo ac venenatis suscipit.
			Morbi feugiat lectus felis.
		</p>
	</Project>
</template>
