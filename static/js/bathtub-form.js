/**
 * KABS bathtub order form
 * ------------------------
 * Builds an interactive order form for bathtub items, then
 * submits the order to a Google Apps Script Web App which forwards
 * a clean, structured email to sbukabs@pf.dk.
 *
 * The catalog mirrors the Order_and_Invoice_Template-ENGLISH.xlsx
 * workbook used in the previous Excel-based flow.
 *
 * To wire this up in production, deploy bathtub-mailer.gs as a
 * Google Apps Script Web App ("Anyone" access) and paste the URL
 * into APPS_SCRIPT_URL below.
 */

// REPLACE WITH THE DEPLOYED APPS SCRIPT WEB APP URL:
window.KABS_BATHTUB_ENDPOINT =
  window.KABS_BATHTUB_ENDPOINT ||
  "https://script.google.com/macros/s/REPLACE_WITH_DEPLOYED_ID/exec";

// All prices are in DKK. priceDay = price per day per item.
// fine = price charged if lost or damaged. perItem = a flat per-item price
// (e.g. lanyards / badges) instead of per-day.
const BATHTUB_CATALOG = {
  games: [
    { da: "Alias", en: "Alias", priceDay: 0, fine: 250 },
    { da: "Backgammon", en: "Backgammon", priceDay: 0, fine: 150 },
    { da: "Bold", en: "Ball", priceDay: 0, fine: 50 },
    { da: "Bordtennisbold", en: "Table tennis ball", priceDay: 0, fine: 10 },
    { da: "Bordtennissæt", en: "Table tennis set", priceDay: 0, fine: 100 },
    { da: "Cards Against Humanity", en: "Cards Against Humanity", priceDay: 0, fine: 300 },
    { da: "Codenames", en: "Codenames", priceDay: 0, fine: 300 },
    { da: "Cranium", en: "Cranium", priceDay: 0, fine: 300 },
    { da: "Dixit", en: "Dixit", priceDay: 0, fine: 250 },
    { da: "Frisbee", en: "Frisbee", priceDay: 0, fine: 40 },
    { da: "Få tungen på gled", en: "Få tungen på gled", priceDay: 0, fine: 250 },
    { da: "Joking Hazard", en: "Joking Hazard", priceDay: 0, fine: 300 },
    { da: "Jungle Speed", en: "Jungle Speed", priceDay: 0, fine: 200 },
    { da: "Logik", en: "Logik", priceDay: 0, fine: 100 },
    { da: "Linkee", en: "Linkee", priceDay: 0, fine: 200 },
    { da: "Ludo", en: "Ludo", priceDay: 0, fine: 100 },
    { da: "King of Tokyo", en: "King of Tokyo", priceDay: 0, fine: 300 },
    { da: "Klodsmajor", en: "Klodsmajor", priceDay: 0, fine: 150 },
    { da: "Kongespil", en: "Kongespil", priceDay: 0, fine: 200 },
    { da: "Spillekort", en: "Playing cards", priceDay: 0, fine: 10 },
    { da: "Kroket", en: "Croquet", priceDay: 0, fine: 100 },
    { da: "Munchkin", en: "Munchkin", priceDay: 0, fine: 300 },
    { da: "Ordet Fanger", en: "Ordet Fanger", priceDay: 0, fine: 200 },
    { da: "Petanque", en: "Petanque", priceDay: 0, fine: 200 },
    { da: "Pictionary", en: "Pictionary", priceDay: 0, fine: 300 },
    { da: "Raflebæger", en: "Dice cup", priceDay: 0, fine: 20 },
    { da: "Rundboldsæt", en: "Rounders set", priceDay: 0, fine: 30 },
    { da: "Spand", en: "Bucket", priceDay: 0, fine: 20 },
    { da: "Stratego", en: "Stratego", priceDay: 0, fine: 400 },
    { da: "Splendor", en: "Splendor", priceDay: 0, fine: 300 },
    { da: "Skak", en: "Chess", priceDay: 0, fine: 200 },
    { da: "Tabu", en: "Taboo", priceDay: 0, fine: 300 },
    { da: "Tegn og gæt", en: "Tegn og gæt", priceDay: 0, fine: 400 },
    { da: "Terninger", en: "Dice", priceDay: 0, fine: 3 },
    { da: "The Art of Science", en: "The Art of Science", priceDay: 0, fine: 300 },
    { da: "Werewolf", en: "Werewolf", priceDay: 0, fine: 200 },
    { da: "Ølspilsteori", en: "Ølspilsteori", priceDay: 0, fine: 50 },
    { da: "Hints", en: "Hints", priceDay: 0, fine: 200 },
    { da: "Uno", en: "Uno", priceDay: 0, fine: 50 },
    { da: "Foodprocessor", en: "Food processor", priceDay: 25, fine: 500 },
    { da: "Højttalersæt", en: "Speaker set", priceDay: 100, fine: 1000 },
  ],
  extras: [
    // perItem = priced once per piece, not per day. Vests are 30/day flat.
    { da: "Vest", en: "Vest", perDay: true, priceDay: 0, fine: 30,
      // Vests are charged 30 DKK / day across the whole loan, see template.
      flatPriceDay: 30 },
    { da: "Førstehjælpskasse", en: "First aid kit", priceDay: 0, fine: 100 },
    { da: "Scanner", en: "Scanner", priceDay: 0, fine: 150 },
    { da: "Snore (lanyards)", en: "Lanyards", perItem: 1, fine: 0 },
    { da: "Kartoffelskrællere", en: "Potato peelers", priceDay: 0, fine: 50 },
    { da: "Spande", en: "Buckets", priceDay: 0, fine: 30 },
    { da: "Mærker (badges)", en: "Badges", perItem: 2, fine: 0 },
  ],
};

