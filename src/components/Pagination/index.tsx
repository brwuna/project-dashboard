import { Box, Stack, Text } from "@chakra-ui/react";
import { PaginationButton } from "./PaginationButton";

interface PaginationProps {
    totalCountOfRegisters: number;
    registersPerPage?: number;
    currentPage?: number;
    onPageChange: (page: number) => void;
}

const siblingsCount = 1

// cria um array de números inteiros sequenciais, começando de um número específico (from) até outro número específico (to).
function generatePagesArray(from: number, to: number) {
    return [...new Array(to - from)]
      .map((_, index) => {
        return from + index + 1;
      }).filter(page => page > 0)
      // se a page é maior que 0
  }

export function Pagination({ 
    totalCountOfRegisters, 
    registersPerPage = 10, 
    currentPage = 1, 
    onPageChange }: PaginationProps) {
        const lastPage = Math.floor(totalCountOfRegisters / registersPerPage);

        const previousPages = currentPage > 1 ? generatePagesArray(currentPage - 1 - siblingsCount, currentPage - 1): []

        const nextPages = currentPage < lastPage ? generatePagesArray(currentPage, Math.min(currentPage + siblingsCount, lastPage)) : []

    return (
        <Stack
            direction={["column", "row"]}
            mt="8"
            justify="space-between"
            alignItems="center"
            spacing="6"
        >
            <Box>
                <strong>{currentPage * registersPerPage - registersPerPage + 1}</strong> - <strong>{currentPage === lastPage ? totalCountOfRegisters : registersPerPage * currentPage}</strong> de <strong>{totalCountOfRegisters}</strong>
            </Box>
            <Stack direction="row" spacing="2">
                {currentPage > (1 + siblingsCount) && (
                    <>
                        <PaginationButton onPageChange={onPageChange} number={1} />
                        { currentPage > (2 + siblingsCount) && (
                            <Text color="gray.300" width="8" textAlign="center">...</Text>
                        )}
                    </>
                )}

                {previousPages.length > 0 && previousPages.map(page => {
                    return <PaginationButton onPageChange={onPageChange} key={page} number={page} />
                })}

                <PaginationButton onPageChange={onPageChange} number={currentPage} isCurrent />
                
                {nextPages.length > 0 && nextPages.map(page => {
                    return <PaginationButton onPageChange={onPageChange} key={page} number={page} />
                })}

                {(currentPage + siblingsCount) < lastPage && (
                    <>
                        { (currentPage + 1 + siblingsCount) < lastPage && (
                            <Text color="gray.300" width="8" textAlign="center">...</Text>
                        )}
                        <PaginationButton onPageChange={onPageChange} number={lastPage} />
                    </>
                )}
            </Stack>
        </Stack>
    )
}