<template>
	<u-select v-model="show" mode="mutil-column-auto" :label-name="custom.name" :value-name="custom.value" :list="vdata" @confirm="confirm"></u-select>
</template>

<script>
	export default {
    props:{
      // ！！!注意 children的值不能为空数组
      vdata:{
        type:Array,
        default:()=>{
          return [
            {
              value: 8,
              label: '美国',
              children: [
                {
                  value: 9,
                  label: '纽约',
                  children:null
                }
              ]
            }
          ]
        }
      },

      // 通过name辨别来源
      name:{
        type:String,
        default:"name"
      },

      // 自定义 名字 值 字段
      custom:{
        type:Object,
        default:()=>{
          return {
            name:'label',
            value:'value',
          }
        }
      },
    },

		data() {
			return {
				show: false,
				
			}
		},

    created () {
      console.log("vdata",this.vdata,this.custom);
    },

		methods: {
			confirm(e) {
        this.$emit("change",{name:this.name,value:e})
			}
		}
	}
</script>