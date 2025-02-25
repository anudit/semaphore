/**
 * @module @semaphore-protocol/hardhat
 * @version 3.10.1
 * @file A Semaphore Hardhat plugin to deploy verifiers and Semaphore contract.
 * @copyright Ethereum Foundation 2022
 * @license MIT
 * @see [Github]{@link https://github.com/semaphore-protocol/semaphore/tree/main/packages/hardhat}
*/
'use strict';

var config = require('hardhat/config');
require('hardhat-dependency-compiler');
require('@nomiclabs/hardhat-ethers');
var circomlibjs = require('circomlibjs');

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

config.task("deploy:semaphore", "Deploy a Semaphore contract")
    .addOptionalParam("pairing", "Pairing library address", undefined, config.types.string)
    .addOptionalParam("semaphoreVerifier", "SemaphoreVerifier contract address", undefined, config.types.string)
    .addOptionalParam("poseidon", "Poseidon library address", undefined, config.types.string)
    .addOptionalParam("incrementalBinaryTree", "IncrementalBinaryTree library address", undefined, config.types.string)
    .addOptionalParam("logs", "Print the logs", true, config.types.boolean)
    .setAction(function (_a, _b) {
    var logs = _a.logs, pairingAddress = _a.pairing, semaphoreVerifierAddress = _a.semaphoreVerifier, poseidonAddress = _a.poseidon, incrementalBinaryTreeAddress = _a.incrementalBinaryTree;
    var ethers = _b.ethers;
    return __awaiter(void 0, void 0, void 0, function () {
        var PairingFactory, pairing, SemaphoreVerifierFactory, semaphoreVerifier, poseidonABI, poseidonBytecode, signer, PoseidonFactory, poseidon, IncrementalBinaryTreeFactory, incrementalBinaryTree, SemaphoreFactory, semaphore;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    if (!!semaphoreVerifierAddress) return [3 /*break*/, 8];
                    if (!!pairingAddress) return [3 /*break*/, 4];
                    return [4 /*yield*/, ethers.getContractFactory("Pairing")];
                case 1:
                    PairingFactory = _c.sent();
                    return [4 /*yield*/, PairingFactory.deploy()];
                case 2:
                    pairing = _c.sent();
                    return [4 /*yield*/, pairing.deployed()];
                case 3:
                    _c.sent();
                    if (logs) {
                        console.info("Pairing library has been deployed to: ".concat(pairing.address));
                    }
                    pairingAddress = pairing.address;
                    _c.label = 4;
                case 4: return [4 /*yield*/, ethers.getContractFactory("SemaphoreVerifier", {
                        libraries: {
                            Pairing: pairingAddress
                        }
                    })];
                case 5:
                    SemaphoreVerifierFactory = _c.sent();
                    return [4 /*yield*/, SemaphoreVerifierFactory.deploy()];
                case 6:
                    semaphoreVerifier = _c.sent();
                    return [4 /*yield*/, semaphoreVerifier.deployed()];
                case 7:
                    _c.sent();
                    if (logs) {
                        console.info("SemaphoreVerifier contract has been deployed to: ".concat(semaphoreVerifier.address));
                    }
                    semaphoreVerifierAddress = semaphoreVerifier.address;
                    _c.label = 8;
                case 8:
                    if (!!incrementalBinaryTreeAddress) return [3 /*break*/, 16];
                    if (!!poseidonAddress) return [3 /*break*/, 12];
                    poseidonABI = circomlibjs.poseidon_gencontract.generateABI(2);
                    poseidonBytecode = circomlibjs.poseidon_gencontract.createCode(2);
                    return [4 /*yield*/, ethers.getSigners()];
                case 9:
                    signer = (_c.sent())[0];
                    PoseidonFactory = new ethers.ContractFactory(poseidonABI, poseidonBytecode, signer);
                    return [4 /*yield*/, PoseidonFactory.deploy()];
                case 10:
                    poseidon = _c.sent();
                    return [4 /*yield*/, poseidon.deployed()];
                case 11:
                    _c.sent();
                    if (logs) {
                        console.info("Poseidon library has been deployed to: ".concat(poseidon.address));
                    }
                    poseidonAddress = poseidon.address;
                    _c.label = 12;
                case 12: return [4 /*yield*/, ethers.getContractFactory("IncrementalBinaryTree", {
                        libraries: {
                            PoseidonT3: poseidonAddress
                        }
                    })];
                case 13:
                    IncrementalBinaryTreeFactory = _c.sent();
                    return [4 /*yield*/, IncrementalBinaryTreeFactory.deploy()];
                case 14:
                    incrementalBinaryTree = _c.sent();
                    return [4 /*yield*/, incrementalBinaryTree.deployed()];
                case 15:
                    _c.sent();
                    if (logs) {
                        console.info("IncrementalBinaryTree library has been deployed to: ".concat(incrementalBinaryTree.address));
                    }
                    incrementalBinaryTreeAddress = incrementalBinaryTree.address;
                    _c.label = 16;
                case 16: return [4 /*yield*/, ethers.getContractFactory("Semaphore", {
                        libraries: {
                            IncrementalBinaryTree: incrementalBinaryTreeAddress
                        }
                    })];
                case 17:
                    SemaphoreFactory = _c.sent();
                    return [4 /*yield*/, SemaphoreFactory.deploy(semaphoreVerifierAddress)];
                case 18:
                    semaphore = _c.sent();
                    return [4 /*yield*/, semaphore.deployed()];
                case 19:
                    _c.sent();
                    if (logs) {
                        console.info("Semaphore contract has been deployed to: ".concat(semaphore.address));
                    }
                    return [2 /*return*/, {
                            semaphore: semaphore,
                            pairingAddress: pairingAddress,
                            semaphoreVerifierAddress: semaphoreVerifierAddress,
                            poseidonAddress: poseidonAddress,
                            incrementalBinaryTreeAddress: incrementalBinaryTreeAddress
                        }];
            }
        });
    });
});

