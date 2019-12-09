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
                  <img :src="require(`../../../../../public/img/${item.commId}.jpg`)" :alt="item.name" style="width: 44px;height: 44px">
                </div>
                <span :style="{letterSpacing: '5px', fontSize: '16px', color:item.color, cursor:'pointer'}" @click="handleDialog(item)">
                  {{ item.commName }}
                </span>
              </div>
              <div style="width: 6px;height: 20px;cursor: pointer" @click="handleDialog(item)">
                <img src="../../../../../public/img/更多.png" alt="">
              </div>
            </div>
            <div style="line-height: 75px;color: #8090b0;letter-spacing: 2px;overflow: hidden;height: 75px">
              <span v-for="(subitem, index) in item.subCommList" @click="goShow(subitem)" :key="index" :style="{borderRight: index === 4 || index === (item.subCommList.length -1) ? ' ':'1px dashed #cccccc',margin: '0 5px',padding: '0 10px 0 0', cursor:'pointer'}">
                <span v-if="index < 5">{{ subitem.commName }}</span>
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
                  <img :src="require(`../../../../../public/img/${item.commId}.jpg`)" :alt="item.name" style="width: 44px;height: 44px">
                </div>
                <span :style="{letterSpacing: '5px', fontSize: '16px', color:item.color, cursor:'pointer'}" @click="handleDialog(item)">
                  {{ item.commName }}
                </span>
              </div>
              <div style="width: 6px;height: 20px;cursor: pointer" @click="handleDialog(item)">
                <img src="../../../../../public/img/更多.png" alt="">
              </div>
            </div>
            <div style="line-height: 75px;color: #8090b0;letter-spacing: 2px;overflow: hidden;height: 75px">
              <span v-for="(subitem, index) in item.subCommList" @click="goShow(subitem)" :key="index" :style="{borderRight: index === 4 || index === (item.subCommList.length -1) ? ' ':'1px dashed #cccccc',margin: '0 5px',padding: '0 10px 0 0', cursor:'pointer'}">
                <span v-if="index < 5">{{ subitem.commName }}</span>
              </span>
            </div>
          </div>
        </template>
      </div>


    </div>

    <el-dialog
      :title="itemValue.commName"
      :visible.sync="dialogVisible"
      width="30%">
        <span v-for="(item, index) in itemValue.subCommList" :key="index" @click="goShow(item)" style="margin-right: 10px;cursor: pointer;color: #8090b0">
          {{item.commName}}
        </span>
    </el-dialog>

  </div>
</template>

<script>
    import { mapActions } from 'vuex'
    export default {
        data(){
            return {
                itemValue:{},
                dialogVisible: false,
                minsheng: [],
                dazong: [],
                xiangmu: [],
                images:['../../../../assets/img/水果.png']
            }
        },
        methods:{
            handleDialog(item) {
                this.dialogVisible = true
                this.itemValue = item
                console.log(item)
            },
            goShow(data) {
                console.log(data)
                this.$router.push('/analyses/index')
                this.changePageValue(data)
            },
            ...mapActions([
                'trendQueryList',
                'changePageValue'
            ])
        },
        created() {
            this.trendQueryList().then(res => {
                console.log(123)
                console.log(res)
                let data = res.data[0]
                this.minsheng = data.minsheng.subCommList
                this.dazong = data.dazong.subCommList
                for (let i in this.minsheng){
                    if(i%5 === 1){
                        this.minsheng[i].color = '#1389ff'
                    }else if (i%5 === 2) {
                        this.minsheng[i].color = '#fbcf48'
                    }else if (i%5 === 3) {
                        this.minsheng[i].color = '#0099ff'
                    }else if (i%5 === 4) {
                        this.minsheng[i].color = '#ffb137'
                    }else {
                        this.minsheng[i].color = '#4ce3c9'
                    }
                }
                for (let i in this.dazong){
                    if(i%5 === 1){
                        this.dazong[i].color = '#1389ff'
                    }else if (i%5 === 2) {
                        this.dazong[i].color = '#fbcf48'
                    }else if (i%5 === 3) {
                        this.dazong[i].color = '#0099ff'
                    }else if (i%5 === 4) {
                        this.dazong[i].color = '#ffb137'
                    }else {
                        this.dazong[i].color = '#4ce3c9'
                    }
                }
            })
        }
    }
</script>

<style lang="scss">

</style>
