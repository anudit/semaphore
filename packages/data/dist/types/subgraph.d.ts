import { GroupOptions, GroupResponse, SupportedNetwork } from "./types";
export default class SemaphoreSubgraph {
    private _url;
    /**
     * Initializes the subgraph object with one of the supported networks or a custom URL.
     * @param networkOrSubgraphURL Supported Semaphore network or custom Subgraph URL.
     */
    constructor(networkOrSubgraphURL?: SupportedNetwork | string);
    /**
     * Returns the subgraph URL.
     * @returns Subgraph URL.
     */
    get url(): string;
    /**
     * Returns the list of group ids.
     * @returns List of group ids.
     */
    getGroupIds(): Promise<string[]>;
    /**
     * Returns the list of groups.
     * @param options Options to select the group parameters.
     * @returns List of groups.
     */
    getGroups(options?: GroupOptions): Promise<GroupResponse[]>;
    /**
     * Returns a specific group.
     * @param groupId Group id.
     * @param options Options to select the group parameters.
     * @returns Specific group.
     */
    getGroup(groupId: string, options?: Omit<GroupOptions, "filters">): Promise<GroupResponse>;
    /**
     * Returns true if a member is part of group, and false otherwise.
     * @param groupId Group id
     * @param member Group member.
     * @returns True if the member is part of the group, false otherwise.
     */
    isGroupMember(groupId: string, member: string): Promise<boolean>;
}
