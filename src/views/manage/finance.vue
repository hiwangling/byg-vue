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
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="正在查询中。。。"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="火化编号" prop="c_serial" />
      <el-table-column align="center" label="逝者姓名" prop="name" />
      <el-table-column align="center" label="联系人" prop="linkman" />
      <el-table-column align="center" label="联系电话" prop="linkphone" />
      <el-table-column align="center" label="悼念厅" prop="mourn_title" />
      <el-table-column align="center" label="火化时间" prop="farewelltime" width="100" />
      <el-table-column align="center" label="应付总价" prop="totalprice" />
      <el-table-column align="center" label="状态" prop="finance_status">
        <template slot-scope="scope">
          <el-tag :type="scope.row.finance_status == 1 ? 'success' : 'danger'">{{ scope.row.finance_status == 1 ? '已支付' : '未支付' }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" class-name="small-padding" width="100">
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

    <el-dialog id="pay" :close-on-click-modal="false" title="付款操作" :visible.sync="dialogFormpay">
      <div v-loading="listLoadingPay" element-loading-text="正在支付中。。。">
        <el-input ref="myNameId" v-model="payval" />
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormpay = false">取消</el-button>
          <el-button type="primary" @click="payval = ''">清空</el-button>
        </div>
      </div>
    </el-dialog>
    <el-dialog :close-on-click-modal="false" title="查看" :visible.sync="dialogFormInfo">
      <div ref="print" class="print_tick">
        <h3 class="temp-title">业 务 结 算 单</h3>
        <div class="temp-content">
          <h1>逝者信息</h1>
          <el-row :gutter="20">
            <el-col :span="8">
              <div class="grid-content">
                <p><span> 逝者姓名 : </span>{{ info_temp.name }}</p>
                <p><span> 身份证 : </span>{{ info_temp.card }}</p>
                <p><span> 死亡原因 : </span>{{ info_temp.reason }}</p>
                <p><span> 联系人 : </span>{{ info_temp.linkman }}</p>
                <p><span> 火化时间 : </span>{{ info_temp.farewelltime }}</p>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content">
                <p><span> 逝者性别 : </span>{{ info_temp.sex }}</p>
                <p><span> 户口所在地 : </span>{{ info_temp.registered }}</p>
                <p><span> 联系人性别 : </span>{{ info_temp.linksex }}</p>
                <p><span> 联系电话 : </span>{{ info_temp.linkphone }}</p>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content">
                <p><span> 逝者年龄 : </span>{{ info_temp.age }}</p>
                <p><span> 民族 : </span>{{ info_temp.nation }}</p>
                <p><span> 承办人 : </span>{{ info_temp.operator }}</p>
                <p><span> 逝者关系 : </span>{{ info_temp.relation }}</p>
              </div>
            </el-col>
          </el-row>
        </div>
        <div v-if="mourn" class="temp-content temp-content-cold">
          <h1>灵堂服务</h1>
          <template>
            <el-row :gutter="20">
              <el-col :span="8">
                <div class="grid-content">
                  <p><span> 灵堂名称 : </span>{{ mourn.title }}</p>
                  <p><span> 小时 : </span>{{ mourn.hours }} 小时</p>
                  <p><span> 备注 : </span>{{ mourn.remark }}</p>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content">
                  <p><span> 开始时间 : </span>{{ mourn.startime }}</p>
                  <p><span> 总价 : </span>{{ mourn.totalprice }}</p>

                </div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content">
                  <p><span> 结束时间 : </span>{{ mourn.endtime }}</p>
                  <p><span> 操作人 : </span>{{ mourn.operator }}</p>
                </div>
              </el-col>
            </el-row>
          </template>
        </div>
        <div v-if="cold" class="temp-content temp-content-cold">
          <h1>冷藏柜</h1>
          <template>
            <el-row :gutter="20">
              <el-col :span="8">
                <div class="grid-content">
                  <p><span> 冷藏柜名称 : </span>{{ cold.title }}</p>
                  <p><span> 价格 : </span>{{ cold.totalprice }}</p>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content">
                  <p><span> 开始时间 : </span>{{ cold.startime }}</p>
                  <p><span> 备注 : </span>{{ cold.remark }}</p>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content">
                  <p><span> 结束时间 : </span>{{ cold.endtime }}</p>
                  <p><span> 操作人 : </span>{{ cold.operator }}</p>
                </div>
              </el-col>
            </el-row>
          </template>
        </div>
        <div v-if="ServerList ? ServerList.length>0 : false" class="temp-content temp-content-server">
          <h1>所选服务</h1>
          <template>
            <div v-for="(v,w) in ServerList" :key="w">
              <el-divider content-position="left">{{ v.title }}</el-divider>
              <el-row :gutter="20">
                <div v-for="(item,index) in v.services" :key="index">
                  <el-col :span="12">
                    <div class="grid-content">
                      <p><span> 服务名称 : </span>{{ item.title }}</p>
                    </div>
                  </el-col>
                  <el-col :span="4">
                    <div class="grid-content">
                      <p><span> 数量 : </span>{{ item.number }} </p>
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
          </template>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <span style="color:red;font-size:14px;margin-right:10px;">应付总价：<b>{{ totalprice }}</b> 元</span>
        <!-- <el-button v-show="finance_status != 1" type="danger" @click="handlePaySm">扫码支付</el-button> -->
        <el-button v-show="finance_status != 1" type="danger" @click="handlePay">付款</el-button>
        <el-button style="margin-top:5px" @click="dialogFormInfo = false">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  financeList,
  financeInfo,
  financePay,
  postPay
} from '@/api/manage'
import Pagination from '@/components/Pagination'
import { vuexData } from '@/utils/mixin'
export default {
  name: 'VueFinance',
  components: { Pagination },
  mixins: [vuexData],
  data() {
    return {
      list: null,
      server: [],
      ServerList: [],
      finance_status: 1,
      dialogFormpay: false,
      listLoadingPay: false,
      Payid: '',
      address: '',
      sex: ['男', '女'],
      payval: '',
      timeout: null,
      dataForm: {
        name: '',
        sex: '',
        age: '',
        card: '',
        registered: '',
        reason: '',
        linkman: '',
        number: '',
        relation: '',
        dietime: null,
        linksex: '',
        nation: '',
        haulier: '',
        linkphone: '',
        operator: '',
        server: null,
        c_remark: '',
        oid: '',
        id: ''
      },
      info_temp: {
        name: '',
        sex: '',
        age: '',
        card: '',
        farewelltime: null,
        registered: '',
        reason: '',
        linkman: '',
        relation: '',
        linksex: '',
        nation: '',
        linkphone: '',
        operator: ''
      },
      service: {
        id: '',
        name: '',
        operator: '',
        server: null
      },
      mourn: null,
      cold: null,
      totalprice: 0,
      name: '',
      operator: '',
      total: 0,
      serial: '',
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        search_data: '',
        sort: 'add_time',
        order: 'desc'
      },
      dialogFormInfo: false,
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '创建'
      }
    }
  },
  computed: {},
  watch: {
    'payval': {
      handler: function(newV, oldV) {
        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          this.getListPOI(newV)
        }, 300)
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      financeList(this.listQuery)
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
    // 扫码
    getListPOI(inputVal) {
      if (inputVal === '') {
        return false
      }
      if (this.payval === inputVal) {
        this.listLoadingPay = true
        const data = {
          id: this.Payid,
          name: this.name,
          totalprice: this.totalprice,
          paycode: inputVal,
          operator: this.info.realname
        }
        postPay(data).then(res => {
          this.listLoadingPay = false
          this.dialogFormpay = false
          this.dialogFormInfo = false
          this.getList()
          this.$notify.success({
            title: '成功',
            message: '支付成功'
          })
        }).catch(res => {
          this.listLoadingPay = false
          this.$notify.error({
            title: '失败',
            message: res.msg
          })
        })
      }
    },
    handlePaySm() {
      this.$confirm('是否付款?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.payval = ''
        this.dialogFormpay = true
        this.$nextTick(() => {
          this.$refs.myNameId.focus()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    handleInfo(row) {
      this.dataForm = Object.assign({}, row)
      this.Payid = row.id
      this.address = row.registered
      this.name = row.name
      this.totalprice = row.totalprice
      this.operator = row.operator
      this.finance_status = row.finance_status
      this.cold = null
      this.mourn = null
      this.info_(row)
    },
    info_(row, type) {
      financeInfo({ id: row.id })
        .then(res => {
          var server = res.data.branchList.filter(v => v.totalprice > 0)
          this.ServerList = server
          this.cold = res.data.cold
          this.mourn = res.data.hall
          this.serial = res.data.obituary.serial
          this.info_temp = res.data.obituary
          this.dialogFormInfo = true
        })
    },

    handlePay(row) {
      this.$confirm('是否付款?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const data = {
          name: this.name,
          oid: this.Payid,
          totalprice: this.totalprice,
          operator: this.info.realname
        }
        financePay(data)
          .then(res => {
            if (res.code == 0) {
              this.getList()
              this.dialogFormInfo = false
              this.$notify.success({
                title: '成功',
                message: '付款成功'
              })
            }
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    }
  }
}
</script>
<style>
#pay .el-dialog{
    margin-top: 30vh !important;
    min-width: auto;
    width: 350px;
}
#pay .el-input--medium .el-input__inner{
  width: 300px;
  margin: 10px 0 20px 0;
}
</style>
