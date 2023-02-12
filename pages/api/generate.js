import {Configuration, OpenAIApi} from 'openai';

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const basePromptPrefix = `
The MDX format is perfect for writing documentation for components, as it joins together the ease-of-use and readability of the Markdown syntax with the great flexibility that's enabled by JSX.
MDX docs use a Bit-specific flavor of MDX that extends the docs front matter and renders them using Bit's MDX layout.
Here is the template to follow:
---
labels:  [label1,label2,label3]
description:
---
import {Component} from ...

### Usages
### Example:
\`\`\`js live
() => {
  return (
    <Component
    />
  );
};
\`\`\`
Write an mdx doc for the following component:
`;
const generateAction = async (req, res) => {
    // Run first prompt
    console.log(`API: ${req.body.userInput}`)


    const baseCompletion = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: `${basePromptPrefix}${req.body.userInput}`,
        temperature: 0.7,
        max_tokens: 2000,
    });

    const basePromptOutput = baseCompletion.data.choices.pop();

    res.status(200).json({output: basePromptOutput});
};

export default generateAction;