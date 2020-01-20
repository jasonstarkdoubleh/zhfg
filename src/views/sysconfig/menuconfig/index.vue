<template>
  <div>
    <jtable  :tableData="tableData"
             :columnData="columnData"
             :total = "total"
             :loading="loading"
             :selection="true"
             :statusShow="true"
             :configShow = "true"
             :index="true"
             @pageChange="pageChange"
             @on-config="menuConfig"

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
          <!--<el-button type="danger" @click="batchDelete">删除</el-button>-->
        </div>
      </div>

    </jtable>

    <el-dialog :visible.sync="addMenuShow" fullscreen>

      <div class="flex-justify" v-loading="dialogLoading">
        <el-card class="card-width">
          <div slot="header">

          </div>
          <div>
            <el-form ref="form" :model="menuForm" :rules="rules">
              <el-form-item >
                <el-input v-model="menuForm.menuId" v-if="false"/>
              </el-form-item>
              <el-form-item label="菜单名称" prop="menuName">
                <el-input v-model="menuForm.menuName"  style="width: 280px;margin-left:20px"></el-input>
              </el-form-item>
              <el-form-item label="上级菜单"  prop="pareMenuId">
              <el-select v-model="menuForm.pareMenuId" placeholder="一级菜单"  filterable  clearable style="width:170px ;margin-left:20px">
               <el-option
                  v-for="(item, index) in menuNameOptions"
                  :key="index"
                  :label="item.label"
                  :value="item.value">
               </el-option>
              </el-select>
              </el-form-item>
              <el-form-item label="菜单类型"  prop="menuType">
                <el-select v-model="menuForm.menuType" filterable  clearable  style="width: 280px;margin-left:20px">
                  <el-option
                    v-for="(item, index) in menuTypeOptions"
                    :key="index"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="菜单状态"  prop="menuState">
                <el-radio-group v-model="menuForm.menuState" style="margin-left: 20px" >
                  <el-radio  :label="1">启用</el-radio>
                  <el-radio  :label="0">禁用</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="菜单排序"  prop="menuOrder">
                <el-input-number v-model="menuForm.menuOrder" :min="1" style="margin-left: 20px"></el-input-number>
              </el-form-item>
              <el-form-item label="菜单路由"  prop="menuRouter">
                <el-input v-model="menuForm.menuRouter"  placeholder="菜单路由" style="width: 280px;margin-left:20px"></el-input>
              </el-form-item>
              <el-form-item label="菜单URL" style="margin-left:11px">
                <el-input v-model="menuForm.menuUrl" placeholder="菜单URL" style="width: 280px;margin-left:18px"></el-input>
              </el-form-item>
              <el-form-item label="授权标识" style="margin-left:11px">
                <el-input v-model="menuForm.menuPerm" placeholder="多个用逗号隔开,如: user:list,user:create" style="width: 280px;margin-left:18px"></el-input>
              </el-form-item>
              <!--<el-form-item label="图标">-->
                <!--<el-input v-model="menuForm.menuIconUrl" placeholder="菜单图标" style="width: 280px"></el-input>-->
              <!--</el-form-item>-->
            </el-form>
          </div>
        </el-card>
      </div>
      <div class="dialog-cancel" style="float: left;padding-left:10px">
        <el-button type="primary" @click="onSubmit" :disabled="disabled">提 交</el-button>
        <el-button type="warning" @click="closeMenu">关 闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { getMenuInfo ,getMenu,saveOrUpdate,getMenuById,deleteMenus } from '@/api/menu'
  import jtable from '_c/Jtable'
  import { mapActions } from 'vuex'
  import ElInput from "../../../../node_modules/element-ui/packages/input/src/input";
  import ElFormItem from "../../../../node_modules/element-ui/packages/form/src/form-item";
  import ElRadioGroup from "../../../../node_modules/element-ui/packages/radio/src/radio-group";
  import ElInputNumber from "../../../../node_modules/element-ui/packages/input-number/src/input-number";
  export default {
    components: {
      ElInputNumber,
      ElRadioGroup,
      ElFormItem,
      ElInput,
      jtable
    },
    data() {
      return {
        menuState:'',
        disabled:false,
        dialogLoading:false,
        columnData: {  menuName: '菜单名称',  pareMenuName:'上级菜单',menuTypeName: '菜单类型',menuUrl:'菜单URL',creDate: '创建时间', updDate: '更新时间' },
        tableData: [],
        pageIndex: 1,
        pageSize: 10,
        addMenuShow:false,
        total:0,
        loading:false,
        menuForm:{
          menuId:'',
          menuName:'',
          pareMenuId:'',
          menuType:'',
          menuState:'',
          menuRouter:'',
          menuUrl:'',
          menuPerm:'',
          menuIconUrl:'',
          menuOrder:''
        },
        menuId: '', //角色名称
        menuNameOptions: [], //角色名称
        menuStateOptions: [
          {label:"启用", value:"1"},
          {label:"禁用", value:"0"},
        ],
//        menuTypeOptions: [
//          {label:"目录", value:"1"},
//          {label:"菜单", value:"2"},
//          {label:"按钮", value:"3"}
//        ],
        menuTypeOptions: [
          {label:"目录", value:1},
          {label:"菜单", value:2}
        ],
        rules: {
          menuName:[ { required: true, message: '请输入菜单名称信息', trigger: 'blur' }],
          pareMenuId:[ { required: true, message: '请选择所属上级菜单', trigger: 'change' }],
          menuType:[ { required: true, message: '请指定菜单类型', trigger: 'change' }],
          menuState:[ { required: true, message: '请指定角色的状态', trigger: 'change' }],
          menuRouter:[ { required: true, message: '请输入菜单路由信息', trigger: 'blur' }],
          menuOrder:[ { required: true, message: '请指定菜单显示顺序', trigger: 'change' }]
        }
      }
    },
    methods:{
      onSubmit() {
        this.dialogLoading = true;
        this.disabled = true;
        saveOrUpdate(this.menuForm).then((res) => {
            if(res.code==0) {
              this.dialogLoading = false;
              this.disabled = false;
              this.addMenuShow = false;
              this.menuForm={
                menuId:'',
                menuName:'',
                pareMenuId:'',
                menuType:'',
                menuState:'',
                menuRouter:'',
                menuUrl:'',
                menuPerm:'',
                menuIconUrl:'',
                menuOrder:''
              };
              this.$message({
                message: '操作完成',
                type: "success"
              })
              this.handleSearch()
              getMenu().then((res) =>{
                this.menuNameOptions = res.menu
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
      searchDetail(data){
        this.warningSearch = data
      },
    pageChange(size,page) {
      this.pageSize = size
      this.pageIndex = page
      this.handleSearch()
    },
      closeMenu(){
        this.menuForm={
          menuId:'',
          menuName:'',
          pareMenuId:'',
          menuType:'',
          menuState:'',
          menuRouter:'',
          menuUrl:'',
          menuPerm:'',
          menuIconUrl:'',
          menuOrder:''
        },
          this.addMenuShow = false;
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
          "pageIndex": this.pageIndex,
          "pageSize": this.pageSize
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
      menuConfig(data){
        let menuId = '';
        if (data.row.menuId) {
          menuId = data.row.menuId;
        }
        let pm ={
          "menuId":menuId
        }
        getMenuById(pm).then(res => {
          this.menuForm.menuName = res.menu.menuName;
          this.menuForm.pareMenuId = res.menu.pareMenuId;
          this.menuForm.menuType = res.menu.menuType;
          this.menuForm.menuState = res.menu.menuState;
          this.menuForm.menuUrl = res.menu.menuUrl;
          this.menuForm.menuPerm = res.menu.menuPerm;
          this.menuForm.menuIconUrl = res.menu.menuIconUrl;
          this.menuForm.menuId = res.menu.menuId;
          this.menuForm.menuRouter = res.menu.menuRouter;
          this.menuForm.menuOrder = res.menu.menuOrder;
          this.addMenuShow = true;
        })
      },
//      batchDelete(){
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
      deleteMenu(data){
        this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let pm = []
          pm.push(data.menuId)
          let pmr ={
            "ids":pm
          }
          deleteMenus(pmr).then(res => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.handleSearch()
            getMenu().then((res) =>{
              this.menuNameOptions = res.menu
            })
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
