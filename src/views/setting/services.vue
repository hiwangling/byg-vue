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
      <el-select
        v-model="listQuery.type"
        placeholder="选择服务类型"
        clearable
        class="filter-item"
        style="width:185px"
      >
        <!-- {{ servicestype }} -->
        <el-option
          v-for="(item,value,index) in servicestype"
          :key="index"
          :label="item"
          :value="value + 1"
        />
      </el-select>
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
      :default-sort="{prop: 'iorder', order: 'ascending'}"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="编号" prop="iorder" width="80" />
      <el-table-column align="center" label="服务名称" prop="title" />
      <el-table-column align="center" label="服务类型" prop="type">
        <template slot-scope="scope">
          {{ scope.row.type | service_stype }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="服务价格" prop="price" />
      <el-table-column align="center" label="负责部门" prop="deptid">
        <template slot-scope="scope">
          {{ scope.row.deptid | branchs }}

        </template>
      </el-table-column>
      <el-table-column align="center" label="单位" prop="unit" />

      <el-table-column align="center" label="状态" prop="status" width="100">
        <template slot-scope="scope">
          <el-tag>{{ scope.row.status == 0 ? '禁用' : '可用' }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" class-name="small-padding" width="150">
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
        <el-form-item label="服务名称" prop="title">
          <el-input v-model="dataForm.title" />
        </el-form-item>
        <el-form-item label="单位" prop="unit">
          <el-select
            v-model="dataForm.unit"
            placeholder="选择单位"
            clearable
            class="filter-item"
            style="width:185px"
          >
            <el-option v-for="item in t" :key="item.id" :label="item.name" :value="item.name" />
          </el-select>
        </el-form-item>
        <el-form-item label="服务价格" prop="price">
          <el-input v-model="dataForm.price" />
        </el-form-item>
        <el-form-item label="关联部门" prop="deptid">
          <el-select
            v-model="dataForm.deptid"
            placeholder="选择部门"
            clearable
            class="filter-item"
            style="width:185px"
          >
            <el-option
              v-for="(item,index) in branch"
              :key="index"
              :label="item.vcname"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="服务类型" prop="type">
          <el-select
            v-model="dataForm.type"
            placeholder="选择类型"
            clearable
            class="filter-item"
            style="width:180px"
          >
            <el-option
              v-for="(item,value,index) in servicestype"
              :key="index"
              :label="item"
              :value="value + 1"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="状态" prop="status">
          <el-select
            v-model="dataForm.status"
            placeholder="选择状态"
            clearable
            class="filter-item"
            style="width:185px"
          >
            <el-option v-for="item in v" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>

        <el-form-item label="排序" prop="iorder">
          <el-input v-model="dataForm.iorder" />
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="dataForm.remark" type="textarea" :rows="2" />
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
import {
  listservices,
  createservices,
  updateservices,
  deleteservices
} from '@/api/setting'
import Pagination from '@/components/Pagination'
import { vuexData } from '@/utils/mixin'
import { deptlist } from '@/api/role'
var that
export default {
  name: 'VueGarden',
  components: { Pagination },
  filters: {
    branchs(status) {
      var obj = {}
      that.branch.forEach((item, index) => { obj[item.id] = item.vcname })
      console.log(obj[status])
      return obj[status]
    }
  },
  mixins: [vuexData],
  data() {
    return {
      branch: null,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        type: '',
        search_data: '',
        sort: 'add_time',
        order: 'desc'
      },
      v: [{ id: 0, name: '禁用' }, { id: 1, name: '可用' }],
      t: [
        { id: 0, name: '/小时' },
        { id: 1, name: '元/天' },
        { id: 2, name: '元/次' },
        { id: 3, name: '元/具' },
        { id: 4, name: '元/副' },
        { id: 5, name: '元/场' },
        { id: 6, name: '元/度' },
        { id: 7, name: '元/排' },
        { id: 8, name: '元/把' },
        { id: 9, name: '元/扎' },
        { id: 10, name: '元/朵' },
        { id: 11, name: '元/个' },
        { id: 12, name: '元/对' },
        { id: 13, name: '元/套' },
        { id: 14, name: '元/袋' },
        { id: 15, name: '元/条' },
        { id: 16, name: '元/双' },
        { id: 17, name: '元/盏(场)' },
        { id: 18, name: '元/提' },
        { id: 19, name: '面议' }
      ],
      dataForm: {
        title: '',
        price: '',
        unit: '',
        remark: '',

        status: '',
        deptid: '',
        type: '',

        iorder: ''
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '创建'
      },
      rules: {
        title: [
          { required: true, message: '服务名称不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
  },
  beforeCreate: function() {
    that = this
  },
  created() {
    this.getList()
    // this.servicestype = this.servicestype.filter((v, k) => {
    //   return k != 5
    // })
    deptlist()
      .then(res => {
        this.branch = res.data.data
      })
  },
  methods: {
    getList() {
      this.listLoading = true
      listservices(this.listQuery)
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
        title: '',
        price: 0.0,
        unit: '',
        remark: '',
        status: 1,
        deptid: '',
        type: '',
        iorder: 0
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
      // delete this.dataForm.branch_name
      delete this.dataForm.type_name
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          createservices(this.dataForm)
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
      // delete this.dataForm.branch_name
      delete this.dataForm.type_name
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          updateservices(this.dataForm)
            .then(() => {
              this.getList()
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
        deleteservices(row)
          .then(res => {
            const index = this.list.indexOf(row)
            this.list.splice(index, 1)
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>
