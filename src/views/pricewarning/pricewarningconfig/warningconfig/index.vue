<template>
  <div>
    <jtable  :tableData="tableData"
             :columnData="columnData"
             :total = "total"
             :loading="loading"
             :configShow="true"
             :statusShow="true"
             :deleteShow="true"
             @on-delete="deleteItem"
             @on-config="handleConfig"
             @pageChange="pageChange"
             v-show="tableShow">

      <!--      预警配置-->
      <div class="flex bgc">
        <div>
          预警类型:&nbsp;
          <el-select v-model="warningType">
            <el-option
              v-for="(item, index) in warningTypeOptions"
              :key="index"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>

          预警名称:&nbsp;
          <el-select v-model="warningName">
            <el-option
              v-for="(item, index) in warningNameOptions"
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

    <!--    预警详情配置-->
    <div v-if="warningSearch">

      <div class="flex-justify" v-loading="dialogLoading">
        <el-card class="card-width">
          <div slot="header">
          </div>
          <div>
            <el-form :rules="rules" ref="ruleForm" :model="sizeForm" label-width="100px">
              <el-form-item label="预警名称" prop="ewarnName">
                <el-input v-model="sizeForm.ewarnName" style="width: 250px"></el-input>
              </el-form-item>
              <el-form-item label="预警类型" prop="ewarnTypeId">
                <el-select v-model="sizeForm.ewarnTypeId" style="width: 250px">
                  <el-option
                    v-for="(item, index) in warningTypeOptions"
                    :key="index"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="调度名称" prop="ewarnTypeId">
                <el-select v-model="sizeForm.rschId" style="width: 250px">
                  <el-option
                    v-for="(item, index) in infoOptions"
                    :key="index"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="有效期" prop="endDate">
                <div style="display: flex;">
                  <el-date-picker value-format="yyyy-MM-dd HH:mm:ss" v-model="sizeForm.beginDate" type="datetime" style="width: 250px"></el-date-picker>
                  <span style="margin: 0 20px">至</span>
                  <el-date-picker value-format="yyyy-MM-dd HH:mm:ss" v-model="sizeForm.endDate" type="datetime" style="width: 250px"></el-date-picker>
                </div>
              </el-form-item>
              <el-form-item label="创建人">
                <el-input v-model="sizeForm.crteName" style="width: 250px"></el-input>
              </el-form-item>
            </el-form>
          </div>
        </el-card>

        <el-card class="card-width">
          <div slot="header">
            <i class="el-icon-s-flag" style="margin-right: 2px"></i><span>预警信息</span>
          </div>
          <div>
            <el-form :model="sizeForm" label-width="100px" :rules="rules" ref="ruleForms">
              <el-form-item label="预警区间" prop="ewarnUlmtRed">
                <div style="display: flex">
                  <el-input v-model="sizeForm.ewarnLlmtRed" placeholder="输入涨跌幅下限" style="width: 180px"></el-input>
                  <span style="margin: 0 20px">至</span>
                  <el-input v-model="sizeForm.ewarnUlmtRed" placeholder="输入涨跌幅上限" style="width: 180px"></el-input>
                  <div style="margin-left: 30px;display: flex;align-items: center">
                    <div :style="{width: '100px',height: '28px',background: 'red',borderRadius:'4px'}"></div>
                  </div>
                </div>
              </el-form-item>
              <el-form-item label="预警区间" prop="ewarnUlmtOrange">
                <div style="display: flex">
                  <el-input v-model="sizeForm.ewarnLlmtOrange" placeholder="输入涨跌幅下限" style="width: 180px"></el-input>
                  <span style="margin: 0 20px">至</span>
                  <el-input v-model="sizeForm.ewarnUlmtOrange" placeholder="输入涨跌幅上限" style="width: 180px"></el-input>
                  <div style="margin-left: 30px;display: flex;align-items: center">
                    <div :style="{width: '100px',height: '28px',background: 'orange',borderRadius:'4px'}"></div>
                  </div>
                </div>
              </el-form-item>
              <el-form-item label="预警区间" prop="ewarnUlmtYellow">
                <div style="display: flex">
                  <el-input v-model="sizeForm.ewarnLlmtYellow" placeholder="输入涨跌幅下限" style="width: 180px"></el-input>
                  <span style="margin: 0 20px">至</span>
                  <el-input v-model="sizeForm.ewarnUlmtYellow" placeholder="输入涨跌幅上限" style="width: 180px"></el-input>
                  <div style="margin-left: 30px;display: flex;align-items: center">
                    <div :style="{width: '100px',height: '28px',background: 'yellow',borderRadius:'4px'}"></div>
                  </div>
                </div>
              </el-form-item>
              <el-form-item label="预警区间" prop="ewarnUlmtGreen">
                <div style="display: flex">
                  <el-input v-model="sizeForm.ewarnLlmtGreen" placeholder="输入涨跌幅下限" style="width: 180px"></el-input>
                  <span style="margin: 0 20px">至</span>
                  <el-input v-model="sizeForm.ewarnUlmtGreen" placeholder="输入涨跌幅上限" style="width: 180px"></el-input>
                  <div style="margin-left: 30px;display: flex;align-items: center">
                    <div :style="{width: '100px',height: '28px',background: 'green',borderRadius:'4px'}"></div>
                  </div>
                </div>
              </el-form-item>
              <el-form-item label="预警期限">
                <el-radio v-model="sizeForm.ewarnTerm" label="1" @click.native="handleUpDateShow(true)">单日上涨</el-radio>
                <el-radio v-model="sizeForm.ewarnTerm" label="2" @click.native="handleUpDateShow(false)">连续上涨</el-radio>
                <el-input v-model="sizeForm.ewarnDays" style="margin-right: 10px;width: 100px" :disabled="upDateShow" ></el-input>天
              </el-form-item>
              <el-form-item label="备注">
                <el-input type="textarea" :rows="2" v-model="sizeForm.remarks"></el-input>
              </el-form-item>
            </el-form>
          </div>
        </el-card>
      </div>
      <div class="dialog-cancel">
        <el-button type="primary" @click="onSubmit" :disabled="disabled">提 交</el-button>
        <el-button type="warning" @click="handleCloseAdd">关 闭</el-button>
      </div>
    </div>


  </div>
