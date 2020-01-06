<template>
  <div>
    <jtable
      :tableData="tableData"
      :columnData="columnData"
    :deleteShow="true"
    @on-delete="hanleDelete">

      <div class="flex bgc">
        <div>
          数据源名称:
          <el-input v-model="dataName" style="width: 180px;margin-right: 30px"></el-input>

          数据源类型:
          <el-select v-model="dataType">
            <el-option
              v-for="item in dataTypeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>

        </div>

        <div>
          <el-button type="primary" @click="handleSearch">查 询</el-button>
          <el-button type="warning" @click="handleAdd">添 加</el-button>
          <el-button>修 改</el-button>
        </div>
      </div>

    </jtable>

    <el-dialog title="数据源管理" :visible.sync="dialogFormVisible" fullscreen>
      <el-form :model="form">
        <el-form-item label="数据源名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="数据源类型" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="数据源地址" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="数据源端口" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="实例名" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="" :label-width="formLabelWidth">
          <el-button>测试连接</el-button>
        </el-form-item>
        <el-form-item label="选择库" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="选择表" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="附加描述" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" type="textarea"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">保存并退出</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">保存并添加哎</el-button>
        <el-button @click="dialogFormVisible = false">退出</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import jtable from '_c/Jtable'
  import {queryDataSourcesList,deleteDataSources} from '@/api/manager'
  export default {
    data() {
      return {
        dataName:'',
        dataType:'',
        checked:false,
        dialogFormVisible: false,
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
        dataTypeOptions: [],
        tableData: [],
        columnData: {
          dataName:'数据源名称',
          dataType:'数据源类型',
          exampleName:'实例名',
          dataRemark:'数据源描述',
          accessStateGo:'接入状态'
        }
      }
    },
    components: {
      jtable
    },
    methods:{
      hanleDelete(row){
        console.log(row)
        let data = {
          dataId : row.dataId
        }
        this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteDataSources(data).then(res => {
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
      },
      handleSearch(){
        let data = {
          pageIndex: 1,
          pageSize: 10,
        }
        queryDataSourcesList(data).then(res=>{
          console.log(res)
          this.tableData = res.page.list
          this.tableData.forEach(item=>{
            item.accessStateGo = item.accessState ?'接入失败' : '接入成功'
          })
        })
      }
    }
  }
</script>

<style scoped>

</style>
