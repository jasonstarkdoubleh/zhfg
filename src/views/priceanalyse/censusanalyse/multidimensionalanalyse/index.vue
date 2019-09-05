<template>
  <div class="trend-analyse">
    <div class="flex-justify">
      <el-card class="card-width" >
        <div slot="header" class="clearfix">
          <i class="el-icon-menu" style="margin-right: 2px"></i><span>民生商品</span>
        </div>

        <div v-for="(obj,index) in priceData" :key="index" class="text item" style="height: 30px;box-sizing: border-box;border-bottom: 1px #f0f0f1 dashed;">
          <el-row :gutter="10">
            <el-col :span="4">
              <el-tag size="small" type="warning" style="position: relative;top: -3px" v-if="index % 2 === 1">{{obj.label}}</el-tag>
              <el-tag size="small" type="success" style="position: relative;top: -3px" v-else>{{obj.label}}</el-tag>
            </el-col>
            <el-col :span="16" style="padding: 0">
              <div style="white-space: nowrap;text-overflow: ellipsis;overflow: hidden">
                <el-link type="info" v-for="(val,index) in obj.value" :key="index" style="margin-right: 20px;" @click="handleSearch">
                  {{ val }}
                </el-link>
              </div>
            </el-col>
            <el-col :span="4">
              <el-link type="info" @click="handleSearch" style="margin-left: 20px">
                更多<i class="el-icon-arrow-right"></i>
              </el-link>
            </el-col>
          </el-row>
        </div>
      </el-card>

      <el-card class="card-width" >
        <div slot="header" class="clearfix">
          <i class="el-icon-menu" style="margin-right: 2px"></i><span>大宗商品</span>
        </div>

        <div v-for="(obj,index) in priceData" :key="index" class="text item" style="height: 30px;box-sizing: border-box;border-bottom: 1px #f0f0f1 dashed">
          <el-row :gutter="10">
            <el-col :span="4">
              <el-tag size="small" type="warning" style="position: relative;top: -3px" v-if="index % 2 === 1">{{obj.label}}</el-tag>
              <el-tag size="small" type="success" style="position: relative;top: -3px" v-else>{{obj.label}}</el-tag>
            </el-col>
            <el-col :span="16" style="padding: 0">
              <div style="white-space: nowrap;text-overflow: ellipsis;overflow: hidden">
                <el-link type="info" v-for="(val,index) in obj.value" :key="index" style="margin-right: 20px;" @click="handleSearch">
                  {{ val }}
                </el-link>
              </div>
            </el-col>
            <el-col :span="4">
              <el-link type="info" @click="handleSearch" style="margin-left: 20px">
                更多<i class="el-icon-arrow-right"></i>
              </el-link>
            </el-col>
          </el-row>
        </div>
      </el-card>
    </div>

    <el-dialog :visible.sync="searchShow" fullscreen>
        <div class="flex-align bgc">
          <el-radio v-model="radio" label="1" border size="small">生猪</el-radio>
          <el-radio v-model="radio" label="2" border size="small">猪肉</el-radio>
          <el-radio v-model="radio" label="3" border size="small">仔猪</el-radio>
          <el-radio v-model="radio" label="4" border size="small">猪三元</el-radio>
        </div>

        <div style="display: flex;justify-content: space-between;margin-top: 10px">
            <!--      左边-->
            <div style="margin-right: 10px;width: 30%;">

              <el-card>
                <div style="height: 150px;display: flex;flex-direction: column;justify-content: space-around">
                  <div>
                    <span>猪肉产量:</span>
                    <span style="margin-left: 20px">2165万吨</span>
                  </div>
                  <div>
                    <span>上年产量:</span>
                    <span style="margin-left: 20px">2165万吨</span>
                  </div>
                  <div>
                    <span>同比:</span>
                    <span style="margin-left: 20px">2165万吨</span>
                  </div>
                </div>
              </el-card>

              <el-card style="margin-top: 10px">
                <div style="height: 150px;display: flex;flex-direction: column;justify-content: space-around">
                  <div>
                    <span>鲜猪肉销量:</span>
                    <span style="margin-left: 20px">2165万吨</span>
                  </div>
                  <div>
                    <span>期初库存:</span>
                    <span style="margin-left: 20px">2165万吨</span>
                  </div>
                  <div>
                    <span>期末库存:</span>
                    <span style="margin-left: 20px">2165万吨</span>
                  </div>
                </div>
              </el-card>

              <el-card style="margin-top: 10px">
                <div style="height: 150px;display: flex;flex-direction: column;justify-content: space-around">
                  <div>
                    <span>市场价格:</span>
                    <span style="margin-left: 20px">15KG</span>
                  </div>
                  <div>
                    <span>电商价格:</span>
                    <span style="margin-left: 20px">15KG</span>
                  </div>
                  <div>
                    <span>超市价格:</span>
                    <span style="margin-left: 20px">15KG</span>
                  </div>
                </div>
              </el-card>

              <el-card style="margin-top: 10px">
                <div style="height: 150px;display: flex;flex-direction: column;justify-content: space-around">
                  <div>
                    <span>消费量:</span>
                    <span style="margin-left: 20px">15KG</span>
                  </div>
                  <div>
                    <span>供给量:</span>
                    <span style="margin-left: 20px">15KG</span>
                  </div>
                  <div>
                    <span>居民家庭人均:</span>
                    <span style="margin-left: 20px">15KG</span>
                  </div>
                </div>
              </el-card>

              <el-card style="margin-top: 10px">
                <div style="height: 150px;display: flex;flex-direction: column;justify-content: space-around">
                  <div>
                    <span>进口量:</span>
                    <span style="margin-left: 20px">15KG</span>
                  </div>
                  <div>
                    <span>出口量:</span>
                    <span style="margin-left: 20px">15KG</span>
                  </div>
                  <div>
                    <span>进口额:</span>
                    <span style="margin-left: 20px">2165万吨</span>
                  </div>
                  <div>
                    <span>出口额:</span>
                    <span style="margin-left: 20px">2165万吨</span>
                  </div>
                </div>
              </el-card>

            </div>

            <!--      中间-->
            <div style="margin-right: 10px;width: 40%;">
              <el-card id="MAPmany" style="position: relative;">
                <div style="position: absolute;top: 5px;left: 5px;color: #ffffff">价格运行状态</div>
                <div id="mainmany" style="width: 500px;height: 500px"></div>
              </el-card>


              <el-card style="margin-top: 10px">
                <div style="width: 500px;height: 300px;display: flex;flex-direction: column;justify-content: space-around">
                  <div>
                    <span>进口量:</span><span style="margin-left: 20px">2165万吨</span>
                  </div>
                  <div>
                    <span>出口量:</span><span style="margin-left: 20px">2165万吨</span>
                  </div>
                  <div>
                    <span>进口额:</span><span style="margin-left: 20px">2165万吨</span>
                  </div>
                  <div>
                    <span>出口额:</span><span style="margin-left: 20px">2165万吨</span>
                  </div>
                  <div>
                    <span>进口量:</span><span style="margin-left: 20px">2165万吨</span>
                  </div>
                  <div>
                    <span>出口量:</span><span style="margin-left: 20px">2165万吨</span>
                  </div>
                </div>
              </el-card>

            </div>

            <!--      右边-->
            <div style="width: 30%;">
              <el-card>
                <div style="width: 300px;height: 810px;display: flex;flex-direction: column;justify-content: space-around">
                  <div>
                    <span>进口量:</span><span style="margin-left: 20px">2165万吨</span>
                  </div>
                  <div>
                    <span>出口量:</span><span style="margin-left: 20px">2165万吨</span>
                  </div>
                  <div>
                    <span>进口额:</span><span style="margin-left: 20px">2165万吨</span>
                  </div>
                  <div>
                    <span>出口额:</span><span style="margin-left: 20px">2165万吨</span>
                  </div>
                  <div>
                    <span>进口量:</span><span style="margin-left: 20px">2165万吨</span>
                  </div>
                  <div>
                    <span>出口量:</span><span style="margin-left: 20px">2165万吨</span>
                  </div>
                  <div>
                    <span>进口量:</span><span style="margin-left: 20px">2165万吨</span>
                  </div>
                  <div>
                    <span>出口量:</span><span style="margin-left: 20px">2165万吨</span>
                  </div>
                  <div>
                    <span>进口额:</span><span style="margin-left: 20px">2165万吨</span>
                  </div>
                  <div>
                    <span>出口额:</span><span style="margin-left: 20px">2165万吨</span>
                  </div>
                  <div>
                    <span>进口量:</span><span style="margin-left: 20px">2165万吨</span>
                  </div>
                  <div>
                    <span>出口量:</span><span style="margin-left: 20px">2165万吨</span>
                  </div>
                  <div>
                    <span>进口量:</span><span style="margin-left: 20px">2165万吨</span>
                  </div>
                  <div>
                    <span>出口量:</span><span style="margin-left: 20px">2165万吨</span>
                  </div>
                  <div>
                    <span>进口额:</span><span style="margin-left: 20px">2165万吨</span>
                  </div>
                  <div>
                    <span>出口额:</span><span style="margin-left: 20px">2165万吨</span>
                  </div>
                  <div>
                    <span>进口量:</span><span style="margin-left: 20px">2165万吨</span>
                  </div>
                  <div>
                    <span>出口量:</span><span style="margin-left: 20px">2165万吨</span>
                  </div>
                </div>
              </el-card>
            </div>
        </div>
    </el-dialog>
  </div>
