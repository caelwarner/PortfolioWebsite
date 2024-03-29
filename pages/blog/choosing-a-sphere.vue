<template>
	<div class="blog">
		<div class="heading">
			<h1>Choosing a Sphere</h1>
			<h3><span>\</span>Appropriate for a planet</h3>
		</div>
		<expandable-image src="/blog/choosing-a-sphere/spheres-comparison.png" alt="Spheres Comparison" />

		<p class="margin-top">
			Choosing what type of sphere to use was no easy task. I needed a sphere that had an even distribution of
			detail and a high level of control over the resolution of the mesh.
		</p>

		<h2 id="uv-sphere">UV Sphere</h2>
		<p>
			The default option is an UV sphere, which is evenly divided into rows and columns. This allows for a high
			level of granularity of control over the mesh's detail, which is one half of the equation. However, this
			type of sphere has the problem of having a higher density of vertices and faces near the poles of the
			sphere. This would not work well for my purposes as I don't want the planet to have higher levels of
			details near the poles.
		</p>
		<expandable-image src="/blog/choosing-a-sphere/uv-sphere.png" alt="UV Sphere" />


		<h2 id="ico-sphere">Ico Sphere</h2>
		<p>
			The second option would be to use an ico sphere, which has equally sized triangles. This gives me an even
			distribution of detail across the sphere. However, due to the nature of equally subdividing triangles, I can
			only increase the number of faces by a factor of four. This gives me very little granularity and control of
			how detailed the sphere is.
		</p>
		<expandable-image src="/blog/choosing-a-sphere/ico-sphere.png" alt="Ico Sphere" />


		<h2 id="normalized-sphere">Normalized Sphere</h2>
		<p>
			The third option is to start with a cube, and then normalize each vertices position from the center. This
			creates a sphere has a very even distribution of detail, with only slightly higher level of detail near the
			seams where the sides of the cube have come together. It also gives me a high granularity of detail as I can
			divide the sides of the cube into as many faces as I'd like. The only downside is that there can be some
			small artifacts along the seam lines where the sides of the cube meet.
		</p>
		<expandable-image src="/blog/choosing-a-sphere/normalized-sphere.png" alt="Normalized Sphere" />

		<h2 id="conclusion">Conclusion</h2>
		<p>
			Using a normalized sphere has turned out great. It satisfied all of my requirements and the math needed to
			create it was fairly simple. The small artifacts along the seam lines, where some vertices just don't quite
			connect, are all but invisible once noise is applied and the sphere is deformed. I did find a solution that
			solves this problem, which is to merge vertices that are really close to each other, connecting the small
			gaps. However, merging nearby vertices takes about 500 milliseconds of compute time on my powerful desktop
			computer. This performance hit is certainly not worth the small benefit of eliminating a rare and difficult
			to spot artifact.
		</p>
	</div>
</template>

<script>
export default {
	layout: "blog"
}
</script>