config.task("deploy:semaphore-verifier", "Deploy a SemaphoreVerifier contract")
    .addOptionalParam("pairing", "Pairing library address", undefined, config.types.string)
    .addOptionalParam("logs", "Print the logs", true, config.types.boolean)
    .setAction(function (_a, _b) {
    var logs = _a.logs, pairingAddress = _a.pairing;
    var ethers = _b.ethers;
    return __awaiter(void 0, void 0, void 0, function () {
        var PairingFactory, pairing, SemaphoreVerifierFactory, semaphoreVerifier;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    if (!!pairingAddress) return [3 /*break*/, 4];
                    return [4 /*yield*/, ethers.getContractFactory("Pairing")];
                case 1:
                    PairingFactory = _c.sent();
                    return [4 /*yield*/, PairingFactory.deploy()];
                case 2:
                    pairing = _c.sent();
                    return [4 /*yield*/, pairing.deployed()];
                case 3:
                    _c.sent();
                    if (logs) {
                        console.info("Pairing library has been deployed to: ".concat(pairing.address));
                    }
                    pairingAddress = pairing.address;
                    _c.label = 4;
                case 4: return [4 /*yield*/, ethers.getContractFactory("SemaphoreVerifier", {
                        libraries: {
                            Pairing: pairingAddress
                        }
                    })];
                case 5:
                    SemaphoreVerifierFactory = _c.sent();
                    return [4 /*yield*/, SemaphoreVerifierFactory.deploy()];
                case 6:
                    semaphoreVerifier = _c.sent();
                    return [4 /*yield*/, semaphoreVerifier.deployed()];
                case 7:
                    _c.sent();
                    if (logs) {
                        console.info("SemaphoreVerifier contract has been deployed to: ".concat(semaphoreVerifier.address));
                    }
                    return [2 /*return*/, {
                            semaphoreVerifier: semaphoreVerifier,
                            pairingAddress: pairingAddress
                        }];
            }
        });
    });
});

config.extendConfig(function (config, userConfig) {
    var _a;
    config.dependencyCompiler.paths = [
        "@semaphore-protocol/contracts/base/Pairing.sol",
        "@semaphore-protocol/contracts/base/SemaphoreVerifier.sol",
        "@semaphore-protocol/contracts/Semaphore.sol"
    ];
    if ((_a = userConfig.dependencyCompiler) === null || _a === void 0 ? void 0 : _a.paths) {
        config.dependencyCompiler.paths = __spreadArray(__spreadArray([], config.dependencyCompiler.paths, true), userConfig.dependencyCompiler.paths, true);
    }
});
