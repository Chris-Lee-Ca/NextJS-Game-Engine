import { gql } from "@apollo/client";

export const getAllGameStaticData = gql`
    query GetAllGameStaticData {
        allEducation {
            id
            school
            descriptionRaw
            image {
                asset {
                    url
                }
            }
            skills
            degree
        }
        allExperience {
            id
            role
            company
            image {
                asset {
                    url
                }
            }
            date
            descriptionRaw
            skills
            achievements
        }
        allProject {
            id
            title
            slug {
                current
            }
            nickname
            descriptionRaw
            image {
                asset {
                    url
                }
            }
            tags
            links {
                title
                url
            }
        }
    }
`;
