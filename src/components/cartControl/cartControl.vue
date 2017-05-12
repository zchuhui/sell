<template>
	<div class="cart-control">
		<div class="cart-decrease icon-remove_circle_outline" v-show="food.count > 0" @click="decreaseCart"></div>
		<div class="cart-count" v-show="food.count > 0">{{ food.count }}</div>
		<div class="cart-add icon-add_circle" @click="addCart($event)"></div>
	</div>
</template>

<script type="text/ecmascript-6">
	import Vue from "vue";
	export default{
		// 接收传过来的值
		props:{
			food:{
				type:Object
			}
		},
		created(){
			// console.log(this.food);
		},
		methods:{
			addCart(event){ 
				if (!event._constructed) {
		  			return;
		  		}

				if (!this.food.count) {
					// 给food添加count属性
					Vue.set(this.food,'count',1);
				}else{
					this.food.count ++;
				}
			},
			decreaseCart(){
				if (!event._constructed) {
		  			return;
		  		}

				if (this.food.count > 0){
					this.food.count --;
				}
			}
		}
		
	}
</script>

<style lang="stylus">
	.cart-control{
		font-size:0;

		.cart-decrease{
			display:inline-block;
			font-size:24px;
			color:rgba(0,160,220,1);
		}
		.cart-count{
			display:inline-block;
			width:24px;
			height:24px;
			line-height:24px;
			margin:0 5px;
			font-size:10px;
			vertical-align: top;
   			text-align: center;
			color:rgba(147,153,159,1);
		}
		.cart-add{
			display:inline-block;
			font-size:24px;
			color:rgba(0,160,220,1);
		}
	}
</style>