<template>
  <div>
    <div class="navbar">
      <!--      &lt;!&ndash; <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />-->
      <!--      <breadcrumb class="breadcrumb-container" />-->

      <div style="width: 70px"></div>

      <div style="color: #ffffff;font-size: 25px;font-weight: bolder;display: flex;align-items: center" @click="toggleSideBar">
        <img style="width: 30px;height: 30px;margin-right: 2px;margin-top: 2px" src="../../assets/img/LOGO.svg" alt="智慧发改•价格大数据应用系统">
        <span style="margin-left: 2px;color: #79f3ea">智慧发改•价格大数据应用系统</span>
      </div>

      <div class="right-menu">
        <el-dropdown class="avatar-container" trigger="click">
          <div class="avatar-wrapper">
            <img :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar">
            <i class="el-icon-caret-bottom" style="color: #ffffff" />
          </div>
          <el-dropdown-menu slot="dropdown" class="user-dropdown">
            <el-dropdown-item>
              <span style="display:block;" @click="logout">退 出</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>

  </div>

</template>

<script>
  import { mapGetters } from 'vuex'
  // import Breadcrumb from '@/components/Breadcrumb'
  // import Hamburger from '@/components/Hamburger'

  export default {
    components: {
      // Breadcrumb,
      // Hamburger
    },
    computed: {
      ...mapGetters([
        'sidebar',
        'avatar'
      ])
    },
    methods: {
      toggleSideBar() {
        this.$store.dispatch('app/toggleSideBar')
      },
      async logout() {
        await this.$store.dispatch('user/logout')
        this.$router.push(`/login?redirect=${this.$route.fullPath}`)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .navbar {
    height: 70px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-image: url("../../assets/img/header.png");
    background-repeat:no-repeat;
    background-size:100% 100%;
    z-index: 999;

    .hamburger-container {
      line-height: 46px;
      height: 100%;
      float: left;
      cursor: pointer;
      transition: background .3s;
      -webkit-tap-highlight-color:transparent;

      &:hover {
        background: rgba(0, 0, 0, .025)
      }
    }

    .breadcrumb-container {

    }

    .right-menu {
      height: 100%;
      line-height: 70px;
      margin-top: -33px;

      &:focus {
        outline: none;
      }

      .right-menu-item {
        display: inline-block;
        padding: 0 8px;
        height: 100%;
        font-size: 18px;
        color: #5a5e66;
        vertical-align: text-bottom;

        &.hover-effect {
          cursor: pointer;
          transition: background .3s;

          &:hover {
            background: rgba(0, 0, 0, .025)
          }
        }
      }

      .avatar-container {
        margin-right: 30px;

        .avatar-wrapper {
          margin-top: 5px;
          position: relative;

          .user-avatar {
            cursor: pointer;
            width: 40px;
            height: 40px;
            border-radius: 10px;
          }

          .el-icon-caret-bottom {
            cursor: pointer;
            position: absolute;
            right: -20px;
            top: 25px;
            font-size: 12px;
          }
        }
      }
    }
  }
</style>
