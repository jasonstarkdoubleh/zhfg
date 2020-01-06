<template>
  <div>
    <a-modal title="数据集查看" v-model="showTips" width="70%">
      <!--表格-->
      <div style="overflow-x: auto; width:100%;">
        <table class="tableData">
          <tr class="btbg">
            <th v-for="(item,index) in titleHead" :key="index">
              <a-tooltip>
                <template slot='title'>
                  单位：{{item.unit}}
                  <br>
                  描述：{{item.description}}
                </template>
                {{item.name}}
              </a-tooltip>
            </th>
          </tr>
          <tr v-for="(item,index) in resultData" :key="index">
            <td v-for="(value,index) in item" :key="index">{{value}}</td>
          </tr>
        </table>
      </div>
      <div slot="footer" class="dialog-footer">
        <a-button @click="closeModal">取 消</a-button>
      </div>
    </a-modal>
  </div>
</template>

<script>
  import {required} from 'vuelidate/lib/validators'
  import "@/styles/table-page.scss"
  import "@/styles/general.scss"

  export default {
    name: 'seeDataPreprocessing',
    data() {
      return {
        titleHead: [],
        resultData: [],
        showTips: false,
      }
    },
    methods: {
      showModel(dataset_id) {
        this.Request({
          url: "dataset/get_content",
          method: 'post',
          data: {"dataset_id": dataset_id}
        }).then(response => {
          if (!response.code) {
            this.resultData = response.content.tableData.splice(0, 10);
            this.titleHead = response.content.tableHead;
            this.showTips = true;
          } else {
            this.resultData = [];
            this.titleHead = [];
            this.$warning({
              title: response.msg,
              content: response.log,
            });
          }
        })
      },
      closeModal() {
        this.showTips = false;
      },
    },
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .inputWidth {
    width: 250px;
  }

  .buttomButton {
    margin-top: 40px;
  }

  .tableData {
    width: 100%;
    border: 1px solid #e7ebee;
  }

  .tableData td, .tableData tr {
    vertical-align: middle;
    text-align: center;
    height: 20px;
    line-height: 30px;
    border-bottom: 1px solid #f7f6f6;
  }

  .btbg {
    background-color: #f7f6f6;
    font-weight: bold;
    height: 25px;
    line-height: 25px;
  }

</style>
