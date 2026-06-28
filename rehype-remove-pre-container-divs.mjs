function removePreContainerDivs() {
  return async function preContainerDivsTransformer(tree) {
    const { visit } = await import("unist-util-visit");
    visit(
      tree,
      { type: "element", tagName: "pre" },
      function visitor(node, index, parent) {
        if (parent?.type !== "element") return;
        if (parent.tagName !== "div") return;
        if (parent.children.length !== 1) return;
        Object.assign(parent, node);
      }
    );
  };
}

export default removePreContainerDivs;
