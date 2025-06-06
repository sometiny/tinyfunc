import Base64 from './base64';
import Utf8 from './utf8';
const RS_BLOCK_TABLE = [
  [1, 26, 19],
  [1, 26, 16],
  [1, 26, 13],
  [1, 26, 9],
  [1, 44, 34],
  [1, 44, 28],
  [1, 44, 22],
  [1, 44, 16],
  [1, 70, 55],
  [1, 70, 44],
  [2, 35, 17],
  [2, 35, 13],
  [1, 100, 80],
  [2, 50, 32],
  [2, 50, 24],
  [4, 25, 9],
  [1, 134, 108],
  [2, 67, 43],
  [2, 33, 15, 2, 34, 16],
  [2, 33, 11, 2, 34, 12],
  [2, 86, 68],
  [4, 43, 27],
  [4, 43, 19],
  [4, 43, 15],
  [2, 98, 78],
  [4, 49, 31],
  [2, 32, 14, 4, 33, 15],
  [4, 39, 13, 1, 40, 14],
  [2, 121, 97],
  [2, 60, 38, 2, 61, 39],
  [4, 40, 18, 2, 41, 19],
  [4, 40, 14, 2, 41, 15],
  [2, 146, 116],
  [3, 58, 36, 2, 59, 37],
  [4, 36, 16, 4, 37, 17],
  [4, 36, 12, 4, 37, 13],
  [2, 86, 68, 2, 87, 69],
  [4, 69, 43, 1, 70, 44],
  [6, 43, 19, 2, 44, 20],
  [6, 43, 15, 2, 44, 16],
  [4, 101, 81],
  [1, 80, 50, 4, 81, 51],
  [4, 50, 22, 4, 51, 23],
  [3, 36, 12, 8, 37, 13],
  [2, 116, 92, 2, 117, 93],
  [6, 58, 36, 2, 59, 37],
  [4, 46, 20, 6, 47, 21],
  [7, 42, 14, 4, 43, 15],
  [4, 133, 107],
  [8, 59, 37, 1, 60, 38],
  [8, 44, 20, 4, 45, 21],
  [12, 33, 11, 4, 34, 12],
  [3, 145, 115, 1, 146, 116],
  [4, 64, 40, 5, 65, 41],
  [11, 36, 16, 5, 37, 17],
  [11, 36, 12, 5, 37, 13],
  [5, 109, 87, 1, 110, 88],
  [5, 65, 41, 5, 66, 42],
  [5, 54, 24, 7, 55, 25],
  [11, 36, 12],
  [5, 122, 98, 1, 123, 99],
  [7, 73, 45, 3, 74, 46],
  [15, 43, 19, 2, 44, 20],
  [3, 45, 15, 13, 46, 16],
  [1, 135, 107, 5, 136, 108],
  [10, 74, 46, 1, 75, 47],
  [1, 50, 22, 15, 51, 23],
  [2, 42, 14, 17, 43, 15],
  [5, 150, 120, 1, 151, 121],
  [9, 69, 43, 4, 70, 44],
  [17, 50, 22, 1, 51, 23],
  [2, 42, 14, 19, 43, 15],
  [3, 141, 113, 4, 142, 114],
  [3, 70, 44, 11, 71, 45],
  [17, 47, 21, 4, 48, 22],
  [9, 39, 13, 16, 40, 14],
  [3, 135, 107, 5, 136, 108],
  [3, 67, 41, 13, 68, 42],
  [15, 54, 24, 5, 55, 25],
  [15, 43, 15, 10, 44, 16],
  [4, 144, 116, 4, 145, 117],
  [17, 68, 42],
  [17, 50, 22, 6, 51, 23],
  [19, 46, 16, 6, 47, 17],
  [2, 139, 111, 7, 140, 112],
  [17, 74, 46],
  [7, 54, 24, 16, 55, 25],
  [34, 37, 13],
  [4, 151, 121, 5, 152, 122],
  [4, 75, 47, 14, 76, 48],
  [11, 54, 24, 14, 55, 25],
  [16, 45, 15, 14, 46, 16],
  [6, 147, 117, 4, 148, 118],
  [6, 73, 45, 14, 74, 46],
  [11, 54, 24, 16, 55, 25],
  [30, 46, 16, 2, 47, 17],
  [8, 132, 106, 4, 133, 107],
  [8, 75, 47, 13, 76, 48],
  [7, 54, 24, 22, 55, 25],
  [22, 45, 15, 13, 46, 16],
  [10, 142, 114, 2, 143, 115],
  [19, 74, 46, 4, 75, 47],
  [28, 50, 22, 6, 51, 23],
  [33, 46, 16, 4, 47, 17],
  [8, 152, 122, 4, 153, 123],
  [22, 73, 45, 3, 74, 46],
  [8, 53, 23, 26, 54, 24],
  [12, 45, 15, 28, 46, 16],
  [3, 147, 117, 10, 148, 118],
  [3, 73, 45, 23, 74, 46],
  [4, 54, 24, 31, 55, 25],
  [11, 45, 15, 31, 46, 16],
  [7, 146, 116, 7, 147, 117],
  [21, 73, 45, 7, 74, 46],
  [1, 53, 23, 37, 54, 24],
  [19, 45, 15, 26, 46, 16],
  [5, 145, 115, 10, 146, 116],
  [19, 75, 47, 10, 76, 48],
  [15, 54, 24, 25, 55, 25],
  [23, 45, 15, 25, 46, 16],
  [13, 145, 115, 3, 146, 116],
  [2, 74, 46, 29, 75, 47],
  [42, 54, 24, 1, 55, 25],
  [23, 45, 15, 28, 46, 16],
  [17, 145, 115],
  [10, 74, 46, 23, 75, 47],
  [10, 54, 24, 35, 55, 25],
  [19, 45, 15, 35, 46, 16],
  [17, 145, 115, 1, 146, 116],
  [14, 74, 46, 21, 75, 47],
  [29, 54, 24, 19, 55, 25],
  [11, 45, 15, 46, 46, 16],
  [13, 145, 115, 6, 146, 116],
  [14, 74, 46, 23, 75, 47],
  [44, 54, 24, 7, 55, 25],
  [59, 46, 16, 1, 47, 17],
  [12, 151, 121, 7, 152, 122],
  [12, 75, 47, 26, 76, 48],
  [39, 54, 24, 14, 55, 25],
  [22, 45, 15, 41, 46, 16],
  [6, 151, 121, 14, 152, 122],
  [6, 75, 47, 34, 76, 48],
  [46, 54, 24, 10, 55, 25],
  [2, 45, 15, 64, 46, 16],
  [17, 152, 122, 4, 153, 123],
  [29, 74, 46, 14, 75, 47],
  [49, 54, 24, 10, 55, 25],
  [24, 45, 15, 46, 46, 16],
  [4, 152, 122, 18, 153, 123],
  [13, 74, 46, 32, 75, 47],
  [48, 54, 24, 14, 55, 25],
  [42, 45, 15, 32, 46, 16],
  [20, 147, 117, 4, 148, 118],
  [40, 75, 47, 7, 76, 48],
  [43, 54, 24, 22, 55, 25],
  [10, 45, 15, 67, 46, 16],
  [19, 148, 118, 6, 149, 119],
  [18, 75, 47, 31, 76, 48],
  [34, 54, 24, 34, 55, 25],
  [20, 45, 15, 61, 46, 16],
];
const newQRCodeData = function (i, h) {
  const g = {};
  g.totalCount = i;
  g.dataCount = h;
  return g;
};
const getRsBlockTable = function (h, g) {
  switch (g) {
    case ECCLevel.L:
      return RS_BLOCK_TABLE[(h - 1) * 4];
    case ECCLevel.M:
      return RS_BLOCK_TABLE[(h - 1) * 4 + 1];
    case ECCLevel.Q:
      return RS_BLOCK_TABLE[(h - 1) * 4 + 2];
    case ECCLevel.H:
      return RS_BLOCK_TABLE[(h - 1) * 4 + 3];
    default:
      return undefined;
  }
};
const getRSBlocks = function (D, i) {
  const B = getRsBlockTable(D, i);
  if (typeof B === 'undefined') {
    throw new Error('bad rs block @ typeNumber:' + D + '/errorCorrectLevel:' + i);
  }
  const l = B.length / 3;
  const A = [];
  for (let j = 0; j < l; j += 1) {
    const g = B[j * 3];
    const C = B[j * 3 + 1];
    const h = B[j * 3 + 2];
    for (let k = 0; k < g; k += 1) {
      A.push(newQRCodeData(C, h));
    }
  }
  return A;
};

