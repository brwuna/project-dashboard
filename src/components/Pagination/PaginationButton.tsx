import { Button } from "@chakra-ui/react";

interface PaginationButtonProps {
    number: number;
    isCurrent?: boolean;
    onPageChange: (page: number) => void;
}

export function PaginationButton({ number, isCurrent = false, onPageChange }: PaginationButtonProps) {
    if (isCurrent) {
        return (
            <Button
                size="sm"
                fontSize-="xs"
                width="4"
                colorScheme="pink"
                disabled
                _disabled={{
                    bg: 'pink.500',
                    cursor: 'default'
                }}
            >
                {number}
            </Button>
        )
    }

    return (
        <Button
            size="sm"
            fontSize-="xs"
            width="4"
            bg="gray.700"
            _hover={{
                bg: 'gray.500'
            }}
            onClick={() => onPageChange(number)}
        >
            {number}
        </Button>
    )
}