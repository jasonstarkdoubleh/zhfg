<template>
  <div>
    <jtable  :tableData="tableData"
             :columnData="columnData"
             :total = "total"
             :loading="loading"
             :selection="true"
             :statusShow="true"
             :index="true"
             :configShow = "true"
             :deleteShow="true"
             @on-config="updateUserConfig"
             @on-delete="deleteItem"
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
          <el-button type="warning" @click="handleAdd">新 增</el-button>
        </div>
      </div>

    </jtable>
    <el-dialog :visible.sync="updateUserShow" fullscreen>

      <div class="flex-justify" v-loading="dialogLoading">
        <el-card class="card-width">
          <div slot="header">

          </div>
          <div>
            <el-form :rules="rules" ref="form" :model="userForm"  >
              <el-form-item >
                <el-input v-model="userForm.userId" v-if="false"/>
              </el-form-item>
              <el-form-item >
                <el-input v-model="userForm.depId" v-if="false"/>
              </el-form-item>
              <el-form-item label="用户登录名称" style="margin-left:11px" prop="userName">
                <el-input v-model="userForm.userName"  style="width: 280px;margin-left:20px" @blur="checkUserName"></el-input>
              </el-form-item>
              <el-form-item label="用户真实名称" prop="userRealName">
                <el-input v-model="userForm.userRealName"  style="width: 280px;margin-left:20px"></el-input>
              </el-form-item>
              <el-form-item label="用户所属部门" prop="depId">
                <el-select v-model="userForm.depId" placeholder="用户所属部门" filterable  clearable  style="width:170px ;margin-left:20px">
                  <el-option
                    v-for="(item, index) in depNameOptions"
                    :key="index"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="用户手机号码" style="margin-left:11px" prop="mblPhoneNo">
                <el-input v-model="userForm.mblPhoneNo" style="width: 280px;margin-left:20px"></el-input>
              </el-form-item>
              <el-form-item label="用户所属角色" prop="roles" >
                <el-select v-model="userForm.roles" placeholder="用户角色" filterable multiple clearable  style="width:170px ;margin-left:20px">
                  <el-option
                    v-for="(item, index) in roleOptions"
                    :key="index"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="用户邮箱" style="margin-left:11px" prop="email" >
                <el-input v-model="userForm.email" style="width: 280px ;margin-left:45px" @blur="checkEmail"></el-input>
              </el-form-item>
              <el-form-item label="角色状态" prop="userStatus">
                <el-radio-group v-model="userForm.userStatus" style="margin-left:45px">
                  <el-radio  :label="1">启用</el-radio>
                  <el-radio  :label="0">禁用</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-form>
          </div>
        </el-card>
      </div>
      <div class="dialog-cancel" style="float: left;padding-left:10px">
        <el-button type="primary" @click="onSubmit" :disabled="disabled">提 交</el-button>
        <el-button type="warning" @click="closeUserConfig">关 闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { getUserInfo,updateUserInfo,updateUser,deleteUser } from  '@/api/user'
  import { getUserDepInfo } from '@/api/dep'
  import { getRole } from '@/api/role'
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
        dialogLoading:false,
        columnData: {  userName: '用户名称', roleName: '角色名称', userRealName: '真实名称',depName:'部门名称' ,crteDate: '创建时间', updDate: '更新时间' },
        tableData: [],
        updateUserShow: false,
        total:0,
        loading:false,
        depId: '',                              //部门名称
        depNameOptions: [], //部门名称
        userStatusOptions: [
          {label:"启用", value:"1"},
          {label:"禁用", value:"0"},
        ],
        roleOptions:[],
        userForm:{
          userId:'',
          userName:'',
          depId:'',
          email:'',
          depName:'',
          userRealName:'',
          mblPhoneNo:'',
          userStatus:'',
          roles:[]
        },
        rules: {
          userRealName:[ { required: true, message: '请输入用户真实名称', trigger: 'blur' }],
          depId:[ { required: true, message: '请选择用户所属部门', trigger: 'change' }],
          roles:[ { required: true, message: '请给用户分配角色', trigger: 'change' }],
          userStatus:[ { required: true, message: '请指定用户状态', trigger: 'blur' }]
        }
      }
    },
    methods:{
      checkEmail:function(){
        var regEmail = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/

        if (this.userForm.email != '' && this.userForm.email != null  && !regEmail.test(this.userForm.email)) {
          this.$message({
            message: '邮箱格式不正确',
            type: 'error'
          })
          this.userForm.email = ''
        }
      },
      checkUserName:function(){
        var regName = /^[0-9a-zA-Z]{5,20}$/;
        if (this.userForm.userName != '' && !regName.test(this.userForm.userName)) {
          this.$message({
            message: '用户名称应为5-20位英文字母或数字组合',
            type: 'error'
          })
          this.userForm.userName = ''
        }
      },

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
      handleAdd(){
        getRole().then(res=>{
          this.roleOptions = res.roles
        })
        this.updateUserShow = true
      },
      closeUserConfig(){
        this.userForm={
          userId:'',
          userName:'',
          depId:'',
          depName:'',
          userRealName:'',
          mblPhoneNo:'',
          userStatus:'',
          roles:[]
        }
        this.updateUserShow = false
      },
      updateUserConfig(data){
        let userId = '';
        if (data.row.userId) {
          userId = data.row.userId;
        }
        updateUserInfo(userId).then(res => {
          getRole().then(res=>{
            this.roleOptions = res.roles
          })
          this.userForm.userName = res.user.userName;
          this.userForm.userId = res.user.userId;
          this.userForm.depId = res.user.depId;
          this.userForm.userRealName = res.user.userRealName;
          this.userForm.mblPhoneNo = res.user.mblPhoneNo;
          this.userForm.userStatus = res.user.userStatus;
          this.userForm.roles = res.user.roles;
          this.userForm.email = res.user.email;
          this.updateUserShow = true;
        })
      },
      deleteItem(row){
        this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let pm = []
          pm.push(row.userId)
          let pmr ={
            "ids":pm
          }
          deleteUser(pmr).then(res => {
              if(res.code==0){
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
              }
          })
        })
      },
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
      onSubmit() {
        this.dialogLoading = true;
        this.disabled = true;
        updateUser(this.userForm).then((res) => {
          if(res.code == 0){
          this.dialogLoading = false;
          this.disabled = false;
          this.updateUserShow = false;
          this.userForm={
            userId:'',
            userName:'',
            depId:'',
            depName:'',
            userRealName:'',
            mblPhoneNo:'',
            userStatus:'',
            roles:[]
          }
          this.$message({
            message: '用户数据更新完成',
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
              message: res.msg,
              type: "error"
            })
          }
        }).catch(() => {
          this.dialogLoading = false;
          this.disabled = false;
        })
      },
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
