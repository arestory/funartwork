<template>
  <el-container v-loading="requirePageData">
    <el-main>
      <div class="card-layout">
        <div style="margin-left:15px;margin-top:20px" v-for="work in artworks" :key="work.code">
          <ArtworkCard :artwork="work" />
        </div>
      </div>
    </el-main>
    <el-footer>
      <el-pagination
        @current-change="pageChange"
        :page-size="30"
        :pager-count="11"
        layout="prev, pager, next"
        :total="141*30"
      >></el-pagination>
    </el-footer>
  </el-container>
</template>

<script>
import { getMainPageData } from "../api/ArtworkApi";

import ArtworkCard from "../components/ArtworkCard.vue";
export default {
  components: {
    ArtworkCard
  },
  mounted() {
    //获取第一页
    this.getMainPageData(1);
  },
  methods: {
    pageChange(page) {
      this.getMainPageData(page);
    },
    getMainPageData(page) {
      this.requirePageData = true;

      getMainPageData(page, data => {
        console.log(data);
        this.artworks = data;
        this.requirePageData = false;
      });
    }
  },
  data() {
    return {
      requirePageData: true,
      artworks: []
    };
  }
};
</script>

<style scoped>
.card-layout {
  display: flex;

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