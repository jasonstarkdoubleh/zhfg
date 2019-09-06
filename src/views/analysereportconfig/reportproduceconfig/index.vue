<template>
  <div>
    <jtable
      :tableData="tableData"
      :columnData="columnData"
      :searchShow="true">

      <div class="flex bgc">
        <div>

          报告名称:
          <el-select v-model="warningType" style="margin-right: 20px">
            <el-option
              v-for="item in warningTypeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>

          报告状态:
          <el-select v-model="warningName">
            <el-option
              v-for="item in warningNameOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>

          调度模板:
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
          <el-button type="primary">查 询</el-button>
          <el-button @click="handleCreate">新 增</el-button>
        </div>
      </div>

    </jtable>

    <el-dialog title="" :visible.sync="dialogFormVisible" fullscreen>
      <div style="display: flex">
        <div style="width: 30%;margin-right: 5%">
          <el-card>
            <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
          </el-card>
        </div>

        <div style="width: 60%">
          <el-card>
            <el-form :model="form">
              <el-form-item label="报告名称" :label-width="formLabelWidth">
                <el-input v-model="form.name" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="调度名称" :label-width="formLabelWidth">
                <el-select v-model="form.region" placeholder="请选择活动区域">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="备注" :label-width="formLabelWidth">
                <el-input type="textarea"></el-input>
              </el-form-item>
            </el-form>
          </el-card>
        </div>

      </div>
      <div style="display: flex;justify-content: center;margin-top: 30px">
        <div>
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">保 存</el-button>
        </div>
      </div>

    </el-dialog>
  </div>
</template>

<script>
    import jtable from '_c/Jtable'
    export default {
        data() {
            return {
                data: [{
                    label: '一级 1',
                    children: [{
                        label: '二级 1-1',
                        children: [{
                            label: '三级 1-1-1'
                        }]
                    }]
                }, {
                    label: '一级 2',
                    children: [{
                        label: '二级 2-1',
                        children: [{
                            label: '三级 2-1-1'
                        }]
                    }, {
                        label: '二级 2-2',
                        children: [{
                            label: '三级 2-2-1'
                        }]
                    }]
                }, {
                    label: '一级 3',
                    children: [{
                        label: '二级 3-1',
                        children: [{
                            label: '三级 3-1-1'
                        }]
                    }, {
                        label: '二级 3-2',
                        children: [{
                            label: '三级 3-2-1'
                        }]
                    }]
                }],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                form: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                },
                formLabelWidth: '120px',
                dialogFormVisible:false,
                warningType: '选项1',                  //预警类型
                warningTypeOptions: [{                       //预警类型选择
                    value: '选项1',
                    label: '全部'
                }, {
                    value: '选项2',
                    label: '常规预警'
                }, {
                    value: '选项3',
                    label: '不常规类型'
                }, {
                    value: '选项4',
                    label: '舆情报警'
                }],
                warningName: '选项1',                              //预警名称
                warningNameOptions: [{                       //预警类型选择
                    value: '选项1',
                    label: '全部'
                }, {
                    value: '选项2',
                    label: '预警_常规_通用'
                }, {
                    value: '选项3',
                    label: '预警_波动_通用'
                }, {
                    value: '选项4',
                    label: '预警_常规_酒类'
                },{
                    value: '选项5',
                    label: '预警_波动_酒类'
                }],
                tableData: [],
                columnData: {
                    dataName:'商品名称',
                    correlation:'模型名称',
                    type:'预测类型',
                    vision:'版本信息',
                    time:'偏差时间'
                }
            }
        },
        components: {
            jtable
        },
        methods:{
            handleCreate(){
                this.dialogFormVisible = true
            },
            handleNodeClick(data) {
                console.log(data);
            }
        }
    }
</script>

<style scoped>

</style>
