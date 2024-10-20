import { createClient, type ClientConfig } from "@sanity/client";

const config: ClientConfig = {
    projectId: "lq0ls1yg",
    dataset: "production",
    useCdn: true,
};

const sanityClient = createClient(config);

export default sanityClient;