const qrBitBuffer = function () {
  const c = [];
  let d = 0;
  const e = {};
  e.getBuffer = function () {
    return c;
  };
  e.get = function (g) {
    const f = Math.floor(g / 8);
    return ((c[f] >>> (7 - (g % 8))) & 1) === 1;
  };
  e.put = function (h, g) {
    for (let f = 0; f < g; f += 1) {
      e.putBit(((h >>> (g - f - 1)) & 1) === 1);
    }
  };
  e.getLengthInBits = function () {
    return d;
  };
  e.putBit = function (f) {
    const g = Math.floor(d / 8);
    if (c.length <= g) c.push(0);
    if (f) c[g] |= 128 >>> d % 8;
    d += 1;
  };
  return e;
};
const qr8BitByte = function (data) {
  const _bytes = QRCode.stringToBytes(data);
  return {
    getMode: () => 1 << 2,
    getLength: () => _bytes.length,
    write: buffer => {
      for (let i = 0; i < _bytes.length; i++) {
        buffer.put(_bytes[i], 8);
      }
    },
  };
};
const BitmapImage = function (width, height, bitCount) {
  bitCount = bitCount || 24;
  const bytePerPixel = bitCount / 8;
  const width_ = width;
  const height_ = height;
  const pixels = new Array(width * height);
  let h = 0;
  const image = {};
  const writer = StreamWriter();
  image.Width = width_;
  image.Height = height_;
  image.Pixel = function (x, y, color) {
    const position = (height - y - 1) * h + x * bytePerPixel;
    pixels[position] = color & 255;
    pixels[position + 1] = (color >>> 8) & 255;
    pixels[position + 2] = (color >>> 16) & 255;
    if (bytePerPixel === 4) {
      pixels[position + 3] = (color >>> 24) & 255;
    }
  };
  const writeHeader = function () {
    writer.writeString('BM');
    h = ((width_ * bitCount + 31) & ~31) / 8;
    const y = h * height_;
    writer.writeLong(y + 54);
    writer.writeBytes([0, 0, 0, 0, 54, 0, 0, 0, 40, 0, 0, 0]);
    writer.writeLong(width_);
    writer.writeLong(height_);
    writer.writeBytes([1, 0, bitCount, 0, 0, 0, 0, 0]);
    writer.writeLong(y);
    writer.writeBytes([18, 11, 0, 0, 18, 11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    pixels.length = y;
    return h - width_ * bytePerPixel;
  };
  image.flush = function () {
    return writer.toByteArray().concat(pixels);
  };
  writeHeader();
  return image;
};

const QRCode = function (typeNumber, eccLevel) {
  const mapData = function (data, maskPattern) {
    let inc = -1;
    let row = _moduleCount - 1;
    let w = 7;
    let x = 0;
    const E = QRUtil.getMaskFunction(maskPattern);
    for (let z = _moduleCount - 1; z > 0; z -= 2) {
      if (z === 6) {
        z -= 1;
      }
      while (true) {
        for (let y = 0; y < 2; y += 1) {
          if (_modules[row][z - y] == null) {
            let A = false;
            if (x < data.length) {
              A = ((data[x] >>> w) & 1) === 1;
            }
            const D = E(row, z - y);
            if (D) {
              A = !A;
            }
            _modules[row][z - y] = A;
            w -= 1;
            if (w === -1) {
              x += 1;
              w = 7;
            }
          }
        }
        row += inc;
        if (row < 0 || _moduleCount <= row) {
          row -= inc;
          inc = -inc;
          break;
        }
      }
    }
  };
  const setupTypeInfo = function (test, maskPattern) {
    let A;
    let y;
    const x = (_errorCorrectionLevel << 3) | maskPattern;
    const w = QRUtil.getBCHTypeInfo(x);
    for (y = 0; y < 15; y += 1) {
      A = !test && ((w >> y) & 1) === 1;
      if (y < 6) {
        _modules[y][8] = A;
      } else {
        if (y < 8) {
          _modules[y + 1][8] = A;
        } else {
          _modules[_moduleCount - 15 + y][8] = A;
        }
      }
    }
    for (y = 0; y < 15; y += 1) {
      A = !test && ((w >> y) & 1) === 1;
      if (y < 8) {
        _modules[8][_moduleCount - y - 1] = A;
      } else {
        if (y < 9) {
          _modules[8][15 - y - 1 + 1] = A;
        } else {
          _modules[8][15 - y - 1] = A;
        }
      }
    }
    _modules[_moduleCount - 8][8] = !test;
  };
  const setupTypeNumber = function (test) {
    let y;
    let x;
    const bits = QRUtil.getBCHTypeNumber(_typeNumber);
    for (x = 0; x < 18; x += 1) {
      y = !test && ((bits >> x) & 1) === 1;
      _modules[Math.floor(x / 3)][(x % 3) + _moduleCount - 8 - 3] = y;
    }
    for (x = 0; x < 18; x += 1) {
      y = !test && ((bits >> x) & 1) === 1;
      _modules[(x % 3) + _moduleCount - 8 - 3][Math.floor(x / 3)] = y;
    }
  };
  const setupPositionAdjustPattern = function () {
    const pos = QRUtil.getPatternPosition(_typeNumber);
    for (let y = 0; y < pos.length; y += 1) {
      for (let z = 0; z < pos.length; z += 1) {
        const row = pos[y];
        const col = pos[z];
        if (_modules[row][col] != null) continue;
        for (let B = -2; B <= 2; B += 1) {
          for (let w = -2; w <= 2; w += 1) {
            _modules[row + B][col + w] = B === -2 || B === 2 || w === -2 || w === 2 || (B === 0 && w === 0);
          }
        }
      }
    }
  };
  const setupTimingPattern = function () {
    for (let x = 8; x < _moduleCount - 8; x += 1) {
      if (_modules[x][6] != null) continue;
      _modules[x][6] = x % 2 === 0;
    }
    for (let w = 8; w < _moduleCount - 8; w += 1) {
      if (_modules[6][w] != null) continue;
      _modules[6][w] = w % 2 === 0;
    }
  };
  const setupPositionProbePattern = function (row, col) {
    for (let y = -1; y <= 7; y += 1) {
      if (row + y <= -1 || _moduleCount <= row + y) continue;
      for (let w = -1; w <= 7; w += 1) {
        if (col + w <= -1 || _moduleCount <= col + w) continue;
        _modules[row + y][col + w] =
          (y >= 0 && y <= 6 && (w === 0 || w === 6)) ||
          (w >= 0 && w <= 6 && (y === 0 || y === 6)) ||
          (y >= 2 && y <= 4 && w >= 2 && w <= 4);
      }
    }
  };
  const createData = function (typeNumber, errorCorrectionLevel, dataList) {
    const rsBlocks = getRSBlocks(typeNumber, errorCorrectionLevel);
    const buffer = qrBitBuffer();
    const x = dataList;
    buffer.put(x.getMode(), 4);
    buffer.put(x.getLength(), QRUtil.getLengthInBits(x.getMode(), typeNumber));
    x.write(buffer);
    let totalDataCount = 0;
    for (let i = 0; i < rsBlocks.length; i += 1) totalDataCount += rsBlocks[i].dataCount;
    if (buffer.getLengthInBits() > totalDataCount * 8) {
      throw new Error('code length overflow. (' + buffer.getLengthInBits() + '>' + totalDataCount * 8 + ')');
    }
    if (buffer.getLengthInBits() + 4 <= totalDataCount * 8) buffer.put(0, 4);
    while (buffer.getLengthInBits() % 8 !== 0) buffer.putBit(false);
    while (true) {
      if (buffer.getLengthInBits() >= totalDataCount * 8) break;
      buffer.put(0xec, 8);
      if (buffer.getLengthInBits() >= totalDataCount * 8) break;
      buffer.put(0x11, 8);
    }
    return createBytes(buffer, rsBlocks);
  };
  if (typeof typeNumber === 'string') {
    const qrcode = QRCode(0, 'Q');
    qrcode.useBestMaskPattern = true;
    return qrcode.getBase64(...arguments);
  }
  let _typeNumber = typeNumber;
  const _errorCorrectionLevel = ECCLevel[eccLevel];
  let _modules = null;
  let _moduleCount = 0;
  let _dataCache = null;
  let _data = null;
  const makeImpl = function (test, maskPattern) {
    _moduleCount = _typeNumber * 4 + 17;
    _modules = (function (moduleCount) {
      const modules = new Array(moduleCount);
      for (let row = 0; row < moduleCount; row += 1) {
        modules[row] = new Array(moduleCount);
        for (let col = 0; col < moduleCount; col += 1) {
          modules[row][col] = null;
        }
      }
      return modules;
    })(_moduleCount);
    setupPositionProbePattern(0, 0);
    setupPositionProbePattern(_moduleCount - 7, 0);
    setupPositionProbePattern(0, _moduleCount - 7);
    setupPositionAdjustPattern();
    setupTimingPattern();
    setupTypeInfo(test, maskPattern);
    if (_typeNumber >= 7) {
      setupTypeNumber(test);
    }
    if (_dataCache == null) {
      _dataCache = createData(_typeNumber, _errorCorrectionLevel, _data);
    }
    mapData(_dataCache, maskPattern);
  };
  const setArrayValue = function (x, y) {
    if (y === undefined) {
      y = 0;
    }
    for (let w = 0; w < x.length; w++) {
      x[w] = y;
    }
    return x;
  };
  const getTypeNumber2 = function (data, typeNumber) {
    if(typeNumber > 0) return typeNumber;
    let _typeNumber = 1;

    for (; _typeNumber < 40; _typeNumber++) {
      const rsBlocks = getRSBlocks(
        _typeNumber,
        _errorCorrectionLevel
      );
      const buffer = qrBitBuffer();

      buffer.put(data.getMode(), 4);
      buffer.put(
        data.getLength(),
        QRUtil.getLengthInBits(data.getMode(), _typeNumber)
      );
      data.write(buffer);

      let totalDataCount = 0;
      rsBlocks.forEach((block) => (totalDataCount += block.dataCount));

      if (buffer.getLengthInBits() <= totalDataCount * 8) {
        break;
      }
    }
    return _typeNumber;
  };
  const getBestMaskPattern = function () {
    let minLostPoint = 0;
    let pattern = 0;
    for (let w = 0; w < 8; w += 1) {
      makeImpl(true, w);
      const lostPoint = QRUtil.getLostPoint(qrcode);
      if (w === 0 || minLostPoint > lostPoint) {
        minLostPoint = lostPoint;
        pattern = w;
      }
    }
    return pattern;
  };
  const createBytes = function (buffer, rsBlocks) {
    let ab;
    let D;
    let offset = 0;
    let maxDcCount = 0;
    let maxEcCount = 0;
    const dcData = new Array(rsBlocks.length);
    const ecData = new Array(rsBlocks.length);
    for (ab = 0; ab < rsBlocks.length; ab += 1) {
      const dcCount = rsBlocks[ab].dataCount;
      const ecCount = rsBlocks[ab].totalCount - dcCount;
      maxDcCount = Math.max(maxDcCount, dcCount);
      maxEcCount = Math.max(maxEcCount, ecCount);
      dcData[ab] = new Array(dcCount);
      for (D = 0; D < dcData[ab].length; D += 1) {
        dcData[ab][D] = 255 & buffer.getBuffer()[D + offset];
      }
      offset += dcCount;
      const rsPoly = QRUtil.getErrorCorrectPolynomial(ecCount);
      const rawPoly = qrPolynomial(dcData[ab], rsPoly.getLength() - 1);
      const modPoly = rawPoly.mod(rsPoly);
      ecData[ab] = new Array(rsPoly.getLength() - 1);
      for (D = 0; D < ecData[ab].length; D += 1) {
        const H = D + modPoly.getLength() - ecData[ab].length;
        ecData[ab][D] = H >= 0 ? modPoly.get(H) : 0;
      }
    }
    let totalCodeCount = 0;
    for (D = 0; D < rsBlocks.length; D += 1) {
      totalCodeCount += rsBlocks[D].totalCount;
    }
    const data = new Array(totalCodeCount);
    let index = 0;
    for (D = 0; D < maxDcCount; D += 1) {
      for (ab = 0; ab < rsBlocks.length; ab += 1) {
        if (D < dcData[ab].length) {
          data[index] = dcData[ab][D];
          index += 1;
        }
      }
    }
    for (D = 0; D < maxEcCount; D += 1) {
      for (ab = 0; ab < rsBlocks.length; ab += 1) {
        if (D < ecData[ab].length) {
          data[index] = ecData[ab][D];
          index += 1;
        }
      }
    }
    return data;
  };
  const qrcode = {};
  qrcode.useBestMaskPattern = false;
  qrcode.addData = function (data) {
    _data = qr8BitByte(data);
    _dataCache = null;
  };
  qrcode.isDark = function (x, w) {
    if (x < 0 || _moduleCount <= x || w < 0 || _moduleCount <= w) {
      throw new Error(x + ',' + w);
    }
    return _modules[x][w];
  };
  qrcode.getModuleCount = function () {
    return _moduleCount;
  };
  qrcode.getModule = function () {
    return _modules;
  };
  qrcode.getVersion = function () {
    return _typeNumber;
  };
  qrcode.make = function () {
    _typeNumber = getTypeNumber2(_data, _typeNumber);
    makeImpl(false, qrcode.useBestMaskPattern ? getBestMaskPattern() : 0);
  };
  qrcode.getBase64 = function (w, C, B) {
    C = C || 2;
    B = B || 3;
    qrcode.addData(w);
    qrcode.make();
    const D = qrcode.getModuleCount();
    const E = D * C + 2 * B;
    const A = [];
    const x = BitmapImage(E, E);
    for (let y = 0; y < E; y++) {
      for (let z = 0; z < E; z++) {
        if (y < B || y >= E - B || z < B || z >= E - B) {
          x.Pixel(y, z, 16777215);
        } else {
          const F = Math.floor((y - B) / C);
          const G = Math.floor((z - B) / C);
          x.Pixel(y, z, qrcode.isDark(G, F) ? 0 : 16777215);
        }
      }
    }
    return Base64.encode(x.flush());
  };
  return qrcode;
};
QRCode.stringToBytes = function (c) {
  return Utf8.getByteArray(c);
};
export const InputMode = {
  MODE_NUMBER: 1 << 0,
  MODE_ALPHA_NUM: 1 << 1,
  MODE_8BIT_BYTE: 1 << 2,
  MODE_KANJI: 1 << 3,
};
export const ECCLevel = {
  L: 1,
  M: 0,
  Q: 3,
  H: 2,
};
const PATTERNS = {
  PATTERN000: 0,
  PATTERN001: 1,
  PATTERN010: 2,
  PATTERN011: 3,
  PATTERN100: 4,
  PATTERN101: 5,
  PATTERN110: 6,
  PATTERN111: 7,
};
const QRMath = (function () {
  let e;
  const EXP_TABLE = new Array(256);
  const LOG_TABLE = new Array(256);
  for (e = 0; e < 8; e += 1) {
    EXP_TABLE[e] = 1 << e;
  }
  for (e = 8; e < 256; e += 1) {
    EXP_TABLE[e] = EXP_TABLE[e - 4] ^ EXP_TABLE[e - 5] ^ EXP_TABLE[e - 6] ^ EXP_TABLE[e - 8];
  }
  for (e = 0; e < 255; e += 1) {
    LOG_TABLE[EXP_TABLE[e]] = e;
  }
  const _this = {};
  _this.calcLog = function (g) {
    if (g < 1) {
      throw new Error('calcLog(' + g + ')');
    }
    return LOG_TABLE[g];
  };
  _this.calcExp = function (g) {
    while (g < 0) {
      g += 255;
    }
    while (g >= 256) {
      g -= 255;
    }
    return EXP_TABLE[g];
  };
  return _this;
})();

const QRUtil = (function () {
  const PATTERN_POSITION_TABLE = [
    [],
    [6, 18],
    [6, 22],
    [6, 26],
    [6, 30],
    [6, 34],
    [6, 22, 38],
    [6, 24, 42],
    [6, 26, 46],
    [6, 28, 50],
    [6, 30, 54],
    [6, 32, 58],
    [6, 34, 62],
    [6, 26, 46, 66],
    [6, 26, 48, 70],
    [6, 26, 50, 74],
    [6, 30, 54, 78],
    [6, 30, 56, 82],
    [6, 30, 58, 86],
    [6, 34, 62, 90],
    [6, 28, 50, 72, 94],
    [6, 26, 50, 74, 98],
    [6, 30, 54, 78, 102],
    [6, 28, 54, 80, 106],
    [6, 32, 58, 84, 110],
    [6, 30, 58, 86, 114],
    [6, 34, 62, 90, 118],
    [6, 26, 50, 74, 98, 122],
    [6, 30, 54, 78, 102, 126],
    [6, 26, 52, 78, 104, 130],
    [6, 30, 56, 82, 108, 134],
    [6, 34, 60, 86, 112, 138],
    [6, 30, 58, 86, 114, 142],
    [6, 34, 62, 90, 118, 146],
    [6, 30, 54, 78, 102, 126, 150],
    [6, 24, 50, 76, 102, 128, 154],
    [6, 28, 54, 80, 106, 132, 158],
    [6, 32, 58, 84, 110, 136, 162],
    [6, 26, 54, 82, 110, 138, 166],
    [6, 30, 58, 86, 114, 142, 170],
  ];
  const G15 = (1 << 10) | (1 << 8) | (1 << 5) | (1 << 4) | (1 << 2) | (1 << 1) | (1 << 0);
  const G18 = (1 << 12) | (1 << 11) | (1 << 10) | (1 << 9) | (1 << 8) | (1 << 5) | (1 << 2) | (1 << 0);
  const G15_MASK = (1 << 14) | (1 << 12) | (1 << 10) | (1 << 4) | (1 << 1);
  const _this = {};
  const getBCHDigit = function (data) {
    let j = 0;
    while (data !== 0) {
      j += 1;
      data >>>= 1;
    }
    return j;
  };
  _this.getBCHTypeInfo = function (data) {
    let i = data << 10;
    while (getBCHDigit(i) - getBCHDigit(G15) >= 0) {
      i ^= G15 << (getBCHDigit(i) - getBCHDigit(G15));
    }
    return ((data << 10) | i) ^ G15_MASK;
  };
  _this.getBCHTypeNumber = function (data) {
    let i = data << 12;
    while (getBCHDigit(i) - getBCHDigit(G18) >= 0) {
      i ^= G18 << (getBCHDigit(i) - getBCHDigit(G18));
    }
    return (data << 12) | i;
  };
  _this.getPatternPosition = typeNumber => PATTERN_POSITION_TABLE[typeNumber - 1];
  _this.getMaskFunction = function (maskPattern) {
    switch (maskPattern) {
      case PATTERNS.PATTERN000:
        return (j, k) => (j + k) % 2 === 0;
      case PATTERNS.PATTERN001:
        return (j, k) => j % 2 === 0;
      case PATTERNS.PATTERN010:
        return (j, k) => k % 3 === 0;
      case PATTERNS.PATTERN011:
        return (j, k) => (j + k) % 3 === 0;
      case PATTERNS.PATTERN100:
        return (j, k) => (Math.floor(j / 2) + Math.floor(k / 3)) % 2 === 0;
      case PATTERNS.PATTERN101:
        return (j, k) => ((j * k) % 2) + ((j * k) % 3) === 0;
      case PATTERNS.PATTERN110:
        return (j, k) => (((j * k) % 2) + ((j * k) % 3)) % 2 === 0;
      case PATTERNS.PATTERN111:
        return (j, k) => (((j * k) % 3) + ((j + k) % 2)) % 2 === 0;
      default:
        throw new Error('bad maskPattern:' + maskPattern);
    }
  };
  _this.getErrorCorrectPolynomial = function (errorCorrectLength) {
    let i = qrPolynomial([1], 0);
    for (let k = 0; k < errorCorrectLength; k += 1) {
      i = i.multiply(qrPolynomial([1, QRMath.calcExp(k)], 0));
    }
    return i;
  };

  const MODE_MASKS = [
    [10, 9, 8, 8],
    [12, 11, 16, 10],
    [14, 13, 16, 12],
  ];
  _this.getLengthInBits = function (mode, type) {
    const index = Math.log2(mode);
    if (index < 0 || index > 3) throw new Error('mode:' + mode);

    if (type >= 1 && type < 10) return MODE_MASKS[0][index];

    if (type < 27) return MODE_MASKS[1][index];

    if (type < 41) return MODE_MASKS[2][index];

    throw new Error('type:' + type);
  };
  _this.getLostPoint = function (qrcode) {
    let F;
    let k;
    const K = qrcode.getModuleCount();
    let J = 0;
    for (k = 0; k < K; k += 1) {
      for (F = 0; F < K; F += 1) {
        let l = 0;
        const H = qrcode.isDark(k, F);
        for (let i = -1; i <= 1; i += 1) {
          if (k + i < 0 || K <= k + i) continue;
          for (let E = -1; E <= 1; E += 1) {
            if (F + E < 0 || K <= F + E) continue;
            if (i === 0 && E === 0) continue;
            if (H === qrcode.isDark(k + i, F + E)) l += 1;
          }
        }
        if (l > 5) J += 3 + l - 5;
      }
    }
    for (k = 0; k < K - 1; k += 1) {
      for (F = 0; F < K - 1; F += 1) {
        let G = 0;
        if (qrcode.isDark(k, F)) G += 1;
        if (qrcode.isDark(k + 1, F)) G += 1;
        if (qrcode.isDark(k, F + 1)) G += 1;
        if (qrcode.isDark(k + 1, F + 1)) G += 1;
        if (G === 0 || G === 4) J += 3;
      }
    }
    for (k = 0; k < K; k += 1) {
      for (F = 0; F < K - 6; F += 1) {
        if (
          qrcode.isDark(k, F) &&
          !qrcode.isDark(k, F + 1) &&
          qrcode.isDark(k, F + 2) &&
          qrcode.isDark(k, F + 3) &&
          qrcode.isDark(k, F + 4) &&
          !qrcode.isDark(k, F + 5) &&
          qrcode.isDark(k, F + 6)
        )
          J += 40;
      }
    }
    for (F = 0; F < K; F += 1) {
      for (k = 0; k < K - 6; k += 1) {
        if (
          qrcode.isDark(k, F) &&
          !qrcode.isDark(k + 1, F) &&
          qrcode.isDark(k + 2, F) &&
          qrcode.isDark(k + 3, F) &&
          qrcode.isDark(k + 4, F) &&
          !qrcode.isDark(k + 5, F) &&
          qrcode.isDark(k + 6, F)
        )
          J += 40;
      }
    }
    let I = 0;
    for (F = 0; F < K; F += 1) {
      for (k = 0; k < K; k += 1) {
        if (qrcode.isDark(k, F)) I += 1;
      }
    }
    const j = Math.abs((100 * I) / K / K - 50) / 5;
    J += j * 10;
    return J;
  };
  return _this;
})();

function qrPolynomial(value, f) {
  if (typeof value.length === 'undefined') {
    throw new Error(value.length + '/' + f);
  }
  const bytes = (function () {
    let i = 0;
    while (i < value.length && value[i] === 0) {
      i += 1;
    }
    const g = new Array(value.length - i + f);
    for (let h = 0; h < value.length - i; h += 1) {
      g[h] = value[h + i];
    }
    return g;
  })();
  const d = {};
  d.get = function (g) {
    return bytes[g];
  };
  d.getLength = function () {
    return bytes.length;
  };
  d.multiply = function (g) {
    const j = new Array(d.getLength() + g.getLength() - 1);
    for (let h = 0; h < d.getLength(); h += 1) {
      for (let i = 0; i < g.getLength(); i += 1) {
        j[h + i] ^= QRMath.calcExp(QRMath.calcLog(d.get(h)) + QRMath.calcLog(g.get(i)));
      }
    }
    return qrPolynomial(j, 0);
  };
  d.mod = function (g) {
    let h;
    if (d.getLength() - g.getLength() < 0) {
      return d;
    }
    const j = QRMath.calcLog(d.get(0)) - QRMath.calcLog(g.get(0));
    const i = new Array(d.getLength());
    for (h = 0; h < d.getLength(); h += 1) {
      i[h] = d.get(h);
    }
    for (h = 0; h < g.getLength(); h += 1) {
      i[h] ^= QRMath.calcExp(QRMath.calcLog(g.get(h)) + j);
    }
    return qrPolynomial(i, 0).mod(g);
  };
  return d;
}

const StreamWriter = function () {
  const c = [];
  const d = {};
  d.writeByte = function (e) {
    c.push(e & 255);
  };
  d.skip = function (e) {
    c.length += e || 1;
  };
  d.writeShort = function (e) {
    d.writeByte(e);
    d.writeByte(e >>> 8);
  };
  d.writeLong = function (e) {
    d.writeByte(e);
    d.writeByte(e >>> 8);
    d.writeByte(e >>> 16);
    d.writeByte(e >>> 24);
  };
  d.writeRGB = function (e) {
    d.writeByte(e);
    d.writeByte(e >>> 8);
    d.writeByte(e >>> 16);
  };
  d.writeBytes = function (e, h, g) {
    h = h || 0;
    g = g || e.length;
    for (let f = 0; f < g; f += 1) {
      d.writeByte(e[f + h]);
    }
  };
  d.writeString = function (f) {
    for (let e = 0; e < f.length; e += 1) {
      d.writeByte(f.charCodeAt(e));
    }
  };
  d.toByteArray = function () {
    return c;
  };
  return d;
};

export default QRCode;