// All UI strings live here so we can swap between Danish and English.
const I18N = {
  da: {
    tripInfo: "Information om turen",
    tripName: "Turnavn",
    tripNamePh: "f.eks. Vektorhytten – Bæredygtigt Energidesign",
    loanFrom: "Udlån fra",
    loanTo: "Udlån til",
    loanDays: "Udlånsdage",
    renterName: "Bestillerens navn",
    renterPhone: "Telefon",
    renterEmail: "Email (kvittering sendes hertil)",
    pickupHelp: "Jeg har brug for hjælp til afhentning",
    pickupNote: "Hvis ikke krydset af, antager vi at din egen KABS hjælper med afhentning og tilbagelevering.",
    games: "Spil og udstyr",
    gamesNote: "Badekarret koster 25 kr. pr. dag og inkluderer dit valg af spil herunder. Folk bestiller typisk omkring 10–15 spil.",
    extras: "Veste, snore og andet",
    extrasNote: "Hvis vestene kun er mærket med dags/kørsel, må du gerne aflevere dem uden beregning.",
    qty: "Antal",
    fine: "Pris ved tab/skade",
    perDay: "/ dag",
    perPiece: "pr. stk.",
    extraComments: "Andre kommentarer",
    extraCommentsPh: "Allergier, særlige behov, spørgsmål…",
    estTotal: "Estimeret pris",
    submit: "Send bestilling",
    submitting: "Sender…",
    success: "Tak! Din bestilling er sendt til sbukabs@pf.dk. Du modtager snart en bekræftelse på mail.",
    error: "Der gik noget galt – prøv igen, eller skriv direkte til sbukabs@pf.dk.",
    requiredMissing: "Udfyld venligst de obligatoriske felter (markeret med *).",
    minTwoWeeks: "Bemærk: bestil senest to uger før, badekarret skal bruges, så det kan pakkes i god tid.",
    invalidDates: "Slutdato skal være efter startdato.",
  },
  en: {
    tripInfo: "Trip information",
    tripName: "Trip name",
    tripNamePh: "e.g. Vector Cabin – Sustainable Energy Design",
    loanFrom: "Loan from",
    loanTo: "Loan to",
    loanDays: "Loan days",
    renterName: "Renter name",
    renterPhone: "Phone",
    renterEmail: "Email (confirmation will be sent here)",
    pickupHelp: "I need help with pickup",
    pickupNote: "If unchecked we assume your own KABS will help with pickup and drop-off.",
    games: "Games and equipment",
    gamesNote: "The bathtub costs 25 DKK per day and includes your choice of games below. People usually order around 10–15 games.",
    extras: "Vests, lanyards and other items",
    extrasNote: "If only daily/driver labels are written on the vests, you may return them at no charge.",
    qty: "Qty",
    fine: "If lost / damaged",
    perDay: "/ day",
    perPiece: "per piece",
    extraComments: "Extra comments",
    extraCommentsPh: "Allergies, special needs, questions…",
    estTotal: "Estimated total",
    submit: "Submit order",
    submitting: "Submitting…",
    success: "Thanks. Your order has been sent to sbukabs@pf.dk. You will receive a confirmation by email shortly.",
    error: "Something went wrong — please try again or email sbukabs@pf.dk directly.",
    requiredMissing: "Please fill in the required fields (marked with *).",
    minTwoWeeks: "Remember: order at least two weeks in advance so we have time to pack the bathtub.",
    invalidDates: "End date must be after start date.",
  },
};

