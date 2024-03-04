import { CircularProgress, Flex } from "@chakra-ui/react";

export function AppSpinner() {
  return <Flex justifyContent={"center"} alignItems={"center"} h="100vh" >
    <CircularProgress isIndeterminate color='black' />
  </Flex>
}