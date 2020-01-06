<template>
<!--  <WorkMain :headerItems="['模型设计','模型管理']" :outerFlag="false">-->
    <div class="allLayout" style="background: #ffffff">
      <div class="allLayout_con">
        <div class="top10 left20" style="text-align: left">
          <a-button @click="createModelFrame" icon="plus-circle" type="primary">创建</a-button>
          <a-button icon="download" @click="uploadFile" style="margin: 0 20px;">导入</a-button>
        </div>
        <a-modal title="导入" v-model="uploadFileFlag" :footer="null">
          <div>
            <span>自驱组织：</span>
            <a-tree-select
              style="width: 200px"
              :dropdownStyle="{ maxHeight: '200px',overflow: 'auto'}"
              :treeData="treeData"
              v-model="parseData.org_id"
            ></a-tree-select>
          </div>
          <div style="margin-top: 10px">
            <a-upload-dragger name="file" :action=this.url :data="parseData" :beforeUpload="beforeUploading" @change="handelChange"
                              accept="application/x-zip-compressed">
              <p class="ant-upload-drag-icon">
                <a-icon type="inbox"/>
              </p>
              <p class="ant-upload-text">单击或拖动文件到此区域以上传</p>
            </a-upload-dragger>
          </div>
        </a-modal>
        <!--线-->
        <span class="allCon_hx"
              style="display:block;border-bottom: 1px #e7ebee dashed; background: #f2f5f7;margin: 15px 20px 15px 0;"></span>
        <!--线-->
        <div class="top10" style="text-align: left">
          <span class="left20">模型名称：</span>
          <a-input placeholder="请输入名称" v-model="paramSelected.model_name" style="width: 160px"></a-input>
          <span class="dynamicSelect ">算法：</span>
          <a-select v-model="paramSelected.algorithm" class="selectButtonWidth" placeholder="请选择">
            <a-select-option :key="key" v-for="(item,key) in algorithmData"
                             :value="item.label">{{ item.label }}
            </a-select-option>
          </a-select>
          <span class="dynamicSelect ">预测周期：</span>
          <a-select v-model="paramSelected.predict_time_type" class="selectButtonWidth" placeholder="请选择">
            <a-select-option :key="item.val_code" v-for="item in forecastType"
                             :value="item.val_code">{{ item.val_name }}
            </a-select-option>
          </a-select>
          <a-button @click="paramSelect" style="margin: 0 20px;" type="primary">查询</a-button>
          <a-button @click="resetData">重置</a-button>
        </div>
        <!--线-->
        <span class="allCon_hx"
              style="display:block;border-bottom: 1px #e7ebee dashed; background: #f2f5f7;margin: 15px 20px 15px 0;"></span>
        <!--线-->
        <div class="top10 top10 left20" style="text-align: left">
          <a-button @click="modelYC" icon="thunderbolt" type="primary">预测</a-button>
          <a-button style="margin: 0 20px;" icon="deployment-unit" @click="modelMapping" type="primary">发布</a-button>
          <a-button @click="derive" style="width: 88px;" icon="upload">导出</a-button>
        </div>
      </div>
      <div class="tableData" style="margin-top: 10px;">
        <!--表格区-->
        <a-row class="table-row">
          <a-col :span="24">
            <a-table
              :scroll="{ x: '130%' }"
              :dataSource="showdates"
              :pagination="pager"
              :rowSelection="rowSelection"
              @change="getTableData"
              :loading="loading"
              rowKey="model_id"
              style="width: 100%">
              <a-table-column
                align="center"
                title="序号">
                <template slot-scope="text,record,index">
                  <span>{{index + 1}}</span>
                </template>
              </a-table-column>
              <a-table-column
                dataIndex="origin_name"
                align="center"
                title="自驱组织">
              </a-table-column>
              <a-table-column
                dataIndex="model_name"
                align="center"
                title="模型名称">
              </a-table-column>
              <a-table-column
                dataIndex="description"
                align="left"
                title="描述">
              </a-table-column>
              <a-table-column
                dataIndex="algorithm"
                align="center"
                title="算法">
              </a-table-column>
              <a-table-column
                dataIndex="predictTimeType"
                align="center"
                title="预测周期">
              </a-table-column>
              <a-table-column
                dataIndex="predictType"
                align="center"
                title="预测类型">
              </a-table-column>
              <a-table-column
                dataIndex="run_status"
                align="center"
                title="运行状态">
                <template slot-scope="text,record">
                  <span v-if="record.run_status==1">已运行</span>
                  <span v-if="record.run_status==0">未运行</span>
                  <span v-if="record.run_status==null">未运行</span>
                </template>
              </a-table-column>
              <a-table-column
                dataIndex="release_status"
                align="center"
                title="发布状态">
                <template slot-scope="text,record">
                  <span v-if="record.release_status==1">已发布</span>
                  <span v-if="record.release_status==0">未发布</span>
                  <span v-if="record.release_status==null">未发布</span>
                </template>
              </a-table-column>
              <a-table-column
                dataIndex="update_time"
                align="center"
                title="更新日期">
              </a-table-column>
              <a-table-column
                align="center"
                fixed="right"
                title="操作">
                <template slot-scope="text,record">
                  <a @click="selectchakanfabuzhuangtai(record)">修改</a>
                  <span>|</span>
                  <a @click="delRows(record)">删除</a>
                </template>
              </a-table-column>
            </a-table>
          </a-col>
        </a-row>
      </div>
      <a-modal title="修改" v-model="showModalPage" :maskClosable="false" width="650px" style="z-index:9999;">
        <div style="margin: 0 0 20px 50px">
          <div class="top10">
            <span class="left20">模型名称：</span>
            <a-input :disabled="true" v-model="modelParam.model_name" style="width: 300px"></a-input>
          </div>
          <div class="top10">
            <span class="left20">自驱组织：</span>
            <a-input :disabled="true" v-model="modelParam.origin_name" style="width: 300px"></a-input>
          </div>
          <div class="top10">
            <span class="left20">模型类型：</span>
            <a-input :disabled="true" v-model="modelParam.predictType" style="width: 300px"></a-input>
          </div>
          <div class="top10">
            <span class="left20">创建时间：</span>
            <a-input :disabled="true" v-model="modelParam.create_time" style="width: 300px"></a-input>
          </div>
          <div class="top10">
            <span class="left20">运行状态：</span>
            <a-select v-model="modelParam.run_status" style="width: 300px">
              <a-select-option :key="item.id" v-for="item in runStatus"
                               :value="item.id">{{ item.name }}
              </a-select-option>
            </a-select>
          </div>
          <div class="top10">
            <span class="left20">发布状态：</span>
            <a-select v-model="modelParam.release_status" style="width: 300px">
              <a-select-option :key="item.id" v-for="item in releaseStatus"
                               :value="item.id">{{ item.name }}
              </a-select-option>
            </a-select>
          </div>
        </div>
        <div slot="footer" class="dialog-footer">
          <a-button type="primary" @click="submitDataForm">确 定</a-button>
          <a-button @click="closeModal">取 消</a-button>
        </div>
      </a-modal>
    </div>
