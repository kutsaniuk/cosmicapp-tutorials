<template>
 <div v-bind:class="{ 'is-menu-visible': isMenuVisible}">
   <div id="wrapper">
     <header id="header">
       <div class="inner">
         <!-- Logo -->
         <nuxt-link to="/" class="logo">
           <span class="symbol"><img src="~/assets/images/logo.svg" alt=""/></span>
           <span class="title">Tutorials</span>
         </nuxt-link>
         <pre v-bind="$store.state.authUser"></pre>

         <!-- Nav -->
         <nav @click="isMenuVisible = true">
           <ul>
             <li><a href="#menu">Menu</a></li>
           </ul>
         </nav>

       </div>
     </header>
     <nuxt/>
     <footer id="footer">
       <div class="inner">
         <ul class="copyright">
           <li><img class="cosmic-logo" src="https://cosmicjs.com/images/logo.svg" width="20" height="20"><a href="https://cosmicjs.com/">Proudly powered by Cosmic JS</a></li><li>Copyright: <i class="fa fa-copyright"></i> Photography Portfolio App 2017</li>
         </ul>
       </div>
     </footer>
   </div>
   <nav id="menu" @click="isMenuVisible = false">
     <div class="inner">
       <h2>Menu</h2>
       <ul>
         <li><nuxt-link to="/">Home</nuxt-link></li>

         <li v-if="!$store.state.authUser"><nuxt-link to="/login">Login</nuxt-link></li>
         <li v-if="!$store.state.authUser"><nuxt-link to="/register">Register</nuxt-link></li>

         <li v-if="$store.state.authUser"><nuxt-link v-bind:to="'/profile/' + $store.state.authUser.user[0].value">Profile</nuxt-link></li>
         <li v-if="$store.state.authUser"><a href="#" @click="logout()">Logout</a></li>
       </ul>
     </div>
     <a class="close" @click="isMenuVisible = false" href="#menu">Close</a>
   </nav>
 </div>

</template>

<script>
  export default {

    data () {
      return {
        isMenuVisible: false
      }
    },
    methods: {
      async logout () {
          await this.$store.dispatch('logout')
      }
    }
  }
</script>

<style src="~/assets/css/main.css"></style>

