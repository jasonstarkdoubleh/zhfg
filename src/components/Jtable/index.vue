<template>
  <div>
    <el-card>
      <slot></slot>

      <!--    loading-->
      <!--    <div v-show="loading"-->
      <!--         style="margin-top: 10px;height: 200px;z-index: 100;width: 100%"-->
      <!--         v-loading="loading" element-loading-text="拼命加载中"-->
      <!--         element-loading-spinner="el-icon-loading">-->
      <!--    </div>-->

      <!--    表格-->
      <div style="margin-top: 14px" v-loading="loading">
        <el-table
          :data="tableData"
          border
          stripe
          highlight-current-row>

          <!--        索引-->
          <el-table-column
            v-if="index"
            type="index"
            width="50">
          </el-table-column>

          <!--        多选-->
          <el-table-column
            v-if="selection"
            type="selection"
            width="50">
          </el-table-column>

          <!--      表头渲染-->
          <el-table-column
            v-for="(value, key) in columnData"
            :key="key"
            :prop="key"
            :label="value"
            show-overflow-tooltip
            :width="tableWidth">
          </el-table-column>

          <!--      状态-->
          <el-table-column
            v-if="statusShow"
            prop="status"
            :width="tableWidth"
            label="状态">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row['status']"
                disabled
                active-color="#13ce66"
                inactive-color="#ff4949">
              </el-switch>
            </template>
          </el-table-column>

          <!--      查看详情-->
          <el-table-column
            v-if="searchShow"
            prop="status"
            :width="tableWidth"
            label="查看详情">
            <template slot-scope="scope">
              <el-button type="primary" plain icon="el-icon-search" circle size="mini" @click="handleDetail" ></el-button>
            </template>
          </el-table-column>

          <!--      删除-->
          <el-table-column
            v-if="deleteShow"
            prop="delete"
            :width="tableWidth"
            label="删除">
            <template slot-scope="scope">
              <el-button type="danger" plain icon="el-icon-delete" circle size="mini" @click="hanleDelete(scope.row)"></el-button>
            </template>
          </el-table-column>

          <!--      下载-->
          <el-table-column
            v-if="downloadShow"
            prop="download"
            :width="tableWidth"
            label="下载">
            <template slot-scope="scope">
              <el-button type="success" icon="el-icon-download" circle size="mini" plain></el-button>
            </template>
          </el-table-column>

          <!--      配置-->
          <el-table-column
            v-if="configShow"
            prop="config"
            :width="tableWidth"
            label="配置">
            <template slot-scope="scope">
              <el-button type="warning" plain icon="el-icon-edit" circle size="mini" @click="handleConfig"></el-button>
            </template>
          </el-table-column>

          <!--      预警-->
          <el-table-column
            v-if="warningShow"
            prop="warning"
            :width="tableWidth"
            label="预警">
            <template slot-scope="scope">
              <el-link type="danger">警告链接</el-link>
            </template>
          </el-table-column>

        </el-table>

        <!--    分页-->
        <div style="display: flex;justify-content: flex-end;margin-top: 14px">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[100, 200, 300, 400]"
            :page-size="100"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
          </el-pagination>
        </div>
      </div>
    </el-card>


  </div>
</template>

<script>
    export default {
        data() {
            return {
                currentPage: 1,                    //当前页
            }
        },
        props:{
            //下载显示
            downloadShow:{
                type: Boolean,
                default: false,
            },
            //模型管理显示
            modelconfig:{
                type: Boolean,
                default: false,
            },
            //指数显示
            predictionconfig:{
                type: Boolean,
                default: false,
            },
            //表头
            columnData:{
                type: Object,
                default: () => {},
            },
            //表格数据
            tableData:{
                type: Array,
                default: () => {
                    return []
                }
            },
            //列宽
            tableWidth:{
                type: String,
                default: '0'
            },
            //总页数
            total:{
                type: Number,
                default: 0
            },
            //加载
            loading:{
                type: Boolean,
                default: false
            },
            // 查看
            searchShow:{
                type: Boolean,
                default: false
            },
            // 状态
            statusShow:{
                type: Boolean,
                default: false
            },
            // 删除显示
            deleteShow:{
                type: Boolean,
                default: false
            },
            // 索引
            index:{
                type: Boolean,
                default: false
            },
            // 多选
            selection:{
                type: Boolean,
                default: false
            },
            // 配置
            configShow:{
                type: Boolean,
                default: false
            },
            // 预警
            warningShow:{
                type: Boolean,
                default: false
            },
        },
        methods: {
            hanleDelete(row){
                this.$emit('on-delete',row)                     //删除
            },
            handleConfig(){                                     //查看配置
                this.$emit('on-config',true)
            },
            handleDetail(){                                     //详情查看
                this.$emit('on-detail',true)
            },
            handleSizeChange(val) {                             //pageSize 改变时会触发
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {                          //currentPage 改变时会触发
                console.log(`当前页: ${val}`);
            },
        },
        watch: {
            columnData(val){
                if(Object.keys(val).length < 8){
                    this.tableWidth = '0'
                }
            }
        }

    }
</script>

<style lang="scss">

</style>
