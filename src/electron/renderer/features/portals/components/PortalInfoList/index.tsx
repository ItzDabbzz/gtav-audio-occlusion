import React from 'react';

import { TableContainer, Table } from '@/electron/renderer/components/Table';
import { Checkbox } from '@/electron/renderer/components/Checkbox';

import { updatePortalInfo } from '@/electron/renderer/features/portals';
import { SerializedInterior } from '@/electron/common/types/interior';

type PortalInfoListProps = {
    interior: SerializedInterior;
    fetchInterior: () => Promise<void>;
};

export const PortalInfoList = ({
    interior,
    fetchInterior,
}: PortalInfoListProps): JSX.Element | null => {
    if (!interior) {
        return null;
    }

    const setPortalInfoEnabled = (portalInfoIndex: number, enabled: boolean): void => {
        updatePortalInfo(interior.identifier, portalInfoIndex, { enabled });
        fetchInterior();
    };

    const portalInfoList = interior.naOcclusionInteriorMetadata.portalInfoList.sort(
        (a, b) => a.portalIndex + a.destRoomIdx - (b.portalIndex + b.destRoomIdx),
    );

    return (
        <TableContainer>
            <Table>
                <thead>
                    <tr>
                        <th>Portal index</th>
                        <th>Rooms</th>
                        <th>Interior from</th>
                        <th>Interior to</th>
                        <th>Enabled</th>
                    </tr>
                </thead>
                <tbody>
                    {portalInfoList.map(portalInfo => (
                        <tr key={portalInfo.infoIndex}>
                            <td>{portalInfo.portalIndex}</td>
                            <td>{`${portalInfo.destRoomIdx} -> ${portalInfo.roomIdx}`}</td>
                            <td>{portalInfo.interiorProxyHash}</td>
                            <td>{portalInfo.destInteriorHash}</td>
                            <td>
                                <Checkbox
                                    checked={portalInfo.enabled}
                                    onClick={() => setPortalInfoEnabled(portalInfo.infoIndex, !portalInfo.enabled)}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </TableContainer>
    );
};
