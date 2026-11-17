import { describe, expect, test } from "vitest";
import { getAPIKey } from "../api/auth.ts";

import { IncomingHttpHeaders } from "http";

const validHeader: IncomingHttpHeaders = {
  authorization: "ApiKey dummy-token-123",
};

const invalidHeader1: IncomingHttpHeaders = {};
const invalidHeader2: IncomingHttpHeaders = {
  authorization: "bearer dummy-token-123",
};

describe("test get api key", () => {
  test("encluded headers", () => {
    expect(getAPIKey(validHeader)).toBe("dummy-token-123");
  });

  test("missing header", () => {
    expect(getAPIKey(invalidHeader1)).toBeNull();
  });

  test("missing apikey", () => {
    expect(getAPIKey(invalidHeader2)).toBeNull();
  });

  test("broken one", () => {
    expect(getAPIKey(validHeader)).toBeNull();
  });
});

// export function getAPIKey(headers: IncomingHttpHeaders): string | null {
//   const authHeader = headers["authorization"];
//   if (!authHeader) {
//     return null;
//   }
//
//   const splitAuth = authHeader.split(" ");
//   if (splitAuth.length < 2 || splitAuth[0] !== "ApiKey") {
//     return null;
//   }
//
//   return splitAuth[1];
// }
