<template>
  <div :class="{'has-logo':showLogo}">
    <logo v-if="showLogo" :collapse="isCollapse" class="bgimg"/>
    <div style="height: 40px;background: #17265a">
      <el-button class="backhome" style="border: 0;color: #ffffff;width: 57px;height: 37px;margin-left: 10px" @click="backHome">
        <span style="margin-left: 15px">返 回</span>
      </el-button>
    </div>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'

export default {
    components: { SidebarItem, Logo },
    computed: {
    ...mapGetters([
      'sidebar'
    ]),
    routes() {
        return this.$router.options.routes
    },
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  },
    methods: {
        backHome() {
            this.$router.push('/')
        }
    }
}
</script>

<style scoped>
  .bgimg {
    background: #12172b;
    /*background-image: url("../../../assets/img/bcg.png");*/
  }
  .backhome {
    background-color: #17265a;
    background-image: url("../../../assets/img/back.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
</style>
