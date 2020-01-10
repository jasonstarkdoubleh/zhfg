<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="数据展示" name="first">
        <jtable
          :total="total"
          :tableData="tableData"
          :columnData="columnData"
          :searchShow="true"
          :deleteShow="true"
          @pageChange="pageChange"
          @on-delete="hanleDelete"
          @on-detail="handleDetail">

          <!--      因果分析-->
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
              <el-select v-model="cor.datasetId"style="margin-right: 20px">
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

      <el-tab-pane label="格兰杰因果检验" name="second">
        <el-card v-show="headShow">
          <div style="padding: 10px" id="GELANJIE">
            <div>
              <h3>格兰杰因果检验</h3>
              <div class="flex bgc">
                <div style="margin: 5px 0">
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
                  因变量:&nbsp;
                  <el-select
                    v-model="formInline.depeVar"
                    style="width: 150px;margin-right: 20px">
                    <el-option
                      v-for="(item, index) in depeVarOptions"
                      :key="index"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </div>
                <div>
                  自变量:&nbsp;
                  <el-select
                    v-model="indeVar"
                    style="width: 150px;margin-right: 20px"
                    multiple
                    collapse-tags>
                    <el-option
                      v-for="(item, index) in depeVarOptionsCopy"
                      :key="index"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
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
              </div>
              <div style="display: flex;justify-content: flex-end;margin-top: 10px">
                <el-button type="primary" @click="runTime(true)">运 行</el-button>
              </div>
            </div>
          </div>
        </el-card>
      </el-tab-pane>

      <el-tab-pane label="路径分析" name="third">
        <el-card v-show="headShow">
          <div style="padding: 10px" id="GELANJIE">
            <div>
              <h3>因果分析</h3>
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
                  因变量:&nbsp;
                  <el-select
                    v-model="formInline.depeVar"
                    style="width: 150px;margin-right: 20px">
                    <el-option
                      v-for="(item, index) in depeVarOptions"
                      :key="index"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </div>
                <div>
                  自变量:&nbsp;
                  <el-select
                    v-model="indeVar"
                    style="width: 150px;margin-right: 20px"
                    multiple
                    collapse-tags>
                    <el-option
                      v-for="(item, index) in depeVarOptionsCopy"
                      :key="index"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
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
              </div>
              <div style="display: flex;justify-content: flex-end;margin-top: 10px">
                <el-button type="primary" @click="runTime(false)">运 行</el-button>
              </div>
            </div>
          </div>
        </el-card>
      </el-tab-pane>
    </el-tabs>

    <el-card v-show="correShow" style="margin-top: 10px">
      <h3>{{this.tableColShow ? '检验结果':'因果分析结果'}}</h3>
      <div>
        <el-table :data="dialogTableData" border stripe>
          <el-table-column label="" prop="_row" align="center" ></el-table-column>
          <el-table-column label="Pvalue" prop="Pvalue" align="center"></el-table-column>
          <el-table-column :label="tableColShow ? '是否为格兰杰原因':'路径系数'" prop="cause" align="center"></el-table-column>
        </el-table>
      </div>
    </el-card>

    <div>
      <el-card style="margin-top: 10px" v-show="correShow && !tableColShow">
        <h3>因果图</h3>
        <div id="causeimg" style="height: 300px"></div>
      </el-card>
      <div style="display: flex;justify-content: center;margin-top: 10px" v-show="!headShow">
        <el-button type="primary" @click="handleReturn">返 回</el-button>
      </div>
    </div>

  </div>
</template>

