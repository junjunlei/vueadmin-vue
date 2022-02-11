import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default {
    state: {
        menuList: [],
        permList: [],
        hasRoute: false,
        editableTabsValue: 'Index',
        editableTabs: [
            {
                title: '首页',
                name: 'Index'
            }
        ],
    },
    mutations: {
        addTabs(state, tab) {
            console.log(tab)
            // 判断是否在栈内
            let index = state.editableTabs.findIndex(item => item.name === tab.name)
            if (index === -1) {
                // 添加到tabs中
                state.editableTabs.push(tab)
            }
            // 当前激活的tab
            state.editableTabsValue = tab.name
        },
        setActiveTab(state, tabName) {
            state.editableTabsValue = tabName
        },
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
