/**
 * @module @semaphore-protocol/group
 * @version 3.10.1
 * @file A library to create and manage Semaphore groups.
 * @copyright Ethereum Foundation 2022
 * @license MIT
 * @see [Github]{@link https://github.com/semaphore-protocol/semaphore/tree/main/packages/group}
*/
import { IncrementalMerkleTree } from '@zk-kit/incremental-merkle-tree';
import { BigNumber } from '@ethersproject/bignumber';
import { zeroPad } from '@ethersproject/bytes';
import { keccak256 } from '@ethersproject/keccak256';

var poseidon2$1 = {};

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

/**
 * Creates a keccak256 hash of a message compatible with the SNARK scalar modulus.
 * @param message The message to be hashed.
 * @returns The message digest.
 */
function hash(message) {
    message = BigNumber.from(message).toTwos(256).toHexString();
    message = zeroPad(message, 32);
    return BigInt(keccak256(message)) >> BigInt(8);
}

var Group = /** @class */ (function () {
    /**
     * Initializes the group with the group id and the tree depth.
     * @param id Group identifier.
     * @param treeDepth Tree depth.
     * @param members List of group members.
     */
    function Group(id, treeDepth, members) {
        if (treeDepth === void 0) { treeDepth = 20; }
        if (members === void 0) { members = []; }
        if (treeDepth < 16 || treeDepth > 32) {
            throw new Error("The tree depth must be between 16 and 32");
        }
        this._id = id;
        this.merkleTree = new IncrementalMerkleTree(poseidon2_2, treeDepth, hash(id), 2, members.map(BigInt));
    }
    Object.defineProperty(Group.prototype, "id", {
        /**
         * Returns the id of the group.
         * @returns Group id.
         */
        get: function () {
            return this._id;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Group.prototype, "root", {
        /**
         * Returns the root hash of the tree.
         * @returns Root hash.
         */
        get: function () {
            return this.merkleTree.root;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Group.prototype, "depth", {
        /**
         * Returns the depth of the tree.
         * @returns Tree depth.
         */
        get: function () {
            return this.merkleTree.depth;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Group.prototype, "zeroValue", {
        /**
         * Returns the zero value of the tree.
         * @returns Tree zero value.
         */
        get: function () {
            return this.merkleTree.zeroes[0];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Group.prototype, "members", {
        /**
         * Returns the members (i.e. identity commitments) of the group.
         * @returns List of members.
         */
        get: function () {
            return this.merkleTree.leaves;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Returns the index of a member. If the member does not exist it returns -1.
     * @param member Group member.
     * @returns Index of the member.
     */
    Group.prototype.indexOf = function (member) {
        return this.merkleTree.indexOf(member);
    };
    /**
     * Adds a new member to the group.
     * @param member New member.
     */
    Group.prototype.addMember = function (member) {
        this.merkleTree.insert(BigInt(member));
    };
    /**
     * Adds new members to the group.
     * @param members New members.
     * @deprecated Use the new class parameter to add a list of members.
     */
    Group.prototype.addMembers = function (members) {
        for (var _i = 0, members_1 = members; _i < members_1.length; _i++) {
            var member = members_1[_i];
            this.addMember(member);
        }
    };
    /**
     * Updates a member in the group.
     * @param index Index of the member to be updated.
     * @param member New member value.
     */
    Group.prototype.updateMember = function (index, member) {
        this.merkleTree.update(index, member);
    };
    /**
     * Removes a member from the group.
     * @param index Index of the member to be removed.
     */
    Group.prototype.removeMember = function (index) {
        this.merkleTree.delete(index);
    };
    /**
     * Creates a proof of membership.
     * @param index Index of the proof's member.
     * @returns Proof object.
     */
    Group.prototype.generateMerkleProof = function (index) {
        var merkleProof = this.merkleTree.createProof(index);
        merkleProof.siblings = merkleProof.siblings.map(function (s) { return s[0]; });
        return merkleProof;
    };
    return Group;
}());

export { Group };
