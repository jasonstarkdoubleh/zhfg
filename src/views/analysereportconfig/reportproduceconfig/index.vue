<template>
  <div>
    <Jtable
      :tableData="tableData"
      :columnData="columnData"
      :total = "total"
      @pageChange="pageChange"
      :searchShow="searchShow"
      v-show="!dialogFormVisible"
      @on-detail="handleDetail">

      <div class="flex bgc">
        <div>

          报告类型:
          <el-select v-model="reportType" style="margin-right: 20px">
            <el-option
              v-for="item in reportTypeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>

          报告频度:
          <el-select v-model="reportPindu">
            <el-option
              v-for="item in reportPinduOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>

        </div>

        <div>
          <el-button type="primary" @click="handleSearch">查 询</el-button>
          <el-button @click="handleCreate">新 增</el-button>
        </div>
      </div>

    </Jtable>

    <el-dialog :visible.sync="xuanzeShow">
      <div>
        新增报告类型:
        <el-select v-model="xuanzeData" style="margin-left: 20px">
          <el-option
            v-for="item in reportTypeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div style="display: flex;justify-content: center;margin-top: 20px">
        <el-button type="primary" style="margin-right: 15px" @click="handleXuanze">确认</el-button>
        <el-button style="margin-left: 15px" @click="xuanzeShow = false">取消</el-button>
      </div>
    </el-dialog>

    <div v-show="dialogFormVisible" fullscreen style="padding-top: 0">
      <div style="display: flex;justify-content: space-around;">
        <el-card style="height: 500px;width: 30%;overflow: auto">
          <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
        </el-card>
        <el-card style="width: 65%">
          <el-form :model="form">
            <el-form-item label="报告名称" :label-width="formLabelWidth">
              <el-date-picker
                value-format="yyyy-MM-dd HH:mm:ss"
                v-model="form.crteDate"
                type="datetime"
                placeholder="选择日期时间">
              </el-date-picker>
              <el-input v-model="type" placeholder="商品大类" disabled style="width: 160px"></el-input>
              <el-input v-model="form.commName" placeholder="商品名称" disabled style="width: 160px"></el-input>
              <el-input v-model="form.rptName" placeholder="报告名称" style="width: 160px"></el-input>
            </el-form-item>
            <el-form-item label="报告频度" :label-width="formLabelWidth">
              <el-select v-model="form.rptFreq">
                <el-option
                  v-for="item in reportPinduOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="选择模板" :label-width="formLabelWidth" v-show="zidongShow">
              <el-select v-model="tempId" placeholder="请选择模板" :disabled="disabled">
                <el-option
                  v-for="(item, index) in modelChooseOptions"
                  :key="index"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <el-button @click="addMuban" v-show="!disabled">+</el-button>
              <el-button @click="proMuban" v-show="disabled">-</el-button>
            </el-form-item>
            <el-form-item label="上传模板" :label-width="formLabelWidth" v-show="mubanShow || !zidongShow">
              <el-upload
                class="upload-demo"
                action="https://sp.ndrc.gov.cn:8099/fagaiwei_api/file/upload?saveOriName=false&saveSubPath=true&moduleName=0"
                :headers="{'token':getTokenCom}"
                :before-upload="onBeforeUpload"
                :on-preview="handlePreview"
                :on-success="handleAvatarSuccess"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                accept="docx/excel"
                multiple
                :limit="3"
                :on-exceed="handleExceed"
                :file-list="fileList">
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传docx文件</div>
              </el-upload>
            </el-form-item>
            <el-form-item v-show="zidongShow" label="调度名称" :label-width="formLabelWidth">
              <el-select v-model="form.rschId" placeholder="请选择活动区域">
                <el-option
                  v-for="(item, index) in infoOptions"
                  :key="index"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item v-show="!zidongShow" label="创建者" :label-width="formLabelWidth">
              <el-input v-model="form.crteName" style="width: 160px"></el-input>
            </el-form-item>
            <el-form-item label="备注" :label-width="formLabelWidth">
              <el-input type="textarea" v-model="form.rvewRemarks"></el-input>
            </el-form-item>
          </el-form>
        </el-card>


      </div>

      <div style="display: flex;justify-content: center;margin-top: 30px">
        <div>
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleSave(true)" v-show="!update">保 存</el-button>
          <el-button type="primary" @click="handleSave(false)" v-show="update">修 改</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Jtable from '_c/Jtable'
  import {pssrptconf,pssrschconfList,pssrptconfSave,queryRschList,queryRptTemplate,pssrptconfUpdate} from '@/api/manager'
  import {mapActions} from 'vuex'
  import { getToken } from '@/utils/auth'
  export default {
    data() {
      return {
        disabled:false,
        mubanShow:false,
        tempId:'',
        update:false,
        modelChooseOptions:[],
        rschList:[],
        infoOptions:'',
        xuanzeShow:false,
        xuanzeData:'0',
        searchShow:false,
        pageSize:10,
        pageIndex:1,
        total:0,
        fileList: [],
        data: [],
        defaultProps: {
          children: 'children',
          label: 'commName'
        },
        type: '',
        form: {
          crteName:'',
          commName:'',
          commId:'',
          rptType:'',
          rptFreq:'',
          rschId:'',
          rptName:'',
          rptPath:'',
          rvewRemarks:'',
          rptStatus:'0',
          crteDate:'',
        },
        formCopy:'',
        formLabelWidth: '120px',
        dialogFormVisible:false,
        reportType: '',
        reportTypeOptions: [{
          value: '0',
          label: '自动'
        }, {
          value: '1',
          label: '手动'
        }],
        reportPindu: '',
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
        tableData: [],
        columnData: {
          rptName:'报告名称',
          commName:'商品名称',
          statCode:'统计区域',
          rschName:'调度名称',
          crteDate:'生成时间'
        },
        columnDataShoudong: {
          rptName:'报告名称',
          dataName:'报告频度',
          statCode:'所属商品',
          type:'创建者',
          vision:'附件名称',
          up:'上传时间'
        },
        commLevelCode_1:[],
        commLevelCode_2:[],
        zidongShow:true
      }
    },
    components: {
      Jtable
    },
    watch: {

    },
    methods:{
      addMuban(){
        this.mubanShow = true
        this.disabled = true
        this.tempId = ''
      },
      proMuban(){
        this.mubanShow = false
        this.disabled = false
      },
      handleSave(boo){
        if(!this.disabled && this.zidongShow){
          this.modelChooseOptions.forEach(item => {
            if(item.value === this.tempId) {
              this.form.rptPath = item.rptPath
            }
          })
        }
        if(boo){
          if(this.zidongShow){
            this.form.rptType = '0'
          }else {
            this.form.rptType = '1'
          }
          pssrptconfSave(this.form).then(res=>{
            this.form = JSON.parse(JSON.stringify(this.formCopy))
            this.type = ''
            this.fileList = []
            this.$message({
              message:'保存成功',
              type:'success'
            })
          })
        }else {
          this.form.rptType = '0'
          pssrptconfUpdate(this.form).then(res=>{
            this.form = JSON.parse(JSON.stringify(this.formCopy))
            this.type = ''
            this.fileList = []
            this.$message({
              message:'修改成功',
              type:'success'
            })
            this.update = false
            this.dialogFormVisible = true
            this.handleSearch()
          })
        }

      },
      handleXuanze(){
        this.zidongShow = this.xuanzeData === '0'
        this.xuanzeShow = false
        this.dialogFormVisible = true
      },
      ...mapActions([
        'getCommType'
      ]),
      filterArray(data, parent) {
        let treeNode = [];
        let temp;
        for (let i = 0; i < data.length; i++) {
          if (data[i].parentCode === parent) {
            let obj = data[i];
            temp = this.filterArray(data, data[i].commId);
            if (temp.length > 0) {
              obj.children = temp;
            }
            treeNode.push(obj);
          }
        }
        return treeNode;
      },
      handleDetail(data){
        let code = ''
        this.dialogFormVisible = true
        this.zidongShow = true
        this.update = true
        this.tempId = data.row.tempId
        this.form = JSON.parse(JSON.stringify(data.row))
        this.commLevelCode_2.forEach(item=>{
          if(item.commId === this.form.commId){
            code = item
          }
        })
        this.commLevelCode_1.forEach(item=>{
          if(item.commId === code.parentCode){
            if(item.parentCode === 1 ){
              this.type = '大宗商品'
            }else {
              this.type = '民生商品'
            }
          }
        })
      },
      pageChange(size,page) {
        this.pageSize = size
        this.pageIndex = page
        this.handleSearch()
      },
      onBeforeUpload(file){
        let testmsg = file.name.substring(file.name.lastIndexOf('.')+1)
        const extension = testmsg === 'docx'
        const extension2 = testmsg === 'html'
        const extension3 = testmsg === 'pdf格式'
        const isLt2M = file.size / 1024 / 1024 < 10
        if(!extension && !extension2 && !extension3) {
          this.$message({
            message: '上传文件只能是 docx、html、pdf格式!',
            type: 'warning'
          });
        }
        if(!isLt2M) {
          this.$message({
            message: '上传文件大小不能超过 10MB!',
            type: 'warning'
          });
        }
        return (extension || extension2 || extension3) && isLt2M
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handleAvatarSuccess(response, file, fileList){
        this.form.rptPath = response.path
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        // return this.$confirm(`确定移除 ${ file.name }？`);
      },
      handleCreate(){
        this.xuanzeShow = true
        this.form = JSON.parse(JSON.stringify(this.formCopy))
        // this.dialogFormVisible = true
      },
      handleNodeClick(data) {
        if(data.levelCode === 2){
          this.form.commName = data.commName
          this.form.commId = data.commId
          this.commLevelCode_1.forEach(item=>{
            if(item.commId === data.parentCode){
              if(item.parentCode === 1 ){
                this.type = '大宗商品'
              }else {
                this.type = '民生商品'
              }
            }
          })
        }
      },
      handleSearch(){
        let data = {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize,
          rptType:this.reportType,
          rptFreq:this.reportPindu
        };
        pssrptconf(data).then(res => {
          this.searchShow = this.reportType === '0'
          this.tableData = res.page.list
          for(let i in this.tableData){
            for(let j in this.rschList){
              if(this.tableData[i].rschId === this.rschList[j].rschId){
                this.tableData[i].rschName =this.rschList[j].rschName
                break
              }
            }
          }
          this.total = res.page.totalCount

        })
      }
    },
    computed:{
      getTokenCom() {
        return getToken() || ''
      }
    },
    created() {
      queryRptTemplate().then(res=>{
        let data = res.page
        this.modelChooseOptions = []
        for(let i in data) {
          this.modelChooseOptions[i] = {}
          this.modelChooseOptions[i].label = data[i].rptName
          this.modelChooseOptions[i].value = data[i].tempId
          this.modelChooseOptions[i].rptPath = data[i].rptPath

        }
      })
      queryRschList().then(res=>{
        this.rschList = res.page
      })
      this.getCommType().then(res=>{
        let data = []
        this.commLevelCode_1 = res.data.commLevelCode_1
        this.commLevelCode_2 = res.data.commLevelCode_2
        Object.keys(res.data).forEach(key=>{
          if(key!=='commLevelCode_3'){
            data = data.concat(res.data[key])
          }
        })
        data = this.filterArray(data,0)
        this.data = data
      })
      pssrschconfList('', '').then(res => {
        let data = res.page.list
        this.infoOptions = []
        for(let i in data) {
          this.infoOptions[i] = {}
          this.infoOptions[i].label = data[i].rschName
          this.infoOptions[i].value = data[i].rschId
        }
      })
      this.formCopy = JSON.parse(JSON.stringify(this.form))
    }
  }
</script>

<style>

</style>
