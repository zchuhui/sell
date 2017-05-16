<template>
	<div class="shopcart">
		<div class="content">
			<div class="content-left">
				<div class="logo-warp" @click="toggleList">
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
		<div class="showcart-list" v-show="listShow">
			<div class="list-header">
				<span class="name">购物车</span>
				<span class="empty">清空</span>
			</div>
			<div class="list-content" ref="listWrap">
				<ul>
					<li v-for="food in selectFoods">
						<span class="name">{{ food.name }}</span>
						<div class="price">
							<span>￥{{ food.price*food.count }}</span>
						</div>
						<div class="cartcontrol-wrap"><cartControl :food="food"></cartControl></div>
					</li>
				</ul>
			</div>
		</div>
	</div>

</template>

<script type="text/ecmascript-6">
	import BScroll from 'better-scroll';
	import cartControl from 'components/cartControl/cartControl.vue';

	export default{
		// 接收传过来的值
		props:{
			// 选择的商品
			selectFoods:{
				type:Array,
				default(){
					return [{price:0,count:0}];
				}
			},
			deliveryPrice:{
				type:Number
			},
			minPrice:{
				type:Number
			}
		},
		data(){
			return{
				listShow:false,
				fold:false
			}
		},
		computed:{
			// 计算总价格
			totalPrice(){
				let total = 0;
				this.selectFoods.forEach((food) => {
					total += food.price * food.count;
				});
				//console.log(this.selectFoods);
				return total;
			},
			// 计算总数
			totalCount(){
				let total = 0;
				this.selectFoods.forEach((food) => {
					total += food.count;
				});

				// 异步更新队列
	  			/*this.$nextTick(() => {
	  				this.scroll = new BScroll(this.$refs.listWrap,{
	            		click: true
			  		});
	  			});*/

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
			// 如果超过起送价格，则显示支付
			payClass(){
				if(this.totalPrice >= this.minPrice){
					return 'enough';
				}
				else{
					return 'not-enough';
				}
			},
			listShow(){
				if(this.totalCount > 0){
					this.fold = true;
					console.log("listShow:"+listShow); 
					return 1;
				}

				return 0;
			}
		},
		methods:{
			toggleList(){
				if(!this.totalCount){
					return;
				}
				this.listShow = !this.listShow;
			},
			
		},
		components:{
			cartControl
		}
	}
</script>

<style lang="stylus">
@import "../../common/styles/mixin.styl"

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
					z-index:100;
					
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
		
		.showcart-list{
			position:absolute;
			left:0;
			bottom:52px;
			width:100%;
			background:#fff;
			
			.list-header{
				height:40px;
				line-height:40px;
				background:#f3f5f7;
				padding:0 18px;
				border-1px(rgba(7,17,27,0.1));
				
				.name{
					font-size:14px;
					font-weight:200;
					color:rgba(7,17,27,1); 
				}
				.empty{
					float:right;
					font-size:12px;
					color:rgba(0,160,220,1);
				}
			}
			.list-content{
				max-height:217px;
				overflow:hidden;
				
				li{
					margin:0 18px;
					height:48px;
					line-height:48px;
					border-1px(rgba(7,17,27,0.1));
					
					.name{

					}
					.price{
						float:right;
						margin-right:100px;
						display:inline-block;
						font-size:14px;
  						color:rgba(240,20,20,1);
  						font-weight:700;
					}
					.cartcontrol-wrap{
			            position:absolute;
			            right:0;
			            bottom:-12px;
			          }
				}
			}
		}
	}
		
</style>