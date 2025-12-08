<h1 align="center">RecipeVWR</h1>
<p align="center">
  Odkrij, organiziraj in deli svoje najljubše recepte z lahkoto.
</p>

<p align="center">
  <a href="https://react.dev/"><img src="https://img.shields.io/badge/-React-61DAFB?logo=react&logoColor=white" /></a>
  <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/-TypeScript-3178C6?logo=typescript&logoColor=white" /></a>
  <a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/-Tailwind_CSS-38B2AC?logo=tailwindcss&logoColor=white" /></a>
  <a href="https://vitejs.dev/"><img src="https://img.shields.io/badge/-Vite-646CFF?logo=vite&logoColor=white" /></a>
  <a href="https://bun.sh/"><img src="https://img.shields.io/badge/-Bun-000000?logo=bun&logoColor=white" /></a>
  <a href="https://spring.io/projects/spring-boot"><img src="https://img.shields.io/badge/-SpringBoot-6DB33F?logo=springboot&logoColor=white" /></a>
  <a href="https://www.docker.com/"><img src="https://img.shields.io/badge/-Docker-2496ED?logo=docker&logoColor=white" /></a>
  <a href="https://www.postgresql.org/"><img src="https://img.shields.io/badge/-PostgreSQL-4169E1?logo=postgresql&logoColor=white" /></a>
  <a href="https://www.java.com/"><img src="https://img.shields.io/badge/-Java-007396?logo=java&logoColor=white" /></a>
  <a href="https://maven.apache.org/"><img src="https://img.shields.io/badge/-Maven-C71A36?logo=apachemaven&logoColor=white" /></a>
  <a href="https://git-scm.com/"><img src="https://img.shields.io/badge/-Git-F05032?logo=git&logoColor=white" /></a>
</p>

## 📝 Opis

RecipeVWR je moderna spletna aplikacija, zgrajena z Reactom in TypeScriptom, zasnovana za enostavno odkrivanje, organiziranje in deljenje najljubših receptov. Trenutno je še v razvoju in osredotočena na zagotavljanje zanesljivega testiranja, dolgoročno pa želi ponuditi brezhibno uporabniško izkušnjo z možnostmi iskanja receptov, ustvarjanja osebnih kuharskih knjig ter dodajanja lastnih kulinaričnih stvaritev v skupnost.

## Vizija

Aplikacija uporabnikom omogoča dodajanje receptov, brskanje po obstoječih ter enostavno iskanje med različnimi kategorijami. S preprostim dizajnom aplikacija pomaga hitro najti ideje za pripravo obrokov. Namen je poenostaviti iskanje, omogočiti deljenje znanja ter ustvariti prijeten prostor za izmenjavo receptov.

## 🛠️ Tehnološki sklad

### **Frontend**

| Tehnologija | Verzija | Namen                         |
| ----------- | ------- | ----------------------------- |
| React       | 19.1.1  | UI knjižnica                  |
| TypeScript  | 5.x     | Statično tipiziran JavaScript |
| Tailwind CSS| 4.1.14  | Utility-first CSS              |
| Vite        | 4.x     | Gradnja & razvojni strežnik    |
| Bun         | Latest  | Upravljalnik paketov & runtime |

### **Backend**

| Tehnologija     | Verzija | Namen                         |
| ---------------- | ------- | ----------------------------- |
| Spring Boot      | 3.5.6   | REST API ogrodje              |
| Java             | 17      | Backend jezik                 |
| Spring Data JPA  | 3.x     | Dostop do podatkov            |
| Maven            | 3.x     | Upravljanje odvisnosti        |
| Lombok           | 1.18.x  | Odprava boilerplate kode      |
| Docker           | Latest  | Kontejnerizacija              |

### **Baza**

| Tehnologija | Verzija | Namen             |
| ----------- | ------- | ----------------- |
| PostgreSQL  | 15.x    | Relacijska baza   |
| Port        | 5432    | Povezava z bazo   |

### **Razvojna orodja**

