import { AddIcon } from "@chakra-ui/icons";
import { Button, GridItem, List, ListIcon, ListItem } from "@chakra-ui/react";
import { BiLogOut } from "react-icons/bi";
import { FiUsers } from "react-icons/fi";
import { HiOutlineFolderOpen } from "react-icons/hi";
import { MdBroadcastOnHome, MdGraphicEq } from "react-icons/md";
import { Link } from "react-router-dom";
import { delToken } from "../../http-module/http-module";
import { CreateJob } from "../Dashboard/CreateJob/CreateJob";

const TOP_MENU = [
  {
    name: 'Home',
    icon: MdBroadcastOnHome,
    path: ''
  },
  {
    name: 'Jobs',
    icon: HiOutlineFolderOpen,
    path: '/enterprise/jobs'
  },
  {
    name: 'Candidates',
    icon: FiUsers,
    path: '/talents'
  },
  {
    name: 'Messenger',
    icon: MdGraphicEq,
    path: '/messenger'
  },
]

export function EnterpriseNavbar() {

  const logOut = () => {
    delToken()
    location.reload()
  }
  return <GridItem rowSpan={2} colSpan={1} padding={15} >
    <List spacing={4} fontSize={20} mt={20}>
      {
        TOP_MENU.map(item => <ListItem key={item.name} p="1" _hover={{ bg: "#e2e8f0", fontWeight: '700' }} cursor="pointer">
          <ListIcon as={item.icon} />
          <Link to={item.path}>{item.name}</Link>
        </ListItem>)
      }
    </List>

    <List spacing={4} fontSize={20} mt="90%">
      <CreateJob actionButton={(open) => <Button _hover={{ bg: 'black', color: "light" }} w="100%" bg="black" color="lightgrey" onClick={open} leftIcon={<AddIcon />}>New job posting</Button>} />
      <Button w="100%" leftIcon={<BiLogOut />} onClick={logOut}>Log out</Button>
    </List>

  </GridItem>
}