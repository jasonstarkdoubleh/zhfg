<template>
  <WorkMain :headerItems="['模型设计','数据预处理']" :outerFlag="false">
    <div class="allLayout">
      <!--<div class="topButton">
        <a-button @click="importFilesClick" class="left20 floatLeft" icon="download" type="primary">导入</a-button>
        <a-button @click="jdbcClick" class="left20 floatLeft" icon="database" type="primary">数据连接</a-button>
      </div>
      <jdbc ref="jdbcFrame"/>
      <importFiles ref="importFilesFrame" @shuaxindata="getTableData"/>
      <div class="line"></div>-->
      <div class="mainInfo">
        <div class="clearBoths" style="margin-left: 40px">
          <div class="floatLeft">
            <span>数据集名称：</span>
            <a-input v-model="dataset_name" style="width: 180px"/>
          </div>
          <div class="floatLeft" style="margin-left: 40px">
            <span>类型：</span>
            <a-select v-model="source_type" style="width:130px;">
              <a-select-option :key="typeItem.id" v-for="typeItem in dataset_type"
                               :value="typeItem.typeName">{{ typeItem.typeName }}
              </a-select-option>
            </a-select>
          </div>
          <div class="floatLeft left10">
            <a-button @click="paramSelect" type="primary" class="left20 floatLeft">查询</a-button>
            <a-button @click="resetData" class="left20 floatLeft">重置</a-button>
            <!-- <a-button class="left20 floatLeft" icon="plus-circle"  type="primary">创建</a-button> -->
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
                dataIndex="dataset_name"
                align="center"
                title="数据集名称">
              </a-table-column>
              <a-table-column
                width="14%"
                dataIndex="source_type"
                align="center"
                title="类型">
              </a-table-column>
              <a-table-column
                width="10%"
                dataIndex="row_num"
                align="center"
                title="记录条数">
              </a-table-column>
              <a-table-column
                width="8%"
                dataIndex="operator"
                align="center"
                title="创建人">
              </a-table-column>
              <a-table-column
                width="18%"
                dataIndex="description"
                align="center"
                title="说明">
              </a-table-column>
              <a-table-column
                width="15%"
                dataIndex="update_time"
                align="center"
                title="更新时间">
              </a-table-column>
              <a-table-column
                width="15%"
                align="center"
                title="操作">
                <template slot-scope="text,record">
                  <a @click="seeDataPreprocess(record)">查看</a>
                  <span>|</span>
                  <a @click="delRows(record)">删除</a>
                  <span>|</span>
                  <a @click="exportTable(record)">导出</a>
                </template>
              </a-table-column>
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
  </WorkMain>
</template>

<script>
  import WorkMain from '@/models/public/WorkMain'
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
        dataset_name: '',
        source_type: '',
        tableDataUrl: 'dataSetInfo/listdataSetInfo',
        loading: false,
        selectedId: '',
        tabsKey: '',
        dataset_type: [{
          "id": 1,
          "typeName": 'MYSQL',
        }, {
          "id": 2,
          "typeName": 'EXCEL',
        }, {
          "id": 3,
          "typeName": 'CSV',
        }],
        pager: {
          showSizeChanger: true,
          showQuickJumper: true,
          pageSizeOptions: ['5', '10', '15', '20'],
          current: 1,
          total: 1,
          pageSize: 5,
          showTotal: (total, range) => `显示 ${range[0]} ~ ${range[1]} 条记录，共 ${total} 条记录`
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
            $this.selectedId = selectedRows[0].dataset_id;
            $this.inParameter = selectedRows[0];
          },
        }
      },

    },
    components: {
      WorkMain,
      dataSplite,
      dataFilter,
      dataFill,
      jdbc,
      importFiles,
      DataParsing,
      seeData
    },
    methods: {
      jdbcClick() {
        this.$refs.jdbcFrame.showModal();
      },
      importFilesClick() {
        this.$refs.importFilesFrame.showModal();
      },
      resetData() {
        this.dataset_name = '';
        this.source_type = '';
        this.getTableData();
      },
      getQueryParm(pageNum, query = {}) {
        let params = Object.assign({}, query)
        if (pageNum == null || pageNum == '')
          pageNum = this.pager.current;
        else if (typeof(pageNum) == 'object') {
          this.pager = pageNum;
        }
        params.currPage = this.pager.current;
        params.pageSize = this.pager.pageSize;
        return params;
      },
      getTableData: function (pageNum) {
        const $this = this;
        let params = $this.getQueryParm(pageNum, {dataset_name: this.dataset_name, source_type: this.source_type});
        $this.loading = true;
        this.BaseRequest({
          url: this.tableDataUrl,
          method: 'get',
          params: params
        }).then(response => {
          $this.showdates = response.dataList;
          $this.pager.total = response.totalNum;
          $this.loading = false;
        })
      },
      paramSelect() {
        this.getTableData();
      },
      delRows(row) {
        const that = this
        that.Confirm({
          title: '提示',
          content: '确定删除数据集【' + row.dataset_name + '】？',
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
      this.getTableData(1)
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
