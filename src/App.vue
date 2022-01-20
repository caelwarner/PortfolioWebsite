<template>
	<div id="app">
		<header>
			<NavBar></NavBar>
		</header>

		<div id="home">
			<div class="heading">
				<h1>Cael Warner</h1>
				<h3><span>\</span>Developer</h3>
			</div>
			<Planet></Planet>
		</div>

		<div id="projects">
			<div class="project">
				<div class="content">

					<h2 class="name">Infernal Expansion</h2>
					<h6 class="date">Oct 2020 - Present</h6>
					<p>A community lead mod to expand on Minecraft in Java. It's currently amassed over 4 million downloads.</p>
					<div class="buttons">
						<a href="https://www.curseforge.com/minecraft/mc-mods/infernal-expansion" target="_blank">
							<button class="button">View Project</button>
						</a>
						<a href="https://github.com/infernalexp/Infernal-Expansion" target="_blank">
							<button class="button">View Source</button>
						</a>
					</div>
				</div>

				<Laptop number="1" texture="/infernal_expansion.png"></Laptop>
			</div>
			<div class="project">
				<div class="content">
					<h2 class="name">TeleAEye</h2>
					<h6 class="date">Jan 2021</h6>
					<p>A fullstack web app made with Python and VueJS to connect eye doctors and patients for easier diagnoses of eye diseases.</p>
					<div class="buttons">
						<a>
							<button class="button">Unreleased</button>
						</a>
					</div>
				</div>

				<Laptop number="2" texture="/teleaeye.png"></Laptop>
			</div>
			<div class="project">
				<div class="content">
					<h2 class="name">Darkness Activated Tiles</h2>
					<h6 class="date">June 2021</h6>
					<p>A small addon module for FoundryVTT, a virtual table top for games like D&D. Made in Javascript.</p>
					<div class="buttons">
						<a href="https://foundryvtt.com/packages/darkness-activated-tiles" target="_blank">
							<button class="button">View Project</button>
						</a>
						<a href="https://github.com/caelwarner/darkness-activated-tiles" target="_blank">
							<button class="button">View Source</button>
						</a>
					</div>
				</div>

				<Laptop number="3" texture="/darkness_activated_tiles.png"></Laptop>

			</div>
		</div>

		<div id="about">
			<div class="heading">
				<h2>About</h2>
				<h4><span>\</span>Me</h4>
			</div>

			<div class="content">
				<p>I'm a self taught developer with over 5 years of experience. I can program in a wide range of languages like Java, Python and Javascript. <br><br> I've used a large collection of frameworks and libraries like Forge and Fabric in Java for mod development for Minecraft. Flask and Ariadne in Python for creating web app backends. VueJS and ThreeJS for creating websites just like this one. I love to learn new technologies and work with new people. If you'd like to contact me feel free with the details below.</p>
			</div>
		</div>

		<div id="contact">
			<div class="heading">
				<h2>Contact</h2>
				<h4>Me<span>/</span></h4>
			</div>

			<div class="content">
				<ul>
					<li>Email | <span><a href="mailto:caelawarner@gmail.com">caelawarner@gmail.com</a></span></li>
					<li>Phone | <span>778-870-2720</span></li>
					<li>GitHub | <span><a href="https://github.com/caelwarner/" target="_blank">caelwarner</a></span></li>
				</ul>
			</div>
		</div>

		<footer>&copy; 2022 Cael Warner</footer>
	</div>
</template>

<script>
import NavBar from "@/components/NavBar";
import Planet from "@/components/Planet";
import Laptop from "@/components/Laptop";

export default {
	name: 'App',
	components: {Laptop, Planet, NavBar }
}
</script>

<style>
@import url(https://allfont.net/allfont.css?fonts=league-spartan);
@import url('http://fonts.cdnfonts.com/css/gotham');

:root {
	--bg-color: #03020b;
	--heading-color: #dff9fb;
	--sub-heading-color: #66717f;
	--dark-accent-color: #66717f;
}

body {
	background-color: var(--bg-color);
}

#app {
	font-family: "Gotham", Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: var(--heading-color);
}

