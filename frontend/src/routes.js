// Material Dashboard 2 React layouts
import Dashboard from "layouts/dashboard";
import Users from "layouts/users";
import Roles from "layouts/roles";
import Trainers from "layouts/trainers";
import Course from "layouts/courses";
import Categories from "layouts/categories";
import Students from "layouts/students";
import City from "layouts/city";
// @mui icons
import Icon from "@mui/material/Icon";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { faGears } from '@fortawesome/free-solid-svg-icons';

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
    icon: <FontAwesomeIcon icon={faCircleUser} />,
    route: "/users",
    component: <Users />,
  },
  {
    type: "collapse",
    name: "Roles",
    key: "roles",
    icon: <FontAwesomeIcon icon={faGears} />,
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
    name: "Students",
    key: "students",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/students",
    component: <Students />,
  },
  {
    type: "collapse",
    name: "City",
    key: "City",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/city",
    component: <City />,
  },
];

export default routes;
