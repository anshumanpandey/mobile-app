export default (profile: {[k: string]: string}) => {

    return profile.emailaddress &&
    profile.mobilenumber &&
    profile.firstname &&
    profile.lastname &&
    profile.mobilecode &&
    profile.add1 &&
    profile.add2 &&
    profile.city &&
    profile.country;
}