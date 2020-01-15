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
             @on-config="getDepConfig"
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
    <el-dialog :visible.sync="updateDepShow" fullscreen>

      <div class="flex-justify" v-loading="dialogLoading">
        <el-card class="card-width">
          <div slot="header">

          </div>
          <div>
            <el-form ref="form" :model="userDepForm" label-width="80px">
              <el-form-item >
                <el-input v-model="userDepForm.depId" v-if="false"/>
              </el-form-item>
              <el-form-item >
                <el-input v-model="userDepForm.superDepId" v-if="false"/>
              </el-form-item>
              <el-form-item label="部门名称" style="width:100px">
                <el-input v-model="userDepForm.depName" readonly style="width: 280px"></el-input>
              </el-form-item>
              <el-form-item label="上级部门">
                <el-select v-model="userDepForm.superDepId" placeholder="一级菜单" filterable  clearable style="width:170px ">
                  <el-option
                    v-for="(item, index) in depNameOptions"
                    :key="index"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="部门状态">
                <el-radio-group v-model="userDepForm.depState">
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
  import { getUserDepInfo ,getDepInfo,updateDepInfo,getInfo } from '@/api/dep'
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
      onSubmit() {
        this.dialogLoading = true;
        this.disabled = true;
        updateDepInfo(this.userDepForm).then((res) => {
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

</style>
