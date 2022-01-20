<template>
	<nav>
		<div class="logo">
			<h2>CW</h2>
		</div>
		<ul class="nav-list">
			<li class="nav-item"><a href="#projects">Projects</a></li>
			<li class="nav-item"><a href="#about">About</a></li>
			<li class="nav-item"><a href="#contact">Contact</a></li>
		</ul>
	</nav>
</template>

<script>
export default {
	name: "NavBar"
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@1,900&display=swap');

nav {
	font-family: "Gotham", Helvetica, Arial, sans-serif;
	font-weight: 500;
	margin-top: 2rem;
	margin-right: 5rem;
	margin-left: 5rem;
	font-size: 1.1rem;
	text-align: right;
}

.logo {
	display: inline-block;
	float: left;
}

.logo h2 {
	font-family: 'Playfair Display', serif;
	margin: 0;
}

.nav-list {
	display: inline-block;
	margin-top: 0.8rem;
}

.nav-item {
	display: inline-block;
	padding-right: 3rem;

}

.nav-item a {
	text-decoration: none;
	color: var(--sub-heading-color);
	transition: color 0.15s;
}

.nav-item a:hover {
	color: var(--heading-color)
}
</style>