#home {
	height: 90vh;
}

#home .heading {
	font-family: "League Spartan Bold", Helvetica, Arial, sans-serif;
	position: absolute;
	top: 30%;
	left: 10%;
	text-align: left;
	line-height: 5.5rem;
	z-index: -1;
}

#home .heading h1 {
	font-size: 7rem;
	margin-bottom: 0;
}

#home .heading h3 {
	font-size: 4.5rem;
	margin-top: 0;
	color: var(--sub-heading-color);
}

#home .heading h3 span {
	color: var(--heading-color);
}

#projects {
	display: flex;
	flex-direction: column;
	align-content: center;
}

.project {
	display: flex;
	flex-direction: row;
	align-content: center;
	justify-content: center;
}

.project .content {
	display: flex;
	flex-direction: column;
	justify-content: center;
	margin-right: 4rem;
	max-width: 20rem;
	text-align: left;
}

.project .content h2 {
	font-size: 2rem;
	margin-bottom: 0.4rem;
}

.project .content h4 {
	color: var(--sub-heading-color);
	font-size: 1.5rem;
}

.project .content h6 {
	color: var(--sub-heading-color);
	font-size: 0.7rem;
	margin: 0;
	line-height: 0.1rem;
}

.project .content p {
	color: var(--sub-heading-color);
	margin-top: 1rem;
	line-height: 1rem;
}

.project .buttons {
	display: flex;
	flex-direction: row;
}

.project a {
	margin-top: 0.6rem;
}

.project .button {
	cursor: pointer;
	font-size: 0.8rem;
	font-weight: 500;
	font-family: "Gotham", Helvetica, Arial, sans-serif;
	background-color: transparent;
	border: 0.1rem solid var(--heading-color);
	padding: 0.7em 2em;
	border-radius: 10px;
	color: white;
	transition: border-color 0.25s;
	margin-right: 0.4rem;
}

.project .button:hover {
	border-color: #81dee6;
}

#about {
	display: flex;
	flex-direction: row;
	justify-content: center;
	width: 50rem;
	margin: 5rem auto auto;
}

#about .heading {
	text-align: right;
	margin-right: 3rem;
}

#about .heading h2 {
	font-size: 4rem;
	margin-top: 2rem;
	margin-bottom: 0;
}

#about .heading h4 {
	font-size: 2.5rem;
	margin-top: 0;
	color: var(--sub-heading-color);
}

#about .heading h4 span {
	color: var(--heading-color);
}

#about .content {
	max-width: 30rem;
}

#about .content p {
	color: var(--sub-heading-color);
	line-height: 1rem;
	text-align: left;
}

#contact {
	display: flex;
	flex-direction: row-reverse;
	justify-content: center;
	width: 50rem;
	margin: 10rem auto auto;
}

#contact .heading {
	text-align: left;
	margin-left: 3rem;
}

#contact .heading h2 {
	font-size: 4rem;
	margin-top: 2rem;
	margin-bottom: 0;
}

#contact .heading h4 {
	font-size: 2.5rem;
	margin-top: 0;
	color: var(--sub-heading-color);
}

#contact .heading h4 span {
	color: var(--heading-color);
}

#contact .content {
	max-width: 30rem;
	text-align: left;
}

#contact .content ul {
	list-style: none;
	margin-top: 4rem;
}

#contact .content li {
	margin-top: 0.2rem;
}

#contact .content li span {
	color: var(--sub-heading-color);
}

#contact .content a {
	text-decoration: none;
	color: var(--sub-heading-color);
	transition: color 0.15s;
}

#contact .content a:hover {
	color: var(--heading-color);
}

footer {
	margin-top: 10rem;
	margin-bottom: 2rem;
	color: var(--sub-heading-color);
}

</style>
