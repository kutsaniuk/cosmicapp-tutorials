<template>
    <div id="main">
        <div class="inner">
            <header>
                <h1>@{{username}}</h1>
            </header>
            <section class="tiles">
                <article v-bind:class="'style' + (index + 1)" v-for="(article, index) in articles">
                            <span class="image">
                                <img v-if="article.metadata" :src="article.metadata.image.url" alt=""/>
                            </span>
                    <nuxt-link v-if="$store.state.authUser" v-bind:to="'/edit/' + article.slug" class="logo">
                        <h2>{{article.title}}</h2>
                        <div class="content" v-html="article.content"></div>
                    </nuxt-link>
                    <nuxt-link v-if="!$store.state.authUser" v-bind:to="'/articles/' + article.slug" class="logo">
                        <h2>{{article.title}}</h2>
                        <div class="content" v-html="article.content"></div>
                    </nuxt-link>
                </article>
            </section>
            <br>
            <br>
            <section v-if="$store.state.authUser">
                <nuxt-link v-if="$store.state.authUser.user[0].value === username" class="button" to="/add">Add tutorial</nuxt-link>
            </section>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        asyncData ({ params }) {
            return axios.get(`https://api.cosmicjs.com/v1/tutorials/object-type/articles/search`, {
                        params: {
                            read_key: process.env.readKey,
                            metafield_key: 'user',
                            metafield_object_slug: params.id
                        }
                    })
                            .then((res) => {
                        return {
                            articles: res.data.objects,
                            username: params.id
                        }
                    })
        },
        head () {
            return {
                title: 'Profile'
            }
        }
    }
</script>