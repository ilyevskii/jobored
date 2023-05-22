import React from "react";

import HTMLReactParser, {DOMNode} from "html-react-parser";


export class HtmlParserService {

    public static parseCode(code: string): JSX.Element | JSX.Element[] | string {

        return HTMLReactParser(code, {

                replace: (node: DOMNode) => {
                    const nodeObject: any = {...node};

                    if (nodeObject.type === "tag" && nodeObject.name === "br") {
                        return <></>;
                    }

                    if (nodeObject.type === "tag" && nodeObject.children[0] && nodeObject.children[0].name === "br") {
                        return <></>;
                    }

                    if (nodeObject.type === "tag" && nodeObject.name === "p") {

                        let tagChild = nodeObject.children[0];

                        if (tagChild && tagChild.name === "b") {
                            const tagText = tagChild.children[0].data;
                            return <p className="vacancy-info-subheader semi-bold">{tagText}</p>
                        }

                        if (tagChild && tagChild.hasOwnProperty("data")) {

                            const tagText = tagChild.data.trim();
                            if (tagText.split(" ").length < 5 && tagText.endsWith(":")) {
                                return <p className="vacancy-info-subheader semi-bold">{tagText}</p>
                            }

                        }

                    }

                    if (nodeObject.type === "tag" && nodeObject.name === "b") {
                        const tagText = nodeObject.children[0].data;
                        return <p className="vacancy-info-subheader semi-bold">{tagText}</p>
                    }

                }
            }
        )
    }
}