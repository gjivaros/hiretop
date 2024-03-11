import { Box, Heading } from "@chakra-ui/react";
import { HiringGraph } from "../Dashboard/Home/HiringGraph";

export function JobReport() {
  return <Box border="1px solid black" p={5} borderRadius={8}>
    <Heading>Hiring activity</Heading>
    <HiringGraph />
  </Box>
}