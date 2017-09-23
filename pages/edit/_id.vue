
<template>
    <div id="main">
        <div class="inner">

            <form enctype="multipart/form-data" novalidate>
                <h1>{{article.title}}</h1>
                <div class="file-upload">
                    <button type="button">Browse Image</button>
                    <input type="file"
                           :name="image"
                           @change="filesChange($event.target.name, $event.target.files)"
                           accept="image/*" class="file-upload__input">
                </div>
            </form>
            <span class="image main" v-if="previewImage"><img :src="previewImage"></span>
            <h1><input type="text"
                       name="title"
                       id="title"
                       value=""
                       placeholder="Title"
                       v-model="article.title"></h1>
            <div class="textarea-wrapper">
                <textarea name="demo-message"
                          id="demo-message"
                          placeholder="Enter article"
                          v-model="article.content"
                          rows="10"></textarea>
            </div>
            <br>
            <div>
                <h2>{{progress}}%</h2>
            </div>
            <ul class="actions">
                <li>
                    <button href="#" v-if="image" class="button special" @click="upload(image, article)">Save</button>
                    <button href="#" v-if="!image" class="button special" @click="save(article)">Save</button>
                </li>
                <li>
                    <nuxt-link to="/" class="button">Cancel</nuxt-link>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    import axios from 'axios';

    export default {
        middleware: 'auth',
        data () {
            return {
                image: null,
                previewImage: null,
                progress: 0,
                article: {
                    title: 'Loading...',
                }
            }
        },
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
        },
        methods: {
            save: save,
            upload: upload,
            filesChange: function (name, files) {
                this.image = files[0];
                var that = this;

                var reader = new FileReader();

                reader.onload = function (evt) {
//                    this.apply(function($scope){
                    that.previewImage = evt.target.result;
//                    });
                };

                reader.readAsDataURL(this.image);
            }
        }
    }

    function save (article) {
        article.write_key = process.env.writeKey;

        return axios.put(`https://api.cosmicjs.com/v1/tutorials/edit-object`, article)
                        .then((res) => {
                    window.location.href = '/articles/' + article.slug;
        })
    }

    function upload (file, article) {
        var fd = new FormData();
        fd.append('media', file);
        fd.append('write_key', process.env.writeKey);

        var xhttp = new XMLHttpRequest();
        var that = this;

        xhttp.upload.addEventListener("progress",function (e) {
            that.progress = parseInt(e.loaded * 100 / e.total);
        });
        xhttp.upload.addEventListener("error",function (e) {
        });

        xhttp.onreadystatechange = function() {
            if (xhttp.readyState === 4) {
                var response = JSON.parse(xhttp.response); //Outputs a DOMString by default

                article.metafields[0] = {
                    key: 'image',
                    type: 'file',
                    value: response.media.name
                };

                save(article);
            }
        };

        xhttp.open("post", `https://api.cosmicjs.com/v1/tutorials/media`, true);

        xhttp.send(fd);

        return true;
    }
</script>