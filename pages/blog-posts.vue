<template>
	<div id="page">
		<div class="heading">
			<h1>Blog</h1>
		</div>
		<div class="content">
			<NuxtLink class="blog-post" to="/blog/developing-my-portfolio">
				<div class="text">
					<p class="project-name">Portfolio</p>
					<p class="title">Developing My Portfolio</p>
					<p class="date">2022/09/19</p>
				</div>
				<div class="image">
					<img src="/blog/developing-my-portfolio/portfolio-front-page.png" alt="">
				</div>
			</NuxtLink>

			<NuxtLink class="blog-post" to="/blog/choosing-a-sphere">
				<div class="text">
					<p class="project-name">Portfolio</p>
					<p class="title">Choosing A Sphere</p>
					<p class="date">2022/09/21</p>
				</div>
				<div class="image">
					<img src="/blog/choosing-a-sphere/spheres-comparison.png" alt="">
				</div>
			</NuxtLink>

			<NuxtLink class="blog-post" to="/blog/improving-planet-performance">
				<div class="text">
					<p class="project-name">Portfolio</p>
					<p class="title">Improving Planet Performance</p>
					<p class="date">2022/09/21</p>
				</div>
				<div class="image">
					<img src="/blog/improving-planet-performance/firefox-profiler.png" alt="">
				</div>
			</NuxtLink>
		</div>
	</div>
</template>

<script>
export default {
	layout: "default",
	mounted() {
		document.body.style.backgroundColor = "#090811";
	}
}
</script>

<style scoped>
#page {
	max-width: 50rem;
	margin: auto;
}

.heading {
	margin-bottom: 4rem;
}

.content {
	display: flex;
	flex-direction: column;
}

.blog-post {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	height: 10rem;
	cursor: pointer;
	border: 0.1rem solid var(--primary-color);
	transition: border-color 0.25s;
	border-radius: 10px;
	margin-bottom: 2rem;
	text-decoration: none;
}

.blog-post:hover {
	border-color: #81dee6;
}

.blog-post .text {
	margin-left: 1rem;
}

.blog-post .text > * {
	margin-top: 0;
	margin-bottom: 0;
}

.blog-post .project-name {
	color: var(--primary-color);
	font-weight: bold;
	margin-bottom: 0.1rem;
}

.blog-post .title {
	color: var(--primary-color);
	font-weight: 400;
	font-size: 1.5rem;
	margin-bottom: 2.5rem;
}

.blog-post .date {
	font-size: 0.8rem;
}

.image {
	margin-right: 1rem;
}

.image img {
	max-height: 8rem;
	width: 15rem;
	margin-top: 0;
	border-radius: 10px;
}

@media screen and (max-width: 400px) {
	.blog-post {
		flex-direction: column;
		height: 100%;
	}

	.blog-post .text {
		align-self: flex-start;
		margin-top: 1rem;
		margin-bottom: 2rem;
	}

	.blog-post .title {
		margin-bottom: 1rem;
	}

	.image {
		margin-right: 0;
		margin-bottom: 1rem;
		width: 90%;
	}

	.image img {
		width: 100%;
		max-height: 12rem;
	}
}

@media screen and (max-width: 768px) {
	#page {
		max-width: 85vw;
	}

	.heading {
		margin-top: 2.5rem;
	}
}
</style>
