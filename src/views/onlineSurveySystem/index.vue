<template>
  <div style="font-size: 24px">
    已成功打开在线调研子系统
  </div>
</template>

<script>
    import { goPublic } from '@/api/user'
    export default {
        created() {
            goPublic('https://sp.ndrc.gov.cn:8088/fagaiwei').then(res => {
                window.open(res.url,'_blank')
            })
        }
    }
</script>

<style scoped>

</style>
