import React, { useEffect, useRef, useState } from "react";
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
  Input,
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon, InfoIcon } from "@chakra-ui/icons";
const TodoArea = () => {
  const [indexEdit, setIndexEdit] = useState({
    value: "",
    index: "",
  });

  const {
    indexItem,
    setIndexItem,
    local,
    controlLocal,
    setControlLocal,
    setControldelete,
    setEditItems,

    setEditControl,
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

  const handleEditSubmit = (onClose) => {
    setEditItems({
      value: indexEdit.value,
      index: indexEdit.index,
    });
    setEditControl(true);
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
                        <Box>Are you sure to delete all todos?</Box>
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
                {/* Edit  */}

                <Popover
                  closeOnBlur={false}
                  placement="bottom"
                  initialFocusRef={initRef}
                >
                  {({ onClose }) => (
                    <>
                      <PopoverTrigger>
                        <EditIcon mr="2" cursor="pointer" color="green" />
                      </PopoverTrigger>
                      <Portal>
                        <PopoverContent>
                          <PopoverHeader>Edit To do!</PopoverHeader>
                          <PopoverCloseButton />

                          <PopoverBody>
                            <Input
                              defaultValue={i}
                              onChange={({ target }) => {
                                setIndexEdit({
                                  value: target.value,
                                  index: index,
                                });
                              }}
                            />
                          </PopoverBody>
                          <PopoverFooter>
                            <Button
                              mr="2"
                              size="sm"
                              onClick={() => handleEditSubmit(onClose)}
                              colorScheme="green"
                            >
                              Edit
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
                {/* Delete */}
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
                            <Box>Are you sure to delete this to do ?</Box>
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
          <Flex
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            height="100px"
            borderRadius="15px"
            mt="10"
            boxShadow="base"
            p="2"
            rounded="md"
          >
            <InfoIcon color="grey" boxSize="20px" mr={4} />
            <Text fontSize="20px" color="grey.700">
              There is no "to do" to show!
            </Text>
          </Flex>
        )}
      </Container>
    </>
  );
};

export default TodoArea;
