<template>
  <div>
    <jtable  :tableData="tableData"
             :columnData="columnData"
             :total = "total"
             :loading="loading"
             :configShow="true"
             :warningShow="true"
             @on-config="searchConfig">

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

    <el-dialog :visible.sync="jtreeShow" fullscreen>
      <div style="width: 80%;margin-left: 10%;">
          <el-card style="width: 80%;margin-left: 10%;margin-bottom: 20px">
            <div slot="header" class="clearfix">
              <span>预警设置</span>
            </div>
            <div>
              <jtree></jtree>
            </div>
          </el-card>
        <div style="width: 80%;margin-left: 10%;">
          <el-checkbox v-model="checked">
            <span>该类商品下所有子类均按此设置</span>
          </el-checkbox>
        </div>
        <div style="width: 80%;margin-left: 10%;display: flex;justify-content: center;margin-top: 20px">
          <el-button style="margin-right: 20px" type="success">提 交</el-button>
          <el-button @click="jtreeShow = false" type="warning">退 出</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
    import jtable from '_c/Jtable'
    import jtree from '_c/Jtree'
    import { mapActions } from 'vuex'
    export default {
        name: 'Goodsconfig',
        components: {
            jtable,
            jtree
        },
        data() {
            return {
                commLevelCode_2: '',                         //商品名称
                goodsNameOptions:[],
                commLevelCode_1: '',                         //商品大类
                goodsClassOptions:[],
                commLevelCode_0: '',                   //商品类型
                goodsTypeOptions: [],
                columnData: { commAbb: '商品类型', commName: '名称', createName: '创建人', createTime: '创建时间', remarks: '备注' },
                tableData: [],
                total:0,
                loading:false,
                jtreeShow:false,
                checked:false,
                getCommTypeData:{}
            }
        },
        methods:{
            handleSearch(){
                let data = {
                    "commLevelCode_0": this.commLevelCode_0,
                    "commLevelCode_1": this.commLevelCode_1,
                    "commLevelCode_2": this.commLevelCode_2,
                    "pageIndex": 0,
                    "pageSize": 0,
                    "start": 0
                }
                this.loading = true;
                this.goodsQueryPageList(data).then(res => {
                    console.log(res)
                    this.tableData = res.data.list;
                    this.total = res.data.totalCount;
                    this.loading = false
                }).catch(() => {
                    this.loading = false
                })
            },
            searchConfig(data){
                this.jtreeShow = data
            },
            ...mapActions([
                'getCommType',
                'goodsQueryPageList',
            ])
        },
        watch:{
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
            }
        },
        created() {
            this.getCommType().then(res => {
                console.log(res,123);
                console.log(res.data.commLevelCode_0);
                this.getCommTypeData = {};
                this.getCommTypeData = res.data;
                this.commLevelCode_0 = ''
                this.goodsTypeOptions = [];
                for(let i in this.getCommTypeData.commLevelCode_0){
                    this.goodsTypeOptions[i] = {};
                    this.goodsTypeOptions[i].value  = this.getCommTypeData.commLevelCode_0[i].commId;
                    this.goodsTypeOptions[i].label  = this.getCommTypeData.commLevelCode_0[i].commName
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
