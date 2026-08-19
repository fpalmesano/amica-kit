# AMICA — Kit consulente

Tre strumenti web per la rete vendita di AMICA & C. S.R.L. (Gruppo Palmesano),
concessionaria multimarca con sedi a Caserta, Capua, Teverola, Casoria e Napoli.
Si usano in salone, davanti al cliente, su tablet o desktop.

Sito statico puro: HTML, CSS e JavaScript senza dipendenze, senza build, senza framework.
Nessuna chiamata a servizi terzi: font e loghi dei mandati stanno in `assets/`.

Pubblicato su **Cloudflare Workers** come sito di soli asset statici, all'indirizzo
`https://amica-kit.f-palmesano.workers.dev`. Il repository e' collegato con Workers
Builds: ogni commit su `main` ripubblica da solo, senza comando di build. La
configurazione sta in `wrangler.jsonc`, e il campo `name` deve restare identico al
nome del progetto sulla dashboard Cloudflare, altrimenti la build fallisce.

L'accesso e' chiuso con Cloudflare Access su tutto il traffico: si entra con una
email `@gruppopalmesano.it` e un codice usa e getta ricevuto per posta. Se i filtri
antispam aziendali aprono i link in anticipo bruciano il codice, quindi
`noreply@notify.cloudflare.com` va tenuto in allowlist.

---

## File

| File | Ruolo |
|---|---|
| `index.html` | Pagina di ingresso del kit |
| `cosa-conviene.html` | **01** Sette domande qualitative, nessun numero. Consiglia noleggio, leasing, finanziamento o acquisto |
| `simulatore-fiscale.html` | **02** Inquadramento fiscale, confronto delle quattro formule al netto del recupero, Nuova Sabatini, valore residuo, fringe benefit |
| `costi-esercizio.html` | **03** Costo di alimentazione per motorizzazione, sui km e sul percorso reali |
| `parametri.js` | **Norme, prezzi e gamma.** Vedi sotto |
| `assets/` | Font Montserrat e loghi dei mandati, serviti dal repository |
| `LEGGIMI.md` | Istruzioni di pubblicazione e manutenzione |

---

## Regola numero uno: i parametri stanno in `parametri.js`

Norme fiscali, prezzi dei carburanti, costo dell'energia, coefficienti e gamma
sono **tutti** in `parametri.js`. Le pagine lo leggono all'apertura.

**Non riportare mai un valore normativo o di prezzo dentro un file HTML.**
Se serve un parametro nuovo, va aggiunto a `parametri.js` e letto da lì, con
un valore di ripiego inline in caso il file manchi.

Dopo ogni modifica ai parametri vanno aggiornati `VERSIONE`, `AGGIORNATO` e `NOTA`
in testa al file. Compaiono in fondo a ogni pagina e servono a sapere quale
versione sta guardando chi segnala un problema.

Se `parametri.js` non viene caricato, le pagine ripiegano sui valori interni e
mostrano una riga rossa nel piede. È voluto: un guasto silenzioso su numeri
fiscali sarebbe peggio di un avviso visibile.

---

## Design system AMICA

Riferimento: `AMICADesignSystem_be2d1b`, codificato in Claude Design.
Il kit appartiene all'**ambito CLIENTE** (§8.1). Regole vincolanti:

**Palette ammessa, e nessun'altra tinta**
`#000000` `#FFFFFF` `#EB0000` (rosso di marca) `#A90000` (rosso profondo)
e la rampa grigi: `#F7F7F7` `#EFEFEF` `#E2E2E2` `#C9C9C9` `#A3A3A3` `#7A7A7A`
`#555555` `#3A3A3A` `#222222` `#111111`.

**L'ambito cliente non ha colori di stato.** Verde e navy appartengono all'ambito
direzionale (deck e report) e non entrano qui.

**Il rosso di marca non codifica dati.** §7.2.1: non entra mai in un grafico come
codifica di dato, solo come elemento di identità o di interfaccia.

**Tipografia** Solo Montserrat, stack
`"Montserrat","Segoe UI","Helvetica Neue",Arial,sans-serif`.
Nessun corsivo, non esiste il taglio. Il maiuscolo si ottiene con
`text-transform`, mai riscrivendo il contenuto.

**Forma e spazio** Griglia 4px. Raggi 4px badge, 8px standard, 999px pill.
Ombre `0 2px 8px rgba(0,0,0,.10)` a riposo e `0 6px 20px rgba(0,0,0,.16)` in hover
con `translateY(-2px)`. Movimento 120ms e 200ms, curva unica
`cubic-bezier(0.2,0,0,1)`.

**Vietati** trasparenze, blur, glassmorphism, texture, gradienti diversi dai due
di marca, illustrazioni e SVG di soggetti, emoji.

### Estensione dichiarata: palette delle motorizzazioni

Il sistema non ha una palette categoriale multi-serie (lacuna §9.4). Sei colori
**fuori palette**, autorizzati da Francesco Palmesano, definiti come `--x-pw-*`:

| Motorizzazione | Colore | Famiglia |
|---|---|---|
| Elettrica | `#0E7C86` | teal |
| Plug-in Hybrid | `#1D5FA8` | blu |
| Super Hybrid | `#5B4B8A` | indaco |
| Full Hybrid | `#946A2E` | bronzo |
| Mild Hybrid | `#6B4A2F` | terra |
| Benzina | `#1A1A1A` | nero |

