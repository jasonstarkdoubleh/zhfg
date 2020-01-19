<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="数据展示" name="first">
        <jtable
          :tableData="tableData"
          :columnData="columnData"
          :searchShow="true"
          :deleteShow="true"
          @pageChange="pageChange"
          @on-delete="hanleDelete"
          @on-detail="handleDetail"
          :total="total">

          <div class="flex bgc">
            <div>
              分析名称:&nbsp;
              <el-input style="width: 180px;margin-right: 20px" v-model="cor.analyName"></el-input>

              分析类型:&nbsp;
              <el-select v-model="cor.analyWay" style="margin-right: 20px">
                <el-option
                  v-for="item in analyWayOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>

              数据集名称:&nbsp;
              <el-select v-model="cor.datasetId" style="margin-right: 20px">
                <el-option
                  v-for="item in dataNameOptions"
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
      </el-tab-pane>

      <el-tab-pane label="一般相关性分析" name="second">
        <div v-show="headShow" style="background: #ffffff;padding: 10px">
          <div style="">
            <div class="flex">
              <h3 style="color: #3a8ee6;padding-right: 5px">一般相关性分析</h3><div style="flex-grow:1;background: #3a8ee6;height: 3px;width: 100px"></div>
            </div>
            <div class="flex bgc">
                <div>
                  数据集:&nbsp;
                  <el-select v-model="formInline.dataSetId" style="width: 150px;margin-right: 20px">
                    <el-option
                      v-for="(item, index) in dataNameOptions"
                      :key="index"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </div>
                <div>
                  变量选择:&nbsp;
                  <el-select
                    v-model="indeVar"
                    style="width: 150px;margin-right: 20px"
                    multiple
                    collapse-tags>

                    <el-option-group
                      v-for="group in dataNameOptionsCopy"
                      :key="group.label"
                      :label="group.label">
                      <el-option
                        v-for="item in group.options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-option-group>

                  </el-select>
                </div>
                <div>
                  分析名称:&nbsp;
                  <el-input v-model="formInline.analyName" style="width: 150px;margin-right: 20px"></el-input>
                </div>
                <div>
                  分析描述:&nbsp;
                  <el-input v-model="formInline.remark" style="width: 150px;margin-right: 20px"></el-input>
                </div>
                <el-button type="primary" @click="runTime(true)">运 行</el-button>
            </div>
          </div>
        </div>
      </el-tab-pane>

      <el-tab-pane label="偏相关性分析" name="third">
        <div v-show="headShow" style="background: #ffffff;padding: 10px">
          <div style="">
            <div class="flex">
              <h3 style="color: #3a8ee6;padding-right: 5px">一般相关性分析</h3><div style="flex-grow:1;background: #3a8ee6;height: 3px;width: 100px"></div>
            </div>
            <div class="flex bgc">
              <div>
                数据集:&nbsp;
                <el-select v-model="formInline.dataSetId" style="width: 150px;margin-right: 20px">
                  <el-option
                    v-for="(item, index) in dataNameOptions"
                    :key="index"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                </div>
              <div>
                变量选择:&nbsp;
                <el-select
                  v-model="indeVar"
                  style="width: 150px;margin-right: 20px"
                  multiple
                  collapse-tags>
                  <el-option-group
                    v-for="group in dataNameOptionsCopy"
                    :key="group.label"
                    :label="group.label">
                    <el-option
                      v-for="item in group.options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-option-group>
                </el-select>
              </div>
              <div>
                分析名称:&nbsp;
                <el-input v-model="formInline.analyName" style="width: 150px;margin-right: 20px"></el-input>
              </div>
              <div>
                分析描述:&nbsp;
                <el-input v-model="formInline.remark" style="width: 150px;margin-right: 20px"></el-input>
              </div>
              <div>
                <el-button type="primary" @click="runTime(false)">运 行</el-button>
                <el-button @click="reSet()">重 置</el-button>
              </div>

            </div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>

    <div v-show="correShow" v-loading="correLoading">
      <div style="margin-top: 10px;background: #ffffff;padding: 10px" >
        <div class="flex">
          <h3 style="color: #3a8ee6;padding-right: 5px">相关性图</h3>
          <div style="flex-grow:1;background: #3a8ee6;height: 3px;width: 100px"></div>
        </div>
        <div style="height: 500px;box-sizing: border-box;border: 1px solid #f0f0f1">
          <div id="cookTble" style="width: 70%;height: 400px;margin: 50px auto 0"></div>
        </div>

      </div>
      <div style="margin-top: 10px;background: #ffffff;padding: 10px">
        <div class="flex-justify bgc" style="align-items: center;background: #eeeeee">
          <div>
            <h3 style="display: inline-block;margin-right: 60px;margin-top: 10px">相关性表</h3>
          </div>

          <div>
