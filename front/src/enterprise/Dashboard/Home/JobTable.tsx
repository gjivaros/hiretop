import { Badge, Button, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { useEffect } from "react";
import { findAllMission } from "../../../helpers/mission-helpers";
import { useAppStore } from "../../../store/app-store";

function getStyle(status: string): string {
  const statusStyle = {
    open: 'green',
    pending: 'purple',
    closed: 'red',
    canceled: 'black'
  } as any

  return statusStyle[status]
}

export function JobTable() {
  const { missions, setMissions } = useAppStore()

  const syncMission = async () => {
    setMissions(await findAllMission())
  }

  useEffect(() => { syncMission().catch(console.error) }, [])

  return <TableContainer>
    <Table variant='simple'>
      <Thead>
        <Tr>
          <Th>Title</Th>
          <Th>Location</Th>
          <Th>Application</Th>
          <Th>Status</Th>
          <Th>Posted</Th>
          <Th>Action</Th>
        </Tr>
      </Thead>
      <Tbody>
        {
          missions.map(mission => <Tr key={mission.id}>
            <Td>{mission.name}</Td>
            <Td>{mission.localisation}</Td>
            <Td>{mission.applications.length}</Td>
            <Td ><Badge colorScheme={getStyle(mission.status)}>{mission.status}</Badge></Td>
            <Td  >{mission.createdAt}</Td>
            <Td ><Button>View</Button></Td>
          </Tr>)
        }
      </Tbody>
    </Table>
  </TableContainer>
}