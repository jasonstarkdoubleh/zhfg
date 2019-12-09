<template>
    <div>

      <div style="background-color: #ffffff;padding: 10px">
        <div style="font-size: 16px;padding: 3px 0;border-bottom: 1px dashed #eeeeee">
          <span style="margin-left: 10px">民生商品</span>
        </div>
        <div style="display: flex;flex-wrap: wrap">
          <template v-for="(item, index) in minsheng" v-if="index > 0">
            <div style="width: 288px;height: 136px;border: 1px solid #eeeeee;padding: 8px 14px;border-radius: 3px;margin: 10px 5px 0" :key="index">
              <div style="height: 30px;display: flex;justify-content: space-between;align-items: center">
                <div style="cursor: pointer" @click="goShow(item)">{{ item.commName }}</div>
                <div style="width: 70px;height: 20px;border-radius: 3px;letter-spacing: 2px;color: #ffffff;text-align: center;line-height: 20px">
                  <div :style="{ backgroundColor: item.color }">
                    {{ item.ewarnLevel }}
                  </div>
                </div>
              </div>
              <div style="font-size: 12px;color: #8690b0;margin-top: 5px;padding-bottom: 5px;border-bottom: 1px dashed #e3f3fe">
<!--                预警区间超过(8%~10%)的范围-->
              </div>
              <div style="display: flex;justify-content: space-between;padding: 10px 0">
                <div style="display: flex;flex-direction: column;justify-content: space-between;color: #8690b0">
                  <div style="margin-bottom: 5px">单价:{{ item.priValue }}元</div>
                  <div style="margin-bottom: 5px">涨幅:{{ item.priRange }}%</div>
                  <div>时间:{{ item.ewarnDate }}</div>
                </div>
                <div style="width: 40px;height: 40px;background-color: #eeeeee;border-radius: 3px">
                  <img :src="require(`../../../../public/img/${item.commId}.jpg`)" style="width: 40px;height: 40px;">
                </div>
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
          <template v-for="(item, index) in dazong" v-if="index > 0">
            <div :key="index" style="width: 288px;height: 136px;border: 1px solid #eeeeee;padding: 8px 14px;border-radius: 3px;margin: 10px 5px 0">
              <div style="height: 30px;display: flex;justify-content: space-between;align-items: center">
                <div style="cursor: pointer" @click="goShow(item)">{{ item.commName }}</div>
                <div style="width: 70px;height: 20px;background-color: #fc424e;border-radius: 3px;letter-spacing: 2px;color: #ffffff;text-align: center;line-height: 20px">
                  <div :style="{ backgroundColor: item.color }">
                    {{ item.ewarnLevel }}
                  </div>
                </div>
              </div>
              <div style="font-size: 12px;color: #8690b0;margin-top: 5px;padding-bottom: 5px;border-bottom: 1px dashed #e3f3fe">
<!--                预警区间超过(8%~10%)的范围-->
              </div>
              <div style="display: flex;justify-content: space-between;padding: 10px 0">
                <div style="display: flex;flex-direction: column;justify-content: space-between;color: #8690b0">
                  <div style="margin-bottom: 5px">单价:{{ item.priValue }}元</div>
                  <div style="margin-bottom: 5px">涨幅:{{ item.priRange }}%</div>
                  <div>时间:{{ item.ewarnDate }}</div>
                </div>
                <div style="width: 40px;height: 40px;background-color: #eeeeee;border-radius: 3px">
                  <img :src="require(`../../../../public/img/${item.commId}.jpg`)" style="width: 40px;height: 40px;">
                </div>
              </div>
            </div>
          </template>
        </div>


      </div>

    </div>
</template>

<script>
  import { mapActions } from 'vuex'
    export default {
        data(){
            return {
                minsheng: [],
                dazong: [],
            }
        },
        methods:{
            ...mapActions([
               'warnQueryList',
                'changePageValue'
            ]),
            goShow(data) {
                this.$router.push('/warningshow/index')
                console.log(data)
                this.changePageValue(data)
            }
        },
        created() {
            this.warnQueryList().then(res => {
                console.log(res)
                this.minsheng = res.data.ewanInfo.minsheng
                this.dazong = res.data.ewanInfo.dazong
                for(let i in this.minsheng) {
                    if(this.minsheng[i].ewarnLevel === '红色预警') {
                        this.minsheng[i].color = 'red'
                    }
                    if(this.minsheng[i].ewarnLevel === '橙色预警') {
                        this.minsheng[i].color = 'orange'
                    }
                    if(this.minsheng[i].ewarnLevel === '黄色预警') {
                        this.minsheng[i].color = 'yellow'
                    }
                    if(this.minsheng[i].ewarnLevel === '绿色预警') {
                        this.minsheng[i].color = 'green'
                    }
                }
                for(let i in this.dazong) {
                    if(this.dazong[i].ewarnLevel === '红色预警') {
                        this.dazong[i].color = 'red'
                    }
                    if(this.dazong[i].ewarnLevel === '橙色预警') {
                        this.dazong[i].color = 'orange'
                    }
                    if(this.dazong[i].ewarnLevel === '黄色预警') {
                        this.dazong[i].color = 'yellow'
                    }
                    if(this.dazong[i].ewarnLevel === '绿色预警') {
                        this.dazong[i].color = 'green'
                    }
                }
            })
        }
    }
</script>

<style lang="scss">

</style>
