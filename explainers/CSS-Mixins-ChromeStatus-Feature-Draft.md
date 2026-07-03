# ChromeStatus Feature Entry - CSS Mixins (`@mixin` / `@apply`)

---

## 1. Feature name
```
CSS mixins (@mixin / @apply)
```

---

## 2. Summary
```
Defines a reusable, parameterized block of style declarations and nested rules with the @mixin rule, then expands it into a style rule with @apply as if those declarations had been written inline. The mixin body puts the declarations to emit inside an @result block, while any local custom properties used to compute them stay private and never reach the element; parameters can be typed and given defaults, and @result can wrap output in conditional rules such as @supports and @media. This lets authors package consistent patterns - component styles, effects like gradient text, responsive shorthands - once and reuse them across a stylesheet without a CSS pre-processor.
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
| Firefox (Gecko) | No signal | No published standards position on mixins specifically. |
| Safari (WebKit) | No signal | No formal WebKit position on `@mixin` yet. |
| Web developers | Positive | Long-standing, heavy use of the equivalent Sass/Less mixins. We see positive Dev sentiment the State of CSS [2024](https://2024.stateofcss.com/en-US/usage/#css_missing_features) and [2025](https://2025.stateofcss.com/en-US/usage/#css_missing_features). |

---

## 13. Interoperability and compatibility risks
```
- TDB
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