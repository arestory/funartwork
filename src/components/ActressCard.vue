<template>
  <div :href="actress.workListUrl"
       @click="gotoDetailPage"
       class="card-box">
    <el-image :src="actress.avatar"
              lazy>
      <el-image slot="placeholder"
                src="https://pics.dmm.co.jp/mono/actjpgs/nowprinting.gif" />

    </el-image>
    <div class="content">{{actress.name}}</div>

  </div>
</template>

<script>
export default {

  props: {

    actress: {
      id: "",
      name: "",
      avatar: "../assets/nowprinting.gif",
      workListUrl: ""

    }
  },
  methods: {

    gotoDetailPage () {

      this.$router.push('/actress/detail')

    }
  }
}
</script>

<style>
.card-box {
  cursor: pointer;
  width: 140px;
  box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.2);
  padding: 5px;
}
</style>