const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const result = document.getElementById("result");
const sound = document.getElementById("sound");
const btn = document.getElementById("search-btn");

btn.addEventListener("click", () =>{
    let inpWord = document.getElementById("inp-word").value;
    fetch(`${url}${inpWord}`)
    .then((response) => response.json())
    .then((data) =>{
        console.log(data);
        const audioUrl = data[0].phonetics?.[0]?.audio || "";
        if (audioUrl) {
            sound.setAttribute("src", audioUrl.startsWith("http") ? audioUrl : `https:${audioUrl}`);
        } else {
            sound.setAttribute("src", "");
        }
            // the sound fixing part
            let wordDetails = data[0].meanings.map((meaning) =>{
                return `
                <div class = "details">
                    <p><strong>Type: </strong> ${meaning.partOfSpeech || "N/A"}</p>
                    <p><strong>Definition: </strong> ${meaning.definitions?.[0]?.definition || "N/A"}</p>
                    <p><strong>Example: </strong> ${meaning.definitions?.[0]?.example || "N/A"}</p>
                </div>
            `;
            })
            .join("");
            // set result HTML
        result.innerHTML = `
            <div class="word">
                <h3>${inpWord}</h3>
                <button type="button" onclick="playSound()">
                    <i class="fa fa-volume-up" aria-hidden="true"></i>
                </button>
            </div>
            ${wordDetails}`;
            })
    .catch(() =>{
        result.innerHTML = `<h3 class = "error">Couldn't Find The Word</h3>`
    })
})
function playSound(){
    if(sound.src){
    sound.play();
    }
    else{
        alert("Audio not available for this word");
    }
}