import Vue from "vue";
import VueRouter from "vue-router";
import LoginForm from "../views/AuthComponents/LoginForm.vue";
import LandingPage from "@/views/AuthComponents/LandingPage";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: LoginForm,
  },
  {
    path: "/SignUp",
    component: () => import("@/views/AuthComponents/CreateAccount.vue"),
  },
  {
    path: "/LandingPage",
    component: LandingPage,
    children: [
      {
        path: "/Courses",
        component: () => import("@/components/DashBoardComp/CourseList.vue"),
      },
    ],
  },
  {
    path: "/Colleges",
    component: () => import("@/components/DashBoardComp/CollegeList.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
