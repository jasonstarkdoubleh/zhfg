<template>
  <div class="allLayout">
    <div style=" width: 600px;height: 40px;position: relative;top: 10px;left: 80px;text-align: left">
      <div style="list-style: none;">
        <span style="margin-left: 20px">模型名称:</span>
        <a-input style="width: 250px" auto-complete="off"  v-model='model_name' ></a-input><sup style="margin-left: 3px;color: red">*</sup>
      </div>
      <div style="list-style: none;margin-top: 20px">
        <span style="margin-left: 48px">类型:</span>
        <a-select   style="width:150px;" placeholder="日"  v-model='model_type' >
          <a-select-option :key="datatype" v-for="datatype in this.typeData"
                           :value="datatype">{{ datatype }}
          </a-select-option>
        </a-select>
      </div>
      <div style="list-style: none;margin-top: 20px">
        <span style="margin-left: 18px">单位实体:</span>
        <a-select   style="width:150px;" placeholder="长沙"  v-model='unit_entity' >
          <a-select-option :key="datatype" v-for="datatype in this.optData"
                           :value="datatype">{{ datatype }}
          </a-select-option>
        </a-select>
      </div>
      <div style="list-style: none;margin-top: 20px">

        <span style="margin-left: 18px">模型选择:</span>
        <a-select mode="modelselection" @change="moselChange" style="width:150px" placeholder="长沙">
          <a-select-option :key="item" v-for="item in modelData"
                           :value="item">{{ item }}
          </a-select-option>
        </a-select>
      </div>
      <div style="list-style: none;margin-top: 20px">
        <span style="margin-left: 18px">数据日期:</span>
        <a-range-picker  @change="onChange"/><br><br>
        <a-button  style="margin-left: 170px" @click="jisuan">计算</a-button>
      </div>
      <div  v-if="cccFlag==1">
      <div style="list-style: none;margin-top: 20px">
        <div class="floatleft">
          <span style="margin-left: 40px">权重:</span>
        </div>
        <div v-for="cc in xunhuanzu" class="floatright" style="margin-right: 215px">
          <a-input style="width: 150px;"   auto-complete="off"  v-model='cc.zi' disabled="true"></a-input>
          <a-input style="width: 150px"   auto-complete="off"  v-model='cc.yin'></a-input>
        </div>
      </div>
      <div style="list-style: none;margin-top: 20px">
        <a-button  style="margin-left: 170px;margin-top: 20px " @click="yuce">预测</a-button>
        <a-button  style="margin-left: 40px" @click="baocun">保存</a-button>
      </div>
      </div>
    </div>
    <div  v-if="mcFlag==1" style="margin-left: 30px;margin-top: 470px ">
      <div class="textLeft proportion" style="text-indent: 0em;">
        <div  style="width: 90px;margin-left: 35px" class="floatleft">
          <span >变量信息表:</span>
        </div>
        <div class="floatright" style="margin-right: 250px">
          <table style="width: 600px;background-color: whitesmoke;">
            <tr>
              <th class="btbg" @mouseover="aaa(item)" v-for="item in titleHead">{{item}}</th>
            </tr>
            <tr v-for="(item,index) in resultData">
              <td>{{index + 1}}</td>
              <td v-for="value in item">{{value}}</td>
            </tr>
          </table>
        </div>
      </div>
      <div>
        <template>
          <div>
            <div id="main" style="height:270px;width: 500px"></div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "modelCombination",
      data(){
          return {
            mcFlag : 0,
            cccFlag:0,
            titleHead:  ["序号","数据项名称","数据类型","缺失值","min","max","average","std"],
            resultData: [],
            moment:[],
            x:[],
            y:[],
            y1:[],
            optData:[],
            modelData:[],
            typeData:[],
            model_name:'',
            model_type:'',
            unit_entity:'',
            modelselection:[],
            xunhuanzu:[{
              zi:'asdasdasd',
              yin:'0.7'
            },
              {
                zi:'asdasdasd',
                yin:'0.3'
              },
              {
                zi:'asdasdasd',
                yin:'0.6'
              }]
          }
      },
      methods: {
          jisuan(){   //计算
            this.modelselection = JSON.stringify(this.modelselection);
            this.cccFlag = 1;
            this.Request({
              url: "",
              method: 'post',
              data: {'dataset_id': 'ds-20190626182312-281f'}
            }).then(response => {

            })
          },
        onChange(date, dateString) {   //时间
          console.log(date, dateString);
          this.moment = dateString;
          this.moment = JSON.stringify(this.moment);
          console.log( this.moment);
        },
        moselChange(value) {  //模型选择多选
          console.log("==============")
          console.log(value)
          console.log("==============")
          this.modelselection = value;
        },
        yuce() {
          this.mcFlag = 1;
          this.Request({
            url: '',
            method: 'post',
            data: {
              'daytime': this.moment,
            }
          }).then(response => {
            console.log(response)
            this.resultData = response.content.tableData;
            console.log('success')
            this.Message.success('成功！')
            //echar图
            var myChart = this.$echarts.init(document.getElementById('main'));
            option = {
              xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
              },
              yAxis: {
                type: 'value'
              },
              series: [{
                data: [820, 932, 901, 934, 1290, 1330, 1320],
                type: 'line'
              }
              ]
            };
            myChart.setOption(option);
            window.addEventListener('resize',function() {myChart.resize()});
          })
      },
        modelse(){
          this.BaseRequest({   //模型选择 model_info
            url: '',
            method: 'post',
            params: {
            }
          }).then(response => {
            console.log(response)
            this.modelData =[];
            if (response != null && response.length > 0) {
              console.log(response)
              response.forEach(menuData => {
                this.modelData.push(menuData.model_name + '')
              })
              console.log(this.modelData)
            }
          })
        },
        danweishiti(){
          this.BaseRequest({   //单位实体 city_info
            url: '',
            method: 'post',
            params: {
            }
          }).then(response => {
            console.log(response)
            this.optData =[];
            if (response != null && response.length > 0) {
              console.log('success')
              console.log(response)
              response.forEach(menuData => {
                this.optData.push(menuData.model_name + '')   /////
              })
              console.log(this.optData)
            }
          })
        },
        leixing(){
          this.BaseRequest({   //类型 global_code
            url: '',
            method: 'post',
            params: {
            }
          }).then(response => {
            console.log(response)
            this.typeData =[];
            if (response != null && response.length > 0) {
              console.log('success')
              console.log(response)
              response.forEach(menuData => {
                this.typeData.push(menuData.model_name + '')
              })
              console.log(this.typeData)
            }
          })
        }
    },
      mounted() {
          this.modelse();
          this.danweishiti();
          this.leixing();
      }
    }
</script>

<style scoped>
  .floatright {
    float: right;
  }
  .floatleft {
    float: left;
  }

  .allLayout {
    width: 100%;
    height: 90%;
    overflow: auto;
  }

  .textLeft {
    text-align: left;
  }

  .proportion {
    margin-top: 20px;
  }
  .btbg {
    background-color: #999999;
  }
</style>
