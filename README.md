# DeGov.AI

The official [DeGov website](https://degov.ai/) introduces Square governance, Atlas intelligence, the current Agent API, and Agent Skills.

## Development

```sh
pnpm install --frozen-lockfile
pnpm dev
```

## Verification

```sh
pnpm lint
pnpm build
pnpm test:design
pnpm test:product-navigation-analytics -- --expect-disabled
```

The site uses Next.js static export. `pnpm build` creates `out/` and checks social metadata, structured data, homepage tokens, current API discovery links, information pages, and 404 recovery. Production builds additionally set `NEXT_PUBLIC_DEGOV_HOME_GA4_ENABLED=true`; see the deployment workflows for the matching analytics check.

`public/llms.txt` links agents to the authoritative [OpenAPI](https://agent-api.degov.ai/openapi.json), current documentation, and maintained Skills. Keep it aligned when public API capabilities change. The root `vercel.json` redirects `/openapi.json` to the API host rather than copying a specification whose relative server URL would resolve against this website. The deployment action copies that configuration alongside the static output.

Tags deploy to production; branches and pull requests deploy previews. Local static servers may need explicit 404 handling and do not automatically apply Vercel redirects.