</template>

<script>
  import jtable from '_c/Jtable'
  import { mapActions } from 'vuex'
  import { pssrschconfList } from '@/api/manager'
  export default {
    components: {
      jtable
    },
    data() {
      return {
        pageIndex: 1,
        pageSize: 10,
        rules: {
          ewarnName: [
            { required: true, message: '请输入预警名称', trigger: 'blur' },
            { min: 4, message: '最少四个字以上', trigger: 'blur' }
          ],
          ewarnTypeId: [
            { required: true, message: '请选择预警类型', trigger: 'blur' }
          ],
          endDate: [
            { required: true, message: '请选择有效期', trigger: 'blur' }
          ],
          ewarnUlmtRed: [
            { required: true, message: '请输入预警区间', trigger: 'blur' },
          ],
          ewarnUlmtOrange: [
            { required: true, message: '请输入预警区间', trigger: 'blur' },
          ],
          ewarnUlmtYellow: [
            { required: true, message: '请输入预警区间', trigger: 'blur' },
          ],
          ewarnUlmtGreen: [
            { required: true, message: '请输入预警区间', trigger: 'blur' },
          ],
        },
        tableShow:true,
        disabled:false,
        dialogLoading:false,
        sizeForm: {
          rschId: '',
          ewarnName: '',
          ewarnTypeId: '',
          beginDate:'',
          endDate:'',
          crteName:'',
          ewarnTerm:'',
          ewarnDays:0,
          remarks:'',
          ewarnUlmtRed:'',
          ewarnLlmtRed:'',
          ewarnUlmtOrange:'',
          ewarnLlmtOrange:'',
          ewarnUlmtYellow:'',
          ewarnLlmtYellow:'',
          ewarnUlmtGreen:'',
          ewarnLlmtGreen:'',
        },
        sizeFormCopy:null,
        upDateShow: true,                            //显示涨幅天数
        radio: '1',                                //预警期限单选
        upDateInput: '',                            //输入上涨天数
        warningSearch:false,                 //预警配置查看
        columnData: { ewarnName: '预警名称', ewarnTypeIdName: '预警类型', beginDate: '开始时间', endDate: '结束时间', crteDate: '创建时间', remarks: '备注' },
        tableData: [],
        total:0,
        loading:false,
        warningName: '',                              //预警名称
        warningNameOptions: [],
        warningType: '',                         //预警类型
        warningTypeOptions: [],
        infoOptions: [],
        warningTypeData:[],
        boo: true
      }
    },
    methods:{
      handleCloseSearch(){
        this.warningSearch = false
        this.tableShow = true
      },
      handleCloseAdd(){
        this.sizeForm = JSON.parse(JSON.stringify(this.sizeFormCopy))
        this.warningSearch = false
        this.tableShow = true
      },
      handleSearch(){
        let ewarnId = '';
        let ewarnTypeId = '';
        this.loading = true;
        if(this.warningName){
          for(let i in this.warningNameOptions){
            if(this.warningNameOptions[i].value === this.warningName){
              ewarnTypeId = this.warningNameOptions[i].ewarnTypeId;
              ewarnId = this.warningNameOptions[i].ewarnId;
              break
            }
          }
        }else if(this.warningType){
          ewarnTypeId = this.warningType
        }
        let data = {
          "ewarnTypeId": ewarnTypeId,
          "ewarnId": ewarnId,
          "pageIndex": this.pageIndex,
          "pageSize": this.pageSize,
        };
        this.queryPageList(data).then(res => {
          this.tableData = res.data.list;
          for (let i in this.tableData){
            for(let j in this.warningTypeData){
              if(this.tableData[i].ewarnTypeId == this.warningTypeData[j].codeId){
                this.tableData[i].ewarnTypeIdName = this.warningTypeData[j].codeName
                this.tableData[i].ewarnTypeId = parseInt(this.tableData[i].ewarnTypeId)
              }
            }
          }
          this.total = res.data.totalCount;
          this.loading = false
        }).catch(() => {
          this.loading = false
        })
      },
      deleteItem(row){
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
            for(let i in this.tableData) {
              if(this.tableData[i].ewarnId === row.ewarnId) {
                this.tableData.splice(i,1)
              }
            }
          })
        })
      },
      pageChange(size,page) {
        this.pageSize = size
        this.pageIndex = page
        this.handleSearch()
      },
      //查看详情
      handleConfig(data){
        this.boo = false
        this.sizeForm = data.row
        this.tableShow = false
        this.warningSearch = true
      },
      onSubmit() {
        this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
            this.$refs['ruleForms'].validate((valid) => {
              if(valid) {
                this.dialogLoading = true;
                this.disabled = true;
                if(this.boo) {
                  this.save(this.sizeForm).then((res) => {
                    if(res.code === 0 ) {
                      this.sizeForm = JSON.parse(JSON.stringify(this.sizeFormCopy));
                      this.dialogLoading = false;
                      this.disabled = false;
                      this.warningSearch = false
                      this.tableShow = true
                      this.$message({
                        message: '提交成功',
                        type: "success"
                      })
                      this.warnTypeJas()
                      this.handleSearch()
                    }
                  }).catch(() => {
                    this.dialogLoading = false;
                    this.disabled = false;
                    this.warningSearch = false
                    this.tableShow = true
                  })
                }else {
                  this.confUpdate(this.sizeForm).then((res) => {
                    if(res.code === 0 ) {
                      this.sizeForm = JSON.parse(JSON.stringify(this.sizeFormCopy));
                      this.dialogLoading = false;
                      this.disabled = false;
                      this.warningSearch = false
                      this.tableShow = true
                      this.$message({
                        message: '提交成功',
                        type: "success"
                      })
                      this.warnTypeJas()
                      this.handleSearch()
                    }
                  }).catch(() => {
                    this.dialogLoading = false;
                    this.disabled = false;
                    this.warningSearch = false
                    this.tableShow = true
                  })
                }

              }
            })
          } else {
            return false;
          }
        });
      },
      handleUpDateShow(boo) {                                                    //控制输入涨幅天数
        this.upDateShow = boo;
      },

      handleAdd(){                               //新增预警表
        this.boo = true
        this.tableShow = false
        this.warningSearch = true;

      },
      warnTypeJas() {
        this.warnType(3).then(res => {
          this.warningTypeData = res.data;
          this.warningTypeOptions = [];
          for (let i in this.warningTypeData) {
            this.warningTypeOptions[i] = {};
            this.warningTypeOptions[i].label = this.warningTypeData[i].codeName;
            this.warningTypeOptions[i].value = this.warningTypeData[i].codeId
          }
          this.warningTypeOptions.unshift({label:"全部", value:''})
        })

        pssrschconfList('', '').then(res => {
          let data = res.page.list
          this.infoOptions = []
          for(let i in data) {
            this.infoOptions[i] = {}
            this.infoOptions[i].label = data[i].rschName
            this.infoOptions[i].value = data[i].rschId
          }
        })
      },
      ...mapActions([
        'queryPageList',
        'save',
        'warnType',
        'delete',
        'pssrschconfInfo',
        'confUpdate'
      ]),
    },
    watch:{
      warningType(newVal,oldVal){
        this.warningName = '';
        if(newVal === ''){
          this.warningNameOptions = []
          return;
        }
        for (let i in this.warningTypeData){
          if(this.warningTypeData[i].codeId === newVal){
            let data = this.warningTypeData[i].ewarnNamelist;
            this.warningNameOptions = [];
            for(let j in data){
              this.warningNameOptions[j] = {};
              this.warningNameOptions[j].value = this.warningNameOptions[j].label = data[j].ewarnName;
              this.warningNameOptions[j].ewarnTypeId = data[j].ewarnTypeId
              this.warningNameOptions[j].ewarnId = data[j].ewarnId
            }
            this.warningNameOptions.unshift({label:'全部', value:''})
            break
          }
        }
      },
    },
    created: function () {
      this.sizeFormCopy = JSON.parse(JSON.stringify(this.sizeForm));
      this.warnTypeJas()
    }

  }
</script>

<style scoped>

</style>
