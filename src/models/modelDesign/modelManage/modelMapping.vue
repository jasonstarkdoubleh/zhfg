<template>
  <WorkMain :headerItems="['模型设计','模型管理','模型发布']" :outerFlag="false">
    <div class="allLayout_conCj" style="margin-top: 20px;">
        <span>模型发布</span>
    </div>
    <div class="allLayout top20">
        <div class="alignLeft left10">
            <span class="left30">模型名称：</span>
            <a-select v-model="model_name" disabled style="width: 400px">
              <a-select-option :key="item.id" v-for="item in model_nameOPtion"
                                :value="item.name">{{ item.name }}
              </a-select-option>
            </a-select>
            <br>
            <span class="left30">自驱组织：</span>
            <a-input v-model="organization" disabled  class="top20" style="width: 400px;"></a-input>
            <br>
            <span class="left30">预测类型：</span>
           <a-select v-model="predictType" disabled class="top20"   style="width: 150px">
             <a-select-option :key="value.val_code" v-for="value in yclx"
                              :value="value.val_code">{{ value.val_name }}
             </a-select-option>
            </a-select>
        </div>
    </div>
    <div class="allLayout_conCj" style="margin-top: 20px;">
        <span>模型映射</span>
    </div>
    <div class="allLayout">
        <div class="alignLeft left10">
            <span class="leftSpacing top10">因变量：</span>
            <a-input v-model="dependent_var"  disabled style="width: 150px" ></a-input>
            <span class="leftSpac top10">可选因变量：</span>
            <a-select v-model="seleBecauseAmount" style="width: 150px;margin-top:10px">
              <a-select-option :key="item.ename" v-for="item in testType"
                                :value="item.ename">{{ item.cname }}
              </a-select-option>
            </a-select>
            <span class="colorRed">*</span>
            <div v-for="(item,index) in data" :key="index">
                <span class="leftSpacing top10" >自变量：</span>
                <a-input v-model="item.cname" disabled  style="width: 150px"></a-input>
                <a-tooltip>
                  <template slot='title'>
                    自变量：{{item.cname}}
                  </template>
                  <span><a-icon type="edit" /></span>
                </a-tooltip>

                <span class="left20 top10">可选自变量：</span>
                <a-select v-model="item.selectData" style="width: 150px;margin-top:10px">
                  <a-select-option :key="item.ename" v-for="item in testType1"
                                    :value="item.ename">{{ item.cname }}
                  </a-select-option>
                </a-select>
                <span class="colorRed">*</span>
                <span style="margin-left:20px;">偏移量：</span>
                <a-input v-model="item.value"  style="width: 150px; margin-top:10px" @change="changeInput(item.value)"></a-input>
                <span class="colorRed">*</span>
            </div>
        </div>
    </div>
    <div class="allLayout_conCj" style="margin-top: 20px;">
        <span>参数配置</span>
    </div>
    <div class="allLayout">
        <div class="alignLeft left10">
            <span class="left30 top10">评估指标：</span>
            <a-select v-model="aboutIndex" style="width: 150px;margin-top:20px">
              <a-select-option :key="item.val_code" v-for="item in pgzb"
                               :value="item.val_code">{{ item.val_name }}
              </a-select-option>
            </a-select>
            <span class="colorRed">*</span>
            <br>
            <span class="left30 top20">指标周期：</span>
            <a-input v-model="indexCycle"  style="width: 150px;margin-top:20px"></a-input>
            <span class="colorRed">*</span>
            <span>（单位：天）</span>
            <br>
            <span class="left20 top20">阈值(警告)：</span>
            <a-input v-model="valueSet1"  style="width: 150px;margin-top:20px"></a-input>
            <span class="colorRed">*</span>
            <span>（单位：以评估指标为准）</span>

            <span class="left20 top20">阈值(异常)：</span>
            <a-input v-model="valueSet2"   style="width: 150px;margin-top:20px"></a-input>
            <span class="colorRed">*</span>
            <span>（单位：以评估指标为准）</span>
        </div>
    </div>
    <div class="bottom boxBtb">
      <a-button type="primary" @click="preRelease" >预发布</a-button>
      <a-button type="primary" @click="release" style="margin: 0 20px;">发 布</a-button>
      <a-button @click="$router.go(-1)">返 回</a-button>
    </div>
  </WorkMain>
</template>

