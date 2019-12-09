<template>
  <div>

    <div style="background-color: #ffffff;padding: 10px;margin-top: 10px">
      <div style="font-size: 16px;padding: 3px 0;border-bottom: 1px dashed #eeeeee">
        <span style="margin-left: 10px">民生商品</span>
      </div>
      <div style="display: flex;flex-wrap: wrap">
        <template v-for="item in minsheng">
          <div style="width: 288px;height: 136px;border: 1px solid #eeeeee;padding: 8px 14px;border-radius: 3px;margin: 10px 5px 0">
            <div style="display: flex;justify-content: space-between;align-items: center;padding-bottom: 6px;border-bottom: 1px solid #eeeeee">
              <div style="display:flex;align-items: center">
                <div style="width: 46px;height: 46px;margin-right: 15px">
                  <img :src="require(`../../../../../public/img/${item.name}.png`)" :alt="item.name">
                </div>
                <span :style="{letterSpacing: '5px',fontSize: '16px',color: item.color}">
                  {{ item.name }}
                </span>
              </div>
              <div style="width: 6px;height: 20px">
                <img src="../../../../../public/img/更多.png" alt="">
              </div>
            </div>
            <div style="line-height: 75px;color: #8090b0;letter-spacing: 2px;text-align: center">
              <span v-for="(item, index) in xiangmu" @click="goShow" :key="index" :style="{borderRight: index === 4 ? ' ':'1px dashed #cccccc', margin: '0 5px', cursor:'pointer'}">
                {{ item }}
              </span>
            </div>
          </div>
        </template>
      </div>


    </div>

    <div style="background-color: #ffffff;padding: 10px;margin-top: 10px">
      <div style="font-size: 16px;padding: 3px 0;border-bottom: 1px dashed #eeeeee">
        <span style="margin-left: 10px">大宗商品</span>
      </div>
      <div style="display: flex;flex-wrap: wrap">
        <template v-for="item in dazong">
          <div style="width: 288px;height: 136px;border: 1px solid #eeeeee;padding: 8px 14px;border-radius: 3px;margin: 10px 5px 0">
            <div style="display: flex;justify-content: space-between;align-items: center;padding-bottom: 6px;border-bottom: 1px solid #eeeeee">
              <div style="display:flex;align-items: center">
                <div style="width: 46px;height: 46px;margin-right: 15px">
                  <img :src="require(`../../../../../public/img/${item.name}.png`)" :alt="item.name">
                </div>
                <span :style="{letterSpacing: '5px',fontSize: '16px',color: item.color}">
                  {{ item.name }}
                </span>
              </div>
              <div style="width: 6px;height: 20px">
                <img src="../../../../../public/img/更多.png" alt="">
              </div>
            </div>
            <div style="line-height: 75px;color: #8090b0;letter-spacing: 2px;text-align: center">
              <span v-for="(item, index) in xiangmu" @click="goShow" :key="index" :style="{borderRight: index === 4 ? ' ':'1px dashed #cccccc', margin: '0 5px', cursor:'pointer'}">
                {{ item }}
              </span>
            </div>
          </div>
        </template>
      </div>


    </div>

  </div>
</template>

<script>
    export default {
        data(){
            return {
                minsheng: [{
                    name: '水果',
                    color: '#1389ff'
                }, {
                    name: '蔬菜',
                    color: '#fbcf48'
                },{
                    name: '调味品',
                    color: '#0099ff'
                },{
                    name: '奶制品',
                    color: '#ffb137'
                },{
                    name: '水',
                    color: '#4ce3c9'
                }],
                dazong: [{
                    name: '能源',
                    color: '#94c04e'
                },{
                    name: '钢铁',
                    color: '#2da9e9'
                },{
                    name: '建材',
                    color: '#ef7633'
                }],
                xiangmu: ['苹果', '香蕉', '橙子', '梨', '西瓜'],
                images:['../../../../assets/img/水果.png']
            }
        },
        methods:{
            goShow() {
                this.$router.push('/analyses/index')
            }
        }
    }
</script>

<style lang="scss">

</style>
