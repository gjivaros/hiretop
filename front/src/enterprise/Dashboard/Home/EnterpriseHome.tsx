import { Box, Button, Flex, FormControl, FormLabel, GridItem, Heading, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Table, TableContainer, Tbody, Td, Text, Textarea, Th, Thead, Tr, useToast } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { AppMode } from "../../../component/AppMode";
import { http } from "../../../http-module/http-module";
import { Experience } from "../../../store/account-slice";
import { useAppStore } from "../../../store/app-store";
import { HiringGraph } from "./HiringGraph";
import { JobTable } from "./JobTable";

export function EnterpriseHome() {
  const { account } = useAppStore()
  return <>
    <GridItem colSpan={4}  >
      {
        account &&
        (!account.applicant.isCompleted || !account.enterprise.isCompleted) &&
        <CompleteInformation />
      }

      <Flex justifyContent="space-between" p={8}>
        <Heading>Welcome back {account?.enterprise.name}</Heading>

        <div>
          <AppMode />

        </div>
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


function CompleteInformation() {
  const toast = useToast()
  const [experiences, setEperiences] = useState<Experience[]>([])

  const applicant = {
    firstname: useRef<HTMLInputElement>(null),
    lastname: useRef<HTMLInputElement>(null),
    whoami: useRef<HTMLTextAreaElement>(null),
  }


  const enterprise = {
    name: useRef<HTMLInputElement>(null),
    description: useRef<HTMLTextAreaElement>(null)
  }

  const [experience, setExperience] = useState<Experience>({
    enterprise: "",
    period: "",
    post: ""
  })

  const newExperience = () => {
    setEperiences(rows => [experience, ...rows])
    setExperience({
      enterprise: "",
      period: "",
      post: ""
    })
  }

  const onSubmit = async () => {
    const payload = {
      applicant: {
        firstname: applicant.firstname.current?.value,
        lastname: applicant.firstname.current?.value,
        whoami: applicant.whoami.current?.value,
        experiences
      },
      enterprise: {
        name: enterprise.name.current?.value,
        description: enterprise.description.current?.value
      }
    }

    console.log("payload", payload)

    try {
      const { data } = await http.patch("account", payload)
      console.log("account update", data)

      toast({
        status: 'success',
        description: "Successfully"
      })

      location.reload()
    } catch (error) {
      console.error("update account error", error)
      toast({
        status: 'error',
        description: "Error, try again"
      })
    }
  }

  const OverlayOne = () => (
    <ModalOverlay
      bg='blackAlpha.300'
      backdropFilter='blur(10px) hue-rotate(90deg)'
    />
  )

  return (
    <>
      <Modal isCentered isOpen={true} onClose={console.log} size="xl">
        <OverlayOne />
        <ModalContent>
          <ModalHeader>Welcome, please fill in your details</ModalHeader>
          <ModalBody>
            <Text textAlign="center">Your information as a company</Text>
            <FormControl>
              <FormLabel>Company name</FormLabel>
              <Input placeholder='Company name' ref={enterprise.name} />
            </FormControl>

            <FormControl>
              <FormLabel>Description</FormLabel>
              <Textarea placeholder='Description' ref={enterprise.description} />
            </FormControl>

            <Text textAlign="center" mt={10}>Your information as a candidate</Text>
            <Flex alignItems="center" gap={2}>
              <FormControl>
                <FormLabel>First name</FormLabel>
                <Input placeholder='First name' ref={applicant.firstname} />
              </FormControl>

              <FormControl>
                <FormLabel>Last name</FormLabel>
                <Input placeholder='Last name' ref={applicant.lastname} />
              </FormControl>

            </Flex>

            <FormControl>
              <FormLabel>Who are you</FormLabel>
              <Textarea placeholder='Senir backend developer' ref={applicant.whoami} />
            </FormControl>

            <FormLabel>Your old experiences</FormLabel>
            <Flex alignItems="center" gap={2}>
              <FormControl>
                <FormLabel>Post</FormLabel>
                <Input
                  placeholder='Backend developer'
                  value={experience.post}
                  onChange={(event) => setExperience({ ...experience, post: event.target.value })}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Company</FormLabel>
                <Input
                  placeholder='Talent virtuel'
                  value={experience.enterprise}
                  onChange={(event) => setExperience({ ...experience, enterprise: event.target.value })}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Period</FormLabel>
                <Input
                  placeholder='2 years'
                  value={experience.period}
                  onChange={(event) => setExperience({ ...experience, period: event.target.value })}
                />
              </FormControl>

            </Flex>
            <Flex justifyContent={"flex-end"} mt={2}>
              <Button onClick={newExperience}>Add</Button>

            </Flex>

            <TableContainer>
              <Table variant='simple'>
                <Thead>
                  <Tr>
                    <Th>Post</Th>
                    <Th>Company</Th>
                    <Th>Period</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {
                    experiences.map(item => <Tr key={item.enterprise}>
                      <Td>{item.post}</Td>
                      <Td>{item.enterprise}</Td>
                      <Td>{item.period}</Td>
                    </Tr>)
                  }


                </Tbody>

              </Table>
            </TableContainer>
          </ModalBody>
          <ModalFooter>
            <Button bg="black" color="lightgrey" onClick={onSubmit} >Submit</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}