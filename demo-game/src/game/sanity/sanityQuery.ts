import { gql } from "@apollo/client";

export const getAllGameStaticData = gql`
    query GetAllGameStaticData {
        allEducation {
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
