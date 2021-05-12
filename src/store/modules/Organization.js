const SET_ORGANIZATION = "organization-action/SET_ORGANIZATION";

export const SETOrganization = organization => ({type: SET_ORGANIZATION, organization});

const initalState = "all";

export default function organization(state = initalState, action) {
    switch(action.type) {
        case SET_ORGANIZATION:
            return action.organization;
        default:
            return state;
    }
}