<template>
  <div :href="artwork.movieUrl"
       v-on:click="showDialog"
       class="movie-box">
    <el-image :src="artwork.photoUrl"
              lazy></el-image>
    <div class="content">{{artwork.title}}</div>
    <div class="date">
      <a class="movie-url"
         :href="artwork.movieUrl">{{artwork.code}}</a>
      /{{artwork.date}}
    </div>
    <ArtworkDialog :show.sync="dialogVisible"
                   :artwork="artwork" />
  </div>
</template>

<script>
import ArtworkDialog from "./ArtworkDialog";
export default {
  components: {
    ArtworkDialog
  },
  props: {
    artwork: {
      type: Object,
      default: {
        code: "bt-ma",
        title: "aaa",
        content: "",
        photoUrl: "",
        date: "",
        movieUrl: ""
      }
    }
  },
  methods: {
    showDialog () {
      this.dialogVisible = true;
    }
  },
  watch: {
    dialogVisible (val) {
      console.log(val);
    }
  },
  data () {
    return {
      dialogVisible: false
    };
  }
};
</script>

<style scoped>
.movie-box {
  cursor: pointer;
  width: 167px;
  box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.2);
  padding: 5px;
}
.content {
  font-size: 14px;
  color: #333;
}
.movie-url {
  color: #cc0000;
  font-size: 12px;
}
.date {
  color: #cc0000;
  font-size: 12px;
}
</style>