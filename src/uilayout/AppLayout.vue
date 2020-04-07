<template>
  <!--    <section class="section app-layout">-->
  <!--&lt;!&ndash;        <div class="container">&ndash;&gt;-->
  <!--            <div class="columns">-->
  <!--                &lt;!&ndash; app-left &ndash;&gt;-->
  <!--                <div class="column is-8">-->
  <!--                    <slot name="app-content"></slot>-->
  <!--                </div>-->
  <!--                &lt;!&ndash; app-right &ndash;&gt;-->
  <!--                <div class="column is-4">-->
  <!--                    <slot name="app-sidebar"></slot>-->
  <!--                </div>-->
  <!--            </div>-->
  <!--&lt;!&ndash;        </div>&ndash;&gt;-->
  <!--    </section>-->
  <section class="">
    <!--        <div class="container">-->
    <el-row>
      <el-col :span="16">
        <slot name="app-content"></slot>
      </el-col>
      <el-col :span="8">
        <slot name="app-sidebar"></slot>
      </el-col>
    </el-row>
  </section>

</template>

<script>
  export default {
    name: 'AppLayout',
    data() {
      return {};
    },
  }
</script>

<style>
  body {
    background-color: #fdfdfd;
    font-family: "Segoe UI", Arial, Helvetica, "Microsoft Jhenghei",
    "Hiragino Sans GB", "WenQuanYi Zen Hei", "Microsoft Yahei",
    SimHei, STHeiti, "WenQuanYi Micro Hei", sans-serif;
  }

  .app-layout {
    padding-top: 1rem;
    padding-bottom: 1rem;
  }
</style>
