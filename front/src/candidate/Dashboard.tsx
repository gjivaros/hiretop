'use client'

import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons'
import {
  Box,
  Flex,
  HStack,
  Heading,
  IconButton,
  Stack,
  useColorModeValue,
  useDisclosure
} from '@chakra-ui/react'
import { BiMessage } from 'react-icons/bi'
import { GrNotification } from 'react-icons/gr'
import { OpenedMissionTable } from './Mission/open-mission'
import { Profil } from './Profil'

interface Props {
  children: React.ReactNode
}

const Links = ['Dashboard']

const NavLink = (props: Props) => {
  const { children } = props

  return (
    <Box
      as="a"
      px={2}
      py={1}
      rounded={'md'}
      _hover={{
        textDecoration: 'none',
        bg: useColorModeValue('gray.200', 'gray.700'),
      }}
      href={'#'}>
      {children}
    </Box>
  )
}

export function CandidateDashboard() {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Box px={4} borderBottom={"1px solid grey"}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <Box>
              <Heading fontSize="19px">Talent</Heading>
            </Box>

          </HStack>
          <Flex alignItems={'center'}>
            <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </HStack>
            <IconButton icon={<BiMessage />} aria-label='notifcation' mr={4} ml={4} isActive />
            <IconButton icon={<GrNotification />} aria-label='notifcation' mr={4} isActive />
            <Profil />
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>

      <Box p={10}>
        <Heading>Dashboard</Heading>
        <OpenedMissionTable />
      </Box>
    </>
  )
}



