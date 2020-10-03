<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.search_data"
        clearable
        class="filter-item"
        style="width: 200px;"
        placeholder="请输入逝者姓名"
      />
      <el-input
        v-model="listQuery.title"
        clearable
        class="filter-item"
        style="width: 200px;"
        placeholder="请输入服务名称"
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
      <el-select
        v-model="listQuery.servicestype"
        placeholder="选择类型"
        clearable
        class="filter-item"
        style="width:120px"
      >
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
    >
      <el-table-column align="center" label="服务名称" prop="title" />
      <el-table-column align="center" label="服务单价" prop="price" />
      <el-table-column align="center" label="服务数量" prop="count_id" />
      <el-table-column align="center" label="服务总价" prop="sum_price" />
      <el-table-column align="center" label="操作" class-name="small-padding" width="180">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" icon="el-icon-search" @click="handleInfo(scope.row)">详情</el-button>
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
    <el-dialog :close-on-click-modal="false" title="服务明细" :visible.sync="dialogFormserver">
      <el-table
        v-loading="listLoadingserver"
        :data="server"
        element-loading-text="正在查询中。。。"
        border
        fit
        highlight-current-row
      >
        <el-table-column align="center" label="服务名称" prop="title" />
        <el-table-column align="center" label="服务单价" prop="price" />
        <el-table-column align="center" label="服务数量" prop="count_id" />
        <el-table-column align="center" label="服务总价" prop="sum_price" />
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button :loading="downloadLoadings" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownloads">
          导出
        </el-button>
        <el-button @click="dialogFormserver = false">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { statservices, statsservicesInfo } from '@/api/stats'
import Pagination from '@/components/Pagination'
import { vuexData } from '@/utils/mixin'
export default {
  name: 'VueGarden',
  components: { Pagination },
  mixins: [vuexData],
  data() {
    return {
      list: null,
      server: null,

      total: 0,
      export_lists: null,
      export_list: null,
      listLoading: true,
      downloadLoadings: false,
      dialogFormserver: false,
      downloadLoading: false,
      listLoadingserver: false,
      listQuery: {
        page: 1,
        limit: 20,
        startime: null,
        endtime: null,
        servicestype: '',
        search_data: '',
        title: '',
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
      statservices(this.listQuery)
        .then(res => {
          this.list = res.data
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
    handleInfo(row) {
      const data = {
        title: row.title,
        startime: this.listQuery.startime,
        endtime: this.listQuery.endtime
      }
      this.listLoadingserver = true
      statsservicesInfo(data).then(res => {
        this.server = res.data
        this.dialogFormserver = true
        this.listLoadingserver = false
      })
    },
    changeSell(sell) {
      let sum_price = 0
      let sum_number = 0
      if (sell) {
        sell.forEach((v, k) => {
          sum_price = sum_price + parseInt(v.sum_price)
          sum_number = sum_number + parseInt(v.count_id)
        })
      }
      this.server.push(
        {
          title: '总计',
          count_id: sum_number,
          sum_price: sum_price,
          s_type: ''
        }
      )
    },

    handleDownloads() {
      this.changeSell(this.server)
      this.export_lists = this.server
      import('@/vendor/Export2Excel').then(excel => {
        const filterVal = ['title', 'count_id', 'sum_price', 's_type']
        const tHeader = ['服务名称', '数量', '总价', '服务类型']
        const data = this.formatJson(filterVal, this.export_lists)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: '服务详情单'
        })
      })
    },
    handleDownload() {
      this.downloadLoading = true
      statservices(this.listQuery)
        .then(res => {
          this.export_list = res.data
      import('@/vendor/Export2Excel').then(excel => {
        const filterVal = ['title', 'count_id', 'sum_price', 's_type']
        const tHeader = ['服务名称', '数量', '总价', '服务类型']
        const data = this.formatJson(filterVal, this.export_list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: '服务单'
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
