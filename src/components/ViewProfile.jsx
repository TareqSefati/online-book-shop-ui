
export default function ViewProfile(props) {
    const {user} = props;
  return (
    <div>
        <h1>view the profile data only show: {user.name}</h1>
        <h1>view the profile data only show: {user.email}</h1>
        <h1>view the profile data only show: {user.address}</h1>
        <h1>view the profile data only show: {user.phoneNumber}</h1>
        <h1>view the profile data only show: {user.photoUrl}</h1>
        <h1>view the profile data only show: {user.isAdmin}</h1>
        <h1>view the profile data only show: {user.isEnabled}</h1>
    </div>
  )
}
