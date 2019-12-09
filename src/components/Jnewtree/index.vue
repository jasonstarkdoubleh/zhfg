<template>
  <div>
    <div class="exam_structure" style="margin-bottom: 10px">
      <el-button type="primary" size="mini" class="add_new_question" @click="add_new_question"><i class="el-icon-plus"></i>添加一级菜单</el-button>
    </div>

    <div class="question_info_lists">
      <el-tree ref="tree"
               :key="tree_key"
               :data="treeData"
               node-key="id"
               :render-content="renderContent"
               :expand-on-click-node="false"
               :default-expanded-keys="defaultExpand"
               :filter-node-method="filterNode"
               @check="getCheckedNodes">
      </el-tree>

      <el-dialog :title="nodeName" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="节点名称" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogForm">确 定</el-button>
        </div>
      </el-dialog>

      <el-dialog title="增加根节点" :visible.sync="add_question_flag">
        <el-form :model="form">
          <el-form-item label="根节点名称" :label-width="formLabelWidth">
            <el-input v-model="new_question_name"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button class="btn_cancel" @click.stop="add_question_cancel">取消</el-button>
          <el-button class="btn_sure" @click.stop="add_question_sure" type="primary">确定</el-button>
        </div>
      </el-dialog>

    </div>
  </div>
</template>

