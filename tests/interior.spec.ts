import path from 'path';

import { CodeWalkerFormat } from '../src/core/formats/codewalker';
import { XML } from '../src/core/types';
import { CMloArchetypeDef, isCMloArchetypeDef } from '../src/core/game';

const YTYP_FILE_PATH = path.resolve('tests', 'data', 'v_int_66.ytyp.xml');

let codeWalkerFormat: CodeWalkerFormat;
let cMloArchetypeDef: CMloArchetypeDef;

describe('Example interior is the 24/7 shop', () => {
    beforeAll(async () => {
        codeWalkerFormat = new CodeWalkerFormat();

        const data = await codeWalkerFormat.readFile<XML.Ytyp>(YTYP_FILE_PATH);
        const cMapTypes = codeWalkerFormat.parseCMapTypes(data);

        const archetype = cMapTypes.archetypes.find(isCMloArchetypeDef);

        if (archetype) {
            cMloArchetypeDef = archetype;
        } else {
            throw new Error(`Couldn't find CMloArchetypeDef`);
        }
    });

    it('should be an archetype with type CMloArchetypeDef', async () => {
        expect(cMloArchetypeDef.type).toBe('CMloArchetypeDef');
    });

    it('should be called v_shop_247', async () => {
        expect(cMloArchetypeDef.name).toBe('v_shop_247');
    });

    // limbo
    // V_66_ShopRm
    // V_66_BackRm
    it('should have 3 rooms', async () => {
        expect(cMloArchetypeDef.rooms).toHaveLength(3);
    });

    it('should have 6 portals', async () => {
        expect(cMloArchetypeDef.portals).toHaveLength(6);
    });

    it('should have 104 entities', async () => {
        expect(cMloArchetypeDef.entities).toHaveLength(104);
    });
});
