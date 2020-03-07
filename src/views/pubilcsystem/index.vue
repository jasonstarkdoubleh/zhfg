<template>
    <div style="font-size: 24px">
      已成功打开舆情子系统
    </div>
</template>

<script>
  import { goPublic } from '@/api/user'
    export default {
        created() {
            goPublic('https://sp.ndrc.gov.cn:8087/scyuqing').then(res => {
                window.open(res.url,'_blank')
            })
        }
    }
</script>

<style scoped>

</style>
