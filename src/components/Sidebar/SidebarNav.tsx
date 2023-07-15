import { Stack } from "@chakra-ui/react";
import { NavSection } from "./NavSection";
import { NavLink } from "./NavLink";
import { RiDashboardLine, RiGitMergeLine, RiInputMethodLine, RiContactsLine } from "react-icons/ri";

export function SidebarNav() {
    return (
        <Stack spacing="12" align="flex-start">
            <NavSection title="GERAL">
                <NavLink icon={RiDashboardLine} href="/dashboard">Dashboard</NavLink>
                <NavLink icon={RiGitMergeLine} href="/users">Usuários</NavLink>
            </NavSection>

            <NavSection title="AUTOMAÇÃO">
                <NavLink icon={RiInputMethodLine} href="/forms">Formulários</NavLink>
                <NavLink icon={RiContactsLine} href="/automation">Automação</NavLink>
            </NavSection>
        </Stack>
    )
}