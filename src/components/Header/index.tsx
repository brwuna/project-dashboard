import { Flex, Icon, IconButton, useBreakpointValue } from "@chakra-ui/react"
import { Profile } from "./Profile"
import { NotificationNav } from "./NotificationsNav"
import { Search } from "./Search"
import { Logo } from "./Logo"
import { useSidebarDrawer } from "../../contexts/SidebarDrawerContext"
import { RiMenuLine } from "react-icons/ri"

export default function Header() {
    const { onOpen } = useSidebarDrawer()


    const isWideVersion = useBreakpointValue({
        base: false,
        lg: true,
    })

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

            {!isWideVersion && (
                <IconButton
                    aria-label="Open navigation"
                    icon={<Icon as={RiMenuLine} />} fontSize="24"
                    mr="2"
                    variant="unstyled"
                    onClick={onOpen}>
                </IconButton>
            )}

            <Logo />

            {isWideVersion && (
                <Search />
            )}

            <Flex align="center" ml="auto">
                <NotificationNav />
                <Profile showProfileData={isWideVersion} />
            </Flex>
        </Flex>
    )
}