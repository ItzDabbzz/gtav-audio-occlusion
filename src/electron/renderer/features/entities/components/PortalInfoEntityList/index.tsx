import React from 'react';

import { TableContainer, Table } from '@/electron/renderer/components/Table';
import { Checkbox } from '@/electron/renderer/components/Checkbox';

import { updatePortalEntity } from '@/electron/renderer/features/entities';

import { SmallInput } from './styles';
import { SerializedInterior } from '@/electron/common/types/interior';

const MAX_OCCLUSION_MIN = 0;
const MAX_OCCLUSION_MAX = 1;
const MAX_OCCLUSION_STEP = 0.1;

type PortalInfoEntityListProps = {
    interior: SerializedInterior;
    fetchInterior: () => Promise<void>;
};

export const PortalInfoEntityList = ({
    interior,
    fetchInterior,
}: PortalInfoEntityListProps): JSX.Element | null => {
    if (!interior) {
        return null;
    }

    const portalInfoList = interior.naOcclusionInteriorMetadata.portalInfoList;
    const { identifier } = interior;

    const updateMaxOcclusion = (portalInfoIndex: number, entityIndex: number, maxOcclusion: string): void => {
        const parsedMaxOcclusion = Number(maxOcclusion);

        if (isNaN(parsedMaxOcclusion)) return;

        updatePortalEntity(identifier, portalInfoIndex, entityIndex, { maxOcclusion: parsedMaxOcclusion });
        fetchInterior();
    };

    const updateIsDoor = (portalInfoIndex: number, entityIndex: number, isDoor: boolean): void => {
        updatePortalEntity(identifier, portalInfoIndex, entityIndex, { isDoor });
        fetchInterior();
    };

    const updateIsGlass = (portalInfoIndex: number, entityIndex: number, isGlass: boolean): void => {
        updatePortalEntity(identifier, portalInfoIndex, entityIndex, { isGlass });
        fetchInterior();
    };

    const renderEntities = (): React.ReactNode[] => {
        const rows = [];

        let renderedPortals = 0;

        portalInfoList
            .sort((a, b) => a.portalIndex - b.portalIndex)
            .forEach(portalInfo => {
                const { portalEntityList } = portalInfo;

                if (!portalEntityList.length) return;

                renderedPortals++;

                const isEven = (renderedPortals + 1) % 2 === 0;
                const rowSpan = portalEntityList.length;

                portalEntityList.forEach((portalEntity, portalEntityIndex) => {
                    const { maxOcclusion, entityModelName, entityModelHashKey, isDoor, isGlass } = portalEntity;

                    const key = `${portalInfo.infoIndex}:${portalEntityIndex}`;

                    const isFirstEntity = portalEntityIndex === 0;

                    rows.push(
                        <tr key={key} className={isEven ? 'even' : 'odd'}>
                            {isFirstEntity && (
                                <>
                                    <td rowSpan={rowSpan}>{portalInfo.portalIndex}</td>
                                    <td rowSpan={rowSpan}>{`${portalInfo.roomIdx} -> ${portalInfo.destRoomIdx}`}</td>
                                </>
                            )}
                            <td>{entityModelName ?? entityModelHashKey}</td>
                            <td>
                                <SmallInput
                                    value={maxOcclusion}
                                    type="number"
                                    min={MAX_OCCLUSION_MIN}
                                    max={MAX_OCCLUSION_MAX}
                                    step={MAX_OCCLUSION_STEP}
                                    onChange={e =>
                                        updateMaxOcclusion(portalInfo.infoIndex, portalEntityIndex, e.target.value)
                                    }
                                />
                            </td>
                            <td>
                                <Checkbox
                                    checked={isDoor}
                                    onClick={() => updateIsDoor(portalInfo.infoIndex, portalEntityIndex, !isDoor)}
                                />
                            </td>
                            <td>
                                <Checkbox
                                    checked={isGlass}
                                    onClick={() => updateIsGlass(portalInfo.infoIndex, portalEntityIndex, !isGlass)}
                                />
                            </td>
                        </tr>,
                    );
                });
            });

        return rows;
    };

    return (
        <TableContainer>
            <Table alternatedRowColors={false}>
                <thead>
                    <tr>
                        <th>Portal index</th>
                        <th>Rooms</th>
                        <th>Model</th>
                        <th>Max occlusion</th>
                        <th>Is door</th>
                        <th>Is glass</th>
                    </tr>
                </thead>
                <tbody>{renderEntities()}</tbody>
            </Table>
        </TableContainer>
    );
};
