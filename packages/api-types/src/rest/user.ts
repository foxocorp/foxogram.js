import type { APIMFAKey, APIOk, APIUser } from "../payloads";

/**
 * The result of GET /users/{userKey}.
 */
export type RESTGetAPIUserResult = APIUser;

/**
 * The result of PATCH /users/@me.
 */
export type RESTPatchAPIUserResult = APIUser;

/**
 * The body of PATCH /users/@me.
 */
export interface RESTPatchAPIUserBody {
  /**
   * The avatar of the user.
   */
  avatar?: string;

  /**
   * The display name of the user.
   */
  displayName?: string;

  /**
   * The username of the user.
   */
  username?: string;

  /**
   * The email of the user.
   */
  email?: string;

  /**
   * The password of the user.
   */
  password?: string;
}

/**
 * The result of DELETE /users/@me.
 */
export type RESTDeleteAPIUserResult = APIOk;

/**
 * The body of DELETE /users/@me.
 */
export interface RESTDeleteAPIUserBody {
  /**
   * The password of the user.
   */
  password?: string;
}

/**
 * The result of POST /users/@me/delete/confirm.
 */
export type RESTPostAPIUserDeleteConfirmResult = APIOk;

/**
 * The result of POST /users/@me/mfa.
 */
export type RESTPostAPIUserSetupMFAResult = APIMFAKey;

/**
 * The result of DELETE /users/@me/mfa.
 */
export type RESTDeleteAPIUserDeleteMFAResult = APIOk;

/**
 * The result of POST /users/@me/mfa/setup/validate.
 */
export type RESTPostAPIUserValidateMFAResult = APIOk;