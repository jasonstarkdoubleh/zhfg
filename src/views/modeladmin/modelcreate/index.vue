<template>
  <div class="allLayout" style="background: #ffffff">
    <div class="allLayout_con">
      <div class="top10 left20" style="text-align: left">
        <a-button @click="createModelFrame" icon="plus-circle" type="primary">创建</a-button>
        <!--        <a-button icon="download" @click="uploadFile" style="margin: 0 20px;">导入</a-button>-->
      </div>
      <a-modal title="导入" v-model="uploadFileFlag" :footer="null">
        <div>
          <span>预测商品：</span>
          <a-tree-select
            style="width: 200px"
            :dropdownStyle="{ maxHeight: '200px',overflow: 'auto'}"
            :treeData="treeData"
            v-model="parseData.org_id"
          ></a-tree-select>
        </div>
        <div style="margin-top: 10px">
          <a-upload-dragger
            name="file"
            :action="this.url"
            :data="parseData"
            :beforeUpload="beforeUploading"
            @change="handelChange"
            accept="application/x-zip-compressed"
          >
            <p class="ant-upload-drag-icon">
              <a-icon type="inbox" />
            </p>
            <p class="ant-upload-text">单击或拖动文件到此区域以上传</p>
          </a-upload-dragger>
        </div>
      </a-modal>
      <!--线-->
      <span
        class="allCon_hx"
        style="display:block;border-bottom: 1px #e7ebee dashed; background: #f2f5f7;margin: 15px 20px 15px 0;"
      ></span>
      <!--线-->
      <div class="top10" style="text-align: left">
        <span class="left20">模型名称：</span>
        <a-input placeholder="请输入名称" v-model="paramSelected.modelName" style="width: 160px"></a-input>
        <span class="dynamicSelect">算法：</span>
        <a-select v-model="paramSelected.algorithm" class="selectButtonWidth" placeholder="请选择">
          <a-select-option
            :key="key"
            v-for="(item,key) in algorithmData"
            :value="item.label"
          >
            {{ item.label }}
          </a-select-option>
        </a-select>
        <span class="dynamicSelect">预测周期：</span>
        <a-select
          v-model="paramSelected.predictTimeType"
          class="selectButtonWidth"
          placeholder="请选择"
        >
          <a-select-option
            :key="item.val_code"
            v-for="item in forecastType"
            :value="item.val_code"
          >
            {{ item.val_name }}
          </a-select-option>
        </a-select>
        <a-button @click="paramSelect" style="margin: 0 20px;" type="primary">查询</a-button>
        <a-button @click="resetData">重置</a-button>
      </div>
      <!--线-->
      <span
        class="allCon_hx"
        style="display:block;border-bottom: 1px #e7ebee dashed; background: #f2f5f7;margin: 15px 20px 15px 0;"
      ></span>
      <!--线-->
      <div class="top10 top10 left20" style="text-align: left">
        <a-button style="margin: 0 20px;" icon="deployment-unit" @click="modelMapping" type="primary">发布</a-button>
        <!--        <a-button @click="derive" style="width: 88px;" icon="upload">导出</a-button>-->
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
            rowKey="modelId"
            style="width: 100%"
          >
            <a-table-column align="center" title="序号">
              <template slot-scope="text,record,index">
                <span>{{index + 1}}</span>
              </template>
            </a-table-column>
            <a-table-column data-index="orgName" align="center" title="预测商品"></a-table-column>
            <a-table-column data-index="modelName" align="center" title="模型名称"></a-table-column>
            <a-table-column data-index="description" align="left" title="描述"></a-table-column>
            <a-table-column data-index="algorithm" align="center" title="算法"></a-table-column>
            <a-table-column data-index="predictTimeType" align="center" title="预测周期"></a-table-column>
            <a-table-column data-index="updateTime" align="center" title="更新日期"></a-table-column>
            <a-table-column align="center" fixed="right" title="操作">
              <template slot-scope="text,record">
                <!-- <a @click="selectchakanfabuzhuangtai(record)">修改</a>
                <span>|</span> -->
                <a @click="delRows(record)">删除</a>
              </template>
            </a-table-column>
          </a-table>
        </a-col>
      </a-row>
    </div>
    <a-modal
      title="修改"
      v-model="showModalPage"
      :maskClosable="false"
      width="650px"
      style="z-index:9999;"
    >
      <div style="margin: 0 0 20px 50px">
        <div class="top10">
          <span class="left20">模型名称：</span>
          <a-input :disabled="true" v-model="modelParam.modelName" style="width: 300px"></a-input>
        </div>
        <div class="top10">
          <span class="left20">预测商品：</span>
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
            <a-select-option
              :key="item.id"
              v-for="item in runStatus"
              :value="item.id"
            >{{ item.name }}</a-select-option>
          </a-select>
        </div>
        <div class="top10">
          <span class="left20">发布状态：</span>
          <a-select v-model="modelParam.release_status" style="width: 300px">
            <a-select-option
              :key="item.id"
              v-for="item in releaseStatus"
              :value="item.id"
            >{{ item.name }}</a-select-option>
          </a-select>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <a-button type="primary" @click="submitDataForm">确 定</a-button>
        <a-button @click="closeModal">取 消</a-button>
      </div>
    </a-modal>
  </div>
