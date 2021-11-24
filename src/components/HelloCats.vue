<template>
  <div class="hello">
    <h2>{{ msg }}</h2>
    <h2>Male</h2>
    <ul>
      <li v-for="(cat, index) in filterCatsByOwnerGender(allCats, 'Male')" :key="'1_' + index">
        {{cat.name}}
      </li>
    </ul>
    <h2>Female</h2>
    <ul>
      <li v-for="(cat, index) in filterCatsByOwnerGender(allCats, 'Female')" :key="'2_' + index">
        {{cat.name}}
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'HelloCats',
  data () {
    return {
      msg: 'List of all the cats in alphabetical order under a heading of the gender of their owner: ',
      allCats: []
    }
  },
  created: function () {
    this.getJsonData()
  },
  filters: {
  },
  methods: {
    getJsonData () {
      var that = this
      axios.get('http://5c92dbfae7b1a00014078e61.mockapi.io/owners').then(function (response) {
        that.allCats = that.sortCats(response.data)
        console.log(that.allCats)
      }).catch(function (error) {
        console.log(error)
      })
    },
    sortCats (arr) {
      var cats = []
      // get all cats with its owner's gender
      arr.forEach(item => {
        var ownerGender = item.gender
        var pets = item.pets
        if (pets) {
          pets.forEach(element => {
            if (element.type === 'Cat') {
              cats.push({name: element.name, ownerGender: ownerGender})
            }
          })
        }
      })
      // in alphabetical order
      cats.sort(function (a, b) {
        return (a.name > b.name) ? 1 : -1
      })
      return cats
    },
    filterCatsByOwnerGender (cats, gender) {
      return cats.filter(item => {
        return item.ownerGender === gender
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h2 {
  font-weight: 500;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  margin: 10px 80px;
}
</style>
