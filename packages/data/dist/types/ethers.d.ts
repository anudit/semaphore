import { Contract } from "@ethersproject/contracts";
import { EthersOptions, GroupResponse, EthersNetwork } from "./types";
export default class SemaphoreEthers {
    private _network;
    private _options;
    private _contract;
    /**
     * Initializes the Ethers object with an Ethereum network or custom URL.
     * @param networkOrEthereumURL Ethereum network or custom URL.
     * @param options Ethers options.
     */
    constructor(networkOrEthereumURL?: EthersNetwork | string, options?: EthersOptions);
    /**
     * Returns the Ethereum network or custom URL.
     * @returns Ethereum network or custom URL.
     */
    get network(): EthersNetwork | string;
    /**
     * Returns the Ethers options.
     * @returns Ethers options.
     */
    get options(): EthersOptions;
    /**
     * Returns the contract object.
     * @returns Contract object.
     */
    get contract(): Contract;
    /**
     * Returns the list of group ids.
     * @returns List of group ids.
     */
    getGroupIds(): Promise<string[]>;
    /**
     * Returns a specific group.
     * @param groupId Group id.
     * @returns Specific group.
     */
    getGroup(groupId: string): Promise<GroupResponse>;
    /**
     * Returns a group admin.
     * @param groupId Group id.
     * @returns Group admin.
     */
    getGroupAdmin(groupId: string): Promise<string>;
    /**
     * Returns a list of group members.
     * @param groupId Group id.
     * @returns Group members.
     */
    getGroupMembers(groupId: string): Promise<string[]>;
    /**
     * Returns a list of group verified proofs.
     * @param groupId Group id.
     * @returns Group verified proofs.
     */
    getGroupVerifiedProofs(groupId: string): Promise<any>;
}