| Orodje          | Verzija | Namen                             |
| --------------- | ------- | ---------------------------------- |
| Docker Compose  | 3.9     | Upravljanje več kontejnerjev       |
| Git             | Latest  | Kontrola verzij                    |

## 🖋️ Kodni standardi & odločitve

### **Kodni standardi – Frontend**

- Komponente v `PascalCase`, spremenljivke v `camelCase`
- TypeScript strict mode
- Konsistentna uporaba Tailwind razredov
- Pred commitom poganjati `eslint --fix` in `prettier`

### **Backend**

- `PascalCase` za razrede, `camelCase` za spremenljivke
- Razdelitev na **Controller → Service → Repository**
- Dosledna uporaba anotacij (`@RestController`, `@Service`, …)
- Build/test z `mvn clean install`

### **Splošno**

- Conventional Commits (`feat:`, `fix:`, `docs:` …)
- Koda mora biti berljiva, testirana, vzdrževana

### **Odločitve o orodjih**

- **Bun** za hitrejše nameščanje paketov
- **Tailwind** za hitro izdelavo UI brez prekomerne CSS kode
- **Vite** za hiter development
- **Spring Boot** za stabilni REST backend

## 📦 Ključne odvisnosti

```
@gsap/react: ^2.1.2
@heroicons/react: ^2.2.0
@tailwindcss/vite: ^4.1.14
axios: ^1.12.2
gsap: ^3.13.0
react: ^19.1.1
react-dom: ^19.1.1
sonner: ^2.0.7
tailwindcss: ^4.1.14
```

## 🚀 Ukazi za zagon

- **dev**: `npm run dev`
- **build**: `npm run build`
- **lint**: `npm run lint`
- **preview**: `npm run preview`

## 📁 Struktura projekta

```



.
├── ris-backend
│   ├── .mvn
│   │   └── wrapper
│   │       └── maven-wrapper.properties
│   ├── mvnw
│   ├── mvnw.cmd
│   ├── pom.xml
│   └── src
│       ├── main
│       │   ├── java
│       │   │   └── um
│       │   │       └── feri
│       │   │           └── si
│       │   │               └── ris_backend
│       │   │                   ├── RisBackendApplication.java
│       │   │                   ├── controller
│       │   │                   │   └── RecipeRestController.java
│       │   │                   ├── model
│       │   │                   │   └── Recipe.java
│       │   │                   │   └── RecipeRepository.java
│       │   │                   └── service
│       │   │                       └── RecipeService.java
│       │   └── resources
│       │       └── application.properties
│       └── test
│           └── java
│               └── um
│                   └── feri
│                       └── si
│                           └── ris_backend
│                               └── RisBackendApplicationTests.java
└── ris-frontend
    ├── bun.lock
    ├── eslint.config.js
    ├── index.html
    ├── package.json
    ├── public
    │   └── vite.svg
    ├── src
    │   ├── App.tsx
    │   ├── assets
    │   │   └── react.svg
    │   ├── components
    │   │   ├── AddRecipeForm.tsx
    │   │   ├── CategoryToggle.tsx
    │   │   ├── EditRecipeForm.tsx
    │   │   ├── Header.tsx
    │   │   ├── RecipeCard.tsx
    │   │   └── RecipeDash.tsx
    │   ├── index.css
    │   └── main.tsx
    ├── tsconfig.app.json
    ├── tsconfig.json
    ├── tsconfig.node.json
    └── vite.config.ts
```

## Slovar pojmov

| Termin                | Opis                                                                                       |
| --------------------- | ------------------------------------------------------------------------------------------- |
| **Recipe (Recept)**   | Zbirka sestavin, navodil, slike, vrste jedi itd.                                            |
| **Ingredients**       | Sestavine z merilnimi enotami                                                               |
| **Instructions**      | Navodila za pripravo jedi                                                                   |
| **Units**             | Merilne enote (ml, g, žlica, …)                                                             |
| **Dish Types**        | Vrste jedi — glavne jedi, sladice, pečene jedi …                                            |
| **Login**             | Postopek prijave registriranega uporabnika                                                  |
| **Registered User**   | Uporabnik z ustvarjenim računom                                                             |
| **Unregistered User** | Lahko brska, ne more dodajati/urejati                                                       |
| **Adding**            | Dodajanje receptov z naslovom, sliko, navodili, sestavinami …                               |
| **Editing**           | Urejanje lastnih receptov                                                                   |
| **Sorting**           | Razvrščanje po abecedi ali tipu jedi                                                        |
| **Favorite Recipes**  | Priljubljeni recepti registriranega uporabnika                                              |
| **Application Usage** | Vsa dejanja v aplikaciji: brskanje, dodajanje, brisanje, urejanje                            |

