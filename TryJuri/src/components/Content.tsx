import {useState, useEffect} from "react";
import ReactMarkdown from "react-markdown";

interface Props{
    file: string,
    markdown? : boolean,
    external? : boolean
}

/**
 * 
 * @param file filename in public content or url if external
 * @param markdown flag if content of `file` is markdown
 * @param external flag if file is in ./public/content or external
 * @returns ReactElement with content of `file`
 */
export default function Content({file, markdown, external} : Props){
    const [content, setContent] = useState('');

    useEffect(() => {
        let f = external ? file : `${process.env.PUBLIC_URL}/content/${file}`;
        fetch(f).then((response) => response.text()).then((text) => {
            setContent(text || 'Loading...');
        });

    }, []);
    return markdown ? <ReactMarkdown>{content}</ReactMarkdown> : <>{content}</>;
}