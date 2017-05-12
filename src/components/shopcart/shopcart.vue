<template>
	<div class="shopcart">
		<div class="content">
			<div class="content-left">
				<div class="logo-warp">
					<div class="logo" :class="{'heightLight':totalCount>0}">
						<span class="icon-shopping_cart"></span>
					</div>
					<div v-if="totalCount > 0" class="count">{{ totalCount }}</div>
				</div>
				<div class="price" :class="{'heightLight':totalCount>0}">￥{{ totalPrice }}</div>
				<div class="des">另需配送费 ￥{{ deliveryPrice }} 元</div>
			</div>
			<div class="content-right" :class="payClass">
				<span>{{ payDesc }}</span>
			</div>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	export default{
		// 接收传过来的值
		props:{
			// 选择的商品
			selectFoods:{
				type:Array,
				default(){
					return [{price:10,count:10}];
				}
			},
			deliveryPrice:{
				type:Number
			},
			minPrice:{
				type:Number
			}
		},
		computed:{
			// 计算总价格
			totalPrice(){
				let total = 0;
				this.selectFoods.forEach((food) => {
					total += food.price * food.count;
				});

				return total;
			},
			// 计算总数
			totalCount(){
				let total = 0;
				this.selectFoods.forEach((food) => {
					total += food.count;
				});

				return total;
			},
			// 计算支付信息
			payDesc(){
				if (this.totalPrice === 0) {
					// 切记这里用的是``符号
					return `￥${this.minPrice}起送`;
				}else if(this.totalPrice < this.minPrice){
					var d = this.minPrice - this.totalPrice;
					return `还差￥${d}起送`;
				}else{
					return '去结算';
				}

			},
			payClass(){
				if(this.totalPrice > this.minPrice){
					return 'enough';
				}
				else{
					return 'not-enough';
				}
			}
		}
	}
</script>

<style lang="stylus">
	.shopcart{
		position:fixed;
		left:0;
		bottom:0;
		width:100%;
		
		.content{
			display:flex;
			height:52px;
			background:#141d27;
			
			.content-left{
				flex:1;

				.logo-warp{
					position: relative;
					display:inline-block;
					top:-10px;
					width:56px;
					height:56px;
					margin:0 12px;
					border-radius:50%;
					background:#141d27;
					
					.logo{
						display:flex;
						justify-content: center;
  						align-items: center;
						width:46px;
						height:46px;
						background:rgba(225,225,225,0.2);
						border-radius:50%;
						margin:5px;
						font-size:24px;
						
						.icon-shopping_cart{
							color:rgba(225,225,225,0.4);
						}
						
						&.heightLight{
							background:rgba(0,160,220,1);
							
							.icon-shopping_cart{
								color:rgba(255,255,255,1);
							}
						}
					}
					.count{
						position:absolute;
						top:0;
						right:0;
						display:inline-block;
						width:24px;
						height:16px;
						line-height:16px;
						text-align:center;
						color:#fff;
						background:#f01414;
						border-radius:16px;
						font-size:9px;
						font-weight:700;
						box-shadow:0px 4px 8px 0px rgba(0,0,0,0.4);
						
					}
				}
				
				.price{
					display:inline-block;
					font-size:16px;
					height:32px;
					line-height:32px;
					color:rgba(225,225,225,0.4);
					font-weight:700; 
					vertical-align: top;
					border-right:1px solid rgba(225,225,225,0.1);
					margin:10px 0;
					margin-right:6px;
					padding-right:6px;
					
					&.heightLight{
						color:rgba(255,255,255,1);
					}
				}
				
				.des{
					display:inline-block;
					font-size:12px;
					height:32px;
					line-height:32px;
					color:rgba(225,225,225,0.4);
					vertical-align: top;
					margin:10px 0;
				}
			}
			
			.content-right{
				display:flex;
				justify-content: center;
				align-items: center;
				
				flex:0 0 105px;  //宽度为105
				color:rgba(225,225,225,0.4);
				font-weight:700; 
				font-size:12px;
				
				&.not-enough{
					background:rgba(225,225,225,0.2); 
				}
				&.enough{
					color:rgba(255,255,255,1)
					background:#00b43c;
				}
			}
		}
	}
		
</style>