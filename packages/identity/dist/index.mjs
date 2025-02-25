/**
 * @module @semaphore-protocol/identity
 * @version 3.10.1
 * @file A library to create Semaphore identities.
 * @copyright Ethereum Foundation 2022
 * @license MIT
 * @see [Github]{@link https://github.com/semaphore-protocol/semaphore/tree/main/packages/identity}
*/
import { BigNumber } from '@ethersproject/bignumber';
import hash from 'js-sha512';
import { randomBytes } from '@ethersproject/random';

var poseidon1$1 = {};

const F = BigInt('21888242871839275222246405745257275088548364400416034343698204186575808495617');
const N_ROUNDS_F = 8;
const N_ROUNDS_P = [56, 57, 56, 60, 60, 63, 64, 63, 60, 66, 60, 65, 70, 60, 64, 68];
const pow5 = v => {
  let o = v * v;
  return v * o * o % F;
};
function mix(state, M) {
  const out = [];
  for (let x = 0; x < state.length; x++) {
    let o = 0n;
    for (let y = 0; y < state.length; y++) {
      o = o + M[x][y] * state[y];
    }
    out.push(o % F);
  }
  return out;
}
function poseidon(_inputs, opt) {
  const inputs = _inputs.map(i => BigInt(i));
  if (inputs.length <= 0) {
    throw new Error('poseidon-lite: Not enough inputs');
  }
  if (inputs.length > N_ROUNDS_P.length) {
    throw new Error('poseidon-lite: Too many inputs');
  }
  const t = inputs.length + 1;
  const nRoundsF = N_ROUNDS_F;
  const nRoundsP = N_ROUNDS_P[t - 2];
  const {
    C,
    M
  } = opt;
  if (M.length !== t) {
    throw new Error(`poseidon-lite: Incorrect M length, expected ${t} got ${M.length}`);
  }
  let state = [0n, ...inputs];
  for (let x = 0; x < nRoundsF + nRoundsP; x++) {
    for (let y = 0; y < state.length; y++) {
      state[y] = state[y] + C[x * t + y];
      if (x < nRoundsF / 2 || x >= nRoundsF / 2 + nRoundsP) state[y] = pow5(state[y]);else if (y === 0) state[y] = pow5(state[y]);
    }
    state = mix(state, M);
  }
  return state[0];
}
var poseidon_1 = poseidon;

var unstringify = {};

Object.defineProperty(unstringify, "__esModule", {
  value: true
});
unstringify.default = unstringifyBigInts;
function unstringifyBigInts(o) {
  if (Array.isArray(o)) {
    return o.map(unstringifyBigInts);
  } else if (typeof o == 'object') {
    const res = {};
    for (const [key, val] of Object.entries(o)) {
      res[key] = unstringifyBigInts(val);
    }
    return res;
  }
  const byteArray = Uint8Array.from(atob(o), c => c.charCodeAt(0));
  const hex = [...byteArray].map(x => x.toString(16).padStart(2, '0')).join('');
  return BigInt(`0x${hex}`);
}

var _1 = {};

