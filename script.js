const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const teamImg = document.getElementsByTagName("img")[0];
const teamTitle = document.getElementsByClassName("team-title")[0];
const teamBirthYear = document.getElementsByClassName("team-birth-year")[0];
const teamGround = document.getElementsByClassName("team-ground")[0];
const teamCountry = document.getElementsByClassName("team-country")[0];
const teamWeb = document.getElementsByClassName("team-web")[0];
const teamDescription = document.getElementsByClassName("team-description")[0];

const getTeamData = async(teamName) => {
    const response = await fetch(`https://www.thesportsdb.com/api/v1/json/123/searchteams.php?t=${teamName}`);
    console.log(response)
    return await response.json();
}

searchBtn.addEventListener("click", async() => {

    if(searchInput){
        document.getElementById("team-container").classList.remove("hide");
    }
    
    const result = await getTeamData(searchInput.value);

    teamImg.setAttribute("src", result.teams[0].strBadge);
    teamTitle.innerHTML = result.teams[0].strTeam;
    teamBirthYear.innerHTML = result.teams[0].intFormedYear;
    teamGround.innerHTML = result.teams[0].strStadium;
    teamCountry.innerHTML = result.teams[0].strCountry;
    teamWeb.setAttribute("href", `https//${result.teams[0].strWebsite}`);
    teamDescription.innerHTML = result.teams[0].strDescriptionEN.substring(0, 200);

    searchInput.value = "";

})