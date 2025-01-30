import { generatePalette, isHexColor , hexToCSSHSL} from "./modules/utils";
import { Color } from "./modules/Colors";
import * as convert from "color-convert";
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css'; 

const notyf = new Notyf();
const form = document.querySelector("form");
const displayColors = (input, palette) => {
  // Efface tout le contenu de l'élément <main>
  colorContainer.innerHTML = "";

  // Cherche l'élément header dans le DOM
  const header = document.querySelector("header");
  // Ajoute la classe "minimized" au header
  header.classList.add("minimized");

  // Reçoit l'input du formulaire, et modifie la variable css "--shadow-color"
  // avec ce qui sort de la fonction hexToCSSHSL.
  document.documentElement.style.setProperty(
    "--shadow-color",
    hexToCSSHSL(input)
  );

  // Crée un tableau avec les index de la palette que nous souhaitons
  // transformer en hex pour le dégradé. On le map ensuite de telle sorte
  // à recevoir en retour les valeur hex pour chaque couleur de la palette
  // à l'index du tableau de départ. On ajoute également un "#" au début
  // des chaînes de caractère.
  const gradientColors = [
    0,
    Math.round(palette.length / 2),
    palette.length - 1
  ].map((index) => `#${convert.hsl.hex(palette[index])}`);

  // Utilise les valeurs du tableau gradientColors pour modifier le dégradé.
  document.body.style.background = `linear-gradient(-45deg, ${gradientColors.join(
    ","
  )}`;

  // Redéfinis background-size
  document.body.style.backgroundSize = `400% 400%`;

  // Prend chaque élément dans le tableau palette, instancie une classe avec
  // ses données et appelle la méthode display() dessus.
  palette.map((c) => new Color(c).display(colorContainer));
};

const handleForm = (e) => {
    e.preventDefault();
    try {
        const inputValue = e.target.firstElementChild.value
        if (!isHexColor(inputValue)) {
            throw new Error(`${inputValue} is not a valid Hexadecimal color`);
        }
        console.log("User input is valid!");

        const palette = generatePalette(inputValue);
        console.log(inputValue, palette);
        displayColors(inputValue,palette);

    } catch (err) {
      notyf.error(err.message);
    }
}
    form.addEventListener("submit", handleForm);

  
// const displayColors= (colors)=>{

// colors.forEach(color => {
//     const color = new Color(color);
//     color.display(document.querySelector("main"));
// });
// }
// Cherche l'élément <main> dans le DOM

const colorContainer = document.querySelector("main");
const handleClick =  async (e) => {
  const color = e.target.closest(".color").dataset.color;
  await navigator.clipboard.writeText(color);
  notyf.success(`copied ${color} to clipboard`);
} 

colorContainer.addEventListener("click", handleClick)
 

