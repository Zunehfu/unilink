import fs from "fs";

const values_json = fs.readFileSync("./utils/config/values.json", "utf-8");
const values = JSON.parse(values_json);

export { values, values_json };

/* 

`values.json` is all about static values(values that arn't unique to the user) that appear in `users` table.
-- About user values 

* Email, username, password, university cannot be null in any means.
* Any other value being null means that the user decided to keep that information to themselves.
(or maybe still they haven't updated the profile since signup(still the same thing :D))

*/
