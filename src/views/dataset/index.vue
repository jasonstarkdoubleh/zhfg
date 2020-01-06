<template>
  <div>

    <div v-show="dataSet">
      <div>
        <el-button type="primary" style="width: 150px" @click="handleCreate(true)">创 建</el-button>
        <el-button style="width: 150px" v-show="deleteShow" @click="updateData">修 改</el-button>
        <el-button style="width: 150px" v-show="deleteShow" @click="handleDelete">删 除</el-button>
      </div>
      <div style="margin-top: 10px;display: flex;background: #ffffff;padding: 10px">
        <div style="width: 25%;min-height: 500px;margin-right: 10px">
          <div style="height: 30px;line-height: 30px;text-align: center">数据集名</div>
          <div style="height: 470px;overflow: scroll;border: 1px solid #cccccc;overflow-x: hidden;padding: 10px">
            <div style="padding: 5px" v-for="(item, index) in dataName" :key="index">
              <el-radio v-model="radioValue" :label="item" @change="handleGetTable" >
                {{ item.dataSetName }}
              </el-radio>
            </div>
          </div>
        </div>

        <div style="width: 75%;min-height: 500px">
          <div style="height: 30px;line-height: 30px;text-align: center">数据集内容</div>
          <div style="height: 470px;overflow-y: scroll">
            <jtable
              :tableData="tableData"
              :columnData="columnData"
              :pageShow="false">

            </jtable>
          </div>
        </div>
      </div>
    </div>

    <el-card v-show="create">
      <div>
        <el-form ref="form" :model="form" label-width="120px">
          <el-form-item label="数据集名称">
            <el-input v-model="form.dataSetName" style="width: 200px" :disabled="disabled"></el-input>
          </el-form-item>
          <el-form-item label="数据集类型">
            <el-select v-model="form.dataSetType" :disabled="disabled">
              <el-option v-for="(item, index) in codeNameOptions" :key="index" :label="item.codeName" :value="item.codeId"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="指标名称" v-for="(item, index) in createCount" :key="index">
            <el-select v-model="item.commLevelCode_0" style="width: 180px" :disabled="disabled">
              <el-option
                v-for="(item, index) in goodsTypeOptions"
                :key="index"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-select v-model="item.commLevelCode_1" style="width: 180px" :disabled="disabled">
              <el-option
                v-for="(item, index) in item.goodsClassOptions"
                :key="index"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-select v-model="item.commLevelCode_2" style="width: 180px" :disabled="disabled">
              <el-option
                v-for="item in item.goodsNameOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-select v-model="item.commLevelCode_3" style="width: 180px" :disabled="disabled">
              <el-option
                v-for="(item, index) in item.goodsNameOptionsItems"
                :key="index"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-select v-model="item.subItem" style="width: 180px" multiple collapse-tags>
              <el-option
                v-for="(item, index) in item.subItemOptions"
                :key="index"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-select v-model="item.subItemSup" style="width: 180px" multiple collapse-tags>
              <el-option
                v-for="(item, index) in item.subItemSupOptions"
                :key="index"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-button @click="handleAddCount" v-show="!disabled">+</el-button>
            <!--            <el-button @click="handleProCount(index)">-</el-button>-->
          </el-form-item>

          <el-form-item label="宏观指标名称" v-show="macShow">
            <el-select v-model="macType" style="width: 180px" multiple collapse-tags :disabled="disabled">
              <el-option
                v-for="(item, index) in macTypeOptions"
                :key="index"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-select v-model="macName" style="width: 180px" multiple collapse-tags>
              <el-option
                v-for="(item, index) in macNameOptions"
                :key="index"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button v-show="!disabled" type="primary" @click="onSubmit">立即创建</el-button>
            <el-button v-show="disabled" type="primary" @click="onSubmit">立即修改</el-button>
            <el-button @click="nextStep" v-show="!disabled">下一步</el-button>
            <el-button @click="handleCreate(false)">取 消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>

  </div>
</template>

