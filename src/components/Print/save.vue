<template>
  <div>
    <div ref="print" style="padding:5px 30px 30px 60px">
      <h3 class="print_title">嘉鱼殡葬管理所专用收据</h3>
      <div class="prinr_foot">
        <span style="font-size:14px">逝者姓名: {{ name }}</span>
        <div>
          <span style="font-size:14px">编号: {{ serial }}</span>
        </div>

      </div>
      <table id="hall_print" class="table_print">
        <tr>
          <td>商品名称</td>
          <td>商品规格</td>
          <td>数量</td>
          <td>单价</td>
          <td>金额</td>
        </tr>
        <tr v-for="(val,item,index) in list" :key="index">
          <td>骨灰寄存</td>
          <td>火化服务</td>
          <td>1</td>
          <td>{{ val.totalprice }}</td>
          <td>{{ val.totalprice }}</td>
        </tr>
        <tr>
          <td>合计</td>
          <td colspan="3">{{ count }}</td>
          <td>{{ totalprice }}</td>
        </tr>
      </table>
      <div class="prinr_foot">
        <span>经办人:{{ operator }}</span>
        <span style="font-size:14px">{{ currentdate }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { vuexData } from '@/utils/mixin'
export default {
  mixins: [vuexData],
  data() {
    return {
      list: {

      },
      name: '',
      serial: '',
      currentdate: '',
      operator: '',
      totalprice: ''
    }
  },
  computed: {
    count: function() {
      return this.digitUppercase(this.totalprice)
    }
  },
  created() {
    this.getNowFormatDate()
  },
  methods: {
    print() {
      this.$print(this.$refs.print)
    },
    getlist(v) {
      this.totalprice = v.tick[0].totalprice
      this.list = v.tick
      this.name = v.buryname || v.name
      this.serial = v.serial
      this.operator = this.info.realname
      this.$nextTick(() => {
        this.print()
      })
    },

    getNowFormatDate() {
      var date = new Date()
      var year = date.getFullYear()
      var month = date.getMonth() + 1
      var strDate = date.getDate()
      if (month >= 1 && month <= 9) {
        month = '0' + month
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = '0' + strDate
      }
      this.currentdate = year + '年' + month + '月' + strDate + '日'
    },
    digitUppercase(n) {
      var fraction = ['角', '分']
      var digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖']
      var unit = [['元', '万', '亿'], ['', '拾', '佰', '仟']]
      var head = n < 0 ? '欠' : ''
      n = Math.abs(n)
      var s = ''
      for (var i = 0; i < fraction.length; i++) {
        s += (
          digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]
        ).replace(/零./, '')
      }
      s = s || '整'
      n = Math.floor(n)
      for (var i = 0; i < unit[0].length && n > 0; i++) {
        var p = ''
        for (var j = 0; j < unit[1].length && n > 0; j++) {
          p = digit[n % 10] + unit[1][j] + p
          n = Math.floor(n / 10)
        }
        s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s
      }
      return (
        head +
        s
          .replace(/(零.)*零元/, '元')
          .replace(/(零.)+/g, '零')
          .replace(/^整$/, '零元整')
      )
    }
  }
}
</script>
<style scoped>
  #hall_print tr td{
   height:19px;
   line-height: 19px;
   font-size: 14px;
  }
  .print_title{
    margin-top: 0;
    font-size: 20px;
    margin-bottom: 0px;
  }
  .prinr_foot{
    display: flex;
    justify-content: space-between
  }
</style>
