<template>

  <div>
    <div>
      <el-radio v-model="searchType"
                :label="0">抽象车牌号</el-radio>
      <el-radio v-model="searchType"
                :label="1">现代车牌号</el-radio>
      <el-radio v-model="searchType"
                :label="2">艺术家</el-radio>
      <el-input v-model="keyword"
                style="height:100px;width:300px"
                :placeholder="searchPlaceHolder"></el-input>
      <el-button icon="el-icon-search"
                 style="margin-left:10px"
                 type="primary"
                 @click="search(1)"
                 circle></el-button>

    </div>

    <div class="card-layout"
         v-loading="searchingWork"
         v-show="searchType!=2">
      <div style="margin-left:15px;margin-top:20px"
           v-for="work in artworks"
           :key="work.code">
        <ArtworkCard :artwork="work" />
      </div>
    </div>
    <div class="card-layout"
         v-loading="searchingWork"
         v-show="searchType==2">
      <div style="margin-left:15px;margin-top:20px"
           v-for="actress in actressList"
           :key="actress.name">
        <ActressCard :actress="actress" />
      </div>
    </div>
  </div>

</template>

<script>
import { search } from "../api/ArtworkApi";
import ActressCard from '../components/ActressCard.vue'

import ArtworkCard from "../components/ArtworkCard.vue";

export default {

  components: {

    ArtworkCard, ActressCard
  },
  watch: {

    searchType (type) {

      this.searchPlaceHolder = type == 2 ? '艺术家名称' : '请输入神秘代码';

    }
  },
  methods: {
    search (page) {
      if (this.keyword == "") {

        this.$message.error("关键字不能为空");
        return;
      }
      this.searchingWork = true;

      search(this.keyword, page, this.searchType, res => {
        console.log(res);
        if (this.searchType != 2) {
          this.artworks = res;

        } else {
          this.actressList = res;
        }
        this.searchingWork = false;
      }, () => {
        this.searchingWork = false;


      });

    }
  },
  data () {

    return {
      searchingWork: false,
      searchPlaceHolder: "请输入神秘代码",
      searchType: 0,
      keyword: "",
      artworks: [], actressList: []
    }
  }
}
</script>

<style>
.card-layout {
  display: flex;
  margin: 10px;
  /* flex-direction 决定主轴的方向 row(默认)|row-reverse|column|column-reverse*/
  /* flex-direction: row; */

  /* flex-wrap决定当排列不下时是否换行以及换行的方式,nowrap(默认)|wrap|wrap-reverse */
  /* flex-wrap:wrap; */

  /* flex-flow是lex-direction和flex-wrap的简写形式，如：row wrap|column wrap-reverse等。默认值为row nowrap，即横向排列 不换行 */
  flex-flow: row wrap;

  /* !当主轴沿水平方向时!justify-content,决定item在主轴上的对齐方式，可能的值有flex-start（默认），flex-end，center，space-between，space-around */
  justify-content: center;
  /* !主轴水平时!决定了item在交叉轴上的对齐方式，可能的值有flex-start|flex-end|center|baseline|stretch */
  align-items: flex-start;
}
</style>