<template>
    <div id="main">
        <div class="inner">
            <h1>{{article.title}}
                <nuxt-link v-bind:to="'/profile/' + article.metadata.user.metadata.username">
                    @{{article.metadata.user.metadata.username}}
                </nuxt-link>
                <span v-if="$store.state.authUser">
                    <nuxt-link v-if="$store.state.authUser.user[0].value === article.metadata.user.metadata.username" class="pull-right" v-bind:to="'/edit/' + article.slug"><i class="fa fa-pencil"></i></nuxt-link>
                </span>
            </h1>

            <span class="image main" v-if="article.metadata"><img :src="article.metadata.image.url"></span>
            <div v-html="article.content"></div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {

        asyncData ({ params }) {
            return axios.get(`https://api.cosmicjs.com/v1/tutorials/object/${params.id}?read_key=${process.env.readKey}`)
                            .then((res) => {
                        return { article: res.data.object }
                    })
        },
        head () {
            return {
                title: this.article.title
            }
        }
    }
</script>