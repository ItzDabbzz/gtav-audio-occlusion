import React from 'react';

import { isXMLFilePath, isMapDataFilePath, isMapTypesFilePath } from '@/electron/common/utils/files';

import { useProject } from '../../context';

import { FileImporter } from '../FileImporter';
import { math } from 'polished';

export const ProjectFileImporter = () => {
    const { addInterior, setCreateModalOpen } = useProject();

    const validateFile = (file: File): boolean => isXMLFilePath(file.path);

    const onFileImport = (files: File[]): void => {
        // Group files by #map/#typ pairs (simple version: assume user drops pairs)
        const mapFiles = files.filter(f => isMapDataFilePath(f.path));
        const typFiles = files.filter(f => isMapTypesFilePath(f.path));

        // For each pair, add a new interior (prompt for name if needed)
        mapFiles.forEach((mapFile, idx) => {
            const typFile = typFiles[idx];
            if (typFile) {
                addInterior({
                    identifier: crypto.randomUUID(),
                    name: '', // You may want to prompt for this in the modal
                    mapDataFilePath: mapFile.path,
                    mapTypesFilePath: typFile.path,
                });
            }
        });
        setCreateModalOpen(true);
    };

    const onButtonClick = (): void => {
        setCreateModalOpen(true);
    };

    return <FileImporter validateFile={validateFile} onFileImport={onFileImport} onButtonClick={onButtonClick} />;
};

