import { Badge, Button, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";


const jobs = [
  {
    id: "1",
    name: "Backend developer",
    location: 'Afrique/Togo',
    applications: 12,
    status: 'pending',
    posted: '2 weeks',
  },
  {
    id: "2",
    name: "Senior Backend developer",
    location: 'Afrique/Benin',
    applications: 9,
    status: 'open',
    posted: '2 months',
  },
  {
    id: "3",
    name: "Senior UI/UX developer",
    location: 'Afrique/Ghana',
    applications: 8,
    status: 'closed',
    posted: '2 days',
  },
]



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
          jobs.map(job => <Tr>
            <Td>{job.name}</Td>
            <Td>{job.location}</Td>
            <Td>{job.applications}</Td>
            <Td ><Badge colorScheme={getStyle(job.status)}>{job.status}</Badge></Td>
            <Td  >{job.posted}</Td>
            <Td ><Button>View</Button></Td>
          </Tr>)
        }
      </Tbody>
    </Table>
  </TableContainer>
}