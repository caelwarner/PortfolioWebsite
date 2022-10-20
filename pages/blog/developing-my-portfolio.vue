<template>
	<div class="blog">
		<div class="heading">
			<h1>Developing My Portfolio Site</h1>
			<h3><span>\</span>The challenges I had to overcome</h3>
		</div>
		<expandable-image src="/blog/developing-my-portfolio/portfolio-front-page.png" alt="Portfolio Front Page" />

		<p class="margin-top-half">
			My portfolio site is built using <NuxtLink to="https://nuxtjs.org/">Nuxt.js</NuxtLink> and
			<NuxtLink to="https://threejs.org/">three.js</NuxtLink>. Nuxt.js is a static site generator for Vue.js, a JS
			framework. And, Three.js is used to render 3D elements in real-time on the page, like the planet and laptops
			on the main page.
		</p>


		<h2 id="planet">Planet</h2>
		<p>
			The planet is procedurally generated every time the page is reloaded. It's made by placing vertices and then
			connecting them all together into tris, and then faces, and then eventually the whole mesh. Next, noise is
			used to deform the sphere to create terrain. Finally colour is added and the planet is rendered onto the
			page. But, while I'm able to summarize the whole process in a couple of sentences the actual process took me
			through many more trials and tribulations like any good programming project should.
		</p>
		<div class="img-group">
			<div class="img-wrapper"><expandable-image src="/blog/developing-my-portfolio/planet-peach.png" alt="Peach Planet" /></div>
			<div class="img-wrapper"><expandable-image src="/blog/developing-my-portfolio/planet-teal.png" alt="Teal Planet" /></div>
		</div>


		<h2 id="creating-the-sphere">Creating the Sphere</h2>
		<p>
			Creating the sphere was the first challenge to overcome. There are many different ways of arranging vertices
			and faces to create a sphere, each coming with their own advantages and disadvantages. I went with a
			normalized sphere where I start with a cube and then morph it to make a sphere. Read how I choose which type
			of sphere to use <NuxtLink to="/blog/choosing-a-sphere">here</NuxtLink>.
		</p>
		<p>
			To construct the sphere I went one side of the cube at a time, creating a grid of vertices then connecting
			them together into tris that then make faces. I can control the fidelity of the final planet by changing the
			resolution of this grid. I then create six of these sides and orient them to make a cube. The last step is
			easy, only requiring one line of code, normalize each vertices position from the center to create a sphere.
		</p>
		<div class="img-group">
			<div class="img-wrapper"><expandable-image src="/blog/developing-my-portfolio/square.png" alt="Side of cube" /><p>Tris forming square mesh</p></div>
			<div class="img-wrapper"><expandable-image src="/blog/developing-my-portfolio/cube.png" alt="Cube" /><p>Square meshes assembled to make a cube</p></div>
			<div class="img-wrapper"><expandable-image src="/blog/developing-my-portfolio/normalized-sphere-wireframe.png" alt="Normalized Sphere" /><p>Cube normalized into sphere</p></div>
		</div>


		<h2 id="noise">Noise</h2>
		<p>
			The next step is to deform the sphere using noise. I can layer more noise with smaller scales on top of each
			other to create detail. This gives me large deformations in the terrain like mountains and valleys as well
			as small deformations that make up the detail.
		</p>
		<div class="img-wrapper">
			<expandable-image src="/blog/developing-my-portfolio/multi-layer-noise.png" alt="Multilayer noise" />
			<p>Multi-layer noise creating mountain like deformations</p>
		</div>
		<p class="margin-top">
			To create an ocean I simply set a minimum elevation that every vertex has to be at. This works because,
			ignoring tides, the sea level across a planet will be the same since liquids always flow to the lowest point
		</p>
		<div class="img-wrapper">
			<expandable-image src="/blog/developing-my-portfolio/ocean.png" alt="Adding an ocean" />
			<p>Setting a minimum elevation to create an ocean</p>
		</div>
		<p class="margin-top">
			To add more detail and interest to the planet I can use multiple different noise generators with different
			settings. I have the default noise generator that creates general waviness in the terrain. And then I have a
			ridge noise generator which is very similar to the default noise generator, except all the noise values are
			fed through the formula <code>y = (1 - |sin(x)|)^2</code>, which changes the noise to create sharp ridges.
		</p>
		<div class="img-wrapper">
			<expandable-image src="/blog/developing-my-portfolio/ridge-formula.png" alt="Ridge formula" />
			<p>Ridge formula shown on a graph</p>
		</div>

		<p>
			Once the formula is graphed, you can see how it pushes the noise values into acute peaks and wide troughs.
			This creates long, sharp ridges lines which form into expansive mountain ranges.
		</p>
		<div class="img-wrapper">
			<expandable-image src="/blog/developing-my-portfolio/ridge-noise.png" alt="Ridge noise generator" />
			<p>Planet with only the ridge noise generator applied</p>
		</div>


		<h2 id="colour">Colour</h2>
		<p>
			Adding colour is a fairly simple endeavour. I assign colour to each vertex based off of it elevation.
			A gradient is built of colours at different elevations; starting from the ocean colour, then going to the
			general ground colour, then the mountain colour and then the peak colour.
		</p>
		<p>
			The most challenging part of adding colour is creating the gradient. How should I smoothly get from one
			colour to another? The solution to this problem is so elegant. I treat colour as a 3D space where each axis
			is a different colour: red, green and blue.
		</p>
		<div class="img-wrapper">
			<expandable-image src="/blog/developing-my-portfolio/3d-color-space.jpg" alt="Colour 3D Space" />
			<p>3D representation of RGB colour space</p>
		</div>
		<p class="margin-top">
			I then insert my starting and ending colours as points in this 3D space. All that's left to do is to draw a
			line and move along that line to fill in my gradient. Stringing multiple of these gradients together gives
			me the full gradient of different elevations.
		</p>
		<expandable-image src="/blog/developing-my-portfolio/coloured-planet.png" alt="Planet with colour" />


		<h2 id="final-steps">Final Steps</h2>
		<p>
			After completing the planet I was able to integrate it into this Vue.js site. I then later switched to using
			Nuxt.js for performance improvements. With the framework shift and just general code optimizations I was
			able to improve the planet generation performance by a full order of magnitude. Read my optimization process
			<NuxtLink to="/blog/improving-planet-performance">here</NuxtLink>. The final thing left to do was polishing
			the site into a finished product, which of course took an absurd amount of time. That final 10% is always
			the hardest to achieve.
		</p>

		<h2 id="conclusion">Conclusion</h2>
		<p>
			Through my journey of creating a procedurally generated 3D planet that renders on a web page I've learnt
			many things like some of the unique quirks of JavaScript and how those effect performance, as well as how to
			use TypeScript in both vanilla JS and Vue.js. On top of the lessons learnt, I've ended up with this
			professional portfolio and blog site. I couldn't be happier with the outcome.
		</p>
	</div>
</template>

<script>
export default {
	layout: "blog"
}
</script>
