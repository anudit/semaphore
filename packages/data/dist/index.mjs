/**
 * @module @semaphore-protocol/data
 * @version 3.10.1
 * @file A library to query Semaphore contracts.
 * @copyright Ethereum Foundation 2022
 * @license MIT
 * @see [Github]{@link https://github.com/semaphore-protocol/semaphore/tree/main/packages/data}
*/
import { Contract } from '@ethersproject/contracts';
import { JsonRpcProvider, AnkrProvider, PocketProvider, EtherscanProvider, CloudflareProvider, AlchemyProvider, InfuraProvider } from '@ethersproject/providers';
import axios from 'axios';

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

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

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

/**
 * Check if the parameter type is correct.
 * @param value Parameter value.
 * @param name Parameter name.
 * @param type Expected parameter type.
 */
function checkParameter(value, name, type) {
    if (typeof value !== type) {
        throw new TypeError("Parameter '".concat(name, "' is not ").concat(type === "object" ? "an" : "a", " ").concat(type));
    }
}

/**
 * Returns the list of events of a contract with possible filters.
 * @param contract Contract instance.
 * @param eventName Name of the event.
 * @param filterArgs Filter arguments.
 * @param startBlock Block from which to start fetching.
 * @returns List of contract events.
 */
function getEvents(contract, eventName, filterArgs, startBlock) {
    if (filterArgs === void 0) { filterArgs = []; }
    if (startBlock === void 0) { startBlock = 0; }
    return __awaiter(this, void 0, void 0, function () {
        var filter, events;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    filter = (_a = contract.filters)[eventName].apply(_a, filterArgs);
                    return [4 /*yield*/, contract.queryFilter(filter, startBlock)];
                case 1:
                    events = _b.sent();
                    return [2 /*return*/, events.map(function (_a) {
                            var args = _a.args, blockNumber = _a.blockNumber;
                            return (__assign(__assign({}, args), { blockNumber: blockNumber }));
                        })];
            }
        });
    });
}

