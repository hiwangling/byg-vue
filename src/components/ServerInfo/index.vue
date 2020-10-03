<template>
  <div>
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
        <span style="color:red;font-size:14px;margin-right:10px;">总价：<b>{{ totalprice }}</b> 元</span>
        <el-button style="margin-top:5px" @click="dialogFormInfo = false">取消</el-button>
      </div>
    </el-dialog>

  </div>
</template>
<script>
import { financeInfo } from '@/api/manage'
export default {
  name: 'VueInfo',
  data() {
    return {
      totalprice: '',
      dialogFormInfo: false,
      mourn: null,
      cold: null,
      ServerList: {}
    }
  },
  computed: {},
  created() {

  },
  methods: {
    handleInfo(row) {
      this.dataForm = Object.assign({}, row)
      this.cold = null
      this.mourn = null
      this.info_(row)
    },
    info_(row, type) {
      financeInfo({ id: row.id })
        .then(res => {
          var server = res.data.branchList.filter(v => v.totalprice > 0)
          this.ServerList = server
          this.totalprice = res.data.services_totalprice
          this.cold = res.data.cold
          this.mourn = res.data.hall
          this.info_temp = res.data.obituary
          this.dialogFormInfo = true
        })
    },

    solo(arr) {
      var editRow = []
      arr.services.forEach((v, k) => {
        editRow.push(v.services)
      })
      return [].concat.apply([], editRow)
    }
  }
}
</script>
