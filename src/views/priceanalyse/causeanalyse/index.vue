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
                    v-model="depeVar"
                    style="width: 150px;margin-right: 20px">
                    <el-option-group
                      v-for="group in depeVarOptions"
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
                  自变量:&nbsp;
                  <el-select
                    v-model="indeVar"
                    style="width: 150px;margin-right: 20px"
                    multiple
                    collapse-tags>
                    <el-option-group
                      v-for="group in depeVarOptionsCopy"
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
                    v-model="depeVar"
                    style="width: 150px;margin-right: 20px">
                    <el-option-group
                      v-for="group in depeVarOptions"
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
                  自变量:&nbsp;
                  <el-select
                    v-model="indeVar"
                    style="width: 150px;margin-right: 20px"
                    multiple
                    collapse-tags>
                    <el-option-group
                      v-for="group in depeVarOptionsCopy"
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
              </div>
              <div style="display: flex;justify-content: flex-end;margin-top: 10px">
                <el-button type="primary" @click="runTime(false)">运 行</el-button>
              </div>
            </div>
          </div>
        </el-card>
      </el-tab-pane>
    </el-tabs>

    <el-card v-show="correShow" style="margin-top: 10px" v-loading="correLoading">
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
      <el-card style="margin-top: 10px" v-show="correShow && !tableColShow" v-loading="correLoading">
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
        correLoading:false,
        depeVar:'',
        depeVarOptions:[],
        indeVar:[],
        depeVarOptionsCopy: [],
        indeVarOptions:'',
        dataNameOptions: [],
        selcetData:[],
        formInline: {
          dataSetId: '',
          indeVar: {date_feature:[],macro_table:[],comm_table:[]},
          depeVar: {date_feature:[],macro_table:[],comm_table:[]},
          analyName: '',
          remark: ''
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
          this.depeVar = ''
          this.copyData = val
          let num = 0
          for(let i in this.selcetData) {
            if ( this.selcetData[i].dataSetId === val) {
              let indeVar = JSON.parse(this.selcetData[i].indeVar)
              let indeName = JSON.parse(this.selcetData[i].indeName)
              this.indeVarOptions = indeVar
              Object.keys(indeVar).forEach(key => {
                if(key !== "date_feature") {
                  this.depeVarOptions[num] = {}
                  this.depeVarOptions[num].label = key
                  this.depeVarOptions[num].options = []
                  indeVar[key].forEach((item, index) => {
                    this.depeVarOptions[num].options[index] = {}
                    this.depeVarOptions[num].options[index].label = indeName[key][index]
                    this.depeVarOptions[num].options[index].value = item
                  })
                  num++
                }
              })
              this.depeVarOptions.forEach(item => {
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
      depeVar(val){
        if(val){
          this.depeVarOptionsCopy = []
          this.indeVar = []
          let num = 0
          for(let i in this.selcetData) {
            if ( this.selcetData[i].dataSetId === this.copyData) {
              let indeVar = JSON.parse(this.selcetData[i].indeVar)
              let indeName = JSON.parse(this.selcetData[i].indeName)
              Object.keys(indeVar).forEach(key => {
                if(key !== "date_feature") {
                  this.depeVarOptionsCopy[num] = {}
                  this.depeVarOptionsCopy[num].label = key
                  this.depeVarOptionsCopy[num].options = []
                  indeVar[key].forEach((item, index) => {
                    this.depeVarOptionsCopy[num].options[index] = {}
                    this.depeVarOptionsCopy[num].options[index].label = indeName[key][index]
                    this.depeVarOptionsCopy[num].options[index].value = item
                  })
                  num++
                }
              })
              this.depeVarOptionsCopy.forEach(item => {
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
          this.depeVarOptionsCopy.forEach(item => {
            item.options.forEach((value, index) => {
              if(value.value === val) {
                item.options.splice(index,1)
              }
            })
          })
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
        Object.keys(this.formInline.depeVar).forEach(key => {
          this.formInline.depeVar[key] = []
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
        let booCopy = false
        this.indeVarOptions.comm_table.forEach(value => {
          if(this.depeVar === value) {
            booCopy = true
          }
        })
        if(booCopy) {
          this.formInline.depeVar.comm_table.push(this.depeVar)
        }else {
          this.formInline.depeVar.macro_table.push(this.depeVar)
        }
        this.formInline.indeVar = JSON.stringify(this.formInline.indeVar)
        this.formInline.depeVar = JSON.stringify(this.formInline.depeVar)
        this.correShow = true
        this.correLoading = true
        this.runGeneral(this.formInline).then(res => {
          this.correLoading = false
          this.formInline.indeVar = JSON.parse(this.formInline.indeVar)
          this.formInline.depeVar = JSON.parse(this.formInline.depeVar)
          if(res.data) {
            this.dialogTableData = res.data.pva
            if(this.tableColShow){
              this.dialogTableData.forEach(item=>{
                item.cause = item.Pvalue < 0.05 ? '是':'否'
              })
            }else {
              let coe = res.data.coe
              this.dialogTableData.forEach((item,index)=>{
                item.cause = coe[index].analy_coe
              })
              this.$nextTick(()=>{
                this.drawCause(this.dialogTableData)
              })
            }
          }else {
            this.drawCause([])
          }

        })
      },
      handleClick(tab, event) {
        this.headShow = true
        this.correShow = false
        this.depeVar = ''
        this.indeVar = []
        this.formInline = JSON.parse(JSON.stringify(this.formInlineCopy))
        Object.keys(this.formInline.depeVar).forEach(key => {
          this.formInline.depeVar[key] = []
          this.formInline.indeVar[key] = []
        })
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
      this.formInlineCopy = JSON.parse(JSON.stringify(this.formInline))
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
