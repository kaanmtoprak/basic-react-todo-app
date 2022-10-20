import { useState } from "react";
import { useTodos } from "../context/TodoContext";
import { Input, Button, Container,Flex,useToast } from "@chakra-ui/react";
import {AddIcon} from '@chakra-ui/icons'

const TodoForm = () => {
  const { setTodo } = useTodos();
  const [todoForm, setTodoForm] = useState("");
  const toast = useToast()

  const handleSubmit = (e) => {
    e.preventDefault();
    if (todoForm !== "") {
      setTodo(todoForm);
      setTodoForm("");
      toast({
        title: 'Added!.',
        description: "Your Todo Succesfuly Added!",
        position:"top-right",
        status: 'success',
        duration: 2000,
        isClosable: true,
      })
    }
  };
  return (
    <Container pt="10" pb="10" size="lg">
      
<Flex  justifyContent="space-between" alignItems="center">
  
<form style={{width:"100%"}} onSubmit={handleSubmit}>
<Flex  justifyContent="space-between" alignItems="center">
        <Input
          mr="2"
          name="todo"
          value={todoForm}
          onChange={({ target }) => setTodoForm(target.value)}
        />

        <Button colorScheme="green" type="submit">Add <AddIcon ml="2"/> </Button>
        </Flex>
      </form>
</Flex>
    </Container>
  );
};

export default TodoForm;
