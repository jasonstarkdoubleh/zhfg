<template>
  <div>

    <div class="flex bgc">
      <div>
        经济数据类型:&nbsp;
        <el-select v-model="priceType" placeholder="请选择" style="margin-right: 20px">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        指标名称:&nbsp;
        <el-select v-model="priceType" placeholder="请选择" style="margin-right: 20px">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        预测时间段:&nbsp;
        <el-date-picker
          v-model="timeQuantum"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          style="margin-right: 20px">
        </el-date-picker>
      </div>
      <div>
        <el-button type="primary">查询</el-button>
      </div>
    </div>

    <div style="margin-top: 10px;">
      <el-card>
        <div slot="header">
          <span>中国居民消费价格指数</span>
        </div>
        <div id="CPI" style="height: 300px;width: 100%"></div>
      </el-card>

      <div style="margin-top: 10px">
        <el-table id="CPITABLE"
                  :data="tableData"
                  height="600"
                  border
                  stripe>

          <el-table-column label="月份" align="center" prop="date" width="200"></el-table-column>

          <el-table-column label="全国" align="center">
            <el-table-column property="qmouth" label="当月" align="center"></el-table-column>
            <el-table-column property="qyearUp" label="同比增长" align="center"></el-table-column>
            <el-table-column property="qquarterUp" label="环比增长" align="center"></el-table-column>
            <el-table-column property="qtotal" label="累计" align="center"></el-table-column>
          </el-table-column>

          <el-table-column label="城市" align="center">
            <el-table-column property="cmouth" label="当月" align="center"></el-table-column>
            <el-table-column property="cyearUp" label="同比增长" align="center"></el-table-column>
            <el-table-column property="cquarterUp" label="环比增长" align="center"></el-table-column>
            <el-table-column property="ctotal" label="累计" align="center"></el-table-column>
          </el-table-column>

          <el-table-column label="农村" align="center">
            <el-table-column property="nmouth" label="当月" align="center"></el-table-column>
            <el-table-column property="nyearUp" label="同比增长" align="center"></el-table-column>
            <el-table-column property="nquarterUp" label="环比增长" align="center"></el-table-column>
            <el-table-column property="ntotal" label="累计" align="center"></el-table-column>
          </el-table-column>

        </el-table>
      </div>
    </div>

  </div>
</template>

<script>
    export default {
        data(){
            return {
                options: [{
                    value: '选项1',
                    label: '全部'
                }, {
                    value: '选项2',
                    label: '国民生产总值'
                }, {
                    value: '选项3',
                    label: '居民消费价格指数'
                }, {
                    value: '选项4',
                    label: '工业品价格出厂指数'
                }, {
                    value: '选项5',
                    label: '采购经理人指数'
                },{
                    value: '选项6',
                    label: '企业商品价格指数'
                },{
                    value: '选项7',
                    label: '消费者信息指数'
                },{
                    value: '选项8',
                    label: '社会消费品零售总额'
                }],
                priceType: '',
                timeQuantum:'',
                tableData: [{
                    date:'2019年06月份',
                    type:'',
                    qmouth:'11',
                    qyearUp:'12',
                    qquarterUp:'13',
                    qtotal:'14',
                    cmouth:'11',
                    cyearUp:'12',
                    cquarterUp:'13',
                    ctotal:'14',
                    nmouth:'11',
                    nyearUp:'12',
                    nquarterUp:'13',
                    ntotal:'14',
                },{
                    date:'2019年06月份',
                    type:'',
                    qmouth:'11',
                    qyearUp:'12',
                    qquarterUp:'13',
                    qtotal:'14',
                    cmouth:'11',
                    cyearUp:'12',
                    cquarterUp:'13',
                    ctotal:'14',
                    nmouth:'11',
                    nyearUp:'12',
                    nquarterUp:'13',
                    ntotal:'14',
                },{
                    date:'2019年06月份',
                    type:'',
                    qmouth:'11',
                    qyearUp:'12',
                    qquarterUp:'13',
                    qtotal:'14',
                    cmouth:'11',
                    cyearUp:'12',
                    cquarterUp:'13',
                    ctotal:'14',
                    nmouth:'11',
                    nyearUp:'12',
                    nquarterUp:'13',
                    ntotal:'14',
                }]
            }
        },
        methods: {
            drawCPI(){
                // 基于准备好的dom，初始化echarts实例
                let myChart = this.$echarts.init(document.getElementById('CPI'))
                // 绘制图表
                let option = {
                    title: {
                        text: '折线图堆叠'
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data:['邮件营销','联盟广告','视频广告','直接访问','搜索引擎']
                    },
                    grid: {
                        // show:true,
                        x: '3%',
                        x2: '4%',
                        y2: '3%',
                        containLabel: true,
                    },
                    toolbox: {
                        feature: {
                            saveAsImage: {}
                        }
                    },
                    xAxis: {
                        show:true,
                        type: 'category',
                        boundaryGap: false,
                        data: ['周一','周二','周三','周四','周五','周六','周日']
                    },
                    yAxis: {
                        show:true,
                        type: 'value'
                    },
                    series: [
                        {
                            name:'邮件营销',
                            type:'line',
                            stack: '总量',
                            data:[120, 132, 101, 134, 90, 230, 210]
                        },
                        {
                            name:'联盟广告',
                            type:'line',
                            stack: '总量',
                            data:[220, 182, 191, 234, 290, 330, 310]
                        },
                        {
                            name:'视频广告',
                            type:'line',
                            stack: '总量',
                            data:[150, 232, 201, 154, 190, 330, 410]
                        },
                        {
                            name:'直接访问',
                            type:'line',
                            stack: '总量',
                            data:[320, 332, 301, 334, 390, 330, 320]
                        },
                        {
                            name:'搜索引擎',
                            type:'line',
                            stack: '总量',
                            data:[820, 932, 901, 934, 1290, 1330, 1320]
                        }
                    ]
                };
                myChart.setOption(option);
            },
        },
        mounted() {
            this.drawCPI();
            for(let i = 0;i < 30;i++)[
                this.tableData.push(this.tableData[0])
            ]
        }
    }
</script>

<style>
  #CPITABLE .el-table td{
    padding: 6px 0;
  }
</style>
