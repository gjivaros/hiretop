import { Badge, FormControl, FormLabel, Switch } from "@chakra-ui/react";
import { useAppStore } from "../store/app-store";

export function AppMode() {
  const { mode, setMode } = useAppStore()

  const toggle = () => {
    setMode(mode === 'applicant' ? 'enterprise' : 'applicant')
  }
  return <FormControl display='flex' alignItems='center'>
    <Switch id='email-alerts' onChange={toggle} />
    <FormLabel htmlFor='email-alerts' mb='0' pl={2}>
      <Badge colorScheme='purple'>TALENT</Badge>
    </FormLabel>
  </FormControl>
}