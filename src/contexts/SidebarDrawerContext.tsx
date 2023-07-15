import { UseDisclosureReturn, useDisclosure } from "@chakra-ui/react";
import { ReactNode, createContext, useContext, useEffect } from "react";
import { useRouter } from "next/router";
interface SidebarDrawerProviderProps {
    children: ReactNode
}

type SidebarDrawerContextData = UseDisclosureReturn

const SidebarDrawerContext = createContext({} as SidebarDrawerContextData)

export function SidebarDrawerProvider({ children }: SidebarDrawerProviderProps) {
    const disclosure = useDisclosure()
    const router = useRouter()


    useEffect(() => {
        disclosure.onClose
    }, [router.asPath]) //caminho da rota

    return (
        <SidebarDrawerContext.Provider value={disclosure}>
            {children}
        </SidebarDrawerContext.Provider>
    )
}

export const useSidebarDrawer = () => useContext(SidebarDrawerContext)