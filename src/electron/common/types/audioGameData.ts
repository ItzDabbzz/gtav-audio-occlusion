export type SerializedInteriorAudioGameData = {
    flags: number;
    name: string;
    unk0: number;
    unk1: number;
    unk2: number;
    rooms: string[];
};

export type SerializedInteriorRoomAudioGameData = {
    Name: string;

    Flags: number;

    RoomName: string;
    AmbientZone: string;

    InteriorType: number;
    ReverbSmall: number;
    ReverbMedium: number;
    ReverbLarge: number;

    RoomToneSound: string;

    RainType: number;
    ExteriorAudibility: number;
    RoomOcclusionDamping: number;
    NonMarkedPortalOcclusion: number;
    DistanceFromPortalForOcclusion: number;
    DistanceFromPortalFadeDistance: number;

    WeaponMetrics: string;
    InteriorWallaSoundSet: string;
};
