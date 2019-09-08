<template>
  <el-container>

    <el-main>
      <div class="card-layout">

        <div class="card-box">
          <el-image :src="actressInfo.avatar"
                    lazy>
            <el-image slot="placeholder"
                      src="https://pics.dmm.co.jp/mono/actjpgs/nowprinting.gif" />

          </el-image>
          <div class="content">{{actressInfo.name}}</div>
          <div>
            年龄：{{actressInfo.age}}
          </div>
          <div>
            生日：{{actressInfo.birthday}}
          </div>
          <div>
            身高：{{actressInfo.stature}}
          </div>
          <div>
            胸围：{{actressInfo.chestWidth}}
          </div>
          <div>
            腰围：{{actressInfo.hipline}}
          </div>
          <div>
            臀围：{{actressInfo.waistline}}
          </div>
          <div>
            罩杯：{{actressInfo.cup}}
          </div>
          <div>
            兴趣：{{actressInfo.hobby}}
          </div>
          <div>
            出生地：{{actressInfo.home?actressInfo.home:"无"}}
          </div>
        </div>
        <div style="margin-left:15px;margin-top:20px"
             v-loading="requirePageData"
             v-for="work in artworks"
             :key="work.code">
          <ArtworkCard :artwork="work" />
        </div>
        <div v-show="artworks.length==0">没有数据了</div>

      </div>

    </el-main>
    <el-footer>
      <el-pagination @current-change="pageChange"
                     :page-size="10"
                     :pager-count="11"
                     layout="prev, pager, next"
                     :total="100">></el-pagination>
    </el-footer>
  </el-container>

</template>

<script>
import ArtworkCard from "../components/ArtworkCard.vue";
import { getActressInfo, getActressWork } from "../api/ArtworkApi";
import { access } from 'fs';
import { version } from 'punycode';

export default {

  props: {

    actress: {
      type: Object,
      default: {
        id: "uch",
      }
    }
  }, mounted () {

    const actressId = this.actress.workListUrl
    getActressInfo(this.actress.id, res => {

      this.actressInfo = res;
      console.log("aaaa");
      console.log(res);
    })
    this.getActressWork(1);
  },
  data () {

    return {
      requirePageData: false,
      actressInfo: {

        age: 20,
        avatar: "https://pics.javbus.com/actress/uch_a.jpg",
        birthday: "1999-02-10",
        chestWidth: "86cm",
        cup: "D",
        hipline: "83cm",
        hobby: "音楽を聴くこと、アプリゲーム",
        home: null,
        name: "野々浦暖",
        stature: "152cm",
        waistline: "52cm",
      },
      searchingWork: false,
      artworks: [],
    }
  },

  methods: {

    getActressWork (page) {

      this.requirePageData = true;
      getActressWork(this.actress.id, page, res => {

        console.log("bbb");
        this.artworks = res;
        console.log(res);
        this.requirePageData = false;

      })
    },
    pageChange (page) {

      this.getActressWork(page);
    }
  },
  components: {

    ArtworkCard
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