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

button {
	cursor: pointer;
	font-size: 0.8rem;
	font-weight: 500;
	font-family: "Gotham", Helvetica, Arial, sans-serif;
	background-color: transparent;
	border: 0.1rem solid var(--primary-color);
	padding: 0.7em 2em;
	border-radius: 10px;
	color: white;
	transition: border-color 0.25s;
	margin-right: 0.4rem;
}

button:hover {
	border-color: #81dee6;
}

footer {
	margin-top: 10rem;
	margin-bottom: 2rem;
	color: var(--secondary-color);
}

@media screen and (max-width: 768px) {
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

@media screen and (min-width: 768px) and (max-width: 1200px) {
	:root {
		font-size: 14px;
	}
}
</style>
