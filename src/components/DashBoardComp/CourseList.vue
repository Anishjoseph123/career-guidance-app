<template>
  <div>
    <v-card elevation="0">
      <v-toolbar elevation="0">
        <v-card-title class="text-uppercase">Courses</v-card-title>
        <v-spacer></v-spacer>
        <v-col cols="3" lg="2" md="6" xl="6" sm="12" xs="12" class="mt-6">
          <v-text-field
            label="Search Courses"
            outlined
            dense
            solo
            rounded
            color="secondary"
            v-model="search"
          >
            <template v-slot:prepend-inner>
              <v-icon small color="success"> mdi-magnify </v-icon>
            </template>
          </v-text-field></v-col
        ></v-toolbar
      >
      <v-card-text>
        <v-data-table
          dense
          :headers="headers"
          :items="courseList"
          :fixed-header="true"
          :search="search"
          :items-per-page="15"
        >
          <template v-slot:[`item.sl_no`]="{ item }">
            <span class="caption">{{ courseList.indexOf(item) + 1 }}</span>
          </template>
          <template v-slot:[`item.courses_name`]="{ item }">
            <span>
              <v-icon small>{{ item.courses_icons }}</v-icon></span
            >
            <span class="font-weight-bold ml-2">{{ item.courses_name }}</span>
            <span>({{ item.courses_short_name }})</span>
          </template>

          <template v-slot:[`item.courses_college_count`]="{ item }">
                <div
                  v-if="item.courses_college_count"
                 
                  class="FontSize"
                >
                  {{ item.courses_college_count }}
                </div>
          </template>
         
          <template v-slot:[`item.action`]="{ item }">
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
            <v-icon v-on="on" @click="CheckEachItem(item)" small color="success"
              >mdi-eye</v-icon
            >
            </template>
            <span>View Colleges</span>
            </v-tooltip>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
    <CollegeDialog
      :clgDetails="clgDetails"
      :Storeobj="Storeobj"
      @clicked="Closepovdetails"
    />
  </div>
</template>

<script>
import axios from "axios";
import CollegeDialog from "../Extras/Dialogs/CollegeDialog.vue";
export default {
  components: {
    CollegeDialog,
  },
  data: () => ({
    Storeobj: {},

    clgDetails: false,
    search: "",
    headers: [
      { text: "SL NO.", value: "sl_no" },
      // { text: "Icon", value: "courses_icons" },
      { text: "Courses", value: "courses_name" },
      // { text: "Courses Short name", value: "courses_short_name" },
      // { text: "Courses rating", value: "courses_rating" },
      // { text: "Courses Status", value: "courses_status" },
      { text: "College Count", value: "courses_college_count" },
      { text: "View Details", value: "action", sortable: false },
    ],
    courseList: [],
  }),
  mounted() {
    this.courseLists();
  },
  methods: {
    view() {
      this.$router.push("/Colleges");
    },
    courseLists() {
      axios(
        "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          data: {
            user_email_id: "xxxxxxxxxxxxxxxxxm",
            command: "listCourses",
          },
        }
      )
        .then((res) => {
          console.log(res);
          if (res.data) {
            this.courseList = res.data.data;

            console.log("courseList", this.courseList);
          }
        })
        .catch((err) => console.log(err));
    },

    Closepovdetails(Toggle) {
      if (Toggle == 1) {
        this.clgDetails = false;
      }
    },

    CheckEachItem(item) {
      this.Storeobj = item;
      this.clgDetails = true;
    },
  },
};
</script>

<style>
#right_arrow {
  position: relative;
  transition: transform 0.3s ease-in-out;
}

#right_arrow:hover {
  transform: translateX(10px);
  color: gold;
}
.v-data-table-header th {
  white-space: nowrap;
}
</style>
