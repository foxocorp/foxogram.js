/**
 * API User DTO.
 */
export interface APIUser {
  /**
   * The avatar of the user.
   */
  avatar: string;

  /**
   * The display name of the user.
   */
  displayName: string;

  /**
   * The username of the user.
   */
  username: string;

  /**
   * The email of the user.
   */
  email: string | null;

  /**
   * The flags of the user.
   */
  flags: UserFlags;

  /**
   * The type of the user.
   */
  type: UserType;

  /**
   * The time when user created at.
   */
  createdAt: number;
}

/**
 * User entity types.
 */
export enum UserType {
  /**
   * The user is the human?
   */
  User = 1,

  /**
   * The user is the bot.
   */
  Bot = 2,
}

/**
 * Flags of the user.
 */
export enum UserFlags {
  /**
   * The user is awaiting email confirmation.
   */

  AwaitingConfirmation = 1,
  /**
   * The MFA is enabled.
   */
  MFAEnabled = 2,

  /**
   * The user's email is verified.
   */
  EmailVerified = 4,

  /**
   * The user is disabled.
   */
  Disabled = 8,
}
