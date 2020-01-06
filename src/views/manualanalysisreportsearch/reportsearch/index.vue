<template>
  <div>
    <jtable
      preview="预览"
      :tableData="tableData"
      :columnData="columnData"
      :total = "total"
      :statusShow="true"
      :searchShow="true"
      :downloadShow="true"
      @on-download="handleDownload"
      @on-detail="handleDetail"
      @pageChange="pageChange">

      <div class="flex bgc">
        <div>

          报告类型:
          <el-select v-model="seaForm.rptType" style="width: 140px">
            <el-option
              v-for="item in reportTypeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>

          报告频度:
          <el-select v-model="seaForm.rptFreq" style="width: 140px">
            <el-option
              v-for="item in reportPinduOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>

          状态:
          <el-select v-model="seaForm.rptStatus" style="width: 140px">
            <el-option
              v-for="item in statusOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>

          报告日期:
          <el-date-picker
            style="width: 260px"
            value-format="yyyy-MM-dd HH:mm:ss"
            v-model="dateVal"
            type="datetimerange"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </div>

        <div>
          <el-button type="primary" @click="handleSearch">查 询</el-button>
        </div>
      </div>

    </jtable>
    <el-dialog title="报告查询" :visible.sync="dialogFormVisible" fullscreen>
      <el-form :model="form">
        <el-form-item label="报告名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="报告月份" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="所属商品" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="作者" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="报告月份" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="报告月份" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
          <el-button size="small">浏览</el-button>
        </el-form-item>
        <el-form-item label="" :label-width="formLabelWidth">
          <el-checkbox v-model="checked">备选项</el-checkbox>
          <el-checkbox v-model="checked">备选项</el-checkbox>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">退 出</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">提 交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import jtable from '_c/Jtable'
  import {pssrptinfoList,preview} from '@/api/manager'
  export default {
    data() {
      return {
        total:0,
        pageIndex: 1,
        pageSize: 10,
        dateVal:[],
        statusOptions:[{
          value: '0',
          label: '已删除'
        }, {
          value: '1',
          label: '有效'
        }],
        reportTypeOptions:[{
          value: '0',
          label: '自动'
        }, {
          value: '1',
          label: '手动'
        }],
        reportPinduOptions: [{
          value: 'D',
          label: '日'
        }, {
          value: 'W',
          label: '周'
        }, {
          value: 'TD',
          label: '旬'
        }, {
          value: 'M',
          label: '月'
        },{
          value: 'Q',
          label: '季'
        },{
          value: 'Y',
          label: '年'
        }],
        checked:false,
        dialogFormVisible: false,
        seaForm:{
          rptType:'',
          rptFreq:'',
          rptStatus:''
        },
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        formLabelWidth: '120px',
        tableData: [],
        columnData: {
          rptName:'分析报告名称',
          commName:'商品名称',
          rptTypeName:'报告类型',
          crteTime:'生成时间'
        }
      }
    },
    components: {
      jtable
    },
    methods:{
      handleDownload(row){
        let newUrl = `http://10.1.0.139:8081/fagaiwei_api/report/pssrptinfo/preview?fileType=docx&infoId=${row.rptId}`
        window.open(newUrl,'_blank')
      },
      handleDetail(val){
        let newUrl = `http://10.1.0.139:8081/fagaiwei_api/report/pssrptinfo/preview?fileType=pdf&infoId=${val.row.rptId}`
        window.open(newUrl,'_blank')
      },
      pageChange(size,page) {
        this.pageSize = size
        this.pageIndex = page
        this.handleSearch()
      },
      handleSearch(){
        let data = this.seaForm
        data.minCrteTime = this.dateVal[0]
        data.maxCrteTime = this.dateVal[1]
        data.pageIndex = 1
        data.pageSize = 10
        console.log(data)
        pssrptinfoList(data).then(res=>{
          this.tableData = res.page.list
          this.tableData.forEach(item=>{
            item.status = item.rptStatus
            if(item.rptType === 0){
              item.rptTypeName = '自动'
            }else {
              item.rptTypeName = '手动'
            }
          })
          this.total = res.page.totalCount
        })
      }
    }
  }
</script>

<style scoped>

</style>
