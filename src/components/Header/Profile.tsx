import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

export function Profile() {
    return (
        <Flex align="center">
            <Box mr="4" textAlign="right">
                <Text>Bruna Nascimento</Text>
                <Text color="gray.300" fontSize="sm">
                    bruuna.n97@gmail.com
                </Text>
            </Box>

            <Avatar size="md" name="Bruna Nascimento" src="https://github.com/brwuna.png" />
        </Flex>
    )
}