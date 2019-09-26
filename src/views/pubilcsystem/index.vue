<template>
    <div>

    </div>
</template>

<script>
  import { goPublic } from '@/api/user'
    export default {
        created() {
            goPublic('https://www.baidu.com/').then(res => {

                window.open(res.url,'_blank')
            }).catch(error => {
                console.log(123)
            })
        }
    }
</script>

<style scoped>

</style>
