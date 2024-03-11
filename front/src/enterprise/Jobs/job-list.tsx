import { Box, GridItem, Heading, Input } from "@chakra-ui/react";
import { JobTable } from "../Dashboard/Home/JobTable";

export function JobList() {
  return <GridItem colSpan={4}>
    <Box mt={15} p={5}>
      <Heading>Job posting</Heading>
      <Box h={50} bg="gray.100" mt={5} mb={3}>
        <Input placeholder='Search for a job' h="100%" outline="none" border="none" focusBorderColor="none" />
      </Box>
      <JobTable />
    </Box>
  </GridItem>
}