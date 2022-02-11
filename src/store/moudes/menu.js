import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default {
    state: {
        menuList: [],
        permList: [],
        hasRoute: false
    },
    mutations: {
        setMenuList: (state, menuList) => {
            state.menuList = menuList
        },
        setPermList: (state, permList) => {
            state.permList = permList
        },
        changeRouteStatus: (state, hasRoute) => {
            state.hasRoute = hasRoute
            sessionStorage.setItem("hasRoute", hasRoute)
        }
    }
}
