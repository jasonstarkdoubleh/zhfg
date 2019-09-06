<template>

    <section class="app-main" style="background: #f2f2f6;">
      <!--    <div style="height: 56px;background: rgb(48, 65, 86);">-->
      <!--      <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />-->
      <!--      <breadcrumb class="breadcrumb-container" />-->
      <!--    </div>-->
      <transition name="fade-transform" mode="out-in">
        <router-view :key="key" />
      </transition>
    </section>

</template>

<script>
import {
  mapGetters
} from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
export default {
  name: 'AppMain',
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    key() {
      return this.$route.path
    }
  },
  components: {
    Breadcrumb,
    Hamburger
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    }
  }
}
</script>

<style lang="scss" scoped>
	.app-main {
		/*50 = navbar  */
		min-height: 100vh;
		min-width: 1400px;
		width: 100%;
		position: relative;
		overflow: auto;

		.hamburger-container {
			line-height: 46px;
			height: 100%;
			float: left;
			cursor: pointer;
			transition: background .3s;
			-webkit-tap-highlight-color: transparent;

			&:hover {
				background: rgba(0, 0, 0, .025)
			}
		}

		.breadcrumb-container {
			float: left;
		}
	}

	.fixed-header+.app-main {
		padding: 80px 24px 24px;
	}
</style>

<style lang="scss">
	// fix css style bug in open el-dialog
	.el-popup-parent--hidden {
		.fixed-header {
			padding-right: 15px;
		}
	}
</style>
