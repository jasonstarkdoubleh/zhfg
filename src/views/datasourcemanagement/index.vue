<template>
  <div>
    <jtable
      :tableData="tableData"
      :columnData="columnData">

      <div class="flex bgc">
        <div>

          数据源名称:
          <el-select v-model="warningType" style="margin-right: 20px">
            <el-option
              v-for="item in warningTypeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>

          数据源类型:
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
          <el-button type="success" @click="handleAdd">添 加</el-button>
          <el-button type="primary">修 改</el-button>
          <el-button type="success">删 除</el-button>
        </div>
      </div>

    </jtable>

    <el-dialog title="数据源管理" :visible.sync="dialogFormVisible" fullscreen>
      <el-form :model="form">
        <el-form-item label="数据源名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="数据源类型" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="数据源地址" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="数据源端口" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="实例名" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="" :label-width="formLabelWidth">
          <el-button>测试连接</el-button>
        </el-form-item>
        <el-form-item label="选择库" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="选择表" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="附加描述" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" type="textarea"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">保存并退出</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">保存并添加哎</el-button>
        <el-button @click="dialogFormVisible = false">退出</el-button>
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
        },
        methods:{
            handleAdd(){
                this.dialogFormVisible = true
            }
        }
    }
</script>

<style scoped>

</style>
