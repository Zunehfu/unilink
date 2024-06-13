import svalues from "./currentlySupportedValues";
import Err from "./errClass";

export default function userDataErrorHandler(field, val) {
    let value = val.trim();
    const lvalue = value.toLowerCase();

    if (field === "Name") {
        if (value.length < 3 || value.length > 64) {
            throw new Err("INVALID_VALUE_NAME");
        }
    } else if (field === "Major") {
        value = svalues.major_l.find((val) => val.toLowerCase() === lvalue);
        if (!value) {
            throw new Err("INVALID_VALUE_MAJOR");
        }
    } else if (field === "Batch") {
        if (!/^(201[5-9]|202[0-4])$/.test(value)) {
            throw new Err("INVALID_VALUE_BATCH");
        }
    } else if (field === "Relationship status") {
        value = svalues.relationship_status_l.find(
            (val) => val.toLowerCase() === lvalue
        );
        if (!value) {
            throw new Err("INVALID_VALUE_RELATIONSHIPSTATUS");
        }
    } else if (field === "Gender") {
        value = svalues.gender_l.find((val) => val.toLowerCase() === lvalue);
        if (!value) {
            throw new Err("INVALID_VALUE_GENDER");
        }
    } else if (field === "Contact No") {
        if (!/^\+?[0-9]{10,15}$/.test(value)) {
            throw new Err("INVALID_VALUE_CONTACT");
        }
    } else if (field === "Personal email") {
        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
            throw new Err("INVALID_VALUE_EMAIL");
        }
    } else if (field === "Persosal website") {
        if (!urlPattern.test(value)) {
            throw new Err("INVALID_VALUE_WEBSITE");
        }
    } else if (field === "Interested in") {
        if (!value) {
            throw new Err("INVALID_VALUE_INTERESTEDIN");
        }
    } else if (field === "Date of birth") {
        if (
            !/^(?:(?!0000)\d{4}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1\d|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)-02-29)$/.test(
                value
            )
        ) {
            throw new Err("INVALID_VALUE_BIRTHDATE");
        }
    } else {
        throw new Err("INVALID_PROFILE_FIELD");
    }
    return 0;
}
