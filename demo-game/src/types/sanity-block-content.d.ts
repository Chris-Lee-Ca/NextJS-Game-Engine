declare module "@sanity/block-content-to-react" {
    import { ComponentType } from "react";
    const BlockContent: ComponentType<{ blocks: unknown; serializers?: unknown }>;
    export default BlockContent;
}
