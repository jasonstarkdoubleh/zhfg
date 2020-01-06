<template>
  <div>
    <div>
      <a-tabs defaultActiveKey="1" tabPosition="left">
        <a-tab-pane tab="填补缺失值" key="1">
          <div class="left10">
            <div>
              <div style="display: inline-block;text-indent: 1em">
                <span>数据项：</span>
              </div>
              <a-select mode="multiple" :maxTagCount="0"
                        v-model="standartParam"
                        style="width:220px"
                        placeholder="请选择">
                <a-select-option :key="key" v-for="(value,key) in selectDataItem"
                                 :value="value">{{ value }}
                </a-select-option>
              </a-select>
              <a-button class="left10" type="primary" @click="saveDataFilter(1)">保存</a-button>
            </div>
            <div class="top20">
              <span>填补方法：</span>
              <a-select :maxTagCount="0"
                        v-model="fillGo"
                        style="width:220px"
                        placeholder="请选择">
                <a-select-option :key="key" v-for="(value,key) in fillMethods"
                                 :value="value">{{ value }}
                </a-select-option>
              </a-select>
            </div>
          </div>
        </a-tab-pane>

        <a-tab-pane tab="增加日期特征" key="2">
            <div>
              <span>添加日期特征：</span>
              <a-select :maxTagCount="0"
                        v-model="dateGood"
                        style="width:202px"
                        placeholder="请选择">
                <a-select-option :key="key" v-for="(value,key) in dateGoodOptions"
                                 :value="value">{{ value }}
                </a-select-option>
              </a-select>
              <a-button class="left10" type="primary" @click="saveDataFilter(2)">保存</a-button>
            </div>
        </a-tab-pane>

        <a-tab-pane tab="滞后变量" key="3">
          <div class="left10">
            <div>
              <span>数据项：</span>
              <a-select mode="multiple" :maxTagCount="0"
                        style="width:220px"
                        placeholder="请选择">
                <a-select-option :key="key" v-for="(value,key) in selectDataItem"
                                 :value="value">{{ value }}
                </a-select-option>
              </a-select>
              <a-button type="primary" style="margin-left: 30px" @click="saveDataFilter(3)">保存</a-button>
            </div>
            <div class="top20">
              <span>滞后期：</span>
              <a-input style="width: 120px" v-model="lag_datetime"></a-input>
              <span class="left20">单位：</span>
              <a-select style="width:130px" placeholder="请选择" v-model="unit">
                <a-select-option :key="item.name" v-for="item in unitList"
                                 :value="item.val">{{ item.name }}
                </a-select-option>
              </a-select>
            </div>
          </div>
        </a-tab-pane>
      </a-tabs>
    </div>
    <a-modal title="参数保存" v-model="visible" :maskClosable="false">
      <a-form class="modal-form" label-width="20%">
        <a-form-item label="数据集名称">
          <a-input v-model="dataset_name" auto-complete="off"></a-input>
        </a-form-item>
        <a-form-item label="说明">
          <a-textarea v-model="description" auto-complete="off"></a-textarea>
        </a-form-item>
      </a-form>
      <div slot="footer" class="dialog-footer">
        <a-button type="primary" @click="saverModelParam">确 定</a-button>
        <a-button @click="visible = false">取 消</a-button>
      </div>
    </a-modal>
  </div>

  <!--<div style="height: 50px"></div>-->
</template>

<script>
  import {dataset_fill,get_columns,add_data_feature,lag_data} from '@/api/manager'
  import WorkMain from '@/models/public/WorkMain'
  import {required} from 'vuelidate/lib/validators'
  import "@/styles/general.scss"
  import AInput from "ant-design-vue/es/input/Input";
  import AButton from "ant-design-vue/es/button/button";
  import ATextarea from "ant-design-vue/es/input/TextArea";
  import AModal from "ant-design-vue/es/modal/Modal";

  export default {
    name: 'dataFill',
    data() {
      return {
        lag_datetime:'',
        unit:'',
        indexCount:1,
        dateGood:'',
        dateGoodOptions:[ "month","day_of_month","day_of_week","week_of_month",'day_of_year',"week_of_year","is_weekend",'quarter'],
        standartParam:[],
        fillGo:'bfill',
        fillMethods:["linear","bfill","pad"],
        dataset_name:'',
        description:'',
        visible:false,
        selectDataItem:[],
        dataset_id:'',
        unitList: [{
          name: '日',
          val: 'day',
        },{
          name: '周',
          val: 'week',
        },{
          name: '月',
          val: 'month',
        },{
          name: '季',
          val: 'quarter',
        },{
          name: '年',
          val: 'year',
        },],
      }
    },
    props: ['targetParam'],
    validations: {},
    components: {
      AModal,
      ATextarea,
      AButton,
      AInput,
      WorkMain
    },
    watch: {
      targetParam (val) {
        this.dataset_id = val.dataSetId;
        let data = {dataset_id:val.dataSetId}
        get_columns(data).then(response => {
          this.selectDataItem = response.data;
        })
      }
    },
    methods: {
      saveDataFilter(num){
        this.visible = true
        this.indexCount = num
      },
      saverModelParam(){
        if(this.indexCount === 1) {
          let data = {
            "dataset_id":this.dataset_id,
            "fill_type":this.fillGo,
            "fill_value":null,
            "dataset_name":this.dataset_name,
            "description":this.description
          }
          dataset_fill(data).then(res=>{
            this.visible = false
            this.$message({
              message:'保存成功',
              type:'success'
            })
            this.dataset_name = ''
            this.description = ''
          })
        } else if(this.indexCount === 2){
          let data = {
            "dataset_id":this.dataset_id,
            "data_characteristic":this.dateGood,
            "dataset_name":this.dataset_name,
            "description":this.description
          }
          add_data_feature(data).then(res=>{
            this.visible = false
            this.$message({
              message:'保存成功',
              type:'success'
            })
            this.dataset_name = ''
            this.description = ''
          })
        }else if(this.indexCount === 3){
          let data = {
            "dataset_id":this.dataset_id,
            "lag_data_item":this.standartParam,
            "dataset_name":this.dataset_name,
            "description":this.description,
            "lag_datetime":this.lag_datetime,
            "unit":this.unit
          }
          lag_data(data).then(res=>{
            this.visible = false
            this.$message({
              message:'保存成功',
              type:'success'
            })
            this.dataset_name = ''
            this.description = ''
          })
        }
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