## DPU

![My Diagram](DPU.png)

## 🛠️ Razvojno okolje

### Node.js / JavaScript

1. Namesti Node.js (18+)
2. Namesti odvisnosti:
   - `npm install` ali **`bun install`**
3. Zaženi razvojni strežnik:
   - `npm run dev` ali `bun run dev`

## 👥 Prispevanje

1. Forkaj repozitorij  
2. Kloniraj: `git clone https://github.com/bagiicpp/RecipeVWR.git`  
3. Ustvari vejo: `git checkout -b feature/ime-funkcionalnosti`  
4. Commit: `git commit -am 'Dodana nova funkcionalnost'`  
5. Push: `git push origin feature/ime-funkcionalnosti`  
6. Odpri pull request  

Prosimo, da koda sledi smernicam projekta in vključuje teste, kjer je to smiselno.

#📘 1. Pregled podrobnosti recepta

Opis funkcionalnosti
Dodana je nova stran /recipe/:id, kjer si uporabnik lahko ogleda vse podrobnosti recepta, vključno z nazivom, opisom, kategorijo, datumom nastanka, ocenami in komentarji.
Na kartici recepta je dodana tudi ikona Eye, ki omogoča takojšen dostop do podrobnosti.

Kako deluje
Ob kliku na gumb See Details ali na ikono Eye aplikacija preko React Routerja odpre novo stran in iz backend API-ja pridobi podatke o receptu.

Kako preizkusiti
Zaženi frontend (npm run dev).
V seznamu receptov klikni ikono Eye.
Odpre se stran:
http://localhost:5173/recipe/ID

#⭐ 2. Ocenjevanje receptov

Opis funkcionalnosti
Uporabnik lahko odda oceno receptu (od 1 do 5). Sistem izračuna povprečno oceno in jo prikaže na strani podrobnosti.
Kako deluje
Ocena se pošlje backendu preko POST zahteve.
Backend shrani oceno in posodobi povprečje.
Povprečna ocena je prikazana v uporabniškem vmesniku.

Kako preizkusiti
Odpri podrobnosti recepta.
Klikni Rate Recipe.
Izberi oceno 1–5.
Povprečna ocena se posodobi v realnem času.

#💬 3. Komentarji na recept

Opis funkcionalnosti
Uporabniki lahko dodajajo komentarje z besedilom in datumom. Komentarji se prikažejo pod receptom.

Kako deluje
Komentar se shrani v bazo kot del recepta.
Vmesnik osveži seznam komentarjev in jih prikaže kronološko.

Kako preizkusiti
Odpri podrobnosti recepta.
Pomakni se do sekcije Comments.
Vnesi komentar in potrdi.
Komentar se prikaže takoj v seznamu.

#🔐 4. Prijava in registracija uporabnikov

Opis funkcionalnosti
Uporabnik lahko ustvari račun in se prijavi. Prijavljen uporabnik pridobi dostop do dodatnih funkcionalnosti (npr. ocenjevanje, komentiranje, urejanje lastnih receptov).

Kako deluje
Registracija ustvari novega uporabnika v bazi.
Prijava shrani uporabniško ime v localStorage.
Aplikacija prepozna prijavljenega uporabnika in mu omogoči dodatne akcije.

Kako preizkusiti
Registracija:
http://localhost:5173/register
Prijava:
http://localhost:5173/login
Po prijavi lahko uporabnik ocenjuje, komentira in ureja svoje recepte.


