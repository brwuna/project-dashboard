import { Box, Flex, SimpleGrid, Text, theme } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { useEffect, useState } from "react";

const Chart = dynamic(() => import('react-apexcharts'), {
    ssr: false,
})

const options = {
    chart: {
        toolbar: {
            show: false,
        },
        zoom: {
            enabled: false,
        },
        forColor: theme.colors.gray[500],
    },
    grid: {
        show: false,
    },
    dataLabels: {
        enabled: false,
    },
    tooltip: {
        enabled: false,
    },
    xaxis: {
        type: 'datetime',
        axisBorder: {
            color: theme.colors.gray[600],
        },
        axisTicks: {
            color: theme.colors.gray[600],
        },
        categories: [
            '2023-06-22T00:00:00.000Z',
            '2023-06-21T00:00:00.000Z',
            '2023-06-20T00:00:00.000Z',
            '2023-06-19T00:00:00.000Z',
            '2023-06-18T00:00:00.000Z',
            '2023-06-17T00:00:00.000Z',
            '2023-06-16T00:00:00.000Z',
        ],
    },
    fill: {
        opacity: 0.3,
        type: 'gradient',
        gradient: {
            shade: 'dark',
            opacityFrom: 0.7,
            opacityTo: 0.3,
        },
    },
} as const


const series = [
    { name: 'series1', data: [31, 120, 10, 28, 61, 18, 109] }
]


export default function Dashboard() {
    const [assembleGraphics, setAssembleGraphics] = useState(false)

    useEffect(() => {
        setAssembleGraphics(true)
    }, [])

    return (
        <Flex direction="column" h="100vh">
            <Header />

            <Flex w="100%" my="6" maxW={1280} mx="auto" px="6">
                <Sidebar />

                {assembleGraphics && (
                    <SimpleGrid flex="1" gap="4" minChildWidth="320px" alignItems="flex-start">
                        <Box
                            p={["6", "8"]}
                            bg="gray.800"
                            borderRadius="8"
                            pb="4"
                        >
                            <Text fontSize="lg" mb="4">Inscritos da semana</Text>
                            <Chart options={options} series={series} type="area" height={160} />
                        </Box>

                        <Box
                            p={["6", "8"]}
                            bg="gray.800"
                            borderRadius="8"
                            pb="4"
                        >
                            <Text fontSize="lg" mb="4">Taxa de abertura</Text>
                            <Chart options={options} series={series} type="area" height={160} />
                        </Box>
                    </SimpleGrid>
                )}
            </Flex>
        </Flex>
    )
}