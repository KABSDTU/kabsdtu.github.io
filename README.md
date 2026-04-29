# Hjemmeside
*Taget fra studiestartswikien*
## Kort beskrivelse

Overordnet står man for kodning, opsætning og vedligeholdelse af KABS' online medier: Hjemmesiden og wiki. HverveKABS og PR-KABS kan stå for indholdet, det kan være en god idé at sidde i PR selv dog.

Denne ansvarspost kræver viden om servere og kodning til hjemmesider: generelt HTML og CSS.

## Hjemmesiden
### Indhold og design

* Hjemmesiden anvendes til at informere vektor- og hyttebumsaspiranter om, hvad deres rolle er i studiestarten. Specielt i perioder op til vektor- og hyttebumsvalg, har hjemmesiden førhen været brugt til at ansøge fra, så ansøgningerne automatisk sendes direkte til KABS-mailen. Det er oplagt at oplyse om datoer såsom Hej-vektor-fest, OPtur, forberedelsestur, uddannelsesdag m.m. Desuden er det en god ide at have lidt oplysninger om hver enkelt KABS, da I er så mange.
* Hjemmesiden skal være klar op til starten af vektoransøgningsperioden og lanceringen af jeres tema.
* Folk læser mere på siden, hvis der er indbyrdes links mellem siderne. For eksempel så der på siden om en KABS er et link til “næste” KABS.
* Fedt at have badekar- og læskebestilling foregå på hjemmesiden.

### Anbefalinger

 * Arbejd sammen med hverve/PR KABS om indholdet til hjemmesiden og få dem til at skrive så meget som muligt.
 * Hjemmesiden mister en del relevans efter ansøgningsperioden. Overvej om den kan blive mere brugbar. I 2020 tilføjede vi Badekar og læske som en underside.
 * Brug KABS github til at hoste hjemmesiden.
 * Prøv først af med at lave hjemmeside til jeres falske tema (f.eks. salsa i 20). Det er en god måde at afprøve hvordan det fungerer.
 * Tænk over design så snart i har et tema. Der skal vælges en generel farve til siden og billeder til de fleste sider.
 * Det er en god idé at have et par forskellige designs klar som resten af KABS kan vælge imellem.

### Opsætning

 * blivawesome.dk og blivvektor.dk er begge sat til at pege på Github Pages: https://github.com/KABSDTU/kabsdtu.github.io.
 * Kig i dokumentationen hvis du er i tvivl omkring hvordan man bruger Github Pages.
 * Spørg den tidligere hjemmesideKABS omkring adgang til kabsdtu github gruppen.
 * Hjemmesiden er baseret på Jekyll templates

### Gode råd

 * Man kan godt være flere om at lave design til hjemmesiden; specielt hvis man er flere der kan HTML og CSS.
 * Hvis ingen kan design, så tag kontakt til gamle KABS årgange.
 * Lav masser af links mellem siderne. Folk klikker på dem og læser mere.
 * Gør det tydeligt, hvor man ansøger.
 * Det giver et godt indtryk at designet er lækkert.
 * Gør det så nemt, som muligt at ændre siden og uploade en ny udgave.
 * Få 100 % styr på datoerne før de kommer op på hjemmesiden.
 * Det tager en god time før hele hjemmesiden er opdateret, så gør det i god tid.


### Guide til at komme i gang.
 Se denne guide for at komme i gang med de nyeste vejledninger.
 https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/testing-your-github-pages-site-locally-with-jekyll 

#### Windows
 1. Installer Git og Ruby
 2. Åben en terminal (CMD) og indtast ```console gem install jekyll bundler```
 3. Indtast i samme terminal ```console gem install wdm```
 4. Indtast i samme terminal ```console gem install webrick```
 5. Hent nu dette repository, ved at indtaste ```console git clone "indsæt link til dette repository"``` eller brug en git client til det samme.
 6. Du kan nu starte jekyll serveren, ved at stå i mappen og indtaste ```jekyll serve``` i en terminal.

 #### Linux (Ubuntu / Debian)
 * Check at jekyll er installeret ved ```console jekyll -v```  ellers brug ```console sudo apt-get install jekyll```
 * Du kan nu køre serveren med ```console jekyll serve```.