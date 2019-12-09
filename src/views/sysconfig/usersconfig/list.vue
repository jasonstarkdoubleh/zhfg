<template>
  <div>
    <jtable  :tableData="tableData"
             :columnData="columnData"
             :total = "total"
             :loading="loading"
             :selection="true"
             :statusShow="true"
             :index="true"
            >

      <!--      用户管理-->
      <div class="flex bgc">
        <div>
          用户名称:&nbsp;
          <el-input placeholder="请输入用户名称" v-model="userName" clearable style="width:170px;padding-right:10px ">
          </el-input>

          部门名称:&nbsp;
          <el-select v-model="depId" placeholder="请选择" filterable clearable style="width:170px ">
            <el-option
              v-for="(item, index) in depNameOptions"
              :key="index"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>

          用户状态:&nbsp;
          <el-select v-model="userStatus" placeholder="请选择" clearable style="width:170px ">
            <el-option
              v-for="(item, index) in userStatusOptions"
              :key="index"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div>
          <el-button type="primary" @click="handleSearch">查 询</el-button>
          <!--<el-button type="warning" @click="handleAdd">新 增</el-button>-->
        </div>
      </div>

    </jtable>
  </div>
</template>

<script>
  import { getUserInfo } from  '@/api/user'
  import { getUserDepInfo } from '@/api/dep'
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
        userName: '',
        userStatus:'',
        disabled:false,
        columnData: {  userName: '用户名称', roleName: '角色名称', userRealName: '真实名称',depName:'部门名称' ,crteDate: '创建时间', updDate: '更新时间' },
        tableData: [],
        total:0,
        loading:false,
        depId: '',                              //部门名称
        depNameOptions: [], //部门名称
        userStatusOptions: [
          {label:"启用", value:"1"},
          {label:"禁用", value:"0"},
        ]
      }
    },
    methods:{
      handleSearch(){
        let userName ='';
        let depId = '';
        let userStatus = '';
        this.loading = true;
        if(this.depId){
         depId = this.depId
        }

        if(this.userName){
           userName = this.userName;
        }

        if(this.userStatus){
         userStatus= this.userStatus
        }

        let data = {
          "depId": depId,
          "userName": userName,
          "userStatus": userStatus,
          "pageIndex": 1,
          "pageSize": 10,
          "start": 0
        };
        getUserInfo(data).then(res => {
          this.tableData= res.page.list
          this.total = res.page.totalCount;
          this.loading = false
        }).catch(()=>{
            this.loading = false
        })

//        this.queryPageList(data).then(res => {
//          this.tableData = res.data.list;
//          this.total = res.data.totalCount;
//          this.loading = false
//        }).catch(() => {
//          this.loading = false
//        })
      },
//      deleteItem(row){
//        this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
//          confirmButtonText: '确定',
//          cancelButtonText: '取消',
//          type: 'warning'
//        }).then(() => {
//          this.delete(row.ewarnId).then(res => {
//            this.$message({
//              type: 'success',
//              message: '删除成功!'
//            });
//          })
//        })
//      },
//      onSubmit() {
//        console.log(this.sizeForm.beginDate);
//        this.dialogLoading = true;
//        this.disabled = true;
//        this.save(this.sizeForm).then((res) => {
//          this.sizeForm = JSON.parse(JSON.stringify(this.sizeFormCopy));
//          this.dialogLoading = false;
//          this.disabled = false;
//          this.addWarningShow = false
//          this.$message({
//            message: '新增成功',
//            type: "success"
//          })
//        }).catch(() => {
//          this.dialogLoading = false;
//          this.disabled = false;
//        })
//      },
      ...mapActions([
        'queryPageList',
        'save',
        'warnType',
        'delete'
      ]),

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

</style>
