<template>
	<div class="loadWrap">
		<div class="loading">
			<img src="@/assets/load.gif" alt="">
		</div>
	</div>
</template>

<script>

	export default ({

	})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" rel="stylesheet/scss">
	$fontSize:(375/320)*20;
	.loadWrap{
		position: fixed;
		left:0;
		right:0;
		top:0;
		bottom:0;
		background: transparent;
	}
	.loading{
		position: absolute;
		top:50%;
		left:50%;
		margin-left: -16/$fontSize*1rem;
		margin-top: -16/$fontSize*1rem;
	}
	.loading img{
		width:32/$fontSize*1rem;
		height:32/$fontSize*1rem;
	}
</style>
