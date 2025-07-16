const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const teamImg = document.getElementsByTagName("img")[0];
const teamTitle = document.getElementsByClassName("team-title")[0];
const teamBirthYear = document.getElementsByClassName("team-birth-year")[0];
const teamGround = document.getElementsByClassName("team-ground")[0];
const teamCountry = document.getElementsByClassName("team-country")[0];
const teamWeb = document.getElementsByClassName("team-web")[0];
const teamDescription = document.getElementsByClassName("team-description")[0];
const loader = document.querySelector(".spinner-border");
const teamContainer = document.getElementById("team-container");

const getTeamData = async (teamName) => {
    const response = await fetch(`https://www.thesportsdb.com/api/v1/json/123/searchteams.php?t=${teamName}`);
    return await response.json();
}

searchBtn.addEventListener("click", async () => {
    if (!searchInput.value.trim()) {
        alert("Please enter a team name!");
        return;
    }

    loader.classList.remove("hide"); 
    teamContainer.classList.add("hide"); 

    const result = await getTeamData(searchInput.value.trim());
    loader.classList.add("hide"); 

    const team = result.teams[0];

    teamImg.setAttribute("src", team.strBadge);
    teamTitle.innerHTML = team.strTeam;
    teamBirthYear.innerHTML = team.intFormedYear;
    teamGround.innerHTML = team.strStadium;
    teamCountry.innerHTML = team.strCountry;
    teamWeb.setAttribute("href", `https://${team.strWebsite}`);
    teamWeb.innerHTML = team.strWebsite;
    teamDescription.innerHTML = team.strDescriptionEN
        ? team.strDescriptionEN.substring(0, 200) + "..."
        : "No description available.";

    teamContainer.classList.remove("hide");

    loader.classList.add("hide");

    searchInput.value = "";
});