<script>
  import WorkMain from '@/models/public/WorkMain';
  import {required} from 'vuelidate/lib/validators';
  import '@riophae/vue-treeselect/dist/vue-treeselect.css';
  import "@/styles/table-page.scss";
  import "@/styles/general.scss";
  import AButton from "ant-design-vue/es/button/button";
  import AInput from "ant-design-vue/es/input/Input";

  export default {
    name: 'modelMapping',
    data() {
      return {
        model_id:'',
        run_status:'',
        release_status:'',
        orgId: '',
        pgzb:[],
        yclx:[],
        data:[],
        selectData:[],
        treeData: [],
        testType:[],
        testType1:[],
        model_name:"",//模型名称
        predictTimeType:"",//时间类型
        predictType:"",//预测类型
        organization: '',//组织结构
        dependent_var:"",
        independent_var:[],
        seleBecauseAmount:"",
        aboutIndex:"",
        indexCycle:"",
        valueSet1:"",
        valueSet2:"",
        model_nameOPtion:[],
      }
    },
    computed: {

    },
    components: {
      AInput,
      AButton,
      WorkMain,
    },
    mounted() {
      var dataObj = sessionStorage.getItem("selectedRows");
      var dataRowObj = JSON.parse(dataObj);
      this.model_id = dataRowObj[0].model_id;
      this.orgId = dataRowObj[0].org_id;
      this.release_status = dataRowObj[0].release_status;
      this.run_status = dataRowObj[0].run_status;
      this.model_name = dataRowObj[0].model_name;
      this.organization = dataRowObj[0].origin_name;
      this.predictTimeType = dataRowObj[0].predictTimeType;
      this.predictType = dataRowObj[0].predictType;
      this.pgzbliebiao();
      this.yclxliebiao();
      this.defaultData();
      this.ParameterConfigurationEcho(); //参数配置回显
    },
    methods: {
      changeInput(value){//监听偏移量输入时的变化   只能输输入正整数和负整数
          clearTimeout(this.input_timer)
          this.input_timer = setTimeout(()=>{
          var check= /^(-\d|\d)\d*$/;
            if(value != ""){
            if(!check.test(value)){
                this.Message.error('偏移量只能是整数');
               }
            }
          },400)
      },
      yclxliebiao () {
        const $this = this;
        let params = {}
        this.BaseRequest({
            url: '/calculation/selectglobalcodeyclx',
            method: 'get',
            params: params
        }).then(response => {
            this.yclx = response.dataList
        })
      },
      pgzbliebiao () {
        const $this = this
        let params = {}
        this.BaseRequest({
            url: '/modelManage/selectglobalcodepgzb',
            method: 'get',
            params: params
        }).then(response => {
            this.pgzb = response.dataList;
        })
      },
      modelMapping(){//模型映射
        let params = {"model_id": this.model_id};
        this.BaseRequest({
          url: '/v1/model/model_map_contents',
          method: 'post',
          params: params
        }).then(response => {
          console.log(response,'模型映射')
          var data = response.model_map_contents;
          this.dependent_var = data.dependent_var;//因变量
          this.testType = data.dependent_contents;//因变量下拉
          this.independent_var = data.independent_var_list;//自变量
          this.testType1 = data.independent_contents;//自变量下拉

          for(var i=0; i<this.independent_var.length; i++){
            this.independent_var[i] = {cname:this.independent_var[i]}
          }

          for (var i = 0; i < this.independent_var.length; i++){
            var template = {};
              template.cname = this.independent_var[i].cname,
              template.testType1 = this.testType1,
              template.value  = 0 ;
              this.data.push(template);
          }

          for(var i=0; i<this.independent_var.length; i++){
            for(var j=0; j<this.selectData.length; j++){
              this.selectData[j] = {ename:this.independent_var[i]}
            }
          }

        })
      },
      preRelease(){//预发布
        //点击修改查看是否已存在已发布状态
        // this.BaseRequest({
        //     url: '/modelManage/selectchakanReleaseStatus',
        //     method: 'get',
        //     params: {"org_id":this.orgId,"predictTimeType":this.predictTimeType,"predictType":this.predictType}
        // }).then((response) => {
        //     // console.log(response,"ddd")
        //     if(response.dataList.length >0){
        //         this.Message.error('此机构已有已发布状态模型！');
        //     }else{
              //模型映射
              //可选因变量
                for(let j=0; j<this.testType.length; j++){
                    if(this.seleBecauseAmount == this.testType[j].cname){
                      this.seleBecauseAmount = this.testType[j].ename;
                    }
                }
                //偏移量
                var arry1 = [];
                for(var i=0; i<this.data.length; i++){
                    arry1.push(this.data[i].value);
                }
                for(let i=0; i<arry1.length; i++){
                  var offsetAyy = arry1[i];
                }
              //可选自变量
              var arry2 = [];
              for(var i=0; i<this.data.length; i++){
                  arry2.push(this.data[i].selectData);
              }
              for(let i=0; i<arry2.length; i++){
                  var independentAyy = arry2[i];
              }
              if(this.seleBecauseAmount == undefined){
                  this.Message.error('请选择 可选因变量！');
              }else if(arry2.length < this.independent_var.length || independentAyy == undefined){
                  this.Message.error('请选择 可选自变量！');
              }else if(arry1.length < this.independent_var.length || offsetAyy == null){
                  this.Message.error('请选择 偏移量！');
              }else if(this.aboutIndex == ""){
                  this.Message.error('请填写 评估指标');
              }else if(this.indexCycle == ""){
                  this.Message.error('请填写 指标周期');
              }else if(this.valueSet1 == ""){
                  this.Message.error('请填写 阈值(警告)');
              }else if(this.valueSet2 == ""){
                  this.Message.error('请填写 阈值(异常)');
              }else{
                var arryValue = JSON.stringify(arry2);
                var arryValue1 = JSON.stringify(arry1);
                this.Request({
                    url: 'model/model_map_set',
                    method: 'post',
                    data: {model_id: this.model_id, dependent_map: this.seleBecauseAmount, independent_map_list: arryValue, offset_days: arryValue1,}
                }).then(response => {
                    var model_mapping = response.code;
                })
                //参数配置
                this.BaseRequest({
                  url: '/modelManage/preRelease',
                  method: 'get',
                  params: {
                    "model_id": this.model_id,
                    "org_id": this.orgId,
                    "release_status" : "0",
                    "run_status": "1",
                    "evaluate_type":this.aboutIndex,
                    "evaluate_period":this.indexCycle,
                    "threshold_warn":this.valueSet1,
                    "threshold_critical":this.valueSet2,
                  }
                }).then(response => {
                    if(response != "success" && model_mapping != 0){
                      this.Message.error('预发布失败');
                    }else{
                      this.Message.success('预发布成功!');
                    }
                })
            }
        //   }
        // })
      },
      release(){ //发布
         //点击修改查看是否已存在已发布状态
          this.BaseRequest({
            url: '/modelManage/selectchakanReleaseStatus',
            method: 'get',
            params: {"org_id":this.orgId,"predictTimeType":this.predictTimeType,"predictType":this.predictType}
          }).then((response) => {
            // console.log(response,"ddd")
            if(response.dataList.length >0){
                this.Message.error('此机构已有已发布状态模型！');
            }else{
                //可选因变量
                for(let j=0; j<this.testType.length; j++){
                    if(this.seleBecauseAmount == this.testType[j].cname){
                      this.seleBecauseAmount = this.testType[j].ename;
                    }
                }
                //偏移量
                var arry1 = [];
                for(var i=0; i<this.data.length; i++){
                    arry1.push(this.data[i].value);
                }
                for(let i=0; i<arry1.length; i++){
                  var offsetAyy = arry1[i];
                }
                //可选自变量
                var arry2 = [];
                for(var i=0; i<this.data.length; i++){
                    arry2.push(this.data[i].selectData);
                }
                for(let i=0; i<arry2.length; i++){
                  var independentAyy = arry2[i];
                }
                if(this.seleBecauseAmount == undefined){
                    this.Message.error('请选择 可选因变量！');
                }else if(arry2.length < this.independent_var.length || independentAyy == undefined){
                    this.Message.error('请选择 可选自变量！');
                }else if(arry1.length < this.independent_var.length || offsetAyy == null){
                    this.Message.error('请选择 偏移量！');
                }else if(this.aboutIndex == ""){
                    this.Message.error('请填写 评估指标');
                }else if(this.indexCycle == ""){
                    this.Message.error('请填写 指标周期');
                }else if(this.valueSet1 == ""){
                    this.Message.error('请填写 阈值(警告)');
                }else if(this.valueSet2 == ""){
                    this.Message.error('请填写 阈值(异常)');
                }else{
                    var arryValue = JSON.stringify(arry2);//可选自变量
                    var arryValue1 = JSON.stringify(arry1);//偏移量

                    //模型映射
                    this.Request({
                        url: 'model/model_map_set',
                        method: 'post',
                        data: {model_id: this.model_id, dependent_map: this.seleBecauseAmount, independent_map_list: arryValue, offset_days: arryValue1,}
                    }).then(response => {
                        var model_mapping = response.code;
                    })
                    //参数配置
                    this.BaseRequest({
                      url: '/modelManage/preRelease',
                      method: 'get',
                      params: {
                        "model_id": this.model_id,
                        "org_id": this.orgId,
                        "release_status" : "1",
                        "run_status": "1",
                        "evaluate_type":this.aboutIndex,
                        "evaluate_period":this.indexCycle,
                        "threshold_warn":this.valueSet1,
                        "threshold_critical":this.valueSet2,
                      }
                    }).then(response => {
                        if(response != "success" && model_mapping != 0){
                          this.Message.error('发布失败');
                        }else{
                          this.Message.success('发布成功!');
                          this.$router.go(-1);
                        }
                    })
                }
            }
          })
      },
      ParameterConfigurationEcho(){  //参数配置回显
        this.BaseRequest({
          url: '/modelManage/ParameterConfigurationEcho',
          method: 'get',
          params: {
            "model_id": this.model_id,
            "org_id": this.orgId
          }
        }).then(response => {
           if (response.dataList.length != 0){
             this.aboutIndex = response.dataList[0].evaluate_type;
             this.indexCycle = response.dataList[0].evaluate_period;
             this.valueSet1 = response.dataList[0].threshold_warn;
             this.valueSet2 = response.dataList[0].threshold_critical;
           }else{
             this.aboutIndex = "";
             this.indexCycle = "";
             this.valueSet1 = "";
             this.valueSet2 = "";
           }
        })
      },
      defaultData(){
        var  params = {"model_id":this.model_id}
        this.BaseRequest({
          url: '/v1/model/model_map_contents',
            method: 'post',
            params: params
          }).then(response => {
             var data = response.model_map_contents;
             this.testType = data.dependent_contents;//因变量下拉
        })
        this.Request({
            url: '/model/model_map_echo',
            method: 'post',
            data: params
        }).then(response => {
          console.log(response,"页面回显值")
          //因变量
          var dependent_contents = response.result.dependent_contents;
          this.dependent_var = dependent_contents.key.name;
          this.seleBecauseAmount = dependent_contents.name.cname;
          //自变量
          var independent_contents = response.result.independent_contents;
          if(independent_contents.name == "" || independent_contents.offset == ""){
              this.modelMapping()//模型映射
          }else{
              let keys = Object.keys(independent_contents);
              this.data = [];
              for( let i in independent_contents[keys[0]]){
                let temp = {};
                for(let k  of keys){
                  //自变量of
                  if(k === 'key' ){
                    temp.cname  =  independent_contents[k][i].name;
                  }else if(k === 'offset'){
                    temp.value  = independent_contents[k][i].offset_value;
                  }else if(k === 'name'){
                    temp.selectData  = independent_contents[k][i].ename;
                    if(independent_contents[k][i].cname == ""){
                      temp.selectData = []
                    }
                  }
                  this.BaseRequest({
                    url: '/v1/model/model_map_contents',
                    method: 'post',
                    params: params
                  }).then(response => {
                    var data = response.model_map_contents;
                    this.testType1 = data.independent_contents;//自变量下拉
                  })
                  temp.testType1 = this.testType1;
                }
                this.data.push(temp);
              }
          }
        })
      },
    },
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.allLayout_conCj{
  line-height: 30px;
  font-size: 16px;
  font-weight: bold;
  padding-left: 10px;
  text-align: left;
  border-bottom: 1px #e7ebee dashed;
}
.top10{
  margin-top: 20px;
}
.top10>span{
  display: block;
  margin-bottom: 8px;
}
.color{
  color: red;
}
.bottom{
  margin-bottom: 50px;
}
.boxBtb{
  margin-top: 90px;
}
.leftSpacing{
  margin-left:45px;
}
.leftSpac{
  display: inline-block;
  margin-left:38px;
}
.colorRed{
  color: red;
}
</style>
