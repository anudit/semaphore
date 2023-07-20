/**
 * @module @semaphore-protocol/heyauthn
 * @version 3.10.1
 * @file A library to allow developers to create and manage Semaphore identities using WebAuthn
 * @copyright Vivek Bhupatiraju 2023
 * @license MIT
 * @see [Github]{@link https://github.com/semaphore-protocol/semaphore/tree/main/packages/heyauthn}
*/
import { Identity } from '@semaphore-protocol/identity';
export { Identity } from '@semaphore-protocol/identity';
import { generateRegistrationOptions, generateAuthenticationOptions } from '@simplewebauthn/server';
import { startRegistration, startAuthentication } from '@simplewebauthn/browser';

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

var HeyAuthn = /** @class */ (function () {
    function HeyAuthn(identity) {
        this._identity = identity;
    }
    /**
     * Registers a new WebAuthn credential and returns its HeyAuthn instance.
     *
     * @param {GenerateRegistrationOptionsOpts} options - WebAuthn options for registering a new credential.
     * @returns A HeyAuthn instance with the newly registered credential.
     */
    HeyAuthn.fromRegister = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var registrationOptions, id, identity;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        registrationOptions = generateRegistrationOptions(options);
                        return [4 /*yield*/, startRegistration(registrationOptions)];
                    case 1:
                        id = (_a.sent()).id;
                        identity = new Identity(id);
                        return [2 /*return*/, new HeyAuthn(identity)];
                }
            });
        });
    };
    /**
     * Authenticates an existing WebAuthn credential and returns its HeyAuthn instance.
     *
     * @param {GenerateAuthenticationOptionsOpts} options - WebAuthn options for authenticating an existing credential.
     * @returns A HeyAuthn instance with the existing credential.
     */
    HeyAuthn.fromAuthenticate = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var authenticationOptions, id, identity;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        authenticationOptions = generateAuthenticationOptions(options);
                        return [4 /*yield*/, startAuthentication(authenticationOptions)];
                    case 1:
                        id = (_a.sent()).id;
                        identity = new Identity(id);
                        return [2 /*return*/, new HeyAuthn(identity)];
                }
            });
        });
    };
    Object.defineProperty(HeyAuthn.prototype, "identity", {
        /**
         * Returns the Semaphore identity instance.
         * @returns The Semaphore identity.
         */
        get: function () {
            return this._identity;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Returns the Semaphore identity instance.
     * @returns The Semaphore identity.
     */
    HeyAuthn.prototype.getIdentity = function () {
        return this._identity;
    };
    return HeyAuthn;
}());

export { HeyAuthn };
