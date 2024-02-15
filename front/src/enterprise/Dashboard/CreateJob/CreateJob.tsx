import { Box, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, FormLabel, Input, Select, Stack, Textarea, useDisclosure, useToast } from "@chakra-ui/react"
import { useRef } from "react"
import { http } from "../../../http-module/http-module"

interface CreateJobProps {
  actionButton: (onOpen: () => void) => JSX.Element
}

export function CreateJob({ actionButton }: CreateJobProps) {
  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const formStore: Record<string, any> = {
    name: useRef<HTMLInputElement>(null),
    localisation: useRef<HTMLInputElement>(null),
    min: useRef<HTMLInputElement>(null),
    max: useRef<HTMLInputElement>(null),
    description: useRef<HTMLTextAreaElement>(null),
    type: useRef<HTMLSelectElement>(null),
    currency: useRef<HTMLSelectElement>(null)
  }

  const onSubmit = async () => {
    const payload: Record<string, string | undefined> = {}
    for (const key in formStore) {
      payload[key] = formStore[key].current.value
    }
    console.log("payload", payload)

    try {
      const { name, description, localisation, ...salary } = payload
      const { data } = await http.post('missions', { name, description, localisation, salary })
      console.log("created mission", data)
      toast({
        status: 'success',
        description: 'Mission created'
      })
    } catch (error) {
      console.error("create account error", error)

      toast({
        status: 'error',
        description: 'Error, try again'
      })
    }
  }

  return (
    <>
      {actionButton(onOpen)}
      <Drawer
        size="lg"
        isOpen={isOpen}
        placement='right'
        finalFocusRef={formStore.name}
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth='1px'>
            Create a new job
          </DrawerHeader>

          <DrawerBody>
            <Stack spacing='24px'>
              <Box>
                <FormLabel htmlFor='name'>Name</FormLabel>
                <Input
                  ref={formStore.name}
                  id='name'
                  placeholder='Please enter the job name'
                />
              </Box>


              <Box>
                <FormLabel htmlFor='localisation'>Localisation</FormLabel>
                <Input
                  ref={formStore.localisation}
                  id='localisation'
                  placeholder='Please enter the job localisation'
                />
              </Box>

              <Box>
                <FormLabel htmlFor='salary'>Select Salary payment</FormLabel>
                <Select id='owner' defaultValue='year' ref={formStore.type}>
                  <option value='year'>Year</option>
                  <option value='kola'>Month</option>
                </Select>
              </Box>

              <Box>
                <FormLabel htmlFor='min'>Min salary</FormLabel>
                <Input
                  ref={formStore.min}
                  id='min'
                  type="number"
                  placeholder='Min salary'
                />
              </Box>

              <Box>
                <FormLabel htmlFor='max'>Max salary</FormLabel>
                <Input
                  ref={formStore.max}
                  id='max'
                  type="number"
                  placeholder='Max salary'
                />
              </Box>

              <Box>
                <FormLabel htmlFor='currency'>Currency</FormLabel>
                <Select id='currency' defaultValue='XOF' ref={formStore.currency}>
                  <option value='XOF'>XOF</option>
                  <option value='$'>Dollar</option>
                  <option value='€'>Euro</option>
                </Select>
              </Box>

              <Box>
                <FormLabel htmlFor='desc'>Description</FormLabel>
                <Textarea id='desc' rows={8} placeholder="The job description" ref={formStore.description} />
              </Box>
            </Stack>
          </DrawerBody>

          <DrawerFooter borderTopWidth='1px'>
            <Button variant='outline' mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button bg="black" color="lightgrey" onClick={onSubmit}>Submit</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}