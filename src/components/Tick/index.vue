
<template>
  <div class="deit">
    <div class="cantainer">
      <el-dialog title="列表" append-to-body :visible.sync="dialogFormVisible">
        <el-table
          style="width: 100%;margin-bottom:20px"
          :data="userList.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        >
          <el-table-column label="服务名称" prop="title" width="180" />
          <el-table-column label="单位" prop="unit" width="80" />
          <el-table-column label="单价" prop="price" />
          <el-table-column label="数量" prop="number" />
          <el-table-column label="总价" prop="totalprice" />
        </el-table>
        <el-pagination
          :current-page="currentPage"
          background
          :page-sizes="[4]"
          :page-size="pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="userList.length"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="print_clear">空白发票</el-button>
          <el-button type="primary" @click="print(2)">打印</el-button>
        </div>
      </el-dialog>
    </div>
    <print v-show="false" ref="print_" />
    <el-dialog id="ticket" title="列表" append-to-body :visible.sync="dialogFormVisibles">

      <el-form
        ref="tickets"
        :inline="true"

        status-icon
        label-position="left"
        label-width="50px"
      >
        <el-form-item label="名称">
          <el-input v-model="tickets[0].title" />
        </el-form-item>
        <el-form-item label="单位">
          <el-input v-model="tickets[0].unit" style="width:80px" />
        </el-form-item>
        <el-form-item label="单价">
          <el-input v-model="tickets[0].price" style="width:100px" />
        </el-form-item>
        <el-form-item label="数量">
          <el-input v-model="tickets[0].number" style="width:100px" />
        </el-form-item>
        <el-form-item label="总价">
          <el-input v-model="tickets[0].totalprice" style="width:100px" />
        </el-form-item>
        <el-form-item label="名称">
          <el-input v-model="tickets[1].title" />
        </el-form-item>
        <el-form-item label="单位">
          <el-input v-model="tickets[1].unit" style="width:80px" />
        </el-form-item>
        <el-form-item label="单价">
          <el-input v-model="tickets[1].price" style="width:100px" />
        </el-form-item>
        <el-form-item label="数量">
          <el-input v-model="tickets[1].number" style="width:100px" />
        </el-form-item>
        <el-form-item label="总价">
          <el-input v-model="tickets[1].totalprice" style="width:100px" />
        </el-form-item>
        <el-form-item label="名称">
          <el-input v-model="tickets[2].title" />
        </el-form-item>
        <el-form-item label="单位">
          <el-input v-model="tickets[2].unit" style="width:80px" />
        </el-form-item>
        <el-form-item label="单价">
          <el-input v-model="tickets[2].price" style="width:100px" />
        </el-form-item>
        <el-form-item label="数量">
          <el-input v-model="tickets[2].number" style="width:100px" />
        </el-form-item>
        <el-form-item label="总价">
          <el-input v-model="tickets[2].totalprice" style="width:100px" />
        </el-form-item>
        <el-form-item label="名称">
          <el-input v-model="tickets[3].title" />
        </el-form-item>
        <el-form-item label="单位">
          <el-input v-model="tickets[3].unit" style="width:80px" />
        </el-form-item>
        <el-form-item label="单价">
          <el-input v-model="tickets[3].price" style="width:100px" />
        </el-form-item>
        <el-form-item label="数量">
          <el-input v-model="tickets[3].number" style="width:100px" />
        </el-form-item>
        <el-form-item label="总价">
          <el-input v-model="tickets[3].totalprice" style="width:100px" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibles = false">取消</el-button>
        <el-button type="primary" @click="print(1)">打印</el-button>
      </div>
      <!-- <print ref="print_" /> -->

    </el-dialog>
  </div>
</template>
<script>
import { printorderlist, printList } from '@/api/stats'
import print from '@/components/Tick/print'
export default {
  components: { print },
  data() {
    return {
      currentPage: 1, // 初始页
      pagesize: 4, //    每页的数据
      userList: [],
      type: '',
      dialogFormVisible: false,
      dialogFormVisibles: false,
      tick: [],
      tickets: [
        { title: '',
          unit: '',
          price: '',
          number: '',
          totalprice: ''
        },
        { title: '',
          unit: '',
          price: '',
          number: '',
          totalprice: ''
        },
        { title: '',
          unit: '',
          price: '',
          number: '',
          totalprice: ''
        },
        { title: '',
          unit: '',
          price: '',
          number: '',
          totalprice: ''
        }
      ],
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
      console.log(v)
      const data = { id: v.id }
      if (v.type == 1) {
        printorderlist(data).then(res => {
          this.userList = res.data
        })
      } else {
        printList(data).then(res => {
          this.userList = res.data
        })
      }
    },
    print_clear() {
      this.dialogFormVisibles = true
    },
    print(v) {
      this.type = v
      this.tick = this.userList.slice((this.currentPage - 1) * this.pagesize, this.currentPage * this.pagesize)
      this.list.tick = this.type == 2 ? this.tick : this.tickets
      this.list.type = v
      // this.dialogFormVisibles = true
      this.$nextTick(() => {
        this.$refs.print_.server(this.list)
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
<style>
#ticket .el-dialog{
  width: 1000px;
}

</style>
