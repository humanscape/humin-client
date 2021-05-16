const DROP_ORGANIZATION = "organization-action/DROP_ORGANIZATION";
const SET_ORGANIZATION = "organization-action/SET_ORGANIZATION";

export const SETOrganization = organization => ({type: SET_ORGANIZATION, organization});
export const DROPOrganization = () => ({type: DROP_ORGANIZATION});

const initalState = "none";

export default function organization(state = initalState, action) {
    switch(action.type) {
        case SET_ORGANIZATION:
            return action.organization;
        case DROP_ORGANIZATION:
            return "none";
        default:
            return state;
    }
}