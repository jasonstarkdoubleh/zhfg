<template>
  <div>
    <jtable  :tableData="tableData"
             :columnData="columnData"
             :total = "total"
             :loading="loading"
             :selection="true"
             :statusShow="true"
             :index="true"
             :deleteShow="true"
             :configShow = "true"
             @pageChange="pageChange"
             @on-config="getDepConfig"
             @on-delete="deleteDeps"
    >

      <!--      用户管理-->
      <div class="flex bgc">
        <div>
          部门名称:&nbsp;
          <el-select v-model="depId" placeholder="请选择" filterable  clearable style="width:170px ">
            <el-option
              v-for="(item, index) in depNameOptions"
              :key="index"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>

          部门状态:&nbsp;
          <el-select v-model="depState" placeholder="请选择" clearable style="width:170px ">
            <el-option
              v-for="(item, index) in depStateOptions"
              :key="index"
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
    <el-dialog :visible.sync="updateDepShow" fullscreen>

      <div class="flex-justify" v-loading="dialogLoading">
        <el-card class="card-width">
          <div slot="header">

          </div>
          <div>
            <el-form ref="form" :model="userDepForm" :rules="rules">
              <el-form-item >
                <el-input v-model="userDepForm.depId" v-if="false"/>
              </el-form-item>
              <el-form-item >
                <el-input v-model="userDepForm.superDepId" v-if="false"/>
              </el-form-item>
              <el-form-item label="部门名称" prop="depName" >
                <el-input v-model="userDepForm.depName"  style="width: 280px"></el-input>
              </el-form-item>
              <el-form-item label="上级部门" prop="superDepId" >
                <el-select v-model="userDepForm.superDepId"  placeholder="一级菜单" filterable  clearable style="width:170px ">
                  <el-option
                    v-for="(item, index) in depNameOptions"
                    :key="index"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="部门状态"  prop="depState">
                <el-radio-group v-model="userDepForm.depState" >
                  <el-radio  :label="1">启用</el-radio>
                  <el-radio  :label="0">禁用</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-form>
          </div>
        </el-card>
      </div>
      <div class="dialog-cancel" style="float: left; padding-left:10px">
        <el-button type="primary" @click="onSubmit" :disabled="disabled">提 交</el-button>
        <el-button type="warning" @click="closeDep">关 闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { getUserDepInfo ,getDepInfo,updateDepInfo,getInfo ,deleteDep} from '@/api/dep'
  import jtable from '_c/Jtable'
  import { mapActions } from 'vuex'
  import ElInput from "../../../../node_modules/element-ui/packages/input/src/input";
  export default {
    components: {
      ElInput,
      jtable
    },
    data() {
      return {
        depState:'',
        disabled:false,
        pageIndex: 1,
        pageSize: 10,
        columnData: {  depName: '部门名称', superDepName: '上级部门名称' ,creDate: '创建时间', updDate: '更新时间' },
        tableData: [],
        total:0,
        dialogLoading:false,
        loading:false,
        depId: '',                              //部门名称
        updateDepShow:false,
        depNameOptions: [], //部门名称
        depStateOptions: [
          {label:"启用", value:"1"},
          {label:"禁用", value:"0"},
        ],
        userDepForm:{
          depId:'',
          superDepId:'',
          depName:'',
          superDepName:'',
          depState:''
        },
        rules: {
          depName:[ { required: true, message: '请输入部门名称', trigger: 'blur' }],
          superDepId:[ { required: true, message: '请选择所属上级部门', trigger: 'change' }],
          depState:[ { required: true, message: '请指定部门的状态', trigger: 'change' }],
        }
      }
    },
    methods:{
      handleSearch(){
        let depId = '';
        let depState = '';
        this.loading = true;

        if (this.depId) {
          depId = this.depId;
        }

        if (this.depState) {
          depState = this.depState
        }

        let data = {
          "depId": depId,
          "depState": depState,
          "pageIndex": this.pageIndex,
          "pageSize": this.pageSize
        };
        getDepInfo(data).then(res => {
          this.tableData = res.page.list
          this.total = res.page.totalCount;
          this.loading = false
        }).catch(() => {
          this.loading = false
        })
      },
      pageChange(size,page) {
        this.pageSize = size
        this.pageIndex = page
        this.handleSearch()
      },
      deleteDeps(data){
        this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let pm = []
          pm.push(data.depId)
          let pmr ={
            "ids":pm
          }
          deleteDep(pmr).then(res => {
            if(res.code == 0){
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.handleSearch()
            getUserDepInfo().then((res)=>{
              this.depNameOptions = res.dep
            })
          }else {
              this.$message({
                type: res.msg,
                message: 'error'
              });
            }}  )
        } )
      },
      getDepConfig(data){
        let depId = '';
        if (data.row.depId) {
          depId = data.row.depId;
        }
        let pm = {
          "depId":depId
        }
        getInfo(pm).then(res => {
          this.userDepForm.depId = res.dep.depId;
          this.userDepForm.superDepId = res.dep.superDepId;
          this.userDepForm.depName = res.dep.depName;
          this.userDepForm.superDepName = res.dep.superDepName;
          this.userDepForm.depState = res.dep.depState;
          this.updateDepShow = true;
        })
      },
      closeDep(){
        this.userDepForm={
          depId:'',
          superDepId:'',
          depName:'',
          superDepName:'',
          depState:''
        },
          this.updateDepShow = false
      },
      handleAdd(){
          this.updateDepShow = true
      },
      onSubmit() {
        this.dialogLoading = true;
        this.disabled = true;
        updateDepInfo(this.userDepForm).then((res) => {
         if(res.code==0){
          this.dialogLoading = false;
          this.disabled = false;
          this.updateDepShow = false;
          this.userDepForm={
            depId:'',
            superDepId:'',
            depName:'',
            superDepName:'',
            depState:''
          };
          this.$message({
            message: '部门数据更新完成',
            type: "success"
          })
          this.handleSearch()
          getUserDepInfo().then((res)=>{
            this.depNameOptions = res.dep
          })
         }else {
           this.dialogLoading = false;
           this.disabled = false;
           this.$message({
             message:res.msg,
             type: "error"
           })

         }
        }).catch(() => {
          this.dialogLoading = false;
          this.disabled = false;
        })
      },
      ...mapActions([
        'getDepInfo',
        'save',
        'warnType',
        'delete'
      ])

    },
    watch:{

    },
    mounted(){

    },
    created: function () {
      this.handleSearch()
      getUserDepInfo().then((res)=>{
        this.depNameOptions = res.dep
      })
    }

  }
</script>

<style scoped>
  .el-form-item__error {
    color: #F56C6C;
    font-size: 12px;
    line-height: 1;
    padding-top: 4px;
    position: absolute;
  }
  .element.style{
    width: 400px;
  }
</style>
