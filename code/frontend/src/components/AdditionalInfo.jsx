export default function AdditionalInfo({ values }) {
    return (
        <div className="flex flex-col items-center">
            <div>{values.member_since}</div>
            <div>{values.university}</div>
            <div>{values.age}</div>
            <div>{values.major}</div>
            <div>{values.batch}</div>
            <div>{values.relationship_Status}</div>
            <div>{values.gender}</div>
            <div>{values.interested_in}</div>
            <div>{values.contact}</div>
            <div>{values.email}</div>
            <div>{values.personal_email}</div>
            <div>{values.website}</div>
            <div>{values.birth_date}</div>
        </div>
    );
}
