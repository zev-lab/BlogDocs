# 自定义组件的 v-model

v-model 可以使 父子组件传递的值双向绑定

在父组件中,创建 v-model

```js
<template>
  <div class="ele-body">
    <Btn v-model="index"  />
  </div>
</template>
<script>
import Btn from './totalenergy/btn.vue'

export default {
  components: { Btn },
  data () {
    return {
      index: 0,
    }
  }
}
</script>
```

在子组件中 使用 model  

<p class="tip">注意你仍然需要在组件的 <code>props</code> 选项里声明 <code>checked</code> 这个 prop。</p>

```js
<template>
  <div class="ele-body">
      <el-button @click="timeTypeChange(0)" size="small">
      概览
    </el-button>
  </div>
</template>
<script>
export default {
  model: {
    prop: 'index',
    event: 'changeIndex'
  },
  props: {
    index: Number,
  },
  data () {
    return {}
  },
  methods:{
    timeTypeChange (i) {
      // this.index = i
      this.$emit('changeIndex', i)
    },
  }
}
</script>

```

## .sync 修饰符

在父组件中, 为绑定元素 增加 `.sync`修饰符

```js
<template>
  <div class="ele-body">
    <Btn :convert.sync="convert" />
  <rr/div>
</template>
<script>
import Btn from './totalenergy/btn.vue'

export default {
  components: { Btn },
  data () {
    return {
      convert: 0,
    }
  }
}
</script>

```
在子组件中, 使用` $emit('update:value',value) ` 来修改 数据

```js
<template>
  <div class="ele-body">
      <el-button @click="timeTypeChange(0)" size="small">
      概览
    </el-button>
  </div>
</template>
<script>
export default {
  props: {
    convert: Number
  },
  data () {
    return {}
  },
  methods:{
    timeTypeChange (i) {
      // this.index = i
      this.$emit('update:convert', i)
    },
  }
}
</script>

```





