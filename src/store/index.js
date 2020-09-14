import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

function joinUsersToPosts(state, posts, commit) {
  const temporaryPostsWithUsers = [];
  state.users.forEach(user => {
    for (let i = 0; i < posts.length; i++) {
      if (user.id === posts[i].userId) {
        posts[i].username = user.username;
        temporaryPostsWithUsers.push(posts[i]);
      }  
    }
  });
  
  commit('addPostFromApi', temporaryPostsWithUsers);
}
const apiUrl = 'https://jsonplaceholder.typicode.com/';

export default new Vuex.Store({
  state: {
    totalCntPosts: 0,
    switcher: [10, 25, 50],
    selectedSwitcher: 10,
    page: 1,
    posts: [],
    users: [],
    isActiveNext: true,
    isActivePrev: false
  },
  mutations: {
    addPostFromApi(state, posts) {
      state.posts = posts;
    },
    addUsersFromApi(state, users) {
      state.users = users;
    },
    changeSelectedSwitcher(state, value) {
      state.selectedSwitcher = value;
    },
    returnDefaultValue(state, obj) {
      state.page = 1;
      state.isActiveNext = true;
      state.isActivePrev = false;
    },
    addPostsCount(state, value) {
      state.totalCntPosts = value;
    },
    changeContentSize({ state }, newValue) {
      state.selectedSwitcher = newValue;
    },
    incrementPage(state, value) {
      state.page += value;
      let totalPages = Math.ceil(state.totalCntPosts / state.selectedSwitcher);
      if (totalPages >= state.page) {
        state.isActivePrev = true;
      }
      if (state.page === totalPages) {
        state.isActiveNext = false;
      }
    },
    decrementPage(state, value) {
      state.page -= value;
      let totalPages = Math.ceil(state.totalCntPosts / state.selectedSwitcher);
      if (state.page === 1) {
        state.isActivePrev = false;
      }
      if (state.page < totalPages) {
        state.isActiveNext = true;
      }
    },
    disableNextLink(state, value) {
      state.isActiveNext = value;
    },
    disablePrevLink(state, value) {
      state.isActivePrev = value;
    }
  },
  actions: {
    init({ dispatch, state, commit }) {
      dispatch('getFetchUsers')
      .then(result => {
        return result.json();
      }).then(users => {
        commit('addUsersFromApi', users);
        return dispatch('getFetchPosts');
      }).then(result => {
        return result.json();
      }).then(posts => {
        joinUsersToPosts(state, posts, commit);
      });
    },
    getFetchUsers() {
      return fetch(`${apiUrl}users`);
    },
    getFetchPosts({ state }) {
      return fetch(`${apiUrl}posts?_page=${state.page}&_limit=${state.selectedSwitcher}`);
    },
    updateSizePostsPerPage({ state, commit }) {
      fetch(`${apiUrl}posts?_page=${state.page}&_limit=${state.selectedSwitcher}`)
      .then(result => {
        return result.json();
      }).then(posts => {
        commit('addPostFromApi', posts);
      });
    },
    getNextPage({ state, commit }) {
      if (Math.ceil(state.totalCntPosts / state.selectedSwitcher) > state.page) {
        fetch(`${apiUrl}posts?_page=${state.page}&_limit=${state.selectedSwitcher}`)
        .then(result => {
          return result.json();
        }).then(posts => {
          if(!!posts.length) {
            joinUsersToPosts(state, posts, commit);
          }
        });

        commit('incrementPage', 1);
      }
    },
    getPrevPage({ state, commit }) {
      if (state.page > 1) {
        fetch(`${apiUrl}posts?_page=${state.page}&_limit=${state.selectedSwitcher}`)
        .then(result => {
          return result.json();
        }).then(posts => {
          if(!!posts.length) {
            joinUsersToPosts(state, posts, commit);
          }
        });

        commit('decrementPage', 1);
      }
    },
    getAllCountPosts({ state, commit }) {
      fetch(`${apiUrl}posts?_start=0&_end=1`)
      .then(result => {
        commit('addPostsCount', result.headers.get('X-Total-Count'));
      });
    }
  },
  modules: {
    // Мы можем разделить глобальные данные на отдельные модули по мере роста приложения
    // что бы было удобнее поддерживать и добавить новый функционал
  }
})
