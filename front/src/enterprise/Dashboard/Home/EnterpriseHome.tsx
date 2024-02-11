import { Box, Button, Flex, GridItem, Heading, Input } from "@chakra-ui/react";
import { HiringGraph } from "./HiringGraph";
import { JobTable } from "./JobTable";

export function EnterpriseHome() {
  return <>
    <GridItem colSpan={4}  >
      <Flex justifyContent="space-between" p={8}>
        <Heading>Welcome back Jivaros</Heading>
        <Button>Create new job</Button>
      </Flex>

      <Box border="1px solid black" p={5} borderRadius={8}>
        <Heading>Hiring activity</Heading>
        <HiringGraph />
      </Box>
    </GridItem>
    <GridItem colSpan={4}>
      <Box mt={15} p={5}>
        <Heading>Job posting</Heading>
        <Box h={50} bg="gray.100" mt={5} mb={3}>
          <Input placeholder='Search for a job' h="100%" outline="none" border="none" focusBorderColor="none" />
        </Box>
        <JobTable />
      </Box>
    </GridItem>

  </>
}