import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import Home from "../app/page";

vi.mock("@clerk/nextjs", () => {
  return {
    auth: () => new Promise((resolve) => resolve({ userId: "whatever" })),
    ClerkProvider: ({ children }) => <div>{children}</div>,
    useUser: () => ({
      isSignedIn: true,
      user: {
        id: "user_doesntmatterIguess",
        fullName: "Test User",
      },
    }),
  };
});

test("Home", async () => {
  render(await Home());

  expect(
    screen.getByText(
      "Your super personal high artificial intelligence beautiful assistant."
    )
  ).toBeTruthy();
});
