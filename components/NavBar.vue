<template>
	<nav>
		<div class="logo">
			<NuxtLink to="/"><h2>CW</h2></NuxtLink>
		</div>
		<ul class="nav-list">
			<li class="nav-item"><NuxtLink to="/#projects">Projects</NuxtLink></li>
			<li class="nav-item"><NuxtLink to="/#about">About</NuxtLink></li>
			<li class="nav-item"><NuxtLink to="/#contact">Contact</NuxtLink></li>
			<li class="nav-item"><NuxtLink to="/blog-posts">Blog</NuxtLink></li>
		</ul>
	</nav>
</template>

<style scoped>
nav {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	font-family: "Inter", Helvetica, Arial, sans-serif;
	font-weight: 600;
	margin-top: 2rem;
	margin-right: 5rem;
	margin-left: 5rem;
	font-size: 1.1rem;
}

.logo {
	display: inline-block;
	align-self: center;
}

.logo a {
	text-decoration: none;
	color: var(--primary-color);
}

.logo h2 {
	font-family: 'Playfair Display', serif;
	font-size: 2rem;
	margin: 0;
}

.nav-list {
	display: flex;
	flex-direction: row;
	margin-top: 0.8rem;
}

.nav-item {
	display: inline-block;
	padding-right: 3rem;
}

.nav-item a {
	text-decoration: none;
	color: var(--secondary-color);
	transition: color 0.15s;
}

.nav-item a:hover {
	color: var(--primary-color)
}

@media screen and (max-width: 992px) {
	nav {
		font-size: 1.4rem;
		margin-left: 3rem;
		margin-right: 3rem;
	}

	.nav-item {
		padding-right: 0;
		padding-left: 1rem;
	}

	.logo h2 {
		font-size: 3rem;
	}
}

@media screen and (max-width: 400px) {
	.nav-list {
		flex-direction: column;
	}

	.nav-item {
		padding-left: 0;
		padding-top: 0.3rem;
	}
}
</style>
