import React from 'react';

import { SerializedInteriorRoomAudioGameData } from '@/electron/common/types/audioGameData';

import { TableContainer, Table } from '@/electron/renderer/components/Table';

import { parseHexToString } from '@/electron/renderer/utils';

import { updateInteriorRoomAudioGameData } from '../../index';

import { InputWrapper, MediumInput, SmallInput, ScrollContainer } from './styles';
import { SerializedInterior } from '@/electron/common/types/interior';

type InteriorRoomAudioGameDataListProps = {
    interior: SerializedInterior;
    fetchInterior: () => Promise<void>;
};

export const InteriorRoomAudioGameDataList = ({
    interior,
    fetchInterior,
}: InteriorRoomAudioGameDataListProps): JSX.Element | null => {
    if (!interior || !interior.interiorRoomAudioGameDataList) {
        return null;
    }

    const { identifier, interiorRoomAudioGameDataList } = interior;
    const roomList = interiorRoomAudioGameDataList || [];

    const update = async (roomIndex: number, data: Partial<SerializedInteriorRoomAudioGameData>): Promise<void> => {
        for (const key in data) {
            if (Object.prototype.hasOwnProperty.call(data, key)) {
                const value = data[key];
                if (typeof value !== 'string' && isNaN(value)) return;
            }
        }

        await updateInteriorRoomAudioGameData(identifier, roomIndex, data);
        await fetchInterior();
    };

    return (
        <ScrollContainer>
            <TableContainer>
                <Table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Flags</th>
                            <th>RoomName</th>
                            <th>AmbientZone</th>
                            <th>InteriorType</th>
                            <th>ReverbSmall</th>
                            <th>ReverbMedium</th>
                            <th>ReverbLarge</th>
                            <th>RoomToneSound</th>
                            <th>RainType</th>
                            <th>ExteriorAudibility</th>
                            <th>RoomOcclusionDamping</th>
                            <th>NonMarkedPortalOcclusion</th>
                            <th>DistanceFromPortalForOcclusion</th>
                            <th>DistanceFromPortalFadeDistance</th>
                            <th>WeaponMetrics</th>
                            <th>InteriorWallaSoundSet</th>
                        </tr>
                    </thead>
                    <tbody>
                        {roomList.map((interiorRoomAudioGameData, index) => (
                            <tr key={index}>
                                <td>{interiorRoomAudioGameData.Name}</td>
                                <td>{parseHexToString(interiorRoomAudioGameData.Flags)}</td>
                                <td>{interiorRoomAudioGameData.RoomName}</td>
                                <td>
                                    <InputWrapper>
                                        <MediumInput
                                            value={interiorRoomAudioGameData.AmbientZone}
                                            type="text"
                                            onChange={e => update(index, { AmbientZone: e.target.value })}
                                        />
                                    </InputWrapper>
                                </td>
                                <td>
                                    <InputWrapper>
                                        <SmallInput
                                            value={interiorRoomAudioGameData.InteriorType}
                                            type="number"
                                            onChange={e => update(index, { InteriorType: Number(e.target.value) })}
                                        />
                                    </InputWrapper>
                                </td>
                                <td>
                                    <InputWrapper>
                                        <SmallInput
                                            value={interiorRoomAudioGameData.ReverbSmall}
                                            type="number"
                                            step={0.05}
                                            onChange={e => update(index, { ReverbSmall: Number(e.target.value) })}
                                        />
                                    </InputWrapper>
                                </td>
                                <td>
                                    <InputWrapper>
                                        <SmallInput
                                            value={interiorRoomAudioGameData.ReverbMedium}
                                            type="number"
                                            min={0}
                                            max={1}
                                            step={0.1}
                                            onChange={e => update(index, { ReverbMedium: Number(e.target.value) })}
                                        />
                                    </InputWrapper>
                                </td>
                                <td>
                                    <InputWrapper>
                                        <SmallInput
                                            value={interiorRoomAudioGameData.ReverbLarge}
                                            type="number"
                                            min={0}
                                            max={1}
                                            step={0.1}
                                            onChange={e => update(index, { ReverbLarge: Number(e.target.value) })}
                                        />
                                    </InputWrapper>
                                </td>
                                <td>
                                    <InputWrapper>
                                        <MediumInput
                                            value={interiorRoomAudioGameData.RoomToneSound}
                                            type="text"
                                            onChange={e => update(index, { RoomToneSound: e.target.value })}
                                        />
                                    </InputWrapper>
                                </td>
                                <td>
                                    <InputWrapper>
                                        <SmallInput
                                            value={interiorRoomAudioGameData.RainType}
                                            type="number"
                                            onChange={e => update(index, { RainType: Number(e.target.value) })}
                                        />
                                    </InputWrapper>
                                </td>
                                <td>
                                    <InputWrapper>
                                        <SmallInput
                                            value={interiorRoomAudioGameData.ExteriorAudibility}
                                            type="number"
                                            onChange={e =>
                                                update(index, { ExteriorAudibility: Number(e.target.value) })
                                            }
                                        />
                                    </InputWrapper>
                                </td>
                                <td>
                                    <InputWrapper>
                                        <SmallInput
                                            value={interiorRoomAudioGameData.RoomOcclusionDamping}
                                            type="number"
                                            onChange={e =>
                                                update(index, { RoomOcclusionDamping: Number(e.target.value) })
                                            }
                                        />
                                    </InputWrapper>
                                </td>
                                <td>
                                    <InputWrapper>
                                        <SmallInput
                                            value={interiorRoomAudioGameData.NonMarkedPortalOcclusion}
                                            type="number"
                                            step={0.1}
                                            onChange={e =>
                                                update(index, { NonMarkedPortalOcclusion: Number(e.target.value) })
                                            }
                                        />
                                    </InputWrapper>
                                </td>
                                <td>
                                    <InputWrapper>
                                        <SmallInput
                                            value={interiorRoomAudioGameData.DistanceFromPortalForOcclusion}
                                            type="number"
                                            onChange={e =>
                                                update(index, {
                                                    DistanceFromPortalForOcclusion: Number(e.target.value),
                                                })
                                            }
                                        />
                                    </InputWrapper>
                                </td>
                                <td>
                                    <InputWrapper>
                                        <SmallInput
                                            value={interiorRoomAudioGameData.DistanceFromPortalFadeDistance}
                                            type="number"
                                            onChange={e =>
                                                update(index, {
                                                    DistanceFromPortalFadeDistance: Number(e.target.value),
                                                })
                                            }
                                        />
                                    </InputWrapper>
                                </td>
                                <td>
                                    <InputWrapper>
                                        <MediumInput
                                            value={interiorRoomAudioGameData.WeaponMetrics}
                                            type="text"
                                            onChange={e => update(index, { WeaponMetrics: e.target.value })}
                                        />
                                    </InputWrapper>
                                </td>
                                <td>{interiorRoomAudioGameData.InteriorWallaSoundSet}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </TableContainer>
        </ScrollContainer>
    );
};
