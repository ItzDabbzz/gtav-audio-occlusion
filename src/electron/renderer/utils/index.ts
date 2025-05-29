export const parseHexToString = (value?: number): string => {
    // if (value == null || isNaN(value)) {
    //     return '';
    // }
    return `0x${value.toString(16).toUpperCase()}`;
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function hexToRgba(hex: string | undefined, alpha = 1): string {
    if (!hex || typeof hex !== 'string') {
        // fallback to black translucent
        return `rgba(0,0,0,${alpha})`;
    }
    // strip leading #
    const cleaned = hex.replace(/^#/, '');

    // expand 3-digit (#abc => #aabbcc)
    const full =
        cleaned.length === 3
            ? cleaned
                  .split('')
                  .map(c => c + c)
                  .join('')
            : cleaned;

    const intVal = parseInt(full, 16);
    const r = (intVal >> 16) & 255;
    const g = (intVal >> 8) & 255;
    const b = intVal & 255;
    return `rgba(${r},${g},${b},${alpha})`;
}
