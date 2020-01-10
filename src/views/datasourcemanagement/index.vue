<template>
  <div>
    <jtable
      :tableData="tableData"
      :columnData="columnData"
      :total = "total"
      :deleteShow="true"
      :configShow="true"
      @pageChange="pageChange"
      @on-config="handleConfig"
      @on-delete="hanleDelete">

      <div class="flex bgc">
        <div>
          数据源名称:
          <el-input v-model="dataName" style="width: 180px;margin-right: 30px"></el-input>

          数据源类型:
          <el-select v-model="dataType">
            <el-option
              v-for="(item,index) in dataTypeOptions"
              :key="index"
              :label="item"
              :value="index">
            </el-option>
          </el-select>

        </div>

        <div>
          <el-button type="primary" @click="handleSearch">查 询</el-button>
          <el-button type="warning" @click="handleAdd">添 加</el-button>
        </div>
      </div>

    </jtable>

    <el-dialog title="数据源管理" :visible.sync="dialogFormVisible" fullscreen>
      <el-form :model="form" inline>
        <el-form-item label="数据源名称" :label-width="formLabelWidth">
          <el-input v-model="form.dataName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="数据源类型" :label-width="formLabelWidth">
          <el-select v-model="form.dataType">
            <el-option
              v-for="(item,index) in dataTypeOptions"
              :key="index"
              :label="item"
              :value="index">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="数据源地址" :label-width="formLabelWidth">
          <el-input v-model="form.dataAddress" autocomplete="off" placeholder="127.0.0.1"></el-input>
        </el-form-item>
        <el-form-item label="数据源端口" :label-width="formLabelWidth">
          <el-input v-model="form.dataPort" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="数据源描述" :label-width="formLabelWidth">
          <el-input v-model="form.dataRemark" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="实例名" :label-width="formLabelWidth">
          <el-input v-model="form.exampleName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="form.userName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleUpdate" v-if="isConfig">修 改</el-button>
        <el-button type="primary" @click="handleSave" v-if="!isConfig">提 交</el-button>
        <el-button @click="handleBack">退 出</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import jtable from '_c/Jtable'
  import {queryDataSourcesList,deleteDataSources,saveDataSources,updateDataSources} from '@/api/manager'
  export default {
    data() {
      return {
        isConfig:false,
        total:0,
        pageIndex: 1,
        pageSize: 10,
        dataName:'',
        dataType:'',
        checked:false,
        dialogFormVisible: false,
        form: {
          "dataAddress": "",
          "dataName": "",
          "dataPort": "",
          "dataRemark": "",
          "dataType": "",
          "exampleName": "",
          "password": "",
          "userName": ""
        },
        formCopy: {},
        formLabelWidth: '120px',
        dataTypeOptions: ['mysql','oracle'],
        tableData: [],
        columnData: {
          dataName:'数据源名称',
          dataTypeName:'数据源类型',
          exampleName:'实例名',
          dataRemark:'数据源描述',
        }
      }
    },
    components: {
      jtable
    },
    methods:{
      handleBack(){
        this.dialogFormVisible = false
        this.form = JSON.parse(JSON.stringify(this.formCopy))
      },
      handleUpdate(){
        updateDataSources(this.form).then(res=>{
          if(res.code === 0){
            this.dialogFormVisible = false
            this.$message({
              message:'修改成功',
              type:'success'
            })
            this.form = JSON.parse(JSON.stringify(this.formCopy))
            this.handleSearch()
          }
          if(res.code !== 0){
            this.$message({
              message:'连接失败,请重新填写',
              type:'error'
            })
          }
        })
      },
      handleSave(){
        saveDataSources(this.form).then(res=>{
          if(res.code === 0){
            this.dialogFormVisible = false
            this.$message({
              message:'提交成功',
              type:'success'
            })
            this.form = JSON.parse(JSON.stringify(this.formCopy))
            this.handleSearch()
          }
          if(res.code !== 0){
            this.$message({
              message:'连接失败,请重新填写',
              type:'error'
            })
          }
        })
      },
      pageChange(size,page) {
        this.pageSize = size
        this.pageIndex = page
        this.handleSearch()
      },
      handleConfig(data){
        this.dialogFormVisible = true
        this.isConfig = true
        console.log(data.row)
        Object.assign(this.form,data.row)
      },
      hanleDelete(row){
        console.log(row)
        this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteDataSources([row.dataId]).then(res => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.handleSearch()
          })
        })
      },
      handleAdd(){
        this.dialogFormVisible = true
        this.isConfig = false
      },
      handleSearch(){
        let data = {
          dataName:this.dataName,
          dataType:this.dataType,
          pageIndex: this.pageIndex,
          pageSize: this.pageSize,
        }
        queryDataSourcesList(data).then(res=>{
          console.log(res)
          this.tableData = res.page.list
          this.tableData.forEach(item=>{
            item.accessStateGo = item.accessState ?'接入失败' : '接入成功'
            item.dataTypeName = item.dataType ? 'mysql':'oracle'
          })
          this.total = res.page.totalCount
        })
      }
    },
    created() {
      this.formCopy = JSON.parse(JSON.stringify(this.form))
    }
  }
</script>

<style scoped>

</style>
