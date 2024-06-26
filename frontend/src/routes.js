// routes.js
import Dashboard from "layouts/dashboard";
import Users from "layouts/users";
import Roles from "layouts/roles";
import Trainers from "layouts/trainers";
import Certificates from "layouts/certificates";
import Course from "layouts/courses";
import Categories from "layouts/categories";
import Students from "layouts/students";
import City from "layouts/city";
import Assignments from "layouts/assignments";
import Exam from "layouts/exam";
// @mui icons
import Icon from "@mui/material/Icon";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser, faGears, faCity, faPersonChalkboard,faPencilAlt } from '@fortawesome/free-solid-svg-icons';

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
    icon: <FontAwesomeIcon icon={faPersonChalkboard} />,
    route: "/trainers",
    component: <Trainers />,
  },
  {
    type: "collapse",
    name: "Certificates",
    key: "certificates",
    icon: <Icon fontSize="small">book</Icon>,
    route: "/certificates",
    component: <Certificates />,
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
    key: "city",
    icon: <FontAwesomeIcon icon={faCity} />,
    route: "/city",
    component: <City />,
  },
  {
    type: "collapse",
    name: "Assignments",
    key: "assignments",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/assignments",
    component: <Assignments />,
  },
  {
    type: "collapse",
    name: "Exam",
    key: "exam",
    icon: < FontAwesomeIcon icon={faPencilAlt}/>,
    route: "/exam",
    component: <Exam />,
  },
];

export default routes;