function buildSection(titleId, lang, items, opts = {}) {
  const t = I18N[lang];
  const sec = document.createElement("section");
  sec.className = "bathtub-section";
  const h = document.createElement("h2");
  h.textContent = t[titleId];
  sec.appendChild(h);
  if (opts.note) {
    const p = document.createElement("p");
    p.className = "bathtub-note";
    p.textContent = t[opts.note];
    sec.appendChild(p);
  }

  const tbl = document.createElement("table");
  tbl.className = "bathtub-table";
  const thead = document.createElement("thead");
  // "Genstand" / "Item" — the first word of the section title.
  const itemHeader = titleId === "games"
    ? (lang === "da" ? "Spil" : "Game")
    : (lang === "da" ? "Genstand" : "Item");
  thead.innerHTML = `<tr>
    <th class="b-name">${itemHeader}</th>
    <th class="b-qty">${t.qty}</th>
    <th class="b-fine">${t.fine}</th>
  </tr>`;
  tbl.appendChild(thead);

  const tbody = document.createElement("tbody");
  items.forEach((item, idx) => {
    const tr = document.createElement("tr");

    const nameTd = document.createElement("td");
    nameTd.className = "b-name";
    nameTd.textContent = item[lang];
    if (item.perItem) {
      const small = document.createElement("small");
      small.textContent = ` (${item.perItem} kr. ${t.perPiece})`;
      nameTd.appendChild(small);
    } else if (item.priceDay && item.priceDay > 0) {
      const small = document.createElement("small");
      small.textContent = ` (${item.priceDay} kr. ${t.perDay})`;
      nameTd.appendChild(small);
    } else if (item.flatPriceDay) {
      const small = document.createElement("small");
      small.textContent = ` (${item.flatPriceDay} kr. ${t.perDay})`;
      nameTd.appendChild(small);
    }
    tr.appendChild(nameTd);

    const qtyTd = document.createElement("td");
    qtyTd.className = "b-qty";
    const inp = document.createElement("input");
    inp.type = "number";
    inp.min = "0";
    inp.step = "1";
    inp.value = "0";
    inp.name = `${opts.section}_${idx}`;
    inp.dataset.itemName = item.en; // canonical English key for the email
    inp.dataset.priceDay = item.priceDay || item.flatPriceDay || 0;
    inp.dataset.perItem = item.perItem || 0;
    inp.addEventListener("input", recalcTotal);
    qtyTd.appendChild(inp);
    tr.appendChild(qtyTd);

    const fineTd = document.createElement("td");
    fineTd.className = "b-fine";
    fineTd.textContent = item.fine ? `${item.fine} kr.` : "—";
    tr.appendChild(fineTd);

    tbody.appendChild(tr);
  });
  tbl.appendChild(tbody);
  sec.appendChild(tbl);
  return sec;
}

function loanDays() {
  const a = document.getElementById("bath-loan-from").value;
  const b = document.getElementById("bath-loan-to").value;
  if (!a || !b) return 0;
  const da = new Date(a), db = new Date(b);
  const diff = Math.round((db - da) / (1000 * 60 * 60 * 24));
  return diff > 0 ? diff : 0;
}

function recalcTotal() {
  const days = loanDays();
  document.getElementById("bath-loan-days").value = days;

  // Bathtub flat fee: 25 kr/day if any games are picked.
  let total = 0;
  let anyGame = false;
  document.querySelectorAll('input[name^="games_"]').forEach((el) => {
    const q = parseInt(el.value, 10) || 0;
    if (q > 0) anyGame = true;
  });
  if (anyGame && days > 0) total += 25 * days;

  document.querySelectorAll('input[name^="extras_"], input[name^="games_"]').forEach((el) => {
    const q = parseInt(el.value, 10) || 0;
    if (q <= 0) return;
    const pd = parseFloat(el.dataset.priceDay) || 0;
    const pi = parseFloat(el.dataset.perItem) || 0;
    if (pi > 0) {
      total += q * pi;
    } else if (pd > 0 && days > 0) {
      total += q * pd * days;
    }
  });

  document.getElementById("bath-total").textContent = `${total.toFixed(0)} kr.`;
}

function buildOrderPayload(lang) {
  const items = [];
  const collect = (selector) => {
    document.querySelectorAll(selector).forEach((el) => {
      const q = parseInt(el.value, 10) || 0;
      if (q > 0) items.push({ name: el.dataset.itemName, qty: q });
    });
  };
  collect('input[name^="games_"]');
  collect('input[name^="extras_"]');

  return {
    lang,
    tripName: document.getElementById("bath-trip-name").value.trim(),
    loanFrom: document.getElementById("bath-loan-from").value,
    loanTo: document.getElementById("bath-loan-to").value,
    loanDays: loanDays(),
    renterName: document.getElementById("bath-renter-name").value.trim(),
    renterPhone: document.getElementById("bath-renter-phone").value.trim(),
    renterEmail: document.getElementById("bath-renter-email").value.trim(),
    pickupHelp: document.getElementById("bath-pickup-help").checked,
    extraComments: document.getElementById("bath-extra-comments").value.trim(),
    estimatedTotal: document.getElementById("bath-total").textContent,
    items,
  };
}

