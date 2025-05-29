import { CMloArchetypeDef } from '../../CMloArchetypeDef';
import { CMloRoomDef } from '../../CMloRoomDef';

import { getInteriorRoomName } from '../utils';

export class InteriorRoomAudioGameData {
    public Name: string;

    public Flags: number;

    public RoomName: string;
    public AmbientZone: string;

    public InteriorType: number;
    public ReverbSmall: number;
    public ReverbMedium: number;
    public ReverbLarge: number;

    public RoomToneSound: string;

    public RainType: number;
    public ExteriorAudibility: number;
    public RoomOcclusionDamping: number;
    public NonMarkedPortalOcclusion: number;
    public DistanceFromPortalForOcclusion: number;
    public DistanceFromPortalFadeDistance: number;

    public WeaponMetrics: string;
    public InteriorWallaSoundSet: string;

    constructor(cMloArchetypeDef: CMloArchetypeDef, cMloRoomDef: CMloRoomDef) {
        this.Name = getInteriorRoomName(cMloArchetypeDef.name, cMloRoomDef);

        this.Flags = 0xaaaaaaaa;

        this.RoomName = cMloRoomDef.name;
        this.AmbientZone = undefined;

        this.InteriorType = 0;
        this.ReverbSmall = 0.35;
        this.ReverbMedium = 0;
        this.ReverbLarge = 0;

        this.RoomToneSound = 'null_sound';

        this.RainType = 0;
        this.ExteriorAudibility = 0;
        this.RoomOcclusionDamping = 0;
        this.NonMarkedPortalOcclusion = 0.7;
        this.DistanceFromPortalForOcclusion = 0;
        this.DistanceFromPortalFadeDistance = 50;

        this.WeaponMetrics = undefined; // Static emitter hash?
        this.InteriorWallaSoundSet = 'hash_D4855127';
    }
}

export const isInteriorRoomAudioGameData = (value: unknown): value is InteriorRoomAudioGameData =>
    value instanceof InteriorRoomAudioGameData;
