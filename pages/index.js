import Head from 'next/head';
import Image from 'next/image';
import buildspaceLogo from '../assets/buildspace-logo.png';
import {useState} from 'react';

const Home = () => {
    const [userInput, setUserInput] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [apiOutput, setApiOutput] = useState('');
    const onUserChangedText = (event) => {
        setUserInput(event.target.value);
    };

    const callGenerateEndpoint = async () => {
        setIsGenerating(true);
        console.log("Calling OpenAi endpoint with...", userInput)
        const response = await fetch('/api/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({userInput}),
        }).catch((e) => {
            console.log("Error: ", e)
        });
        const data = await response.json();
        const {output} = data;
        setApiOutput(`${output.text}`)
        setIsGenerating(false)
    }


    return (
        <div className="root">
            <Head>
                <title>GPT-3 Writer | buildspace</title>
            </Head>
            <div className="container">
                <div className="header">
                    <div className="header-title">
                        <h1>Write BIT doc in seconds.</h1>
                    </div>
                    <div className="header-subtitle">
                        <h2>Copy-paste your component's implementation and let GPT do the rest.</h2>
                    </div>
                </div>
                <div className="prompt-container">
                    <textarea name="text-area" className="prompt-box"
                              placeholder="start typing here"
                              value={userInput}
                              onChange={onUserChangedText}>
                    </textarea>
                    <div className="prompt-buttons">
                        <a className={isGenerating ? 'generate-button loading' : 'generate-button'}
                           onClick={callGenerateEndpoint}>
                            <div className="generate">
                                {isGenerating ? <span className="loader"></span> : <p>Generate</p>}
                            </div>
                        </a>
                    </div>
                </div>
                {apiOutput && (
                    <div className="output">
                        <div className="output-header-container">
                            <div className="output-header">
                                <h3>Output</h3>
                            </div>
                        </div>
                        <div className="output-content">
                            <pre>{apiOutput}</pre>
                        </div>
                    </div>
                )}
            </div>
            <div className="badge-container grow">
                <a
                    href="https://buildspace.so/builds/ai-writer"
                    target="_blank"
                    rel="noreferrer"
                >
                    <div className="badge">
                        <Image src={buildspaceLogo} alt="buildspace logo"/>
                        <p>build with buildspace</p>
                    </div>
                </a>
            </div>
        </div>
    );
};

export default Home;
