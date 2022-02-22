<template>
  <div class="home">
    <div class="navigation w-nav">
      <div class="w-container">
        <a class="brand-link w-nav-brand">
          <div class="logo-text">老鹅</div>
        </a>
        <nav class="nav-menu w-nav-menu">
          <a class="nav-link w-nav-link" @click="gotologin">登录</a>
        </nav>
        <div class="nav-link menu w-nav-button">
          <div class="w-icon-nav-menu"></div>
        </div>
      </div>
    </div>
    <div id="top" class="section main wf-section">
      <div class="w-container">
        <div class="w-row">
          <div class="w-col w-col-6">
            <h1 class="main-heading">简约的作业上传与反馈</h1>
            <p class="main-subtitle">
              非常简约的作业上传工具，具有针对每个作业提供反馈的功能，教师端可查看反馈详情，并给作业打分。<br />反馈的问题可以是带有选项的选择题，也可以是自由编写的长文本。
            </p>
            <a @click="gotologin" class="button">登录</a
            ><a href="#features" class="button hollow">查看更多</a>
          </div>
          <div class="w-col w-col-6">
            <img
              src="~@/assets/img/xueshenghoutai.png"
              alt=""
              class="main-image"
            />
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="section press wf-section">
      <div class="w-container">
        <div class="small-text">网站技术栈</div>
        <div class="div-block">
          <h2 width="70" class="logo">Vue.js</h2>
          <h2>node.js</h2>
          <h2>element</h2>
          <img
            src="https://uploads-ssl.webflow.com/620c5d1aa60d8c2723d7cbe4/620c5d1aa60d8cddf2d7cbfd_logo_Forbes.svg"
            width="70"
            alt=""
            class="logo"
          /><img
            src="https://uploads-ssl.webflow.com/620c5d1aa60d8c2723d7cbe4/620c5d1aa60d8cf7a1d7cbf7_logo_techcrunch.svg"
            width="70"
            alt=""
            class="logo"
          /><img
            src="https://uploads-ssl.webflow.com/620c5d1aa60d8c2723d7cbe4/620c5d1aa60d8c4e58d7cc1a_logo_Wired.svg"
            width="70"
            alt=""
            class="logo"
          /><img
            src="https://uploads-ssl.webflow.com/620c5d1aa60d8c2723d7cbe4/620c5d1aa60d8c8071d7cbf4_logo_zdnet.svg"
            width="70"
            alt=""
            class="logo"
          />
        </div>
      </div>
    </div> -->
    <div id="features" class="section wf-section">
      <div class="w-container">
        <h2>作业上传</h2>
        <div class="section-subtitle">
          使用七牛云对象存储进行上传下载和储存，速度更快也更稳定。
        </div>
        <div class="feature-row w-row">
          <div class="w-col w-col-6">
            <img src="~@/assets/img/shangchuan.png" alt="" />
          </div>
          <div class="w-col w-col-6">
            <div class="main-feature-group">
              <!-- <img
                src="https://uploads-ssl.webflow.com/620c5d1aa60d8c2723d7cbe4/620c5d1aa60d8cc60ad7cc1b_iconmonstr-laptop-2-icon.svg"
                height="30"
                alt=""
                class="feature-icon"
              /> -->
              <h3>作业上传链接</h3>
              <p>每个作业都有专门的链接进行分发，学生获得链接即可上传作业。</p>
            </div>
          </div>
        </div>
        <div class="feature-row w-row">
          <div class="w-col w-col-6">
            <div class="main-feature-group">
              <!-- <img
                src="https://uploads-ssl.webflow.com/620c5d1aa60d8c2723d7cbe4/620c5d1aa60d8c5a06d7cc02_iconmonstr-download-13-icon.svg"
                height="30"
                alt=""
                class="feature-icon"
              /> -->
              <h3>填写反馈信息</h3>
              <p>每次作业均有相应反馈信息需要填写，保证学习效果被教师掌握。</p>
            </div>
          </div>
          <div class="w-col w-col-6">
            <img src="~@/assets/img/fankui.png" alt="" />
          </div>
        </div>
        <!-- <div class="small-features-row w-row">
          <div class="w-col w-col-3">
            <div class="feature">
              <img
                src="~@/assets/img/1.svg"
                height="30"
                alt=""
                class="feature-icon"
              />
              <h3>Dashboard</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse varius enim in eros elementum tristique.
              </p>
            </div>
          </div>
          <div class="w-col w-col-3">
            <div class="feature">
              <img
                src="~@/assets/img/2.svg"
                height="30"
                alt=""
                class="feature-icon"
              />
              <h3>Custom Rules</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse varius enim in eros elementum tristique.
              </p>
            </div>
          </div>
          <div class="w-col w-col-3">
            <div class="feature">
              <img
                src="~@/assets/img/3.svg"
                height="30"
                alt=""
                class="feature-icon"
              />
              <h3>Presets</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse varius enim in eros elementum tristique.
              </p>
            </div>
          </div>
          <div class="w-col w-col-3">
            <div class="feature">
              <img
                src="~@/assets/img/4.svg"
                height="30"
                alt=""
                class="feature-icon"
              />
              <h3>Metrics</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse varius enim in eros elementum tristique.
              </p>
            </div>
          </div>
        </div> -->
      </div>
    </div>
    <div id="customers" class="section wf-section">
      <div class="w-container">
        <h2>关于这个网站</h2>
        <div>
          <div class="w-slider-mask">
            <div class="testimony-slide w-slide">
              <p class="testimony-text">边学习边建站,能学到很多。</p>
              <img
                src="~@/assets/img/touxiang.jpg"
                width="64"
                height="64"
                alt=""
                class="person"
              />
              <div class="name">lao lin</div>
              <div class="title">new Dady</div>
            </div>
          </div>
          <div class="slider-arrow w-slider-arrow-left"></div>
          <div class="slider-arrow w-slider-arrow-right"></div>
          <div class="slide-nav w-slider-nav w-round"></div>
        </div>
      </div>
    </div>
    <div class="section footer copyright wf-section">
      <div class="w-container">
        <div class="text-block">
          <myfooter />
        </div>
      </div>
    </div>
  </div>
  <!-- <router-link to="/login">登录</router-link> -->
</template>

<script>
import '../assets/css/homeindex.css'
import myfooter from '../components/myfooter.vue'
export default {
  components: { myfooter },
  name: 'home',
  data() {
    return {
      url: '/assets/img1.jpg',
      fits: 'fill',
    }
  },
  methods: {
    gotologin() {
      this.$router.push('/login')
    },
  },
}
</script>


<style scoped>
.section.main {
  background-image: url('~@/assets/img/bannerbeijing.png');
}
</style>