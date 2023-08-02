import { Flex, Icon, Input } from "@chakra-ui/react";
import React, { useRef } from "react";
import { RiSearchLine } from "react-icons/ri"

export function Search() {
    // ref vem para ajudar a criar Uncontrolled components de maneira imperativa (quando a gente diz exatamente o que quer); Declarativa: quano digo o que espero e acontece de forma automática
    //const searchInputRef = useRef<HTMLInputElement>(null)

    //toda ref tem o current (valor atual) e 
    //console.log(searchInputRef.current.value)

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
            //ref={searchInputRef}
            />

            <Icon as={RiSearchLine} fontSize="20" />
        </Flex>
    )
}