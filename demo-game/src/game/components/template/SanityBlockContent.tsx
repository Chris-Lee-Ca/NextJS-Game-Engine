// TODO: replace it with (@portabletext/react)
import BlockContent from "@sanity/block-content-to-react";

interface SanityCodeBlockProps {
    node: {
        language: string;
        code: string;
    };
}

interface SanityBlockContentProps {
    content: unknown[];
}

const SanityBlockContent = (props: SanityBlockContentProps) => {
    const { content } = props;

    const serializers = {
        types: {
            code: (props: SanityCodeBlockProps) => (
                <pre data-language={props.node.language}>
                    <code>{props.node.code}</code>
                </pre>
            ),
        },
    };

    return <BlockContent blocks={content} serializers={serializers} />;
};

export default SanityBlockContent;
