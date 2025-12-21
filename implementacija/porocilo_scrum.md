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

### Naloga: Priprava REST endpointa za dnevne predloge

V okviru te naloge sem izvedel naslednje korake:

- ugotovil sem, da sistem še ne podpira shranjevanja okusa receptov,
- razširil sem backend entiteto **Recipe** z novim atributom *okus* (taste),
- dodal sem podporo za vnos okusa recepta v **frontend obrazec za dodajanje recepta** z uporabo spustnega seznama (dropdown),
- poskrbel sem, da se izbrani okus recepta ob dodajanju pravilno pošlje na backend in shrani v bazo podatkov,
- implementiral sem REST endpoint za **pridobivanje receptov glede na okus**, ki omogoča filtriranje receptov,
- spremembe so bile izvedene brez večjih posegov v obstoječo arhitekturo, kar omogoča nadaljnjo nadgradnjo funkcionalnosti v naslednjih sprintih.

### Ocena trajanja naloge (Planning Poker)

Trajanje naloge smo ocenili z metodo **Planning Poker**.

- **Ocenjen čas:** 40 minut  
- **Dejanski čas izvedbe:** približno 25 minut  

Naloga je bila zaključena hitreje od ocenjenega časa, saj je šlo predvsem za razširitev obstoječih podatkovnih struktur ter manjše prilagoditve frontend obrazca in REST vmesnika brez dodatne kompleksne poslovne logike.

### Naloga: Frontend prikaz dnevnih prdlaganih receptov

V okviru te naloge sem izvedel naslednje korake:

-pregledal sem obstoječo frontend strukturo za prikaz receptov v komponenti RecipeDash,
-dodal sem interaktivni toast ob uspešno dodanem receptu, ki uporabnika ob kliku vodi na podrobnosti recepta,
-poskrbel sem, da se recepti, ki so trenutno v bazi, dinamično prikažejo v mreži (grid) s pomočjo komponente RecipeCard,
-omogočil sem filtriranje receptov po okusu (taste) s spustnim seznamom, ki po izbiri osveži prikaz receptov,
-vključil sem posamezne useEffect hook-e za ločeno upravljanje z fetchanjem receptov in prikazom toastov,
-spremembe so bile izvedene tako, da ohranjajo obstoječo arhitekturo in omogočajo nadaljnjo nadgradnjo, npr. dodajanje novih filtrov ali integracijo z dnevnim predlogom.

### Ocena trajanja naloge (Planning Poker)

- **Ocenjen čas:** 45 minut
- **Dejanski čas izvedbe:** približno 25 minut

Naloga je bila zaključena nekoliko hitreje, saj je šlo predvsem za prilagoditev obstoječih komponent in dodajanje toast funkcionalnosti, brez kompleksnih sprememb backend logike.




