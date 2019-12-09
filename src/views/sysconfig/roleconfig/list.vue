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
          <!--<el-button type="warning" @click="handleAdd">新 增</el-button>-->
        </div>
      </div>

    </jtable>
  </div>
</template>

<script>
  import { getRoleInfo ,getRole } from '@/api/role'
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
        roleState:'',
        disabled:false,
        columnData: {  roleName: '角色名称', roleTypeName: '角色类型' ,creDate: '创建时间', updDate: '更新时间' },
        tableData: [],
        total:0,
        loading:false,
        roleId: '',                              //角色名称
        roleNameOptions: [], //角色名称
        roleStateOptions: [
          {label:"启用", value:"1"},
          {label:"禁用", value:"0"},
        ]
      }
    },
    methods:{
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
            console.log(res)
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
    mounted(){

    },
    created: function () {
      this.handleSearch()
       getRole().then((res) =>{
           this.roleNameOptions = res.roles
       })
    }

  }
</script>

<style scoped>

</style>
