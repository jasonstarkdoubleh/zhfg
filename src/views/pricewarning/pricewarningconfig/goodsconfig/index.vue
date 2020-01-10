<template>
  <div>
    <jtable  :tableData="tableData"
             :columnData="columnData"
             :total = "total"
             :loading="loading"
             :configShow="true"
             :deleteShow="true"
             @on-delete="deleteItem"
             @on-config="handleConfig"
             @pageChange="pageChange"
             v-show="tableShow">

      <!--    商品配置-->
      <div class="flex bgc">
        <div>

          商品类型:&nbsp;
          <el-select v-model="commLevelCode_0" style="width: 180px">
            <el-option
              v-for="(item, index) in goodsTypeOptions"
              :key="index"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>

          商品大类:&nbsp;
          <el-select v-model="commLevelCode_1" style="width: 180px">
            <el-option
              v-for="(item, index) in goodsClassOptions"
              :key="index"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>

          商品名称:&nbsp;
          <el-select v-model="commLevelCode_2" style="width: 180px">
            <el-option
              v-for="item in goodsNameOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div>
          <el-button type="primary" @click="handleSearch(true)">查 询</el-button>
          <el-button type="warning" @click="handleAdd">新 增</el-button>
        </div>
      </div>
    </jtable>

    <div v-show="jtreeShow" style="background: #ffffff;padding: 20px">

      <div class="flex bgc" style="margin-bottom: 20px">
        <div>
          商品类型:&nbsp;
          <el-select v-model="commLevelCode_0" style="width: 180px" :disabled="disabled">
            <el-option
              v-for="(item, index) in goodsTypeOptions"
              :key="index"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>

          商品大类:&nbsp;
          <el-select v-model="commLevelCode_1" style="width: 180px" :disabled="disabled">
            <el-option
              v-for="(item, index) in goodsClassOptions"
              :key="index"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>

          商品名称:&nbsp;
          <el-select v-model="commLevelCode_2" style="width: 180px" :disabled="disabled">
            <el-option
              v-for="item in goodsNameOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div>
          <el-button type="primary" @click="handleSearch(false)">查 询</el-button>
        </div>
      </div>

      <el-table
        :data="tableDataAdd"
        style="width: 100%" border stripe highlight-current-row>
        <el-table-column
          prop="commType"
          label="商品类型">
        </el-table-column>
        <el-table-column
          prop="commClass"
          label="商品大类">
        </el-table-column>
        <el-table-column
          prop="commName"
          label="商品名称">
          <template slot-scope="scope">
            <el-link type="primary" @click="openRow(scope.row)">{{ scope.row.commName }}</el-link>
          </template>
        </el-table-column>
        <el-table-column
          prop="remarks"
          label="备注">
        </el-table-column>
      </el-table>

      <!--      <div style="display: flex;justify-content: flex-end;margin-top: 14px">-->
      <!--        <el-pagination-->
      <!--          @size-change="handleSizeChange"-->
      <!--          @current-change="handleCurrentChange"-->
      <!--          :current-page="currentPage"-->
      <!--          :page-sizes="[10, 20, 30, 40]"-->
      <!--          :page-size="10"-->
      <!--          layout="total, sizes, prev, pager, next, jumper"-->
      <!--          :total="totalSecond">-->
      <!--        </el-pagination>-->
      <!--      </div>-->


      <div style="padding: 24px;margin-top: 10px;background: #ffffff;border-radius: 4px">
        <div class="flex bgc">

          <div>
            规格品:&nbsp;
            <el-select v-model="commLevelCode_3" style="width: 150px" :disabled="disabled">
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
            <el-select v-model="indexId" collapse-tags style="width: 150px">
              <el-option
                v-for="(item, index) in indexIdOptions"
                :key="index"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>

          <div>
            预警类型:&nbsp;
            <el-select v-model="warningType" style="width: 150px">
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
            <el-select v-model="warningName" collapse-tags style="width: 150px">
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
        <el-button style="margin-right: 20px" type="success" @click="subCommit">提 交</el-button>
        <el-button @click="hanleBack" type="warning">退 出</el-button>
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
        confId: '',
        disabled: false,
        totalSecond: 50,
        currentPage: 1,                    //当前页
        pageIndex: 1,
        pageSize: 10,
        warningName: '',
        warningNameOptions: [],
        warningTypeData:[],
        warningType:'',
        warningTypeOptions: [],
        indexId:'',
        indexIdOptions:[],
        tableShow: true,
        commLevelCode_3: '',                         //规格品
        goodsNameOptionsItems:[],
        commLevelCode_2: '',                         //商品名称
        goodsNameOptions:[],
        commLevelCode_1: '',                         //商品大类
        goodsClassOptions:[],
        commLevelCode_0: '',                   //商品类型
        goodsTypeOptions: [],
        columnData: { commType: '商品类型', commClass: '商品大类', commName: '名称', ewarnName:'预警名称', remarks: '备注' },
        tableData: [],
        tableDataAdd: [],
        total:0,
        loading:false,
        jtreeShow:false,
        checked:false,
        getCommTypeData:{}
      }
    },
    methods:{
      handleSizeChange(val) {                             //pageSize 改变时会触发
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {                          //currentPage 改变时会触发
        console.log(`当前页: ${val}`);
      },
      openRow(row) {
        this.commLevelCode_2 = row.commLevelCode_2
      },
      hanleBack(){
        this.tableShow = true
        this.jtreeShow = false
        this.disabled = false
        this.tableDataAdd = []
        this.handleSearch(true)
      },
      subCommit() {
        let data = {}
        if(this.disabled) {
          data = {
            commId: this.commLevelCode_3,
            indexIds: [this.indexId],
            ewarnIds: [this.warningName],
            confId: this.confId
          }
        }else {
          data = {
            commId: this.commLevelCode_3,
            indexIds: [this.indexId],
            ewarnIds: [this.warningName],
          }
        }
        this.confSave(data).then(res => {
          if(res.code === 0) {
            this.$message({
              type:'success',
              message:'提交成功!'
            })
          }
          this.disabled = false
          this.tableShow = true
          this.jtreeShow = false
          this.indexId = ''
          this.warningType = ''
          this.warningName = ''
          this.tableDataAdd = []
          this.handleSearch(true)
        })
      },
      handleAdd() {
        this.tableShow = false
        this.jtreeShow = true
        this.disabled = false
        this.indexId = ''
        this.commLevelCode_3 = ''
        this.warningType = ''
        this.warningName = ''
      },
      handleTrans(val,data) {
        for (let i in val) {
          if(val[i].value === data) {
            return val[i].label
          }
        }
      },
      handleSearch(boo){
        if(boo) {
          let data = {
            "commLevelCode_0": this.commLevelCode_0,
            "commLevelCode_1": this.commLevelCode_1,
            "commLevelCode_2": this.commLevelCode_2,
            "pageIndex": this.pageIndex,
            "pageSize": this.pageSize,
          }
          this.loading = true;
          this.goodsQueryPageList(data).then(res => {
            this.tableData = []
            let data = null
            let num = 0
            if(this.commLevelCode_0) {
              data = res.data.list[0];
              for(let i in data.subCommList) {
                for(let j in data.subCommList[i].subCommList) {
                  for (let m in data.subCommList[i].subCommList[j].subCommList) {
                    this.tableData[num] = {}
                    this.tableData[num].commType = data.commName
                    this.tableData[num].commClass = data.subCommList[i].commName
                    this.tableData[num].commName = data.subCommList[i].subCommList[j].commName
                    this.tableData[num].ewarnName = data.subCommList[i].subCommList[j].subCommList[m].ewarnName
                    this.tableData[num].remarks = data.subCommList[i].subCommList[j].subCommList[m].remarks
                    this.tableData[num].confId = data.subCommList[i].subCommList[j].subCommList[m].confId
                    this.tableData[num].ewarnId = data.subCommList[i].subCommList[j].subCommList[m].ewarnId
                    this.tableData[num].commId = data.subCommList[i].subCommList[j].subCommList[m].commId
                    this.tableData[num].ewarnTypeId = data.subCommList[i].subCommList[j].subCommList[m].ewarnTypeId
                    this.tableData[num].indexId = data.subCommList[i].subCommList[j].subCommList[m].indexId
                    num++
                  }
                }
              }
            }else {
              data = res.data.list[0];
              for(let i in data.subCommList) {
                for(let j in data.subCommList[i].subCommList) {
                  for (let m in data.subCommList[i].subCommList[j].subCommList) {
                    this.tableData[num] = {}
                    this.tableData[num].commType = data.commName
                    this.tableData[num].commClass = data.subCommList[i].commName
                    this.tableData[num].commName = data.subCommList[i].subCommList[j].commName
                    this.tableData[num].ewarnName = data.subCommList[i].subCommList[j].subCommList[m].ewarnName
                    this.tableData[num].remarks = data.subCommList[i].subCommList[j].subCommList[m].remarks
                    this.tableData[num].confId = data.subCommList[i].subCommList[j].subCommList[m].confId
                    this.tableData[num].ewarnId = data.subCommList[i].subCommList[j].subCommList[m].ewarnId
                    this.tableData[num].commId = data.subCommList[i].subCommList[j].subCommList[m].commId
                    this.tableData[num].ewarnTypeId = data.subCommList[i].subCommList[j].subCommList[m].ewarnTypeId
                    this.tableData[num].indexId = data.subCommList[i].subCommList[j].subCommList[m].indexId
                    num++
                  }
                }
              }
              data = res.data.list[1];
              for(let i in data.subCommList) {
                for(let j in data.subCommList[i].subCommList) {
                  for (let m in data.subCommList[i].subCommList[j].subCommList) {
                    this.tableData[num] = {}
                    this.tableData[num].commType = data.commName
                    this.tableData[num].commClass = data.subCommList[i].commName
                    this.tableData[num].commName = data.subCommList[i].subCommList[j].commName
                    this.tableData[num].ewarnName = data.subCommList[i].subCommList[j].subCommList[m].ewarnName
                    this.tableData[num].remarks = data.subCommList[i].subCommList[j].subCommList[m].remarks
                    this.tableData[num].confId = data.subCommList[i].subCommList[j].subCommList[m].confId
                    this.tableData[num].ewarnId = data.subCommList[i].subCommList[j].subCommList[m].ewarnId
                    this.tableData[num].commId = data.subCommList[i].subCommList[j].subCommList[m].commId
                    this.tableData[num].ewarnTypeId = data.subCommList[i].subCommList[j].subCommList[m].ewarnTypeId
                    this.tableData[num].indexId = data.subCommList[i].subCommList[j].subCommList[m].indexId
                    num++
                  }
                }
              }
            }
            this.total = res.data.totalCount;
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
        }
        if(!boo){
          if(this.commLevelCode_2) {
            this.tableDataAdd = []
            this.tableDataAdd[0] = {}
            this.tableDataAdd[0].commType = this.handleTrans(this.goodsTypeOptions, this.commLevelCode_0)
            this.tableDataAdd[0].commClass = this.handleTrans(this.goodsClassOptions, this.commLevelCode_1)
            this.tableDataAdd[0].commName = this.handleTrans(this.goodsNameOptions, this.commLevelCode_2)
            this.tableDataAdd[0].commLevelCode_2 = this.commLevelCode_2
          }
          if(!this.commLevelCode_2 && this.commLevelCode_1) {
            this.tableDataAdd = []
            for (let i in this.goodsNameOptions) {
              this.tableDataAdd[i] = {}
              this.tableDataAdd[i].commType = this.handleTrans(this.goodsTypeOptions, this.commLevelCode_0)
              this.tableDataAdd[i].commClass = this.handleTrans(this.goodsClassOptions, this.commLevelCode_1)
              this.tableDataAdd[i].commName = this.goodsNameOptions[i].label
              this.tableDataAdd[i].commLevelCode_2 = this.goodsNameOptions[i].value
            }
          }
          if(!this.commLevelCode_1 && this.commLevelCode_0) {
            this.tableDataAdd = []
            let num = 0
            for (let i in this.goodsClassOptions) {
              //商品类型值 商品大类值
              let commType = this.handleTrans(this.goodsTypeOptions, this.commLevelCode_0)
              let commClass = this.goodsClassOptions[i].label

              for (let j in this.getCommTypeData.commLevelCode_2) {
                if(this.goodsClassOptions[i].value === this.getCommTypeData.commLevelCode_2[j].parentCode) {
                  this.tableDataAdd[num] = {}
                  this.tableDataAdd[num].commType = commType
                  this.tableDataAdd[num].commClass = commClass
                  this.tableDataAdd[num].commName = this.getCommTypeData.commLevelCode_2[j].commName
                  this.tableDataAdd[num].commLevelCode_2 = this.getCommTypeData.commLevelCode_2[j].commId
                  num++
                }
              }
            }
          }

          if(!this.commLevelCode_0) {
            this.tableDataAdd = []
            // for (let i in this.goodsTypeOptions) {
            //     if(this.goodsTypeOptions[i].label !== '全部') {
            //         this.tableDataAdd[i] = {}
            //         this.tableDataAdd[i].commType = this.goodsTypeOptions[i].label
            //     }
            // }
            let num = 0
            for (let i in this.getCommTypeData.commLevelCode_1) {
              //商品类型值 商品大类值
              let commType = ''
              if(this.getCommTypeData.commLevelCode_1[i].parentCode === 1) {
                commType = '大宗商品'
              }else {
                commType = '民生商品'
              }

              let commClass = this.getCommTypeData.commLevelCode_1[i].commName

              for (let j in this.getCommTypeData.commLevelCode_2) {
                if(this.getCommTypeData.commLevelCode_1[i].commId === this.getCommTypeData.commLevelCode_2[j].parentCode) {
                  this.tableDataAdd[num] = {}
                  this.tableDataAdd[num].commType = commType
                  this.tableDataAdd[num].commClass = commClass
                  this.tableDataAdd[num].commName = this.getCommTypeData.commLevelCode_2[j].commName
                  this.tableDataAdd[num].commLevelCode_2 = this.getCommTypeData.commLevelCode_2[j].commId
                  num++
                }
              }
            }
          }
        }
      },
      handleSearchAll() {
        this.queryAll().then(res => {
          console.log(res)
        })
      },
      pageChange(size,page) {
        this.pageSize = size
        this.pageIndex = page
        this.handleSearch(true)
      },
      deleteItem(row){
        this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteGoods(row.confId).then(res => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            for(let i in this.tableData) {
              if(this.tableData[i].confId === row.confId) {
                this.tableData.splice(i,1)
              }
            }
          })
        })
      },
      handleConfig(data){
        this.disabled = true
        for(let i in this.goodsTypeOptions) {
          if(this.goodsTypeOptions[i].label === data.row.commType) {
            this.commLevelCode_0 = this.goodsTypeOptions[i].value
          }
        }
        this.$nextTick(() => {
          for(let i in this.goodsClassOptions) {
            if(this.goodsClassOptions[i].label === data.row.commClass) {
              this.commLevelCode_1 = this.goodsClassOptions[i].value
            }
          }
          this.$nextTick(() => {
            for(let i in this.goodsNameOptions) {
              if(this.goodsNameOptions[i].label === data.row.commName) {
                this.commLevelCode_2 = this.goodsNameOptions[i].value
              }
            }
            this.$nextTick(() => {
              this.commLevelCode_3 = data.row.commId
              this.confId = data.row.confId
              this.warningType = data.row.ewarnTypeId
              this.$nextTick(() => {
                this.warningName = parseInt(data.row.ewarnId)
                this.wpbaseindexinfo(this.commLevelCode_3).then(res => {
                  this.indexIdOptions = []
                  for (let i in res.data){
                    this.indexIdOptions[i] = {}
                    this.indexIdOptions[i].label = res.data[i].indexName
                    this.indexIdOptions[i].value = res.data[i].indexId
                  }
                  this.indexId = data.row.indexId
                })
              })
            })
          })
        })
        this.tableShow = false
        this.jtreeShow = true
      },
      ...mapActions([
        'getCommType',
        'goodsQueryPageList',
        'wpbaseindexinfo',
        'queryAll',
        'warnType',
        'confSave',
        'deleteGoods'
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
              this.warningNameOptions[j].value = data[j].ewarnId
              this.warningNameOptions[j].label = data[j].ewarnName
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
        this.indexId = ''
        if(val) {
          this.wpbaseindexinfo(val).then(res => {
            this.indexIdOptions = []
            for (let i in res.data){
              this.indexIdOptions[i] = {}
              this.indexIdOptions[i].label = res.data[i].indexName
              this.indexIdOptions[i].value = res.data[i].indexId
            }
          })
        }
      }

    },
    created() {
      //查询商品类型
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

      //查询预警类型
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