<!--  </WorkMain>-->
</template>

<script>
  import {getAlgorithmNames,queryModel} from '@/api/manager'
  import WorkMain from '@/models/public/WorkMain'
  import {required} from 'vuelidate/lib/validators'
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'
  import "@/styles/table-page.scss"
  import "@/styles/general.scss"
  import AButton from "ant-design-vue/es/button/button";
  import AInput from "ant-design-vue/es/input/Input";

  export default {
    name: 'designMain',
    data() {
      return {
        selectedRows: '',
        paramSelected: {
          model_name: '',
          algorithm: '',
          predict_time_type: '',
        },
        loading: false,
        showModalPage: false,
        showdates: [],
        Org_id: '',
        PredictTimeType: '',
        PredictType: '',
        algorithmData: [],
        modelParam: {
          model_name: '',
          run_status: '',
          release_status: '',
          description: '',
          model_id: '',
          origin_name: '',
          predictType: '',
          operator: '',
          create_time: ''
        },
        runStatus: [{
          id: '1',
          name: '已运行',
        }, {
          id: '0',
          name: '未运行',
        }],
        releaseStatus: [{
          id: '1',
          name: '已发布',
        }, {
          id: '0',
          name: '未发布',
        }],
        forecastType: [{
          val_code: '2',
          val_name: '日预测',
        }, {
          val_code: '3',
          val_name: '周预测',
        }, {
          val_code: '4',
          val_name: '月预测',
        }, {
          val_code: '5',
          val_name: '年预测',
        }],
        tableDataUrl: 'modelManage/listModelManagePage',
        pager: {
          showSizeChanger: true,
          showQuickJumper: true,
          pageSizeOptions: ['5', '10', '15', '20'],
          current: 1,
          total: 1,
          pageSize: 5,
          showTotal: (total, range) => `显示 ${range[0]} ~ ${range[1]} 条记录，共 ${total} 条记录`
        },
        uploadFileFlag: false,
        url: process.env.BASE_API + '/v1/model/model_import',
        treeData: [],
        parseData: {
          org_id: '',
          operator: ''
        }
      }
    },
    validations: {},
    computed: {
      rowSelection() {
        let $this = this;
        return {
          type: 'radio',
          onChange: (selectedRowKeys, selectedRows) => {
            this.selectedRows = selectedRows;
            // console.log(`selectedRowKeys: ${selectedRowKeys}`);//第几行
            //  console.log('selectedRows: ', selectedRows);//每行的数据
            var selectedRows = JSON.stringify(selectedRows);
            sessionStorage.setItem("selectedRows", selectedRows);
          },
        }
      },
    },
    components: {
      AInput,
      AButton,
      WorkMain,
    },
    methods: {
      uploadFile() {
        this.uploadFileFlag = true;
      },
      beforeUploading(file) {
        if (file.type != 'application/x-zip-compressed') {
          this.$message.error('文件格式不正确');
          return false;
        } else if (!this.parseData.org_id) {
          this.$message.error('请选择自驱动组织');
          return false;
        }
      },
      handelChange(info){
        const $this = this;
        if (info.file.status === 'done') {
          if (!info.file.response.resultData.code) {
            $this.uploadFileFlag = false;
            $this.Message.success('导入成功');
            $this.getTableData(1);
          } else {
            $this.uploadFileFlag = false;
            $this.Message.error('导入失败');
            $this.$warning({
              title: info.file.response.resultData.msg,
              content: info.file.response.resultData.log,
            });
          }
        }
      },
      derive() {
        if (this.selectedRows == '') {
          this.$message.warning('请选择一个模型');
        } else {
          window.location.href =  process.env.BASE_API + '/nlpdownload/model/model_export?model_id=' + this.selectedRows[0].model_id;
        }
      },
      createModelFrame() {
        this.$router.push({
          name: `createModel`,
        });
      },
      selectchakanReleaseStatus() {
        if (this.modelParam.release_status == '1' && this.modelParam.run_status == '0') {
          this.Message.error('未运行状态下不允许有已发布状态！');
          return;
        }
        this.BaseRequest({
          url: '/modelManage/Manageupdatestats',
          method: 'get',
          params: {
            "model_id": this.modelParam.model_id,
            "run_status": this.modelParam.run_status,
            "release_status": this.modelParam.release_status
          }
        }).then((response) => {
          this.closeModal();
          this.Message.success('修改成功');
          this.getTableData();
        })
      },
      updatechakanReleaseStatus() {
        if (this.modelParam.release_status == '1' && this.modelParam.run_status == '0') {
          this.Message.error('未运行状态下不允许有已发布状态！');
          return;
        }
        if (this.modelParam.release_status == 1) {
          this.BaseRequest({
            url: '/modelManage/Manageupdatestats',
            method: 'get',
            params: {
              "model_id": this.modelParam.model_id,
              "run_status": this.modelParam.run_status,
              "release_status": "0"
            }
          }).then((response) => {
            this.Message.error('此机构已有已发布状态模型！');
            this.closeModal();
            this.getTableData();
          })
        } else if (this.modelParam.release_status == 0) {
          this.BaseRequest({
            url: '/modelManage/Manageupdatestats',
            method: 'get',
            params: {
              "model_id": this.modelParam.model_id,
              "run_status": this.modelParam.run_status,
              "release_status": "0"
            }
          }).then((response) => {
            this.closeModal();
            this.getTableData();
          })
        }
      },
      timestampToTime(timestamp) {
        var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
        var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
        var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
        var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
        return Y + M + D + h + m + s;
      },
      modelYC() {
        if (this.selectedRows == '') {
          this.$message.warning('请选择一个模型');
        } else {
          this.$router.push({
            name: `modelPrediction`,
            query: {
              targerParam: this.selectedRows,
            }
          });
        }
      },
      modelMapping() {
        if (this.selectedRows == "") {
          this.$message.warning('请选择一个模型');
        } else if (this.selectedRows[0].predictType == "居民非采暖" || this.selectedRows[0].predictType == "居民采暖" || this.selectedRows[0].predictType == "普通工商户") {
          this.$message.warning('请选择预测类型为：车用、用气量的模型');
        } else if (this.selectedRows[0].release_status == 1) {
          this.$message.warning('请选择发布状态为：未发布的模型');
        } else {
          this.$router.push({name: `modelMapping`});
        }
      },
      closeModal() {
        this.showModalPage = false;
      },
      selectchakanfabuzhuangtai(record) {  //修改看是否已发布

        if (record.run_status == 1) {
          this.seeModel(record);
        } else {
          this.Message.error('此类型未发布 请先发布！');
        }
        /*this.BaseRequest({
          url: '/modelManage/selectchakanfabuzhuangtai',
          method: 'get',
          params: {"model_id":record.model_id}
        }).then((response) => {
           if(response.dataList != 0){
             this.seeModel(record);
           }else{
             this.showModalPage=false
             this.Message.error('此类型未发布 请先发布！');
           }
        })*/
      },
      submitDataForm(record) {//点击确定查看是否已存在已发布状态
        var $this = this;
        this.BaseRequest({
          url: '/modelManage/selectchakanReleaseStatus',
          method: 'get',
          params: {"org_id": this.Org_id, "predictTimeType": this.PredictTimeType, "predictType": this.PredictType}
        }).then((response) => {
          if (response.dataList.length > 0) {
            this.updatechakanReleaseStatus();
          } else {
            this.selectchakanReleaseStatus();
          }
        })
        // this.getTableData(1);
        // $this.showdates = [];
        // let params = $this.getQueryParm(pageNum, this.paramSelected);
        // $this.loading = true;
        // this.BaseRequest({
        //     url: this.tableDataUrl,
        //     method: 'get',
        //     params: params
        //   }).then(response => {
        //     $this.showdates = response.dataList;
        //     $this.pager.total = response.totalNum;
        //     $this.loading = false;
        // })
      },
      seeModel(record) {

        this.modelParam.model_name = record.model_name
        this.modelParam.run_status = record.run_status
        this.modelParam.release_status = record.release_status
        this.modelParam.model_id = record.model_id
        this.modelParam.description = record.description
        this.modelParam.origin_name = record.origin_name
        this.modelParam.predictType = record.predictType
        this.modelParam.operator = record.operator
        this.modelParam.create_time = record.create_time
        this.Org_id = record.org_id
        this.PredictTimeType = record.predictTimeType
        this.PredictType = record.predictType
        this.showModalPage = true
      },
      delRows(record) {
        const that = this;
        that.Confirm({
          title: '提示',
          content: '确定删除模型【' + record.model_name + '】？',
          onOk() {
            that.Request({
              url: 'model/model_delete',
              method: 'post',
              data: {model_id: record.model_id}
            }).then((response) => {
              if (response.code == 0) {
                that.Message.success('删除成功');
                that.getTableData();
              } else {
                that.Message.success('删除失败');
              }
            })
          },
        })
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
        let params = $this.getQueryParm(pageNum, this.paramSelected);
        $this.loading = true;
        this.queryModel().then(response => {
          $this.showdates = response.dataList;
          for (var i = 0; i < $this.showdates.length; i++) {
            if ($this.showdates[i].create_time != null) {
              $this.showdates[i].create_time = this.timestampToTime($this.showdates[i].create_time);
            }
          }
          $this.pager.total = response.totalNum;
          $this.loading = false;
        })
      },
      getAlgorithm() {
        this.BaseRequest({
          url: "modelManage/listAlgorithm",
          method: 'get',
        }).then(response => {
          this.algorithmData = response;
        })
      },
      paramSelect() {
        this.getTableData();
      },
      resetData() {
        this.paramSelected = {
          model_name: '',
          algorithm: '',
          predict_type: '',
        }
        this.getTableData();
      },
      getUsers() {
        this.BaseRequest({
          url: 'sys/user/getUserInfo',
          method: 'get',
        }).then(response => {
          this.parseData.operator = response.user_name
        })
      },
      getorganization() {
        const $this = this
        this.BaseRequest({
          url: "GasForeCast/getOriginDatas",
          method: 'get',
        }).then(response => {
          $this.treeData = response.orgTree;
          $this.parseData.org_id = response.orgId;
        });
      },
    },
    mounted() {
      this.getAlgorithm();
      this.getTableData(1);
      this.getUsers();
      this.getorganization();
    },
    created() {
      getAlgorithmNames().then(res=>{
        this.algorithmData = []
        res.data.forEach((item,i)=>{
          this.algorithmData[i]={}
          this.algorithmData[i].label = item
        })
        console.log(res)
      })
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .topButtonGroup {
    height: 50px;
    line-height: 50px
  }

  .dynamicSelect {
    margin-left: 35px;
  }

  .selectButtonWidth {
    width: 130px;
  }

  .textStyle {
    line-height: 32px;
    font-size: 15px
  }

  .table-row {
    width: 100%;
    overflow: auto;
  }

  .ant-pagination {
    width: 90%;
  }
</style>
