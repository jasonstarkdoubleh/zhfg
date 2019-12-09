<template>
  <div>
    <Jtable
      :tableData="tableData"
      :columnData="columnData"
      :searchShow="true">

      <div class="flex bgc">
        <div>

          报告名称:
          <el-select v-model="warningType" style="margin-right: 20px">
            <el-option
              v-for="item in warningTypeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>

          报告状态:
          <el-select v-model="warningName">
            <el-option
              v-for="item in warningNameOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>

          调度模板:
          <el-select v-model="warningName">
            <el-option
              v-for="item in warningNameOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>

        <div>
          <el-button type="primary">查 询</el-button>
          <el-button @click="handleCreate">新 增</el-button>
        </div>
      </div>

    </Jtable>

    <el-dialog title="" :visible.sync="dialogFormVisible" fullscreen>
      <div style="display: flex">
        <div style="width: 30%;margin-right: 5%">
          <el-card>
            <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
          </el-card>
        </div>

        <div style="width: 60%">
          <el-card>
            <el-form :model="form">
              <el-form-item label="报告名称" :label-width="formLabelWidth">
                <el-input v-model="form.name" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="调度名称" :label-width="formLabelWidth">
                <el-select v-model="form.region" placeholder="请选择活动区域">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="备注" :label-width="formLabelWidth">
                <el-input type="textarea"></el-input>
              </el-form-item>
            </el-form>
          </el-card>
        </div>

      </div>
      <div style="display: flex;justify-content: center;margin-top: 30px">
        <div>
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">保 存</el-button>
        </div>
      </div>

    </el-dialog>
  </div>
</template>

<script>
    import manager from './index'
    export default manager
</script>

<style scoped>

</style>
