<template>
  <div>
    <jtable  :tableData="tableData"
             :columnData="columnData"
             :total = "total"
             :loading="loading"
             :selection="true"
             :statusShow="true"
             :deleteShow="true"
             :configShow = "true"
             :index="true"
             :searchShow="true"
             preview="功能权限"
             @pageChange="pageChange"
             @on-detail="handleDetail"
             @on-config="roleConfig"
             @on-delete="deleteRole"
             v-show="mainShow"
    >

      <!--      角色管理-->
      <div class="flex bgc">
        <div>
          角色名称:&nbsp;
          <el-select v-model="roleId" placeholder="请选择" filterable  clearable style="width:170px ">
            <el-option
              v-for="(item, index) in roleNameOptions"
              :key="index"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>

          角色状态:&nbsp;
          <el-select v-model="roleState" placeholder="请选择" clearable style="width:170px ">
            <el-option
              v-for="(item, index) in roleStateOptions"
              :key="index"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div>
          <el-button type="primary" @click="handleSearch">查 询</el-button>
          <el-button type="warning" @click="handleAddNew(true)">新 增</el-button>
        </div>
      </div>

    </jtable>
    <el-dialog :visible.sync="addRoleShow" fullscreen>

      <div class="flex-justify" v-loading="dialogLoading">
        <el-card class="card-width">
          <div slot="header">

          </div>
          <div>
            <el-form ref="form" :model="roleForm" :rules="rules" >
              <el-form-item >
                <el-input v-model="roleForm.roleId" v-if="false"/>
              </el-form-item>
              <el-form-item label="角色名称" prop="roleName">
                <el-input v-model="roleForm.roleName"  style="width: 280px"></el-input>
              </el-form-item>
              <el-form-item label="角色类型" prop="roleTypeId" >
                <el-select v-model="roleForm.roleTypeId" filterable  clearable  style="width: 280px">
                  <el-option
                    v-for="(item, index) in roleTypeOptions"
                    :key="index"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="角色状态" prop="roleState">
                <el-radio-group v-model="roleForm.roleState"   >
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
        <el-button type="warning" @click="closeRole">关 闭</el-button>
      </div>
    </el-dialog>
    <div v-show="addShow">
      <el-tree
        :data="data"
        :props="defaultProps"
        show-checkbox
        node-key="menu_id"
        @check="getCheckedNodes"
        :default-expanded-keys="[1]"
        :default-checked-keys="defaultChecked">
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <span style="margin-left: 7px">
            <i class="el-icon-folder-opened" v-show="node.childNodes.length"></i>
            <i class="el-icon-folder" v-show="!node.childNodes.length"></i>
            {{ node.label }}
          </span>
