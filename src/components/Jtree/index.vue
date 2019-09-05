<template>
  <div class="app-container">
    <div class="half-tree" style="padding-right: 1%;box-sizing: content-box">
      <el-input v-model="filterText" placeholder="关键字过滤" style="margin-bottom:10px;" size="small"/>
      <!--    default-expand-all-->
      <div class="tree-node" >
        <el-scrollbar style="height: 100%;">
          <el-tree
            ref="treeone"
            :data="data"
            show-checkbox
            :props="defaultProps"
            :check-strictly="true"
            :filter-node-method="filterNode"
            class="filter-tree"
            node-key="id"
            :default-expanded-keys="defalutNode"
            :default-checked-keys="defalutNode"
            @node-drag-start="handleDragStart"
            @node-drag-enter="handleDragEnter"
            @node-drag-leave="handleDragLeave"
            @node-drag-over="handleDragOver"
            @node-drag-end="handleDragEnd"
            @node-drop="handleDrop"
            draggable
            :allow-drop="allowDrop"
            :allow-drag="allowDrag"
            @check="getCheckedNodes"
          />
        </el-scrollbar>
      </div>
    </div>
    <div class="half-tree" style="margin-left: 1%">
      <!-- <el-input v-model="filterText" placeholder="关键字过滤" style="margin-bottom:10px;" size="small"/> -->
      <!--    default-expand-all-->
      <div class="tree-node">
        <el-scrollbar style="height: 100%">
          <el-tree
            ref="treetwo"
            :data="data2"
            show-checkbox
            :props="defaultProps"
            :check-strictly="true"
            node-key="id"
            :default-checked-keys="data3"
            :filter-node-method="filterNode"
            default-expand-all
            class="filter-tree"
            @node-drag-start="handleDragStart"
            @node-drag-enter="handleDragEnter"
            @node-drag-leave="handleDragLeave"
            @node-drag-over="handleDragOver"
            @node-drag-end="handleDragEnd"
            @node-drop="handleDrop"
            draggable
            :allow-drop="allowDrop"
            :allow-drag="allowDrag"
            @check="getCheckedNodesCopy"
          />
        </el-scrollbar>
      </div>
    </div>
  </div>
</template>

