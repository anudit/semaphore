import { SupportedNetwork } from "./types";
/**
 * Returns the subgraph URL related to the network passed as a parameter.
 * @param supportedNetwork Semaphore supported network.
 * @returns Subgraph URL.
 */
export default function getURL(supportedNetwork: SupportedNetwork | string): string;
