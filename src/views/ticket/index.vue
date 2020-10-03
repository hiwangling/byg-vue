<template>
  <div class="ticket">
    <div class="header">
      花圈挽联及鲜花自助缴费系统
    </div>
    <el-row :gutter="12" style="padding: 0 20px">
      <el-col :span="16">
        <el-col v-for="(item,index) in list" :key="index" :span="6" shadow="always">
          <el-card>
            <div class="card_">
              <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1566279071968&di=ee1d8ab36650fc69a5a52f101e4024bf&imgtype=0&src=http%3A%2F%2Fstatic.qiuyewang.com%2Ffile%2Fattachments%2F20150518%2Fa1431964006127UK.jpg" alt="" width="160">
              <p>{{ item.title }}</p>
              <p> <strong style="color:red"> {{ item.price }}</strong> {{ item.unit }}</p>
              <!-- <el-input-number v-model="item.num" :min="0" label="描述文字" style="width:150px" @change="handleChange(item)" /> -->
            </div>
          </el-card>
        </el-col>
      </el-col>
      <el-col :span="8">
        <el-divider content-position="left">已选商品</el-divider>
        <el-table
          ref="tab"
          :show-header="true"
          show-summary
          :summary-method="getSummaries"
          :data="sell"
        >
          <el-table-column type="index" width="50" />
          <el-table-column prop="title" label="商品名称" width="100" />
          <el-table-column prop="num" label="数量" />
          <el-table-column prop="totalprice" label="价格" />
          <el-table-column align="center" label="操作" class-name="small-padding fixed-width" width="100">
            <template slot-scope="scope">
              <el-button
                type="danger"
                size="mini"
                @click="handleDelete(scope.row)"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="footer" style="text-align: right;margin-top: 20px;">
          <span style="font-size:18px;margin-right:10px">合计: <strong style="color:red">¥ {{ sum_price }} 元</strong></span>
          <el-button v-if="sum_price == 0" icon="el-icon-full-screen" type="info" plain>扫码支付</el-button>
          <el-button v-else icon="el-icon-full-screen" type="danger" @click="pay()">扫码支付</el-button>
          <el-button type="primary" @click="clear()">清空</el-button>
        </div>
      </el-col>
    </el-row>
    <el-dialog id="ticket" :close-on-click-modal="false" title="扫码支付" :visible.sync="dialogFormVisible">
      <img :src="url" alt="" width="250px">

      <div slot="footer" class="dialog-footer">
        <span style="font-size:18px;margin-right:10px">请使用微信支付: <strong style="color:red">¥ {{ sum_price }} 元</strong></span>
        <el-button @click="dialogFormVisible = false">取消</el-button>
      </div>
    </el-dialog>
    <form id="form1" action style="position: absolute; top:-555px;width: 150px;">
      <div v-show="true" class="print_container">
        <div class="section1">
          <h3>殡仪馆</h3>
        </div>

        <span>**************************</span>
        <div class="section4">
          <label>商品列表</label>
          <br>
          <label>订单号: {{ out_trade_no }}</label>
          <div v-for="(item,index) in sell" :key="index">
            <label>名称: {{ item.title }}</label>
            <br>
            <label>数量: {{ item.num }}</label>
            <br>
            <label>价格: {{ item.totalprice }} 元</label>
            <br>
          </div>
          <span>**************************</span>
          <div class="total">
            <label class="left">总计:</label>
            <label class="right">{{ sum_price }}元</label>
            <br>
            <label>注：凭此小票领取商品</label>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
