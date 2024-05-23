//success

export default function getErrorMessage(code) {
    let msg;
    //     if (code == "VALIDATE") msg = "Successfully authenticated";
    //     else if (code == "ADD_POST") msg = "Posted successfully";
    //     else if (code == "GET_POSTS") msg = "Posts loaded successfully";
    //     else if (code == "ADD_COMMENT") msg = "Comment added successfully";
    //     else if (code == "GET_COMMENTS") msg = "Comments loaded successfully";
    //     else if (code == "GET_USER") msg = "User profile loaded successfully";
    //     else if (code == "PROFILE_UPDATE") msg = "Profile updated successfully";
    //     else if (code == "SEARCH_USERS") msg = "Results fetched successfully";
    //     else if (code == "SEND_PROPOSAL") msg = "Pal proposal sent";
    //     else if (code == "WITHDRAW_PROPOSAL") msg = "Pal proposal withdrawn";
    //     else if (code == "ACCEPT_PROPOSAL") {`You are now in bond with ${value}`}
    //     else if (code == "REJECT_PROPOSAL") {}
    //     else if (code == "UNPAL") msg = "";
    if (code == "UNEXPECTED_ERROR_BACKEND") msg = "Something went wrong.";
    else if (code == "UNEXPECTED_ERROR_FRONTEND")
        msg = "Something went wrong.`";
    else if (code == "JWT_NOT_FOUND")
        msg = "Your session expired. Please login.";
    else if (code == "JWT_MALFORMED")
        msg = "Your session expired. Please login.";
    else if (code == "CLIENT_ID_MISMATCH")
        msg = "Authentication failed. Please login.";
    else if (code == "AUTH_INVALID_USERNAME") msg = "Invalid username.";
    else if (code == "AUTH_INVALID_PASS") msg = "Incorrect password.";
    else if (code == "INVALID_USER_ID") msg = "This person doesn't exist.";
    else if (code == "INVALID_VALUE_USERNAME") msg = "This username is taken.";
    else if (code == "INVALIED_VALUE_NAME")
        msg = "This name cannot be accepted.";
    else if (code == "INVALID_VALUE_MAJOR")
        msg = "Please select a major only from the given list.";
    else if (code == "INVALID_VALUE_BATCH")
        msg = "This batch cannot be accepted.";
    else if (code == "INVALID_VALUE_CONTACT")
        msg = "The entered contact number seems a bit off.";
    else if (code == "INVALID_VALUE_EMAIL")
        msg = "The entered email seems a bit off. ";
    else if (code == "INVALID_VALUE_WEBSITE")
        msg = "The entered website isn't acceptable.";
    else if (code == "INVALID_VALUE_GENDER")
        msg = "Please select a gender from the given list.";
    else if (code == "INVALID_VALUE_RELATIONSHIPSTATUS")
        msg = "Please select a relationship status from the given list.";
    else if (code == "INVALID_VALUE_INTERESTEDIN")
        msg = "Please select from the given list.";
    else if (code == "INVALID_VALUE_BIRTHDATE")
        msg = "Please follow the format 'YYYY-MM-DD'.";
    else if (code == "INVALID_PROFILE_FIELD") msg = "Something went wrong.";
    else if (code == "DATABASE_UPDATE_FAILED")
        msg = "Something went rong. Try again later.";
    else if (code == "SELF_PROPOSAL") msg = "This action is prohibited.";
    else if (code == "ALREADY_PALS") msg = "Already pals.";
    else if (code == "PROPOSAL_DUPLICATION")
        msg = "Already there's a pending proposal.";
    return msg;
}
