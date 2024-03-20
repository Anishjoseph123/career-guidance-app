import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    emailID: "",
    currentUserDetails: {},
  },
  getters: {
    get_user_mail(state) {
      return state.emailID;
    },
    get_current_user_details: (state) => {
      return state.currentUserDetails;
    },
  },
  mutations: {
    SET_USER_EMAIL(state, email) {
      state.emailID = email;
    },
    SET_CURRENT_USER_DETAILS(state, details) {
      state.currentUserDetails = details;
    },
  },
  actions: {},
  modules: {},
});