var SemaphoreABI = [
	{
		inputs: [
			{
				internalType: "contract ISemaphoreVerifier",
				name: "_verifier",
				type: "address"
			}
		],
		stateMutability: "nonpayable",
		type: "constructor"
	},
	{
		inputs: [
		],
		name: "Semaphore__CallerIsNotTheGroupAdmin",
		type: "error"
	},
	{
		inputs: [
		],
		name: "Semaphore__GroupAlreadyExists",
		type: "error"
	},
	{
		inputs: [
		],
		name: "Semaphore__GroupDoesNotExist",
		type: "error"
	},
	{
		inputs: [
		],
		name: "Semaphore__MerkleTreeDepthIsNotSupported",
		type: "error"
	},
	{
		inputs: [
		],
		name: "Semaphore__MerkleTreeRootIsExpired",
		type: "error"
	},
	{
		inputs: [
		],
		name: "Semaphore__MerkleTreeRootIsNotPartOfTheGroup",
		type: "error"
	},
	{
		inputs: [
		],
		name: "Semaphore__YouAreUsingTheSameNillifierTwice",
		type: "error"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "uint256",
				name: "groupId",
				type: "uint256"
			},
			{
				indexed: true,
				internalType: "address",
				name: "oldAdmin",
				type: "address"
			},
			{
				indexed: true,
				internalType: "address",
				name: "newAdmin",
				type: "address"
			}
		],
		name: "GroupAdminUpdated",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "uint256",
				name: "groupId",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "merkleTreeDepth",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "zeroValue",
				type: "uint256"
			}
		],
		name: "GroupCreated",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "uint256",
				name: "groupId",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "oldMerkleTreeDuration",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "newMerkleTreeDuration",
				type: "uint256"
			}
		],
		name: "GroupMerkleTreeDurationUpdated",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "uint256",
				name: "groupId",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "index",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "identityCommitment",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "merkleTreeRoot",
				type: "uint256"
			}
		],
		name: "MemberAdded",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "uint256",
				name: "groupId",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "index",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "identityCommitment",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "merkleTreeRoot",
				type: "uint256"
			}
		],
		name: "MemberRemoved",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "uint256",
				name: "groupId",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "index",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "identityCommitment",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "newIdentityCommitment",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "merkleTreeRoot",
				type: "uint256"
			}
		],
		name: "MemberUpdated",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "uint256",
				name: "groupId",
				type: "uint256"
			},
			{
				indexed: true,
				internalType: "uint256",
				name: "merkleTreeRoot",
				type: "uint256"
			},
			{
				indexed: true,
				internalType: "uint256",
				name: "externalNullifier",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "nullifierHash",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "signal",
				type: "uint256"
			}
		],
		name: "ProofVerified",
		type: "event"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "groupId",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "identityCommitment",
				type: "uint256"
			}
		],
		name: "addMember",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "groupId",
				type: "uint256"
			},
			{
				internalType: "uint256[]",
				name: "identityCommitments",
				type: "uint256[]"
			}
		],
		name: "addMembers",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "groupId",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "merkleTreeDepth",
				type: "uint256"
			},
			{
				internalType: "address",
				name: "admin",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "merkleTreeDuration",
				type: "uint256"
			}
		],
		name: "createGroup",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "groupId",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "merkleTreeDepth",
				type: "uint256"
			},
			{
				internalType: "address",
				name: "admin",
				type: "address"
			}
		],
		name: "createGroup",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "groupId",
				type: "uint256"
			}
		],
		name: "getMerkleTreeDepth",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "groupId",
				type: "uint256"
			}
		],
		name: "getMerkleTreeRoot",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "groupId",
				type: "uint256"
			}
		],
		name: "getNumberOfMerkleTreeLeaves",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		name: "groups",
		outputs: [
			{
				internalType: "address",
				name: "admin",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "merkleTreeDuration",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "groupId",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "identityCommitment",
				type: "uint256"
			},
			{
				internalType: "uint256[]",
				name: "proofSiblings",
				type: "uint256[]"
			},
			{
				internalType: "uint8[]",
				name: "proofPathIndices",
				type: "uint8[]"
			}
		],
		name: "removeMember",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "groupId",
				type: "uint256"
			},
			{
				internalType: "address",
				name: "newAdmin",
				type: "address"
			}
		],
		name: "updateGroupAdmin",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "groupId",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "newMerkleTreeDuration",
				type: "uint256"
			}
		],
		name: "updateGroupMerkleTreeDuration",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "groupId",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "identityCommitment",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "newIdentityCommitment",
				type: "uint256"
			},
			{
				internalType: "uint256[]",
				name: "proofSiblings",
				type: "uint256[]"
			},
			{
				internalType: "uint8[]",
				name: "proofPathIndices",
				type: "uint8[]"
			}
		],
		name: "updateMember",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
		],
		name: "verifier",
		outputs: [
			{
				internalType: "contract ISemaphoreVerifier",
				name: "",
				type: "address"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "groupId",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "merkleTreeRoot",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "signal",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "nullifierHash",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "externalNullifier",
				type: "uint256"
			},
			{
				internalType: "uint256[8]",
				name: "proof",
				type: "uint256[8]"
			}
		],
		name: "verifyProof",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	}
];