</template>

<script>
  import { getAlgorithmNames, queryModel,model_export,model_delete } from "@/api/manager";
  import { required } from "vuelidate/lib/validators";
  import "@riophae/vue-treeselect/dist/vue-treeselect.css";
  import "@/styles/table-page.scss";
  import "@/styles/general.scss";
  import AButton from "ant-design-vue/es/button/button";
  import AInput from "ant-design-vue/es/input/Input";

  export default {
    name: "designMain",
    data() {
      return {
        selectedRows: "",
        paramSelected: {
          modelName: "",
          algorithm: "",
          predictTimeType: ""
        },
        loading: false,
        showModalPage: false,
        showdates: [],
        Org_id: "",
        PredictTimeType: "",
        PredictType: "",
        algorithmData: [],
        modelParam: {
          modelName: "",
          run_status: "",
          release_status: "",
          description: "",
          modelId: "",
          origin_name: "",
          predictType: "",
          operator: "",
          create_time: ""
        },
        runStatus: [
          {
            id: "1",
            name: "已运行"
          },
          {
            id: "0",
            name: "未运行"
          }
        ],
        releaseStatus: [
          {
            id: "1",
            name: "已发布"
          },
          {
            id: "0",
            name: "未发布"
          }
        ],
        forecastType: [
          {
            val_code: "2",
            val_name: "日预测"
          },
          {
            val_code: "3",
            val_name: "周预测"
          },
          {
            val_code: "4",
            val_name: "月预测"
          },
          {
            val_code: "5",
            val_name: "年预测"
          }
        ],
        pager: {
          showSizeChanger: true,
          showQuickJumper: true,
          pageSizeOptions: ["5", "10", "15", "20"],
          current: 1,
          total: 1,
          pageSize: 10,
          showTotal: total => `共 ${total} 条记录`
        },
        uploadFileFlag: false,
        url: process.env.BASE_API + "/v1/model/model_import",
        treeData: [],
        parseData: {
          org_id: "",
          operator: ""
        }
      };
    },
    validations: {},
    computed: {
      rowSelection() {
        return {
          type: "radio",
          onChange: (selectedRowKeys, selectedRows) => {
            this.selectedRows = selectedRows;
          }
        };
      }
    },
    components: {
      AInput,
      AButton
    },
    methods: {
      uploadFile() {
        this.uploadFileFlag = true;
      },
      beforeUploading(file) {
        if (file.type !== "application/x-zip-compressed") {
          this.$message.error("文件格式不正确");
          return false;
        } else if (!this.parseData.org_id) {
          this.$message.error("请选择预测商品");
          return false;
        }
      },
      handelChange(info) {
        const $this = this;
        if (info.file.status === "done") {
          if (!info.file.response.resultData.code) {
            $this.uploadFileFlag = false;
            $this.Message.success("导入成功");
            $this.getTableData();
          } else {
            $this.uploadFileFlag = false;
            $this.Message.error("导入失败");
            $this.$warning({
              title: info.file.response.resultData.msg,
              content: info.file.response.resultData.log
            });
          }
        }
      },
      derive() {
        if (this.selectedRows === "") {
          this.$message.warning("请选择一个模型");
        } else {
          let data = {model_id: this.selectedRows[0].modelId}
          model_export(data).then(res=>{
            console.log(res.data[0])
          })
        }
      },
      createModelFrame() {
        this.$router.push({
          name: `createModel`
        });
      },
      selectchakanReleaseStatus() {
        if (
          this.modelParam.release_status === "1" &&
          this.modelParam.run_status === "0"
        ) {
          this.Message.error("未运行状态下不允许有已发布状态！");
          return;
        }
        this.BaseRequest({
          url: "/modelManage/Manageupdatestats",
          method: "get",
          params: {
            modelId: this.modelParam.modelId,
            run_status: this.modelParam.run_status,
            release_status: this.modelParam.release_status
          }
        }).then(response => {
          this.closeModal();
          this.Message.success("修改成功");
          this.getTableData();
        });
      },
      updatechakanReleaseStatus() {
        if (
          this.modelParam.release_status === "1" &&
          this.modelParam.run_status === "0"
        ) {
          this.Message.error("未运行状态下不允许有已发布状态！");
          return;
        }
        if (this.modelParam.release_status === 1) {
          this.BaseRequest({
            url: "/modelManage/Manageupdatestats",
            method: "get",
            params: {
              modelId: this.modelParam.modelId,
              run_status: this.modelParam.run_status,
              release_status: "0"
            }
          }).then(response => {
            this.Message.error("此机构已有已发布状态模型！");
            this.closeModal();
            this.getTableData();
          });
        } else if (this.modelParam.release_status === 0) {
          this.BaseRequest({
            url: "/modelManage/Manageupdatestats",
            method: "get",
            params: {
              modelId: this.modelParam.modelId,
              run_status: this.modelParam.run_status,
              release_status: "0"
            }
          }).then(response => {
            this.closeModal();
            this.getTableData();
          });
        }
      },
      timestampToTime(timestamp) {
        var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var Y = date.getFullYear() + "-";
        var M =
          (date.getMonth() + 1 < 10
            ? "0" + (date.getMonth() + 1)
            : date.getMonth() + 1) + "-";
        var D =
          (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " ";
        var h =
          (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":";
        var m =
          (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) +
          ":";
        var s =
          date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
        return Y + M + D + h + m + s;
      },
      modelMapping() {
        if (this.selectedRows === "") {
          this.$message.warning("请选择一个模型");
        } else {
          this.$router.push({ name: `modelMapping`,params: {
              selectedRows: this.selectedRows
            } });
        }
      },
      closeModal() {
        this.showModalPage = false;
      },
      selectchakanfabuzhuangtai(record) {
        //修改看是否已发布
        if (record.run_status === 1) {
          this.seeModel(record);
        } else {
          this.Message.error("此类型未发布 请先发布！");
        }
      },
      submitDataForm(record) {
        //点击确定查看是否已存在已发布状态
        var $this = this;
        this.BaseRequest({
          url: "/modelManage/selectchakanReleaseStatus",
          method: "get",
          params: {
            org_id: this.Org_id,
            predictTimeType: this.PredictTimeType,
            predictType: this.PredictType
          }
        }).then(response => {
          if (response.dataList.length > 0) {
            this.updatechakanReleaseStatus();
          } else {
            this.selectchakanReleaseStatus();
          }
        });
      },
      seeModel(record) {
        this.modelParam.modelName = record.modelName;
        this.modelParam.run_status = record.run_status;
        this.modelParam.release_status = record.release_status;
        this.modelParam.modelId = record.modelId;
        this.modelParam.description = record.description;
        this.modelParam.origin_name = record.origin_name;
        this.modelParam.predictType = record.predictType;
        this.modelParam.operator = record.operator;
        this.modelParam.create_time = record.create_time;
        this.Org_id = record.org_id;
        this.PredictTimeType = record.predictTimeType;
        this.PredictType = record.predictType;
        this.showModalPage = true;
      },
      delRows(record) {
        this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let data = { model_id: record.modelId }
          model_delete(data).then(response => {
            this.$message({
              message:'删除成功',
              type:'success'
            })
            this.getTableData();
          });
        })
      },
      getTableData(pagination) {
        const $this = this;
        $this.loading = true;
        let good_index = {
          1: "生猪",
          2: "原油",
          3: "大豆",
          4: "玉米",
          5: "天然气"
        };
        if(pagination){
          this.paramSelected.pageIndex = this.pager.current = pagination.current
          this.paramSelected.pageSize = this.pager.pageSize = pagination.pageSize
        }
        queryModel(this.paramSelected).then(response => {
          $this.showdates = response.page.list;
          $this.showdates.forEach(item => {
            Object.keys(good_index).forEach(key =>{
              if(key === item.orgId) {
                item.orgName = good_index[key]
              }
            })
          });
          $this.pager.total = response.page.totalCount;
          $this.loading = false;
        });
      },
      paramSelect() {
        this.getTableData();
      },
      resetData() {
        this.paramSelected = {
          modelName: "",
          algorithm: "",
          predict_type: ""
        };
        this.getTableData();
      },
    },
    created() {
      getAlgorithmNames().then(res => {
        this.algorithmData = [];
        res.data.forEach((item, i) => {
          this.algorithmData[i] = {};
          this.algorithmData[i].label = item;
        });
      });
      this.getTableData();
    }
  };
</script>

<style rel="stylesheet/scss" lang="scss">

  .ant-table-fixed-left, .ant-table-fixed-right{
    z-index: 5
  }
  .topButtonGroup {
    height: 50px;
    line-height: 50px;
  }

  .dynamicSelect {
    margin-left: 35px;
  }

  .selectButtonWidth {
    width: 130px;
  }

  .textStyle {
    line-height: 32px;
    font-size: 15px;
  }

  .table-row {
    width: 100%;
    overflow: auto;
  }

  .ant-pagination {
    width: 90%;
  }
</style>
