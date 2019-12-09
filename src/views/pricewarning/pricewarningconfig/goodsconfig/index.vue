<template>
  <div>
    <jtable  :tableData="tableData"
             :columnData="columnData"
             :total = "total"
             :loading="loading"
             :configShow="true"
             @on-config="searchConfig"
             v-show="tableShow">

      <!--    商品配置-->
      <div class="flex bgc">
        <div>

          商品类型:&nbsp;
          <el-select v-model="commLevelCode_0">
            <el-option
              v-for="(item, index) in goodsTypeOptions"
              :key="index"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>

          商品大类:&nbsp;
          <el-select v-model="commLevelCode_1">
            <el-option
              v-for="(item, index) in goodsClassOptions"
              :key="index"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>

          商品名称:&nbsp;
          <el-select v-model="commLevelCode_2">
            <el-option
              v-for="item in goodsNameOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div>
          <el-button type="primary" @click="handleSearch">查 询</el-button>
          <el-button type="warning" @click="handleAdd">新 增</el-button>
        </div>
      </div>
    </jtable>

    <div v-show="jtreeShow">
      <jtable  :tableData="tableData"
               :columnData="columnDataTree"
               :total = "total"
               :loading="loading">

        <!--    商品配置-->
        <div class="flex bgc">
          <div>

            商品类型:&nbsp;
            <el-select v-model="commLevelCode_0">
              <el-option
                v-for="(item, index) in goodsTypeOptions"
                :key="index"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>

            商品大类:&nbsp;
            <el-select v-model="commLevelCode_1">
              <el-option
                v-for="(item, index) in goodsClassOptions"
                :key="index"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>

            商品名称:&nbsp;
            <el-select v-model="commLevelCode_2">
              <el-option
                v-for="item in goodsNameOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div>
            <el-button type="primary" @click="handleSearch">查 询</el-button>
          </div>
        </div>

      </jtable>

      <div style="padding: 24px;margin-top: 10px;background: #ffffff;border-radius: 4px">
        <div class="flex bgc">

          <div>
            规格品:&nbsp;
            <el-select v-model="commLevelCode_3">
              <el-option
                v-for="(item, index) in goodsNameOptionsItems"
                :key="index"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>

          <div>
            价格类型:&nbsp;
            <el-select v-model="priceType">
              <el-option
                v-for="(item, index) in priceTypeOptions"
                :key="index"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>

          <div>
            预警类型:&nbsp;
            <el-select v-model="warningType">
              <el-option
                v-for="(item, index) in warningTypeOptions"
                :key="index"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>

          <div>
            预警名称:&nbsp;
            <el-select v-model="warningName">
              <el-option
                v-for="(item, index) in warningNameOptions"
                :key="index"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>

        </div>
      </div>


      <div style="width: 80%;margin-left: 10%;display: flex;justify-content: center;margin-top: 20px">
        <el-button style="margin-right: 20px" type="success">提 交</el-button>
        <el-button @click="hanleCloseJtree" type="warning">退 出</el-button>
      </div>
    </div>

  </div>
</template>

