<template>
  <div>
    <v-app-bar  dense color="#178C27FF">
      <v-toolbar-title  style="width: 10%;">
      <v-img src="../../assets/logo.jpg" contain height="45" width="100"></v-img></v-toolbar-title>
      <v-tabs
       
        slider-color="yellow"
        active-class="white--text"
        v-model="tab"
      >
        <v-tab>Courses</v-tab>
        <!-- <v-tab>Settings</v-tab> -->
      </v-tabs>
      <v-spacer></v-spacer>
      <span class="caption"
        >{{ $store.getters.get_user_mail }}anish@mobil80.com</span
      >
      <v-btn icon to="/"><v-icon color="error" dark>mdi-logout</v-icon></v-btn>
    </v-app-bar>
    <v-tabs-items v-model="tab">
      <v-tab-item>
        <CourseList />
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import CourseList from "@/components/DashBoardComp/CourseList.vue";
export default {
  data: () => ({
    tab: null,
  }),
  components: {
    CourseList,
  },
};
</script>

<style></style>
