import { Grid } from "@chakra-ui/react";
import { EnterpriseNavbar } from "../Navbar/EnterpriseNavbar";
import { EnterpriseHome } from "./Home/EnterpriseHome";

export default function EnterpriseDashboard() {
  return <Grid
    minH='100vh'
    templateRows='repeat(2, 1fr)'
    templateColumns='repeat(5, 1fr)'
    gap={4}
  >
    <EnterpriseNavbar />
    <EnterpriseHome />

  </Grid>
}