import Jtable from '_c/Jtable'
import {pssrptconf} from '@/api/manager'
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
    Jtable
  },
  methods:{
    handleCreate(){
      this.dialogFormVisible = true
    },
    handleNodeClick(data) {
      console.log(data);
    }
  },
  created() {
    pssrptconf().then(res => {
      console.log(res)
    })
  }
}
