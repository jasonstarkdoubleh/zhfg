<template>
  <div>
    <jtable
      :tableData="tableData"
      :columnData="columnData">

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

          报告月份:
          <el-select v-model="warningName">
            <el-option
              v-for="item in warningNameOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>

          所属商品:
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
          <el-button type="success">上 传</el-button>
        </div>
      </div>

    </jtable>

    <el-dialog title="报告监视" :visible.sync="dialogFormVisible" fullscreen>
      <el-form :model="form">
        <el-form-item label="报告名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="报告月份" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="所属商品" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="作者" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="报告月份" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="报告月份" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
          <el-button>浏览</el-button>
        </el-form-item>
        <el-form-item label="" :label-width="formLabelWidth">
          <el-checkbox v-model="checked">备选项</el-checkbox>
          <el-checkbox v-model="checked">备选项</el-checkbox>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">退 出</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">提 交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
    import jtable from '_c/Jtable'
    export default {
        data() {
            return {
                checked:false,
                dialogFormVisible: false,
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
                tableData: [{
                    dataName:'数据集名称',
                    correlation:'分析名称',
                    type:'分析类型',
                    vision:'版本信息',
                    time:'运行时间'
                },{
                    dataName:'数据集名称',
                    correlation:'分析名称',
                    type:'分析类型',
                    vision:'版本信息',
                    time:'运行时间'
                },{
                    dataName:'数据集名称',
                    correlation:'分析名称',
                    type:'分析类型',
                    vision:'版本信息',
                    time:'运行时间'
                }],
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
        }
    }
</script>

<style scoped>

</style>
