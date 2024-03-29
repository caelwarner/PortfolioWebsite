<template>
	<div class="blog">
		<div class="heading">
			<h1>Improving Planet Generation Performance</h1>
			<h3><span>\</span>And the foolish inefficiencies of JS</h3>
		</div>
		<expandable-image src="/blog/improving-planet-performance/firefox-profiler.png" alt="Firefox Profiler" />

		<p class="margin-top-half">
			I wanted my portfolio site to load quickly. I knew from the beginning that it wouldn't be as quick as some
			other sites since it has to generate and load multiple 3D elements which take a lot of compute time, but I
			wanted it to be close. Initially, the planet took around 2-3 seconds to generate on my desktop computer,
			which is fairly powerful. This meant that it would take around 6-8 seconds for the page to load on mobile
			devices, which wasn't anywhere near fast enough. So I used
			<a href="https://profiler.firefox.com/">Firefox's amazing profiler</a> to profile the page load
			and noticed a few very interesting things.
		</p>
		<p>
			The first was that around 700ms was being taken up by calls to <code>_toConsumableArray</code>. I found that
			this was the internal function that was called when you unpack an array or object with the spread operator
			(<code>...</code>). I'd been using this operator to as a convenient way to unpack objects all over my
			codebase, not realising that this small bit of syntax sugar was causing such a hit. Removing every use of
			the spread operator eliminated all time consumed by <code>_toConsumableArray</code>.
		</p>
		<p>
			The second thing I found was a lot of time was being used checking if private variables could be
			accessed. Since I'm familiar with Java, I'm used to controlling the access that each variable has. What I
			didn't know is that in JavaScript this adds a lot of overhead because the interpreter now has to check if a
			variable is allowed to be accessed every time it's accessed. Replacing all my private variables with public
			ones saved another ~500ms. I've since moved to TypeScript and I'm now using it's access modifiers which
			don't have any overhead.
		</p>
		<p>
			The third large time sink was the noise generation function. I was using some generic noise generation
			library I found on npm. Turns out it wasn't very fast, but I figured there must be a faster library out
			there. After trying and profiling at least a half-a-dozen different noise generation libraries I eventually
			choose <a href="https://www.npmjs.com/package/simplex-noise">simplex-noise</a> by Jonas Wagner for its speed
			and ease of use.
		</p>
		<p>
			All these fixes and improvements bring the planets generation time down to around 600-800ms which is a huge
			improvement from the 2-3 seconds it initially took. There were a few more minor improvements like reusing
			objects in a loop instead of creating and destroying them over and over again that saved an additional
			150ms. The final change I made was moving from Vue.js to Nuxt.js which brought the generation time to under
			200ms. This means that on newer hardware the load time is near instant and on older hardware it's still
			under a second total which is still acceptable.
		</p>
	</div>
</template>

<script>
export default {
	layout: "blog"
}
</script>
