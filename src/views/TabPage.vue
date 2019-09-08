<template>
  <div>
    <el-tabs v-model="activeIndex">
      <el-tab-pane label="主页"
                   name="1">
        <MainPage />
      </el-tab-pane>
      <el-tab-pane label="搜索"
                   name="2">
        <SearchPage />
      </el-tab-pane>
    </el-tabs>

  </div>

</template>

<script>

import MainPage from './MainPage'
import SearchPage from './SearchPage'
import ActressDetailPage from './ActressDetailPage'
export default {
  data () {
    return {
      activeIndex: "1",

    };
  },
  components: {
    ActressDetailPage,
    SearchPage,
    MainPage,
  }
};
</script>

<style>
</style>