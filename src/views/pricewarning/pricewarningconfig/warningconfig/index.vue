<template>
  <div>
    <transition name="fade-transform" mode="out-in">
      <div v-show="tableShow">
        <jtable  :tableData="tableData"
                 :columnData="columnData"
                 :total = "total"
                 :loading="loading"
                 :searchShow="true"
                 :statusShow="true"
                 :deleteShow="true"
                 @on-delete="deleteItem"
                 @on-detail="searchDetail">

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
      </div>
    </transition>

    <div v-show="addWarningShow">
      <!--      <el-dialog :visible.sync="addWarningShow" fullscreen>-->

      <div class="flex-justify" v-loading="dialogLoading">
        <el-card class="card-width">
          <div slot="header">

          </div>
          <div>
            <el-form ref="form" :model="sizeForm" label-width="80px">
              <el-form-item label="预警名称">
                <el-input v-model="sizeForm.ewarnName" style="width: 280px"></el-input>
              </el-form-item>
              <el-form-item label="预警类型">
                <el-select v-model="sizeForm.ewarnTypeId" style="width: 280px">
                  <el-option
                    v-for="(item, index) in warningTypeOptions"
                    :key="index"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="有效期">
                <div style="display: flex;">
                  <el-date-picker value-format="yyyy-MM-dd HH:mm:ss" v-model="sizeForm.beginDate" type="datetime" style="width: 280px"></el-date-picker>
                  <span style="margin: 0 20px">至</span>
                  <el-date-picker value-format="yyyy-MM-dd HH:mm:ss" v-model="sizeForm.endDate" type="datetime" style="width: 280px"></el-date-picker>
                </div>
              </el-form-item>
              <el-form-item label="创建人">
                <el-input v-model="sizeForm.crteName" style="width: 280px"></el-input>
              </el-form-item>
            </el-form>
          </div>
        </el-card>

        <el-card class="card-width">
          <div slot="header">
            <i class="el-icon-s-flag" style="margin-right: 2px"></i><span>预警信息</span>
          </div>
          <div>
            <el-form ref="form" :model="sizeForm" label-width="80px">
              <el-form-item label="预警区间">
                <div style="display: flex">
                  <el-input v-model="sizeForm.ewarnLlmtRed" placeholder="输入涨跌幅下限" style="width: 180px"></el-input>
                  <span style="margin: 0 20px">至</span>
                  <el-input v-model="sizeForm.ewarnUlmtRed" placeholder="输入涨跌幅上限" style="width: 180px"></el-input>
                  <div style="margin-left: 30px;display: flex">
                    <div :style="{width: '100px',height: '28px',background: colorOne,borderRadius:'4px'}"></div>
                    <el-color-picker v-model="colorOne" style="margin-left: 5px"></el-color-picker>
                  </div>
                </div>
              </el-form-item>
              <el-form-item label="预警区间">
                <div style="display: flex">
                  <el-input v-model="sizeForm.ewarnLlmtOrange" placeholder="输入涨跌幅下限" style="width: 180px"></el-input>
                  <span style="margin: 0 20px">至</span>
                  <el-input v-model="sizeForm.ewarnUlmtOrange" placeholder="输入涨跌幅上限" style="width: 180px"></el-input>
                  <div style="margin-left: 30px;display: flex">
                    <div :style="{width: '100px',height: '28px',background: colorTwo,borderRadius:'4px'}"></div>
                    <el-color-picker v-model="colorTwo" style="margin-left: 5px"></el-color-picker>
                  </div>
                </div>
              </el-form-item>
              <el-form-item label="预警区间">
                <div style="display: flex">
                  <el-input v-model="sizeForm.ewarnLlmtYellow" placeholder="输入涨跌幅下限" style="width: 180px"></el-input>
                  <span style="margin: 0 20px">至</span>
                  <el-input v-model="sizeForm.ewarnUlmtYellow" placeholder="输入涨跌幅上限" style="width: 180px"></el-input>
                  <div style="margin-left: 30px;display: flex">
                    <div :style="{width: '100px',height: '28px',background: colorThree,borderRadius:'4px'}"></div>
                    <el-color-picker v-model="colorThree" style="margin-left: 5px"></el-color-picker>
                  </div>
                </div>
              </el-form-item>
              <el-form-item label="预警区间">
                <div style="display: flex">
                  <el-input v-model="sizeForm.ewarnLlmtGreen" placeholder="输入涨跌幅下限" style="width: 180px"></el-input>
                  <span style="margin: 0 20px">至</span>
                  <el-input v-model="sizeForm.ewarnUlmtGreen" placeholder="输入涨跌幅上限" style="width: 180px"></el-input>
                  <div style="margin-left: 30px;display: flex">
                    <div :style="{width: '100px',height: '28px',background: colorFour,borderRadius:'4px'}"></div>
                    <el-color-picker v-model="colorFour" style="margin-left: 5px"></el-color-picker>
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
        <el-button type="warning" @click="addWarningShow = false">关 闭</el-button>
      </div>
      <!--      </el-dialog>-->
    </div>


