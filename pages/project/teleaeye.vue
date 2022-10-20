<template>
	<Project title="TeleAEye" subtitle="Diagnosing Eye Disease" imgSrc="/index/teleaeye.png" :buttons="[
		{ label: 'Unreleased', link: 'javascript:void(0);' }
	]">
		<p>
			TeleAEye is an online platform paired with a camera that helps eye doctors diagnose eye disease. It uses an
			inexpensive camera to take pictures of patients fundi, and then uses AI to recognize eye diseases in the
			pictures. The results are then confirmed by an eye doctor. Using AI speeds up the process allowing for more
			frequent eye checkups and thus earlier diagnosis resulting in a higher chance of prevention. The cheap
			camera means that this can be deployed almost anywhere for a fraction of the cost of competing solutions,
			meaning that better eye care can be administered to developing areas of the world.
		</p>
		<p>
			The online platform I built takes the results from the AI and presents them to both the doctor and patient.
			This means that patients can receive their results without having to go in for a second appointment,
			potentially saving them hours of travel time. The web app is built using Vue.js for the frontend, Python
			for the backend, GraphQL as the API language, and PostgreSQL as the database.
		</p>
	</Project>
</template>
