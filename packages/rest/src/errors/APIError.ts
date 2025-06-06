import type { APIException } from '@foxogram/api-types'
import { HTTPError } from './HTTPError'

/**
 * Represents an API error returned by Foxogram.
 */
export class APIError extends HTTPError {
  public constructor(
    status: number,
    method: string,
    route: string,
    public exception: APIException,
  ) {
    super(status, method, route)
  }
}
