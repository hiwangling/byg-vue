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
      <el-input
        v-model="listQuery.driver"
        clearable
        class="filter-item"
        style="width: 200px;"
        placeholder="请输入司机"
      />
      <el-date-picker
        v-model="listQuery.startime"
        style="width: 200px"
        class="filter-item"
        type="date"
        value-format="yyyy-MM-dd"
        placeholder="开始时间"
      />
      <el-date-picker
        v-model="listQuery.endtime"
        style="width: 200px"
        class="filter-item"
        type="date"
        value-format="yyyy-MM-dd"
        placeholder="结束时间"
      />
      <el-button
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="handleFilter"
      >查找</el-button>
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
      <el-table-column align="center" label="出车时间" prop="outtime" />
      <el-table-column align="center" label="出车类型" prop="recetype" width="100">
        <template slot-scope="scope">
          <el-tag :type="scope.row.recetype | carFilter"> {{ scope.row.recetype | recetype_list }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="逝者姓名" prop="name" />
      <el-table-column align="center" label="地址" prop="address" />
      <el-table-column align="center" label="操作" class-name="small-padding" width="100">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            @click="handleInfo(scope.row)"
          >详情</el-button>
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
    <el-dialog :close-on-click-modal="false" title="查看" :visible.sync="dialogFormVisible">
      <div class="temp-content">
        <h1>逝者信息</h1>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="grid-content">
              <p><span> 逝者姓名 : </span>{{ dataForm.name }}</p>
              <p><span> 出车时间 : </span>{{ dataForm.outtime }}</p>
              <p><span> 接运地址 : </span>{{ dataForm.address }}</p>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content">
              <p><span> 联系人 : </span>{{ dataForm.linkman }}</p>
              <p><span> 接运类型 : </span>{{ dataForm.recetype | recetype_list }}</p>
              <p><span> 司机 : </span>{{ dataForm.username }}</p>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content">
              <p><span> 联系电话 : </span>{{ dataForm.linkphone }}</p>
              <p><span> 接运价格 : </span>{{ dataForm.totalprice }}</p>
              <p><span> 操作人 : </span>{{ dataForm.operator }}</p>
            </div>
          </el-col>
        </el-row>
      </div>
      <div v-if="server ? server.length > 0 : false" class="temp-content temp-content-server">
        <h1>所选服务</h1>
        <el-row :gutter="20">
          <div v-for="(item,index) in server" :key="index">
            <el-col :span="8">
              <div class="grid-content">
                <p><span> 服务名称 : </span>{{ item.title }}</p>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content">
                <p><span> 数量 : </span>{{ item.number }}</p>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content">
                <p><span> 合计 : </span>{{ item.totalprice }}</p>
              </div>
            </el-col>
          </div>
        </el-row>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
      </div>
    </el-dialog>

  </div>
</template>
<script>
import { statscarsend } from '@/api/stats'
import { vuexData } from '@/utils/mixin'
import { editinfoService } from '@/api/manage'
import Pagination from '@/components/Pagination'
export default {
  name: 'VueGarden',
  components: { Pagination },
  mixins: [vuexData],
  data() {
    return {
      list: null,
      total: 0,
      listLoading: true,
      server: null,
      dialogFormVisible: false,
      dataForm: {
        name: '',
        linkman: '',
        sex: '',
        linkphone: '',
        operator: ''
      },
      listQuery: {
        page: 1,
        limit: 20,
        search_data: '',
        driver: '',
        startime: null,
        endtime: null,
        sort: 'add_time',
        order: 'desc'
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
      statscarsend(this.listQuery)
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
    solo(arr) {
      var editRow = []
      arr.forEach((v, k) => {
        editRow.push(v.services)
      })
      return [].concat.apply([], editRow)
    },
    handleInfo(row) {
      this.dataForm = Object.assign({}, row)
      const data = { oid: row.oid, id: row.id, type: 2 }
      editinfoService(data).then(res => {
        this.server = this.solo(res.data.services)
        this.dialogStatus = 'update'
        this.dialogFormVisible = true
      })
    }

  }
}
</script>
