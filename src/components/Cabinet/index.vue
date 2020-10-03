
<template>
  <div class="deit">
    <div class="cantainer">
      <el-dialog title="列表" append-to-body :visible.sync="dialogFormVisible">
        <el-table
          style="width: 100%;margin-bottom:20px"
          :data="userList.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        >
          <el-table-column label="姓名" prop="name" />
          <el-table-column label="次" prop="amount" />
          <el-table-column label="总价" prop="totalprice" />
        </el-table>
        <el-pagination
          :current-page="currentPage"
          background
          :page-sizes="[1]"
          :page-size="pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="userList.length"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="print(1)">打印</el-button>
          <el-button type="primary" @click="print(2)">收据</el-button>
        </div>
      </el-dialog>
    </div>
    <print v-show="false" ref="print_" />
    <save v-show="false" ref="save_" />
    <!-- <el-dialog title="列表" append-to-body :visible.sync="dialogFormVisibles">
      <div style="height:300px">
        <print ref="print_" />
      </div>
    </el-dialog> -->
  </div>
</template>
<script>
import { printList } from '@/api/stats'
import print from '@/components/Cabinet/print'
import save from '@/components/Print/save'
export default {
  components: { print, save },
  data() {
    return {
      currentPage: 1, // 初始页
      pagesize: 1, //    每页的数据
      userList: [],
      dialogFormVisible: false,
      dialogFormVisibles: false,
      tick: [],
      list: null
    }
  },
  created() {
    // this.handleUserList()
  },
  methods: {
    // 初始页currentPage、初始每页数据数pagesize和数据data
    handleSizeChange: function(size) {
      this.pagesize = size
    },
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage
      // console.log(this.userList.slice((this.currentPage - 1) * this.pagesize, this.currentPage * this.pagesize))
    },
    handleUserList(v) {
      const data = { id: v.id }
      printList(data).then(res => { // 这是从本地请求的数据接口，
        this.userList = res.data
      })
    },
    print(row) {
      this.tick = this.userList.slice((this.currentPage - 1) * this.pagesize, this.currentPage * this.pagesize)
      this.list.tick = this.tick
      this.dialogFormVisibles = true
      this.$nextTick(() => {
        if (row == 1) {
          this.$refs.print_.server(this.list)
        } else {
          this.$refs.save_.getlist(this.list)
        }
      })
    },
    init(v) {
      this.dialogFormVisible = true
      this.list = v
      this.handleUserList(v)
    }
  }

}
</script>