Object.defineProperty(_1, "__esModule", {
  value: true
});
_1.default = void 0;
var _default$1 = {
  C: ['CcRunsaOm9T+H6q6KUy6OKcaoXdTTN0bbH3A29Cr16c=', 'DANWUwiW7sQql+2TfzE1z8UUKzrkBbg0PB2D/6YEy4E=', 'Hiih2TVpitEULlEYK7VM9KAOpaq9Ymi9MX6pd8wVSjA=', 'J68tgxqdJ0gICWXbMOKY5A5XV8PgCNuWTPnisSuRJR8=', 'Hm8RzmD8j1E6ajz+Fq4XWkEpFGLyFM0Iear0NUW3TgM=', 'Kmc4TTu9XkOFQYGctoHwvgRGLtFMNhPY9xkgYmjRQtM=', 'C2b981YJOmEWCfjhL7/s8LmF44HwJRiJNkCPXVyfRdA=', 'AS7j7B541HCDDGEJPCreNwsmyDzFzr7t2qaFLb2wniE=', 'AlK6X2dgv739iPZ/gXXj/WzRxDGwmba7LRCOe0Rbsbk=', 'F5R0zOyl/2dsa+w871QpY1Q5Gok1/3HW71rqrXypMvE=', 'LCQmE3mlG/qSKP9KUD/U7Zwfl0omSWmzfholibvtK5E=', 'HMHXtiaS5j6sLyiL0GlbQ8L2P1AB/A/FU+ZsBVGAGwU=', 'JVBZMBqtqYuy7VX4UpeelgB4Tb8X+6zQXZ7/X9nJG1Y=', 'KEN746wcsuR54fXA7M0ys66iQjSXCoGTsRwpzn5Z79k=', 'KCFqRC8uH3EcpPprU3ZusRhUjaj7T3jUM4diw39fIEM=', 'LB9HzRf6Wt8fOfTnBW3QP+7h784DCUWBEx8jdzI0gsk=', 'B6utArel68SGMrzJNWzrfdna/KJ2Y4pjZGuFZqYhr8k=', 'AjAmRgH/3yknWzP/qrUd/pQp+QiAppzRN9oMTRX5bDw=', 'G8lzBU5R2QWg8WhlZJfKQKhkQUVX7iiecX5dZomaoKk=', 'Lhwi+WRDUAggbDFX6GNB7dJJr/XC2EIfKmsiKI8KZ/w=', 'EiTzjfZ8U3gSHB1fRhu8UJ6OoVmORsn3pwRSvCu6hrg=', 'AuTmnYulnlGSgLS9ntAGj9e/6M2d/toZadKYkYbN4g4=', 'Hx7Mw0qroBN/XfgfwE/z7k8Z7jZOZT8HbUfpc12YAY4=', 'FnKtPXCaNTl0JmwwOamnMRQkRIAyzRgZ6suKTUKE9YI=', 'KD4/3CxuQgxW9Er1GStK6c2mlh8oTSSZHS7WAt+Mj8c=', 'HCo9EgxVDs/Q2wlXFw+gE2g3Ufj9/1nWYU+9af85S8w=', 'IW+Eh3qsYXL3iXpzI0Vu/hQ6mkN3PqbylstrgXdlP70=', 'LA0nK+zyp1dkun6OPijRK86qR+phylmkEaH1FVL5R4g=', 'FuNCmYZcDihITuenTEVOnxcKVICr4FCPy0psPYlUb0M=', 'F1zrpZnpb1s3WiMqb7nMcXcgR3ZYAikPSM2Tl1VIj8U=', 'DHWURA3EjBb+rZ4XWLAoBmqkEL+8NU9U2MX/u0Sh7jI=', 'GjwpvDnyG7XEZtt9frb9j3YOIAE8z5EskkeYgtkZ/Y0=', 'DM/dkG80JuXAmG6gSbJTQAhV00kHT1pmlcjuq80i5o8=', 'FPa8gdnxhvYr20dc5slBGGanqKP9Bls84OaZtn3Z55Y=', 'CWK4J4n7PRKXAspwsvbFqswJmBDJxJXIiO3rc4a5cFI=', 'GogK9wdNGLO/IMed4lEnvBMoSrAe8CV1r+8Mj2oxqG0=', 'EMuhhBmmozLNXnfwIRwVSyCvKST8IP8/TDASu3rpMRs=', 'BX5iqaj4mz69x2umOp6sqPontzGcrjQGdWooSfMC8Q0=', 'KHyXHekdwKvUSt9ThLSYjLlhMDu/Zc/1r6BBO0QoDO4=', 'Id8ziK8Wh7uzvKnaDMqQjx5WK8RtSrpOb395YOMGiR0=', 'G+XIh9JbznA+JcyXTQk0zXid+PcLSY/YPv+LVg4WgrM=', 'Jo2jb3blaPtoEXF1zqLNDdLLXUL9pazqSNWcJwag1cE=', 'DherCR9urlDGCb6vVRDs7MXYu3QTXr0FvQZGDMJqXtY=', 'BNcn5yj/oKZ67lNasHSkMJHvYtjPg9JwBA9cqh9ir0A=', 'DdvXv5wpNBWBtUl2K8Ai7TNwKsEPG/2GKxVBfX45ym4=', 'J5DrM1FiF1J2gWLoKYnGwjT1sNHTr5tYiinEnIeJZUs=', 'HkV8YBpjtz5EcZUBk9ilcDlfPZq4sv0JhLdkIGFC+ek=', 'Ia5kMB3KliVjjWqyu+cTX/qQ7NDEP/kfxMaG/EbgkbA=', 'A3n2PIzjRo1NopMWb0lJKIVL6eNDLglVWFhTTu2NNQs=', 'AC1WQgNZ0CZqdEoICAngVMoOSSGkZoasjJ9YoyTDUEk=', 'EjFY5ZZbXZsdaLPNMuELvtqNYkWeIfQJD8LFr5Y1FaY=', 'C+KfxAhHqUFmHRS79svgQg+7K29Sg21OYMgOtJytnsE=', 'Gslpkd7CuwVXcWFCAVpFPDbbnYWcrV+aIzgC8k/fTBo=', 'FZZEP3Y9vMJfSWT8YdI7Pl4SyfqX8YqSUcozVbywYn4=', 'EuC802VL36drKGHU7Drq4PGFfZ8X5xWu1tBJ6uO6MhI=', 'D8krTxu+qCuepz1K+a8qUM6rrH83FUsZBObHbHz5ZLo=', 'H5wLFhBEZELW8uWSqAE/QLFPfHciI29PnH6WUjOHJ2I=', 'Dr10JErnJnX4zeBhV6eC9AUNkU2ji0wFjRWfZD279NM=', 'LLfw7Tnhbp9pqfr9SrlRwDsGcelzRu45eoOYOdzPxtE=', 'Gp1uLs/wIsxWBUQ+5BurIM52HQUUzlJmkMcrynNS2b8=', 'KhFUOWB/M1peqDw7xEqTMdDBMyapp7owh9oYLWSOxy8=', 'I/m2UptdBA0VuPp67j40EOc4tWMFzUTylTXBFcWkwGA=', 'BYcsFtsPcqIkmsa6SEu5w6POl8FtWLaLJg65OfDm6Kc=', 'EwC97gi7eCTKIPuAEYB19AIZthUdVbXFK2JKfN7d9qc=', 'Gbm2PS8QjhfmOBeGOo9sKI160pkW2YyxBy5Oe31Ss3Y=', 'AVvuE1fjwBW1vaI3ZoUi9hPRyIcmtexCJKIBKEgbT38=', 'KVNzbpS7a58blwek8WFeTv4eHOS6shjL6pLHhbEo/9E=', 'CwaTU7oJFhiGL4BhgMA4X4UbmNNytF9UTOcmbtZgjfw=', 'ME901GHMwTEV5OC8+5OBflWut+uTBrZOT1iKyX2B9Ck=', 'FbvxRs6bygnooz9ed9/k9arSoWSkYXpMuO5UFc3pE/w=', 'CrTf4MJ0LN5EkBAxSHlk7ZuPS4UEBcEMqf8jhZVyyMY=', 'DjLbMgoETjGX9F92SaGWde9e7f6lRt6pJR3jn5Y5d5o=', 'ChdWqh83jKSydjWni2iI5meXczqCd0iWoweO+lFtoBY=', 'BExKM7EPaTRH/RcXf5Uu+JXmHTKPhe+pQlTWoqJdk+8=', 'LtNhG3JbinC+ZVtTf2b3AP4IedeaSWiR03sHtUZsS4s=', 'H5uk6Lq3zkLI7MPXIqouDq3965z900e12DOepxIIWKo=', 'GyMwQwUujCiPfukHqE5RiqOOgqxFAgZtt0BW+GXF09o=', 'JDHhzBZLuNB0Axq3K9VbTJAgU7/A8U2wyi+XsCCHWVQ=', 'CC+TTJH1qsMwzWlToKfbRaE+MiCXWDMZp5Hyc5ZYAf0=', 'K5oKIj51OLCjS+B0MVVCo8dyReKufL6Zmta7kwxImXw=', 'DhzZHt0s+izOuFSDuIepvoFkFj51qKAOsLWJzHAhTn0=', 'Lh6sDyv9/WPJUfYUd+NpiZl3TxmFTQD1iNMkYBzr4vk=', 'DL+pXzf7dAYMdhWOdp1tFXNFeE2O/bM8I9dIEVtQC4M=', 'CPBbO+kj7UTWWtSdimHppnbZkeOndRPZmAwjLfpKT4Q=', 'InGeKgcLzQhSv44hmE0EQ+coSSXcB1ijJaLdUQwEfvY=', 'BB9Zap7hyyvAYPf8w6GrTHvb8DYRmYLA9B9isvJoMMA=', 'Iz/TXeG+UgqHYo6wb2sdTAIb4cLQ3EZKGfzdCYaxD4k=', 'BSS0bRqoel5DJeCkI+vIENMeB4qhtHB+78tFPGHJwmc=', 'LDT0JMgeVxbOR/ysiUuFgkInu5VLDzGZzESGI3xRUhE=', 'C18qS2M4eBkgfv/CtVQfty3SAltUV8yX8zAQMn3kkV4=', 'IiB4VggszFTFty/kOdLP1sF0NdL1evbOrvrEH+BcZZ8=', 'JNV6i/XaY/5OJBWbf4lQtc37IQGUyvefJ4VASM4sgXE=', 'Cvqxgf3V4Fg7Nx11vWk/mDdK1wl7sBqFc5Gbsjt5OW4=', 'LbqbEI8gh3KZilLvrHy9VnbABXGUwWwL8WKQ1isRKO4=', 'JjSbZu24sW9W+IHHiPU/g8u4PeC9WSslWv8T5rzkILM=', 'Ja984OXhA1doXpX5Izl1OtgaVtKOzBk7I1KIo+bxN9s=', 'JbTOe9IpQ5DAlNalXt1ouXDu16roiyv/H3wBh/41AR8=', 'IsVD8Q9siew4flPxkIqI5d6c7yjr3zCxjLnVTB4CtjE=', 'Ajb5PneJxHJPx5CKnxkeHkJekGqRnXo032aOdIgvh6k=', 'KTULQBFmygEOfSfjfQXamWUr2uEU6wFlnLSXr5gMS1I=', 'Du14fWWCDT9r0xu6tUf3WmXtt12ETruJ7hJgkWZSNj8=', 'B8wRcPE7RvIDanU/Ugsykf3NDpm9lCl9GQb2VvTeb60=', 'Irk5IzsdcgX0m89hOj0wsZCHhtf59dEMIFlDVonorOo=', 'AUUXYqCquByKrR3IvDPocHQPCDpaqFQ4rdZQrOYK5aY=', 'I1BrtdhyfURh+r8QJdRtH+MuqmHex9pX5wT+wIkvzok=', 'LkhMROg4rqC6wGrj9xvdCSo3CVMeHv6pf4vWiQc1VSI=', 'D0vH0H66/WQ3nnjFC9LkK69KWUVFztwlRUGNomg1tUw=', 'H008j2WD6eX6dmN4Yvqu6FFYI4hyXfRg5iCZbVDY504=', 'CTUU4McHEfgmYNB74OSpiPrgKrx7aB2RU+uby0j+c4k=', 'GtqwyOKzutNGaZorXzvANkPug+zkcijySljgo0fhU9g=', 'FnKxcmBX2Z3RRwnrtHRkGjeMG5S4ByusGiLb756A2tI=', 'Hf1T1Fdq8uOPRPU/3KtGjMXY4vrgrMTuMNR7I5tHnBQ=', 'DGiIoQt1sPOnCjYmOjfhf+bXfWQPb8PevH8gd1MgXGA=', 'Gt25M6Zb53CSs0p+d9Ev6GEaYeAO5oSLhQkezKnR5Qg=', 'ANdUDc0mioRcEK4Y0d6TPPY4/1Ql8K//eTVijimdF5E=', 'FAwOQmh+nq0BsoJ6VmTKnCb+3eSs2Z2x0xaTnSC4LA4=', 'Lww6EV1DF9GRuom40T0YBsIKD5sk+MXtwJHirlZWWYQ=', 'DE7neP98FFUwBu0iDPnIEAigz/ZwsiuC2MU4odyVjGE=', 'FwTydm1G+Cw2k/AEQMzDYJQk7SbArMZiJ8PXSF3nTGk=', 'Ly0ZzD6l146noCwbUdJEq/B2nJ+FROQCObZv6QCcPPo=', 'GuA4U7dfyrpQU/ES4qjo3N1+5suc/tnH1sdmqAb8Zik=', 'CXGqv3lSQd9R0THQ+mGqXzVWkhstbwFOTkGobdrwVtU=', 'FAjDFuYBThqR1M9rbg3nPtpiT4OA3xyHX1wp97/i9kY=', 'Fmfz/i7b6FAkir5CtUMJO2yJ8fdz7yhTQWkfOYIu9b0=', 'E798XQ0sQ3akiwoDVXzfkVuBcYQJ5cEzQkxpV2UA/jc=', 'B2IKbfsLbOwwFq3z01M8JAJLlTR4VreXGbwLp0OmLCw=', 'FXTH7wxDVF82qMoIvb3YsHXSlZ4vMitzFnXePhmCtNA=', 'Jp5LW3oushr9VnlwpxfO7FvUGEVxwlT9wG4Dp/+DePA='],
  M: [['Bm9vhdb2ioXsEDRTUaI6Oq8H84r4yVKnvOynC9KvetU=', 'K51LQRDJrpl3guFQmx0P2yCnwCu9i+pzBUYrn4Elseg='], ['DMV827CFB9Yr9npEk8wmL7bAnVVwE//x9XP0MSIfj/k=', 'EnTmSaMu01WjGm7WlyThra3oV+hutcOhIbzRR5QyA8g=']]
};
_1.default = _default$1;

