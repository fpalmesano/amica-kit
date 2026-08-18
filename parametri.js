/* ============================================================================
   AMICA - Kit consulente
   PARAMETRI CENTRALIZZATI
   ----------------------------------------------------------------------------
   Questo e' l'UNICO file da modificare quando cambiano norme, prezzi o gamma.
   Gli strumenti lo leggono all'apertura. Non serve toccare le pagine.

   Dopo ogni modifica: aggiornare VERSIONE e AGGIORNATO qui sotto, e ricaricare
   il file sull'hosting. La riga di versione compare in fondo a ogni strumento.

   Se questo file manca o e' malformato, gli strumenti ripiegano sui valori
   interni e mostrano "parametri non caricati" nel piede pagina.
   ============================================================================ */

var AMICA_PARAMETRI = {

  VERSIONE:  "1.0",
  AGGIORNATO:"18 agosto 2026",
  NOTA:      "D.Lgs. 148/2026 recepito. Carburanti MIMIT 17/08/2026.",

  /* ------------------------------------------------------------------ FISCO */
  FISCO: {
    iva: 0.22,

    /* art. 164 TUIR - tetti di costo fiscalmente riconosciuto */
    tettoAcquisto:      18075.99,   /* generalita' dei contribuenti */
    tettoAcquistoAgente:25822.84,   /* agenti e rappresentanti */
    tettoNoleggio:       3615.20,   /* annuo, quota locazione */
    tettoNoleggioAgente: 5164.57,

    /* percentuali di deducibilita' */
    dedStrumentale: 1.00,
    dedDipendente:  0.70,
    dedAgente:      0.80,
    dedResiduale:   0.20,

    /* art. 19-bis1 DPR 633/72 - detraibilita' IVA */
    ivaDetrPiena:   1.00,
    ivaDetrRidotta: 0.40,

    /* ammortamento: coefficiente 25%, primo anno dimezzato */
    ammortamento: [0.125, 0.25, 0.25, 0.25, 0.125],
    leasingDurataMinimaMesi: 48,

    /* art. 51 c.4 lett. a TUIR - fringe benefit, come da L.207/2024 */
    fringeBev:   0.10,
    fringePhev:  0.20,
    fringeAltro: 0.50,
    fringeKmConvenzionali: 15000,
    /* D.Lgs. 148/2026, in vigore dal 12 agosto 2026 */
    fringeMaggiorazioneOltre5Anni: 1.50,
    fringeMaggiorazioneOptional:   1.05,
    contributiDipendente: 0.0919,
    sogliaEsenzione:            1000,
    sogliaEsenzioneConFigli:    2000,

    /* provvedimento AdE 184192 del 6 dicembre 2006 */
    sogliaFalsoAutocarro: 180,

    /* aliquote per il calcolo del risparmio */
    aliquotaSocieta: 0.279,   /* IRES 24% + IRAP 3,9% */
    aliquotaIrpef1:  0.23,
    aliquotaIrpef2:  0.35,
    aliquotaIrpef3:  0.43
  },

  /* --------------------------------------------------------------- SABATINI */
  SABATINI: {
    tassoOrdinario: 0.0275,
    tassoGreen:     0.03575,
    tasso40:        0.03575,
    ratePerAnno: 2,
    durataAnni:  5,
    intensitaPiccole: 0.20,
    intensitaMedie:   0.10,
    finanziamentoMassimo: 4000000
  },

  /* ------------------------------------------------------------- CARBURANTI */
  /* Osservatorio prezzi MIMIT, self service rete stradale ordinaria */
  ENERGIA: {
    benzina: 1.992,
    gasolio: 2.093,
    rilevazione: "17 agosto 2026",

    /* costo marginale di una fornitura domestica, al netto della quota fissa */
    energiaCasa:     0.229433,
    energiaPubblicaAC: 0.45,
    energiaPubblicaDC: 0.79
  },

  /* ----------------------------------------------------------- FINANZIARIE */
  /* Ipotesi usate per stimare canoni e interessi quando manca il preventivo */
  FINANZIARIE: {
    tanDefault: 6.9,
    riscattoLeasingPct: 15,
    quotaServiziNoleggioPct: 30,
    /* valore di mercato residuo per durata del contratto */
    residuo: {24:65, 36:52, 48:42, 60:33}
  },

  /* ------------------------------------------------- COEFFICIENTI DI FASE */
  /* Applicati al consumo di omologazione in ciclo misto.
     NON sono valori dichiarati per modello: fattori medi per tecnologia.
     Da sostituire con i valori per fase del certificato di conformita'. */
  FASI: {
    bev:  {urb:0.82, aut:1.38},
    phev: {urb:0.86, aut:1.26},
    shs:  {urb:0.86, aut:1.26},
    hev:  {urb:0.88, aut:1.25},
    mhev: {urb:1.15, aut:1.15},
    benz: {urb:1.30, aut:1.20}
  },

  /* -------------------------------------------------------------- GAMMA */
  /* c  = consumo di omologazione ciclo misto
          kWh/100 km per bev, l/100 km per le motorizzazioni a carburante
     phev: r = autonomia elettrica WLTP in km
           ce = consumo in modalita' elettrica, kWh/100 km
           c  = consumo a batteria scarica, l/100 km
     w  = 1 se il dato non e' ancora riscontrato sul listino ufficiale       */
  GAMMA: [
   {b:"Fiat",        m:"500",              pw:{bev:{c:14.3}, mhev:{c:5.1}}},
   {b:"Fiat",        m:"Grande Panda",     pw:{bev:{c:16.4}, mhev:{c:5.0}, benz:{c:5.7}}},
   {b:"Fiat",        m:"600",              pw:{bev:{c:15.8}, mhev:{c:5.3}}},
   {b:"Abarth",      m:"500",              pw:{bev:{c:18.5}}},
   {b:"Abarth",      m:"600",              pw:{bev:{c:17.6}}},
   {b:"Lancia",      m:"Ypsilon",          pw:{bev:{c:14.3}, mhev:{c:5.0}}},
   {b:"Lancia",      m:"Ypsilon HF",       pw:{bev:{c:16.2}}},
   {b:"Alfa Romeo",  m:"Junior",           pw:{bev:{c:14.7}, mhev:{c:4.9}}},
   {b:"Alfa Romeo",  m:"Junior Veloce",    pw:{bev:{c:15.8}}},
   {b:"Alfa Romeo",  m:"Tonale",           pw:{mhev:{c:5.6}, phev:{r:82, ce:20.5, c:6.9}}, w:1},
   {b:"Jeep",        m:"Avenger",          pw:{bev:{c:15.4}, mhev:{c:5.0}, benz:{c:5.7}}},
   {b:"Jeep",        m:"Compass",          pw:{bev:{c:16.5}, mhev:{c:5.4}}, w:1},
   {b:"Peugeot",     m:"208",              pw:{bev:{c:13.4}, mhev:{c:4.7}, benz:{c:5.4}}},
   {b:"Peugeot",     m:"2008",             pw:{bev:{c:15.3}, mhev:{c:5.0}, benz:{c:5.8}}},
   {b:"Peugeot",     m:"308",              pw:{bev:{c:13.0}, mhev:{c:4.7}}},
   {b:"Peugeot",     m:"308 SW",           pw:{bev:{c:13.7}, mhev:{c:4.8}}},
   {b:"Peugeot",     m:"408",              pw:{bev:{c:15.0}, mhev:{c:4.9}}},
   {b:"Peugeot",     m:"3008",             pw:{bev:{c:16.5}, mhev:{c:5.4}}},
   {b:"Peugeot",     m:"5008",             pw:{bev:{c:17.3}, mhev:{c:5.7}}},
   {b:"Citro\u00ebn",m:"C3",               pw:{bev:{c:16.3}, mhev:{c:4.9}, benz:{c:5.6}}},
   {b:"Citro\u00ebn",m:"C3 Aircross",      pw:{bev:{c:17.0}, mhev:{c:5.1}, benz:{c:5.9}}},
   {b:"Citro\u00ebn",m:"C4",               pw:{bev:{c:14.8}, mhev:{c:5.0}}},
   {b:"Citro\u00ebn",m:"C4 X",             pw:{bev:{c:14.6}, mhev:{c:4.9}}},
   {b:"Citro\u00ebn",m:"C5 Aircross",      pw:{bev:{c:16.5}, mhev:{c:5.5}}, w:1},
   {b:"MG",          m:"MG3",              pw:{hev:{c:4.4}, benz:{c:5.9}}, w:1},
   {b:"MG",          m:"ZS",               pw:{hev:{c:4.7}, benz:{c:6.5}}},
   {b:"MG",          m:"MG4",              pw:{bev:{c:16.0}}},
   {b:"MG",          m:"MG5 SW",           pw:{bev:{c:16.2}}, w:1},
   {b:"MG",          m:"MGS5",             pw:{bev:{c:16.8}}},
   {b:"MG",          m:"Cyberster",        pw:{bev:{c:18.7}}, w:1},
   {b:"Omoda",       m:"Omoda 5",          pw:{bev:{c:15.5}, benz:{c:7.0}}, w:1},
   {b:"Jaecoo",      m:"Jaecoo 5",         pw:{shs:{c:5.3}}},
   {b:"Jaecoo",      m:"Jaecoo 7",         pw:{benz:{c:7.4}}, w:1},
   {b:"Jaecoo",      m:"Jaecoo 8",         pw:{phev:{r:134, ce:25.7, c:6.5}}, w:1},
   {b:"Lepas",       m:"L8",               pw:{phev:{r:90, ce:20.4, c:6.0}}, w:1},
   {b:"Mazda",       m:"6e Standard",      pw:{bev:{c:16.6}}},
   {b:"Mazda",       m:"6e Long Range",    pw:{bev:{c:16.5}}},
   {b:"Mazda",       m:"CX-6e",            pw:{bev:{c:19.1}}},
   {b:"Mazda",       m:"MX-30",            pw:{bev:{c:19.0}}, w:1},
   {b:"INEOS",       m:"Grenadier",        pw:{benz:{c:14.8}}}
  ]
};
