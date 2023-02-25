const form = document.querySelector<HTMLFormElement>("form")!;
const ageInput = document.querySelector<HTMLInputElement>("#age")!;
const themesInput = document.querySelector<HTMLInputElement>("#themes")!;
const submitButton = document.querySelector<HTMLButtonElement>("button")!;
const footer = document.querySelector<HTMLElement>("footer")!;

/**
 * transformer 35 et "lego,jeux video
 * en
 * "propose moi 5 idees de cadeaux pour un 35 ans qui aime lego et jeux video!"
 */

const gen =(age: number, theme = "") => {

let prompt = `Propose moi 5 idées de cadeaux pour une personne age de ${age} !`;

if(theme.trim()){
    prompt += ` qui aime ${theme}`;
    
}return prompt + " !";

}
const setloading = () => {
footer.textContent = "Chargement de superidee en cours...";
footer.setAttribute("aria-busy", "true");
submitButton.setAttribute("aria-busy", "true");
submitButton.disabled = true;

};

const removeLoading = () => {
     footer.setAttribute("aria-busy", "false");
     submitButton.setAttribute("aria-busy", "false");
     submitButton.disabled = false;
    
};

form.addEventListener("submit", (e: SubmitEvent) => {
    e.preventDefault();
    setloading();
});

//apele lapi en lui passant une question
fetch('https://api.openai.com/v1/completions', {
    method: 'POST',
    headers: {
        "Content-Type": "application/json",
        Authorization: 'Bearer ${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}',
    },
    body: JSON.stringify({
        prompt: gen(
            ageInput.valueAsNumber, 
            themesInput.value
        ),
        max_tokens: 250,
        model: "text-davinci-003",
    }),
})

.then((response) => response.json())
.then(data => console.log(data))

    

