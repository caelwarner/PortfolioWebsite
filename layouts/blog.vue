<template>
	<default-layout>
		<Nuxt />
	</default-layout>
</template>

<script>
import DefaultLayout from "~/layouts/default.vue";

export default {
	components: {
		DefaultLayout
	}
};
</script>

<style>
.page {
	max-width: 50rem;
	margin: auto;
}

.heading {
	font-family: "League Spartan Bold", Helvetica, Arial, sans-serif;
	text-align: left;
}

.heading h1 {
	font-size: 2.5rem;
	/*line-height: 4rem;*/
	margin-bottom: 0;
}

.heading h3 {
	font-size: 1.5rem;
	/*line-height: 2.5rem;*/
	margin-top: 0;
	color: var(--secondary-color);
}

.heading h3 span {
	color: var(--primary-color);
}


h2 {
	text-align: left;
	margin-top: 5rem;
	/*text-decoration: underline;*/
	font-size: 1.4rem;
	font-weight: 400;
}

img {
	max-width: 50rem;
	margin-top: 1rem;
	text-align: center;
	border-radius: 1rem;
}

p {
	color: var(--secondary-light-color);
	text-align: left;
}

a {
	color: var(--primary-color);
}

.margin-top {
	margin-top: 3rem;
}

.margin-top-half {
	margin-top: 1.5rem;
}

.img-group {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	gap: 1.5rem;
}

.img-wrapper {
	display: flex;
	flex-direction: column;
	align-items: center;
	flex-basis: 100%;
}

.img-wrapper p {
	margin-top: 1rem;
	font-size: 0.9rem;
	color: var(--secondary-color);
}

.img-group .expandable-image {
	margin-bottom: 0;
	max-width: 100%;
	min-height: 75%;
}

.img-group img {
	height: 100%;
	object-fit: cover;
}

.expandable-image.expanded {
	margin-top: 0;
}

.expandable-image {
	margin-top: 1rem;
}

.expandable-image img {
	max-width: 85vw !important;
	margin-top: 0;
}
</style>