function renderBathtubForm(rootId, lang) {
  const t = I18N[lang];
  const root = document.getElementById(rootId);
  if (!root) return;

  root.innerHTML = `
    <form id="bathtub-form" class="bathtub-form" novalidate>
      <p class="bathtub-warn">${t.minTwoWeeks}</p>

      <section class="bathtub-section">
        <h2>${t.tripInfo}</h2>
        <div class="bathtub-grid">
          <label>${t.tripName} *
            <input type="text" id="bath-trip-name" required placeholder="${t.tripNamePh}">
          </label>
          <label>${t.renterName} *
            <input type="text" id="bath-renter-name" required>
          </label>
          <label>${t.renterPhone} *
            <input type="tel" id="bath-renter-phone" required>
          </label>
          <label>${t.renterEmail} *
            <input type="email" id="bath-renter-email" required>
          </label>
          <label>${t.loanFrom} *
            <input type="date" id="bath-loan-from" required>
          </label>
          <label>${t.loanTo} *
            <input type="date" id="bath-loan-to" required>
          </label>
          <label>${t.loanDays}
            <input type="number" id="bath-loan-days" readonly value="0">
          </label>
          <label class="bathtub-checkbox">
            <input type="checkbox" id="bath-pickup-help"> ${t.pickupHelp}
          </label>
        </div>
        <p class="bathtub-note">${t.pickupNote}</p>
      </section>
      <div id="bathtub-games"></div>
      <div id="bathtub-extras"></div>
      <section class="bathtub-section">
        <h2>${t.extraComments}</h2>
        <textarea id="bath-extra-comments" rows="4" placeholder="${t.extraCommentsPh}"></textarea>
      </section>

      <div class="bathtub-summary">
        <div><strong>${t.estTotal}:</strong> <span id="bath-total">0 kr.</span></div>
        <button type="submit" class="applyBtn" id="bath-submit">${t.submit}</button>
      </div>
      <p id="bathtub-status" class="bathtub-status" role="status" aria-live="polite"></p>
    </form>
  `;

  document.getElementById("bathtub-games").appendChild(
    buildSection("games", lang, BATHTUB_CATALOG.games, { section: "games", note: "gamesNote" })
  );
  document.getElementById("bathtub-extras").appendChild(
    buildSection("extras", lang, BATHTUB_CATALOG.extras, { section: "extras", note: "extrasNote" })
  );

  ["bath-loan-from", "bath-loan-to"].forEach((id) =>
    document.getElementById(id).addEventListener("change", recalcTotal)
  );

  document.getElementById("bathtub-form").addEventListener("submit", (e) => {
    e.preventDefault();
    submitOrder(lang);
  });
}

async function submitOrder(lang) {
  const t = I18N[lang];
  const status = document.getElementById("bathtub-status");
  const btn = document.getElementById("bath-submit");
  status.className = "bathtub-status";
  status.textContent = "";

  const required = ["bath-trip-name", "bath-renter-name", "bath-renter-phone",
                    "bath-renter-email", "bath-loan-from", "bath-loan-to"];
  for (const id of required) {
    const el = document.getElementById(id);
    if (!el.value.trim()) {
      status.classList.add("error");
      status.textContent = t.requiredMissing;
      el.focus();
      return;
    }
  }
  if (loanDays() <= 0) {
    status.classList.add("error");
    status.textContent = t.invalidDates;
    return;
  }

  const payload = buildOrderPayload(lang);
  btn.disabled = true;
  btn.textContent = t.submitting;

  try {
    // Apps Script Web Apps require a "simple" CORS request — that means
    // text/plain content-type, no custom headers. The script reads
    // e.postData.contents and JSON.parses it.
    const res = await fetch(window.KABS_BATHTUB_ENDPOINT, {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error("Network response was not ok: " + res.status);
    const data = await res.json().catch(() => ({ ok: true }));
    if (data.ok === false) throw new Error(data.error || "submit failed");
    status.classList.add("success");
    status.textContent = t.success;
    document.getElementById("bathtub-form").reset();
    recalcTotal();
  } catch (err) {
    console.error(err);
    status.classList.add("error");
    status.textContent = t.error;
  } finally {
    btn.disabled = false;
    btn.textContent = t.submit;
  }
}

window.renderBathtubForm = renderBathtubForm;
