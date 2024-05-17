const fs = require("fs");

// Sample data
const firstNameList = [
    "Emily",
    "Michael",
    "Sophia",
    "Jacob",
    "Isabella",
    "Ethan",
    "Emma",
    "Alexander",
    "Olivia",
    "Daniel",
];
const lastNameList = [
    "Smith",
    "Johnson",
    "Williams",
    "Jones",
    "Brown",
    "Davis",
    "Miller",
    "Wilson",
    "Moore",
    "Taylor",
];
const universities = ["MIT", "Harvard", "Stanford", "Berkeley", "Oxford"];
const majors = [
    "Computer Science",
    "Physics",
    "Mathematics",
    "Engineering",
    "Biology",
];
const relationshipStatuses = [
    "Single",
    "In a relationship",
    "Married",
    "Divorced",
];
const genders = ["Male", "Female", "Other"];
const interests = ["Men", "Women", "Both"];
const batchYears = Array.from({ length: 5 }, (_, i) => 2020 + i);

function getRandomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Generate random full names
function generateRandomName() {
    const firstName = getRandomElement(firstNameList);
    const lastName = getRandomElement(lastNameList);
    return `${firstName} ${lastName}`;
}

const values = [];
for (let i = 0; i < 500; i++) {
    const username = `user${i + 1}`;
    const email = `${username}@example.com`;
    const password = "deneth123"; // Plain text password
    const createdAt = new Date().toISOString().slice(0, 19).replace("T", " ");
    const name = generateRandomName();
    const lastOnline = createdAt;
    const age = getRandomInt(18, 25);
    const university = getRandomElement(universities);
    const major = getRandomElement(majors);
    const batch = getRandomElement(batchYears);
    const relationshipStatus = getRandomElement(relationshipStatuses);
    const gender = getRandomElement(genders);
    const contact = getRandomInt(1000000000, 9999999999).toString();
    const personalEmail = `personal_${email}`;
    const website = `https://${username}.com`;
    const interestedIn = getRandomElement(interests);
    const birthDate = new Date(
        new Date().setFullYear(new Date().getFullYear() - age)
    )
        .toISOString()
        .slice(0, 10);

    values.push(
        `('${username}', '${email}', '${password}', '${createdAt}', '${name}', '${lastOnline}', ${age}, '${university}', '${major}', ${batch}, '${relationshipStatus}', '${gender}', '${contact}', '${personalEmail}', '${website}', '${interestedIn}', '${birthDate}')`
    );
}

const insertStatement = `
INSERT INTO \`users\` (\`username\`, \`email\`, \`pass\`, \`created_at\`, \`name\`, \`last_online\`, \`age\`, \`university\`, \`major\`, \`batch\`, \`relationship_status\`, \`gender\`, \`contact\`, \`personal_email\`, \`website\`, \`interested_in\`, \`birth_date\`)
VALUES
${values.join(",\n")};
`;

// Write the SQL insert statement to a file
fs.writeFileSync("insert_users.sql", insertStatement);

console.log("SQL insert statement generated and saved to insert_users.sql");
