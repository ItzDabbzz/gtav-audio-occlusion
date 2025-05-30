import React, { createContext, useState, useEffect, useContext } from 'react';

import { isErr, unwrapResult } from '@/electron/common';

import { InteriorAPI } from '@/electron/common/types/interior';
import type { SerializedInterior } from '@/electron/common/types/interior';

type InteriorProviderProps = {
    identifiers: string[];
    children: React.ReactNode;
};

interface IInteriorContext {
    interiors: Record<string, SerializedInterior | undefined>;
    fetchInterior: (identifier: string) => Promise<void>;
    addInterior: (identifier: string) => void;
    removeInterior: (identifier: string) => void;
}

const { API } = window;

const interiorContext = createContext<IInteriorContext>({} as IInteriorContext);

const useInteriorProvider = (initialIdentifiers: string[]): IInteriorContext => {
    const [interiors, setInteriors] = useState<Record<string, SerializedInterior | undefined>>({});

    const fetchInterior = async (identifier: string): Promise<void> => {
        const result: Result<string, SerializedInterior | undefined> = await API.invoke(
            InteriorAPI.GET_INTERIOR,
            identifier,
        );

        if (isErr(result)) {
            return console.warn(unwrapResult(result));
        }

        const interior = unwrapResult(result);
        if (!interior) return;

        setInteriors(prev => ({ ...prev, [identifier]: interior }));
    };

    const addInterior = (identifier: string) => {
        if (!interiors[identifier]) {
            fetchInterior(identifier);
        }
    };

    const removeInterior = (identifier: string) => {
        setInteriors(prev => {
            const { [identifier]: _, ...rest } = prev;
            return rest;
        });
    };

    // Fetch all initial interiors on mount
    useEffect(() => {
        initialIdentifiers.forEach(fetchInterior);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [initialIdentifiers.join(',')]);

    return { interiors, fetchInterior, addInterior, removeInterior };
};

export const InteriorProvider = ({ identifiers, children }: InteriorProviderProps): JSX.Element => {
    const contextValue = useInteriorProvider(identifiers);

    return <interiorContext.Provider value={contextValue}>{children}</interiorContext.Provider>;
};

export const useInterior = (): IInteriorContext => {
    const context = useContext(interiorContext);

    if (!context) {
        throw new Error('useInterior must be used within an InteriorProvider');
    }

    return context;
};
