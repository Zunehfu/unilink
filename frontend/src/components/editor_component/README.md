# Lexical guide for contributors

We use [Lexical Editor](https://lexical.dev/) for editing and showing rich text content(_mentions_, _hashtags_, _links_... etc.).

## Where do we use lexical?

-   Currently being used for,

    1. Mentions
    2. Hashtags
    3. Links

-   We have our own custom [mentions plugin](./plugins/MentionPlugin.jsx) and [mention node](./nodes/MentionNode.jsx), since none of the existing ones didn't satisfy our needs.

-   We use existing lexical plugins for _links_ and _hashtags_.

## Why lexical?

There are many popular rich text editor libraries,

1. [draft.js](https://draftjs.org/)
2. [Quill](https://quilljs.com/)
3. [TinyMCE](https://www.tiny.cloud/)

But why _lexical_?

1. **Performance:** Lexical is designed with performance in mind, especially for complex applications with large documents. It utilizes a reactive architecture to ensure efficient updates and rendering.
2. **Modern JavaScript Features:** Lexical leverages modern JavaScript and React features, making it a good fit for modern web applications that require high performance and reactivity.
3. **Extensibility:** Lexical offers a high degree of customization and extensibility. You can create custom nodes and plugins, allowing you to tailor the editor to fit your specific requirements.
4. **You only pay for what you want:** Its modular design allows developers to use only the parts they need, which can help in reducing the bundle size and improving load times.

## Resources for getting started with lexical

1. [Lexical docs](https://lexical.dev/docs/intro)
2. [GitHub discussions](https://github.com/facebook/lexical/discussions)
3. [Facebook.github.io](https://facebook.github.io/lexical-ios/documentation/lexical/)