</template>

<script>
    import 'echarts/map/js/china'
    export default {
        data(){
            return {
                radio:'1',
                searchShow:false,
                priceDataItem:[{
                    label:'猪肉',
                    value:['生猪','猪肉','仔猪','外三元']
                }],
                priceData:[{
                    label:'水果',
                    value:['苹果','香蕉','橙子','梨','西瓜']
                },{
                    label:'水果',
                    value:['苹果','香蕉','橙子','梨','西瓜','苹果','香蕉','橙子','梨','西瓜','苹果','香蕉','橙子','梨','西瓜','苹果','香蕉','橙子','梨','西瓜']
                },{
                    label:'水果',
                    value:['苹果','香蕉','橙子','梨','西瓜']
                },{
                    label:'水果',
                    value:['苹果','香蕉','橙子','梨','西瓜']
                },{
                    label:'水果',
                    value:['苹果','香蕉','橙子','梨','西瓜']
                },{
                    label:'水果',
                    value:['苹果','香蕉','橙子','梨','西瓜']
                },{
                    label:'水果',
                    value:['苹果','香蕉','橙子','梨','西瓜']
                },{
                    label:'水果',
                    value:['苹果','香蕉','橙子','梨','西瓜']
                },{
                    label:'水果',
                    value:['苹果','香蕉','橙子','梨','西瓜']
                }]
            }
        },
        methods:{
            handleSearch(){
                this.searchShow = true
                this.$nextTick(() => {
                    this.drawMap()
                })
            },
            drawMap(){
                console.log(123);
                let myChart = this.$echarts.init(document.getElementById('mainmany'));
                let option = {
                    tooltip: {
                        trigger: 'item',
                        formatter: '{b}'
                    },
                    series: [
                        {
                            name: '中国',
                            type: 'map',
                            roam: false,
                            mapType: 'china',
                            selectedMode : 'multiple',
                            label: {
                                normal: {
                                    show: true,
                                },
                                emphasis: {
                                    show: true,
                                }
                            },
                            data:[
                                {name:'广东', selected:true}
                            ],
                            itemStyle: {
                                emphasis: {//鼠标移入高亮显颜色
                                    areaColor: '#1E90FF'
                                }
                            },
                        }
                    ]
                };
                myChart.setOption(option);
            }
        }
    }
</script>

<style lang="scss">
  .trend-analyse {
    .el-date-editor .el-range-separator {
      padding: 0;
    }
    .el-button--mini, .el-button--mini.is-round {
      padding: 5px 15px;
    }
    .text {
      font-size: 14px;
    }

    .item {
      margin-bottom: 18px;
    }

    .clearfix:before, .clearfix:after {
      display: table;
      content: "";
    }
    .clearfix:after {
      clear: both
    }
    #MAPmany .el-card__body {
      padding: 0;
    }
  }
</style>