Object.defineProperty(poseidon1$1, "__esModule", {
  value: true
});
var poseidon1_2 = poseidon1$1.poseidon1 = poseidon1;
var _poseidon$1 = _interopRequireDefault$1(poseidon_1);
var _unstringify$1 = _interopRequireDefault$1(unstringify);
var _$1 = _interopRequireDefault$1(_1);
function _interopRequireDefault$1(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const c$1 = (0, _unstringify$1.default)(_$1.default);
function poseidon1(inputs) {
  return (0, _poseidon$1.default)(inputs, c$1);
}

var poseidon2$1 = {};

var _2 = {};

Object.defineProperty(_2, "__esModule", {
  value: true
});
_2.default = void 0;
var _default = {
  C: ['DumlkrqalRjQWYbWVvQMIRTEmTwRuymTjSHUcwTNjm4=', 'APFEUjXyFIxZhlhxafwbzYh7CNTQCGjfVpb/9AlW6GQ=', 'CN/zSH6KyZ4fKaBY0PqAuTDHKHMLerNs6HnziQ7Pc/U=', 'Lye+aQ/a7kbDzij3UysTyFbDU0LIS9puIJZjEPrcAdA=', 'KyrhrPaLe40kFr6/PU9iNLdj/gS4BD7ki4MnvryhbPI=', 'AxnQYgcr737MperAb5fU1VlSwXWrawPq5ktEx9vxHPo=', 'KIE9yuuuqoKKN234evSmO8i3vyetScYpjvezh78oUm0=', 'JydnOyzLyQPxgb844cHUDSAzhlIAw1K8FQkord35y3g=', 'I07EXKJ3J8LnSr0rKhSUzW771D40BYfWuPueMeZcxjI=', 'FbUlNAMa4Y9/hiyyz3z3YKsQqBUKM3sczZn/boeX1Cg=', 'Dcj61tnks19e2aPRhrec444Oio0bWLEy1wHU7s9o0fY=', 'G82V/8IR+8pgD3BfrT+1Z+pOs3j2Lh/sl4BVGKR+TZw=', 'EFILCrchyt/p7/gbAW/DTcdto2wleJN4F8uXjQad5Vk=', 'H21IFJuOf32bJX2O1fu69CkySYB1/tCs6IqeuB9WJ/Y=', 'HZZV9lIwkBTSngDvNaIIm//43ByBbw3JyjS9tUYMhwU=', 'BN9aVv+VvK+wUfexzUOpm6cx/2fkcDIFj+PUGFaXzH0=', 'BnLZlfj/9kAVGz0pDO2vFIaQoQqMhCSn9uwoK25L6Cg=', 'CZlStBSIRFSyEgDX/6/dXwyancwG8nCOn8HYIJtcdbk=', 'BSy6IlXf0Ax8SDFDuo1GlEjkNYaptM2Rg/0OhDprn6Y=', 'C4ut7mkK246wvXRxK3mZr4LeVXByUa13Fgd8uTxGTdw=', 'EZsVkPEzB69aHuZRAgwHx0nBXWBoOoBQuWPQqOSyvdE=', 'AxULfNbV0XslKdNr4PZ7gyxKz8iE707lzhW+C/tKjQk=', 'LMYYLF4UVG488ZUfFzkSNVN077g9gImKvmnLMXyepWU=', 'AFAyVR5jeMRQz+EppASzdkIYyt7awU4rktLNcxEb8Pk=', 'IzI34yibqjS7FH6XLry5UWRpw5n8wGn7iPnaLMKCdrU=', 'Bcj09OvUpuPJgNMWdL++YyMDfyGzSuWk6AwtTCTWAoA=', 'CnsdsTBC05a6BdgYoxnyUlK8817zru2R7h8JslkPxls=', 'KnO3H5shDPWxQpZXLJ0y2/FW4rCG/0fcXfVCNlpATsA=', 'GsmwQXq8yaGTUQfp/8kdw+wY8sTb5/Ipdqdgu1xQxGA=', 'EsAzmuCDdII/q7B2cH70eSafPk1ssQQ0kBXuBG3JP8A=', 'C3R1sQKhZa1/WxjbTh5wT1KQCqMlO6rGgkZoLlbpoo4=', 'A3woSeGRyj7bHF5J9ui4kXyEPjeTZvLqMqs6qI1/hEg=', 'BaaBH4VW8BTpJnRmHiF+m9UgbFyToH3BRf2xdqcWNG8=', 'KaeV59mAKJRulHt11U6fBEB26Hp7KIO0e2de9fOL1m4=', 'IEOaDISzIutFo4V6/Bj1gm6Mc4LIoVhcUHvhmZgf0i8=', 'Lguo2U2ez0qU7CBQxzcf8btQ8neZqEttSipvKgmCyIc=', 'FD/RFc4I+yfKOOt8zoIrRReCLNIQkEjS5tDdzKF9ccg=', 'DGTL7LHHNLhXlo273PgTzfhhFlkyPby/yEMjYjvpyvE=', 'AoowWEfGg/ZG/KklwWP/WudPNI1iwrZw8UJs75QD2lM=', 'Lk71EP8Lb9pfqUCrTEOA8mpry2TYlCe4JNZ1W1254ww=', 'AIHJW8QzhOZj15JwyVbOO4kltPbQM7B4uWOE9QV5QA4=', 'LtXwyRy9l0kYfi+t5ofgXuJJGzScA5oLuoqfQCOguzg=', 'MFCZkfiNo1BLvzdO1ari8DRIoix2I0yMmQ8B8zpzUgY=', 'HD8g/VVAmlMiG3xNSaNWufChEZ+yBntBp1KQlEJOxq0=', 'ELTn86td8AMElRRFm24Y7sRrsiE+jhMeFwiHtH3cuWw=', 'KhmCl5w/9/Q93VQ9iRwqvd2A+ATAd9d1A5qjUC5Dre8=', 'HHTuZPFeHbb+3b6tVtbVXbpDHrw5bJr5XK0PExW9XJE=', 'B1M+yFC6f5jquTA8rOAbS55PLouCcIz6nC/kWgrhRqA=', 'IVdrQ45QBEmhUeTurxexVChcaPQtQsGAihGr83ZMB1A=', 'LxfAVZuP55YIrVyhk9YvELzoOEyBXwkGdD1pMINtSp4=', 'LUd+OGLQdwinnoqulGFwvJd1pCATGEdK5mWwsbficw4=', 'Fi9SQ5ZwZMOQ4JVXeYTyka+6ImbDj1q82Jvg9bJ0fqs=', 'K0yyM+3pukgmTs0siuUNGteoWWqH8p+Kd3enAJI5MxE=', 'LI+8st2Fc9wduvj0YihUd22y7s5thcTPQlTnw14DsHo=', 'HW80dyXkgWry/0U/DNVrGZ4bYen2Aemt5eiNuHCUnak=', 'IEsMOX9OvnHrwtiz31uRPfnmrAK2jTEyTNSa9cRWVSk=', 'DEy53DxP2BdPEUmzxjw8L57LgnzX3CVTT/j7dbx5xQI=', 'F0rWGhRIyJmiVBZHT0kwMB5cSUdSeeBjmmFt3EW8e1Q=', 'GpYXe89NjYn3Wd9OwvPN4uqqKMF3zA+hOpgW1Jo40u8=', 'Bm0EskMx1xzQ74BUvGDE/wUgLBJqIzwagkKs42C4owo=', 'KkxPxuwLDPUhlXgoccbdOzgcxl9y4CrVJwN6Yqob2AQ=', 'E6stE2zPN9RH6fLhSnztyV5yf4RG9tnX5Vr8ASGf1kk=', 'ESFVL8omBhYZ0k2EPcgnacGwT87Cb1UZTC4+hprMapo=', 'AO9lMyKxPWyIm8gXFcN9d6bNJn1ZXEqJCaVUbHyXz/E=', 'DiVIPkWmZSCLJh2Lp0BR5kAMd21lJZXZhFrKNdijl9M=', 'KfU23LnddoIkUmRlnhXYjjlaw9Td6S2MRkSNuXnuuok=', 'KlbvnyxT/rrf2jNXXb29iFoSTieAu+oXDkVrqs4Ppb4=', 'HINhx461z13s+3otF7XECfKuKZmkZ2Lo7kFiQKjLmvE=', 'FRr/XziyCg/ARzCJqvAga4Po5op2RQe/09CrS+dDGcU=', 'BMYYfkHtiB3BsjnIj3+dQ6n1L8jIts3R525HYVtR8QA=', 'E7N72A9NJ/sQ2EMx9vttU0uBxh7RV3ZEnoAbfdycKWc=', 'AaXFNic8LZ31eL+9MsF7eizjZkwqUgMskyHOscToqOQ=', 'KrNWGDTKc4Na0F9desuVC0qaLGZrlybagyI5Blt8OwI=', 'HU2OwpHnINsgD+bWhsDWE6yvavTpXTv2n37VFqWXtkY=', 'BBKU0sxITSKPV4T+eRn9K7klNRJAoEtxFRTJyAtlrx0=', 'FUrJjgFwjGEcT6cVmR8ASJj1eTnRJuOSBClx3ZDoH8Y=', 'CzOdisyn1Pg+7dhAk671EFCzaEyI+LCwRSRWO8bqTaQ=', 'CVXknmYQyUJUpPhM+6s0RZjw5x6v9Kfdge2VtQg5yC4=', 'BnRqYVbrpUQmueIiBvFavKmm9B5vU1xvNSVAHqBlRiY=', 'Dxj1oOzRQjxJbzggxUnCeDjleQ4r0KGWrJF8f/Mgd/s=', 'BPbuyhdR9zCKxZ7/W+smHku1Y1g+3nvJKnOCI9b3bhM=', 'K1aXM2TExPXBo+xNo83OA4gR6xFvs+RbwXaNJvwLN1g=', 'Ejdp3UnVsFTc12uJgEsby44TkrOFcWpdg/62XUN/Ke8=', 'IUe0JPxIyAqI7lK5EWmqzqmJ9kRkcRUJlCV7L7AcY+k=', 'D9wfWFSLhXAabFUF6jMqKWR+bzStQkPC6lStiXzr5U0=', 'Ejc6glH+oATfaKvPD3eG1Lzv8oxdu+DDlE9oXMCgsfI=', 'IeT06l81+FutfqUv90LJ6KZCdWtq9EID3YofNcGpADU=', 'FiQ5FtadLKPftHIiJNTEYrVzZkkvRekNioGTTxvDsUc=', 'HvvkbdeleLT2b5rbyItDeKvCFWbhoEU8oTpBWcrASsI=', 'B+pehTfPXdCIhgIOI6fzh9Ro1VJb5m+FO2csyWqIlpo=', 'BajE+ZaLiqO3tHijD5pbY2UPGadefOEcqf4WwLdsALw=', 'IPBXcSzCFlT7/lm9NF6NrD94GMcBuceILZ1Xtyoy6D8=', 'BKEu3tqd/WiWcvjGf+4xY23NjojQHUkBm9kLM+sz22k=', 'J+iNjBXzfc7kTx5UJaUd7L0TbOUJGmdn5J7JVEzNEBo=', 'L+7Re4QoXtm4pcjF6VpB9m4JZhmncDIjF2xB7kM95NE=', 'HtfMdu30XHxAQkFCD3Kc85TllCkRMSoNaXK4vVOv8rg=', 'FXQumbm/oyMVf/jFhvVmDqxng0dhRM3K3yh0vkVGaxo=', 'GqwoU4f2XoLIlfxoh930BXcQdFTG7AMXKE8DPyfQx4U=', 'JYUcPIRdR5D53a29tgVzV4MuLnpJd19x7HWpZVTWfHc=', 'FaWCFWXMLsLOeEV9sZft81O367osVSM3DdzMPZ8Uamc=', 'JBHVekgTuZgO+n4xodtZZtz2TzYEQndQLxVIXyjHFyc=', 'AC5vjWUgzUcT4zW4wLbS5kfpqY4S9M0lWIKLXvbLTJs=', 'L/e8j0OAzemX2gC2FrD80a+PDpHi/h7XOYg0YJ4DFdI=', 'ALmDG5SFJVle4CckRxvNGC6VIfa3u2jx6Tvk/rsNPL4=', 'Ci9TdouOv2qGkTsOV8BOARykCGSKR0OofXetvwycNRI=', 'ACSBVhQv0Dc6R5+R/yOelg9Zn/fpS+abfyopAwXhGY0=', 'Fx1WILh7+xMoz4wCqz8MmjlxlqpqVCwjUOtRKisrzak=', 'FwpPVVNvfclwCHx8ENb612DJUhct1U3ZnRBF5Ow0qAg=', 'KaujP3mf5mwu8xNK6gQzbsw344wc0hG6SC7KF+Lb+uE=', 'HpvBeaT911j90bsZRQiNR+cNEUoD9qDotbplA2nmSXM=', 'HdJpeZtmD61Y9/SJLfsLWv6q2GmpxLRPnJ4cQ72vjwk=', 'Is28i3ARetFAEYHQLhVFnnzNQm/oacfJXR3Syw8krzg=', 'DvBC5FR3HFM6n1elXFA/zv0xUPUu2Up81bqTucfazv0=', 'EWCeBq1sj+Lyh/MDYDfohRMY6LCKA1mgOzBP/KYugoQ=', 'EWbZ5VRhbbqedT7qQnwXt/7NWMB23+QnCLCPW3g6qa8=', 'LeUpiUMahZWTQTAmNUQT2xd/v0zSrAtW+FWoiDV+5GY=', 'MAbrT/x6hYGabaSS86isHfUa7lsXuOiddL8Bz19x6a0=', 'KvQfu2G6ioD9z2//nj9vQimT/o8KRjn5YjRMgiUUUIY=', 'EZ5oTeR2FV/lprQajryF24cYqyeInoXngbIUus5IJ8M=', 'GDW3huLokl4Yi+pZrjY1N7USSMI4KPBHz/eEuXs/2AA=', 'KCAaNMWU36NNeUmWxkM6INFSusKnkFySbEDihasy7rY=', 'CD79eifRdRCU6A/vr3iwAIZMgutXEYdySnYfiMIsxOc=', 'C2+Io1dxmVJhWOYc7qJ76BHBbfd3TdhRngeVZPYf0Ts=', 'Dsho5tFeUdlkT2bh1kcalFiVEcoA0p4QFDkObuQlT1s=', 'KvM+P4ZncScawMmz7S4RQuzT50uTnNQNANk3q4TJhZE=', 'C1ICEfkEtefQm12WHGrOdzRWjFR91oWLNkzl5HlR8Xg=', 'Cy1yLQkZoarY21jxAGKpLqDFasQnDoIsyiKGIBiKHUA=', 'H3kNTX+M8JTZgM6zfCRT6Ve1SpmRyji74AYdHtblYtQ=', 'AXHrld+/fR6uqXzThfeAFQiFwWI1oqao2pLOsB5QQjM=', 'DC0OO1/VdUkym/aIXaZrm3kLQN79LIZQdiMFOBsWiHM=', 'EWL7KGicJxVOWoIotOcrN3y8r6WJ4oPDXTgDBUQHoY0=', 'LxRZtl3uRBtkrThqkegxDygsWpKonhmSFiPvgklxG8A=', 'Hm/zIWtojD2ZbXQ2fVzUwbxInUZ1TrcSwkP3DRtTz7s=', 'AcqL5zgyuNBoFIfSfRV4AtdBpvNs3CoFdogfkyZHiHU=', 'H3c1cG/+n8WG+XbVvfIj3GgChggLEM6gC5td4xX5ZQ4=', 'JSK2D06jMHZAoMLc4EH7qSGsEKPV8JbvR0XKg4KF8Bk=', 'I/C+4AGxAp1SVQdd3JV/gzQYytT1K2w/jOFsI1VyV1s=', 'K8Gui43buB/KrC1EVV7VaF0UJjPp35BfZtlAEJMILVk=', 'D5QGuCllZKNzBFB7jbo+0WI3EnOgex/JgBH81q1yIF8=', 'I2Co6wzH3vpntymY3pBxThfnWxdKUu5KyxJsjNmV8Kg=', 'FYcaXN3q2XaATIA8uu8lXrSBWl6W34sAbcu8J2f4iUg=', 'GTpWdmmY7p4KhlLdLzsdoDYvT1T3I3lUT5V8ze77Qg8=', 'KjlKQ5NPhpgvm+Vv9PqxcDsuY8itM0g05DCYBed3rg8=', 'GFmVTP64aV8+i2NdyzRRkoks0RIjRDuntBZuiHbA0UI=', 'BOEYF2MFDlgBNETby5nxkCsRvCXZC73KQI04GfT+0ys=', 'D9slPe6Dhp1AwzXqZN6MW7EOuC2wi16LH15VUr/QXyM=', 'BYy+ippQJ72qTvtiOt6tYnXwhobxwImEqdfFuum08cA=', 'E4Ltzplx4YZJfq2xrrH1KyO0uDvvAjqw0VIotMzspZo=', 'A0ZJkPBFxu4IGcpR/RGwvn9huOuZ8Ut34eZjRgHZ6LU=', 'I/e/yHINwpb/8ztB+Y/4PG/KtGBdsutaqlvBN663Clg=', 'ClmhWOPuwhF+bpTn8OnezxjD/9XhUxqSGWNhWLuvYvI=', 'BuxUyAOBwFK1i/I7MS/9POLE66BlQgr49MI+0Adf0Hs=', 'EYhy3IMuDrVHa1ZkjoZ+yLCTQPenvLG0li8P+e0fnQE=', 'E9afoSfYNBZa1cfLp61Z7VLgsPDkLX/qleGQa1IJIbE=', 'FpoXf2PqaBJwscaHenPSG94UOUL7cdxV/YpJ8Z8Qx3s=', 'BO9RWRxurZfvQvKHrc5A2Tq+sDK5IvZv+36aWnRQVE0=', 'JW4XWh3AeTkOzXynA/suOxnsYYBdTwPO1fRe5t0Paew=', 'MBAtKGNqvV/l8q9BL/YAT3XMNg0yBd0toAKBPT4s7rI=', 'EJmOQt/NO78cBxS8c+sb9ARDo/qZvvSjH9Mb4YL8x5I=', 'GT7djp/PPXYl+n0ktZih2J8zYur01YLv7K12+HnjaGA=', 'GBaK/TTy2RXQNozoC3szR9HHpWHOYRQl8mZNeqUfC10=', 'KTg8AevTtqsMAXZW6+ZYtqMo7He8M2JuKeLpWzPqYRE=', 'EGRtLyYD3jmh9K5ed3GmSnAttuhvt2q2AL9XP5AQxxE=', 'C+teB9GycUX1dfE5WlW/Ey+QwltA2ns4ZNAkLcsRF/s=', 'FtaFJSB4wTPcDT7K1itciDD5W7LlS1mr3/vwGNlvozY=', 'Cmq9HYM5OPM8dBVOBAS0tApVW7vsId36/Wct1iBH8Bo=', 'GmefXTbre1yOoSpMLe3I/rEt/+7EUDFycKbxmzTPGGA=', 'CYD7IzvUVsI5dNUODr/eRyakI+raTo9v+8dZLj8bk9Y=', 'FhtCIy5huEy/GBCvk6OPwM7OPVYoySggA+ustcMSxys=', 'CtoQqQx/BSCVD31Hpg1eakk/CXh/FWTl0JID20feGgs=', 'GnMNNyMQuoIyA0WimsQjjtPweoorThIbtQ3bmvQH9FE=', 'LIEg8mjvBU+BcGTDad2n6pCDd/6rpcTf+9oQ71joxVY=', 'HHyIJPdYdT+lfAB4nGhCF7kw6VMTvLc+bnuGSaSWj3A=', 'LNntMfX4aRyOOeQHenT6oPQArYtJHrP3tHsn+j/Rz3c=', 'I/9PnUaBNFfPYNkvV2GDmaXgIqwyHKVQhUriORiiLuo=', 'CZRaXRR6T2bO7OZAXd3Z0K9aLFEDUpQH3/HqWPGAQm0=', 'GI2cUoAl1MK2dmDGt3G5D3x9puqinT8mim3SI+xvxjA=', 'MFDjeZZZa3+B9oMRQx2HNNun2SbTYzWV4MDY3fTw9H8=', 'Fa8RaTloMKkWAMqBAsNcQmzq5UYeP5XYnYKVGNMK/Xg=', 'HabQmIVDLqmgbZ83+HPZhdrpM+NRRmspBChNozINisw=', 'J5bqkNJpryn1+KzzOSESTk5PrT2+ZYlF5UbuQR3aqcs=', 'IC190doPa0sDJcizMHdC8B4VYS7I6TBKfLAxngHTLWA=', 'CW1nkNBbt1kVapUromPWcqLX+ceI9Mgxop2s5MD4vl8=', 'BU76H2Ww/OKDgIllJ12He0ONojzlsT4ZY3mMsUR9JaQ=', 'GxYvg9kX6T7bMwjCmALeudiqaQETsuFIZMz24Y5BZfE=', 'IeUkHhJWTdb9nxzdKg3jnu3+/BRmzFaOxc63RaBQbtw=', 'HPtWYujPWskiaoDuF7Nqvstzq1+H4WGSe0NJ4Q5L3wg=', 'DyEXfjAqdxu65tjR7LNztiyZrzRiIKwBKcU/Zm6yQQA=', 'FnFSI3RgaZKv+w3X9xsSvsQjau3mKQVGvO9+H1FcIyA=', 'D6PsW5SIJZwutM8kUBv62b4uyeQsXMjM1BnSppLK2HA=', 'GTwOBOC9KYNXyyZsFQYIDtNu3OhcZIzAhejFexq1S7o=', 'ECrfjvdHNaJ+kSgwbcvDyZ9vcpHNQGV4zhTqKtq6aPg=', 'D+CveFjkmFnipU1vGtlFsTFqokv73SOuQKbQy3DD6rE=', 'IW9nF7vH3tsIU2oiIIQ/Ti2l8dqp69796KXqc0R5jSI=', 'HaVcyQDw0h9KPmlDkZGKGzwjsqx3PGs++I4uQigyUWE='],
  M: [['EJt/QRug5MmytwyvXDansZS+fBGtJDeL/ttoWSuoEYs=', 'Fu1B4Tu5wMZq4RlCT928vJMU3J/b3upV1sZFQ9xJA+A=', 'K5C7oA/KBYn2F+fcv+guDfcGq2QM6yR7eRqTt042c20='], ['KWnyfu0xpIC5w2x2Q3nbyizI/dFBXD3e1ilAvN4L13E=', 'LiQZ+ewC7DlMmHHIMpY9wbiddDyMe5ZAKbIxFoex/iM=', 'EBBx8AMjebaXMVh2aQ8FPRSNThCfX7BlyKrMVaD4m/o='], ['FDAh7GhqPzMNX55lRjgGXObNeeKMWzdTMmJE7mWhsac=', 'F2zAKWla0CWCpw7/CKb9mdBX4S5Y59e2sWzfq8juKRE=', 'GaP8ClZwK/QXun/uOAJZP6ZERwMHBD93cyec1x0l1eA=']]
};
_2.default = _default;

Object.defineProperty(poseidon2$1, "__esModule", {
  value: true
});
var poseidon2_2 = poseidon2$1.poseidon2 = poseidon2;
var _poseidon = _interopRequireDefault(poseidon_1);
var _unstringify = _interopRequireDefault(unstringify);
var _ = _interopRequireDefault(_2);
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const c = (0, _unstringify.default)(_.default);
function poseidon2(inputs) {
  return (0, _poseidon.default)(inputs, c);
}

function checkParameter(value, name, type) {
    if (typeof value !== type) {
        throw new TypeError("Parameter '".concat(name, "' is not a ").concat(type));
    }
}

/**
 * Generates a random big number.
 * @param numberOfBytes The number of bytes of the number.
 * @returns The generated random number.
 */
function genRandomNumber(numberOfBytes) {
    if (numberOfBytes === void 0) { numberOfBytes = 31; }
    return BigNumber.from(randomBytes(numberOfBytes)).toBigInt();
}
/**
 * Checks if a string is a JSON.
 * @param jsonString The JSON string.
 * @returns True or false.
 */
function isJsonArray(jsonString) {
    try {
        return Array.isArray(JSON.parse(jsonString));
    }
    catch (error) {
        return false;
    }
}

var Identity = /** @class */ (function () {
    /**
     * Initializes the class attributes based on the strategy passed as parameter.
     * @param identityOrMessage Additional data needed to create identity for given strategy.
     */
    function Identity(identityOrMessage) {
        if (identityOrMessage === undefined) {
            this._trapdoor = genRandomNumber();
            this._nullifier = genRandomNumber();
            this._secret = poseidon2_2([this._nullifier, this._trapdoor]);
            this._commitment = poseidon1_2([this._secret]);
            return;
        }
        checkParameter(identityOrMessage, "identityOrMessage", "string");
        if (!isJsonArray(identityOrMessage)) {
            var h = hash.sha512(identityOrMessage).padStart(128, "0");
            // alt_bn128 is 253.6 bits, so we can safely use 253 bits.
            this._trapdoor = BigInt("0x".concat(h.slice(64))) >> BigInt(3);
            this._nullifier = BigInt("0x".concat(h.slice(0, 64))) >> BigInt(3);
            this._secret = poseidon2_2([this._nullifier, this._trapdoor]);
            this._commitment = poseidon1_2([this._secret]);
            return;
        }
        var _a = JSON.parse(identityOrMessage), trapdoor = _a[0], nullifier = _a[1];
        this._trapdoor = BigNumber.from(trapdoor).toBigInt();
        this._nullifier = BigNumber.from(nullifier).toBigInt();
        this._secret = poseidon2_2([this._nullifier, this._trapdoor]);
        this._commitment = poseidon1_2([this._secret]);
    }
    Object.defineProperty(Identity.prototype, "trapdoor", {
        /**
         * Returns the identity trapdoor.
         * @returns The identity trapdoor.
         */
        get: function () {
            return this._trapdoor;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Returns the identity trapdoor.
     * @returns The identity trapdoor.
     */
    Identity.prototype.getTrapdoor = function () {
        return this._trapdoor;
    };
    Object.defineProperty(Identity.prototype, "nullifier", {
        /**
         * Returns the identity nullifier.
         * @returns The identity nullifier.
         */
        get: function () {
            return this._nullifier;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Returns the identity nullifier.
     * @returns The identity nullifier.
     */
    Identity.prototype.getNullifier = function () {
        return this._nullifier;
    };
    Object.defineProperty(Identity.prototype, "secret", {
        /**
         * Returns the identity secret.
         * @returns The identity secret.
         */
        get: function () {
            return this._secret;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Returns the identity secret.
     * @returns The identity secret.
     */
    Identity.prototype.getSecret = function () {
        return this._secret;
    };
    Object.defineProperty(Identity.prototype, "commitment", {
        /**
         * Returns the identity commitment.
         * @returns The identity commitment.
         */
        get: function () {
            return this._commitment;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Returns the identity commitment.
     * @returns The identity commitment.
     */
    Identity.prototype.getCommitment = function () {
        return this._commitment;
    };
    /**
     * Returns a JSON string with trapdoor and nullifier. It can be used
     * to export the identity and reuse it later.
     * @returns The string representation of the identity.
     */
    Identity.prototype.toString = function () {
        return JSON.stringify(["0x".concat(this._trapdoor.toString(16)), "0x".concat(this._nullifier.toString(16))]);
    };
    return Identity;
}());

export { Identity };
