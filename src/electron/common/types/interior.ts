import { SerializedNaOcclusionInteriorMetadata } from './naOcclusionInteriorMetadata';
import { SerializedInteriorAudioGameData, SerializedInteriorRoomAudioGameData } from './audioGameData';

export type CreateProjectDTO = {
    name: string;
    path: string;
    interiors: CreateInteriorDTO[];
};
export type CreateInteriorDTO = {
    name: string;
    mapDataFilePath: string;
    mapTypesFilePath: string;
};


export type SerializedInterior = {
    identifier: string;
    path: string;
    mapDataFilePath: string;
    mapTypesFilePath: string;
    naOcclusionInteriorMetadata: SerializedNaOcclusionInteriorMetadata;
    interiorAudioGameData: SerializedInteriorAudioGameData;
    interiorRoomAudioGameDataList: SerializedInteriorRoomAudioGameData[];
    naOcclusionInteriorMetadataPath: string;
    audioGameDataPath: string;
    audioMixDataPath: string;
};

export enum InteriorAPI {
    GET_INTERIOR = 'interior/get',
    UPDATE_PORTAL_INFO = 'interior/updatePortalInfo',
    UPDATE_PORTAL_INFO_ENTITY = 'interior/updatePortalInfoEntity',
    UPDATE_INTERIOR_ROOM_AUDIO_GAME_DATA = 'interior/updateInteriorRoomAudioGameData',
}
