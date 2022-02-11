<template>
  <el-container>
    <el-aside width="200px">
      <SideMenu></SideMenu>
    </el-aside>
    <el-container>
      <el-header>
        <strong>哈哈哈</strong>
        <div class="header-avatar">
          <el-avatar size="medium" :src="userInfo.avatar"></el-avatar>
          <el-dropdown>
            <span class="el-dropdown-link">
             {{ userInfo.username }}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item :underline="false">
                个人中心
              </el-dropdown-item>
              <el-dropdown-item @click="logout">
                退出
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>
      <el-main>
        <Tabs></Tabs>
        <div style="margin: 0 15px;">
          <router-view></router-view>
        </div>
      </el-main>
    </el-container>
  </el-container>

</template>

<script>
//这里为什么不子路由？
import SideMenu from "./inc/SideMenu"
//引入组件
import Tabs from "./inc/Tabs"

export default {
  name: "Home",
  components: {SideMenu, Tabs},
  data() {
    return {
      userInfo: {
        id: "",
        username: "",
        avatar: ""
      }
    }
  },
  methods: {
    getUserInfo() {
      this.$axios.get("/sys/userInfo").then(response => {
        this.userInfo = response.data.data;
      })
    },
    logout() {
      this.$axios.post("/logout").then(response => {
        localStorage.clear();
        sessionStorage.clear();
        this.$store.commit("resetState")
        this.$router.push("/login")
      })
    }
  },
  created() {
    this.getUserInfo()
  }
}
</script>

<style scoped>
.el-container {
  padding: 0;
  margin: 0;
  height: 100%;
}

.header-avatar {
  float: right;
  width: 210px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.el-dropdown-link {
  cursor: pointer;
}

.el-header {
  background-color: #17B3A3;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #D3DCE6;
  color: #333;
  line-height: 200px;
}

.el-main {
  color: #333;
  padding: 0;
}

a {
  text-decoration: none;
}
</style>