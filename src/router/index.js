import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login'
import Home from '../views/Home'
import axios from "@/axios";
import store from '../store'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        children: [
            {
                path: '/index',
                name: 'Index',
                meta: {
                    title: "首页"
                },
                component: () => import('../views/Index')
            }
        ],
        component: Home
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    let hasRoute = store.state.menus.hasRoute;
    let token = localStorage.getItem("token");
    if (to.path == '/login') {
        next();
    } else if (!token) {
        next({path: "/login"});
    } else if (to.path == '/' || to.path == '') {
        next({path: 'index'})
    } else if (token && !hasRoute) {
        axios.get("/sys/menu-list", {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        }).then(response => {
            store.commit('setMenuList', response.data.data.menuList);
            store.commit("setPermList", response.data.data.authorityList);
            let newRoutes = router.options.routes;
            response.data.data.menuList.forEach(menu => {
                if (menu.children) {
                    menu.children.forEach(e => {
                        let route = menuToRoute(e);
                        if (route) {
                            newRoutes[0].children.push(route);
                        }
                    })
                }
            })
            router.addRoutes(newRoutes);
            store.commit("changeRouteStatus", true)
        })
    }
    next();
});
const menuToRoute = (menu) => {
    if (!menu.component) {
        return null;
    }
    let route = {
        name: menu.name,
        path: menu.path,
        meta: {
            icon: menu.icon,
            title: menu.title
        }
    }
    route.component = () => import('@/views/' + menu.component + '.vue');
    return route;
}

export default router
