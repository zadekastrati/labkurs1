// Material Dashboard 2 React layouts
import Dashboard from "layouts/dashboard";
import Users from "layouts/users";
import Roles from "layouts/roles";
import Trainers from "layouts/trainers";
import Notifications from "layouts/notifications";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import Course from "layouts/courses";
import Categories from "layouts/categories"; // Import Categories

// @mui icons
import Icon from "@mui/material/Icon";

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
  },  
  {
    type: "collapse",
    name: "Users",
    key: "users",
    icon: <Icon fontSize="small">persons</Icon>,
    route: "/users",
    component: <Users />,
  },
  {
    type: "collapse",
    name: "Roles",
    key: "roles",
    icon: <Icon fontSize="small">persons</Icon>,
    route: "/roles",
    component: <Roles />,
  },
  {
    type: "collapse",
    name: "Trainers",
    key: "trainers",
    icon: <Icon fontSize="small">book</Icon>,
    route: "/trainers",
    component: <Trainers />,
  },
  {
    type: "collapse",
    name: "Courses",
    key: "courses",
    icon: <Icon fontSize="small">school</Icon>,
    route: "/courses",
    component: <Course />,
  },
  {
    type: "collapse",
    name: "Categories",
    key: "categories",
    icon: <Icon fontSize="small">category</Icon>,
    route: "/categories",
    component: <Categories />,
  },
  {
    type: "collapse",
    name: "Profile",
    key: "profile",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/profile",
    component: <Profile />,
  },
  {
    type: "collapse",
    name: "Notifications",
    key: "notifications",
    icon: <Icon fontSize="small">notifications</Icon>,
    route: "/notifications",
    component: <Notifications />,
  },
  {
    type: "collapse",
    name: "Sign In",
    key: "sign-in",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/authentication/sign-in",
    component: <SignIn />,
  },
];

export default routes;