<!--            查找变量:&nbsp;-->
<!--            <el-select v-model="searchQuantity" placeholder="请选择" style="margin-right: 20px">-->
<!--              <el-option-->
<!--                v-for="item in options"-->
<!--                :key="item.value"-->
<!--                :label="item.label"-->
<!--                :value="item.value">-->
<!--              </el-option>-->
<!--            </el-select>-->
<!--            <el-button type="primary">下载表格</el-button>-->
          </div>
        </div>

        <div style="margin-top: 5px">
          <el-table id="QUANTITY"
                    :data="dialogTableData"
                    max-height="600"
                    border
                    stripe>

            <!--                列-->
            <el-table-column label="" align="center" prop="row" width="200"></el-table-column>

            <el-table-column v-for="(item,index) in dialogTableData" :label="item.row" :key="index" align="center">
              <el-table-column :property="dataObj[index][0]" label="相关系数" align="center"></el-table-column>
              <el-table-column :property="dataObj[index][1]" label="Pvalue" align="center"></el-table-column>
            </el-table-column>

          </el-table>
        </div>
      </div>
      <div style="display: flex;justify-content: center;margin-top: 10px" v-show="!headShow">
        <el-button type="primary" @click="handleReturn">返 回</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import jtable from '_c/Jtable'
  import { mapActions } from 'vuex'
  import {getAsciiByCode,deleteAnalyId,pssanalyreltDetail} from '@/api/manager'
  export default {
    data(){
      return {
        pageIndex: 1,
        pageSize: 10,
        headShow:true,
        cor:{
          analyName:'',
          analyWay:'',
          datasetId:''
        },
        correShow:false,
        correLoading:false,
        activeName: 'first',
        dataName: '',
        dataNameOptions: [],
        dataNameOptionsCopy: [],
        analyWayOptions: [],
        total: 0,
        tableData: [],
        columnData: {
          dataSetName:'数据集名称',
          analyName:'分析名称',
          analyWay:'分析类型',
          runTime:'运行时间'
        },
        dataObj:[],
        dialogTableData: [],
        formInline: {
          dataSetId: '',
          indeVar: {date_feature:[],macro_table:[],comm_table:[]},
          analyName: '',
          remark: ''
        },
        indeVar:[],
        indeVarOptions:'',
        formInlineCopy:{},
        options: [{
          value: '选项1',
          label: '全部'
        }, {
          value: '选项2',
          label: '国民生产总值'
        }, {
          value: '选项3',
          label: '居民消费价格指数'
        }, {
          value: '选项4',
          label: '工业品价格出厂指数'
        }, {
          value: '选项5',
          label: '采购经理人指数'
        },{
          value: '选项6',
          label: '企业商品价格指数'
        },{
          value: '选项7',
          label: '消费者信息指数'
        },{
          value: '选项8',
          label: '社会消费品零售总额'
        }],
        searchQuantity:'',
        selcetData:[]
      }
    },
    components:{
      jtable
    },
    watch: {
      activeName(val){
        if(val === 'first'){
          this.correShow = false
          this.headShow = true
        }
      },
      dataSetId(val) {
        this.dataNameOptionsCopy = []
        this.indeVar = []
        let num = 0
        for(let i in this.selcetData) {
          if ( this.selcetData[i].dataSetId === val) {
            let indeVar = JSON.parse(this.selcetData[i].indeVar)
            let indeName = JSON.parse(this.selcetData[i].indeName)
            this.indeVarOptions = indeVar
            Object.keys(indeVar).forEach(key => {
              if(key !== "date_feature") {
                this.dataNameOptionsCopy[num] = {}
                this.dataNameOptionsCopy[num].label = key
                this.dataNameOptionsCopy[num].options = []
                indeVar[key].forEach((item, index) => {
                  this.dataNameOptionsCopy[num].options[index] = {}
                  this.dataNameOptionsCopy[num].options[index].label = indeName[key][index]
                  this.dataNameOptionsCopy[num].options[index].value = item
                })
                num++
              }
            })
            this.dataNameOptionsCopy.forEach(item => {
              if(item.label === "comm_table") {
                item.label = '基础指标'
              }
              if(item.label === "macro_table") {
                item.label = '宏观指标'
              }
            })
            break
          }
        }
      }
    },
    computed: {
      dataSetId() {
        return this.formInline.dataSetId
      }
    },
    methods: {
      pageChange(size,page) {
        this.pageSize = size
        this.pageIndex = page
        this.handleSearch()
      },
      handleReturn(){
        this.activeName = "first"
      },
      handleDetail(data){
        pssanalyreltDetail(data.row.analyId).then(res=>{
          if(data.row.analyWay === "一般相关性分析"){
            this.activeName = 'second'
          }
          if(data.row.analyWay === "偏相关性分析"){
            this.activeName = 'third'
          }
          if(data.row.analyWay === "一般相关性分析" || data.row.analyWay === "偏相关性分析"){
            this.headShow = false
            let coe = JSON.parse(res.data.analyCoe)
            let pva = JSON.parse(res.data.pvalue)
            this.dialogTableData = []
            this.dataObj = []
            coe.forEach((item,index)=>{
              this.dialogTableData[index] = {}
              this.dialogTableData[index].row = item._row
              Object.keys(item).forEach(key=>{
                if(key!=='_row'){
                  this.dialogTableData[index][`${key}_coe`] = item[key]
                }
              })
            })
            pva.forEach((item,index)=>{
              this.dialogTableData.forEach((val,i)=>{
                if(item._row === val.row){
                  Object.keys(item).forEach(key=>{
                    if(key!=='_row'){
                      this.dialogTableData[i][`${key}_pva`] = item[key]
                    }
                  })
                }
              })
            })
            Object.keys(coe[0]).forEach(key=>{
              if(key!=='_row') {
                this.dataObj.push([`${key}_coe`, `${key}_pva`])
              }
            })
            this.correShow = true
            this.$nextTick(()=>{
              this.drawCook(coe)
            })
          }
        })
      },
      hanleDelete(data){
        this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteAnalyId(data.analyId).then(res=>{
            this.$message({
              message:'删除成功',
              type:'success'
            })
            this.handleSearch()
          })
        })
      },
      runTime(data) {
        if(data){
          this.formInline.analyWay = "一般相关性分析"
        }else {
          this.formInline.analyWay = "偏相关性分析"
        }
        this.formInline.bussType = 1
        Object.keys(this.formInline.indeVar).forEach(key => {
          this.formInline.indeVar[key] = []
        })
        this.indeVar.forEach(item => {
          let boo = false
          this.indeVarOptions.comm_table.forEach(value => {
            if(item === value) {
              boo = true
            }
          })
          if(boo) {
            this.formInline.indeVar.comm_table.push(item)
          }else {
            this.formInline.indeVar.macro_table.push(item)
          }
        })
        this.formInline.indeVar = JSON.stringify(this.formInline.indeVar)
        this.correShow = true
        this.correLoading = true
        this.runGeneral(this.formInline).then(res => {
          this.correLoading = false
          this.formInline.indeVar = JSON.parse(this.formInline.indeVar)

          if(res.data) {
            let coe = res.data.coe
            let pva = res.data.pva
            this.dialogTableData = []
            this.dataObj = []
            coe.forEach((item,index)=>{
              this.dialogTableData[index] = {}
              this.dialogTableData[index].row = item._row
              Object.keys(item).forEach(key=>{
                if(key!=='_row'){
                  this.dialogTableData[index][`${key}_coe`] = item[key]
                }
              })
            })
            pva.forEach((item,index)=>{
              this.dialogTableData.forEach((val,i)=>{
                if(item._row === val.row){
                  Object.keys(item).forEach(key=>{
                    if(key!=='_row'){
                      this.dialogTableData[i][`${key}_pva`] = item[key]
                    }
                  })
                }
              })
            })
            Object.keys(coe[0]).forEach(key=>{
              if(key!=='_row') {
                this.dataObj.push([`${key}_coe`, `${key}_pva`])
              }
            })
            this.$nextTick(()=>{
              this.drawCook(coe)
            })
          }else {
            this.$nextTick(()=>{
              this.drawCook([])
            })
          }
        })
      },
      handleSearch() {
        let data = {}
        data = Object.assign({},this.cor)
        data.bussType = 1
        data.pageIndex = this.pageIndex
        data.pageSize = this.pageSize
        this.pssanalyinfoList(data).then(res => {
          this.tableData = res.page.list
          this.total = res.page.totalCount
        })
      },
      getPageAll() {
        this.bussType(1).then(res=>{
          this.analyWayOptions = []
          for (let i in res.data) {
            this.analyWayOptions[i] = {}
            this.analyWayOptions[i].label = res.data[i].analyWay
            this.analyWayOptions[i].value = res.data[i].analyWay
          }
        })
        this.listAll().then(res => {
          this.selcetData = res.list
          this.dataNameOptions = []
          for(let i in this.selcetData) {
            this.dataNameOptions[i] = {}
            this.dataNameOptions[i].label = this.selcetData[i].dataSetName
            this.dataNameOptions[i].value = this.selcetData[i].dataSetId
          }
        })
      },
      ...mapActions([
        'listAll',
        'pssanalyinfoList',
        'runGeneral',
        'bussType'
      ]),
      handleClick(tab, event) {
        this.headShow = true
        this.correShow = false
        this.indeVar = []
        this.formInline = JSON.parse(JSON.stringify(this.formInlineCopy))
        Object.keys(this.formInline.indeVar).forEach(key => {
          this.formInline.indeVar[key] = []
        })
        this.dialogTableData = []
        this.dataObj = []
      },
      drawCook(data){
        let dataName = []
        let dataLink = []
        let num = 0
        data.forEach((item,index)=>{
          dataName[index]={}
          dataName[index].name = item._row
          Object.keys(item).forEach(key=>{
            if(key!=='_row'){
              dataLink[num] = {}
              dataLink[num].source = item._row
              dataLink[num].target = key
              dataLink[num].lineStyle = {}
              dataLink[num].lineStyle.width = (Math.abs(item[key]))*5
              dataLink[num].lineStyle.color = item[key] >0 ? 'red':'green'
              num++
            }
          })
        })
        let myChart = this.$echarts.init(document.getElementById('cookTble'))
        let option = {
          tooltip: {},
          animationDurationUpdate: 1500,
          animationEasingUpdate: 'quinticInOut',
          markLine:{
            symbol:'none'
          },
          series : [
            {
              type: 'graph',
              layout: 'circular',
              symbolSize: 50,
              roam: true,
              label: {
                normal: {
                  show: true
                }
              },
              data: dataName,
              links: dataLink
            }
          ]
        };
        myChart.setOption(option);
      }
    },
    created() {
      this.getPageAll()
      this.formInlineCopy = JSON.parse(JSON.stringify(this.formInline))
    }
  }
</script>

<style>
  #QUANTITY .el-table td{
    padding: 6px 0;
  }
</style>
