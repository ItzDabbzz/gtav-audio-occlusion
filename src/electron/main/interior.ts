import { CMapData, CMapTypes, CMloInstanceDef } from '@/core/game';
import { AudioGameData, naOcclusionInteriorMetadata } from '@/core/game/audio';
import { InteriorAudioGameData, InteriorRoomAudioGameData } from '@/core/game/audio';

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

  public mapData: CMapData;
  public mapTypes: CMapTypes;
  public mloInstance: CMloInstanceDef;

  public naOcclusionInteriorMetadata: naOcclusionInteriorMetadata;
  public interiorAudioGameData: InteriorAudioGameData;
  public interiorRoomAudioGameDataList: InteriorRoomAudioGameData[];

  public naOcclusionInteriorMetadataPath: string;
  public audioGameDataPath: string;
  public audioMixDataPath: string;

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

    this.naOcclusionInteriorMetadataPath = undefined;
    this.audioGameDataPath = undefined;
    this.audioMixDataPath = undefined;
  }

  public getAudioGameData(): AudioGameData {
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
        portalInfoList: this.naOcclusionInteriorMetadata.portalInfoList.map(pi => {
          // if it's a real class instance, call toSerializable()
          if (typeof (pi as any).toSerializable === 'function') {
            return (pi as any).toSerializable();
          }
          // else it's already the JSON shape, so just pass it through
          return pi as any;
        }),
      },

      interiorAudioGameData: this.interiorAudioGameData,
      interiorRoomAudioGameDataList: this.interiorRoomAudioGameDataList,
      naOcclusionInteriorMetadataPath: this.naOcclusionInteriorMetadataPath,
      audioGameDataPath: this.audioGameDataPath,
      audioMixDataPath: this.audioMixDataPath,
    };
  }

  /**
   * Re-hydrate a SerializedInterior back into an Interior
   * without running the full constructor.
   */
  public static deserialize(data: SerializedInterior): Interior {
    // 1) make a “blank” Interior
    const interior = Object.create(Interior.prototype) as Interior;

    // 2) copy over simple fields
    interior.identifier = data.identifier;
    interior.path = data.path;
    interior.mapDataFilePath = data.mapDataFilePath;
    interior.mapTypesFilePath = data.mapTypesFilePath;
    interior.mapData = null;
    interior.mapTypes = null;
    interior.mloInstance = null;

    // 3) fake the occlusion metadata
    const fakeMeta = Object.create(NaMetaClass.prototype) as NaMetaClass;
    fakeMeta.interiorProxyHash = data.naOcclusionInteriorMetadata.interiorProxyHash;
    fakeMeta.portalInfoList = data.naOcclusionInteriorMetadata.portalInfoList as any;
    interior.naOcclusionInteriorMetadata = fakeMeta;

    // 6) restore any file‐path pointers
    interior.naOcclusionInteriorMetadataPath = data.naOcclusionInteriorMetadataPath;
    interior.audioGameDataPath = data.audioGameDataPath;
    interior.audioMixDataPath = data.audioMixDataPath;

    return interior;
  }
}
