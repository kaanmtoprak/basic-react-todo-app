import React, { useEffect, useRef } from "react";
import { useTodos } from "../context/TodoContext";
import {
  Button,
  Box,
  Flex,
  Container,
  Text,
  useToast,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverCloseButton,
  Portal,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
const TodoArea = () => {
  const {
    indexItem,
    setIndexItem,
    local,
    controlLocal,
    setControlLocal,
    setControldelete,
  } = useTodos();
  const toast = useToast();
  const initRef = useRef();

  useEffect(() => {
    if (controlLocal) {
      localStorage.setItem("todos", JSON.stringify([]));
      setControlLocal(false);
    }
  }, [controlLocal, setControlLocal, indexItem, local]);

  const handleDelete = (onClose) => {
    setControlLocal(true);
    onClose();
  };

  const handleSlice = (index, onClose) => {
    setControldelete(true);
    setIndexItem(index);
    toast({
      title: "Deleted!.",
      description: "Your Todo Succesfuly Deleted!",
      status: "error",
      position: "top-right",
      duration: 2000,
      isClosable: true,
    });
    onClose();
  };

  return (
    <>
      <Container pb="10" mt="5" size="lg">
        <Flex justifyContent="space-between" alignItems="center">
          <Box>
            <Text fontSize="xl">To Do List</Text>
          </Box>
          <Box>
            <Popover
              closeOnBlur={false}
              placement="bottom"
              initialFocusRef={initRef}
            >
              {({ onClose }) => (
                <>
                  <PopoverTrigger>
                    <Button colorScheme="red">
                      Delete All
                      <DeleteIcon ml="2" />
                    </Button>
                  </PopoverTrigger>
                  <Portal>
                    <PopoverContent>
                      <PopoverHeader>Are You Sure?</PopoverHeader>
                      <PopoverCloseButton />
                      <PopoverBody>
                        <Box>Are you sure to delete all todos mf* ?</Box>
                      </PopoverBody>
                      <PopoverFooter>
                        <Button
                          mr="2"
                          size="sm"
                          onClick={() => handleDelete(onClose)}
                          colorScheme="red"
                        >
                          Delete
                        </Button>
                        <Button size="sm" onClick={onClose}>
                          Close
                        </Button>
                      </PopoverFooter>
                    </PopoverContent>
                  </Portal>
                </>
              )}
            </Popover>
          </Box>
        </Flex>

        {local !== null && local.length > 0 ? (
          local.map((i, index) => (
            <Flex
              key={index}
              mt="15px"
              boxShadow="base"
              p="2"
              rounded="md"
              bg="white"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box>
                <Text>{i}</Text>
              </Box>
              <Box>
                <EditIcon mr="2" cursor="pointer" color="green" />

                <Popover
                  closeOnBlur={false}
                  placement="bottom"
                  initialFocusRef={initRef}
                >
                  {({ onClose }) => (
                    <>
                      <PopoverTrigger>
                        <DeleteIcon cursor="pointer" color="red" />
                      </PopoverTrigger>
                      <Portal>
                        <PopoverContent>
                          <PopoverHeader>Are You Sure?</PopoverHeader>
                          <PopoverCloseButton />
                          <PopoverBody>
                            <Box>Are you sure to delete this to do mf* ?</Box>
                          </PopoverBody>
                          <PopoverFooter>
                            <Button
                              mr="2"
                              size="sm"
                              onClick={() => handleSlice(index, onClose)}
                              colorScheme="red"
                            >
                              Delete
                            </Button>
                            <Button size="sm" onClick={onClose}>
                              Close
                            </Button>
                          </PopoverFooter>
                        </PopoverContent>
                      </Portal>
                    </>
                  )}
                </Popover>
              </Box>
            </Flex>
          ))
        ) : (
          <Alert
            status="warning"
            variant="subtle"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            height="200px"
            borderRadius="15px"
            mt="10"
          >
            <AlertIcon boxSize="40px" mr={0} />
            <AlertTitle mt={4} mb={1} fontSize="lg">
              There are no Todos!
            </AlertTitle>
            <AlertDescription maxWidth="sm">
              Please add a todo!
            </AlertDescription>
          </Alert>
        )}
      </Container>
    </>
  );
};

export default TodoArea;