<!--    预警配置查看-->

    <el-dialog :visible.sync="warningSearch" fullscreen>

      <!--      预警表单 一-->
      <el-table :data="warningSearchData" border>
        <el-table-column property="name" label="预警名称" align="center"></el-table-column>
        <el-table-column property="plain" label="预警_常规_通用" align="center"></el-table-column>
        <el-table-column property="type" label="预警类型" align="center"></el-table-column>
        <el-table-column property="common" label="常规预警" align="center"></el-table-column>
        <el-table-column property="validity" label="有效期" align="center"></el-table-column>
        <el-table-column property="start" label="开始时间" align="center"></el-table-column>
        <el-table-column property="to" label="至" align="center" width="50" ></el-table-column>
        <el-table-column property="end" label="结束时间" align="center"></el-table-column>
      </el-table>

      <!--      预警表单 二-->
      <el-table :data="warningInfo" border :header-cell-style="discountHeaderStyle" :cell-style="discountCellStyle">
        <el-table-column label="预警信息" align="center">
          <el-table-column label="预警区间" align="center">
            <el-table-column property="name" label="预警名称" align="center"></el-table-column>
            <el-table-column property="plain" label="预警_常规_通用" align="center"></el-table-column>
            <el-table-column property="type" label="预警类型" align="center"></el-table-column>
          </el-table-column>
          <el-table-column label="预警区间" align="center">
            <el-table-column property="common" label="常规预警" align="center"></el-table-column>
          </el-table-column>
          <el-table-column label="预警区间" align="center">
            <el-table-column property="validity" label="有效期" align="center"></el-table-column>
            <el-table-column property="start" label="开始时间" align="center"></el-table-column>
            <el-table-column property="to" label="至" align="center"></el-table-column>
          </el-table-column>
          <el-table-column label="预警区间" align="center">
            <el-table-column property="end" label="结束时间" align="center"></el-table-column>
          </el-table-column>
        </el-table-column>
      </el-table>

      <!--      预警表单 三-->
      <el-table :data="warningDate" border id="warningDate" :show-header="false" :span-method="arraySpanMethod">
        <el-table-column property="name" label="预警名称" align="center"></el-table-column>
        <el-table-column property="plain" label="预警_常规_通用" align="center">
          <template slot-scope="scope">
            <el-radio v-model="radio" label="1" @click.native="handleUpDateShow(true)">单日上涨</el-radio>
            <el-radio v-model="radio" label="2" @click.native="handleUpDateShow(false)">连续上涨</el-radio>
            <el-input v-model="upDateInput" style="margin-right: 10px;width: 100px" :disabled="upDateShow" ></el-input>天
          </template>
        </el-table-column>
        <el-table-column property="type" label="预警类型" align="center"></el-table-column>
        <el-table-column property="common" label="常规预警" align="center"></el-table-column>
        <el-table-column property="validity" label="有效期" align="center"></el-table-column>
        <el-table-column property="start" label="开始时间" align="center"></el-table-column>
        <el-table-column property="to" label="至" align="center"></el-table-column>
        <el-table-column property="end" label="结束时间" align="center"></el-table-column>
      </el-table>

      <!--      预警表单 四-->
      <el-table :data="warningMarks" border :show-header="false" :span-method="arraySpanMethod">
        <el-table-column property="name" label="预警名称" align="center"></el-table-column>
        <el-table-column property="plain" label="预警_常规_通用" align="center"></el-table-column>
        <el-table-column property="type" label="预警类型" align="center"></el-table-column>
        <el-table-column property="common" label="常规预警" align="center"></el-table-column>
        <el-table-column property="validity" label="有效期" align="center"></el-table-column>
        <el-table-column property="start" label="开始时间" align="center"></el-table-column>
        <el-table-column property="to" label="至" align="center"></el-table-column>
        <el-table-column property="end" label="结束时间" align="center"></el-table-column>
      </el-table>

      <div class="dialog-cancel">
        <el-button type="warning" @click="warningSearch = false">关 闭</el-button>
      </div>
    </el-dialog>

<!--    预警表新增-->


  </div>
</template>

