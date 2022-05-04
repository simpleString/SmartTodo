import { Center, Grid, GridItem, Text } from "@chakra-ui/react";
import Header from "./components/Header";

function App() {
  return (
    <>
      <Header />
      <Grid templateColumns="repeat(4, 1fr)" my={1}>
        <GridItem colSpan={1} bgColor={"teal.700"}>
          <Text>Hello world</Text>
        </GridItem>
        <GridItem bgColor={"teal.300"} colSpan={3}>
          <Center>Hello another workd</Center>
        </GridItem>
      </Grid>
    </>
  );
}

export default App;