<script>
  import jtable from '_c/Jtable'
  import { mapActions } from 'vuex'
  import {getAsciiByCode,pssanalyreltDetail,deleteAnalyId} from '@/api/manager'
  export default {
    data(){
      return {
        total: 0,
        cor:{
          analyName:'',
          analyWay:'',
          datasetId:''
        },
        analyWayOptions: [],
        tableColShow:true,
        correShow:false,
        indeVar:[],
        dataNameOptions: [],
        depeVarOptions:[],
        depeVarOptionsCopy: [],
        selcetData:[],
        formInline: {
          dataSetId: '',
          indeVar: [],
          analyName: '',
          remark: '',
          depeVar:''
        },
        formInlineCopy:{},
        activeName: 'first',
        dialogTableData:[],
        dataName:'',
        tableData: [],
        columnData: {
          dataSetName:'数据集名称',
          analyName:'分析名称',
          analyWay:'分析类型',
          runTime:'运行时间'
        },
        headShow:true,
        copyData:[],
        pageIndex: 1,
        pageSize: 10,
      }
    },
    computed: {
      dataSetId() {
        return this.formInline.dataSetId
      },
      depeVar(){
        return this.formInline.depeVar
      }
    },
    watch: {
      activeName(val){
        if(val === 'first'){
          this.correShow = false
          this.headShow = true
        }
      },
      dataSetId(val) {
        if(val){
          this.depeVarOptions = []
          this.depeVarOptionsCopy = []
          this.indeVar = []
          this.copyData = val
          for(let i in this.selcetData) {
            if ( this.selcetData[i].dataSetId === val) {
              let comm_table = JSON.parse(this.selcetData[i].indeVar).comm_table
              let commIndexNames = JSON.parse(this.selcetData[i].indeName).commIndexNames
              for(let k in comm_table) {
                this.depeVarOptions[k] = {}
                this.depeVarOptions[k].label = commIndexNames[k]
                this.depeVarOptions[k].value = comm_table[k]
              }
            }
          }
        }
      },
      depeVar(val){
        if(val){
          this.depeVarOptionsCopy = []
          this.indeVar = []
          for(let i in this.selcetData) {
            if ( this.selcetData[i].dataSetId === this.copyData) {
              let comm_table = JSON.parse(this.selcetData[i].indeVar).comm_table
              let commIndexNames = JSON.parse(this.selcetData[i].indeName).commIndexNames
              for(let k in comm_table) {
                this.depeVarOptionsCopy[k] = {}
                this.depeVarOptionsCopy[k].label = commIndexNames[k]
                this.depeVarOptionsCopy[k].value = comm_table[k]
              }
            }
          }
          for (let i in this.depeVarOptionsCopy) {
            if(this.depeVarOptionsCopy[i].value === val){
              this.depeVarOptionsCopy.splice(i,1)
            }
          }
        }
      }
    },
    components:{
      jtable
    },
    methods:{
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
          if(data.row.analyWay === "格兰杰"){
            this.activeName = 'second'
            this.tableColShow = true
          }
          if(data.row.analyWay === "路径分析"){
            this.activeName = 'third'
            this.tableColShow = false
          }
          if(data.row.analyWay === "格兰杰" || data.row.analyWay === "路径分析"){
            this.headShow = false
            this.correShow = true
            this.dialogTableData = JSON.parse(res.data.pvalue)
            if(this.tableColShow){
              this.dialogTableData.forEach(item=>{
                item.cause = item.Pvalue < 0.05 ? '是':'否'
              })
            }
            else {
              let coe = JSON.parse(res.data.analyCoe)
              this.dialogTableData.forEach((item,index)=>{
                item.cause = coe[index].analy_coe
              })
              this.$nextTick(()=>{
                this.drawCause(this.dialogTableData)
              })
            }
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
      ...mapActions([
        'listAll',
        'runGeneral',
        'pssanalyinfoList',
        'bussType'
      ]),

      runTime(data) {
        if(data){
          this.formInline.analyWay = "格兰杰"
        }else {
          this.formInline.analyWay = "路径分析"
        }
        this.formInline.bussType = 2
        this.formInline.indeVar = [JSON.stringify({'comm_table': this.indeVar})]
        this.runGeneral(this.formInline).then(res => {
          this.correShow = true
          this.dialogTableData = JSON.parse(res.data.pva)
          if(this.tableColShow){
            this.dialogTableData.forEach(item=>{
              item.cause = item.Pvalue < 0.05 ? '是':'否'
            })
          }
          else {
            let coe = JSON.parse(res.data.coe)
            this.dialogTableData.forEach((item,index)=>{
              item.cause = coe[index].analy_coe
            })
            this.$nextTick(()=>{
              this.drawCause(this.dialogTableData)
            })
          }
        })
      },
      handleClick(tab, event) {
        this.headShow = true
        this.correShow = false
        this.indeVar = []
        this.formInline = JSON.parse(JSON.stringify(this.formInlineCopy))
        this.tableColShow = tab.name === 'second'
      },
      drawCause(data){
        let name = ''
        for(let i in this.depeVarOptions){
          if(this.depeVarOptions[i].value === this.formInline.depeVar){
            name = this.depeVarOptions[i].label
          }
        }
        let dataName = []
        let dataLink = []
        dataName[0]={}
        dataName[0].name = name
        data.forEach((item,index)=>{
          dataName[index+1]={}
          dataName[index+1].name = item._row
          dataLink[index] = {}
          dataLink[index].source = 0
          dataLink[index].target = index+1
          dataLink[index].lineStyle = {}
          dataLink[index].lineStyle.width = (Math.abs(item.cause))*5
          dataLink[index].lineStyle.color = item.cause >0 ? 'red':'green'
        })
        let myChart = this.$echarts.init(document.getElementById('causeimg'))
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
      },
      handleSearch() {
        let data = {}
        data = Object.assign({},this.cor)
        data.bussType = 2
        data.pageIndex = this.pageIndex
        data.pageSize = this.pageSize
        this.pssanalyinfoList(data).then(res => {
          this.tableData = res.page.list
          this.total = res.page.totalCount
        })
      },
    },
    created() {
      this.bussType(2).then(res=>{
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
    }
  }
</script>

<style>
  #GELANJIE .el-table td{
    padding: 12px 0;
  }
</style>
