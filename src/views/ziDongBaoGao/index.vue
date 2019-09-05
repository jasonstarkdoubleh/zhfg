<template>
  <div>
    <jtable
      :tableData="tableData"
      :columnData="columnData"
      :searchShow="true">

        <div style="display: flex;justify-content: space-between">
          <div>

            调度名称:
            <el-select v-model="warningType" size="mini" style="margin-right: 20px">
              <el-option
                v-for="item in warningTypeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>

            任务度率:
            <el-select v-model="warningName" size="mini">
              <el-option
                v-for="item in warningNameOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>

          <div>
            <el-button type="primary" size="small">查询</el-button>
            <el-button type="success" size="small">新增</el-button>
          </div>
        </div>

    </jtable>
  </div>
</template>

<script>
    import jtable from '_c/Jtable'
    export default {
        data() {
            return {
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
