<template>
  <WorkMain :headerItems="['模型设计','数据预处理','查看数据']" :outerFlag="false">
    <div class="allLayout">
      <div style="width: 100%;margin-left: 20%;margin-top: 50px">
        <div class="textLeft">
          <span>模型名称:</span>
          <a-input  v-model="model_name"   class="inputWidth"></a-input>
        </div>
        <div class="textLeft proportion" style="text-indent: 1em">
          <span style="margin-left: 16px">类型:</span>
          <a-input style="width: 120px"  v-model="model_type"  ></a-input>
          <span style="margin-left: 36px">城市名称:</span>
          <a-input style="width: 120px"   v-model="city_name"  ></a-input>
        </div>
        <div class="textLeft proportion" style="text-indent: 2em">
          <span style="vertical-align:top;margin-left: 3px">描述:</span>
          <a-textarea  v-model="describe" class="inputWidth"></a-textarea>
        </div>
        <div class="textLeft proportion" style="text-indent: 1em;">
          <div  style="width: 90px;" class="floatleft" >
            <span >变量信息表:</span>
          </div>
           <div class="floatright" style="margin-right: 310px">
          <table style="width: 600px;background-color: whitesmoke;">
            <tr>
              <th class="btbg" @mouseover="aaa(item)" v-for="item in titleHead">{{item}}</th>
            </tr>
            <tr v-for="(item,index) in resultData">
              <td>{{index + 1}}</td>
              <td v-for="value in item">{{value}}</td>
            </tr>
          </table>
           </div>
        </div>
        <div class="clearFloatr;">
          <a-button class="floatLeft" style="margin-left: 300px;margin-top: 20px">返回</a-button>
        </div>
      </div>
    </div>
  </WorkMain>
</template>

<script>
  import WorkMain from '@/models/public/WorkMain';
  import "@/styles/table-page.scss";
  import AInput from "ant-design-vue/es/input/Input";
  import AButton from "ant-design-vue/es/button/button";

  export default {
    name: 'ModelSee',
    data() {
      return {
        model_name: '',
        model_type: '',
        city_name: '',
        describe: '',
        titleHead:  ["序号","数据项名称","数据类型","缺失值","min","max","average","std"],
        resultData: [],
      }
    },
    validations: {},
    computed: {

    },
    components: {
      AButton,
      AInput,
      WorkMain
    },
    methods: {
    },
    mounted() {
      this.Request({
        url: "dataset/get_content",
        method: 'post',
        data: {"dataset_id": ""}
      }).then(response => {
      /*  this.model_name =response;
          this.model_type=response;
          this.city_name=response;
          this.describe=response;*/
        this.titleHead = this.titleHead.concat(response.content.tableHead);
        this.resultData = response.content.tableData;
      })
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .allLayout {
    width: 100%;
    height: 90%;
    overflow: auto;
  }

  .textLeft {
    text-align: left;
  }

  .proportion {
    margin-top: 20px;
  }

  .inputWidth {
    width: 350px;
  }


  .floatLeft {
    float: left;
  }

  .clearFloat:after {
    content: '';
    display: block;
    clear: both;
  }

  .border {
    border: 2px solid red;
  }

  .btbg {
    background-color: #999999;
  }

  .floatright {
    float: right;
  }
  .floatleft {
    float: left;
  }

</style>
