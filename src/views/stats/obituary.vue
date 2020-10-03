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
      <el-date-picker
        v-model="listQuery.startime"
        style="width: 200px"
        class="filter-item"
        type="datetime"
        value-format="yyyy-MM-dd HH:mm:ss"
        placeholder="开始时间"
      />
      <el-date-picker
        v-model="listQuery.endtime"
        style="width: 200px"
        class="filter-item"
        type="datetime"
        value-format="yyyy-MM-dd HH:mm:ss"
        placeholder="结束时间"
      />

      <el-button
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="handleFilter"
      >查找</el-button>
      <el-button :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">
        导出
      </el-button>
    </div>

    <!-- 查询结果 -->
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="正在查询中。。。"
      border
      fit
      highlight-current-row
      @sort-change="changeTableSort"
    >
      <el-table-column align="center" label="火化编号" prop="c_serial" :sortable="'custom'" />
      <el-table-column align="center" label="火化时间" prop="farewelltime" :sortable="'custom'" />
      <el-table-column align="center" label="逝者姓名" prop="name" />
      <el-table-column align="center" label="年龄" prop="age" />
      <el-table-column align="center" label="死因" prop="reason" />
      <el-table-column align="center" label="死亡日期" prop="dietime" />
      <el-table-column align="center" label="身份证" prop="card" />
      <el-table-column align="center" label="地址" prop="registered" />
      <el-table-column align="center" label="总价" prop="r_totalprice" />
      <el-table-column align="center" label="支付时间" prop="r_create_time" />
      <el-table-column align="center" label="操作" class-name="small-padding" width="100">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" icon="el-icon-search" @click="handleInfo(scope.row)">详情</el-button>
          <!-- <el-button v-permission="['post /api/v1/obituary/state']" type="primary" size="mini" icon="el-icon-edit" @click="handleEnd(scope.row)">撤销</el-button> -->
          <!-- <el-button type="primary" size="mini" @click="handleServer(scope.row)">服务</el-button> -->
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
    <ServerInfo ref="info" />
  </div>
</template>
<script>
import {
  createcarcommon
} from '@/api/manage'
import Pagination from '@/components/Pagination'
import ServerInfo from '@/components/ServerInfo'
import { statsobituary, excelobituary } from '@/api/stats'
import { vuexData } from '@/utils/mixin'
export default {
  name: 'VueGarden',
  components: { Pagination, ServerInfo },
  mixins: [vuexData],
  data() {
    return {
      list: null,
      downloadLoading: false,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        startime: null,
        ordername: '',
        order: '',
        endtime: null,
        search_data: '',
        sort: 'add_time'
      },
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '创建'
      },
      rules: {

      }
    }
  },
  computed: {},
  created() {
    this.getList()
    createcarcommon().then(res => {
      this.recetype = res.data.recetype
      this.car = res.data.car
    })
  },
  methods: {
    getList() {
      this.listLoading = true
      statsobituary(this.listQuery)
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

    changeTableSort(column) {
      var sortingType = column.order
      var fieldName = column.prop
      if (fieldName == 'c_serial') {
        if (sortingType == 'descending') {
          this.listQuery.order = 'desc'
          this.getList()
        } else {
          this.listQuery.order = 'asc'
        }
        this.listQuery.ordername = 'serial'
        this.getList()
      } else {
        if (sortingType == 'descending') {
          this.listQuery.order = 'desc'
          this.getList()
        } else {
          this.listQuery.order = 'asc'
        }
        this.listQuery.ordername = 'farewelltime'
        this.getList()
      }
    },
    handleInfo(v) {
      this.$refs.info.handleInfo(v)
    },
    handleDownload() {
      this.downloadLoading = true
      excelobituary(this.listQuery)
        .then(res => {
          this.export_list = res.data
      import('@/vendor/Export2Excel').then(excel => {
        const filterVal = ['farewelltime', 'card', 'name', 'sex', 'nation', 'registered', 'dietime', 'linkman', 'linkphone']
        const tHeader = ['火化时间', '身份证号码', '姓名', '性别', '民族', '住址', '死亡时间', '联系人', '联系电话']
        const data = this.formatJson(filterVal, this.export_list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: '完结业务统计'
        })
        this.downloadLoading = false
      })
        })
    },
    formatJson(filterVal, jsonData) {
      console.log(jsonData)
      return jsonData.map(v => filterVal.map(j => {
        return v[j]
      }))
    }

  }
}
</script>

