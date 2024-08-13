import { Link, Text } from "@chakra-ui/react";
import { NavLink } from "../Sidebar/NavLink";

export function Logo() {
    return (
        <Text
            fontSize={["2xl", "3xl"]}
            fontWeight="bold"
            letterSpacing="tighter"
            w="64"
        >
            <Link
                _hover={{ textDecoration: 'none' }}
                href="/dashboard">
                    dashHub
            </Link>
            <Text
                as="span"
                color="pink.500"
            >
                .
            </Text>
        </Text>
    )
}