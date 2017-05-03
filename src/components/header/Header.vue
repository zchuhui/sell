<template>
  <div class="header">
    <div class="content-wrap">
    	<img width="64" height="64" :src="seller.avatar">
    	<div class="content">
    		<div class="title"><span class="brand"></span><span class="name">{{ seller.name }}</span></div>
    		<div class="description">{{ seller.description }} / {{ seller.deliveryTime }}分钟送达</div>
    		<div v-if="seller.supports" class="supports">
    			<span class="icon" :class="classMap[seller.supports[0].type]"></span>
    			<span class="text">{{ seller.supports[0].description }}</span>
    		</div>
    	</div>
    	<div v-if="seller.supports" class="support-count" @click="showDetail()">
    		<span>{{ seller.supports.length }} 个</span>
    		<span class="icon-keyboard_arrow_right"></span>
    	</div>
    </div>
    <div class="banner-wrap" @click="showDetail()">
    	<span class="icon"></span>
    	<span class="bulletin">{{ seller.bulletin }}</span>
    	<span class=" icon-keyboard_arrow_right"></span>
    </div>
    <transition name="slide-fade">
	    <div class="detail-wrap" v-show="detailShow">
	    	<div class="detail-main clearfix">
	    		<div class="detail-content">
	    			<h1 class="name">{{ seller.name }}</h1>
	    			<div class="star-wrap">
	    				<star :size="36" :score="seller.score"></star>
	    			</div>
	    			<div class="title">
	    				<div class="line"></div>
	    				<div class="text">优惠信息</div>
	    				<div class="line"></div>
	    			</div>
	    			<ul v-if="seller.supports" class="supports">
	    				<li v-for="(item,i) in seller.supports" class="support-item">
	    					<span :class="classMap[item.type]" class="icon"></span>
	    					<span>{{ item.description }}</span>
	    				</li>
	    			</ul>
	    			<div class="title">
	    				<div class="line"></div>
	    				<div class="text">商家公告</div>
	    				<div class="line"></div>
	    			</div>
	    			<div class="bulletin">
	    				{{ seller.bulletin }}
	    			</div>
	    		</div>
	    	</div>
	    	<div class="detail-close" @click="detailShow = !detailShow"><span class="icon-close"></span></div>
	    </div>
    </transition>
  </div>
</template>


<script>
 	import star from 'components/star/star';

	export default {
	  props: {
	  	seller:{
	  		type:Object
	  	}
	  },
	  data(){
	  	return{
	  		detailShow:false
	  	}
	  },
	  methods:{
	  	showDetail:function(){
	  		this.detailShow = true
	  	}
	  },
	  created(){
	  	this.classMap = ['decrease','discount','gurantee','invoice','special'];
	  },
	  components:{
	  	star:star
	  }
	}
</script>

<style lang="stylus">
@import '../../common/styles/mixin.styl';
@import '../../common/styles/base.styl';
@import '../../common/styles/icon.styl';

.header{
	background: #333;
	background-image:url('header-bg.jpg');
	background-size: cover;
	color:#fff;

	.content-wrap{
		position:relative;
		color:#fff;
		font-size:0;
		
		img{
			display: inline-block;
			border-radius:4px;
			margin:24px 16px 18px 24px;
			vertical-align: top;
		}
		
		.content{
			display: inline-block;
			margin-top:24px;
			font-size: 14px;
			line-height: 20px;
			
			.title{
				.brand{
					display:inline-block;
					height:18px;
					width:30px;
					vertical-align:top;
					bg-image('brand');
					background-size:100%;
				}
				.name{
					font-size:16px;
					line-height:18px;
					margin-left:8px;
					font-weight: bold;
				}
			}
			.description{
				margin-top:8px;
				font-size:12px;
				line-height:12px;
			}
			.supports{
				margin-top:8px;
				font-size:12px;
				line-height:12px;
				
				.icon{
					display:inline-block;
					width:12px;
					height:12px;
					vertical-align:top;
					background-size:100%;
					background-repeat:no-repeat;
					
					&.decrease{
						bg-image('decrease_1');
					}
					&.discount{
						bg-image('discount_1');
					}
					&.gurantee{
						bg-image('guarantee_1');
					}
					&.invoice{
						bg-image('invoice_1');
					}
					&.special{
						bg-image('special_1');	
					}
				}
			}
		}
		
		.support-count{
			position:absolute;
			top:60px;
			right:10px;
			display:inline-block;
			width:40px;
			height:14px;
			padding:7px;
			font-size:10px;
			color:#fff;
			border-radius:40px;
			background:rgba(0,0,0,0.2);
			
		}
	}
	
	.banner-wrap{
		position:relative;
		width:100%;
		height:28px;
		line-height:28px; 
		font-size:10px;
		background:rgba(0,0,0,0.2);
		
		.icon{
			display:inline-block;
			width:22px;
			height:12px;
			margin-top:8px;
			margin-left:12px;
			margin-right:4px; 
			vertical-align:top;
			bg-image('bulletin');
			background-size:100%;
			background-repeat:no-repeat;
		}
		.bulletin{
			display:inline-block;
			width:80%;
			overflow: hidden;
			text-overflow:ellipsis;
			white-space: nowrap;
			
		}
		.icon-keyboard_arrow_right{
			position:absolute;
			top:8px;
			right:15px;
		}
		
	}

	/* 可以设置不同的进入和离开动画 */
	/* 设置持续时间和动画函数 */
	.slide-fade-enter-active {
	  transition: all .3s ease;
	}
	.slide-fade-leave-active {
	  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
	}
	.slide-fade-enter, .slide-fade-leave-active {
	  transform: translateX(10px);
	  opacity: 0;
	}
			
	.detail-wrap{
		position:fixed;
		top:0;
		left:0;
		width:100%;
		height:100%;
		z-index:100;
		overflow:auto;
		background:rgba(7,17,27,0.8);
		
		.detail-main{
			width:100%;
			min-height:100%;
			
			.detail-content{
				margin-top:64px;
				padding-bottom:64px;
				
				.name{
					font-size:16px;
					font-weight:700px;
					line-height:16px;
					text-align:center;
					
				}
				.star-wrap{
					text-align:center;
					margin-top:16px;
				}
				.title{
					display:flex;
					width:80%;
					margin:24px auto;
					
					.line{
						flex:1;
						position:relative;
						border-bottom:1px solid rgba(225,225,225,0.2);
						top:-6px;
					}
					.text{
						flex:1;
						font-size:14px;
						text-align:center;
						font-weight:700;
					}
				}
				.supports{
					width:80%;
					margin:0 auto;
					
					.support-item{
						font-size:12px;
						line-height:16px;
						padding:0 12px;
						margin-bottom:12px;
						
						&:last-child{
							margin-bottom:0;
						}
						.icon{
							display:inline-block;
							width:16px;
							height:16px;
							background-size:16px 16px;
							vertical-align:top;
							margin-right:6px;
							
							&.decrease{
								bg-image("decrease_1");
							}
							&.discount{
								bg-image("discount_1");
							}
							&.gurantee{
								bg-image("guarantee_1");
							}
							&.invoice{
								bg-image("invoice_1");
							}
							&.special{
								bg-image("special_1");
							}
						}
					}
				}
				.bulletin{
					width:80%;
					margin:0 auto;
					padding:0 12px;
					font-size:12px;
					line-height:24px;
				}
			}
		}
		
		.detail-close{
			position:relative;
			width:32px;
			height:32px;
			margin:-64px auto 0 auto;
			clear:both;
			font-size:32px;
		}
		
	}
	
	
}

</style>
