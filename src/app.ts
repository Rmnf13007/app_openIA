const form = document.querySelector<HTMLFormElement>("form")!;
const ageInput = document.querySelector<HTMLInputElement>("#age")!;
const themesInput = document.querySelector<HTMLInputElement>("#themes")!;
const submitButton = document.querySelector<HTMLButtonElement>("button")!;
const footer = document.querySelector<HTMLElement>("footer")!;
const OPENAI_API_KEY = "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"
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

};
const setloadingItems = () => {
footer.textContent = "Chargement de super idee en cours...";
footer.setAttribute("aria-busy", "true");
submitButton.setAttribute("aria-busy", "true");
submitButton.disabled = true;

};

const removeLoadingItems = () => {
     footer.setAttribute("aria-busy", "false");
     submitButton.setAttribute("aria-busy", "false");
     submitButton.disabled = false;
    
};
fetch("https://api.openai.com/v1/completions", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${OPENAI_API_KEY}`
  },
  body: JSON.stringify({
    prompt: gen(
      ageInput.valueAsNumber,
      themesInput.value
    ),
    max_tokens: 250,
    model: "text-davinci-003"
  })
})
  .then(response => {
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
    }
    return response.json();
  })
  .then(data => {
    console.log(data);
    removeLoadingItems();
  })
  .catch(error => {
    console.error("Error fetching data:", error);
    removeLoadingItems();
  });