<template>
  <div>
    <jtable  :tableData="tableData"
             :columnData="columnData"
             :total = "total"
             :loading="loading"
             :selection="true"
             :statusShow="true"
             :index="true"
             :searchShow="true"
             preview="功能权限"
             @on-detail="handleDetail"
             v-show="mainShow"
    >

      <!--      用户管理-->
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
          <el-button type="warning" @click="handleAdd(true)">新 增</el-button>
        </div>
      </div>

    </jtable>

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
  import { getRoleInfo ,getRole,rolePerm,authority } from '@/api/role'
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
        mainShow: true,
        addShow: false,
        roleState:'',
        disabled:false,
        columnData: {  roleName: '角色名称', roleTypeName: '角色类型' ,creDate: '创建时间', updDate: '更新时间' },
        tableData: [],
        total:0,
        loading:false,
        roleId: '',                              //角色名称
        chooseRoleId: '',
        roleNameOptions: [], //角色名称
        roleStateOptions: [
          {label:"启用", value:"1"},
          {label:"禁用", value:"0"},
        ]
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
        this.getDataInfoTypeImpl()
      },
      handleSave(){
        let data = {
          "roleId":this.chooseRoleId,
          "menuIdList":this.checkedKeys
        }
        authority(data).then(res=>{
          this.$message({
            message:'保存成功',
            type:'success'
          })
          this.handleAdd(false)
        })
      },
      handleAdd(data) {
        this.mainShow = !data
        this.addShow = data
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
          "pageIndex": 1,
          "pageSize": 10,
          "start": 0
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
