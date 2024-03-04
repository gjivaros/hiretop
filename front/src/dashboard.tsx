import { boolVal, listValOrUndef, strVal, strValOrUndef } from "@paroi/data-formatters-lib"
import { useEffect, useState } from "react"
import App from "./App"
import { AppSpinner } from "./component/app-spinner"
import { fetchToken, http } from "./http-module/http-module"
import { LoginPage } from "./pages/loginPage"
import { Account } from "./store/account-slice"
import { useAppStore } from "./store/app-store"

export function Main() {
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

  if (isLoading) return <AppSpinner />

  if (account) return <App />
  return <LoginPage />
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