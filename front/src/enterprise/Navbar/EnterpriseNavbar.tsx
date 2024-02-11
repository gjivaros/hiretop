import { AddIcon } from "@chakra-ui/icons";
import { GridItem, Heading, List, ListIcon, ListItem, Text } from "@chakra-ui/react";
import { FiUsers } from "react-icons/fi";
import { HiOutlineFolderOpen } from "react-icons/hi";
import { MdBroadcastOnHome, MdGraphicEq } from "react-icons/md";

const TOP_MENU = [
  {
    name: 'Home',
    icon: MdBroadcastOnHome
  },
  {
    name: 'Jobs',
    icon: HiOutlineFolderOpen
  },
  {
    name: 'Candidates',
    icon: FiUsers
  },
  {
    name: 'Report',
    icon: MdGraphicEq
  },
]

const BOTOM_MENU = [
  {
    name: 'New job posting',
    icon: AddIcon
  },

]
export function EnterpriseNavbar() {
  return <GridItem rowSpan={2} colSpan={1} padding={15} >
    <Heading as="h3">Google</Heading>
    <Text fontSize='xl'>Europe, Paris</Text>

    <List spacing={4} fontSize={20} mt={20}>
      {
        TOP_MENU.map(item => <ListItem p="1" _hover={{ bg: "#e2e8f0", fontWeight: '700' }} cursor="pointer">
          <ListIcon as={item.icon} />
          {item.name}
        </ListItem>)
      }
    </List>

    <List spacing={4} fontSize={20} mt="90%">
      {
        BOTOM_MENU.map(item => <ListItem p="1" bg="black" color="lightgrey" textAlign="center" borderRadius={8} cursor="pointer">
          <ListIcon as={item.icon} />
          {item.name}
        </ListItem>)
      }
    </List>

  </GridItem>
}