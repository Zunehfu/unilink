import { values } from "./values.js";

function getUniIdByDomain(domain) {
    for (let i in values.universities) {
        for (let j in values.universities[i].domains) {
            if (values.universities[i].domains[j] == domain) return i;
        }
    }
}

function getUniNameByUniId(id) {
    return values.universities[id].name;
}

function getRelationshipStatusByRelationshipId(id) {
    return values.relationship_status[id].name;
}

function getGenderByGenderId(id) {
    return values.gender[id].name;
}

function getInterestedInByInterestedInId(id) {
    return values.interested_in[id].name;
}

function getMajorByUniIdAndMajorId(uni_id, id) {
    return values.universities[uni_id].majors[id];
}

export {
    getUniIdByDomain,
    getUniNameByUniId,
    getRelationshipStatusByRelationshipId,
    getGenderByGenderId,
    getInterestedInByInterestedInId,
    getMajorByUniIdAndMajorId,
};
