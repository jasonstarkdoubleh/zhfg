<template>
  <!--<WorkMain :headerItems="['文件导入']">-->
    <div>
      <!--<a-button type="primary" @click="showModal">文件导入</a-button>-->
      <a-modal
        width="700px"
        title="文件导入"
        :visible="visible"
        @ok="handleOk"
        :confirmLoading="confirmLoading"
        @cancel="handleCancel"
      >
          <div style=" width: 600px;height: 220px;position: relative;top: 10px;left: 60px;text-align: left" class="border">
            <div style="margin-top: 20px;margin-left: 20px">
              <span class='labeltext'>导入文件:</span>
              <a-input style="width: 350px" type="text" class='inputtext' v-model='fileurl'></a-input>
              <input
                style="width: 75px;margin-left: 10px"
                id="fileDemo"
                type="file"
                multiple="multiple"
                accept=".csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                class='selectfile'
                @change='handleFileChange'
                ref='handleFileChange'
              >
             <!-- <a-button @click="daorudaoru" class="left10" type="primary">导入</a-button>-->
            </div>

            <div  style="list-style: none;margin-top: 20px">
              <span style="margin-left: 3px">数据集名称:</span>
              <a-input style="width: 350px" auto-complete="off"  placeholder=给数据集起个名字 v-model='dataname'></a-input>
            </div>

            <div  style="list-style: none;margin-top: 20px">
              <span style="margin-left: 45px">说明:</span>
              <a-input
                type="textarea"
                style="height: 70px;width: 350px"
                :rows="2"
                placeholder="描述你的数据集"
                v-model="textarea">
              </a-input>
            </div>
          </div>

        <div v-for="(item,index) in aaa " :key="index" class="alignLeft top10">
          <div style="margin-left: 50px">
            <span class="inlineBlock indent1">列名：</span>
            <a-input v-model="item.name" class="inputWidth" disabled ></a-input>
            <span class="inlineBlock left20 indent1">描述：</span>
            <a-input v-model="item.description" class="inputWidth"></a-input>
            <span class="inlineBlock left20 indent1">单位：</span>
            <a-input v-model="item.unit" style="width: 60px"></a-input>
          </div>
        </div>
      </a-modal>
    </div>
  <!--</WorkMain>-->
</template>