<!--          <span>-->
<!--            <el-button-->
<!--              type="text"-->
<!--              size="mini"-->
<!--              @click="() => append(node,data)">-->
<!--              Append-->
<!--            </el-button>-->
<!--          </span>-->
        </span>
      </el-tree>
      <div style="margin-top: 20px;display: flex;justify-content: right;">
        <el-button @click="handleSave" type="primary" >保 存</el-button>
        <el-button @click="handleAdd(false)">关 闭</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import { getRoleInfo ,getRole,rolePerm,authority,addRole,deleteRoles,getRoleById } from '@/api/role'
  import jtable from '_c/Jtable'
  import { mapActions } from 'vuex'
  export default {
    components: {
      jtable
    },
    data() {
      return {
        checkedKeys:[],
        defaultChecked:[],
        data: [],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        pageIndex: 1,
        pageSize: 10,
        mainShow: true,
        addRoleShow: false,
        addShow: false,
        roleState:'',
        disabled:false,
        columnData: {  roleName: '角色名称', roleTypeName: '角色类型' ,creDate: '创建时间', updDate: '更新时间' },
        tableData: [],
        total:0,
        loading:false,
        roleForm:{
          roleId:'',
          roleName:'',
          roleState:'',
          roleTypeId:''
        },
        roleId: '',                              //角色名称
        chooseRoleId: '',
        chooseTypeId:'',
        roleNameOptions: [], //角色名称
        roleStateOptions: [
          {label:"启用", value:"1"},
          {label:"禁用", value:"0"},
        ],
        roleTypeOptions: [
          {label:"系统管理员", value:1},
          {label:"平台使用者", value:2},
        ],
        rules: {
          roleName:[ { required: true, message: '请输入角色名称', trigger: 'blur' }],
          roleTypeId:[ { required: true, message: '请选择角色类型', trigger: 'change' }],
          roleState:[ { required: true, message: '请指定角色的状态', trigger: 'change' }],
        }
      }
    },
    methods:{
      getCheckedNodes(val1,val2){
        this.checkedKeys = val2.checkedKeys
      },
      append(node,data){
        console.log(node)
        console.log(data)
      },
      getDataInfoTypeImpl(){
        rolePerm(this.chooseRoleId).then(res => {
          this.defaultChecked = []
          for(let i in res.data) {
            res.data[i].id = res.data[i].menu_id
            res.data[i].parentId = res.data[i].pare_menu_id
            res.data[i].label = res.data[i].menu_name
          }
          for(let i in res.data){
            if(res.data[i].role_id){
              this.defaultChecked.push(res.data[i].menu_id)
            }
          }
          this.data = this.filterArray(res.data,0)
          console.log(this.data)
        })
      },
      filterArray(data, parent) {
        let treeNode = [];
        let temp;
        for (let i = 0; i < data.length; i++) {
          if (data[i].parentId === parent) {
            let obj = data[i];
            temp = this.filterArray(data, data[i].id);
            if (temp.length > 0) {
              obj.children = temp;
            }
            treeNode.push(obj);
          }
        }
        return treeNode;
      },
      handleDetail(data){
        this.mainShow = false
        this.addShow = true
        this.chooseRoleId = data.row.roleId
        this.chooseTypeId = data.row.roleTypeId
        this.getDataInfoTypeImpl()
      },
      handleSave(){
        let data = {
          "roleId":this.chooseRoleId,
          "roleTypeId":this.chooseTypeId,
          "menuIdList":this.checkedKeys
        }
        authority(data).then(res=>{
          this.$message({
            message:'保存成功',
            type:'success'
          })
          this.handleAdd(false)
//          this.addShow = false
        })
      },
      handleAdd(data) {
        this.mainShow = !data
        this.addShow = data
      },
      onSubmit() {
        this.dialogLoading = true;
        this.disabled = true;
        addRole(this.roleForm).then((res) => {
          if(res.code == 0){
          this.dialogLoading = false;
          this.disabled = false;
          this.addRoleShow = false;
          this.roleForm={
            roleId:'',
            roleName:'',
            roleState:'',
            roleTypeId:''
          };
          this.$message({
            message: '操作完成',
            type: "success"
          })
          this.handleSearch()
          getRole().then((res) =>{
            this.roleNameOptions = res.roles
          })
        }else {
            this.dialogLoading = true;
            this.disabled = true;
            this.$message({
              message:res.msg,
              type: "error"
            })
          }} ).catch(() => {
          this.dialogLoading = false;
          this.disabled = false;
        })
      },
      roleConfig(data){
        let roleId = '';
        if (data.row.roleId) {
          roleId = data.row.roleId;
        }
        let pm ={
          "roleId":roleId
        }
        getRoleById(pm).then(res => {
          this.roleForm.roleId = res.role.roleId;
          this.roleForm.roleName = res.role.roleName;
          this.roleForm.roleState = res.role.roleState;
          this.roleForm.roleTypeId = res.role.roleTypeId;
          this.addRoleShow = true;
        })
      },
      closeRole(){
        this.roleForm = {
          roleId:'',
          roleName:'',
          roleState:'',
          roleTypeId:''
        },
          this.addRoleShow = false;
      },
      handleAddNew() {
        this.addRoleShow = true
      },
      deleteRole(data){
        this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let pm = []
          pm.push(data.roleId)
          let pmr ={
            "ids":pm
          }
          deleteRoles(pmr).then(res => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.handleSearch()
            getRole().then((res) =>{
              this.roleNameOptions = res.roles
            })
          })
        })
      },
      pageChange(size,page) {
        this.pageSize = size
        this.pageIndex = page
        this.handleSearch()
      },
      handleSearch(){
        let roleId = '';
        let roleState = '';
        this.loading = true;

        if (this.roleId) {
          roleId = this.roleId;
        }

        if (this.roleState) {
          roleState = this.roleState
        }

        let data = {
          "roleId": roleId,
          "roleState": roleState,
          "pageIndex": this.pageIndex,
          "pageSize": this.pageSize
        };
        getRoleInfo(data).then(res => {
          this.tableData = res.page.list
          this.total = res.page.totalCount;
          this.loading = false
        }).catch(() => {
          this.loading = false
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
    created() {
      this.handleSearch()
      getRole().then((res) =>{
        this.roleNameOptions = res.roles
      })
    }

  }
</script>

<style scoped>

</style>
