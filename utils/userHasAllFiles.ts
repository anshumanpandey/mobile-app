export default (profile: {[k: string]: string}) => {

    return profile.passday &&
    profile.passimage &&
    profile.passmonth &&
    profile.passyear &&

    profile.selfiurl &&
    
    profile.drday &&
    profile.drimage &&
    profile.drmonth &&
    profile.dryear;
}