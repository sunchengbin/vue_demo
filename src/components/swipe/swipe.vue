<template>
  <div class="banner">
    <swiper :options="swiperOption">
      <swiper-slide v-for="(slide,index) in swiperSlides"
                    :key="index">
        <p @click.stop="jump(slide.route)"
           class="img-box"
           v-if="slide.pic.length>0">
          <img :src="slide.classdetailbigimage.replace(/http:|https:/g, '')">
        </p>
      </swiper-slide>
      <div class="swiper-pagination"
           slot="pagination"></div>
    </swiper>
  </div>

</template>

<script>
import swiperSlides from './static'
export default {
  name: 'swipe',
  data () {
    return {
      swiperOption: {
        autoplay: true,
        speed: 1000,
        loop: true,
        pagination: {
          el: '.swiper-pagination',
          bulletElement: 'li',
          clickable: true
        }
      },
      swiperSlides: swiperSlides
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../css/swiper.min.css';
.banner {
  position: relative;
  width: 100%;
  @include px2rem(height, 130);
  transform: translateY(12px);
  @include px2rem(border-radius, 6);
  background-size: cover;
  .swiper-container {
    overflow: hidden;
    .swiper-slide {
      display: inline-block;
      border-radius: 6px;
      @include px2rem(padding, 8);
      .img-box {
        @include px2rem(width, 650);
        @include px2rem(height, 260);
        @include px2rem(border-radius, 12);
      }
      img {
        width: 100%;
        @include px2rem(border-radius, 12);
      }
    }
    .swiper-pagination {
      position: absolute;
      @include px2rem(top, 220);
      left: 50%;
      transform: translateX(-50%);
      margin: 0 auto;
    }

    &:after {
      padding: 0;
    }
  }

  .swiper-pagination-bullet-active {
    @include px2rem(border-radius, 5);
  }

  .swiper-pagination-bullet {
    display: inline-block;
    @include px2rem(width, 10);
    @include px2rem(height, 10);
    background: #a3a3a3;
    @include px2rem(margin-left, 6);
    @include px2rem(border-radius, 5);
  }
}
</style>
