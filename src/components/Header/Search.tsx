import { Flex, Icon, Input } from "@chakra-ui/react";
import React from "react";
import { RiSearchLine } from "react-icons/ri"

export function Search() {
    return (
        <Flex
            as="label"
            flex="1"
            py="4"
            px="6"
            ml="4"
            maxW={490}
            alignSelf="center"
            color="gray.200"
            bg="gray.800"
            borderRadius="full"
            position="relative"
        >
            <Input
                color="gray.50"
                variant="unstyled"
                px="4"
                mr="4"
                placeholder="Buscar na plataforma"
                _placeholder={{
                    color: "gray.400",
                    fontSize: "sm"
                }}
            />

            <Icon as={RiSearchLine} fontSize="20" />
        </Flex>
    )
}