<script>
    import jtable from '_c/Jtable'
    import { mapActions } from 'vuex'
    export default {
        components: {
            jtable,
        },
        data() {
            return {
                warningName: '',
                warningNameOptions: [],
                warningTypeData:[],
                warningType:'',
                warningTypeOptions: [],
                priceType:'',
                priceTypeOptions:[],
                tableShow: true,
                commLevelCode_3: '',                         //商品四级
                goodsNameOptionsItems:[],
                commLevelCode_2: '',                         //商品名称
                goodsNameOptions:[],
                commLevelCode_1: '',                         //商品大类
                goodsClassOptions:[],
                commLevelCode_0: '',                   //商品类型
                goodsTypeOptions: [],
                columnData: { commType: '商品类型', commClass: '商品大类', commName: '名称', ewarnName:'预警名称', remarks: '备注' },
                columnDataTree: { commType: '商品类型', commClass: '商品大类', commName: '名称', remarks: '备注' },
                tableData: [],
                total:0,
                loading:false,
                jtreeShow:false,
                checked:false,
                getCommTypeData:{}
            }
        },
        methods:{
            handleAdd() {
                this.tableShow = false
                this.jtreeShow = true
                this.commLevelCode_0 = ''
                this.tableData = []
            },
            hanleCloseJtree(){
                this.tableShow = true
                this.jtreeShow = false
                this.commLevelCode_0 = ''
                this.tableData = []
            },
            handleSearch(){
                let data = {
                    "commLevelCode_0": this.commLevelCode_0,
                    "commLevelCode_1": this.commLevelCode_1,
                    "commLevelCode_2": this.commLevelCode_2,
                    "pageIndex": 1,
                    "pageSize": 10,
                    "start": 0
                }
                this.loading = true;
                this.goodsQueryPageList(data).then(res => {
                    if(this.commLevelCode_0) {
                        this.tableData = res.data.list[0].subCommList;
                    }else {
                        let data = res.data.list[0].dazong.subCommList
                        data.concat(res.data.list[0].minsheng.subCommList)
                        this.tableData = data;
                    }

                    console.log(this.tableData)
                    let commType = ''
                    let commClass = ''
                    for(let i in this.goodsTypeOptions){
                        if(this.goodsTypeOptions[i].value === this.commLevelCode_0) {
                            commType = this.goodsTypeOptions[i].label
                            break
                        }
                    }
                    for(let i in this.goodsClassOptions) {
                        if(this.goodsClassOptions[i].value === this.commLevelCode_1) {
                            commClass = this.goodsClassOptions[i].label
                            break
                        }
                    }
                    for(let i in this.tableData) {
                        this.tableData[i].commType = commType
                        this.tableData[i].commClass = commClass
                    }
                    this.total = res.data.totalCount;
                    this.loading = false
                }).catch(() => {
                    this.loading = false
                })
            },
            searchConfig(){
                this.tableShow = false
                this.jtreeShow = true
            },
            ...mapActions([
                'getCommType',
                'goodsQueryPageList',
                'wpbaseindexinfo',
                'queryAll',
                'warnType'
            ])
        },
        watch:{
            warningType(newVal,oldVal){
                this.warningName = '';
                if(newVal === ''){
                    this.warningNameOptions = []
                    return;
                }
                for (let i in this.warningTypeData){
                    if(this.warningTypeData[i].codeId === newVal){
                        let data = this.warningTypeData[i].ewarnNamelist;
                        this.warningNameOptions = [];
                        for(let j in data){
                            this.warningNameOptions[j] = {};
                            this.warningNameOptions[j].value = this.warningNameOptions[j].label = data[j].ewarnName;
                            this.warningNameOptions[j].ewarnTypeId = data[j].ewarnTypeId
                            this.warningNameOptions[j].ewarnId = data[j].ewarnId
                        }
                        break
                    }
                }
            },
            commLevelCode_0(val) {
                this.goodsClassOptions = [];
                this.commLevelCode_1 = ''
                let num = 0
                if (val) {
                    for (let i in this.getCommTypeData.commLevelCode_1){
                        if(this.getCommTypeData.commLevelCode_1[i].parentCode === val){
                            this.goodsClassOptions[num] = {}
                            this.goodsClassOptions[num].value = this.getCommTypeData.commLevelCode_1[i].commId
                            this.goodsClassOptions[num].label = this.getCommTypeData.commLevelCode_1[i].commName
                            num++
                        }
                    }
                }
            },
            commLevelCode_1(val) {
                this.goodsNameOptions = []
                this.commLevelCode_2 = ''
                let num = 0
                if(val){
                    for (let i in this.getCommTypeData.commLevelCode_2){
                        if(this.getCommTypeData.commLevelCode_2[i].parentCode === val){
                            this.goodsNameOptions[num] = {}
                            this.goodsNameOptions[num].value = this.getCommTypeData.commLevelCode_2[i].commId
                            this.goodsNameOptions[num].label = this.getCommTypeData.commLevelCode_2[i].commName
                            num++
                        }
                    }
                }
            },

            commLevelCode_2(val) {
                this.goodsNameOptionsItems = []
                this.commLevelCode_3 = ''
                let num = 0
                if(val){
                    for (let i in this.getCommTypeData.commLevelCode_3){
                        if(this.getCommTypeData.commLevelCode_3[i].parentCode === val){
                            this.goodsNameOptionsItems[num] = {}
                            this.goodsNameOptionsItems[num].value = this.getCommTypeData.commLevelCode_3[i].commId
                            this.goodsNameOptionsItems[num].label = this.getCommTypeData.commLevelCode_3[i].commName
                            num++
                        }
                    }
                }
            },

            commLevelCode_3(val) {
                this.wpbaseindexinfo(val).then(res => {
                    this.priceTypeOptions = []
                    for (let i in res.data){
                        this.priceTypeOptions[i] = {}
                        this.priceTypeOptions[i].label = res.data[i].indexName
                        this.priceTypeOptions[i].value = res.data[i].indexId
                    }
                })
            }

        },
        created() {
            this.getCommType().then(res => {
                this.getCommTypeData = {};
                this.getCommTypeData = res.data;
                this.commLevelCode_0 = ''
                this.goodsTypeOptions = [];
                for(let i in this.getCommTypeData.commLevelCode_0){
                    this.goodsTypeOptions[i] = {};
                    this.goodsTypeOptions[i].value  = this.getCommTypeData.commLevelCode_0[i].commId;
                    this.goodsTypeOptions[i].label  = this.getCommTypeData.commLevelCode_0[i].commName
                }
                this.goodsTypeOptions.unshift({label: '全部', value: ''})
            })
            this.warnType(3).then(res => {
                this.warningTypeData = res.data;
                this.warningTypeOptions = [];
                for (let i in this.warningTypeData) {
                    this.warningTypeOptions[i] = {};
                    this.warningTypeOptions[i].label = this.warningTypeData[i].codeName;
                    this.warningTypeOptions[i].value = this.warningTypeData[i].codeId
                }
            })
        }

    }
</script>

<style>
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
</style>
