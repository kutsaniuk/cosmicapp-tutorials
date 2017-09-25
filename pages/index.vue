<template>
    <div id="main">
        <div class="inner">
            <header>
                <h1>You are browsing the best resource <br>
                    for Online Education.</h1>
                <p>Just clear crisp and to the point content, nothing else.</p>
            </header>
            <section class="tiles">
                <article v-bind:class="'style' + (index + 1)" v-for="(article, index) in articles">
                            <span class="image">
                                <img v-if="article.metadata" :src="article.metadata.image.url" alt=""/>
                            </span>
                    <nuxt-link v-bind:to="'/articles/' + article.slug" class="logo">
                        <h2>{{article.title}}</h2>
                        <div class="content" v-html="article.content"></div>
                    </nuxt-link>
                </article>
            </section>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {

        asyncData () {
            return axios.get(`https://api.cosmicjs.com/v1/tutorials/object-type/articles?read_key=${process.env.readKey}`)
                            .then((res) => {
                        return { articles: res.data.objects }
                    })
        },
        head () {
            return {
                title: 'Tutorials'
            }
        }
    }
</script>