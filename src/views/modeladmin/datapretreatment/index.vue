<template>
    <div class="allLayout" style="background: #ffffff">
      <div class="mainInfo">
        <div class="clearBoths" style="margin-left: 20px">
          <div class="floatLeft">
            <span>数据集名称：</span>
            <a-select v-model="datasetName" style="width:160px;">
              <a-select-option :key="item.value" v-for="item in dataNameOptions"
                               :value="item.value">{{ item.label }}
              </a-select-option>
            </a-select>
          </div>
          <div class="floatLeft left10">
            <a-button @click="paramSelect" type="primary" class="left20 floatLeft">查询</a-button>
            <a-button @click="resetData" class="left20 floatLeft">重置</a-button>
          </div>
        </div>
      </div>
      <!--表格内容-->
      <div class="tableData" style="margin-top:20px;">
        <a-row>
          <a-col :span="24">
            <a-table
              :dataSource="showdates"
              :pagination="pager"
              :rowSelection="rowSelection"
              @change="getTableData"
              :loading="loading"
              rowKey="dataset_id"
              style="width: 100%">
              <a-table-column
                width="5%"
                align="center"
                title="序号">
                <template slot-scope="text,record,index">
                  <span>{{index + 1}}</span>
                </template>
              </a-table-column>
              <a-table-column
                width="15%"
                dataIndex="dataSetName"
                align="center"
                title="数据集名称">
              </a-table-column>
              <a-table-column
                width="14%"
                dataIndex="dataSetTypeName"
                align="center"
                title="类型">
              </a-table-column>
              <a-table-column
                width="10%"
                dataIndex="shape"
                align="center"
                title="记录条数">
              </a-table-column>
              <a-table-column
                width="8%"
                dataIndex="userRealName"
                align="center"
                title="创建人">
              </a-table-column>
              <a-table-column
                width="15%"
                dataIndex="dataTime"
                align="center"
                title="更新时间">
              </a-table-column>
<!--              <a-table-column-->
<!--                width="15%"-->
<!--                align="center"-->
<!--                title="操作">-->
<!--                <template slot-scope="text,record">-->
<!--                  <a @click="seeDataPreprocess(record)">查看</a>-->
<!--                  <span>|</span>-->
<!--                  <a @click="delRows(record)">删除</a>-->
<!--                  <span>|</span>-->
<!--                  <a @click="exportTable(record)">导出</a>-->
<!--                </template>-->
<!--              </a-table-column>-->
            </a-table>
          </a-col>
        </a-row>
      </div>
      <seeData ref="seeDataFrame"/>
      <div class="allLayout_conCj">
        <span>数据处理</span>
      </div>
      <!--标签页-->
      <div class="alignLeft">
        <a-tabs defaultActiveKey="1">
          <a-tab-pane key="1">
              <span slot="tab">
                <a-icon type="fund"/>
                数据解析
              </span>
            <DataParsing :dataset_id="selectedId"/>
          </a-tab-pane>
          <a-tab-pane key="2" :forceRender="true">
              <span slot="tab">
                <a-icon type="block"/>
                数据切分
              </span>
            <dataSplite :selectParam="inParameter" @refreshData="getTableData"/>
          </a-tab-pane>
          <a-tab-pane key="3" :forceRender="true">
              <span slot="tab">
                <a-icon type="printer"/>
                数据过滤
              </span>
            <dataFilter :targetParam="inParameter" @refreshTable="getTableData"/>
          </a-tab-pane>
          <a-tab-pane key="4" :forceRender="true">
              <span slot="tab">
                <a-icon type="flag"/>
                数据填补
              </span>
            <dataFill :targetParam="inParameter" @refreshTable="getTableData"/>
          </a-tab-pane>
        </a-tabs>
        <div style="height: 50px;"></div>
      </div>

    </div>
</template>

