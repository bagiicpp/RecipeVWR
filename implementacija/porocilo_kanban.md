# Poročilo Kanban – Dnevni vnos kalorij in delo s sestavinami

## Namen naloge
V okviru te vaje smo uporabili metodo **Kanban** za razvoj nove funkcionalnosti v aplikaciji **RecipeVWR (Spletna stran z recepti)**.  
Cilj izbrane funkcionalnosti je bil omogočiti:
- označevanje pojedenega obroka,
- izračun kalorij na podlagi sestavin recepta,
- prikaz **dnevnega vnosa kalorij** v uporabniškem vmesniku.

---

## Kanban tabla
Kanban tabla vsebuje naslednje stolpce:
- **Backlog** – naloge, ki so bile identificirane, a še niso bile obravnavane
- **To Do** – naloge, pripravljene za prevzem
- **In Progress** – naloge v aktivni obdelavi
- **Done** – zaključene naloge

### WIP omejitev
Za stolpec **In Progress** smo določili **WIP omejitev: največ 3 nalogi hkrati**.  
Za stolpec **To Do** smo določili **WIP omejitev: največ 5 nalogi hkrati**.

---

## Razdelitev funkcionalnosti na naloge
Funkcionalnost smo razdelili na več **manjših, jasno definiranih nalog**, ki so bile ocenjene s točkami in označene s prioritetami (**P0 – visoka, P1 – srednja, P2 – nizka**).

Primeri nalog:
- priprava podatkovnega modela za sestavine in njihove kalorije,
- izračun kalorične vrednosti recepta na podlagi sestavin,
- dodajanje gumba za označevanje pojedenega obroka,
- shranjevanje dnevnega vnosa kalorij na strani uporabnika,
- prikaz dnevnega vnosa kalorij v uporabniškem vmesniku.

Naloge so bile sproti premikane med stolpci Kanban table glede na trenutno stanje (analiza, implementacija, zaključek).

---

## Vloga Product Ownerja
Vlogo **Product Ownerja** je prevzel **Blagoja Vasilev**.


---

## Spremljanje napredka in prilagoditve
Napredek smo redno spremljali preko Kanban table.  
Vsi člani ekipe so sodelovali pri:
- analizi nalog,
- razdelitvi funkcionalnosti,
- ocenjevanju nalog (planning poker),
- dogovarjanju o prioritetah.

Na podlagi časovnih omejitev smo se osredotočili na **jedrno funkcionalnost**, preostale naloge pa smo pustili dokumentirane za nadaljnje iteracije.
