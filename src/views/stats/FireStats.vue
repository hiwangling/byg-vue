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
      <el-table-column align="center" label="火化编号" prop="serial" />
      <el-table-column align="center" label="火化时间" prop="farewelltime" />
      <el-table-column align="center" label="逝者姓名" prop="o_name" />
      <el-table-column align="center" label="年龄" prop="o_age" />
      <el-table-column align="center" label="性别" prop="o_sex" />
      <el-table-column align="center" label="联系人" prop="o_linkman" />
      <el-table-column align="center" label="联系电话" prop="o_linkphone" />
    </el-table>
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />
  </div>
</template>
<script>
import { statisticsgather } from '@/api/stats'
import Pagination from '@/components/Pagination'
import { vuexData } from '@/utils/mixin'
export default {
  name: 'VueGarden',
  components: { Pagination },
  mixins: [vuexData],
  data() {
    return {
      list: null,
      total: 0,
      village: '',
      listLoading: true,
      downloadLoading: false,
      options: [],
      listQuery: {
        page: 1,
        limit: 20,
        startime: null,
        endtime: null,
        search_data: '',
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
      statisticsgather(this.listQuery)
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

    handleDownload() {
      this.downloadLoading = true
      this.listQuery.limit = this.total
      statisticsgather(this.listQuery)
        .then(res => {
          this.export_list = res.data.data
      import('@/vendor/Export2Excel').then(excel => {
        const filterVal = ['serial', 'farewelltime', 'o_name', 'o_age', 'o_sex', 'o_card', 'o_linkman', 'o_linkphone']
        const tHeader = ['火化编号', '火化时间', '逝者姓名', '年龄', '性别', '身份证', '联系人', '联系电话']
        const data = this.formatJson(filterVal, this.export_list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: '火化统计'
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
