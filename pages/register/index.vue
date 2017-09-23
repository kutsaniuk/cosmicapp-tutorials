<template>
    <div id="main">
        <div class="inner">
            <form @submit.prevent="register">
                <p class="error" v-if="formError">{{ formError }}</p>
                <p>Username: <input type="text" v-model="formUsername" name="username" /></p>
                <p>Password: <input type="password" v-model="formPassword" name="password" /></p>
                <button type="submit">Register</button>
            </form>
            <p>Have an account? <nuxt-link to="/Login">Login</nuxt-link></p>
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
            async register () {
                await this.$store.dispatch('register', {
                    username: this.formUsername,
                    password: this.formPassword
                })
                this.formUsername = ''
                this.formPassword = ''
                this.formError = null
            }
        },
        head () {
            return {
                title: 'Register'
            }
        }
    }
</script>