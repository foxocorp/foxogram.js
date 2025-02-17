import {
  APIRoutes,
  type RESTDeleteAPIMessageResult,
  type RESTGetAPIMessageListQuery,
  type RESTGetAPIMessageListResult,
  type RESTGetAPIMessageResult,
  type RESTPatchAPIMessageBody,
  type RESTPatchAPIMessageResult,
  type RESTPostAPIMessageBody,
  type RESTPostAPIMessageResult,
} from "@foxogram/api-types";
import type { REST } from "@foxogram/rest";

/**
 * A wrapper for the Foxogram message API.
 */
export class MessageAPI {
  public constructor(private readonly rest: REST) {}

  /**
   * Fetches the messages in a channel.
   */
  public async list(channelId: number, query: RESTGetAPIMessageListQuery = {}) {
    return await this.rest.get<
      RESTGetAPIMessageListResult,
      RESTGetAPIMessageListQuery
    >(APIRoutes.messages(channelId), {
      query,
    });
  }

  /**
   * Sends a message in a channel.
   */
  public async create(channelId: number, body: RESTPostAPIMessageBody) {
    return await this.rest.post<
      RESTPostAPIMessageBody,
      RESTPostAPIMessageResult
    >(APIRoutes.messages(channelId), {
      body,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  /**
   * Fetches a message.
   */
  public async get(channelId: number, messageId: number) {
    return await this.rest.get<RESTGetAPIMessageResult>(
      APIRoutes.message(channelId, messageId),
    );
  }

  /**
   * Edits a message.
   */
  public async edit(
    channelId: number,
    messageId: number,
    body: RESTPatchAPIMessageBody,
  ) {
    return await this.rest.patch<
      RESTPatchAPIMessageBody,
      RESTPatchAPIMessageResult
    >(APIRoutes.message(channelId, messageId), {
      body,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  /**
   * Deletes a message.
   */
  public async delete(channelId: number, messageId: number) {
    return await this.rest.delete<never, RESTDeleteAPIMessageResult>(
      APIRoutes.message(channelId, messageId),
    );
  }
}
