import {
    Box,
    Button,
    Checkbox,
    Flex,
    Heading,
    Icon,
    Link,
    Spinner,
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
import { useState } from "react";
import { useUsers } from "../../services/hooks/useUsers";
import { queryClient } from "../../services/queryClient";
import { api } from "../../services/api";

export default function UserList() {
    const [ page, setPage ] = useState(1)
    const { data, isLoading, isFetching, error } = useUsers(page)

    const isWideVersion = useBreakpointValue({
        base: false,
        lg: true,
    })

    async function handlePrefetchUser(userId: string) {
        await queryClient.prefetchQuery({
            queryKey: ['user', userId],
            queryFn: async () => {
                const response = await api.get(`users/${userId}`)

                return response.data
            },
            staleTime: 1000 * 60 * 10
        })
    }

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
                        <Heading size="lg" fontWeight="normal">
                            Usuários
                            {!isLoading && isFetching && <Spinner size="sm" color="gray.500" ml="4" />}
                        </Heading>

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

                    { isLoading ? (
                        <Flex justify="center">
                            <Spinner />
                        </Flex>
                    ) : error ? (
                        <Flex justify="center">
                            <Text>Falha ao obter dados dos usuários.</Text>
                        </Flex>
                    ) : (
                        <>
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
                                    {data.users.map(user => {
                                        return (
                                            <Tr key={user.id}>
                                                <Td px={["4", "4", "6"]}>
                                                    <Checkbox colorScheme="pink" />
                                                </Td>
                                                <Td>
                                                    <Box>
                                                        <Link _hover={{ color: 'pink.300'}}>
                                                            <Text fontWeight="bold">{user.name}</Text>
                                                        </Link>
                                                        <Text fontSize="sm" color="gray.300">{user.email}</Text>
                                                    </Box>
                                                </Td>
                                                    {isWideVersion && <Td>{user.createdAt}</Td>}
                                                <Td>
                                                    <Link onMouseEnter={() => handlePrefetchUser(user.id)}>
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
                                                    </Link>
                                                </Td>
                                            </Tr>
                                        )
                                    })}
                                </Tbody>
                            </Table>
                            <Pagination
                                totalCountOfRegisters={data.totalCount}
                                currentPage={page}
                                onPageChange={setPage}
                            />
                        </>
                    )}
                </Box>
            </Flex>
        </Box>
    )
}