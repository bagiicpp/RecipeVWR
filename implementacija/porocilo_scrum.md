# Scrum poročilo – Implementacija uporabniške zgodbe
**Kot uporabnik želim prejemati dnevne predloge receptov na podlagi mojih okusov, da lažje načrtujem obroke.**

### Razdelitev dela v skupini

Uporabniško zgodbo smo najprej **analizirali skupaj kot skupina**, kjer smo se pogovorili o možnih pristopih k rešitvi, obsegu funkcionalnosti ter omejitvah trenutne aplikacije. Skupno smo opredelili, kaj v kontekstu aplikacije pomeni uporabnikov »okus« in kako ga je smiselno vključiti v sistem kot osnovo za kasnejše dnevne predloge receptov.

Na podlagi skupne analize smo uporabniško zgodbo razdelili na več manjših nalog, ki so bile jasno definirane in primerne za izvedbo v kratkem času. Naloge smo nato razporedili med člane skupine, pri čemer je vsak član prevzel odgovornost za svoj del implementacije.

---

## Opis izvedene naloge

### Naloga: Priprava backend osnove za generiranje predlogov

V okviru te naloge sem izvedla naslednje korake:

- ugotovila, da sistem še ne podpira shranjevanja uporabniških okusov,
- razširila sem entiteto `Users` z novim atributom `okus`,
- prilagodila sem obrazec za registracijo uporabnika tako, da lahko uporabnik izbere svoj okus preko spustnega seznama (dropdown),
- poskrbela sem, da se izbrani okus shrani v bazo podatkov ob registraciji uporabnika,
- sprememba je bila izvedena brez dodajanja novih REST endpointov, kar omogoča nadaljnji razvoj v naslednjih sprintih.


### Ocena trajanja naloge (Planning Poker)

Trajanje naloge smo ocenili z metodo **Planning Poker**.

- **Ocenjen čas:** 30 minut  
- **Dejanski čas izvedbe:** približno 20 minut  

Naloga je bila zaključena hitreje od ocenjenega časa, saj je bila omejena na pripravo osnovnih podatkovnih struktur brez dodatne poslovne logike.

---

# DODAJTE TUKA ZA VASITE OPIS IZVADENE NALOGE


## Spremljanje napredka (Scrum tabla)

Napredek naloge je bil spremljan preko agilne Scrum table v GitHub Projects. Naloga je bila premaknjena skozi naslednje faze:

To Do → Doing → Done

Vsaka sprememba je bila sproti dokumentirana.
