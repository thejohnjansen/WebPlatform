# [Explainer Title]

Consider all sections required unless otherwise noted.

Authors: [Name](https://github.com/your-handle)

## Status of this Document

This document is a starting point for engaging the community and standards bodies in developing collaborative solutions fit for standardization. As the solutions to problems described in this document progress along the standards-track, we will retain this document as an archive and use this section to keep the community up-to-date with the most current standards venue and content location of future work and discussions.

- This document status: **Active**
- Expected venue: [W3C Web Incubator Community Group](https://wicg.io/)
- Current version: this document

## Introduction

Summarize the problem space, why it matters, and who is impacted.

## Goals

- Goal 1
- Goal 2

## Non-goals

- Non-goal 1
- Non-goal 2

## Use Cases

### Use case 1

Describe a concrete scenario and desired outcome.

### Use case 2

Describe another scenario that validates the proposal.

## Proposed Solution

Describe the core proposal and behavior at a high level.

### API Shape (if applicable)

```webidl
// Example only
partial interface Navigator {
  Promise<void> example();
};
```

### Example Usage (if applicable)

```js
if ("example" in navigator) {
  await navigator.example();
}
```

## Privacy and Security Considerations

### Privacy

Describe expected privacy impact, including potential fingerprinting surfaces.

### Security

Describe security implications and mitigations.

## Accessibility Considerations

Document accessibility implications, including keyboard and assistive technology impact.

## Alternative Solutions

### Alternative 1

Explain the alternative and why it is not preferred.

### Alternative 2

Explain tradeoffs.

## Open Questions

1. Question one?
2. Question two?

## References and Acknowledgements

- [Relevant spec or issue](https://example.com)
- Acknowledge contributors and reviewers
