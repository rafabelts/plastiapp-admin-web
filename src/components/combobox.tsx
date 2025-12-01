"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/src/lib/utils"
import { Button } from "@/src/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/src/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/src/components/ui/popover"

type BaseOption = {
    id: number | string
    name: string
}

type ComboboxProps<T extends BaseOption> = {
    elements: T[]
    value: number | string | null | undefined
    onChange: (value: number | string | null) => void
}

export function Combobox<T extends BaseOption>({
    elements,
    value,
    onChange,
}: ComboboxProps<T>) {
    const [open, setOpen] = React.useState(false)

    // Importante: que value sea number (o null)
    const selected =
        elements.find((el) => el.id == value) || null

    const handleSelect = (id: number | string) => {
        onChange(id)
        setOpen(false)
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="justify-between"
                >
                    {selected ? selected.name : "Seleccionar..."}
                    <ChevronsUpDown className="opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0">
                <Command>
                    <CommandInput placeholder="Buscar..." className="h-9" />
                    <CommandList>
                        <CommandEmpty>No elements found</CommandEmpty>
                        <CommandGroup>
                            {elements.map((element) => (
                                <CommandItem
                                    key={element.id}
                                    value={element.name}
                                    onSelect={() => handleSelect(element.id)}
                                >
                                    {element.name}
                                    <Check
                                        className={cn(
                                            "ml-auto",
                                            value === element.id ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
