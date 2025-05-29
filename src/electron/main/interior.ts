import { CMapData, CMapTypes, CMloInstanceDef } from '@/core/game';
import {
    AudioGameData,
    naOcclusionInteriorMetadata,
    InteriorAudioGameData,
    InteriorRoomAudioGameData,
} from '@/core/game/audio';
import {
    createNaOcclusionInteriorMetadata,
    createInteriorAudioGameData,
    createInteriorRoomAudioGameDataList,
} from '@/core';
import { naOcclusionInteriorMetadata as NaMetaClass } from '@/core/game/audio';
import { SerializedInterior } from '@/electron/common/types/interior';

type InteriorConstructor = {
    identifier: string;
    path: string;
    mapDataFilePath: string;
    mapTypesFilePath: string;
    mapData: CMapData;
    mapTypes: CMapTypes;
    mloInstance: CMloInstanceDef;
};

export class Interior {
    public identifier: string;
    public path: string;

    public mapDataFilePath: string;
    public mapTypesFilePath: string;

    // these will be null when re-hydrating from JSON
    public mapData: CMapData | null;
    public mapTypes: CMapTypes | null;
    public mloInstance: CMloInstanceDef | null;

    public naOcclusionInteriorMetadata: naOcclusionInteriorMetadata;

    // At runtime we keep the “live” classes here…
    public interiorAudioGameData: InteriorAudioGameData;
    public interiorRoomAudioGameDataList: InteriorRoomAudioGameData[];

    // …but when we serialize, we’ll convert to Serialized* shapes
    public naOcclusionInteriorMetadataPath?: string;
    public audioGameDataPath?: string;
    public audioMixDataPath?: string;

    constructor({
        identifier,
        path,
        mapDataFilePath,
        mapTypesFilePath,
        mapData,
        mapTypes,
        mloInstance,
    }: InteriorConstructor) {
        this.identifier = identifier;
        this.path = path;

        this.mapDataFilePath = mapDataFilePath;
        this.mapTypesFilePath = mapTypesFilePath;

        this.mapData = mapData;
        this.mapTypes = mapTypes;
        this.mloInstance = mloInstance;

        this.naOcclusionInteriorMetadata = createNaOcclusionInteriorMetadata(mloInstance);
        this.interiorAudioGameData = createInteriorAudioGameData(mloInstance);
        this.interiorRoomAudioGameDataList = createInteriorRoomAudioGameDataList(mloInstance);

        // initialize as undefined until we write them out
        this.naOcclusionInteriorMetadataPath = undefined;
        this.audioGameDataPath = undefined;
        this.audioMixDataPath = undefined;
    }

    public getAudioGameData(): AudioGameData {
        // AudioGameData is [InteriorAudioGameData, ...InteriorRoomAudioGameData[]]
        return [this.interiorAudioGameData, ...this.interiorRoomAudioGameDataList];
    }

    public getInteriorName(): string {
        return this.identifier;
    }

    public serialize(): SerializedInterior {
        return {
            identifier: this.identifier,
            path: this.path,
            mapDataFilePath: this.mapDataFilePath,
            mapTypesFilePath: this.mapTypesFilePath,

            naOcclusionInteriorMetadata: {
                interiorProxyHash: this.naOcclusionInteriorMetadata.interiorProxyHash,
                portalInfoList: this.naOcclusionInteriorMetadata.portalInfoList.map(pi =>
                    typeof (pi as any).toSerializable === 'function' ? (pi as any).toSerializable() : (pi as any),
                ),
            },

            interiorAudioGameData:
                typeof (this.interiorAudioGameData as any).toSerializable === 'function'
                    ? (this.interiorAudioGameData as any).toSerializable()
                    : (this.interiorAudioGameData as any),

            interiorRoomAudioGameDataList: this.interiorRoomAudioGameDataList.map(pi =>
                typeof (pi as any).toSerializable === 'function' ? (pi as any).toSerializable() : (pi as any),
            ),

            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            naOcclusionInteriorMetadataPath: this.naOcclusionInteriorMetadataPath!,
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            audioGameDataPath: this.audioGameDataPath!,
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            audioMixDataPath: this.audioMixDataPath!,
        };
    }

    public static deserialize(data: SerializedInterior): Interior {
        // 1) Make a “blank” Interior
        const interior = Object.create(Interior.prototype) as Interior;

        // 2) Restore scalars
        interior.identifier = data.identifier;
        interior.path = data.path;
        interior.mapDataFilePath = data.mapDataFilePath;
        interior.mapTypesFilePath = data.mapTypesFilePath;

        // 3) We aren’t re‐parsing XML on load, so leave these null
        interior.mapData = null;
        interior.mapTypes = null;
        interior.mloInstance = null;

        // 4) Fake the occlusion metadata
        const fakeMeta = Object.create(NaMetaClass.prototype) as NaMetaClass;
        fakeMeta.interiorProxyHash = data.naOcclusionInteriorMetadata.interiorProxyHash;
        fakeMeta.portalInfoList = data.naOcclusionInteriorMetadata.portalInfoList as any;
        interior.naOcclusionInteriorMetadata = fakeMeta;

        // 5) Restore your game‐data lists so you don’t lose Flags, etc.
        interior.interiorAudioGameData = data.interiorAudioGameData as any;
        interior.interiorRoomAudioGameDataList = data.interiorRoomAudioGameDataList as any;

        // 6) Restore the last‐written file paths
        interior.naOcclusionInteriorMetadataPath = data.naOcclusionInteriorMetadataPath;
        interior.audioGameDataPath = data.audioGameDataPath;
        interior.audioMixDataPath = data.audioMixDataPath;

        return interior;
    }
}
