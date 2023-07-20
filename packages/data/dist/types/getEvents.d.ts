import { Contract } from "@ethersproject/contracts";
/**
 * Returns the list of events of a contract with possible filters.
 * @param contract Contract instance.
 * @param eventName Name of the event.
 * @param filterArgs Filter arguments.
 * @param startBlock Block from which to start fetching.
 * @returns List of contract events.
 */
export default function getEvents(contract: Contract, eventName: string, filterArgs?: any[], startBlock?: number): Promise<any[]>;