var SemaphoreEthers = /** @class */ (function () {
    /**
     * Initializes the Ethers object with an Ethereum network or custom URL.
     * @param networkOrEthereumURL Ethereum network or custom URL.
     * @param options Ethers options.
     */
    function SemaphoreEthers(networkOrEthereumURL, options) {
        if (networkOrEthereumURL === void 0) { networkOrEthereumURL = "sepolia"; }
        if (options === void 0) { options = {}; }
        checkParameter(networkOrEthereumURL, "networkOrSubgraphURL", "string");
        if (options.provider) {
            checkParameter(options.provider, "provider", "string");
        }
        else if (!networkOrEthereumURL.startsWith("http")) {
            options.provider = "infura";
        }
        if (options.apiKey) {
            checkParameter(options.apiKey, "apiKey", "string");
        }
        if (networkOrEthereumURL === "matic") {
            networkOrEthereumURL = "maticmum";
        }
        switch (networkOrEthereumURL) {
            case "arbitrum":
                options.address = "0xc60E0Ee1a2770d5F619858C641f14FC4a6401520";
                options.startBlock = 77278430;
                break;
            case "arbitrum-goerli":
                options.address = "0x3889927F0B5Eb1a02C6E2C20b39a1Bd4EAd76131";
                options.startBlock = 15174410;
                break;
            case "maticmum":
                options.address = "0x3889927F0B5Eb1a02C6E2C20b39a1Bd4EAd76131";
                options.startBlock = 33995010;
                break;
            case "goerli":
                options.address = "0x3889927F0B5Eb1a02C6E2C20b39a1Bd4EAd76131";
                options.startBlock = 8777695;
                break;
            case "sepolia":
                options.address = "0x3889927F0B5Eb1a02C6E2C20b39a1Bd4EAd76131";
                options.startBlock = 3231111;
                break;
            case "optimism-goerli":
                options.address = "0x3889927F0B5Eb1a02C6E2C20b39a1Bd4EAd76131";
                options.startBlock = 7632846;
                break;
            default:
                if (options.address === undefined) {
                    throw new Error("You should provide a Semaphore contract address for this network");
                }
                if (options.startBlock === undefined) {
                    options.startBlock = 0;
                }
        }
        var provider;
        switch (options.provider) {
            case "infura":
                provider = new InfuraProvider(networkOrEthereumURL, options.apiKey);
                break;
            case "alchemy":
                provider = new AlchemyProvider(networkOrEthereumURL, options.apiKey);
                break;
            case "cloudflare":
                provider = new CloudflareProvider(networkOrEthereumURL, options.apiKey);
                break;
            case "etherscan":
                provider = new EtherscanProvider(networkOrEthereumURL, options.apiKey);
                break;
            case "pocket":
                provider = new PocketProvider(networkOrEthereumURL, options.apiKey);
                break;
            case "ankr":
                provider = new AnkrProvider(networkOrEthereumURL, options.apiKey);
                break;
            default:
                if (!networkOrEthereumURL.startsWith("http")) {
                    throw new Error("Provider '".concat(options.provider, "' is not supported"));
                }
                provider = new JsonRpcProvider(networkOrEthereumURL);
        }
        this._network = networkOrEthereumURL;
        this._options = options;
        this._contract = new Contract(options.address, SemaphoreABI, provider);
    }
    Object.defineProperty(SemaphoreEthers.prototype, "network", {
        /**
         * Returns the Ethereum network or custom URL.
         * @returns Ethereum network or custom URL.
         */
        get: function () {
            return this._network;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SemaphoreEthers.prototype, "options", {
        /**
         * Returns the Ethers options.
         * @returns Ethers options.
         */
        get: function () {
            return this._options;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SemaphoreEthers.prototype, "contract", {
        /**
         * Returns the contract object.
         * @returns Contract object.
         */
        get: function () {
            return this._contract;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Returns the list of group ids.
     * @returns List of group ids.
     */
    SemaphoreEthers.prototype.getGroupIds = function () {
        return __awaiter(this, void 0, void 0, function () {
            var groups;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, getEvents(this._contract, "GroupCreated", [], this._options.startBlock)];
                    case 1:
                        groups = _a.sent();
                        return [2 /*return*/, groups.map(function (event) { return event[0].toString(); })];
                }
            });
        });
    };
    /**
     * Returns a specific group.
     * @param groupId Group id.
     * @returns Specific group.
     */
    SemaphoreEthers.prototype.getGroup = function (groupId) {
        return __awaiter(this, void 0, void 0, function () {
            var groupCreatedEvent, merkleTreeRoot, numberOfLeaves, group;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        checkParameter(groupId, "groupId", "string");
                        return [4 /*yield*/, getEvents(this._contract, "GroupCreated", [groupId], this._options.startBlock)];
                    case 1:
                        groupCreatedEvent = (_a.sent())[0];
                        if (!groupCreatedEvent) {
                            throw new Error("Group '".concat(groupId, "' not found"));
                        }
                        return [4 /*yield*/, this._contract.getMerkleTreeRoot(groupId)];
                    case 2:
                        merkleTreeRoot = _a.sent();
                        return [4 /*yield*/, this._contract.getNumberOfMerkleTreeLeaves(groupId)];
                    case 3:
                        numberOfLeaves = _a.sent();
                        group = {
                            id: groupId,
                            merkleTree: {
                                depth: groupCreatedEvent.merkleTreeDepth.toString(),
                                zeroValue: groupCreatedEvent.zeroValue.toString(),
                                numberOfLeaves: numberOfLeaves.toNumber(),
                                root: merkleTreeRoot.toString()
                            }
                        };
                        return [2 /*return*/, group];
                }
            });
        });
    };
    /**
     * Returns a group admin.
     * @param groupId Group id.
     * @returns Group admin.
     */
    SemaphoreEthers.prototype.getGroupAdmin = function (groupId) {
        return __awaiter(this, void 0, void 0, function () {
            var groupAdminUpdatedEvents;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        checkParameter(groupId, "groupId", "string");
                        return [4 /*yield*/, getEvents(this._contract, "GroupAdminUpdated", [groupId], this._options.startBlock)];
                    case 1:
                        groupAdminUpdatedEvents = _a.sent();
                        if (groupAdminUpdatedEvents.length === 0) {
                            throw new Error("Group '".concat(groupId, "' not found"));
                        }
                        return [2 /*return*/, groupAdminUpdatedEvents[groupAdminUpdatedEvents.length - 1].newAdmin.toString()];
                }
            });
        });
    };
    /**
     * Returns a list of group members.
     * @param groupId Group id.
     * @returns Group members.
     */
    SemaphoreEthers.prototype.getGroupMembers = function (groupId) {
        return __awaiter(this, void 0, void 0, function () {
            var groupCreatedEvent, zeroValue, memberRemovedEvents, memberUpdatedEvents, groupUpdates, _i, memberUpdatedEvents_1, _a, blockNumber, index, newIdentityCommitment, _b, memberRemovedEvents_1, _c, blockNumber, index, groupUpdate, memberAddedEvents, members, _d, memberAddedEvents_1, _e, index, identityCommitment, groupUpdate, member;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        checkParameter(groupId, "groupId", "string");
                        return [4 /*yield*/, getEvents(this._contract, "GroupCreated", [groupId], this._options.startBlock)];
                    case 1:
                        groupCreatedEvent = (_f.sent())[0];
                        if (!groupCreatedEvent) {
                            throw new Error("Group '".concat(groupId, "' not found"));
                        }
                        zeroValue = groupCreatedEvent.zeroValue.toString();
                        return [4 /*yield*/, getEvents(this._contract, "MemberRemoved", [groupId], this._options.startBlock)];
                    case 2:
                        memberRemovedEvents = _f.sent();
                        return [4 /*yield*/, getEvents(this._contract, "MemberUpdated", [groupId], this._options.startBlock)];
                    case 3:
                        memberUpdatedEvents = _f.sent();
                        groupUpdates = new Map();
                        for (_i = 0, memberUpdatedEvents_1 = memberUpdatedEvents; _i < memberUpdatedEvents_1.length; _i++) {
                            _a = memberUpdatedEvents_1[_i], blockNumber = _a.blockNumber, index = _a.index, newIdentityCommitment = _a.newIdentityCommitment;
                            groupUpdates.set(index.toString(), [blockNumber, newIdentityCommitment.toString()]);
                        }
                        for (_b = 0, memberRemovedEvents_1 = memberRemovedEvents; _b < memberRemovedEvents_1.length; _b++) {
                            _c = memberRemovedEvents_1[_b], blockNumber = _c.blockNumber, index = _c.index;
                            groupUpdate = groupUpdates.get(index.toString());
                            if (!groupUpdate || (groupUpdate && groupUpdate[0] < blockNumber)) {
                                groupUpdates.set(index.toString(), [blockNumber, zeroValue]);
                            }
                        }
                        return [4 /*yield*/, getEvents(this._contract, "MemberAdded", [groupId], this._options.startBlock)];
                    case 4:
                        memberAddedEvents = _f.sent();
                        members = [];
                        for (_d = 0, memberAddedEvents_1 = memberAddedEvents; _d < memberAddedEvents_1.length; _d++) {
                            _e = memberAddedEvents_1[_d], index = _e.index, identityCommitment = _e.identityCommitment;
                            groupUpdate = groupUpdates.get(index.toString());
                            member = groupUpdate ? groupUpdate[1].toString() : identityCommitment.toString();
                            members.push(member);
                        }
                        return [2 /*return*/, members];
                }
            });
        });
    };
    /**
     * Returns a list of group verified proofs.
     * @param groupId Group id.
     * @returns Group verified proofs.
     */
    SemaphoreEthers.prototype.getGroupVerifiedProofs = function (groupId) {
        return __awaiter(this, void 0, void 0, function () {
            var groupCreatedEvent, proofVerifiedEvents;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        checkParameter(groupId, "groupId", "string");
                        return [4 /*yield*/, getEvents(this._contract, "GroupCreated", [groupId], this._options.startBlock)];
                    case 1:
                        groupCreatedEvent = (_a.sent())[0];
                        if (!groupCreatedEvent) {
                            throw new Error("Group '".concat(groupId, "' not found"));
                        }
                        return [4 /*yield*/, getEvents(this._contract, "ProofVerified", [groupId], this._options.startBlock)];
                    case 2:
                        proofVerifiedEvents = _a.sent();
                        return [2 /*return*/, proofVerifiedEvents.map(function (event) { return ({
                                signal: event.signal.toString(),
                                merkleTreeRoot: event.merkleTreeRoot.toString(),
                                externalNullifier: event.externalNullifier.toString(),
                                nullifierHash: event.nullifierHash.toString()
                            }); })];
                }
            });
        });
    };
    return SemaphoreEthers;
}());

