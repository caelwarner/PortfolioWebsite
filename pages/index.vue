<template>
	<div id="page">
		<section id="home">
			<div class="main-content">
				<div class="heading">
					<h1>Cael Warner</h1>
					<h3><span>\</span>Developer</h3>
				</div>
				<div class="planet">
					<client-only>
						<Planet :key="planetKey" />

						<template slot="placeholder">
							<h2 class="planet-loading">Loading...</h2>
						</template>
					</client-only>
				</div>
			</div>

			<p id="reload-planet" @click="rerenderPlanet">This planet is procedurally generated. Click to regenerate.</p>
		</section>

		<section id="projects">
			<div class="project">
				<div class="content">

					<h2 class="name">Infernal Expansion</h2>
					<h6 class="date">Oct 2020 - Present</h6>
					<p>
						A community lead mod to expand on Minecraft in Java. It's currently amassed over
						{{(curseforgeDownloads / 1000000).toFixed(1)}} million downloads.
					</p>
					<div class="buttons">
						<NuxtLink to="/project/infernal-expansion">
							<button>View Project</button>
						</NuxtLink>
						<a href="https://github.com/infernalexp/Infernal-Expansion" target="_blank">
							<button>View Source</button>
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
					<p>
						A fullstack web app made with Python and VueJS to connect eye doctors and patients for easier
						diagnoses of eye diseases.
					</p>
					<div class="buttons">
						<NuxtLink to="/project/teleaeye">
							<button>View Project</button>
						</NuxtLink>
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
					<p>
						A small addon module for FoundryVTT, a virtual table top for games like D&D with close to 100
						thousand downloads. Made in Javascript.
					</p>
					<div class="buttons">
						<NuxtLink to="/project/darkness-activated-tiles">
							<button>View Project</button>
						</NuxtLink>
						<a href="https://caelwarner.com/gh/DarknessActivatedTiles" target="_blank">
							<button>View Source</button>
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
<!--			<div class="project">-->
<!--				<div class="content">-->
<!--					<h2 class="name">caelwarner.com</h2>-->
<!--					<h6 class="date">Jan 2022 & Sept 2022</h6>-->
<!--					<p>-->
<!--						This professional portfolio site enhanced with procedurally generated 3D elements-->
<!--					</p>-->
<!--					<div class="buttons">-->
<!--						<NuxtLink to="/project/portfolio">-->
<!--							<button>View Project</button>-->
<!--						</NuxtLink>-->
<!--						<a href="https://caelwarner.com/gh/PortfolioWebsite" target="_blank">-->
<!--							<button>View Source</button>-->
<!--						</a>-->
<!--					</div>-->
<!--				</div>-->

<!--				<div class="laptop">-->
<!--					<client-only>-->
<!--						<Laptop texture="index/portfolio-front-page.png" />-->

<!--						<template slot="placeholder">-->
<!--							<h3 class="laptop-loading">Loading...</h3>-->
<!--						</template>-->
<!--					</client-only>-->
<!--				</div>-->
<!--			</div>-->
		</section>

		<section id="about">
			<div class="heading">
				<h2>About</h2>
				<h4><span>\</span>Me</h4>
			</div>

			<div class="content">
				<p>I'm a self taught developer with over 6 years of experience. I'm experienced in a wide range of
					languages including Java, Python, C++ and Typescript. <br /> I've used a large collection of
					frameworks and libraries like Forge and Fabric in Java for mod development for Minecraft. Flask and
					Ariadne in Python for creating web app backends. VueJS and ThreeJS for creating websites just like
					this one. I love to learn new technologies and work with new people. If you'd like to contact me
					feel free with the details below.</p>
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

<script>
export default {
	layout: "default",
	data() {
		return {
			curseforgeDownloads: 0,
			planetKey: 0
		};
	},
	mounted() {
		document.body.style.backgroundColor = "#03020b";
	},
	methods: {
		rerenderPlanet() {
			this.planetKey += 1;
		}
	},
	async fetch() {
		this.curseforgeDownloads = await fetch("https://api.cfwidget.com/395078")
			.then(res => res.json())
			.then(data => data.downloads.total);
	},
	fetchOnServer: false,
	fetchDelay: 0
}
</script>

<style scoped>
#home {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}

#home .main-content {
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
	color: var(--secondary-color);
}

#home .heading h3 span {
	color: var(--primary-color);
}

#home #reload-planet {
	transition: color 0.15s;
	cursor: pointer;
}

#home #reload-planet:hover {
	color: var(--primary-color);
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
	color: var(--secondary-color);
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
	font-weight: bold;
	margin-top: 0;
	margin-bottom: 0.4rem;
}

.project .content h4 {
	color: var(--secondary-color);
	font-size: 1.5rem;
}

.project .content h6 {
	color: var(--secondary-color);
	font-size: 0.7rem;
	font-weight: 900;
	margin: 0;
	line-height: 0.1rem;
}

.project .content p {
	color: var(--secondary-color);
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
	color: var(--secondary-color);
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
	font-weight: bold;
	margin-top: 2rem;
	margin-bottom: 0;
}

#about .heading h4 {
	font-size: 2.5rem;
	margin-top: 0;
	color: var(--secondary-color);
}

#about .heading h4 span {
	color: var(--primary-color);
}

#about .content {
	max-width: 30rem;
}

#about .content p {
	color: var(--secondary-color);
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
	font-weight: bold;
	margin-top: 2rem;
	margin-bottom: 0;
}

#contact .heading h4 {
	font-size: 2.5rem;
	margin-top: 0;
	color: var(--secondary-color);
}

#contact .heading h4 span {
	color: var(--primary-color);
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
	color: var(--secondary-color);
}

#contact .content a {
	text-decoration: none;
	color: var(--secondary-color);
	transition: color 0.15s;
}

#contact .content a:hover {
	color: var(--primary-color);
}

@media screen and (max-width: 768px) {
	.project {
		flex-direction: column;
	}

	.project .content {
		margin: 4rem 0 -4rem;
		z-index: 10;
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

@media screen and (max-width: 992px) {
	.laptop {
		width: 38rem;
		height: 38rem;
		max-width: 100vw;
	}
}

@media screen and (min-width: 992px) and (max-width: 1600px) {
	.laptop {
		width: 50rem;
		height: 50rem;
		max-width: 100vw;
	}
}

@media screen and (max-width: 1200px) {
	#home .main-content {
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
}

@media screen and (min-width: 768px) and (max-width: 1600px) {
	.project .content {
		margin-left: 4rem;
		margin-right: 0;
	}
}

</style>