Logica: freddi per l'elettrificato, caldi per la combustione, nero per la sola
combustione. **Niente verde e niente rosso**: introdurrebbero una valenza che §7.2
vieta. Tutti i contrasti verificati sopra 4,5:1 col testo assegnato. Il tratteggio
delle linee resta come secondo veicolo del significato (§7.2.3).

Da formalizzare nel design system: oggi vive solo qui.

---

## Registro dei testi

**Non rivolgersi ai consulenti in tono prescrittivo.** Niente "da dire a voce",
"di' sempre", "verifica prima di", "la formula da usare in trattativa è".
I consulenti sono professionisti e non accettano che uno strumento spieghi loro
cosa dire o cosa fare. Le stesse informazioni vanno date in forma neutra e
fattuale, lasciando a loro l'uso.

Italiano sempre. Registro asciutto, niente esclamativi nell'interfaccia di
servizio. **Niente trattini lunghi**: virgola, due punti o frase separata.
Numeri in formato italiano, separatore migliaia `.` e decimale `,`.

---

## Fonti normative, verificate il 18 agosto 2026

- **Art. 164 TUIR** deducibilità: 100% strumentale, 70% uso promiscuo al dipendente
  per almeno 183 giorni, 80% agenti con tetto 25.822,84 €, 20% residuale con tetto
  18.075,99 €. Noleggio: tetto annuo 3.615,20 € (5.164,57 € agenti) sulla sola quota
  di locazione. Ammortamento 25%, primo anno 12,5%. Leasing durata minima 48 mesi.
- **Art. 19-bis1 lett. c DPR 633/72** IVA 40% in uso promiscuo, 100% strumentale,
  agenti e autocarri genuini.
- **Art. 51 c.4 lett. a TUIR**, L. 207/2024 e **D.Lgs. 148/2026** (GU 11/08/2026,
  in vigore dal 12/08/2026): fringe benefit 10% BEV, 20% PHEV, 50% altre, su costo
  ACI per 15.000 km. Maggiorazione **+50% oltre 5 anni** dalla prima immatricolazione,
  **+5%** per optional fuori tabella ACI.
- **Provvedimento AdE 184192 del 06/12/2006** falso autocarro: assimilazione ad
  autovettura solo se ricorrono **tutte e quattro** le condizioni (N1, carrozzeria F0,
  almeno 4 posti, rapporto kW/portata ≥ 180).
- **Nuova Sabatini** (DM 22/04/2022, circolare 410823): contributo pari agli interessi
  su piano convenzionale 5 anni, rate semestrali, al 2,75% ordinario o 3,575% green e 4.0.
  Intensità massima 20% piccole imprese, 10% medie. **La FAQ 6.3 MIMIT rinvia allo
  stesso provvedimento del 2006**: un solo test decide deducibilità e accesso al
  contributo. Km0 esclusi (FAQ 6.14), mera sostituzione esclusa, domanda obbligatoriamente
  precedente alla conferma d'ordine.
- Carburanti: Osservatorio MIMIT, rilevazione 17/08/2026.

---

## Limiti dichiarati, da non rimuovere dalle pagine

- Il costo di esercizio copre la **sola alimentazione**: niente manutenzione,
  pneumatici, assicurazione, bollo, svalutazione.
- Il calcolo fiscale produce **ordini di grandezza**. AMICA non è un intermediario
  fiscale: la posizione del cliente resta di competenza del suo commercialista.
- I coefficienti di percorso urbano e autostradale sono **fattori medi per tecnologia**,
  non valori dichiarati per modello. I dati reali per fase si ricavano dal certificato
  di conformità.
- Lo strumento 01 è un **modello a punteggio**, non un calcolo. I pesi sono tarati sul
  mercato in generale, non sullo storico AMICA.
- I modelli marcati `w:1` in `parametri.js` hanno consumi non ancora riscontrati sui
  listini ufficiali e mostrano l'etichetta rossa.

---

## Aperti

1. **Posti Zero Trust contati.** Il piano gratuito si ferma a 50 utenti ed e' un muro:
   il 51esimo che prova a entrare viene bloccato. In gruppo si e' in 105, quindi il
   perimetro va tenuto sulla rete vendita e sui primi livelli.
2. **Plug-in hybrid con dati parziali.** Autonomia e batteria di Jaecoo 8 e Lepas L8 sono
   reali; il **consumo a batteria scarica è stimato** (6,0 e 6,5 l/100 km) e sul Tonale è
   stimato tutto.
3. **Valore residuo stimato.** Le percentuali per durata (65/52/42/33) sono riferimenti di
   mercato, non curve Eurotax né residui contrattuali AMICA.
4. **Strumento 04 da costruire**: scheda offerta stampabile per il cliente. La
   valutazione permuta, ipotizzata come strumento 05, è stata scartata.

---

## Come lavorare qui

- Working tree pulito prima di delegare modifiche: un `git restore .` deve poter
  annullare tutto.
- Modifiche piccole ai parametri: si tocca solo `parametri.js` e si alza la versione.
- Prima di aprire un file: leggere il commento in testa, contiene le decisioni prese
  e le deroghe dichiarate.
- Verifica minima dopo ogni modifica: aprire le quattro pagine, controllare che la
  riga di versione nel piede sia grigia e non rossa, e che i collegamenti fra gli
  strumenti funzionino.
