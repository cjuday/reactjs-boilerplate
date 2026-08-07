import { createContext, useContext } from 'react';

interface PopoverContextType {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    close: () => void;
}

export const PopoverContext = createContext<PopoverContextType | null>(null);

export function usePopover() {
    const context = useContext(PopoverContext);

    if (!context) {
        throw new Error('Popover components must be inside <Popover>.');
    }

    return context;
}