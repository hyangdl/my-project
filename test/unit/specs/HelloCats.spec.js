import Vue from 'vue'
import HelloCats from '@/components/HelloCats'

describe('HelloCats.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(HelloCats)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('.hello h2').textContent)
      .toEqual('List of all the cats in alphabetical order under a heading of the gender of their owner: ')
  })
})
