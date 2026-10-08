export function defineCustomElement(tagName: string, elementClass: CustomElementConstructor) {
  const canUseDom =
    typeof window !== 'undefined' &&
    typeof customElements !== 'undefined' &&
    typeof HTMLElement !== 'undefined';

  if (!canUseDom || customElements.get(tagName)) {
    return;
  }

  customElements.define(tagName, elementClass);
}
