<template>
  <div :class="{'has-logo':showLogo}">
<!--    <logo v-if="showLogo" :collapse="isCollapse" class="bgimg"/>-->

    <div style="height: 43px;background: #31A5FC">
      <el-button class="backhome" style="border: 0;color: #ffffff;width: 57px;height: 33px;margin-left: 10px;margin-top: 5px" @click="backHome" v-if="!isCollapse">
        <span style="margin-left: 15px">返 回</span>
      </el-button>
      <el-button style="border: 0;background: #31A5FC;color: #ffffff;width: 57px;height: 33px;margin-left: 10px;margin-top: 5px" @click="backHome" v-if="isCollapse">
        <span style="margin-left: -20px">
          <i class="el-icon-back" style="font-size: 20px"></i>
        </span>
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
        return this.$store.getters.routes
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
    background: #54A6FC;
    /*background-image: url("../../../assets/img/bcg.png");*/
  }
  .backhome {
    background-color: #54A6FC;
    background-image: url("../../../assets/img/back.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
</style>
