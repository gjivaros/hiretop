import { Avatar, Badge, Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { useAppStore } from "../store/app-store";

export function Profil() {
  const { setMode } = useAppStore()

  const toggle = () => {
    setMode("enterprise")
  }

  return <Menu>
    <MenuButton
      as={Button}
      rounded={'full'}
      variant={'link'}
      cursor={'pointer'}
      minW={0}>
      <Avatar
        size={'sm'}
        src={
          'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
        }
      />
    </MenuButton>
    <MenuList>
      <MenuItem>Log out</MenuItem>
      <MenuItem onClick={toggle}>
        <Badge>Mode Enterprise</Badge>
      </MenuItem>
    </MenuList>
  </Menu>
}