import {
    Box,
    Button,
    Checkbox,
    Flex,
    Heading,
    Icon,
    Table,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
    useBreakpointValue
} from "@chakra-ui/react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { RiAddLine, RiPencilLine } from "react-icons/ri";
import { Pagination } from "../../components/Pagination";
import Link from "next/link";

export default function UserList() {
    const isWideVersion = useBreakpointValue({
        base: false,
        lg: true,
    })

    return (
        <Box>
            <Header />

            <Flex w="100%" my="6" maxW={1280} mx="auto" px="6">
                <Sidebar />

                <Box
                    flex="1"
                    borderRadius={8}
                    bg="gray.800"
                    p="8">
                    <Flex mb="8" justify="space-between" align="center">
                        <Heading size="lg" fontWeight="normal">Usuários</Heading>

                        <Button
                            as="a"
                            href="/users/create"
                            size="sm"
                            fontSize="sm"
                            colorScheme="pink"
                            cursor="pointer"
                            leftIcon={<Icon as={RiAddLine} fontSize="20" />}
                        >
                            Criar novo usuário
                        </Button>

                    </Flex>

                    <Table colorScheme="whiteAlpha">
                        <Thead>
                            <Tr>
                                <Th px={["4", "4", "6"]} color="gray.300" width="8">
                                    <Checkbox colorScheme="pink" />
                                </Th>
                                <Th>
                                    Usuário
                                </Th>
                                {isWideVersion && <Th>Data de cadastro</Th>}
                                <Th width={8}></Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            <Tr>
                                <Td px={["4", "4", "6"]}>
                                    <Checkbox colorScheme="pink" />
                                </Td>
                                <Td>
                                    <Box>
                                        <Text fontWeight="bold">Bruna Nascimento</Text>
                                        <Text fontSize="sm" color="gray.300">bruuna.n97@gmail.com</Text>
                                    </Box>
                                </Td>
                                {isWideVersion && <Td>26 de Junho, 2023</Td>}
                                <Td>
                                    <Button
                                        as="a"
                                        size="sm"
                                        fontSize="sm"
                                        colorScheme="red"
                                        cursor="pointer"
                                        iconSpacing={isWideVersion ? '1.5' : '-0.5'}
                                        leftIcon={<Icon as={RiPencilLine} fontSize="16" />}
                                    >
                                        {isWideVersion && "Editar"}
                                    </Button>
                                </Td>
                            </Tr>
                        </Tbody>
                    </Table>
                    <Pagination />
                </Box>
            </Flex>
        </Box>
    )
}