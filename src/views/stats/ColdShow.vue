<template>
  <div class="app-container">
    <div>
      <div style="height:40px;color: #666;">
        <span class="sell inlins" />   空闲
        <span class="sold inlins" />   使用中
      </div>
      <el-row :gutter="20">
        <el-col v-for="(item,value) in list" :key="value" :xs="3" :sm="3" :md="3" :lg="2" :class="item.state == 1 ? 'check sold':'check sell'">
          <div style="height:100%;">
            <p>{{ item.title }}</p>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import { cold_list } from '@/api/stats'
export default {
  name: 'VueGarden',
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
      cold_list(this.listQuery)
        .then(res => {
          this.list = res.data
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
    }

  }
}
</script>
<style>
.check{
    margin: 5px;
    padding: 0px;
    font-size: 16px;
    text-align: center;
    line-height: 80px;
    height: 80px;
    border-radius: 5px;
}
.check p {
   margin: 0;
   padding: 0;
   font-size: 26px;
}
.inlins{
  display: inline-block;
  width: 50px;
  height: 20px;
  position: relative;
    top: 4px;

}
.sell{
      background-color: #42b983!important;
    border-color: #42b983!important;
}
.sold {
    background-color: #b9394c!important;
    border-color: #b9394c!important;
}

</style>
