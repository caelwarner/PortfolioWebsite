<template>
	<Project title="TeleAEye" subtitle="Diagnosing Eye Disease" imgSrc="/index/teleaeye.png" :buttons="[
		{ label: 'Unreleased', link: '' }
	]">
		<p>
			TeleAEye is an online platform and camera that helps eye doctors diagnose eye disease. It uses a cheap
			camera to take pictures of patients fundi, and then AI to recognize eye diseases in the pictures. The
			results are then confirmed by an eye doctor. Using AI speeds up the process allowing for more frequent eye
			checkups and thus earlier diagnosis resulting in a higher chance of prevention. The cheap camera means that
			this can be deployed almost anyone for a fraction of the cost of competing solutions, meaning that better
			eye care can be administered to developing areas of the world.
		</p>
		<p>
			The online platform I built takes the results from the AI and presents them to both the doctor and patient.
			This means that patients can receive their results without having to go in for a second appointment,
			potentially saving them hours in travel time. This web app is built using Vue.js for the frontend, Python
			for the backend, GraphQL for the API, and PostgreSQL for the database.
		</p>
	</Project>
</template>
