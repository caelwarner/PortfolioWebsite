<template>
	<div class="project">
		<div class="heading mobile">
			<h1>{{ this.title }}</h1>
			<h3><span>\</span>{{ this.subtitle }}</h3>
		</div>
		<div class="content">
			<div class="heading desktop">
				<h1>{{ this.title }}</h1>
				<h3><span>\</span>{{ this.subtitle }}</h3>
			</div>
			<div class="buttons">
				<a :href="button.link" target="_blank" v-for="button in this.buttons">
					<button>{{ button.label }}</button>
				</a>
			</div>
			<slot></slot>
			<h4 v-if="this.blogPosts">Posts</h4>
			<div class="blog-posts">
				<NuxtLink class="blog-post" :to="'/blog' + blogPost.link" v-for="blogPost in this.blogPosts">
					<p class="title">{{ blogPost.title }}</p>
					<p class="date">{{ blogPost.date }}</p>
				</NuxtLink>
			</div>
		</div>
		<div class="image">
			<img :src="'../' + this.imgSrc" alt="">
		</div>
	</div>
</template>

<script>
export default {
	props: [
		"title",
		"subtitle",
		"imgSrc",
		"buttons",
		"blogPosts"
	],
	mounted() {
		document.body.style.backgroundColor = "#090811";
	}
}
</script>

<style scoped>
.project {
	display: flex;
	flex-direction: row;
	justify-content: center;
	margin-left: auto;
	margin-right: auto;
	margin-top: 3rem;
	min-height: 60vh;
}

.content {
	max-width: 30rem;
	margin-right: 3rem;
}

.heading h1 {
	text-align: left;
	font-size: 3.5rem;
	margin-bottom: 0;
}

.heading h3 {
	text-align: left;
	font-size: 2.2rem;
	margin-top: 0;
	color: var(--secondary-color);
}

.heading h3 span {
	color: var(--primary-color);
}

.content h4 {
	text-align: left;
	font-size: 1.5rem;
	margin-top: 3rem;
	margin-bottom: -0.5rem;
}

.content .buttons {
	display: flex;
	flex-direction: row;
}

.blog-posts {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
}

.blog-post {
	cursor: pointer;
	border: 0.1rem solid var(--primary-color);
	transition: border-color 0.25s;
	border-radius: 10px;
	margin-top: 1.5rem;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	text-decoration: none;
}

.blog-post:hover {
	border-color: #81dee6;
}

.blog-post .title {
	color: var(--primary-color);
	font-weight: 400;
	margin-left: 1rem;
}

.blog-post .date {
	font-size: 0.8rem;
	margin-right: 1rem;
}

@media screen and (max-width: 1100px) {
	.mobile {
		display: initial;
	}

	.desktop {
		display: none;
	}

	.project {
		flex-direction: column;
		max-width: 90vw;
	}

	.heading {
		order: 0;
	}

	.image {
		order: 1;
		margin-top: -1rem;
		margin-bottom: 2rem;
	}

	.image img {
		max-width: 100%;
	}

	.content {
		order: 2;
		align-self: center;
		margin-right: 0;
	}
}

@media screen and (min-width: 1100px) and (max-width: 1600px) {
	.image img {
		max-width: 38rem;
	}
}

</style>