<script>
    import { saveDataInfoType,updateDataInfoType,deleteOneDataInfoType} from '@/api/table'
    import { rolePerm } from '@/api/role'
    export default {
        data() {
            return {
                filterText: '',
                treeData: [{
                    id: 1,
                    label: '一级 1',
                    isEdit: false,
                    children: []
                }],
                add_question_flag: false,
                new_question_name: '',
                tree_key: 0,
                defaultExpand: [],
                dialogFormVisible:false,
                form: { name: '' },
                formLabelWidth: '120px',
                goA:'',
                goB:'',
                goC:'',
                typeId:'',
                nodeName:""
            }
        },
        watch: {
            filterText(val) {
                this.$refs.tree.filter(val);
            }
        },
        methods: {
            //勾选节点触发错误
            getCheckedNodes(a,b){
                // this.typeId = a
                if(b.checkedKeys.length > 0){
                    this.$refs.tree.setCheckedKeys([a.id]);
                    this.$emit("click",a.id)
                }
            },

            //树形结构分类
            filterArray(data, parent) {
                let treeNode = [];
                let temp;
                for (let i = 0; i < data.length; i++) {
                    if (data[i].parentId === parent) {
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

            //获取分类列表
            getDataInfoTypeImpl(){
                rolePerm().then(res => {
                    for(let i in res.data) {
                        res.data[i].id = res.data[i].menu_id
                        res.data[i].parentId = res.data[i].pare_menu_id
                        res.data[i].label = res.data[i].menu_name
                    }
                    this.treeData = this.filterArray(res.data,0)
                    console.log(this.treeData)
                })
            },

            filterNode(value, data) {
                if (!value) return true;
                return data.name.indexOf(value) !== -1;
            },

            // 添加新大题
            add_new_question() {
                this.add_question_flag = true
            },

            //确定添加
            add_question_sure() {
                saveDataInfoType({createUserId :this.$store.getters.userId,name:this.new_question_name}).then(res =>{
                    let dataCode = res.data.code;
                    let data = JSON.parse(res.data.datas);
                    if(dataCode === 0){
                        this.$message({
                            type:"success",
                            message:"节点添加成功"
                        });
                        const nodeObj = {id: data.id, name: data.name, isEdit: false, children: []};
                        this.treeData.push(nodeObj);
                        this.add_question_flag = false
                    }else {
                        this.$message({
                            type:"error",
                            message:"节点添加失败"
                        })
                    }
                })
            },

            //取消添加
            add_question_cancel() {
                this.add_question_flag = false
                this.new_question_name = ''
            },

            dialogForm(){
                if(this.nodeName === "增加节点"){
                    saveDataInfoType({name:this.form.name,parentId:this.goC.id}).then(res =>{
                        let dataCode = res.data.code;
                        let datalist = JSON.parse(res.data.datas)
                        if(dataCode === 0){
                            this.$message({
                                type:"success",
                                message:"节点添加成功"
                            })
                            this.appendB(this.goA,this.goB,this.goC,datalist)
                        }else {
                            this.$message({
                                type:"error",
                                message:"节点添加失败"
                            })
                        }
                    })
                }else if(this.nodeName === "修改节点"){
                    this.dialogFormVisible = false
                    updateDataInfoType({name:this.form.name,id:this.goC.id}).then(res =>{
                        let dataCode = res.data.code;
                        if(dataCode === 0){
                            this.$message({
                                type:"success",
                                message:"节点修改成功"
                            })
                            this.nodeEditB(this.goA,this.goB,this.goC)
                        }else {
                            this.$message({
                                type:"error",
                                message:"节点修改失败"
                            })
                        }
                    })
                }
            },

            //增加
            append(store, node, data) {
                this.nodeName = "增加节点"
                this.dialogFormVisible = true
                this.goA = store;
                this.goB = node;
                this.goC = data;
            },

            //确定添加节点
            appendB(store, node, data,dataList) {
                //新增数据
                const nodeapp = {id: dataList.id, name: dataList.name, isEdit: false, children: [],parentId: dataList.parentId}
                data.children.push(nodeapp)
                if (!node.expanded) {
                    node.expanded = true
                }
                const parent = node.parent
                const children =  parent.data.children || parent.data
                const cIndex = children.findIndex(d => d.id === data.id)
                const tempChildrenNodex2 = children[cIndex]  //拿到被添加的上一级
                this.dialogFormVisible = false
                this.goA = '';
                this.goB = '';
                this.goC = '';
                this.form.name = ''
            },

            //确定修改节点
            nodeEditB(ev,store,data){
                data.name = this.form.name
                this.goA = '';
                this.goB = '';
                this.goC = '';
                this.form.name = ''
            },

            // 修改节点
            nodeEdit(ev, store, data) {
                this.form.name = data.name
                this.nodeName = "修改节点"
                this.dialogFormVisible = true
                this.goA = ev;
                this.goB = store;
                this.goC = data;
                this.$nextTick(() => {
                    const $input = ev.target.parentNode.parentNode.querySelector('input') || ev.target.parentElement.parentElement.querySelector('input')
                    !$input ? '' : $input.focus()
                })
            },

            // 确认修改
            edit_sure(ev, data) {
                const $input = ev.target.parentNode.parentNode.querySelector('input') || ev.target.parentElement.parentElement.querySelector('input')
                if (!$input) {
                    return false
                } else {
                    data.name = $input.value
                    data.isEdit = false
                }
            },

            // 节点删除
            nodeDelete(node, data) {
                if(node.childNodes.length === 0){
                    this.$confirm('此操作将删除该节点, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        deleteOneDataInfoType ({id :data.id }).then(res =>{
                            if(res.data.code === 0){
                                this.$message({
                                    type:"success",
                                    message:"删除成功"
                                })
                                const parent = node.parent
                                const children = parent.data.children || parent.data
                                const index = children.findIndex(d => d.id === data.id)
                                children.splice(index, 1)
                            }else {
                                this.$message({
                                    type:"error",
                                    message:"删除失败"
                                })
                            }
                        })
                    })
                }else {
                    this.$message({
                        message: "请先删除子节点",
                        type: 'error',
                        duration: 3 * 1000
                    })
                }
            },

            // 节点上移
            nodeUp(node, data) {
                const parent = node.parent
                const children = parent.data.children || parent.data
                const cIndex = children.findIndex(d => d.id === data.id)
                if (parent.level === 0 && cIndex === 0) {
                    return
                } else if (parent.level !== 0 && cIndex === 0) { //不同父节点中移动
                    alert('不同父节点中移动')
                } else if ((parent.level === 0 && cIndex !== 0) || (parent.level !== 0 && cIndex !== 0)) {
                    const tempChildrenNodex1 = children[cIndex - 1]
                    const tempChildrenNodex2 = children[cIndex]
                    this.$set(children, cIndex - 1, tempChildrenNodex2)
                    this.$set(children, cIndex, tempChildrenNodex1)
                    this.defaultExpand[0] = data.id
                }
                this.tree_key++
            },

            // 节点下移
            nodeDown(store, node, data) {
                const parent = node.parent
                const children = parent.data.children || parent.data
                const cIndex = children.findIndex(d => d.id === data.id)
                const cLength = children.length - 1 // 最边上的节点
                const allLevel = store.data.length - 1 // 树的深度
                if (parent.level === allLevel && cIndex === cLength) { // 最最末的节点
                    return
                } else if (parent.level !== allLevel && cIndex === cLength) { //父节点不同
                    alert('不能移动')
                } else if ((parent.level === allLevel && cIndex !== cLength) || (parent.level !== allLevel && cIndex !== cLength)) { // 父节点相同
                    const tempChildrenNodex1 = children[cIndex + 1]
                    const tempChildrenNodex2 = children[cIndex]
                    this.$set(children, cIndex + 1, tempChildrenNodex2)
                    this.$set(children, cIndex, tempChildrenNodex1)
                    this.defaultExpand[0] = data.id
                }
                this.tree_key++
            },

            // 修改
            showOrEdit(data) {
                if (data.isEdit) {
                    return <input type="text" value={data.label} on-blur={ev => this.edit_sure(ev, data)}/>
                } else {
                    return <span className="node_labe">{data.label}</span>
                }
            },

            // 结构树操作
            renderContent(h, {node, data, store}) {
                return (
                    <span>
                        <span class="el-icon-document">
                            {this.showOrEdit(data)}
                        </span>
                        <div class="tree_node_op" style="float: right">
                            <i class="el-icon-edit" on-click={(ev) => this.nodeEdit(ev, store, data)}></i>
                            <i class="el-icon-delete" on-click={() => this.nodeDelete(node, data)}></i>
                            <i class="el-icon-upload2" on-click={() => this.nodeUp(node, data)}></i>
                            <i class="el-icon-download" on-click={() => this.nodeDown(store, node, data)}></i>
                            <i class="el-icon-plus" on-click={() => this.append(store, node, data)}></i>
                        </div>
                    </span>
                )
            }
        },
        created() {
            this.getDataInfoTypeImpl()
        },
    }
</script>

<style scoped>

</style>
