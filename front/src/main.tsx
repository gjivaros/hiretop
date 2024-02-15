import { ChakraProvider, CircularProgress, Flex, extendTheme } from '@chakra-ui/react'
import { boolVal, listValOrUndef, strVal, strValOrUndef } from '@paroi/data-formatters-lib'
import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { fetchToken, http } from './http-module/http-module.ts'
import { LoginPage } from './pages/loginPage.tsx'
import { Account } from './store/account-slice.ts'
import { useAppStore } from './store/app-store.ts'

const colors = {
  brand: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac',
  },
}

const theme = extendTheme({ colors })


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <Main />
    </ChakraProvider>
  </React.StrictMode>,
)

function Main() {
  const [isLoading, setIsLoading] = useState(true)

  const { account, setAccount } = useAppStore()


  const whoAmI = async () => {
    const account = await getMe()

    console.log("whoAmi", account)

    if (!account) {
      setIsLoading(false)
      return
    }

    setAccount(account)
    setIsLoading(false)
  }

  useEffect(() => {
    whoAmI().catch(console.error)
  }, [])

  if (isLoading) return <LodingComponent />

  if (account) return <App />
  return <LoginPage />
}

function LodingComponent() {
  return <Flex justifyContent={"center"} alignItems={"center"} h="100vh" >
    <CircularProgress isIndeterminate color='black' />
  </Flex>
}

async function getMe(): Promise<Account | undefined> {
  try {
    const { data } = await http.get('auth/me')
    console.log("get me", data)
    return {
      id: strVal(data.id),
      email: strVal(data.email),
      token: strVal(fetchToken()),
      applicant: {
        id: strVal(data.applicant.id),
        firsname: strValOrUndef(data.applicant.firsname),
        lastname: strValOrUndef(data.applicant.lastname),
        whoami: strValOrUndef(data.applicant.whoami),
        isCompleted: boolVal(data.applicant.isCompleted),
        experiences: listValOrUndef(data.applicant.experiences, (val: any) => ({
          enterprise: strVal(val.enterprise),
          period: strVal(val.period),
          post: strVal(val.post)
        }))
      },
      enterprise: {
        id: strVal(data.enterprise.id),
        name: strValOrUndef(data.enterprise.name),
        description: strValOrUndef(data.enterprise.description),
        isCompleted: boolVal(data.enterprise.isCompleted)
      }
    }
  } catch (error: any) {
    console.log("get me error", error?.respons?.data)
  }
}
