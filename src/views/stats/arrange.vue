<template>
  <div class="app-container">
    <div>
      <div style="height:40px;color: #666;">
        <span class="sell inlins" />   空闲
        <span class="sold inlins" />   使用中
      </div>

      <div v-for="(item,value) in list" :key="value" :class="item.state == 1 ? 'checks sold':'checks sell'">
        <div style="height:100%;">
          <h3 style="font-weight: 800;">{{ item.title }}</h3>
          <p>逝者姓名: {{ item.hall_name }}</p>
          <p>逝者性别: {{ item.hall_sex }}</p>
          <p>逝者年龄: {{ item.hall_age }}</p>
          <p>进厅时间: {{ item.hall_startime }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mournarrange } from '@/api/stats'
export default {
  name: 'Mournarrange',
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
      mournarrange(this.listQuery)
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
.checks{
    margin: 5px;
    padding: 0px;
    width: 24%;
    padding-left: 10px;
    float: left;
    font-size: 16px;
    text-align: center;
    /* line-height: 150px; */
    height: 215px;
    border-radius: 5px;
}
.checks p,.checks h3 {
   margin: 0;
   padding: 0;
     margin:6px 0;
    line-height: 30px;
   font-size: 18px;
}
.checks p{
  text-align: left;
}
.checks h3{
  margin:10px 0;
  font-size: 24px;
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
