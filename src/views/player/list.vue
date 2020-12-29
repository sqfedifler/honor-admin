<template>
  <div class="app-container">
    <!-- 过滤条件 -->
    <div class="filter-container">
      <el-input
       v-model="listQuery.accountname"
       :placeholder="$t('player.accountname')"
       style="width:200px"
       @keyup.enter.native="handleFilter"
      ></el-input>
      <el-button type="primary" icon="el-icon-search" @click="handleFilter">
        {{$t('player.btnFilter')}}
      </el-button>
    </div>
    <el-table
      v-loading="listloading"
      :data="list"
      border
      fit
      highlight-current-row
      style="100%"
    >
      <el-table-column label="ID" align="center">
        <template v-slot="{row}">
          {{ row.id }}
        </template>
      </el-table-column>
      <el-table-column label="账户名" align="center">
        <template v-slot="{row}">
          {{ row.accountname }}
        </template>
      </el-table-column>
      <el-table-column label="等级" align="center">
        <template v-slot="{row}">
          {{ row.level }}
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <pagination
     v-total="total>0"
     :total="total"
     :page.sync="listQuery.page"
     :limit.sync="listQuery.limit"
     @pagination="getList"
    ></pagination>
  </div>
</template>

<script lang="ts">
/* eslint-disable */
/* tslint:disable */
import { Component, Vue } from "vue-property-decorator";
import { component } from "vue/types/umd";
import { getPlayers } from "../../api/players";
import { Player } from "../../api/types";
import Pagination from "../../components/Pagination/index.vue";

@Component({
  name:'PlayList',
  components:{
   Pagination
  }
})
export default class extends Vue {
  //玩家的列表数据
  list: Player[] = [];
  listloading = true;
  //总条目数
  total=0;

  //查询条件
  listQuery={
    page:1,
    limit:10,
    accountname:""
  }
  created() {
    console.log("进入");
    this.getList();
  }
  //获取列表
  async getList() {
    this.listloading = true;
    const { data } = await getPlayers(this.listQuery);
    console.log(data);
    this.list = data.players;
    this.total=data.total;
    this.listloading = false;
  }
  //过滤的处理
  handleFilter(){
    //重置页码
    this.listQuery.page=1;
    this.getList()


  }
}
</script>
