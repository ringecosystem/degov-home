# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- DAO founders and core teams running governance.
- Governance participants who need to understand and act on decisions.
- Researchers and agents inspecting public governance activity.

## Product Purpose

DeGov.AI is an on-chain governance platform for DAOs in the Ethereum ecosystem. It connects a participation path, Square, with an intelligence path, Atlas, so communities can act on and understand governance activity.

## Positioning

Square makes governance participation actionable; Atlas makes governance activity inspectable as shared context. The homepage must show these as connected paths in one public governance domain, not unrelated products.

## Operating Context

Visitors evaluate an open-governance layer, a public DAO directory, and governance intelligence before deciding whether to enter Square or explore Atlas. The current homepage links to Square, Atlas, and the Playground on Base.

## Capabilities and Constraints

- The repository describes DeGov.AI as using OpenZeppelin's Governor Framework.
- Current public routes and established product labels must remain truthful: Square, Atlas, and Playground.
- Do not invent governance metrics, proposal states, customer claims, chain coverage, or agent capabilities.
- The existing implementation is Next.js/React and requires semantic links plus reduced-motion behavior in production.

## Brand Commitments

- Preserve the DeGov.AI name and the semantic distinction between Square and Atlas.
- Keep the user's approved hero direction: a public governance system expressed as two living fields rather than a generic SaaS/dashboard surface.

## Evidence on Hand

- Current homepage content: `src/app/home-client.tsx`.
- Product description: `README.md`.
- Existing logo and image assets: `public/images/`.
- Public product destinations: `https://square.degov.ai/` and `https://atlas.degov.ai/`.

## Product Principles

1. Make participation and understanding visibly connected.
2. Treat governance as public, traceable work rather than an opaque transaction.
3. Preserve a direct route from explanation to product entry.
4. Separate real evidence from illustrative atmosphere.

## Accessibility & Inclusion

- Hero copy, primary destinations, and calls to action remain semantic and keyboard-accessible.
- Motion must respect `prefers-reduced-motion`.
