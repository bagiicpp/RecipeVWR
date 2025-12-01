![My Diagram](ClassDiagram.png)
# Razlaga Class Diagrama

## Pregled sistema

Ta class diagram prikazuje sistem za upravljanje receptov s tremi glavnimi uporabniškimi vmesniki in več povezanimi entitetami.

## Glavne komponente

### Uporabniki

**Registriran uporabnik (Registered User)**
- Ima polne pravice v sistemu
- Lahko ustvarja, ureja in briše svoje recepte
- Lahko dodaja komentarje in ocene
- Lahko dodaja recepte med priljubljene
- Lahko naloži svojo profilno sliko

**Neregistriran uporabnik (Unregistered User)**
- Ima omejene pravice
- Lahko brska po receptih glede na kategorijo
- Lahko išče recepte
- Lahko si ustvari profil

### Recepti (Recipe)

Vsak recept vsebuje:
- Ime, opis in kategorijo
- Datum objave
- Sliko
- Lastnika (registriranega uporabnika)
- Seznam komentarjev in ocen

### Kategorije

Sistem pozna štiri kategorije receptov:
- BREAKFAST (zajtrk)
- LUNCH (kosilo)
- DINNER (večerja)
- SNACK (prigrizek)

### Dodatne funkcionalnosti

**Komentarji (Comment)**
- Uporabniki lahko komentirajo recepte
- Vsak komentar ima opis in datum

**Ocene (Rating)**
- Uporabniki lahko ocenjujejo recepte
- Vsaka ocena vsebuje številčno vrednost in datum

**Priljubljeni recepti (Favorite Recipe)**
- Uporabniki lahko označijo recepte kot priljubljene
- Povezava med uporabnikom in receptom

### Nadzorne plošče (Dashboards)

**Recipe Dashboard** - omogoča:
- Pregled vseh receptov
- Filtriranje po kategorijah
- Iskanje receptov

**Favorite Recipes Dashboard** - omogoča:
- Pregled priljubljenih receptov uporabnika

## Relacije

- En recept lahko ima več komentarjev in ocen
- En uporabnik lahko ima več receptov, komentarjev in ocen
- En recept lahko je priljubljen pri več uporabnikih