var SupportedNetwork;
(function (SupportedNetwork) {
    SupportedNetwork["SEPOLIA"] = "sepolia";
    SupportedNetwork["GOERLI"] = "goerli";
    SupportedNetwork["MUMBAI"] = "mumbai";
    SupportedNetwork["OPTIMISM_GOERLI"] = "optimism-goerli";
    SupportedNetwork["ARBITRUM_GOERLI"] = "arbitrum-goerli";
    SupportedNetwork["ARBITRUM"] = "arbitrum";
})(SupportedNetwork || (SupportedNetwork = {}));

/**
 * Returns the list of Semaphore supported networks.
 * @returns Semaphore supported networks.
 */
function getSupportedNetworks() {
    return Object.values(SupportedNetwork);
}

/**
 * Returns the subgraph URL related to the network passed as a parameter.
 * @param supportedNetwork Semaphore supported network.
 * @returns Subgraph URL.
 */
function getURL(supportedNetwork) {
    switch (supportedNetwork) {
        case "sepolia":
        case "goerli":
        case "mumbai":
        case "optimism-goerli":
        case "arbitrum-goerli":
        case "arbitrum":
            return "https://api.studio.thegraph.com/query/14377/semaphore-".concat(supportedNetwork, "/v3.6.1");
        default:
            throw new TypeError("Network '".concat(supportedNetwork, "' is not supported"));
    }
}

