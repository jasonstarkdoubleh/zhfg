<template>
  <div>
    <a-modal
      width="650px"
      title="数据连接"
      :visible="visible"
      @ok="handleOk"
      :confirmLoading="confirmLoading"
      @cancel="handleCancel"
    >
      <div class="alignCenter">
        <div>
          <span>数据源类型:</span>
          <a-select v-model='datatype' class="inputWidth">
            <a-select-option :key="datatype" v-for="datatype in dataSourceType"
                             :value="datatype">{{ datatype }}
            </a-select-option>
          </a-select>
          <sup class="signStyle">*</sup>
          <span class="left20">数据库名称:</span>
          <a-input v-model='dbName' class="inputWidth"></a-input>
          <sup class="signStyle">*</sup>
        </div>
        <div style="margin-top: 20px">
          <span>服务器地址:</span>
          <a-input v-model='hhost' class="inputWidth"></a-input>
          <sup class="signStyle">*</sup>
          <span class="inlineBlock left20" style="text-indent: 3em">端口:</span>
          <a-input v-model='pport' class="inputWidth"></a-input>
          <sup class="signStyle">*</sup>
        </div>
        <div class="top20">
          <span class="inlineBlock" style="text-indent: 2em">用户名:</span>
          <a-input v-model='user' class="inputWidth"></a-input>
          <sup class="signStyle">*</sup>
          <span class="inlineBlock left20" style="text-indent: 3em">密码:</span>
          <a-input type="password" v-model='password' class="inputWidth"></a-input>
          <sup class="signStyle">*</sup>
        </div>

        <div class="alignCenter" style="margin-top: 30px">
          <a-button @click="ceshilinajie" type="primary">测试连接</a-button>
          <a-button @click="kubiao" class="left30">库表选择</a-button>
          <a-button @click="quxiao" class="left30">取消</a-button>
        </div>
      </div>
      <div class="top20">
        <div>
          <span class="sj">&nbsp;&nbsp;数据集信息</span>
          <a-divider orientation="left"></a-divider>
        </div>
        <div class="alignCenter">
          <div>
            <span class="inlineBlock" style="text-indent: 1em">库表选择：</span>
            <a-select v-model='table' style="width:250px;">
              <a-select-option v-for="(optionData,index) in this.menuCheckedForRole" :key="index" :value="optionData">
                {{ optionData }}
              </a-select-option>
            </a-select>
            <sup class="signStyle">*</sup>
          </div>
          <div class="top20">
            <span>数据集名称：</span>
            <a-input style="width: 250px" v-model='dataset_name'></a-input>
            <sup class="signStyle">*</sup>
          </div>
          <div class="top20">
            <span class="inlineBlock" style="vertical-align: top;text-indent: 2em">说明：</span>
            <a-input
              type="textarea"
              style="height: 50px;width: 250px;"
              v-model="description">
            </a-input>
          </div>

          <div v-for="(item,index) in dataa " :key="index" class="alignLeft top10">
            <div style="margin-left: 30px">
              <span class="inlineBlock indent1">字段名：</span>
              <a-input v-model="item.name" class="inputWidth" disabled></a-input>
              <span class="inlineBlock left20 indent1">描述：</span>
              <a-input v-model="item.description" class="inputWidth"></a-input>
              <span class="inlineBlock left20 indent1">单位：</span>
              <a-input v-model="item.unit" style="width: 60px"></a-input>
            </div>
          </div>
        </div>
      </div>
    </a-modal>
  </div>
</template>

<script>
  import "@/styles/general.scss"

  export default {
    name: 'importFiles',
    data() {
      return {
        userName: '',
        aaa: [],
        dataa: [],
        visible: false,
        confirmLoading: false,
        kbFlag: 0,
        textarea: '',
        databaseshu: [],
        description: '',
        dbName: '',//数据库名称
        hhost: '',//服务器地址
        pport: '',//端口
        user: '',
        password: '',
        table: '',
        datatype: '',//数据源类型
        dataset_name: '',
        menuCheckedForRole: [],
        dataSourceType: ['mysql','hive']
      }
    },
    mounted() {
      //获取操作人
      this.BaseRequest({
        url: 'sys/user/getUserInfo',
        method: 'get',
      }).then(response => {
        console.log(response)
        this.userName = response.user_name
        console.log(this.userName)
      })
    },
    methods: {
      lieming() {  // 获取文件列名
        this.dataa = []
        this.BaseRequest({
          url: 'sys/database/selectdatabasecolumn_name',
          method: 'post',
          params: {"db": this.dbName, "ttable": this.table}
        }).then(response => {
          if (response != null && response.length > 0) {
            this.aaa = response;
            for (var i = 0; i < response.length; i++) {
              var template = {};
              template.name = this.aaa[i],
                template.description = '',
                template.unit = ''
              this.dataa.push(template);
            }
            this.Message.success('获取列名成功！')
          }
        })
      },
      showModal() {
        this.visible = true
      },

      handleOk(e) {
        this.confirmLoading = true;
        setTimeout(() => {
          this.confirmLoading = false;
        }, 2000);
        this.Request({
          url: 'dataset/mysql_import',
          method: 'post',
          data: {
            'dataset_name': this.dataset_name,
            'description': this.description,
            'host': this.hhost,
            'port': this.pport,
            'db': this.dbName,
            'user': this.user,
            'password': this.password,
            'table': this.table,
            'operator': this.userName,
            'column_lists': JSON.stringify(this.dataa)
          }
        }).then(response => {
          if (response.code == 0) {
            this.Message.success('成功！')
            this.visible = false
          } else {
            this.visible = true;
            this.Message.error('无选择库表！请先选择库表配置完成后再操作！')
          }

        })
      },
      handleCancel(e) {
        this.table = "";
        this.dataset_name = "";
        this.textarea = "";
        this.visible = false
      },
      kubiao() {  //库表选择
        this.kbFlag = 1;
        this.BaseRequest({
          url: 'sys/database/selectdatabase',
          method: 'post',
          params: {'dataname': this.dbName}
        }).then(response => {
          this.menuCheckedForRole = [];
          if (response != null && response.length > 0) {
            this.databaseshu = response.resultData
            response.forEach(menuData => {
              this.menuCheckedForRole.push(menuData.table_name + '')
            })
          }
        })
      },
      //测试连接
      ceshilinajie() {
        this.BaseRequest({
          url: 'sys/database/ceshi',
          method: 'post',
          params: {
            'datatype': this.datatype,
            'dataname': this.dbName,
            'jdbcaddress': this.hhost,
            'jdbcport': this.pport,
            'username': this.user,
            'userpd': this.password
          }
        }).then(response => {
          if (response != null || response.length > 0) {
            this.Message.success('测试连接成功！')
          } else {
            this.Message.success('测试连接失败！')
          }
        })
      },
      //取消
      quxiao() {
        this.dataa = [];         //列表数据
        this.description = "";  //描述
        this.datatype = "";     //数据源类型
        this.dbName = "";            //数据库名称
        this.hhost = "";         //服务器地址
        this.pport = "";         //服务器端口号
        this.username = "";      //用户名
        this.password = "";      //密码
      }
    },
    props: ['table'],
    watch: {
      'table': function () {
        this.lieming();
      }
    },
  }

</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .sj {
    /*float: left;*/
    font-size: 15px;
    font-weight: bolder;
    color: #0e0e0e;
  }
  .inputWidth {
    width: 150px;
  }
  .signStyle{
    margin-left: 3px;
    color: red;
  }

</style>
