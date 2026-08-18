# Kit consulente AMICA — pubblicazione e manutenzione

Versione parametri **1.0** · aggiornati il **18 agosto 2026**

---

## Cosa c'è in questa cartella

| File | Cosa contiene |
|---|---|
| `index.html` | Pagina di ingresso del kit, con i collegamenti agli strumenti |
| `cosa-conviene.html` | Strumento 01 · sette domande, nessun numero |
| `simulatore-fiscale.html` | Strumento 02 · inquadramento, confronto formule, Sabatini, fringe benefit |
| `costi-esercizio.html` | Strumento 03 · costo di alimentazione per motorizzazione |
| `parametri.js` | **Norme, prezzi e gamma. È l'unico file da modificare agli aggiornamenti** |

I quattro HTML sono statici e non richiedono alcun linguaggio lato server. I loghi sono incorporati nei file.

---

## Prima della pubblicazione: due cose mancanti

**1. Font Montserrat.** Le pagine caricano Montserrat da Google Fonts. Il design system AMICA prevede il self-hosting: su rete aziendale filtrata o offline il font non carica e il layout si sposta.

Serve creare la cartella `assets/fonts/` e inserirvi `montserrat-variable-latin.woff2`. La regola `@font-face` è già scritta in ogni pagina e punta a quel percorso. Fatto questo, si può rimuovere la riga `<link href="https://fonts.googleapis.com...">` da tutti e quattro i file.

**2. Loghi dei costruttori.** Le schede modello caricano i loghi dei mandati dal CDN di gruppopalmesano.it. Funziona con la rete disponibile. Per l'uso offline vanno copiati in `assets/logo/marchi/`.

---

## Passo 1 · Verificare la disponibilità di un sottodominio

Il sito istituzionale gira su piattaforma MotorK. Va chiesto al fornitore se è disponibile un sottodominio del tipo `kit.gruppopalmesano.it` su cui caricare file arbitrari.

- **Se sì**, si procede su quello spazio.
- **Se no**, serve uno spazio separato. Cloudflare Pages e Netlify ospitano gratuitamente siti statici di queste dimensioni e si collegano a un sottodominio del dominio esistente cambiando un record DNS.

Il record DNS lo gestisce chi amministra il dominio: è l'unica dipendenza esterna dell'intera operazione.

---

## Passo 2 · Caricare i file

Il contenuto di questa cartella va nella radice dello spazio, mantenendo i nomi. I collegamenti fra le pagine sono relativi e funzionano senza modifiche.

Verifica di corretto caricamento: aprire `index.html` e controllare che in fondo a ogni pagina compaia la riga grigia con la versione dei parametri. Se compare invece la scritta rossa **"Parametri non caricati"**, significa che `parametri.js` non è nella stessa cartella.

---

## Passo 3 · Chiudere l'accesso

Il kit è materiale interno e non va lasciato raggiungibile pubblicamente.

**Cloudflare Access** è la soluzione che si integra con Google Workspace: si configura Google come fornitore di identità e si crea una regola che consente l'accesso ai soli indirizzi del dominio aziendale. Chi apre il link viene rimandato al login Google e rientra sulla pagina.

Il piano gratuito copre un numero limitato di utenti; la soglia va verificata al momento della configurazione perché cambia nel tempo.

**Alternativa più semplice ma più debole:** autenticazione HTTP di base con una password condivisa. Si configura in pochi minuti su qualsiasi hosting, ma la password circola e non è revocabile per singola persona.

---

## Passo 4 · Distribuzione alla rete

Il link si apre da qualsiasi browser. Su tablet e telefono, dal menu del browser, la voce **"Aggiungi a schermata Home"** crea un'icona che apre il kit a schermo intero, come un'applicazione.

---

## Manutenzione: aggiornare i parametri

Tutte le norme, i prezzi e i consumi stanno in `parametri.js`. Per aggiornarli si modifica quel file e lo si ricarica: le pagine restano invariate.

### Alla legge di bilancio

Nella sezione `FISCO` vanno riverificati:

- `tettoAcquisto` e `tettoAcquistoAgente` — tetti di costo art. 164 TUIR
- `tettoNoleggio` e `tettoNoleggioAgente` — tetti annui sui canoni
- `dedResiduale`, `dedDipendente`, `dedAgente` — percentuali di deducibilità
- `fringeBev`, `fringePhev`, `fringeAltro` — percentuali fringe benefit
- `fringeMaggiorazioneOltre5Anni` e `fringeMaggiorazioneOptional` — introdotte dal D.Lgs. 148/2026
- `aliquotaSocieta` e le tre aliquote IRPEF

Nella sezione `SABATINI`: `tassoOrdinario`, `tassoGreen`, `intensitaPiccole`, `intensitaMedie`.

### Quando cambiano i prezzi dei carburanti

Sezione `ENERGIA`: `benzina` e `gasolio`, dall'Osservatorio prezzi MIMIT. Il campo `rilevazione` serve a ricordare la data del dato.

### Quando cambia la gamma

Sezione `GAMMA`. Ogni riga è un modello con le motorizzazioni a listino. I valori `c` sono i consumi di omologazione in ciclo misto: kWh/100 km per l'elettrico, litri/100 km per i carburanti. Il flag `w:1` marca i dati non ancora riscontrati sui listini ufficiali e fa comparire l'etichetta rossa nelle schede.

### Dopo ogni modifica

Aggiornare in testa al file `VERSIONE`, `AGGIORNATO` e `NOTA`. Sono i valori che compaiono in fondo a ogni pagina e permettono di sapere quale versione sta guardando chi segnala un problema.

---

## Cosa il kit non copre

- Il costo di esercizio non comprende manutenzione, pneumatici, assicurazione, bollo e svalutazione.
- Il calcolo fiscale produce ordini di grandezza. AMICA non è un intermediario fiscale: la posizione del singolo cliente resta di competenza del suo commercialista.
- I coefficienti di percorso urbano e autostradale sono fattori medi per tecnologia, non valori dichiarati per modello. I dati reali per fase si ricavano dal certificato di conformità del singolo veicolo.
- Lo strumento 01 è un modello a punteggio, non un calcolo. I pesi sono tarati sul comportamento generale del mercato, non sullo storico AMICA.
