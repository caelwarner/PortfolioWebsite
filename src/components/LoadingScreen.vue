<template>
	<div id="loading">Loading...</div>
</template>

<script>
export default {
	name: "LoadingScreen"
}
</script>

<style scoped>
#loading {
	background-color: var(--bg-color);
	color: white;
	font-size: 2rem;
	padding-top: 40vh;
	height: 100vh;
	text-align: center;
	z-index: 100;
}
</style>