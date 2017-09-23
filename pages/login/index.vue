<template>
    <div id="main">
        <div class="inner">
            <form @submit.prevent="login">
                <p class="error" v-if="formError">{{ formError }}</p>
                <p>Username: <input type="text" v-model="formUsername" name="username" /></p>
                <p>Password: <input type="password" v-model="formPassword" name="password" /></p>
                <button type="submit">Login</button>
            </form>
            <p>Don't have an account? <nuxt-link to="/register">Register</nuxt-link></p>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                formError: null,
                formUsername: '',
                formPassword: ''
            }
        },
        methods: {
            async login () {
                try {
                    await this.$store.dispatch('login', {
                        username: this.formUsername,
                        password: this.formPassword
                    })
                    this.formUsername = ''
                    this.formPassword = ''
                    this.formError = null
                } catch(e) {
                    this.formError = e.message
                }
            }
        },
        head () {
            return {
                title: 'Login'
            }
        }
    }
</script>