<script>
  import {queryDataSet,get_algorithm_list,get_summary,getAsciiByCode} from '@/api/manager'
  import { mapActions } from 'vuex'
  import {required} from 'vuelidate/lib/validators'
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'
  import "@/styles/table-page.scss"
  import "@/styles/general.scss"
  import dataSplite from '@/models/modelDesign/dataProcess/dataSplite'
  import dataFilter from '@/models/modelDesign/dataProcess/dataFilter'
  import dataFill from '@/models/modelDesign/dataProcess/dataFill'
  import jdbc from '@/models/modelDesign/dataProcess/jdbc'
  import importFiles from '@/models/modelDesign/dataProcess/importFiles'
  import DataParsing from '@/models/modelDesign/dataProcess/DataParsing'
  import seeData from '@/models/modelDesign/dataProcess/seeDataPreprocessing'

  export default {
    name: 'dataPreprocessing',
    data() {
      return {
        dateSetType:[],
        selcetData:'',
        dataSetName:'',
        dataNameOptions:[],
        datasetName: '',
        tableDataUrl: 'dataSetInfo/listdataSetInfo',
        loading: false,
        selectedId: '',
        tabsKey: '',
        pager: {
          showSizeChanger: true,
          showQuickJumper: true,
          pageSizeOptions: ['5', '10', '15', '20'],
          current: 1,
          total: 1,
          pageSize: 5,
          showTotal: total => `共 ${total} 条记录`
        },
        showdates: [],
        inParameter: {},
      }
    },
    validations: {},
    computed: {
      rowSelection() {
        let $this = this;
        return {
          type: 'radio',
          onChange: (selectedRowKeys, selectedRows) => {
            console.log(selectedRowKeys, selectedRows)
            $this.selectedId = selectedRows[0].dataSetId;
            $this.inParameter = selectedRows[0];
          },
        }
      },

    },
    components: {
      dataSplite,
      dataFilter,
      dataFill,
      jdbc,
      importFiles,
      DataParsing,
      seeData
    },
    methods: {
      ...mapActions([
        'listAllTwo',
      ]),
      jdbcClick() {
        this.$refs.jdbcFrame.showModal();
      },
      importFilesClick() {
        this.$refs.importFilesFrame.showModal();
      },
      resetData() {
        this.datasetName = '';
        this.getTableData();
      },
      getTableData (pagination) {
        const $this = this;
        $this.loading = true;
        let data = {}
        data.dataSetName = this.datasetName
        if(pagination){
          data.pageIndex = this.pager.current = pagination.current
          data.pageSize = this.pager.pageSize = pagination.pageSize
        }else {
          data.pageIndex = this.pager.current = 1
          data.pageSize = this.pager.pageSize = 10
        }
        queryDataSet(data).then(response => {
          $this.showdates = response.page.list;
          $this.pager.total = response.page.totalCount;
          $this.loading = false;
          this.showdates.forEach(item => {
            this.dateSetType.forEach(val => {
              if(item.dataSetType === val.codeId){
                item.dataSetTypeName = val.codeName
              }
            })
          })
        })
      },
      paramSelect() {
        this.getTableData()
      },
      delRows(row) {
        const that = this
        that.Confirm({
          title: '提示',
          content: '确定删除数据集【' + row.datasetName + '】？',
          onOk() {
            that.Request({
              url: "dataset/del_dataset",
              method: 'post',
              data: {"dataset_id": row.dataset_id}
            }).then(response => {
              if (!response.code) {
                that.Message.success('删除成功');
                that.getTableData();
              } else {
                that.$warning({
                  title: response.msg,
                  content: response.log,
                });
              }
            });
          },
        });
      },
      exportTable(record) {
        window.location.href= process.env.BASE_API + '/nlpdownload/dataset/export?dataset_id='+record.dataset_id;
      },
      seeDataPreprocess(record) {
        this.$refs.seeDataFrame.showModel(record.dataset_id);
      },
    },
    mounted() {
      this.getTableData()
    },
    created() {
      //查询数据集
      this.listAllTwo().then(res => {
        this.selcetData = res.data
        this.dataNameOptions = []
        for(let i in this.selcetData) {
          this.dataNameOptions[i] = {}
          this.dataNameOptions[i].label = this.selcetData[i].dataSetName
          this.dataNameOptions[i].value = this.selcetData[i].dataSetName
        }
      })
      //查询数据集类型
      getAsciiByCode(84).then(res=>{
        this.dateSetType = res.data
      })
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .allLayout_conCj {
    line-height: 30px;
    font-size: 16px;
    font-weight: bold;
    padding-left: 10px;
    text-align: left;
    margin: 20px 0 20px 0;
    border-bottom: 1px #f0f0f1 dashed;
  }

  .alignLeft {
    margin-left: 40px;
  }

  .topButton {
    height: 56px;
    padding: 10px 0px
  }

  .line {
    margin: 0 20px 0 0;
    padding: 0;
    border-bottom: 1px #e7ebee dashed;
  }

  .mainInfo {
    margin-top: 15px;
  }

  .titleInfoStyle {
    text-align: left;
    margin-left: 20px
  }

  .table-row {
    width: 99%;
    overflow: auto;
  }
</style>
