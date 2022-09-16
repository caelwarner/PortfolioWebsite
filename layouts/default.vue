<template>
	<div id="app">
		<header>
			<NavBar />
		</header>

		<Nuxt />

		<footer>&copy; 2022 Cael Warner</footer>
	</div>
</template>

<style>
:root {
	--bg-color: #03020b;
	--bg-light-color: #090811;
	--primary-color: #dff9fb;
	--secondary-color: #66717f;
	--secondary-light-color: #919ba7;
}

html {
	position: absolute;
	width: 100%;
}

body {
	background-color: var(--bg-color);
}

.mobile {
	display: none;
}

.desktop {
	display: initial;
}

#app {
	font-family: "Gotham", Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: var(--primary-color);
}

footer {
	margin-top: 10rem;
	margin-bottom: 2rem;
	color: var(--secondary-color);
}

@media screen and (max-width: 480px) {
	:root {
		font-size: 12px;
	}

	.mobile {
		display: initial;
	}

	.desktop {
		display: none;
	}
}
</style>
