# ChromeStatus Feature Entry - CSS Mixins (`@mixin` / `@apply`)

---

## 1. Feature name
```
CSS mixins (@mixin / @apply)
```

---

## 2. Summary
```
CSS mixins let authors define a reusable, parameterized block of CSS declarations (and nested rules)
once with the @mixin rule, then insert that block into any style rule with @apply. Where custom
properties reuse a single value and custom functions (@function) return a value, a mixin expands into
whole declarations - the CSS equivalent of a Sass/Less mixin, but native, cascade-aware, and able to
respond to client-side @media, @container, and @supports conditions.

@mixin --center {
  display: grid;
  place-content: center;
}

.card {
  @apply --center;
  /* expands to:
     display: grid;
     place-content: center; */
}

Mixins accept named, optionally typed, optionally defaulted parameters, so a single definition can
generate many variations at the call site:

@mixin --button(--face: teal, --radius: 3px) {
  background: var(--face);
  border-radius: var(--radius);
  color: color-mix(in lch, white 85%, var(--face));
  padding: 0.25lh 2ch;
}

button.primary { @apply --button(rebeccaPurple); }
button.danger  { @apply --button(maroon, 6px); }
```

---

## 3. Blink component
```
Blink>CSS
```

---

## 4. Feature category
```
CSS
```

---

## 5. Feature type
```
New or changed feature
```

---

## 6. Implementation status / Intent stage
```
Proposed (incubation) - not yet under active implementation.
```

---

## 7. Motivation
```
For years authors have leaned on pre-processors (Sass, Less, PostCSS) to avoid repetition, enforce
consistency, and encode best-practice patterns - most commonly through mixins that stamp out a block
of declarations (component styles, named media-query shorthands, complex reusable patterns like
scroll-shadows or fluid type). Custom properties and the new @function rule cover value-level reuse,
but neither can package a *set of declarations or nested rules* for reuse. That gap is one of the
last major reasons teams still require a CSS build step.

A native @mixin / @apply solves this directly and adds capabilities pre-processors cannot: mixins can
take cascaded custom properties as arguments and can contain client-side @media, @container, and
@supports conditions, so a single applied mixin responds to runtime context rather than being frozen
at build time. Native mixins reduce external dependencies and build tooling, keep abstraction logic
in one authoritative place, and let the platform ship reusable patterns that stay in sync with the
cascade. Author demand is well documented in CSSWG discussion (issue #9350) and in HTTP Archive data
on how Sass mixins are used in the wild.
```

---

## 8. Initial public proposal URL
```
https://github.com/w3c/csswg-drafts/issues/9350
```

---

## 9. Explainer link(s)
```
https://css.oddbird.net/sasslike/mixins-functions/
https://github.com/w3c/csswg-drafts/issues/9350
```

---

## 10. Specification link
```
https://drafts.csswg.org/css-mixins-1/
```
> Note for reviewers: css-mixins-1 currently defines `@function` only. `@mixin`/`@apply` are expected
> to be added to this module (or a later level). Update this link to the specific `@mixin` /
> `@apply` sections once they land in the ED.

---

## 11. Standards maturity / TAG review
```
TAG review: Not yet requested (feature still in CSSWG incubation).
Standardization venue: W3C CSS Working Group - CSS Functions and Mixins Module Level 1.
```

---

## 12. Standards positions (other vendors + web developers)

| Signal | Status | Notes |
|---|---|---|
| Firefox (Gecko) | No signal | No published standards position on mixins specifically. (For reference, the sibling Custom Functions feature is also recorded as "no public signals" from Gecko.) |
| Safari (WebKit) | No signal | The mixins/functions proposal originates from OddBird (Miriam Suzanne) building on Tab Atkins' custom-function work. No formal WebKit position on `@mixin` yet. |
| Web developers | Positive (anecdotal) | Long-standing, heavy use of the equivalent Sass/Less mixins; demand captured in CSSWG #9350 and HTTP Archive Sass-usage data. The already-shipped Custom Functions feature is marked "Positive" by web devs - a reasonable proxy for appetite here. No formal survey link yet. |

---

## 13. Interoperability and compatibility risks
```
- Syntax is not yet finalized. Open design questions in #9350 include: the parameter-list delimiter
  (comma vs. semicolon when argument values contain commas), whether parameter type/default are
  declared inline or via @parameter-style sub-rules, and the result/output mechanism (@result block
  vs. a descriptor).
- Relationship to @function must stay consistent. Mixins and functions deliberately share parameter
  syntax; divergence between the two would hurt learnability and interop.
- Cascade / nesting interactions. @apply expands declarations at its point of use, so behavior with
  the cascade, nesting, specificity, and shorthand/longhand expansion must be defined precisely to
  avoid engines diverging.
- Shipping before the spec stabilizes risks author-facing incompatibilities; recommend prefixing with
  a dashed-ident (already implied by --name) and gating behind a flag through the experimental phase.
```

---

## 14. Security considerations
```
No new attack surface is anticipated. Mixins are a compile/parse-time authoring convenience that
expand into declarations already expressible in CSS; they introduce no new I/O, no script execution,
and no new access to origins or user data. Standard CSS parsing/error-handling rules apply. A full
review should confirm there are no resource-exhaustion concerns from deeply nested or recursive
@apply usage (recursion handling must be defined to reject cycles).
```

---

## 15. Privacy considerations
```
No privacy impact expected. Mixins do not expose new information about the user, device, or
environment; they operate purely on author-provided CSS. @media / @container / @supports conditions
usable inside a mixin already exist on the platform and carry no additional privacy surface.
```

---

## 16. Ergonomics / developer experience risks
```
- Debuggability: authors will need DevTools support that shows the expanded declarations produced by
  @apply (and which @mixin they came from), otherwise computed styles become hard to trace.
- Error surfacing: invalid arguments or type mismatches should fail predictably (guaranteed-invalid /
  ignored declaration) with clear DevTools messaging.
- Learnability: keeping @mixin parameter syntax aligned with @function reduces cognitive load; a large
  divergence would be an ergonomics regression.
```

---

## 17. Activation risks
```
Feature is additive and opt-in via new at-rules (@mixin / @apply); it does not change the meaning of
any existing CSS. Unknown at-rules are ignored by older engines, so unprefixed graceful degradation
is straightforward, though authors relying on a mixin's declarations will see them dropped where the
feature is unsupported (standard progressive-enhancement consideration, not a compat break).
```

---

## 18. Measurement (UseCounter)
```
Add a UseCounter for the @mixin rule and for the @apply rule (parsed) once implementation begins, to
track author adoption. No UseCounter exists yet.
```

---

## 19. Sample links / demos
```
(none yet - add demo/CodePen links once available)
Reference examples in explainer: https://css.oddbird.net/sasslike/mixins-functions/
```

---

## 20. DevTrial / flag instructions
```
Not yet available - no Chromium implementation or flag exists. Populate once a runtime flag
(e.g. "Experimental Web Platform features") gates the feature.
```

---

## 21. Tracking bug URL
```
https://issues.chromium.org/issues/406935599
```

---

## 22. Documentation / MDN links
```
https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Custom_functions_and_mixins
```

---

## 23. Web Feature ID
```
I submitted a PR: https://github.com/web-platform-dx/web-features/pull/4149
```

---

## 24. Search tags
```
css, mixins, mixin, apply, at-rule, reuse, sass, custom-functions, css-mixins-1
```

---