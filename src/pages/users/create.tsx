import { Box, Button, Divider, Flex, HStack, Heading, SimpleGrid, VStack } from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { Input } from "../../components/Form/Input";
import { useMutation } from "@tanstack/react-query";
import { api } from "../../services/api";
import { queryClient } from "../../services/queryClient";
import { useRouter } from "next/router";

type CreateUserFormData = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
}
  
const createUserFormSchema = yup.object().shape({
    name: yup.string().required("Nome obrigatório"),
    email: yup.string().required("E-mail obrigatório").email("E-mail inválido"),
    password: yup.string().required("Senha obrigatória").min(6, "No mínico 6 caracteres"),
    password_confirmation: yup.string().oneOf([
        null,
        yup.ref("password")
    ], "As senhas precisam ser iguais"),
})
  
export default function CreateUser() {
    const router = useRouter()

    const createUser = useMutation({
        mutationFn: async (user: CreateUserFormData) => {
            const response = await api.post('users', {
                user: {
                    ...user,
                    created_at: new Date(),
                }
            })

            return response.data.user
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users']})
        }
    })

    const { register, handleSubmit, formState } = useForm({
        resolver: yupResolver(createUserFormSchema)
    })

    const handleCreateUsers: SubmitHandler<CreateUserFormData> = async (values) => {
        await createUser.mutateAsync(values)
        router.push('/users')
    }

    const { errors } = formState

    return (
        <Box>
            <Header />

            <Flex w="100%" my="6" maxW={1280} mx="auto" px="6">
                <Sidebar />

                <Box as="form"
                    flex="1"
                    borderRadius={8}
                    bg="gray.800"
                    p={["6", "8"]}
                    onSubmit={handleSubmit(handleCreateUsers)}
                >
                    <Heading size="lg" fontWeight="normal">Criar usuário</Heading>

                    <Divider my="6" borderColor="gray.700" />

                    <VStack spacing="8">
                        <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
                            <Input 
                                name="name" 
                                label="Nome completo"
                                error={errors.name} 
                                {...register("name")} 
                            />
                            <Input 
                                name="email" 
                                type="email" 
                                label="E-mail"
                                error={errors.email} 
                                {...register("email")} 
                            />
                        </SimpleGrid>

                        <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
                            <Input 
                                name="password" 
                                type="password" label="Senha"
                                error={errors.password} 
                                {...register("password")} 
                            />
                            <Input 
                                name="password_confirmation" 
                                type="password" label="Confirme a senha"
                                error={errors.password_confirmation}  
                                {...register("password_confirmation")} 
                            />
                        </SimpleGrid>
                    </VStack>

                    <Flex mt="8" justify="flex-end">
                        <HStack spacing="4">
                            <Button as="a" href="/users" colorScheme="whiteAlpha">Cancelar</Button>
                            <Button 
                                type="submit" 
                                colorScheme="pink"
                                isLoading={formState.isSubmitting}
                            >
                                Salvar
                            </Button>
                        </HStack>
                    </Flex>
                </Box>
            </Flex>
        </Box>
    )
}