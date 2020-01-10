<template>
  <div>
    <div class="allLayout_conCj" style="margin-top: 20px;">
      <span>模型发布</span>
    </div>
    <div class="allLayout top20">
      <div class="alignLeft left10">
        <span class="left30">预测商品：</span>
        <a-input v-model="organization"  class="top20" style="width: 400px;"></a-input>
        <br>
        <span class="left30">评估类型：</span>
        <a-select v-model="predictType" class="top20"   style="width: 150px">
          <a-select-option :key="key" v-for="(value,key) in yclx"
                           :value="key">{{ value }}
          </a-select-option>
        </a-select>
      </div>
    </div>
    <div class="allLayout_conCj" style="margin-top: 20px;">
      <span>参数配置</span>
    </div>
    <div class="allLayout">
      <div class="alignLeft left10">
        <span class="left30 top20">评估周期：</span>
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
      <a-button type="primary" @click="release" style="margin: 0 20px;">发 布</a-button>
      <a-button @click="$router.go(-1)">返 回</a-button>
    </div>
  </div>
</template>

<script>
  import {model_release} from '@/api/manager'
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
        yclx:{0:'MSE-均方误差',1:'RMSE-均方根误差',2:'R2-均方根误差',3:'MAPE-平均绝对百分比误差'},
        data:[],
        selectData:[],
        treeData: [],
        testType:[],
        testType1:[],
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
      }
    },
    computed: {

    },
    components: {
      AInput,
      AButton
    },
    mounted() {
      this.model_id = this.$route.params.selectedRows[0].modelId
    },
    methods: {
      changeInput(value){//监听偏移量输入时的变化   只能输输入正整数和负整数
        clearTimeout(this.input_timer)
        this.input_timer = setTimeout(()=>{
          let check= /^(-\d|\d)\d*$/;
          if(value !== ""){
            if(!check.test(value)){
              this.Message.error('偏移量只能是整数');
            }
          }
        },400)
      },
      release(){                                                             //发布
        let data = {
          model_id:this.model_id,
          org_id : this.organization,
          evaluate_type: this.predictType,
          evaluate_period: this.indexCycle,
          threshold_warn:this.valueSet1,
          threshold_critical:this.valueSet2
        }
        model_release(data).then((res) => {
          this.$message({
            message:'发布成功',
            type:'success'
          })
          this.$router.go(-1)
        })
      }
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
