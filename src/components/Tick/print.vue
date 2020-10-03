<template>
  <div>
    <el-button type="primary" plain size="small" @click="print">打印</el-button>
    <section ref="print">
      <template>
        <template v-for="(item,index) in vert">
          <drag :key="index" :child="item" />
        </template>
      </template>
    </section>
  </div>
</template>
<script>
import Drag from '@/components/Drag'
const init = [
  {
    t: '',
    left: '115',
    top: '128',
    width: '200',
    id: 0
  },
  {
    t: '',
    left: '115',
    top: '162',
    width: '200',
    id: 1
  },
  {
    t: '',
    left: '115',
    top: '198',
    width: '200',
    id: 2
  },
  {
    t: '',
    left: '115',
    top: '232',
    width: '200',
    id: 3
  },
  {
    t: '',
    left: '325',
    top: '128',
    width: '200',
    tid: 0
  },
  {
    t: '',
    left: '325',
    top: '162',
    width: '200',
    tid: 1
  },
  {
    t: '',
    left: '325',
    top: '198',
    width: '200',
    tid: 2
  },
  {
    t: '',
    left: '325',
    top: '232',
    width: '200',
    tid: 3
  },
  {
    t: '',
    left: '447',
    top: '127',
    width: '200',
    sid: 0
  },
  {
    t: '',
    left: '447',
    top: '165',
    width: '200',
    sid: 1
  },
  {
    t: '',
    left: '447',
    top: '200',
    width: '200',
    sid: 2
  },
  {
    t: '',
    left: '447',
    top: '233',
    width: '200',
    sid: 3
  },
  {
    t: '',
    left: '555',
    top: '127',
    width: '200',
    yid: 0
  },
  {
    t: '',
    left: '555',
    top: '165',
    width: '200',
    yid: 1
  },
  {
    t: '',
    left: '555',
    top: '200',
    width: '200',
    yid: 2
  },
  {
    t: '',
    left: '555',
    top: '232',
    width: '200',
    yid: 3
  },
  {
    t: '',
    left: '136',
    top: '64',
    width: '200',
    id: 20
  },
  {
    t: '',
    left: '205',
    top: '260',
    id: 21
  },
  {
    t: '',
    left: '545',
    top: '265',
    width: '200',
    id: 22
  },

  {
    t: '',
    left: '120',
    width: '270',
    top: '292',
    id: 23
  },
  {
    t: '',
    left: '420',
    width: '200',
    top: '320',
    id: 98
  },
  {
    t: new Date().getFullYear(),
    left: '567',
    width: '200',
    top: '70',
    id: 25
  },
  {
    t: new Date().getMonth() + 1,
    left: '627',
    width: '200',
    top: '70',
    id: 26
  },
  {
    t: new Date().getDate(),
    left: '664',
    width: '200',
    top: '70',
    id: 27
  }
]
export default {
  components: { Drag },
  data() {
    return {
      vert: [],
      list: null,
      totalprice: 0,
      sum: '',
      date: new Date(),
      name: null,
      operate_name: ''
    }
  },
  created() {},
  methods: {
    print() {
      this.$print(this.$refs.print)
    },
    server(val) {
      this.vert = Object.assign([], init)
      var row = val.tick
      let sum_price = 0
      if (row) {
        row.forEach((v, k) => {
          if (v.totalprice == '') {
            v.totalprice = 0
          }
          sum_price = sum_price + parseInt(v.totalprice)
        })
      }
      console.log(val)
      // console.log(val.type)
      this.totalprice = sum_price
      this.sum = this.digitUppercase(sum_price)
      this.name = val.name
      this.address = val.address
      this.operate_name = val.operator
      this.vert.forEach((n, m) => {
        n.t = ''
      })
      row.forEach((v, k) => {
        this.vert.forEach((n, m) => {
          if (n.id == k) {
            n.t = v.title
          }
          if (k == n.tid) {
            n.t = val.type == 1 ? v.unit : ((v.unit).split('/')[1])
          }
          if (k == n.sid) {
            n.t = v.price
          }
          if (k == n.yid) {
            n.t = v.totalprice
          }
          if (n.id == 20) {
            n.t = this.name
          }
          if (n.id == 98) {
            n.t = this.operate_name
          }
          if (n.id == 21) {
            n.t = this.sum
          }
          if (n.id == 22) {
            n.t = this.totalprice
          }
          if (n.id == 23) {
            n.t = this.address
          }
          if (n.id == 25) {
            n.t = new Date().getFullYear()
          }
          if (n.id == 26) {
            n.t = new Date().getMonth() + 1
          }
          if (n.id == 27) {
            n.t = new Date().getDate()
          }
        })
      })
      this.$nextTick(() => {
        this.print()
      })
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

