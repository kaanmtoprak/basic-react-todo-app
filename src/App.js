import "./App.css";
import TodoArea from "./components/TodoArea";
import TodoForm from "./components/TodoForm";
import { Flex, Container, Heading, Divider } from "@chakra-ui/react";

function App() {
  return (
    <div className="body">
      <div className="App">
        <Heading color="white" mb="3" fontSize="3xl">
          Add a Thing To Do!
        </Heading>
        <Container size="2xl">
          <Flex
            mt="15px"
            boxShadow="base"
            p="2"
            rounded="md"
            bg="white"
            justifyContent="space-between"
            alignItems="center"
            flexDirection="column"
          >
            <TodoForm />
            <Divider />
            <TodoArea />
          </Flex>
        </Container>
      </div>
    </div>
  );
}

export default App;
