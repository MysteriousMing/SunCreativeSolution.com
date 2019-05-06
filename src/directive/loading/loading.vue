<template>
  <transition name="el-loading-fade" @after-leave="handleAfterLeave">
    <div
      v-show="visible"
      class="el-loading-mask"
      :style="{ backgroundColor: background || '' }"
      :class="[customClass, { 'is-fullscreen': fullscreen }]">
      <div class="el-loading-spinner">
        <!-- <svg v-if="!spinner" class="circular" viewBox="25 25 50 50">
          <circle class="path" cx="50" cy="50" r="20" fill="none"/>
        </svg> -->
        <!-- <div v-if="!spinner && ramdom==0" class="spinner3">
          <div class="rect1"></div>
          <div class="rect2"></div>
          <div class="rect3"></div>
          <div class="rect4"></div>
          <div class="rect5"></div>
        </div> -->
        <!-- <div v-if="!spinner && ramdom==2" class="spinner6">
          <div class="dot1"></div>
          <div class="dot2"></div>
        </div> -->
        <div v-if="!spinner && ramdom==2" class="spinner7">
          <div class="bounce1"></div>
          <div class="bounce2"></div>
          <div class="bounce3"></div>
        </div>
        <div v-if="!spinner && ramdom<=1" class="logo-spinner">
          <logo topBg="black" bottomBg="black" class="logo logo-loading"></logo>
        </div>
        <i v-if="spinner" :class="spinner"></i>
        <p v-if="text" class="el-loading-text" style="margin-top: 0.6rem; color: #333;">{{ text }}</p>
      </div>
    </div>
  </transition>
</template>

<script>
  import logo from '@/components/logo'
  export default {
    components: {
      logo
    },
    data () {
      return {
        text: null,
        spinner: null,
        background: null,
        fullscreen: false,
        visible: false,
        customClass: '',
        ramdom: Math.floor(Math.random() * 3)
      }
    },

    methods: {
      handleAfterLeave () {
        this.$emit('after-leave')
      },
      setText (text) {
        this.text = text
      }
    }
  }
</script>

<style>
.spinner3 {
  margin: 0 auto;
  width: 50px;
  height: 40px;
  text-align: center;
  font-size: 10px;
}

.spinner3 > div {
  background-color: #333;
  height: 100%;
  width: 6px;
  display: inline-block;
  
  -webkit-animation: sk-stretchdelay 1.2s infinite ease-in-out;
  animation: sk-stretchdelay 1.2s infinite ease-in-out;
}

.spinner3 .rect2 {
  -webkit-animation-delay: -1.1s;
  animation-delay: -1.1s;
}

.spinner3 .rect3 {
  -webkit-animation-delay: -1.0s;
  animation-delay: -1.0s;
}

.spinner3 .rect4 {
  -webkit-animation-delay: -0.9s;
  animation-delay: -0.9s;
}

.spinner3 .rect5 {
  -webkit-animation-delay: -0.8s;
  animation-delay: -0.8s;
}

@-webkit-keyframes sk-stretchdelay {
  0%, 40%, 100% { -webkit-transform: scaleY(0.4) }  
  20% { -webkit-transform: scaleY(1.0) }
}

@keyframes sk-stretchdelay {
  0%, 40%, 100% { 
    transform: scaleY(0.4);
    -webkit-transform: scaleY(0.4);
  }  20% { 
    transform: scaleY(1.0);
    -webkit-transform: scaleY(1.0);
  }
}

.spinner6 {
  margin: 0 auto;
  width: 40px;
  height: 40px;
  position: relative;
  text-align: center;
  
  -webkit-animation: sk-rotate 2.0s infinite linear;
  animation: sk-rotate 2.0s infinite linear;
}

.dot1, .dot2 {
  width: 60%;
  height: 60%;
  display: inline-block;
  position: absolute;
  top: 0;
  background-color: #333;
  border-radius: 100%;
  
  -webkit-animation: sk-bounce 2.0s infinite ease-in-out;
  animation: sk-bounce 2.0s infinite ease-in-out;
}

.dot2 {
  top: auto;
  bottom: 0;
  -webkit-animation-delay: -1.0s;
  animation-delay: -1.0s;
}

@-webkit-keyframes sk-rotate { 100% { -webkit-transform: rotate(360deg) }}
@keyframes sk-rotate { 100% { transform: rotate(360deg); -webkit-transform: rotate(360deg) }}

@-webkit-keyframes sk-bounce {
  0%, 100% { -webkit-transform: scale(0.0) }
  50% { -webkit-transform: scale(1.0) }
}

@keyframes sk-bounce {
  0%, 100% { 
    transform: scale(0.0);
    -webkit-transform: scale(0.0);
  } 50% { 
    transform: scale(1.0);
    -webkit-transform: scale(1.0);
  }
}

.spinner7 {
  margin: 0 auto 0;
  width: 70px;
  text-align: center;
}

.spinner7 > div {
  width: 18px;
  height: 18px;
  background-color: #333;

  border-radius: 100%;
  display: inline-block;
  -webkit-animation: sk-bouncedelay 1.4s infinite ease-in-out both;
  animation: sk-bouncedelay 1.4s infinite ease-in-out both;
}

.spinner7 .bounce1 {
  -webkit-animation-delay: -0.32s;
  animation-delay: -0.32s;
}

.spinner7 .bounce2 {
  -webkit-animation-delay: -0.16s;
  animation-delay: -0.16s;
}

@-webkit-keyframes sk-bouncedelay {
  0%, 80%, 100% { -webkit-transform: scale(0) }
  40% { -webkit-transform: scale(1.0) }
}

@keyframes sk-bouncedelay {
  0%, 80%, 100% { 
    -webkit-transform: scale(0);
    transform: scale(0);
  } 40% { 
    -webkit-transform: scale(1.0);
    transform: scale(1.0);
  }
}
@keyframes logo-bouncedelay {
  0%, 100% {
    background: white;
  } 40%, 60% { 
    background: black;
    opacity: 1;
  }
}

.logo-spinner {
  margin: 0 auto 0;
  width: 90px;
  transform: scale(0.7)
}
.logo-spinner .logo {
  width: 90px;
  height: 90px;
}
.logo-spinner .logo {
  width: 90px;
  height: 90px;
}
.logo-spinner .logo .stella-upper-item {
  background: white;
  -webkit-animation: logo-bouncedelay 3.6s infinite ease-in-out both;
  animation: logo-bouncedelay 3.6s infinite ease-in-out both;
}
.logo-spinner .logo .stella-item {
  background: black;
  -webkit-animation: logo-bouncedelay 1.8s infinite ease-in-out both;
  animation: logo-bouncedelay 1.8s infinite ease-in-out both;
}

.logo-spinner .logo .stella-item:nth-child(3) {
  -webkit-animation-delay: -0.2s;
  animation-delay: -0.2s;
}

.logo-spinner .logo .stella-item:nth-child(4) {
  -webkit-animation-delay: -0.4s;
  animation-delay: -0.4s;
}


.logo-spinner .logo .stella-item:nth-child(2) {
  -webkit-animation-delay: -0.6s;
  animation-delay: -0.6s;
}

.logo-spinner .logo .stella-item:nth-child(1) {
  -webkit-animation-delay: -0.8s;
  animation-delay: -0.8s;
}

.logo-spinner .logo .stella-upper-item.stella-left-top,
.logo-spinner .logo .stella-upper-item.stella-right-top {
  -webkit-animation-delay: -1.8s;
  animation-delay: -1.8s;
}
</style>

