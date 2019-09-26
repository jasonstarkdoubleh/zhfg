<template>
    <div>

      <div style="background-color: #ffffff;padding: 10px">
        <div style="font-size: 16px;padding: 3px 0;border-bottom: 1px dashed #eeeeee">
          <span style="margin-left: 10px">民生商品</span>
        </div>
      <div style="display: flex;flex-wrap: wrap">
        <template v-for="item in minsheng">
          <div style="width: 288px;height: 136px;border: 1px solid #eeeeee;padding: 8px 14px;border-radius: 3px;margin: 10px 5px 0">
            <div style="height: 30px;display: flex;justify-content: space-between;align-items: center">
              <div style="cursor: pointer" @click="goShow">{{ item }}</div>
              <div style="width: 70px;height: 20px;background-color: #fc424e;border-radius: 3px;letter-spacing: 2px;color: #ffffff;text-align: center;line-height: 20px">
                红色预警
              </div>
            </div>
            <div style="font-size: 12px;color: #8690b0;margin-top: 5px;padding-bottom: 5px;border-bottom: 1px dashed #e3f3fe">
              预警区间超过(8%~10%)的范围
            </div>
            <div style="display: flex;justify-content: space-between;padding: 10px 0">
              <div style="display: flex;flex-direction: column;justify-content: space-between;letter-spacing: 2px;color: #8690b0">
                <div>单价:10元 涨幅:8% </div>
                <div>时间:2019-08-01</div>
              </div>
              <div style="width: 40px;height: 40px;background-color: #eeeeee;border-radius: 3px">
                <img src="../../../assets/img/香蕉.png" alt="">
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
          <template v-for="item in minsheng">
            <div style="width: 288px;height: 136px;border: 1px solid #eeeeee;padding: 8px 14px;border-radius: 3px;margin: 10px 5px 0">
              <div style="height: 30px;display: flex;justify-content: space-between;align-items: center">
                <div style="cursor: pointer" @click="goShow">{{ item }}</div>
                <div style="width: 70px;height: 20px;background-color: #fc424e;border-radius: 3px;letter-spacing: 2px;color: #ffffff;text-align: center;line-height: 20px">
                  红色预警
                </div>
              </div>
              <div style="font-size: 12px;color: #8690b0;margin-top: 5px;padding-bottom: 5px;border-bottom: 1px dashed #e3f3fe">
                预警区间超过(8%~10%)的范围
              </div>
              <div style="display: flex;justify-content: space-between;padding: 10px 0">
                <div style="display: flex;flex-direction: column;justify-content: space-between;letter-spacing: 2px;color: #8690b0">
                  <div>单价:10元 涨幅:8% </div>
                  <div>时间:2019-08-01</div>
                </div>
                <div style="width: 40px;height: 40px;background-color: #eeeeee;border-radius: 3px">
                  <img src="../../../assets/img/香蕉.png" alt="">
                </div>
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
                minsheng: ['小麦', '苹果', '大豆', '玉米',],
                dazong: ['钢铁', '石油', '钢筋', '鸡蛋',],
            }
        },
        methods:{
            goShow() {
                this.$router.push('/warningshow/index')
            }
        }
    }
</script>

<style lang="scss">

</style>