import { listwreath, setup } from '@/api/ticket'
import io from 'weapp.socket.io'
export default {
  data() {
    return {
      sell: [],
      sum_price: 0,
      info: null,
      out_trade_no: '',
      url: '',
      dialogFormVisible: false,
      list: null

    }
  },
  watch: {
    sell: {
      handler(v) {
        this.changeSell()
      },
      immediate: true
    }
  },
  created() {
    var head =
      document.head ||
      document.getElementsByTagName('head')[0] ||
      document.documentElement
    var oscript = document.createElement('script')
    oscript.src = 'http://localhost:8000/CLodopfuncs.js?priority=1'
    head.insertBefore(oscript, head.firstChild)

    const socket = (this.socket = io('http://byg.jiayubz.net:2120'))
    socket.on('connect', function() {
      socket.emit('login', 3)
    })
    socket.on('new_msg', v => {
      var theString = v.replace(/&quot;/g, '"')
      this.info = JSON.parse(theString)
      this.out_trade_no = this.info.out_trade_no
      this.$nextTick(() => {
        this.handlePrint()
        this.dialogFormVisible = false
        this.clear()
      })
    })
    this.getList()
  },
  methods: {
    handlePrint() {
      // eslint-disable-next-line no-undef
      const LODOP = getCLodop()
      LODOP.SET_PRINT_STYLE('FontSize', 14)
      LODOP.SET_PRINT_STYLE('Bold', 1)
      LODOP.SET_PRINT_PAGESIZE(0, 710, 820)
      LODOP.ADD_PRINT_HTM(0, 30, 0, 720, document.getElementById('form1').innerHTML)
      LODOP.PREVIEW()
    },
    getList() {
      listwreath()
        .then(res => {
          const items = res.data
          this.list = items.filter(v => {
            // this.$set(v, 'num', '0')
            return v.id
          })
        })
        .catch(() => {
          this.list = []
        })
    },
    handleDelete(v) {
      const index = this.sell.indexOf(v)
      this.sell.splice(index, 1)
    },
    clear() {
      this.list.forEach(v => {
        v.num = 0
        v.totalprice = v.price
      })
      this.sell = []
    },
    pay() {
      const data = { price: this.sum_price }
      setup(data).then(res => {
        this.url = res.data.code
        this.dialogFormVisible = true
      })
    },
    changeSell() {
      let sum_price = 0
      if (this.sell) {
        this.sell.forEach((v, k) => {
          sum_price = sum_price + parseInt(v.totalprice)
        })
      }
      this.sum_price = sum_price
    },
    handleChange(v) {
      const index = this.sell.indexOf(v)
      v.totalprice = v.num * v.price
      if (index > -1) {
        if (v.num == 0) {
          this.sell.splice(index, 1)
        }
      } else {
        this.sell.push(v)
        if (v.num == 0) {
          this.sell.splice(index, 1)
        }
      }
    },
    getSummaries(param) {
      const { columns, data } = param
      let sum_price = 0
      data.forEach((v, k) => {
        sum_price = sum_price + parseInt(v.totalprice)
      })
      this.sum_price = sum_price
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '合计'
          return
        }
        const values = data.map(item => Number(item[column.property]))

        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr)
            if (!isNaN(value)) {
              return prev + curr
            } else {
              return prev
            }
          }, 0)
          sums[3] += ' 元'
        } else {
          sums[index] = ''
        }
      })

      return sums
    }
  }
}
</script>
<style scoped>
.header {
    height: 70px;
    text-align: center;
    font-size: 30px;
    color: #fff;
    font-family: '宋体';
    line-height: 70px;
    background: #38BFB9;
    margin-bottom: 5px;
}
.card_{
   height: 280px;
  text-align: center
}
.card_ img{
  display: block;
 margin: 0 auto;
}

</style>
<style>
#ticket .el-dialog{
     width: 350px;
     margin-top:30vh!important;
    min-width: auto;

  }
  #ticket .el-dialog__body{
    text-align: center;
  }
  .ticket .el-input__inner{
      border: 1px solid #777272!important;
}
.ticket .el-input-number__decrease.is-disabled {
  color: #777272;
}
.ticket .el-input-number__increase {
  border-left: 1px solid #777272;
   color: #777272;
}
.ticket .el-input-number__decrease{
  border-right: 1px solid #777272;
}
</style>
