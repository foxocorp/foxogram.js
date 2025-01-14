import type { APIChannel, APIOk, APIUser } from "../payloads";

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
  display_name?: string;

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
  password: string;
}

/**
 * The result of POST /users/@me/confirm.
 */
export type RESTPostAPIUserDeleteConfirmResult = APIOk;

/**
 * The body of POST /users/@me/confirm.
 */
export interface RESTPostAPIUserDeleteConfirmBody {
  /**
   * The deletion confirm code.
   */
  code: string;
}

/**
 * The result of GET /users/@me/channels
 */
export type RESTGetAPIUserChannelsResult = APIChannel[];
