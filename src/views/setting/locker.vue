<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.search_data"
        clearable
        class="filter-item"
        style="width: 200px;"
        placeholder="请输入关键字"
      />
      <el-button
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="handleFilter"
      >查找</el-button>
      <el-button
        class="filter-item"
        type="primary"
        icon="el-icon-edit"
        @click="handleCreate"
      >添加</el-button>
    </div>

    <!-- 查询结果 -->
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="正在查询中。。。"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="编号" prop="title" />
      <el-table-column align="center" label="室" prop="room" />
      <el-table-column align="center" label="柜" prop="chest" />
      <el-table-column align="center" label="排" prop="ix" />
      <el-table-column align="center" label="号" prop="iy" />
      <el-table-column align="center" label="到期日期" prop="endday" />
      <el-table-column align="center" label="描述" prop="vcdesc" />
      <el-table-column align="center" label="状态" prop="usestate" width="100">
        <template slot-scope="scope">
          <el-tag :type="scope.row.usestate == 1 ? '' : 'danger'">{{ scope.row.usestate == 1 ? '空闲' : '使用中' }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" class-name="small-padding fixed-width" width="160">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            @click="handleUpdate(scope.row)"
          >编辑</el-button>
          <el-button
            type="danger"
            size="mini"
            @click="handleDelete(scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />

    <!-- 添加或修改对话框 -->
    <el-dialog :close-on-click-modal="false" :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form
        ref="dataForm"
        :rules="rules"
        :inline="true"
        :model="dataForm"
        status-icon
        label-position="left"
        label-width="100px"
      >
        <el-form-item label="编号" prop="title">
          <el-input v-model="dataForm.title" />
        </el-form-item>
        <el-form-item label="室" prop="room">
          <el-input v-model="dataForm.room" />
        </el-form-item>

        <el-form-item label="柜" prop="chest">
          <el-input v-model="dataForm.chest" />
        </el-form-item>
        <el-form-item label="排" prop="ix">
          <el-input v-model="dataForm.ix" />
        </el-form-item>
        <el-form-item label="号" prop="iy">
          <el-input v-model="dataForm.iy" />
        </el-form-item>
        <el-form-item label="状态" prop="usestate">
          <el-select
            v-model="dataForm.usestate"
            placeholder="选择单位"
            clearable
            class="filter-item"
            style="width:185px"
          >
            <el-option label="空闲" :value="1" />
            <el-option label="使用" :value="2" />
          </el-select>
        </el-form-item>
        <el-form-item label="到期时间" prop="endday">
          <el-date-picker
            v-model="dataForm.endday"
            style="width: 180px"
            class="filter-item"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="到期时间"
          />
        </el-form-item>
        <el-form-item label="描述" prop="vcdesc">
          <el-input v-model="dataForm.vcdesc" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="createData">确定</el-button>
        <el-button v-else type="primary" @click="updateData">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { lockerlist, lockeradd, lockeredit, lockerdel } from '@/api/setting'
import Pagination from '@/components/Pagination'
export default {
  name: 'VueGarden',
  components: { Pagination },
  data() {
    return {
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        search_data: '',
        sort: 'add_time',
        order: 'desc'
      },

      dataForm: {
        id: '',
        title: '',
        room: '',
        chest: '',
        ix: '',
        iy: '',
        oid: '',
        usestate: '',
        endday: null,
        vcdesc: ''

      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '创建'
      },
      rules: {
        type_name: [
          { required: true, message: '名称不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {},
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      lockerlist(this.listQuery)
        .then(res => {
          this.list = res.data.data
          this.total = res.data.total || 0
          this.listLoading = false
        })
        .catch(() => {
          this.list = []
          this.total = 0
          this.listLoading = false
        })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    resetForm() {
      this.dataForm = {
        id: '',
        title: '',
        room: '',
        chest: '',
        ix: '',
        iy: '',
        oid: '',
        usestate: 1,
        endday: null,
        vcdesc: ''
      }
    },
    handleCreate() {
      this.resetForm()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          lockeradd(this.dataForm)
            .then(res => {
              this.getList()
              this.dialogFormVisible = false
              this.$notify.success({
                title: '成功',
                message: '添加成功'
              })
            })
            .catch(res => {
              this.$notify.error({
                title: '失败',
                message: res.msg
              })
            })
        }
      })
    },
    handleUpdate(row) {
      this.dataForm = Object.assign({}, row)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          lockeredit(this.dataForm)
            .then(() => {
              for (const v of this.list) {
                if (v.id === this.dataForm.id) {
                  const index = this.list.indexOf(v)
                  this.list.splice(index, 1, this.dataForm)
                  break
                }
              }
              this.dialogFormVisible = false
              this.$notify.success({
                title: '成功',
                message: '更新成功'
              })
            })
            .catch(res => {
              this.$notify.error({
                title: '失败',
                message: res.msg
              })
            })
        }
      })
    },
    handleDelete(row) {
      this.$confirm('您确认删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        lockerdel(row)
          .then(res => {
            const index = this.list.indexOf(row)
            this.list.splice(index, 1)
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            })
          })
      })
        .catch(res => {
          this.$notify.error({
            title: '失败',
            message: res.msg
          })
        })
    }
  }
}
</script>
