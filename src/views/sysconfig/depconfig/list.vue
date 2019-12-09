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
          <!--<el-button type="warning" @click="handleAdd">新 增</el-button>-->
        </div>
      </div>

    </jtable>
  </div>
</template>

<script>
  import { getUserDepInfo ,getDepInfo } from '@/api/dep'
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
        columnData: {  depName: '部门名称', superDepName: '上级部门名称' ,creDate: '创建时间', updDate: '更新时间' },
        tableData: [],
        total:0,
        loading:false,
        depId: '',                              //部门名称
        depNameOptions: [], //部门名称
        depStateOptions: [
          {label:"启用", value:"1"},
          {label:"禁用", value:"0"},
        ]
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
          "pageIndex": 1,
          "pageSize": 10,
          "start": 0
        };
        getDepInfo(data).then(res => {
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
      getUserDepInfo().then((res)=>{
        this.depNameOptions = res.dep
      })
    }

  }
</script>

<style scoped>

</style>
