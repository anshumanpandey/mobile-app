export default (profile: {[k: string]: string}): boolean => {

    return profile.emailaddress !== null && profile.emailaddress !== undefined && profile.emailaddress !== "" &&
    profile.mobilenumber !== null && profile.mobilenumber !== undefined && profile.mobilenumber !== "" &&
    profile.firstname !== null && profile.firstname !== undefined && profile.firstname !== "" &&
    profile.lastname !== null && profile.lastname !== undefined && profile.lastname !== "" &&
    profile.mobilecode !== null && profile.mobilecode !== undefined && profile.mobilecode !== "" &&
    profile.add1 !== null && profile.add1 !== undefined && profile.add1 !== "" &&
    profile.add2 !== null && profile.add2 !== undefined && profile.add2 !== "" &&
    profile.city !== null && profile.city !== undefined && profile.city !== "" &&
    profile.country !== null && profile.country !== undefined && profile.country !== "";
}