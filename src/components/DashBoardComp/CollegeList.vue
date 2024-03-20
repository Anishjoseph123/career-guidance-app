<template>
  <div>
    <v-card class="elevation-0">
      <v-toolbar class="elevation-0" height="100" dense flat>
        <v-card-title class="text-uppercase mr-4">Colleges</v-card-title>

        <v-spacer></v-spacer>
        <v-col cols="6" lg="2" md="2" xl="2" sm="12" xs="12">
          <v-text-field
            outlined
            dense
            solo
            rounded
            color="black"
            class="mt-9"
            v-model="search"
            label="Search Colleges"
          >
            <template v-slot:prepend-inner>
              <v-icon small color="success"> mdi-magnify </v-icon>
            </template></v-text-field
          >
        </v-col>
        <v-btn
          depressed
          rounded
          class="mt-3"
          color="secondary"
          dark
          to="/Courses"
          ><v-icon small>mdi-arrow-left</v-icon>Back</v-btn
        >
      </v-toolbar>
      <v-app-bar flat elevation="0" color="white">
        <v-row class="">
          <v-chip class="ml-8" dark outlined color="brown">
            <v-icon>mdi-filter</v-icon>
            All Filter
          </v-chip>
          <v-chip-group
            class="ml-4 white--text"
            column
            multiple
            active-class="success white--text"
            v-for="name in tags"
            :key="name"
          >
            <v-chip small @click="add_chip">
              {{ name }}<v-icon right>mdi-chevron-down</v-icon></v-chip
            >
          </v-chip-group>

          <v-col
            v-for="(selection, i) in selections"
            :key="selection.text"
            class="shrink"
          >
            <v-chip
              :disabled="loading"
              close
              @click:close="selected.splice(i, 1)"
            >
              <v-icon left>{{ slection.icon }}</v-icon>
              {{ selection.text }}
            </v-chip>
          </v-col>
        </v-row>
        <v-btn text color="secondary" class="mt-6 text-capitalize"
          >Clear All <v-icon dark small>mdi-close</v-icon></v-btn
        >
      </v-app-bar>
      <v-card-text class="py-0">
        <v-row>
          <v-col cols="12" lg="6">
            <v-data-table
              :headers="headers"
              :fixed-header="true"
              :items="clgList"
              dense
              height="height"
              style="border: 1px solid transparent"
              :items-per-page="10"
              :hide-default-footer="clgList.length == 0"
              :search="search"
            >
              <template v-slot:[`item.clg_name`]="{ item }">
                <span
                  @click="detailCard = true"
                  class="caption font-weight-bold"
                  >{{ item.clg_name }}</span
                >
                <div>
                  <span text class="caption">{{ item.clg_loc }}</span>
                </div>
              </template>
              <template v-slot:[`item.sl_no`]="{ item }">
                <span class="caption">{{ clgList.indexOf(item) + 1 }}</span>
              </template>
              <template v-slot:[`item.action`]="{ item }">
                <v-card-actions>
                  <v-btn icon>
                    <v-icon color="success" @click="view1(item)"
                      >mdi-dots-horizontal</v-icon
                    >
                  </v-btn>
                </v-card-actions>
              </template>
            </v-data-table>
          </v-col>
          <v-col cols="6" lg="6" class="mt-2">
            <v-card height="auto" width="750" v-model="detailCard">
              <v-toolbar flat>
                <v-card-title>College Details</v-card-title>
              </v-toolbar>
              <v-card-text>
                <v-row>
                  <v-col cols="6" lg="6">
                    <v-img
                      src="../../assets/logo.png"
                      alt="img"
                      height="200"
                      width="350"
                      style=""
                      contain
                    ></v-img>
                  </v-col>
                  <v-col cols="6" lg="6">
                    <v-img
                      src="https://www.google.com/maps/vt/data=X68v1FluivdmecClILQePGtrsYmz_Vd-TZ1850-mITLgZXaXu3z4WPgX4d13lfhDBZ9NAZDFMvemY1-ey3isFzSf1E9i3iToTCnWXtYkTg2_W2V2pP_WxOVQlzzvwEg84Bwb4oxyHevq0MpJDqTc2YBxx_pzdrwvcx1_x4qO9pJ0ue2G5_pxhIvgVPH3MSKZ0OVW-Cvq6QaLNB6gfRMTZYuVNGT62oAzy3z5_tG2DMPLEXxIO3bJ6vqIDUv9kp6oilJOaGX9kPL51-I"
                      alt="imm"
                      height="300"
                      width="500"
                      contain
                    ></v-img>
                  </v-col>
                  <span class="subtitle-2 black--text"
                    >Address: No: 588, Vidyaranyapura Main Rd, next to
                    UNLIMITED, HMT Layout, Bengaluru, Karnataka 560097 Hours:
                    Open now · Add full hours Suggest an edit · Own this
                    business? Add missing information Add place's phone number
                    Add business hours
                  </span>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row></v-card-text
      >
    </v-card>
    <v-dialog
      v-model="clgInfoDialog"
      persistent
      max-width="400"
      transition="scroll-y-reverse-transition"
    >
      <v-card flat height="auto">
        <v-toolbar elevation="0">
          <v-card-title>
            <div>College Name</div>
          </v-card-title>
          <v-spacer></v-spacer>
          <v-btn icon dark @click="clgInfoDialog = false" color="primary"
            ><v-icon>mdi-close</v-icon></v-btn
          >
        </v-toolbar>
        <v-card-text>
          <v-tabs>
            <v-tab>More Info</v-tab>
            <v-tab>Ratings & Reviews</v-tab>
          </v-tabs>
          <v-tabs-items>
            <v-tab-item>
              <h2>Hello</h2>
            </v-tab-item>
            <v-tab-item>
              <h3>HI</h3>
            </v-tab-item>
          </v-tabs-items>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data: () => ({
    selectedChips: [],
    search: "",
    height: 0,
    detailCard: true,
    clgInfoDialog: false,
  }),
  methods: {
    view() {
      // this.clgInfoDialog = true;
      this.detailCard = true;
    },
    view1() {
      this.clgInfoDialog = true;
    },
    add_chip() {
      this.selectedChips.push(this.tags);
    },
  },
  mounted() {
    this.height = window.innerHeight - 450;
  },
};
</script>

<style>
.v-data-table-header th {
  white-space: nowrap;
}
</style>
