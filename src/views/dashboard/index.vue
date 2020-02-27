<template>
  <div class="dashboard-container">
    <!--   class=" app-container"-->
    <app-layout>
      <app-content slot="app-content"></app-content>
      <app-sidebar slot="app-sidebar"></app-sidebar>
    </app-layout>
  </div>
</template>


<script>
  import AppLayout from "../../uilayout/AppLayout";
  import AppContent from "../../uilayout/AppContent";
  import AppSidebar from "../../uilayout/AppSidebar";

  export default {
    name: 'Dashboard',
    components: {
      AppLayout,
      AppContent,
      AppSidebar
    }
  }
</script>

<style lang="scss" scoped>
  .dashboard {
    &-container {
      margin: 30px;
    }

    &-text {
      font-size: 30px;
      line-height: 46px;
    }
  }
</style>