<script>

  export default {
    name: 'importFiles',
    data() {
      return {
        userName:'',
        dataset_id:'',
        ColumnNameConfiguration:[],
        aaa:[],
        kbFlag: 0,
        textarea: '',
        fileurl: '',
        dataname:'',
        visible: false,
        confirmLoading: false

      }
    },
    mounted() {
      //获取操作人
      this.BaseRequest({
        url: 'sys/user/getUserInfo',
        method: 'get',
      }).then(response => {
        console.log(response)
        this.userName=response.user_name
        console.log(this.userName)
      })
    },
    methods: {
      showModal() {
        this.visible = true
        this.dataname = "";
        this.textarea = "";
       this.fileurl ="";
        this.aaa = [];
      },
      handleFileChange (e) {
        console.log(e)
        this.aaa = [];
        // 首先获取该DOM元素
        let inputDOM = this.$refs.handleFileChange
        // 通过DOM元素取文件数据
        this.file = inputDOM.files[0]
        // 获取文件的地址加名字
        this.fileurl = document.getElementById('fileDemo').value
        var arr = this.fileurl.split(".")
        this.separations_id  = arr[0];
        var dana = this.separations_id.split("\\");
        var ddd = dana.length;
        var s = 0;
        for(var i = 0 ;i <dana.length ; i++){
          s++
        }
        this.$refs.handleFileChange.value = null;
        //拿到文件名
        var  ddddd = dana[s-1];
        this.dataname = ddddd;
        if (this.fileurl) {
          this.disabled = false
        } else {
          this.disabled = true
        }
        console.log(this.dataname,"this.dataname")
        this.daorudaoru();
      },
      handleOk(e){  //判断是否有fileurl
        this.confirmLoading = true;
        setTimeout(() => {
          this.confirmLoading = false;
        }, 2000);
        if (this.fileurl) {
          this.handleSubmitFile()
        } else {
          this.disabled = true
          this.Message.error('无上传文件！ 请先导入文件后再操作!')
        }
      },
      handleSubmitFile () {
        //this.visible = true
        //点击确定传入列名描述单位集合
       /* if(this.dataname == ''){
          this.Message.error('请先导入文件！')
          this.visible = true
        }*/
        if(this.aaa.length == 0){
          this.Message.error('请先导入再执行此操作！')
          this.visible = true
        }else{
          let params = {"dataset_id":this.dataset_id,"column_lists":JSON.stringify(this.aaa),"dataname":this.dataname,"textarea":this.textarea};
          this.BaseRequest({
            url: '/modelfile/modelfileinsertColumnlists',
            method: 'post',
            data: params
          }).then(response => {
            this.Message.success('已保存！')
            this.$emit('shuaxindata'); //刷新列表
            this.dataset_id = '';
            this.visible = false
           this.dataname = "";
            this.textarea = "";
           this.fileurl ="";
            this.aaa = [];
          })
        }
      },
      daorudaoru(){
        this.Request({
          url: 'dataset/del_dataset',
          method: 'post',
          data: {"dataset_id" :this.dataset_id}
        }).then(response => {
          if(response.code == 0){
            // this.Message.success('成功')
          }else{
            this.$warning({
              title: response.msg,
              content: response.log,
            });
          }
        })
        this.daoru();
      },
      daoru(){

        const sendDataForm = new FormData()
        const uploadFileRaw = this.file.raw
        if(uploadFileRaw!=null){
          if(uploadFileRaw.size>512000){
            this.Message.error("文件超大，上传文件最大不允许超过512字节")
            return
          }
        }
        sendDataForm.append("file",this.file ||{})     //文件
        sendDataForm.append("dataset_name",this.dataname || '')  //文件名称
        sendDataForm.append("description",this.textarea || '')  //描述
        sendDataForm.append("operator",this.userName)   //操作人
        sendDataForm.append("column_lists","")
        console.log(sendDataForm)
        this.Request({
          url: 'dataset/excel_import',
          method: 'post',
          data: sendDataForm
        }).then(response => {
          console.log(response.dataset_id,"onsole.log(response.dataset_idonsole.log(response.dataset_idonsole.log(response.dataset_id")
          if(response.code == 0){
            this.dataset_id = response.dataset_id;
            console.log(this.dataset_id,"this.dataset_id")
            this.lieming();
            this.$emit('shuaxindata'); //刷新列表
          }else{
//            this.Message.error('导入失败')
            this.$warning({
              title: response.msg,
              content: response.log,
            });
          }

        })
      },
      lieming(){  // 获取文件列名
        console.log(this.dataset_id,"this.删除")
        this.Request({
          url: 'dataset/get_columns',
          method: 'post',
          data: {"dataset_id" :this.dataset_id}
        }).then(response => {
          if(response.code ==0){
            this.ColumnNameConfiguration = response.columns;
            for (var i = 0; i < this.ColumnNameConfiguration.length; i++){
              var template = {};
                template.name = this.ColumnNameConfiguration[i],
                template.description ='',
                template.unit  = ''
              this.aaa.push(template);
            }
            console.log(this.ColumnNameConfiguration)
            //this.Message.success('获取成功')
          }else {
            this.$warning({
              title: response.msg,
              content: response.log,
            });
          }
        })
      },
      kubiao() {  //库表选择
        this.kbFlag = 1;
      },
      handleCancel(e) {
        console.log(this.dataset_id,"this.删除")
        this.Request({
          url: 'dataset/del_dataset',
          method: 'post',
          data: {"dataset_id" :this.dataset_id}
        }).then(response => {
          if(response.code == 0){
           // this.Message.success('成功')
          }else{
            this.$warning({
              title: response.msg,
              content: response.log,
            });
          }
        })
        this.$emit('shuaxindata'); //刷新列表
        this.visible = false
      }
    }
  }

</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .sj {
    float: left;
    font-size: 15px;
    font-weight: bolder;
    color: #0e0e0e;
  }
  .icons {
    font-size: 30px;
  }
  .docImport {
    margin-right: 650px;
    margin-top: 20px;
  }

  .inputWidth {
    width: 150px;
  }



</style>
