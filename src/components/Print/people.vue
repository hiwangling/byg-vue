<template>
  <div>
    <div ref="print" style="padding:0 30px">
      <h3 style="text-align:center;display:inline-block;height:20px;font-weight: 800;width:100%;margin-top:50px;font-size:30px">惠民殡葬减免凭证</h3>
      <table class="tb" border="0" cellspacing="0" cellpadding="0" style="border:0">
        <tr>
          <td style="border: none;">厅名: {{ list.mourn_title }}</td>
          <td style="border: none;">逝者姓名: {{ list.name }}</td>
          <td style="border: none;">性别: {{ list.sex }}</td>
          <td style="border: none;">年龄: {{ list.age }}</td>
        </tr>
        <tr>
          <td colspan="4" style="border: none;">身份证号: {{ list.card }}</td>
        </tr>
        <tr>
          <td colspan="4" style="border: none;">家庭住址: {{ list.registered }}</td>
        </tr>
        <tr>
          <td style="border: none;" colspan="4">进厅日期: <u>{{ list.startime }}</u></td>

        </tr>
        <tr>
          <td style="border: none;" colspan="4">火化日期: <u>{{ list.farewelltime }}</u></td>

        </tr>

      </table>
      <hr>
      <div>
        <table class="tb" border="0" cellspacing="0" cellpadding="0" style="border:0">
          <tr>
            <td>惠民殡葬服务内容:  </td>
            <td>车费 <span>{{ list.car_price }} 元</span></td>
            <td style="text-align:center;">骨灰盒费 <span>{{ list.check_price }} 元</span></td>
            <td>寿衣 <span>{{ list.shroud_price }} 元</span></td>
          </tr>
          <tr>
            <td />
            <td>冷棺 <span>{{ list.cold_price }} 元</span></td>
            <td style="text-align:center;">环保花圈 <span>{{ list.flower_price }} 元</span></td>

            <td>主持 <span>{{ list.direct_price }} 元</span></td>

          </tr>
          <tr>
            <td colspan="2" />
            <td colspan="2" style="text-align:right;padding-right:85px">惠民金额: {{ list.totalprice }} 元 </td>

          </tr>
          <tr>
            <td colspan="2" />
            <td colspan="2" style="text-align:right;padding-right:50px">承办人(家属)签字: <div style="display:inline-block;border-bottom:1px solid #000;width:100px;" /> </td>
          </tr>
          <!-- <tr>
            <td colspan="4">承办人(家属)签字: <div style="display:inline-block;border-bottom:1px solid #000;width:150px;" /> </td>
          </tr> -->
        </table>
      </div>
      <hr>
      <table class="tb" border="0" cellspacing="0" cellpadding="0" style="border:0">
        <tr>
          <td colspan="3">与逝者关系: <div style="display:inline-block;border-bottom:1px solid #000;width:150px;" /></td>
        </tr>
        <tr>
          <td colspan="3">经办人身份证号: <div style="display:inline-block;border-bottom:1px solid #000;width:150px;" /></td>
        </tr>
        <tr>
          <td colspan="3">经办人联系方式: <div style="display:inline-block;border-bottom:1px solid #000;width:150px;" /> </td>
        </tr>
        <tr>
          <td colspan="3">家属银行账号信息: <div style="display:inline-block;border-bottom:1px solid #000;width:300px;" /></td>
        </tr>
        <tr>
          <td colspan="3" style="text-align:right;">{{ currentdate }}</td>
        </tr>
        <tr>
          <td colspan="3" style="text-align:right;">经办人: {{ list.operator }}</td>
        </tr>

      </table>

    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      currentdate: '',
      list: {
        car_price: 0,
        check_price: 0,
        shroud_price: 0,
        cold_price: 0,
        direct_price: 0,
        flower_price: 0,
        totalprice: 0
      }
    }
  },
  created() {
    this.getNowFormatDate()
  },
  methods: {
    print() {
      this.$print(this.$refs.print)
    },
    init(data, type) {
      if (data) {
        this.list = Object.assign({}, data)
      }
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
    }
  }
}
</script>
<style>

.tb {
  width: 100%;
  height: 50px;
  line-height: 50px;
  text-align: left;
  padding-left: 20px;
  font-size: 16px;
  color: #000;
  /* border-collapse: collapse; */
}
@media print {
    td {
         border: none;
    }
}
</style>