<script>
    import treeData from './data'
    export default {
        data() {
            return {
                filterText: '',                 //关键词过滤
                data:[],                        //一号的数据
                data2: [],                      //二号的数据
                data3:[],                       //二号默认选中的数据
                data4:[],                       //设置一号勾选的节点数据
                pIdArr:[],
                checked:[],
                newTreeData:[],
                defalutNode:[],
                defaultProps: {
                    children: 'children',
                    label: 'name'
                }
            }
        },

        //父组件传递过来反写的值
        props:['treeDefault'],

        watch: {

            //关键词过滤方法
            filterText(val) {
                this.$refs.treeone.filter(val)
            },

            //监听父组件传递过来的值进行反写
            treeDefault(val){
                this.data2 = this.treeDefault.concat()
                this.data3 = []
                // for(let i in this.data2){
                //   if(this.data2[i].children){
                //     let m = 0
                //   }else {
                //     this.data3.push(this.data2[i].id)
                //   }
                // }
                this.defalutNode = []
                for(let i in this.treeDefault){
                    if(this.treeDefault[i].children){
                        1+1
                    }else {
                        this.data3.push(this.treeDefault[i].id)
                        this.defalutNode.push(this.treeDefault[i].id)
                    }
                }
                this.data2 = this.filterArray(this.data2,'0')
            }
        },
        computed:{
            // defalutNode(){
            //   let defalutNode = []
            //   for(let i in this.treeDefault){
            //     if(this.treeDefault[i].children){
            //       console.log(1)
            //     }else {
            //       defalutNode.push(this.treeDefault[i].id)
            //     }
            //   }
            //   return defalutNode
            // },
        },
        methods: {

            //节点过滤操作
            filterNode(value, data) {
                if (!value) return true;
                return data.name.indexOf(value) !== -1
            },

            //节点拖拽操作
            handleDragStart(node, ev) {
                console.log('drag start', node);
            },
            handleDragEnter(draggingNode, dropNode, ev) {
                console.log('tree drag enter: ', dropNode.name);
            },
            handleDragLeave(draggingNode, dropNode, ev) {
                console.log('tree drag leave: ', dropNode.name);
            },
            handleDragOver(draggingNode, dropNode, ev) {
                console.log('tree drag over: ', dropNode.name);
            },
            handleDragEnd(draggingNode, dropNode, dropType, ev) {
                console.log('tree drag end: ', dropNode && dropNode.name, dropType);
            },
            handleDrop(draggingNode, dropNode, dropType, ev) {
                console.log('tree drop: ', dropNode.name, dropType);
            },
            allowDrop(draggingNode, dropNode, type) {
                if (dropNode.data.name === '二级 3-1') {
                    return type !== 'inner';
                } else {
                    return true;
                }
            },
            allowDrag(draggingNode) {
                return draggingNode.data.name.indexOf('三级 3-2-2') === -1;
            },

            //根据PID生成多层结构
            forPid(data) {
                this.pIdArr = []
                for(let i in data){
                    if(data[i].pId != 0){
                        for (let j in this.newTreeData){
                            if(this.newTreeData[j].id == data[i].pId){
                                this.data2.push(this.newTreeData[j])
                                this.pIdArr.push(this.newTreeData[j])
                                // break
                                // this.forPid(this.newTreeData[j])
                            }
                        }
                    }
                }
            },

            //组织父子结构
            filterArray(data, parent) {
                let treeNode = [];
                let temp;
                for (let i = 0; i < data.length; i++) {
                    if (data[i].pId == parent) {
                        let obj = data[i];
                        temp = this.filterArray(data, data[i].id);
                        if (temp.length > 0) {
                            obj.children = temp;
                        }
                        treeNode.push(obj);
                    }
                }
                return treeNode;
            },

            //一号复选框被点击时的操作，设置勾选二号的数据
            getCheckedNodes(val,val2) {
                // console.log(this.$refs.tree.getCheckedNodes());
                // console.log(val);
                // for (let i in val2.checkedNodes){
                //   this.data2.push(val2.checkedNodes[i])
                // }
                // for (let i in val2.halfCheckedNodes){
                //   this.data2.push(val2.halfCheckedNodes[i])
                // }
                // console.log(val);
                // console.log(val2.checkedNodes);
                this.data2 = val2.checkedNodes.concat()
                console.log(val2.checkedNodes)
                this.pIdArr = this.data2
                for (let i = 0;i<6;i++){
                    this.forPid(this.pIdArr)
                }
                let arr = this.data2
                let result = [];
                let obj = {};
                for(let i =0; i<arr.length; i++){
                    if(!obj[arr[i].id]){
                        result.push(arr[i]);
                        obj[arr[i].id] = true;
                    }
                }
                this.data2 = result
                // console.log(this.data2);
                for(let i in this.data2){
                    if(this.data2[i].children){
                        delete this.data2[i].children
                    }
                }
                // console.log(this.data2);
                this.data3 = []
                for(let i in val2.checkedNodes){
                    this.data3.push(val2.checkedNodes[i].id)
                }
                // console.log(this.data3)
                // console.log(val2.checkedNodes);
                this.data2 = this.filterArray(this.data2,'0')
            },

            //二号复选框被点击时的操作，设置勾选一号的数据
            getCheckedNodesCopy(val,val2){
                console.log(val2.checkedNodes);
                // console.log(val2.halfCheckedNodes);
                // this.data2 = val2.checkedNodes.concat(val2.halfCheckedNodes)
                // console.log(this.data2)
                // this.data2 = val2.checkedNodes.concat()
                this.data4 =[]
                for(let i in val2.checkedNodes){
                    if(val2.checkedNodes[i].children){
                        delete val2.checkedNodes[i].children
                    }
                    this.data4.push(val2.checkedNodes[i])
                }
                // console.log(this.data2);
                this.$refs.treeone.setCheckedKeys([]);
                this.$refs.treeone.setCheckedNodes(this.data4)
                // this.data2 = this.filterArray(this.data2,'0')
            }
        },

        mounted() {
            //创建数据副本
            this.newTreeData = JSON.parse(JSON.stringify(treeData))

            //数据组织父子结构
            this.data = this.filterArray(treeData,'0')
            console.log(this.treeDefault);
        }
    }
</script>

<style>
  .app-container{
    /*border: 1px solid #cccccc;*/
    border-radius: 10px;width: 99%;
  }
  .half-tree{
    width: 48%;
    display: inline-block;
  }
  .tree-node{
    height: 300px
  }
  .tree-node .el-scrollbar__wrap {
    overflow-x: hidden;
  }
</style>