<script>
  import jtable from '_c/Jtable'
  import jtree from '_c/Jtree'
  import { mapActions } from 'vuex'
  import { getHiveData, getAsciiByCode, pssdatasetinfoSave, pssdatasetinfo, tree, macTree,getIndexInfoByDataSetId,pssdatasetinfoUpdate } from '@/api/manager'
  export default {
    data() {
      return {
        macValue: [],
        macShow: false,
        macType : '',
        macTypeOptions: [],
        macName: [],
        macNameOptions: [],
        dataItem: [],
        subItemSupCopy: [],
        subItemSupOptions: [],
        // subItem: [],
        subItemOptions: [],
        subData: [],
        getCommTypeData: {},                  //所有商品信息
        // commLevelCode_3: '',                         //规格品
        goodsNameOptionsItems:[],
        // commLevelCode_2: '',                         //商品名称
        goodsNameOptions:[],
        // commLevelCode_1: '',                         //商品大类
        goodsClassOptions:[],
        // commLevelCode_0: '',                   //商品类型
        goodsTypeOptions: [],
        createCount: [{
          commLevelCode_0: '',
          commLevelCode_1: '',
          commLevelCode_2: '',
          commLevelCode_3: '',
          subItem: [],
          subItemSup: []
        }],
        createNum:0,
        deleteShow: false,
        radioValue: '',
        dataName: [],
        dataSet: true,
        create: false,
        tableData: [],
        columnData: { commName:'商品名称', indexName:'指标名称', areaName:'地区',frequence:'频度' },
        codeNameOptions: [],
        disabled:false,
        form: {
          dataSetName: '',
          dataSetType:''
        },
        formCopy: {},
        updata:''
      }
    },
    components: {
      jtable,
      jtree
    },
    watch: {
      macType(val) {
        this.macName = []
        if(val.length > 0) {
          let num = 0
          this.macNameOptions = []
          for(let j in val) {
            for(let i in this.macValue) {
              if(this.macValue[i].subList[0].indexType === val[j]) {
                for(let m in this.macValue[i].subList) {
                  this.macNameOptions[num] = {}
                  this.macNameOptions[num].label = this.macValue[i].subList[m].indexName
                  this.macNameOptions[num].value = this.macValue[i].subList[m].indexId
                  num++
                }
              }
            }
          }
        }
      },

      radioValue(val) {
        this.deleteShow = !!val;
      },

      commLevelCode_0(val) {
        this.goodsClassOptions = [];
        this.createCount[this.createNum].goodsClassOptions = []
        this.createCount[this.createNum].commLevelCode_1 = ''
        let num = 0
        if (val) {
          for (let i in this.getCommTypeData.commLevelCode_1){
            if(this.getCommTypeData.commLevelCode_1[i].parentCode === val){
              this.goodsClassOptions[num] = {}
              this.goodsClassOptions[num].value = this.getCommTypeData.commLevelCode_1[i].commId
              this.goodsClassOptions[num].label = this.getCommTypeData.commLevelCode_1[i].commName
              num++
            }
          }
          this.createCount[this.createNum].goodsClassOptions = this.createCount[this.createNum].goodsClassOptions.concat(this.goodsClassOptions)
        }
      },

      commLevelCode_1(val) {
        this.goodsNameOptions = []
        this.createCount[this.createNum].goodsNameOptions = []
        this.createCount[this.createNum].commLevelCode_2 = ''
        let num = 0
        if(val){
          for (let i in this.getCommTypeData.commLevelCode_2){
            if(this.getCommTypeData.commLevelCode_2[i].parentCode === val){
              this.goodsNameOptions[num] = {}
              this.goodsNameOptions[num].value = this.getCommTypeData.commLevelCode_2[i].commId
              this.goodsNameOptions[num].label = this.getCommTypeData.commLevelCode_2[i].commName
              num++
            }
          }
          this.createCount[this.createNum].goodsNameOptions = this.createCount[this.createNum].goodsNameOptions.concat(this.goodsNameOptions)
        }
      },

      commLevelCode_2(val) {
        this.goodsNameOptionsItems = []
        this.createCount[this.createNum].goodsNameOptionsItems = []
        this.createCount[this.createNum].commLevelCode_3 = ''
        let num = 0
        if(val){
          for (let i in this.getCommTypeData.commLevelCode_3){
            if(this.getCommTypeData.commLevelCode_3[i].parentCode === val){
              this.goodsNameOptionsItems[num] = {}
              this.goodsNameOptionsItems[num].value = this.getCommTypeData.commLevelCode_3[i].commId
              this.goodsNameOptionsItems[num].label = this.getCommTypeData.commLevelCode_3[i].commName
              num++
            }
          }
          this.createCount[this.createNum].goodsNameOptionsItems = this.createCount[this.createNum].goodsNameOptionsItems.concat(this.goodsNameOptionsItems)
        }
      },

      commLevelCode_3(val) {
        if(val) {
          tree(val).then(res => {
            this.createCount[this.createNum].subItem = []
            this.createCount[this.createNum].subItemOptions = []
            this.subData = res.data
            this.subItemOptions = []
            for(let i in res.data) {
              this.subItemOptions[i] = {}
              this.subItemOptions[i].label = res.data[i].indexType
              this.subItemOptions[i].value = res.data[i].indexType
            }
            this.createCount[this.createNum].subItemOptions = this.createCount[this.createNum].subItemOptions.concat(this.subItemOptions)
          })
        }else {
          this.createCount[this.createNum].subItem = []
          this.createCount[this.createNum].subItemOptions = []
          this.createCount[this.createNum].subItemOptions = this.createCount[this.createNum].subItemOptions.concat(this.subItemOptions)
        }
      },

      subItem(val) {
        this.createCount[this.createNum].subItemSup = []
        if(val.length > 0) {
          let num = 0
          this.subItemSupOptions = []
          this.createCount[this.createNum].subItemSupOptions =[]
          for(let j in val) {
            for(let i in this.subData) {
              if(this.subData[i].subList[0].indexType === val[j]) {
                for(let m in this.subData[i].subList) {
                  this.subItemSupOptions[num] = {}
                  this.subItemSupOptions[num].label = this.subData[i].subList[m].indexName
                  this.subItemSupOptions[num].value = this.subData[i].subList[m].indexId
                  num++
                }
              }
            }
          }
          this.createCount[this.createNum].subItemSupOptions = this.createCount[this.createNum].subItemSupOptions.concat(this.subItemSupOptions)
        }
      }
    },
    computed: {
      commLevelCode_0() {
        return this.createCount[this.createNum].commLevelCode_0
      },
      commLevelCode_1() {
        return this.createCount[this.createNum].commLevelCode_1
      },
      commLevelCode_2() {
        return this.createCount[this.createNum].commLevelCode_2
      },
      commLevelCode_3() {
        return this.createCount[this.createNum].commLevelCode_3
      },
      subItem() {
        return this.createCount[this.createNum].subItem
      },
      subItemSup() {
        return this.createCount[this.createNum].subItemSup
      },
    },
    methods: {
      handleAddCount() {
        this.createCount.push(this.addProp())
        this.createNum += 1
      },
      handleProCount(index){
        if(this.createNum > 0) {
          this.createCount.splice(index,1)
          this.createNum -= 1
        }
      },
      ...mapActions([
        'getDataSetList',
        'getCommType'
      ]),
      handleGetTable() {
        this.updata = this.radioValue
        getIndexInfoByDataSetId(this.radioValue.dataSetId).then(res=>{
          this.tableData = res.data
          console.log(res)
        })
      },
      handleDelete() {
        pssdatasetinfo(this.radioValue.dataSetId).then(res => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.getDataSetList().then(res => {
            this.dataName = res.data
            for(let i in this.dataName) {
              this.dataName[i].indeVar = JSON.parse(this.dataName[i].indeVar)
              this.dataName[i].commIndevalPath = JSON.parse(this.dataName[i].commIndevalPath)
              this.dataName[i].macroIndevalPath = JSON.parse(this.dataName[i].macroIndevalPath)
            }
          })
        })
      },
      updateData(){
        this.disabled = true
        this.handleCreate(true)
        this.form.dataSetName = this.updata.dataSetName
        this.form.dataSetType = this.updata.dataSetType
        if(Object.keys(this.updata.macroIndevalPath).length){
          this.macShow = true
          this.macType = this.updata.macroIndevalPath[0][0]
          this.$nextTick(()=>{
            this.macName = this.updata.macroIndevalPath[0][1]
          })
        }
        let i = 0
        let key = 0
        let fun = ()=>{
          if((Object.keys(this.updata.commIndevalPath)).length > key){
            if(i){
              this.handleAddCount()
            }
            this.createCount[i].commLevelCode_0 = this.updata.commIndevalPath[key][0]
            this.$nextTick(()=>{
              this.createCount[i].commLevelCode_1 = this.updata.commIndevalPath[key][1]
              this.$nextTick(()=>{
                this.createCount[i].commLevelCode_2 = this.updata.commIndevalPath[key][2]
                this.$nextTick(()=>{
                  this.createCount[i].commLevelCode_3 = this.updata.commIndevalPath[key][3]
                  this.$nextTick(()=>{
                    tree(this.createCount[i].commLevelCode_3).then(res => {
                      this.createCount[i].subItem = this.updata.commIndevalPath[key][4]
                      this.$nextTick(()=>{
                        this.createCount[i].subItemSup = this.updata.commIndevalPath[key][5]
                        i++
                        key++
                        fun()
                      })
                    })
                  })
                })
              })
            })
          }
        }
        fun()
      },
      handleCreate(data) {
        if(data) {
          this.dataSet = false
          this.create = true
          getAsciiByCode(84).then(res => {
            this.codeNameOptions = res.data
          })
        }
        if(!data) {
          this.createCount = [{
            commLevelCode_0: '',
            commLevelCode_1: '',
            commLevelCode_2: '',
            commLevelCode_3: '',
            subItem: [],
            subItemSup: []
          }]
          this.createNum = 0
          this.form = JSON.parse(JSON.stringify(this.formCopy))
          this.create = false
          this.dataSet = true
          this.disabled = false
          this.macShow = false
          this.macType = []
          this.radioValue = ''
          this.tableData = []
          this.handleListAll()
        }
      },
      onSubmit() {
        this.subItemSupCopy = []
        this.createCount.forEach((item,index) => {
          this.subItemSupCopy = this.subItemSupCopy.concat(item.subItemSup)
        })
        if(this.macName.length > 0 && this.subItemSupCopy.length > 0) {
          this.form.indeVar = {}
          this.form.indeVar.comm_table = this.subItemSupCopy
          this.form.indeVar.macro_table = this.macName
          this.form.indeVar = JSON.stringify(this.form.indeVar)
        }
        if(this.macName.length === 0 && this.subItemSupCopy.length > 0) {
          this.form.indeVar = {}
          this.form.indeVar.comm_table = this.subItemSupCopy
          this.form.indeVar = JSON.stringify(this.form.indeVar)
        }
        if(this.macName.length > 0 && this.subItemSupCopy.length === 0) {
          this.form.indeVar = {}
          this.form.indeVar.macro_table = this.macName
          this.form.indeVar = JSON.stringify(this.form.indeVar)
        }
        this.form.commIndevalPath = {}
        let m = 0
        for(;m<this.createNum+1;m++){
          this.form.commIndevalPath[m] = [this.createCount[m].commLevelCode_0,this.createCount[m].commLevelCode_1,this.createCount[m].commLevelCode_2,this.createCount[m].commLevelCode_3,this.createCount[m].subItem,this.createCount[m].subItemSup]
        }
        if(this.macName.length){
          this.form.macroIndevalPath = {0:[this.macType,this.macName]}
        }else {
          this.form.macroIndevalPath = {}
        }
        this.form.commIndevalPath = JSON.stringify(this.form.commIndevalPath)
        this.form.macroIndevalPath = JSON.stringify(this.form.macroIndevalPath)
        if(this.disabled) {
          let data = {
            "dataSetId": this.updata.dataSetId,
            "indeVar": this.form.indeVar,
            "commIndevalPath": this.form.commIndevalPath,
            "macroIndevalPath": this.form.macroIndevalPath
          }
          pssdatasetinfoUpdate(data).then(res=>{
            console.log(res)
            this.$message({
              message:'修改成功',
              type:'success'
            })
            this.handleCreate()
          })
        }
        else {
          pssdatasetinfoSave(this.form).then(res => {
            this.$message({
              message:'创建成功',
              type:'success'
            })
            this.handleCreate()
          })
        }
      },
      nextStep() {
        this.macShow = true
        // this.dataItem = this.dataItem.concat(this.subItemSup)
      },
      addProp() {
        let data = {}
        data.commLevelCode_0 = ''
        data.commLevelCode_1 = ''
        data.commLevelCode_2 = ''
        data.commLevelCode_3 = ''
        data.subItem = []
        data.subItemSup = []
        return data
      },
      handleListAll() {
        this.getDataSetList().then(res => {
          this.dataName = res.data
          for(let i in this.dataName) {
            this.dataName[i].indeVar = JSON.parse(this.dataName[i].indeVar)
            this.dataName[i].commIndevalPath = JSON.parse(this.dataName[i].commIndevalPath)
            this.dataName[i].macroIndevalPath = JSON.parse(this.dataName[i].macroIndevalPath)
          }
        })
        //查询商品类型
        this.getCommType().then(res => {
          this.getCommTypeData = {};
          this.getCommTypeData = res.data;
          this.goodsTypeOptions = [];
          for(let i in this.getCommTypeData.commLevelCode_0){
            this.goodsTypeOptions[i] = {};
            this.goodsTypeOptions[i].value  = this.getCommTypeData.commLevelCode_0[i].commId;
            this.goodsTypeOptions[i].label  = this.getCommTypeData.commLevelCode_0[i].commName
          }
          // this.goodsTypeOptions.unshift({label: '全部', value: ''})
        })
      }
    },
    created() {
      this.formCopy = JSON.parse(JSON.stringify(this.form))
      this.handleListAll()
      macTree().then(({data}) => {
        this.macValue = data
        this.macTypeOptions = []
        for(let i in data) {
          this.macTypeOptions[i] = {}
          this.macTypeOptions[i].label = data[i].indexName
          this.macTypeOptions[i].value = data[i].indexType
        }
      })
    }
  }
</script>

<style scoped>

</style>
