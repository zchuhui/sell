<template>
  <div class="goods">
    <div class="menu-wrap" ref="menuWrap">
      <ul>
      	<li v-for="(item,i) in goods " class="menu-item border-1px" :class="{'current':currentIndex===i}" v-on:click="selectMenu(i,$event)">
      		<span class="text">
      			<span v-show="item.type > 0" class="icon" :class="classMap[item.type]" ></span>
      			{{ item.name }} 
      		</span> 
      	</li>
      </ul>
    </div>
    <div class="content-wrap" ref="foodsWrap">
        <ul>
      		<li v-for="item in goods" class="food-list-hook">
	      		<div class="title">{{ item.name }}</div>
	      		<ul>
	      			<li v-for="food in item.foods" class="food-item">
	      				<div class="icon">
	      					<img width="57" height="57" :src="food.icon">
	      				</div>
	      				<div class="content">
	      					<h2 class="name">{{ food.name }}</h2>
	      					<p class="description">{{ food.description }}</p>
	      					<div class="rating">
	      						月售{{ food.sellCount }}份 &nbsp; 好评率{{ food.rating }}
	      					</div>
	      					<div class="price">
	      						<span class="now">￥{{ food.price }}</span>
	      						<span class="old" v-if="food.oldPrice">￥{{ food.oldPrice }}</span>
	      					</div>
                  <div class="cartcontrol-wrap"><cartControl :food="food"></cartControl></div>
	      				</div>
	      			</li>
	      		</ul>
      		</li>
        </ul>
    </div>
    <shopcart :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice"></shopcart>
  </div>
</template>


<script>
	import BScroll from 'better-scroll';
  import shopcart from 'components/shopcart/shopcart.vue'
	import cartControl from 'components/cartControl/cartControl.vue'

	// 数据是否正确
	const ERR_OK = 0;

	export default {
	  	props: {
	  		seller: {
	  			type: Object
	  		}
	  	},
	  	data(){
	  		return {
	  		goods: [],
	  		listHeight: [],
	  		scrollY: 0
	  		}
	  	},
	  	computed:{
		  	currentIndex(){
		  		// 计算scrollY停留在哪个区间
		  		for(let i=0,len = this.listHeight.length; i<len; i++){
		  			let height1 = this.listHeight[i];
		  			let height2 = this.listHeight[i+1];
		  			if ((this.scrollY >= height1 && this.scrollY < height2) || !height2) {
		  				return i;
		  			}
		  		}
		  		return 0;
		  	}
	  	},
	  	created(){

	  		this.classMap = ['decrease','discount','gurantee','invoice','special'];

	  		// 请求数据
	  		this.$http.get("/api/goods").then((response) => {

		  		response = response.body;

		  		if (response.result === ERR_OK) {
		  			this.goods = response.data;

		  			// 异步更新队列
		  			this.$nextTick(() => {
		  				this._initScroll();
		  				this._calculateHeight();
		  			})
		  			
		  		}
		  		else{
			        console.log("error:no goods");
			    }
		  	})
		  },
		methods:{
		  	selectMenu(index,event){
		  		// 解决电脑端事件触发两次的问题
		  		// 如果不是自己派发的事件，则返回
		  		if (!event._constructed) {
		  			return;
		  		}

		  		let foodList = this.$refs.foodsWrap.getElementsByClassName('food-list-hook');
		  		let el = foodList[index];
		  		this.foodsScroll.scrollToElement(el,500);

		  	},
		  	// 初始化滚动条
		  	_initScroll(){
		  		this.menuScroll = new BScroll(this.$refs.menuWrap,{
		  			click: true
		  		});

		  		this.foodsScroll = new BScroll(this.$refs.foodsWrap,{
		  			probeType: 3,
            click: true
		  		});

		  		this.foodsScroll.on('scroll',(pos)=>{
		  			this.scrollY = Math.abs(Math.round(pos.y));
		  		})
		  	},
		  	// 获取每个区间与上边的距离
		  	_calculateHeight(){

		  		let foodList = this.$refs.foodsWrap.getElementsByClassName('food-list-hook');
		  		let height = 0;
		  		this.listHeight.push(height);

		  		for(let i=0; i<foodList.length; i++){
		  			let item = foodList[i];
		  			height += item.clientHeight;
		  			this.listHeight.push(height);
		  		}

		  	}
		},
		components:{
			shopcart,
      cartControl
		}
	}
</script>

<style lang="stylus">

  @import "../../common/styles/mixin.styl"

  .goods{
  	display:flex;
  	position:absolute;
  	top:174px;
  	bottom:46px;
  	overflow:hidden;
  	
  	.menu-wrap{
  		flex:0 0 80px;
  		width:80px;
  		background:#f3f5f7;
  		
  		.menu-item{
  			display:table;
  			width:80px;
  			height:54px;
  			line-height:14px;
  			border-1px(rgba(7,17,27,0.1));
  			
  			&.current{
  				background:#fff;
  				border-none();
  				.text{
  					font-weight:700;
  				}
  			}
  			
  			&:last-child{
  				border-none();
  			}
  				
  			.icon{
				display:inline-block;
				width:16px;
				height:16px;
				background-size:16px 16px;
				vertical-align:top;
				margin-right:2px;
				
				&.decrease{
					bg-image("decrease_3");
				}
				&.discount{
					bg-image("discount_3");
				}
				&.gurantee{
					bg-image("guarantee_3");
				}
				&.invoice{
					bg-image("invoice_3");
				}
				&.special{
					bg-image("special_3");
				}
			}
			
			.text{
  				display:table-cell;
  				vertical-align:middle;
  				font-size:12px;
  				width:56px; 
  				text-align: center;
  				padding:0 12px;
  			}
  		}
  	}
  	
  		
  	.content-wrap{
  		flex:1;
  		
  		.title{
  			width:100%;
  			height:26px;
  			line-height:26px;
  			color:rgba(147,153,159,1);
  			font-size:12px;
  			background:#f3f5f7;
  			padding-left:12px;
  			border-left:2px solid #d9dde1;
  		}
  		.food-item{
  			display:flex;
  			margin:18px;
  			padding-bottom:18px;
  			border-1px(rgba(7,17,27,0.1));
  			
  			&:last-child{
  				margin-bottom:0;
  				border-none();
  			}
  			
  			.icon{
  				flex:0 0 57px;
  				margin-right:10px;
  			}
  			
  			.content{
  				flex:1;
  				
  				.name{
  					font-size:14px;
  					line-height:14px;
  					color:rgba(7,17,27,1);
  					margin-top:2px;
  				}
  				.description,.rating{
  					font-size:10px;
  					line-height:14px;
  					color:rgba(147,153,159,1);
  				}
  				.description{
  					margin:8px 0;
  				}
  				.rating{
  					margin-bottom:8px;
  				}
  				.price{
  					.now{
  						font-size:14px;
  						color:rgba(240,20,20,1);
  						font-weight:700;
  					}
  					.old{
  						font-size:10px;
  						color:rgba(147,153,159,1);
  						font-weight:700;
  						margin-left:8px;
  						text-decoration:line-through;
  					}
  				}
          .cartcontrol-wrap{
            position:absolute;
            right:0;
            bottom:12px;
          }    
  				
  			}
  			
  		}

  	}
  	
  }
  

  
</style>
