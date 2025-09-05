// Test file for embedded languages formatting

// Template literals with HTML
const htmlTemplate = html`
<div class="container">
<h1>Hello, ${name}</h1>
<p>This is a template literal with HTML content</p>
<ul>
    ${items.map(item => `
        <li>${item.name}: ${item.value}</li>
    `).join('')}
</ul>
</div>
`;

// Template literals with CSS
const cssStyles = css`
.container {
max-width: ${maxWidth}px;
margin: 0 auto;
padding: 20px;
background-color: ${backgroundColor};
}

.container h1 {
color: ${primaryColor};
font-size: ${fontSize}px;
}

.container p {
color: ${textColor};
line-height: 1.6;
}
`;

// Template literals with JSON
const jsonData = json`
{
"name": "${name}",
"age": ${age},
"email": "${email}",
"preferences": {
    "theme": "${theme}",
    "language": "${language}",
    "notifications": ${notificationsEnabled}
},
"metadata": {
    "created": "${new Date().toISOString()}",
    "version": "${version}"
}
}
`;

// Template literals with Markdown
const markdownContent = markdown`
# ${title}
This is a markdown template literal.
## Section 1
Here's some content about ${topic1}.
## Section 2
And here's some content about ${topic2}.
### Code Example

\`\`\`javascript
const greeting = "Hello, ${name}!";
console.log(greeting);
\`\`\`

> This is a blockquote with ${variable}.
`;

// Template literals with GraphQL
const graphqlQuery = graphql`
query GetUser($id: ID!) {
    user(id: $id) {
        id
        name
        email
        posts {
            id
            title
            createdAt
        }
        friends {
            id
            name
        }
    }
}
`;

// Template literals with YAML
const yamlConfig = yaml`
scripts:
  start: "node server.js"
  build: "webpack --mode production"
  test: "jest"
`;
