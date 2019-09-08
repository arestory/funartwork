<template>
  <div>
    <el-dialog :title="artwork.title"
               :visible.sync="visible"
               @close="close"
               width="80%"
               v-loading="gettingData"
               :show="show">

      <el-card>

        <el-image :src="detail.coverPhotoUrl" />
        <div>车牌：{{detail.code}}</div>
        <div>时长：{{detail.duration}}</div>
        <div style="margin:10px">演员列表</div>
        <div class="card-layout">
          <div style="margin-left:15px;margin-top:20px"
               v-for="male in detail.actresses"
               :key="male.name">
            <ActressCard :actress="male" />
          </div>
        </div>

        <div style="margin:10px">画廊</div>
        <div v-show="detail.samplePhotos.length==0">暂无图片</div>

        <div class="card-layout">
          <div v-for="url in detail.samplePhotos"
               :key="url">
            <el-image :src="url"
                      fit="contain"
                      style="width: 100px; height: 100px;margin:10px"
                      :preview-src-list="detail.samplePhotos">
              <div slot="placeholder"
                   class="image-slot">
                <el-image src="https://pics.dmm.co.jp/mono/actjpgs/nowprinting.gif" />
              </div>
            </el-image>
          </div>
        </div>

        <div style="margin:10px">下载链接</div>
        <div v-show="downloadUrlList.length==0">暂无下载链接</div>
        <el-card v-for="item in downloadUrlList"
                 v-loading="gettingDownloadUrl"
                 :key="item.magnet">
          <div>
            {{item.name}}
          </div>
          <div>
            发布时间：{{item.date}}
          </div>
          <a :href="item.magnet">
            {{item.magnet}}
          </a>
        </el-card>
        <div style="margin:10px">类似作品</div>
        <div class="card-layout">
          <div v-for="work in detail.relateArtWorkList"
               class="card-box "
               :key="work.code">
            <div>{{work.code}}</div>
            <el-image :src="work.coverPhotoUrl"
                      fit="contain"
                      style="width: 100px; height: 100px;margin:10px">
              <div slot="placeholder"
                   class="image-slot">
                <el-image src="https://pics.dmm.co.jp/mono/actjpgs/nowprinting.gif" />
              </div>
            </el-image>
          </div>
        </div>
      </el-card>
    </el-dialog>
  </div>
</template>

<script>
import { getArtworkDetail, getDownloadUrl } from "../api/ArtworkApi";
import ActressCard from './ActressCard'
export default {
  components: {
    ActressCard,
  },
  data () {
    return {
      gettingData: true,
      gettingDownloadUrl: true,
      visible: this.show,
      downloadUrlList: [],
      detail: {
        title: "",
        coverPhotoUrl: "",
        code: "",
        date: "",
        duration: "",
        actresses: [
          {
            id: "",
            name: "",
            avatar: "",
            workListUrl: ""
          }
        ],
        samplePhotos: [],
        relateArtWorkList: [
          {
            title: "",
            code: "",
            url: "",
            coverPhotoUrl: ""
          }
        ]
      }
    };
  },
  mounted () {

  },
  methods: {


    close () {

      this.show = false;
    }
  },
  props: {
    artwork: {
      type: Object,
      default: {

      }
    },
    show: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    show (val) {
      this.visible = this.show;
      if (this.visible) {
        getArtworkDetail(this.artwork.code, res => {


          this.gettingData = false;
          this.detail = res;
          console.log(res);
        });
        this.gettingDownloadUrl = true;
        getDownloadUrl(this.artwork.code, res => {

          console.log(res);
          this.downloadUrlList = res;
          this.gettingDownloadUrl = false;

        });

      }
    }
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
.card-box {
  width: 120px;
  box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.2);
  margin: 10px;
}
</style>