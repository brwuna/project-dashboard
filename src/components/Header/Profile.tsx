import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

interface ProfileProps {
    showProfileData: boolean;
}

export function Profile({ showProfileData = true }: ProfileProps) {
    return (
        <Flex align="center">
            {showProfileData && (
                <Box mr="4" textAlign="right">
                    <Text>Bruna Nascimento</Text>
                    <Text color="gray.300" fontSize="sm">
                        bruuna.n97@gmail.com
                    </Text>
                </Box>
            )}

            <Avatar size="md" name="Bruna Nascimento" src="https://github.com/brwuna.png" />
        </Flex>
    )
}