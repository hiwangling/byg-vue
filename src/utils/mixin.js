import { mapGetters, mapActions } from 'vuex'
var that
export const vuexData = {
  filters: {
    group_list(v) {
      var obj = {}
      that.config_group_list.forEach((item, index) => { obj[index + 1] = item })
      return obj[v]
    },
    driver_name(v) {
      var obj = {}
      that.drivername.forEach((item, index) => { obj[index + 1] = item })
      return obj[v]
    },
    recetype_list(v) {
      var obj = {}
      that.recetypes.forEach((item, index) => { obj[index + 1] = item })
      return obj[v]
    },
    obituary_list(v) {
      var obj = {}
      that.obituarystate.forEach((item, index) => { obj[index + 1] = item })
      return obj[v]
    },
    service_stype(v) {
      var obj = {}
      that.servicestype.forEach((item, index) => { obj[index + 1] = item })
      return obj[v]
    },
    cremationstate_stype(v) {
      var obj = {}
      that.cremationstate.forEach((item, index) => { obj[index + 1] = item })
      return obj[v]
    },
    type_list(v) {
      var obj = Object.assign({}, that.config_type_list)
      return obj[v]
    },
    carFilter(v) {
      const statusMap = { 1: 'primary', 2: 'success', 3: 'danger', 4: 'info', 5: 'warning' }
      return statusMap[v]
    },
    carState(v) {
      const statusMap = { 1: '签收', 2: '出车', 3: '出车', 4: '回馆' }
      return statusMap[v]
    }
  },
  data() {
    return {
      config_type_list: null,
      config_group_list: null,
      recetypes: null,
      cremationstate: null,
      servicestype: null,
      obituarystate: null,
      drivername: null
    }
  },
  computed: {
    ...mapGetters([
      'info',
      'config'
    ])
  },
  beforeCreate: function() {
    that = this
  },
  created() {
    this.config_group_list = this.filter(this.config.config_group_list) // 1,2,3
    this.drivername = this.filter(this.config.drivername)
    this.recetypes = this.filter(this.config.recetype)
    this.cremationstate = this.filter(this.config.cremationstate)
    this.obituarystate = this.filter(this.config.obituarystate)
    this.servicestype = this.filter(this.config.servicestype)
    this.config_type_list = this.filter(this.config.config_type_list) // 0,1,2
  },
  methods: {
    ...mapActions({

    }),
    filter(str) {
      return (((str.replace(/\s*/g, '')).replace(/\d+/g, '')).substring(1)).split(':')
    }
  }
}

