// This is the value that is used from the Device Manager and the Service Center
// to use as placeholder for non-existing or invalid values.
export const NoValue = ' - ';

export const toReadableByteSize = (sizeInBytes: number | null = null): string => {
  if (sizeInBytes != null) {
    let i = 0;
    const byteUnits = [' B', ' kB', ' MB', ' GB', ' TB', 'PB', 'EB', 'ZB', 'YB'];
    while (sizeInBytes >= 1024) {
      sizeInBytes /= 1024;
      i++;
    }
    return i > 0 ? Math.max(sizeInBytes, 0.1).toFixed(1) + byteUnits[i] : sizeInBytes + byteUnits[i];
  }
  return NoValue;
};
