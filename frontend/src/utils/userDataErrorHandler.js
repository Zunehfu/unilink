import svalues from "./currentlySupportedValues";
import Err from "./errClass";

export default function userDataErrorHandler(field, val) {
    let value = val.trim();
    const lvalue = value.toLowerCase();

    if (field === "Name") {
        if (value.length < 3 || value.length > 64) {
            throw new Err(
                "INVALID_VALUE",
                "Please enter a name in between 3 - 64 characters"
            );
        }
    } else if (field === "Major") {
        value = svalues.major_l.find((val) => val.toLowerCase() === lvalue);
        if (!value) {
            throw new Err(
                "INVALID_VALUE",
                "Please select a valid major from the given list"
            );
        }
    } else if (field === "Batch") {
        if (!/^(201[5-9]|202[0-4])$/.test(value)) {
            throw new Err("INVALID_VALUE", "This batch is not acceptable");
        }
    } else if (field === "Relationship status") {
        value = svalues.relationship_status_l.find(
            (val) => val.toLowerCase() === lvalue
        );
        if (!value) {
            throw new Err(
                "INVALID_VALUE",
                "Please select a valid relationship status from the given list"
            );
        }
    } else if (field === "Gender") {
        value = svalues.gender_l.find((val) => val.toLowerCase() === lvalue);
        if (!value) {
            throw new Err(
                "INVALID_VALUE",
                "Please select a valid gender from the given list"
            );
        }
    } else if (field === "Contact No") {
        if (!/^\+?[0-9]{10,15}$/.test(value)) {
            throw new Err(
                "INVALID_VALUE",
                "This contact number seems a bit off"
            );
        }
    } else if (field === "Personal email") {
        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
            throw new Err("INVALID_VALUE", "This email seems a bit off");
        }
    } else if (field === "Persosal website") {
        if (!urlPattern.test(value)) {
            throw new Err("INVALID_VALUE", "This is not a valid url");
        }
    } else if (field === "Interested in") {
        if (!value) {
            throw new Err("INVALID_VALUE", "Please select from the given list");
        }
    } else if (field === "Date of birth") {
        if (
            !/^(?:(?!0000)\d{4}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1\d|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)-02-29)$/.test(
                value
            )
        ) {
            throw new Err("INVALID_VALUE", "The entered date is not valid");
        }
    } else {
        throw new Err(
            "INVALID_PROFILE_FIELD",
            "Something went wrong. Please try again later"
        );
    }
    return 0;
}
