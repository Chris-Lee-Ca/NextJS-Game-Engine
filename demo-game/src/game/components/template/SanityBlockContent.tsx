// TODO: replace it with (@portabletext/react)
const BlockContent = require("@sanity/block-content-to-react");

interface SanityBlockContentProps {
    content: any[];
}

const SanityBlockContent = (props: SanityBlockContentProps) => {
    const { content } = props;

    const serializers = {
        types: {
            code: (props: any) => (
                <pre data-language={props.node.language}>
                    <code>{props.node.code}</code>
                </pre>
            ),
        },
    };

    return <BlockContent blocks={content} serializers={serializers} />;
};

export default SanityBlockContent;