/**
 * Returns the response data of an HTTP request.
 * @param url HTTP URL.
 * @param config Axios request configuration.
 * @returns Request data.
 */
/* istanbul ignore next */
function request(url, config) {
    return __awaiter(this, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, axios(url, __assign({ headers: __assign({ "Content-Type": "application/json" }, config === null || config === void 0 ? void 0 : config.headers) }, config))];
                case 1:
                    data = (_a.sent()).data;
                    return [2 /*return*/, data === null || data === void 0 ? void 0 : data.data];
            }
        });
    });
}

// eslint-disable-next-line import/prefer-default-export
function jsDateToGraphqlDate(date) {
    return Math.round(date.getTime() / 1000);
}

var SemaphoreSubgraph = /** @class */ (function () {
    /**
     * Initializes the subgraph object with one of the supported networks or a custom URL.
     * @param networkOrSubgraphURL Supported Semaphore network or custom Subgraph URL.
     */
    function SemaphoreSubgraph(networkOrSubgraphURL) {
        if (networkOrSubgraphURL === void 0) { networkOrSubgraphURL = SupportedNetwork.SEPOLIA; }
        checkParameter(networkOrSubgraphURL, "networkOrSubgraphURL", "string");
        if (typeof networkOrSubgraphURL === "string" && networkOrSubgraphURL.startsWith("http")) {
            this._url = networkOrSubgraphURL;
            return;
        }
        this._url = getURL(networkOrSubgraphURL);
    }
    Object.defineProperty(SemaphoreSubgraph.prototype, "url", {
        /**
         * Returns the subgraph URL.
         * @returns Subgraph URL.
         */
        get: function () {
            return this._url;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Returns the list of group ids.
     * @returns List of group ids.
     */
    SemaphoreSubgraph.prototype.getGroupIds = function () {
        return __awaiter(this, void 0, void 0, function () {
            var config, groups;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        config = {
                            method: "post",
                            data: JSON.stringify({
                                query: "{\n                    groups {\n                        id\n                    }\n                }"
                            })
                        };
                        return [4 /*yield*/, request(this._url, config)];
                    case 1:
                        groups = (_a.sent()).groups;
                        return [2 /*return*/, groups.map(function (group) { return group.id; })];
                }
            });
        });
    };
    /**
     * Returns the list of groups.
     * @param options Options to select the group parameters.
     * @returns List of groups.
     */
    SemaphoreSubgraph.prototype.getGroups = function (options) {
        if (options === void 0) { options = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var _a, members, _b, verifiedProofs, filtersQuery, _c, admin, timestamp, timestampGte, timestampLte, filterFragments, config, groups, _i, groups_1, group;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        checkParameter(options, "options", "object");
                        _a = options.members, members = _a === void 0 ? false : _a, _b = options.verifiedProofs, verifiedProofs = _b === void 0 ? false : _b;
                        checkParameter(members, "members", "boolean");
                        checkParameter(verifiedProofs, "verifiedProofs", "boolean");
                        filtersQuery = "";
                        if (options.filters) {
                            _c = options.filters, admin = _c.admin, timestamp = _c.timestamp, timestampGte = _c.timestampGte, timestampLte = _c.timestampLte;
                            filterFragments = [];
                            if (admin) {
                                filterFragments.push("admin: \"".concat(admin, "\""));
                            }
                            /* istanbul ignore next */
                            if (timestamp) {
                                filterFragments.push("timestamp: \"".concat(jsDateToGraphqlDate(timestamp), "\""));
                            }
                            else if (timestampGte) {
                                filterFragments.push("timestamp_gte: \"".concat(jsDateToGraphqlDate(timestampGte), "\""));
                            }
                            else if (timestampLte) {
                                filterFragments.push("timestamp_lte: \"".concat(jsDateToGraphqlDate(timestampLte), "\""));
                            }
                            if (filterFragments.length > 0) {
                                filtersQuery = "(where: {".concat(filterFragments.join(", "), "})");
                            }
                        }
                        config = {
                            method: "post",
                            data: JSON.stringify({
                                query: "{\n                    groups ".concat(filtersQuery, " {\n                        id\n                        merkleTree {\n                            root\n                            depth\n                            zeroValue\n                            numberOfLeaves\n                        }\n                        admin\n                        ").concat(members === true
                                    ? "members(orderBy: index) {\n                            identityCommitment\n                        }"
                                    : "", "\n                        ").concat(verifiedProofs === true
                                    ? "verifiedProofs(orderBy: timestamp) {\n                            signal\n                            merkleTreeRoot\n                            externalNullifier\n                            nullifierHash\n                            timestamp\n                        }"
                                    : "", "\n                    }\n                }")
                            })
                        };
                        return [4 /*yield*/, request(this._url, config)];
                    case 1:
                        groups = (_d.sent()).groups;
                        if (groups && members) {
                            for (_i = 0, groups_1 = groups; _i < groups_1.length; _i++) {
                                group = groups_1[_i];
                                group.members = group.members.map(function (member) { return member.identityCommitment; });
                            }
                        }
                        return [2 /*return*/, groups];
                }
            });
        });
    };
    /**
     * Returns a specific group.
     * @param groupId Group id.
     * @param options Options to select the group parameters.
     * @returns Specific group.
     */
    SemaphoreSubgraph.prototype.getGroup = function (groupId, options) {
        if (options === void 0) { options = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var _a, members, _b, verifiedProofs, config, groups;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        checkParameter(groupId, "groupId", "string");
                        checkParameter(options, "options", "object");
                        _a = options.members, members = _a === void 0 ? false : _a, _b = options.verifiedProofs, verifiedProofs = _b === void 0 ? false : _b;
                        checkParameter(members, "members", "boolean");
                        checkParameter(verifiedProofs, "verifiedProofs", "boolean");
                        config = {
                            method: "post",
                            data: JSON.stringify({
                                query: "{\n                    groups(where: { id: \"".concat(groupId, "\" }) {\n                        id\n                        merkleTree {\n                            root\n                            depth\n                            zeroValue\n                            numberOfLeaves\n                        }\n                        admin\n                        ").concat(members === true
                                    ? "members(orderBy: index) {\n                            identityCommitment\n                        }"
                                    : "", "\n                        ").concat(verifiedProofs === true
                                    ? "verifiedProofs(orderBy: timestamp) {\n                            signal\n                            merkleTreeRoot\n                            externalNullifier\n                            nullifierHash\n                            timestamp\n                        }"
                                    : "", "\n                    }\n                }")
                            })
                        };
                        return [4 /*yield*/, request(this._url, config)];
                    case 1:
                        groups = (_c.sent()).groups;
                        if (groups && members) {
                            groups[0].members = groups[0].members.map(function (member) { return member.identityCommitment; });
                        }
                        return [2 /*return*/, groups[0]];
                }
            });
        });
    };
    /**
     * Returns true if a member is part of group, and false otherwise.
     * @param groupId Group id
     * @param member Group member.
     * @returns True if the member is part of the group, false otherwise.
     */
    SemaphoreSubgraph.prototype.isGroupMember = function (groupId, member) {
        return __awaiter(this, void 0, void 0, function () {
            var config, groups;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        checkParameter(groupId, "groupId", "string");
                        checkParameter(member, "member", "string");
                        config = {
                            method: "post",
                            data: JSON.stringify({
                                query: "{\n                    groups(where: { id: \"".concat(groupId, "\", members_: { identityCommitment: \"").concat(member, "\" } }) {\n                        id\n                    }\n                }")
                            })
                        };
                        return [4 /*yield*/, request(this._url, config)];
                    case 1:
                        groups = (_a.sent()).groups;
                        return [2 /*return*/, groups.length !== 0];
                }
            });
        });
    };
    return SemaphoreSubgraph;
}());

export { SemaphoreEthers, SemaphoreSubgraph, SupportedNetwork, getSupportedNetworks };
