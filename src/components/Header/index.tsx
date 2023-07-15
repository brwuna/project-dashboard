import { Flex } from "@chakra-ui/react"
import { Profile } from "./Profile"
import { NotificationNav } from "./NotificationsNav"
import { Search } from "./Search"
import { Logo } from "./Logo"

export default function Header() {
    return (
        <Flex
            as="header"
            w="100%"
            maxW={1280}
            h="20"
            mx="auto"
            mt="4"
            px="6"
            align="center"
        >
            <Logo />
            <Search />
            <Flex align="center" ml="auto">
                <NotificationNav />
                <Profile />
            </Flex>
        </Flex>
    )
}