<script>
import jtable from '_c/Jtable'
import { mapActions } from 'vuex'
export default {
    components: {
      jtable
    },
    data() {
      return {
          tableShow:true,
          colorOne:'#FF0000',
          colorTwo:'#FFA500',
          colorThree:'#FFFF00',
          colorFour:'#008000',
          disabled:false,
          dialogLoading:false,
          sizeForm: {
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
          addWarningShow: false,               //新增预警表
          upDateShow: true,                            //显示涨幅天数
          radio: '1',                                //预警期限单选
          upDateInput: '',                            //输入上涨天数
          warningSearchData: [{                //预警表单 一
              name:'创建人',
              plain:'张三',
              type:'创建时间',
              common:'2019-05-12',
              validity:'2019-12-30',
              start:'2019/5/12',
              to:'至',
              end:'2019/12/30'
          }],
          warningInfo:[{                            //预警表单 二
              name:'+8',
              plain:'至',
              type:'+10',
              common:'颜色',
              validity:'+3',
              start:'至',
              to:'+5',
              end:'颜色'
          },{
              name:'+8',
              plain:'至',
              type:'+10',
              common:'颜色',
              validity:'+3',
              start:'至',
              to:'+5',
              end:'颜色'
          }],
          warningDate:[{                                  //预警表单 三
              name:'预警期限',
              plain:'张三',
              type:'创建时间',
              common:'2019-05-12',
              validity:'2019-12-30',
              start:'2019/5/12',
              to:'至',
              end:'2019/12/30'
          }],
          warningMarks:[{                                  //预警表单 四
              name:'备注',
              plain:'',
              type:'创建时间',
              common:'2019-05-12',
              validity:'2019-12-30',
              start:'2019/5/12',
              to:'至',
              end:'2019/12/30'
          }],
          warningSearch:false,                 //预警配置查看
          columnData: { crteName: '预警名称', ewarnName: '预警类型', beginDate: '开始时间', endDate: '结束时间', crteDate: '创建时间', remarks: '备注' },
          tableData: [],
          total:0,
          loading:false,
          warningName: '',                              //预警名称
          warningNameOptions: [],
          warningType: '',                         //预警类型
          warningTypeOptions: [],
          warningTypeData:[]
      }
    },
    methods:{
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
            }
            let data = {
                "ewarnId": ewarnId,
                "ewarnTypeId": ewarnTypeId,
                "pageIndex": 1,
                "pageSize": 10,
                "start": 0
            };
            this.queryPageList(data).then(res => {
                this.tableData = res.data.list;
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
                })
            })
        },
        searchDetail(data){
            this.warningSearch = data
        },
        onSubmit() {
            console.log(this.sizeForm.beginDate);
            this.dialogLoading = true;
            this.disabled = true;
            this.save(this.sizeForm).then((res) => {
                console.log(res);
                this.sizeForm = JSON.parse(JSON.stringify(this.sizeFormCopy));
                this.dialogLoading = false;
                this.disabled = false;
                this.addWarningShow = false
                this.$message({
                    message: '新增成功',
                    type: "success"
                })
            }).catch(() => {
                this.dialogLoading = false;
                this.disabled = false;
            })
        },
        handleUpDateShow(boo) {                                                    //控制输入涨幅天数
            this.upDateShow = boo;
            console.log(this.upDateShow);
        },
        arraySpanMethod({ row, column, rowIndex, columnIndex }) {                 //合并单元格
            if(rowIndex === 0){
                if(columnIndex === 1){
                    return [1,7]
                }else if(columnIndex > 1){
                    return [0,0]
                }
            }
        },
        discountHeaderStyle({ row, column, rowIndex, columnIndex }) {             //表头合并
            if (rowIndex === 2) {
                return { display: 'none' }
            }
        },
        discountCellStyle({row, column, rowIndex, columnIndex}){                //预警区间颜色
            if(rowIndex === 0 && columnIndex === 3){
                return 'background:red'
            }
            else if(rowIndex === 1 && columnIndex === 3){
                return 'background:yellow'
            }
            else if(rowIndex === 0 && columnIndex === 7){
                return 'background:blue'
            }
            else if(rowIndex === 1 && columnIndex === 7){
                return 'background:green'
            }
            else{
                return ''
            }
        },
        handleAdd(){                               //新增预警表
            this.tableShow = false
            this.addWarningShow = true;
        },
        ...mapActions([
            'queryPageList',
            'save',
            'warnType',
            'delete'
        ]),

    },
    watch:{

        warningType(newVal,oldVal){
            this.warningName = '';
            if(newVal === ''){
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
                    break
                }
            }
        },

    },
    mounted(){

    },
    created: function () {
        this.sizeFormCopy = JSON.parse(JSON.stringify(this.sizeForm));
        this.warnType('Warn_Type').then(res => {
            console.log(res);
            this.warningTypeData = res.data;
            this.warningTypeOptions = [];
            for (let i in this.warningTypeData) {
                this.warningTypeOptions[i] = {};
                this.warningTypeOptions[i].label = this.warningTypeData[i].codeName;
                this.warningTypeOptions[i].value = this.warningTypeData[i].codeId
            }
        }).catch(() => {

        })
    }

}
</script>

<style scoped>

</style>
