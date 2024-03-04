import { strVal } from "@paroi/data-formatters-lib"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { applyMission, findOneMission } from "../helpers/mission-helpers"
import { Mission } from "../store/mission-slice"
import { AppSpinner } from "./app-spinner"

import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  SimpleGrid,
  Stack,
  StackDivider,
  Text,
  VStack,
  useColorModeValue
} from '@chakra-ui/react'
import { useAppStore } from "../store/app-store"
import { AppCarousel } from "./carousel"


export function PreviewMission() {
  const { id } = useParams()
  const [mission, setMission] = useState<Mission | undefined>(undefined)

  const syncMission = async () => {
    setMission(await findOneMission(strVal(id)))
  }

  useEffect(() => {
    syncMission().catch(console.error)
  }, [])

  if (!mission) {
    return <AppSpinner />
  }
  return <MissionView mission={mission} refresh={syncMission} />
}


export default function MissionView({ mission, refresh }: { mission: Mission, refresh: () => Promise<void> }) {
  const { account } = useAppStore()


  const apply = () => applyMission(mission, refresh, account!)

  return (
    <Container maxW={'7xl'}>
      <SimpleGrid
        columns={{ base: 1, lg: 2 }}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 18, md: 24 }}>
        <Flex>
          <AppCarousel />
        </Flex>
        <Stack spacing={{ base: 6, md: 10 }}>
          <Box as={'header'}>
            <Heading
              lineHeight={1.1}
              fontWeight={600}
              fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}>
              {mission.name}
            </Heading>
            <Text
              color={useColorModeValue('gray.900', 'gray.400')}
              fontWeight={300}
              fontSize={'2xl'}>
              {mission.salary.min} {mission.salary.currency} / {mission.salary.type}
            </Text>
          </Box>

          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={'column'}
            divider={
              <StackDivider borderColor={useColorModeValue('gray.200', 'gray.600')} />
            }>
            <VStack spacing={{ base: 4, sm: 6 }}>
              <Text
                color={useColorModeValue('gray.500', 'gray.400')}
                fontSize={'2xl'}
                fontWeight={'300'}>{mission.enterprise.name}
              </Text>
              <Text fontSize={'lg'}>
                {mission.description}
              </Text>
            </VStack>


          </Stack>

          <Button
            onClick={apply}
            rounded={'none'}
            w={'full'}
            mt={8}
            size={'lg'}
            py={'7'}
            bg={useColorModeValue('gray.900', 'gray.50')}
            color={useColorModeValue('white', 'gray.900')}
            textTransform={'uppercase'}
            _hover={{
              transform: 'translateY(2px)',
              boxShadow: 'lg',
            }}>
            Apply
          </Button>
        </Stack>
      </SimpleGrid>
    </Container>
  )
}