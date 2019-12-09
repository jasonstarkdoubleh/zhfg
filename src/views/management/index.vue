<template>
  <div>
    <div v-show="mainShow">
      <jtable
        :loading="loading"
        :tableData="tableData"
        :columnData="columnData"
        :searchShow="true"
        @on-detail="searchDetail"
        :configShow="true"
        :total="total"
        @on-config="handleConfig"
        :deleteShow="true"
        @pageChange="pageChange"
        @on-delete="handleDelete">

        <div style="display: flex;justify-content: space-between">
          <div>
            调度名称:
            <el-input v-model="manerName" style="width: 180px;margin-right: 20px"></el-input>

            任务频度:
            <el-select v-model="warningName">
              <el-option
                v-for="item in warningNameOptions"
                :key="item.value"
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
    </div>
    <div v-if="sectionShow">
      <el-card class="box-card">
        <div >
          <el-form ref="form" :model="form" label-width="80px">

            <el-form-item label="调度名称" style="width: 290px">
              <el-input v-model="form.rschName" :disabled="detailsShow"></el-input>
            </el-form-item>

            <el-form-item label="调度类型">
              <el-select v-model="form.rschType" :disabled="detailsShow">
                <el-option
                  v-for="item in selectOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="调度频度">
              <el-radio-group v-model="form.rschFreq" :disabled="detailsShow">
                <el-radio label="D">日频</el-radio>
                <el-radio label="W">周频</el-radio>
                <el-radio label="M">月频</el-radio>
                <el-radio label="Q">季频</el-radio>
                <el-radio label="Y">年频</el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item label="执行方式">
              <el-radio-group v-model="form.execType" :disabled="detailsShow">
                <el-radio label="1">执行一次</el-radio>
                <el-radio label="2">重复执行</el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item label="执行日期">
              <el-date-picker
                :disabled="detailsShow"
                value-format="yyyy-MM-dd HH:mm:ss"
                v-model="form.execTime"
                type="datetime"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>

            <el-form-item label="执行条件">
              <el-radio-group v-model="form.execCdt" :disabled="detailsShow">
                <el-radio label="01">始终执行</el-radio>
                <el-radio label="02">握手条件</el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item label="调度说明">
              <el-input type="textarea" v-model="form.rschRemark" :disabled="detailsShow"></el-input>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="onSubmit" :disabled="disabled" v-if="!detailsShow">保 存</el-button>
              <el-button @click="handleAdd(false)">退 出</el-button>
            </el-form-item>

          </el-form>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
    import jtable from '_c/Jtable'
    import { pssrschconfList, save, del, update, getTopUrlInfo, getAsciiByCode } from '@/api/manager'
    import md5 from 'js-md5'
    export default {
        data() {
            return {
                loading:false,
                total: 0,
                pageIndex: 1,
                pageSize: 10,
                addShow: true,
                detailsShow: false,
                formCopy: {},
                disabled: false,
                selectOptions:[{
                    label: '模型调度',
                    value: '01'
                },{
                    label: '报告调度',
                    value: '02'
                },{
                    label: '预警调度',
                    value: '03'
                }],
                form: {
                    rschName:'',
                    rschType: '',
                    rschFreq: '',
                    execType: '',
                    execTime: '',
                    execCdt: '',
                    rschRemark: ''
                },
                mainShow: true,
                sectionShow: false,
                manerName: '',
                warningName: '',
                warningNameOptions: [{
                    value: '',
                    label: '全部'
                },{
                    value: 'D',
                    label: '日频'
                }, {
                    value: 'W',
                    label: '周频'
                }, {
                    value: 'M',
                    label: '月频'
                }, {
                    value: 'Q',
                    label: '季频'
                },{
                    value: 'Y',
                    label: '年频'
                }],
                tableData: [],
                columnData: { rschName:'调度名称', rschType:'调度类型', rschFreq:'调度频度', execType:'执行方式', execTime:'首次执行日期', createTime:'创建日期' }
            }
        },
        methods: {
            handleDelete(row) {
                this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    del([row.rschId]).then(res => {
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        for(let i in this.tableData) {
                            if(this.tableData[i].rschId === row.rschId) {
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
            handleConfig(data) {
                this.form = JSON.parse(JSON.stringify(data.row))
                if(this.form.rschType === '模型调度') {
                    this.form.rschType = '01'
                }
                if(this.form.rschType === '报告调度') {
                    this.form.rschType = '02'
                }
                if(this.form.rschType === '预警调度') {
                    this.form.rschType = '03'
                }
                if(this.form.rschFreq === '日频') {
                    this.form.rschFreq = 'D'
                }
                if(this.form.rschFreq === '周频') {
                    this.form.rschFreq = 'W'
                }
                if(this.form.rschFreq === '月频') {
                    this.form.rschFreq = 'M'
                }
                if(this.form.rschFreq === '季频') {
                    this.form.rschFreq = 'Q'
                }
                if(this.form.rschFreq === '年频') {
                    this.form.rschFreq = 'Y'
                }
                if(this.form.execType === '执行一次') {
                    this.form.execType = '1'
                }
                if(this.form.execType === '重复执行') {
                    this.form.execType = '2'
                }
                this.addShow = false
                this.mainShow = false
                this.sectionShow = true
            },
            searchDetail(data) {
                this.form = JSON.parse(JSON.stringify(data.row))
                if(this.form.rschType === '模型调度') {
                    this.form.rschType = '01'
                }
                if(this.form.rschType === '报告调度') {
                    this.form.rschType = '02'
                }
                if(this.form.rschType === '预警调度') {
                    this.form.rschType = '03'
                }
                if(this.form.rschFreq === '日频') {
                    this.form.rschFreq = 'D'
                }
                if(this.form.rschFreq === '周频') {
                    this.form.rschFreq = 'W'
                }
                if(this.form.rschFreq === '月频') {
                    this.form.rschFreq = 'M'
                }
                if(this.form.rschFreq === '季频') {
                    this.form.rschFreq = 'Q'
                }
                if(this.form.rschFreq === '年频') {
                    this.form.rschFreq = 'Y'
                }
                if(this.form.execType === '执行一次') {
                    this.form.execType = '1'
                }
                if(this.form.execType === '重复执行') {
                    this.form.execType = '2'
                }
                this.detailsShow = true
                this.mainShow = false
                this.sectionShow = true
            },
            onSubmit() {
                this.disabled = true
                if(this.addShow) {
                    save(this.form).then(res => {
                        this.$message({
                            message: '保存成功',
                            type: "success"
                        });
                        this.form = JSON.parse(JSON.stringify(this.formCopy))
                        this.handleAdd(false)
                        this.handleSearch()
                        this.disabled = false
                    }).catch(err => {
                        this.$message({
                            message: '保存失败,请重试',
                            type: "error"
                        });
                        this.disabled = false
                    })
                }else {
                    update(this.form).then(res => {
                        this.$message({
                            message: '更新成功',
                            type: "success"
                        });
                        this.form = JSON.parse(JSON.stringify(this.formCopy))
                        this.handleAdd(false)
                        this.handleSearch()
                        this.disabled = false
                    }).catch(err => {
                        this.$message({
                            message: '更新成功,请重试',
                            type: "error"
                        });
                        this.disabled = false
                    })
                }

            },
            handleAdd(val) {
                if(val) {
                    this.mainShow = false
                    this.sectionShow = true
                    this.addShow = true
                    this.form = JSON.parse(JSON.stringify(this.formCopy))
                }else {
                    this.sectionShow = false
                    this.mainShow = true
                    this.detailsShow = false
                }
            },
            getAllInfo() {
                getAsciiByCode(5).then(res => {
                    console.log(res)
                })
            },
            getNews() {
                let data = {
                    appid: "fagaiwei",
                    userId: 1,
                    dateType: 1
                }
                data.unixTime = new Date().getTime()
                data.signid = md5(data.unixTime + md5('fagaiwei' + 'fgwprice'))
                getTopUrlInfo(data).then(res => {
                    console.log(res)
                })
            },
            handleSearch() {
                this.loading = true
                pssrschconfList(this.manerName, this.warningName, this.pageIndex, this.pageSize).then(res => {
                    console.log(res)
                    this.tableData = res.page.list
                    this.total = res.page.totalCount
                    for(let i in this.tableData) {
                        if(this.tableData[i].rschType === '01') {
                            this.tableData[i].rschType = '模型调度'
                        }
                        if(this.tableData[i].rschType === '02') {
                            this.tableData[i].rschType = '报告调度'
                        }
                        if(this.tableData[i].rschType === '03') {
                            this.tableData[i].rschType = '预警调度'
                        }
                        if(this.tableData[i].rschFreq === 'D') {
                            this.tableData[i].rschFreq = '日频'
                        }
                        if(this.tableData[i].rschFreq === 'W') {
                            this.tableData[i].rschFreq = '周频'
                        }
                        if(this.tableData[i].rschFreq === 'M') {
                            this.tableData[i].rschFreq = '月频'
                        }
                        if(this.tableData[i].rschFreq === 'Q') {
                            this.tableData[i].rschFreq = '季频'
                        }
                        if(this.tableData[i].rschFreq === 'Y') {
                            this.tableData[i].rschFreq = '年频'
                        }
                        if(this.tableData[i].execType === '1') {
                            this.tableData[i].execType = '执行一次'
                        }
                        if(this.tableData[i].execType === '2') {
                            this.tableData[i].execType = '重复执行'
                        }
                    }
                    this.loading = false
                }).catch(e => {
                    this.loading = false
                })
            }
        },
        components: {
            jtable
        },
        created() {
            this.formCopy = JSON.parse(JSON.stringify(this.form))
            this.getAllInfo()
            // this.getNews()
        }
    }
</script>

<style scoped>

</style>
