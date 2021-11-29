<template>
  <div>
    <div><router-link to="/">Go Back</router-link></div>
    <div class="weather">
      <select v-model="curCityId" @change="getCurrentWeather">
        <option value="" disabled selected>select a city</option>
        <option v-for="(value, key) in cities" :key="key" :value="key">{{value}}</option>
      </select>
      <table width="300px" border="1" cellspacing="0" cellpadding="0">
        <tr>
          <td width="40%">City</td>
          <td width="60%">{{curWeather.cityName}}</td>
        </tr>
        <tr>
          <td>Updated time</td>
          <td>{{curWeather.updatedTime | toLocalDateFormat}}</td>
        </tr>
        <tr>
          <td>Weather</td>
          <td>{{curWeather.weather}}</td>
        </tr>
        <tr>
          <td>Temperature</td>
          <td>{{curWeather.temperature}} <template v-if="curWeather.temperature">&#8451;</template></td>
        </tr>
        <tr>
          <td>Wind</td>
          <td>{{curWeather.windSpeed}} <template v-if="curWeather.windSpeed">km/h</template></td>
        </tr>
      </table>
      <div id="errorMsg">{{ msg }}</div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'RealtimeWeather',
  data () {
    return {
      msg: '',
      cities: {},
      curCityId: '',
      curWeather: {}
    }
  },
  created: function () {
    this.getAllCities()
  },
  filters: {
    toLocalDateFormat (dateStr) {
      if (!dateStr) return ''

      var getWeek = day => {
        var map = {0: 'Sunday', 1: 'Monday', 2: 'Tuesday', 3: 'Wednesday', 4: 'Thursday', 5: 'Friday', 6: 'Saturday'}
        return map[day]
      }
      var getHourTime = (hour, minite) => {
        if (hour < 12) {
          return hour + ':' + minite + ' AM'
        } else if (hour === 12) {
          return hour + ':' + minite + ' PM'
        } else {
          return (hour - 12) + ':' + minite + ' PM'
        }
      }
      var date = new Date(dateStr)
      var weekDay = getWeek(date.getDay())
      var hourTime = getHourTime(date.getHours(), date.getMinutes())
      console.log(weekDay)
      console.log(hourTime)
      return weekDay + '  ' + hourTime
    }
  },
  methods: {
    getAllCities () {
      var that = this
      var url = process.env.VUE_APP_BASE_API + '/weather/cities'
      axios.get(url).then(function (response) {
        that.cities = response.data
        console.log(that.cities)
      }).catch(function (error) {
        console.log(error)
      })
    },
    getCurrentWeather () {
      var that = this
      var url = process.env.VUE_APP_BASE_API + '/weather/get?cityId=' + this.curCityId
      axios.get(url).then(function (response) {
        that.curWeather = response.data
        console.log(that.curWeather)
      }).catch(function (error) {
        console.log(error)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.weather {
  padding-top: 20px;
}
#errorMsg {
  color: red;
}
select {
  width: 12em;
  height: 2em;
}
table {
  margin-top: 10px;
  border-color: silver;
}
</style>
