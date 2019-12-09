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
    >

      <!--      用户管理-->
      <div class="flex bgc">
        <div>
          菜单名称:&nbsp;
          <el-select v-model="menuId" placeholder="请选择" filterable  clearable style="width:170px ">
            <el-option
              v-for="(item, index) in menuNameOptions"
              :key="index"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>

          菜单状态:&nbsp;
          <el-select v-model="menuState" placeholder="请选择" clearable style="width:170px ">
            <el-option
              v-for="(item, index) in menuStateOptions"
              :key="index"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div>
          <el-button type="primary" @click="handleSearch">查 询</el-button>
          <el-button type="warning" @click="handleAdd">新 增</el-button>
          <el-button type="danger" @click="batchDelete">删除</el-button>
        </div>
      </div>

    </jtable>

    <el-dialog :visible.sync="addMenuShow" fullscreen>

      <div class="flex-justify" v-loading="dialogLoading">
        <el-card class="card-width">
          <div slot="header">

          </div>
          <div>
            <el-form ref="form" :model="menuForm" label-width="80px">
              <el-form-item label="菜单名称">
                <el-input v-model="menuForm.menuName" style="width: 280px"></el-input>
              </el-form-item>
              <el-form-item label="上级菜单">
              <el-select v-model="menuForm.pareMenuId" placeholder="一级菜单" filterable  clearable style="width:170px ">
               <el-option
                  v-for="(item, index) in menuNameOptions"
                  :key="index"
                  :label="item.label"
                  :value="item.value">
               </el-option>
              </el-select>
              </el-form-item>
              <el-form-item label="菜单类型">
                <el-select v-model="menuForm.menuType" style="width: 280px">
                  <el-option
                    v-for="(item, index) in menuTypeOptions"
                    :key="index"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="菜单状态">
                <el-radio v-model="menuForm.menuState" label="1">启用</el-radio>
                <el-radio v-model="menuForm.menuState" label="2">禁用</el-radio>
              </el-form-item>
              <el-form-item label="菜单URL">
                <el-input v-model="menuForm.menuUrl" placeholder="菜单URL" style="width: 280px"></el-input>
              </el-form-item>
              <el-form-item label="授权标识">
                <el-input v-model="menuForm.menuPerm" placeholder="多个用逗号隔开,如: user:list,user:create" style="width: 280px"></el-input>
              </el-form-item>
              <el-form-item label="图标">
                <el-input v-model="menuForm.menuIconUrl" placeholder="菜单图标" style="width: 280px"></el-input>
              </el-form-item>
            </el-form>
          </div>
        </el-card>
      </div>
      <div class="dialog-cancel">
        <el-button type="primary" @click="onSubmit" :disabled="disabled">提 交</el-button>
        <el-button type="warning" @click="addMenuShow = false">关 闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { getMenuInfo ,getMenu,save } from '@/api/menu'
  import jtable from '_c/Jtable'
  import { mapActions } from 'vuex'
  import ElInput from "../../../../node_modules/element-ui/packages/input/src/input";
  import ElFormItem from "../../../../node_modules/element-ui/packages/form/src/form-item";
  export default {
    components: {
      ElFormItem,
      ElInput,
      jtable
    },
    data() {
      return {
        menuState:'',
        disabled:false,
        dialogLoading:false,
        columnData: {  menuName: '菜单名称',  pareMenuName:'上级菜单',menuTypeName: '菜单类型',menuUrl:'菜单URL',menuIconUrl:'菜单图标',creDate: '创建时间', updDate: '更新时间' },
        tableData: [],
        addMenuShow:false,
        total:0,
        loading:false,
        menuForm:{
            menuName:'',
            pareMenuId:'',
            menuType:'',
            menuState:'',
            menuUrl:'',
            menuPerm:'',
            menuIconUrl:''
        },
        menuId: '', //角色名称
        menuNameOptions: [], //角色名称
        menuStateOptions: [
          {label:"启用", value:"1"},
          {label:"禁用", value:"0"},
        ],
        menuTypeOptions: [
          {label:"目录", value:"1"},
          {label:"菜单", value:"2"},
          {label:"按钮", value:"3"}
        ],
      }
    },
    methods:{
      onSubmit() {
        this.dialogLoading = true;
        this.disabled = true;
        save(this.menuForm).then((res) => {
          console.log(res);
          this.dialogLoading = false;
          this.disabled = false;
          this.addMenuShow = false
          this.$message({
            message: '新增成功',
            type: "success"
          })
        }).catch(() => {
          this.dialogLoading = false;
          this.disabled = false;
        })
      },
      searchDetail(data){
        this.warningSearch = data
      },
      handleSearch(){
        let menuId = '';
        let menuState = '';
        this.loading = true;

        if (this.menuId) {
          menuId = this.menuId;
        }

        if (this.menuState) {
          menuState = this.menuState
        }

        let data = {
          "menuId": menuId,
          "menuState": menuState,
          "pageIndex": 1,
          "pageSize": 10,
          "start": 0
        };
        getMenuInfo(data).then(res => {
          this.tableData = res.page.list
          this.total = res.page.totalCount;
          this.loading = false
        }).catch(() => {
          this.loading = false
        })
      },
      handleAdd(){
        this.addMenuShow = true;
      },
      batchDelete(){
        this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.delete(row.ewarnId).then(res => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          })
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
      getMenu().then((res) =>{
        this.menuNameOptions = res.menu
      })
    }

  }
</script>

<style scoped>

</style>
