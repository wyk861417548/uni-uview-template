<template>
  <u-radio-group v-model="value" :width="width" @change="radioGroupChange" :wrap="wrap ">
    <u-radio 
      @change="radioChange" 
      v-for="(item, index) in vdata" :key="index" 
      :name="item[custom.value]"
      :shape="shape"
      :disabled="item.disabled"
    >
      {{item[custom.name]}}
    </u-radio>
  </u-radio-group>
</template>

<script>
export default {
  props:{
    vdata:{
      type:Array,
      default:()=>{
        return [
          {
            name: 'apple',
            disabled: false
          },{
            name: 'banner',
            disabled: false
          },
			  ]
      }
    },

    // 每个radios的width
    width:{
      type:String,
      default:"auto"
    },

    // 通过name辨别来源
    name:{
      type:String,
      default:"name"
    },

    // radios形状
    shape:{
      type:String,
      default:"circle"
    },

    // 自定义 名字 值 字段
    custom:{
      type:Object,
      default:()=>{
        return {
          name:'name',
          value:'value'
        }
      }
    },
  },
	data() {
		return {
			value:-1,
		};
	},

  created(){
    
  },
	methods: {
		// 选中某个单选框时，由radio时触发
		radioChange(e) {
			// console.log(e);
		},
		// 选中任一radio时，由radio-group触发
		radioGroupChange(e) {
			this.$emit("change",{name:this.name,value:e})
		}
	}
};
</script>