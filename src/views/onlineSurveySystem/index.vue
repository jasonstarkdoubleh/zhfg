<template>
  <div>

  </div>
</template>

<script>
    import { goPublic } from '@/api/user'
    export default {
        created() {
            goPublic('http://10.1.0.139:8088/fagaiwei').then(res => {
                window.open(res.url,'_blank')
            }).catch(error => {
                console.log(123)
            })
        }
    }
</script>

<style scoped>

</style>
