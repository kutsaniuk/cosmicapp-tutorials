import axios from 'axios';
var sha1 = require('sha1');

export const state = () => ({
    authUser: null
})

export const mutations = {
    SET_USER: function (state, user) {
        state.authUser = user
    }
}

export const actions = {
    // nuxtServerInit is called by Nuxt.js before server-rendering every page
    nuxtServerInit ({ commit }, { req }) {
        if (req.session && req.session.authUser) {
            commit('SET_USER', req.session.authUser)
        }
    },
    async login ({ commit }, { username, password }) {
        axios.get('https://api.cosmicjs.com/v1/' + process.env.bucketSlug + '/object-type/users/search', {
                params: {
                    metafield_key: 'username',
                    metafield_value_has: username,
                    limit: 1,
                    read_key: process.env.readKey
                }
            })
            .then(function (response) {
                if (response.data.status !== 'empty') {
                    axios.get('https://api.cosmicjs.com/v1/' + process.env.bucketSlug + '/object-type/users/search', {
                            params: {
                                metafield_key: 'password',
                                metafield_value: sha1(password),
                                limit: 1,
                                read_key: process.env.readKey
                            }
                        })
                        .then(function (response) {
                            if (response.data.status !== 'empty') {
                                axios.post('/api/saveSession', response.data.objects[0])
                                    .then(function (response) {
                                        commit('SET_USER', response.data);
                                        window.location.href = '/profile/' + username;
                                });
                            }
                        })

                }
            })
    },
    async register ({ commit }, { username, password }) {
        axios.post('https://api.cosmicjs.com/v1/' + process.env.bucketSlug + '/add-object', {
                write_key: process.env.writeKey,

                title: username,
                type_slug: 'users',
                slug: username,
                metafields: [
                    {
                        key: "username",
                        type: "text",
                        value: username
                    },
                    {
                        key: "password",
                        type: "text",
                        value: sha1(password)
                    }
                ]
            })
            .then(function (response) {
                axios.post('/api/saveSession', response.data.object)
                    .then(function (response) {
                        commit('SET_USER', response.data);
                        window.location.href = '/profile/' + username;
                    });
            });

    },
    async logout ({ commit }) {
        await axios.post('/api/logout')
        window.location.href = '/login';
        commit('SET_USER', null)
    }

}