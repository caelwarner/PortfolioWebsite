<template>
	<div id="page">
		<section id="home">
			<div class="heading">
				<h1>Cael Warner</h1>
				<h3><span>\</span>Developer</h3>
			</div>
			<div class="planet">
				<client-only>
					<Planet />

					<template slot="placeholder">
						<h2 class="planet-loading">Loading...</h2>
					</template>
				</client-only>
			</div>
		</section>

		<section id="projects">
			<div class="project">
				<div class="content">

					<h2 class="name">Infernal Expansion</h2>
					<h6 class="date">Oct 2020 - Present</h6>
					<p>A community lead mod to expand on Minecraft in Java. It's currently amassed over 4 million
						downloads.</p>
					<div class="buttons">
						<a href="https://www.curseforge.com/minecraft/mc-mods/infernal-expansion" target="_blank">
							<button class="button">View Project</button>
						</a>
						<a href="https://github.com/infernalexp/Infernal-Expansion" target="_blank">
							<button class="button">View Source</button>
						</a>
					</div>
				</div>

				<div class="laptop">
					<client-only>
						<Laptop texture="index/infernal-expansion.png" />

						<template slot="placeholder">
							<h3 class="laptop-loading">Loading...</h3>
						</template>
					</client-only>
				</div>
			</div>
			<div class="project">
				<div class="content">
					<h2 class="name">TeleAEye</h2>
					<h6 class="date">Jan 2021</h6>
					<p>A fullstack web app made with Python and VueJS to connect eye doctors and patients for easier
						diagnoses of eye diseases.</p>
					<div class="buttons">
						<a>
							<button class="button">Unreleased</button>
						</a>
					</div>
				</div>

				<div class="laptop">
					<client-only>
						<Laptop texture="index/teleaeye.png" />

						<template slot="placeholder">
							<h3 class="laptop-loading">Loading...</h3>
						</template>
					</client-only>
				</div>
			</div>
			<div class="project">
				<div class="content">
					<h2 class="name">Darkness Activated Tiles</h2>
					<h6 class="date">June 2021</h6>
					<p>A small addon module for FoundryVTT, a virtual table top for games like D&D. Made in
						Javascript.</p>
					<div class="buttons">
						<a href="https://foundryvtt.com/packages/darkness-activated-tiles" target="_blank">
							<button class="button">View Project</button>
						</a>
						<a href="https://github.com/caelwarner/darkness-activated-tiles" target="_blank">
							<button class="button">View Source</button>
						</a>
					</div>
				</div>

				<div class="laptop">
					<client-only>
						<Laptop texture="index/darkness-activated-tiles.png" />

						<template slot="placeholder">
							<h3 class="laptop-loading">Loading...</h3>
						</template>
					</client-only>
				</div>
			</div>
		</section>

		<section id="about">
			<div class="heading">
				<h2>About</h2>
				<h4><span>\</span>Me</h4>
			</div>

			<div class="content">
				<p>I'm a self taught developer with over 5 years of experience. I can program in a wide range of
					languages like Java, Python and Javascript. <br /> I've used a large collection of frameworks and
					libraries like Forge and Fabric in Java for mod development for Minecraft. Flask and Ariadne in
					Python for creating web app backends. VueJS and ThreeJS for creating websites just like this one. I
					love to learn new technologies and work with new people. If you'd like to contact me feel free with
					the details below.</p>
			</div>
		</section>

		<section id="contact">
			<div class="heading">
				<h2>Contact</h2>
				<h4><span class="mobile">\</span>Me<span class="desktop">/</span></h4>
			</div>

			<div class="content">
				<ul>
					<li>Email | <span><a href="mailto:caelawarner@gmail.com">caelawarner@gmail.com</a></span></li>
					<li>Phone | <span>778-870-2720</span></li>
					<li>GitHub | <span><a href="https://caelwarner.com/gh" target="_blank">caelwarner</a></span>
					</li>
				</ul>
			</div>
		</section>
	</div>
</template>

<style scoped>

#home {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
}

#home .heading {
	font-family: "League Spartan Bold", Helvetica, Arial, sans-serif;
	margin-top: -5rem;
	margin-left: 5rem;
	text-align: left;
	z-index: -1;
}

#home .heading h1 {
	font-size: 7rem;
	line-height: 6rem;
	margin-bottom: 0;
}

#home .heading h3 {
	font-size: 4.5rem;
	line-height: 4rem;
	margin-top: 0;
	color: var(--sub-heading-color);
}

#home .heading h3 span {
	color: var(--heading-color);
}

.planet {
	display: flex;
	flex-direction: column;
	justify-content: center;
	margin-top: -2rem;
	z-index: -2;
	width: 100vh;
	height: 100vh;
}

.planet-loading {
	font-size: 3rem;
	font-family: Helvetica, Arial, sans-serif;
	font-style: italic;
	font-weight: 100;
	color: var(--sub-heading-color);
}

#projects {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}

.project {
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
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

.laptop {
	display: flex;
	flex-direction: column;
	justify-content: center;
	width: 70rem;
	height: 70rem;
}

.laptop-loading {
	font-size: 1.6rem;
	font-family: Helvetica, Arial, sans-serif;
	font-style: italic;
	font-weight: 100;
	color: var(--sub-heading-color);
}

#about {
	display: flex;
	flex-direction: row;
	justify-content: center;
	max-width: 50rem;
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
	max-width: 50rem;
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

@media screen and (max-width: 480px) {
	#home {
		flex-direction: column;
	}

	#home .heading {
		width: min-content;
		margin-left: 0;
		margin-top: -1rem;
	}

	.planet {
		width: 100vw;
	}

	.project {
		flex-direction: column;
	}

	.project .content {
		margin-right: 0;
		margin-top: 4rem;
		margin-bottom: -4rem;
	}

	.laptop {
		width: 38rem;
		height: 38rem;
		max-width: 100vw;
	}

	#about {
		flex-direction: column;
		align-items: center;
	}

	#about .heading {
		text-align: center;
		margin-right: 0;
	}

	#about .content {
		margin-left: 3rem;
		margin-right: 3rem;
	}

	#contact {
		flex-direction: column;
		align-items: center;
		margin-top: 5rem;
	}

	#contact .heading {
		text-align: center;
		margin-left: 0;
	}

	#contact .content ul {
		margin-top: 0;
		padding-left: 0;
	}
}

</style>
