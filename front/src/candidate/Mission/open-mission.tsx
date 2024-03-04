import { Badge, CircularProgress, IconButton, Menu, MenuButton, MenuItem, MenuList, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { AiFillDislike, AiFillLike } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import { IoEyeOutline } from "react-icons/io5";
import { LuCircleOff } from "react-icons/lu";
import { TiArrowForwardOutline } from "react-icons/ti";
import { useNavigate } from "react-router-dom";
import { applyMission, findAllMission } from "../../helpers/mission-helpers";
import { useAppStore } from "../../store/app-store";
import { Mission } from "../../store/mission-slice";

export function OpenedMissionTable() {
  const { account } = useAppStore()

  const [isLoading, setLoading] = useState(true)
  const navigate = useNavigate();
  const [missions, setMissions] = useState<Mission[]>([])

  const syncMissions = async () => {
    setMissions(await findAllMission('open'))
    setLoading(false)
  }

  useEffect(() => {
    syncMissions().catch(console.error)
  }, [])

  if (isLoading) return <CircularProgress />

  const previewMission = (id: string) => navigate(`/missions/${id}`)

  return <TableContainer>
    <Table variant='simple'>
      <Thead>
        <Tr>
          <Th>Post</Th>
          <Th>Enterprise</Th>
          <Th>Applications</Th>
          <Th>Created at</Th>
          <Th>Status</Th>
          <Th>Actions</Th>
        </Tr>
      </Thead>
      <Tbody>
        {
          missions.map(item => <Tr key={item.id}>
            <Td>{item.name}</Td>
            <Td>{item.enterprise.name}</Td>
            <Td>{item.applications.length}</Td>
            <Td>{item.createdAt}</Td>
            <Td><Badge colorScheme="green">{item.status}</Badge></Td>
            <Td>
              <Menu>
                <MenuButton
                  as={IconButton}
                  aria-label='Options'
                  icon={<BsThreeDots />}
                  variant='outline'
                />
                <MenuList>
                  <MenuItem icon={<IoEyeOutline />} onClick={() => previewMission(item.id)}>
                    View
                  </MenuItem>

                  <MenuItem icon={<TiArrowForwardOutline />} onClick={
                    () => applyMission(item, syncMissions, account!)}
                  >
                    Apply
                  </MenuItem>
                  <MenuItem icon={<LuCircleOff />}>
                    Cancel
                  </MenuItem>
                  <MenuItem icon={<AiFillLike />} >
                    Like
                  </MenuItem>
                  <MenuItem icon={<AiFillDislike />} >
                    Dislike
                  </MenuItem>
                </MenuList>
              </Menu>

            </Td>
          </Tr>)
        }
      </Tbody>
    </Table>
  </TableContainer>
}