<template>
  <div>
    <v-dialog :value="clgDetails" transition="dialog-top-transition" fullscreen>
      <v-card class="elevation-0">
        <Overlay :overlay="overlay" />
        <v-toolbar class="elevation-0" dark dense color="success">
          <span>College Lists</span>

          <v-spacer></v-spacer>
          <v-btn icon @click="Closepovdetails((Toggle = 1))">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card>
          <v-card-text>
            <v-data-table
              :headers="headers"
              :items="collegeList"
              fixed-header
              height="590px"
            >
              <template v-slot:[`item.sl_no`]="{ item }">
                <span class="caption">{{ collegeList.indexOf(item) + 1 }}</span>
              </template>
              <template v-slot:[`item.org_logo`]="{ item }">
                <v-img
                  height="50"
                  width="50"
                  :src="item.org_logo"
                  style="border-radius: 50%"
                ></v-img>
              </template>

              <template v-slot:[`item.Action`]="{ item }">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <div v-on="on" class="FontSize">
                      {{ item.Action }}
                      <v-icon @click="CheckEachItem(item)" small color="success"
                        >mdi-eye</v-icon
                      >
                    </div>
                  </template>
                  <span>View Colleges</span>
                </v-tooltip>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: {
    clgDetails: Boolean,
    Storeobj: Object,
  },
  data: () => ({
    collegeList: [],

    headers: [
      { text: "SL NO.", value: "sl_no", sortable: false },
      { text: "College Name", value: "college_name", sortable: false },
      { text: "Location", value: "college_place", sortable: false },
      { text: "Rating", value: "college_rating", sortable: false },
      { text: "Logo", value: "org_logo", sortable: false },
      { text: "Courses Offered", value: "courses_offered", sortable: false },
      { text: "Action", value: "Action", sortable: false },
    ],
  }),
  watch: {
    clgDetails(val) {
      if (val == true) {
        console.log("fdsgfdfg", val);
        this.get_colleges();

        console.log("dfvdfg", this.Storeobj);
      }
    },
  },
  methods: {
    Closepovdetails(Toggle) {
      this.$emit("clicked", Toggle);
    },
    get_colleges() {
      axios(
        "https://o0l432ggja.execute-api.ap-south-1.amazonaws.com/dev/list_colleges",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          data: {
            command: "listColleges",
            course_name: this.Storeobj.courses_name,
          },
        }
      )
        .then((res) => {
          if (res.data) {
            this.collegeList = res.data.data;
            console.log("Colleges", this.collegeList);
          }
        })
        .catch((error) => console.log(error));
    },
  },
};
</script>

<style>
.v-data-table-header th {
  white-space: nowrap;
}
</style>
