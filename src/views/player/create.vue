<template>
  <div>
      <!-- 创建一个player edit -->
      <player-detail :isedit="false"></player-detail>
  </div>
</template>

<script lang="ts">
/* eslint-disable */
/* tslint:disable */
import { Component, Vue } from "vue-property-decorator";
import { component } from "vue/types/umd";
import PlayerDetail from "./components/playerdetail.vue";

@Component({
  components:{
    PlayerDetail
  }

})
export default class extends Vue {

}
</script>
