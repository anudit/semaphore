import { GenerateRegistrationOptionsOpts as RegistrationOptions, GenerateAuthenticationOptionsOpts as AuthenticationOptions } from "@simplewebauthn/server";
import { Identity } from "@semaphore-protocol/identity";
export default class HeyAuthn {
    private _identity;
    constructor(identity: Identity);
    /**
     * Registers a new WebAuthn credential and returns its HeyAuthn instance.
     *
     * @param {GenerateRegistrationOptionsOpts} options - WebAuthn options for registering a new credential.
     * @returns A HeyAuthn instance with the newly registered credential.
     */
    static fromRegister(options: RegistrationOptions): Promise<HeyAuthn>;
    /**
     * Authenticates an existing WebAuthn credential and returns its HeyAuthn instance.
     *
     * @param {GenerateAuthenticationOptionsOpts} options - WebAuthn options for authenticating an existing credential.
     * @returns A HeyAuthn instance with the existing credential.
     */
    static fromAuthenticate(options: AuthenticationOptions): Promise<HeyAuthn>;
    /**
     * Returns the Semaphore identity instance.
     * @returns The Semaphore identity.
     */
    get identity(): Identity;
    /**
     * Returns the Semaphore identity instance.
     * @returns The Semaphore identity.
     */
    getIdentity(): Identity;
}
