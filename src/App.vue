<template>
	<navbar></navbar>
	<div class="app">
		<div class="container">
			<div class="content">
				<router-view></router-view>
			</div>
		</div>
	</div>
</template>

<script>
import Navbar from "@/components/Navbar"
export default {
	components: {
		Navbar
	}
}
</script>

<style lang="scss">
	@import 'scss/reset.scss';

	body {
		background: gray;
	}

	.container {
		display: flex;
		max-width: 1200px;
		margin: 0 auto;
		padding: 50px 0;
		background-color: white;

	}

	.content {
		margin: 15px;
		display: block;

		font-size: 22px;
		
		
	}
</style>
