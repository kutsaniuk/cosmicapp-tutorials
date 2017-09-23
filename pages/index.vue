<template>
    <div id="main">
        <div class="inner">
            <header>
                <h1>This is Phantom, a free, fully responsive site<br/>
                    template designed by <a href="http://html5up.net">HTML5 UP</a>.</h1>
                <p>Etiam quis viverra lorem, in semper lorem. Sed nisl arcu euismod sit amet nisi euismod sed cursus
                    arcu elementum ipsum arcu vivamus quis venenatis orci lorem ipsum et magna feugiat veroeros
                    aliquam. Lorem ipsum dolor sit amet nullam dolore.</p>
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