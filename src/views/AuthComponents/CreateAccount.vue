<template>
  <div>
    <SnackBar :SnackBarComponent="SnackBarComponent" />
    <v-layout justify-center align-center>
      <v-card
        rounded="lg"
        outlined
        height="auto"
        width="500"
        style="margin-top: 150px"
      >
        <v-card-text>
          <v-form ref="forms" lazy-validation>
            <v-row dense>
              <v-col cols="12" lg="12" md="12" xs="12" xl="12" sm="12">
                <v-text-field
                  dense
                  outlined
                  rounded
                  v-model="userName"
                  label="Full Name"
                  append-icon="mdi-account"
                ></v-text-field>
              </v-col>
              <v-col cols="12" lg="12" md="12" xs="12" xl="12" sm="12">
                <v-text-field
                  dense
                  outlined
                  rounded
                  label="Email ID"
                  append-icon="mdi-email"
                  v-model="userMail"
                ></v-text-field>
              </v-col>
              <v-col cols="12" lg="12" md="12" xs="12" xl="12" sm="12">
                <v-text-field
                  dense
                  outlined
                  rounded
                  label="Password"
                  :type="show2 ? 'text' : 'password'"
                  @click:append="show2 = !show2"
                  :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                  v-model="passWord"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-btn color="success" block rounded depressed @click="signup()"
              >Create Account</v-btn
            >
            <v-row class="mt-4">
              <v-layout align-center justify-center> 
              <span class=" black--text">Already a Member?</span>
              <v-btn small class="mt-n1" text color="primary" to="/"
                >Login</v-btn
              ></v-layout>
            </v-row>
          </v-form>
        </v-card-text>
      </v-card>
    </v-layout>
  </div>
</template>

<script>

import axios from "axios";
import SnackBar from "@/components/Extras/SnackBar.vue";
export default {
  data: () => ({
    show2:false,
    userMail: "",
    userName: "",
    passWord: "",
     SnackBarComponent: false,
  }),
  methods: {
    signup() {
      axios(
        "https://o0l432ggja.execute-api.ap-south-1.amazonaws.com/dev/register_user",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          data: {
            user_email_id: this.userMail,
            user_name: this.userName,
            password: this.passWord,
            command: "registerUser",
          },
        }
      )
        .then((data) => {
          console.log("response",data);
          if (data.data.Status == "SUCCESS") {
            this.SnackBarComponent = {
              SnackbarVmodel: true,
              SnackbarColor: "green",
              SnackbarText: "Account Created Successfully",
              Top: true,
            };

            this.$router.push("/");
          }
          // else{
          //   this.SnackBarComponent = {
          //     SnackbarVmodel: true,
          //     SnackbarColor: "error",
          //     SnackbarText: "Please Fill All the Fields.",
          //     Top: true,
          //   };
          // }
        })
        .catch((err) => {
    
            this.SnackBarComponent = {
              SnackbarVmodel: true,
              SnackbarColor: "error",
              SnackbarText:"Please Fill All the fields.",
              Top: true,
            };
          console.log(err);
        });
    },
  },
  components: {
    SnackBar,
  },
};
</script>

<style></style>
