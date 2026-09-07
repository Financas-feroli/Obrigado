const icons = () => window.lucide?.createIcons();
icons();

const menuToggle = document.querySelector(".menu-toggle");
const mobileNav = document.querySelector("#mobile-nav");
function closeMenu() {
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Abrir menu");
  mobileNav.hidden = true;
}
menuToggle.addEventListener("click", () => {
  const expanded = menuToggle.getAttribute("aria-expanded") !== "true";
  menuToggle.setAttribute("aria-expanded", String(expanded));
  menuToggle.setAttribute(
    "aria-label",
    expanded ? "Fechar menu" : "Abrir menu",
  );
  mobileNav.hidden = !expanded;
});
mobileNav
  .querySelectorAll("a")
  .forEach((link) => link.addEventListener("click", closeMenu));
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !mobileNav.hidden) {
    closeMenu();
    menuToggle.focus();
  }
});
window.matchMedia("(min-width: 801px)").addEventListener("change", (event) => {
  if (event.matches) closeMenu();
});

const currency = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  maximumFractionDigits: 0,
});
const monthlyPrice = document.querySelector("#monthly-price");
const comparisonPeriod = document.querySelector("#comparison-period");
function updateComparison() {
  const monthly = Number(monthlyPrice.value);
  const months = Number(comparisonPeriod.value);
  const total = monthly * months;
  document.querySelector("#monthly-output").textContent =
    currency.format(monthly);
  monthlyPrice.setAttribute(
    "aria-valuetext",
    `${currency.format(monthly)} por mês`,
  );
  document.querySelector("#period-label").textContent =
    `Ao longo de ${months / 12} ${months === 12 ? "ano" : "anos"}`;
  document.querySelector("#subscription-cost").textContent =
    currency.format(total);
  document.querySelector("#savings").textContent = currency.format(total - 197);
}
monthlyPrice.addEventListener("input", updateComparison);
comparisonPeriod.addEventListener("change", updateComparison);
updateComparison();

const modulePanel = document.querySelector("#module-panel");
const dashboardPreview = modulePanel.innerHTML;
const modules = {
  dashboard: dashboardPreview,
  entries: `
    <div class="module-copy"><span class="eyebrow">LANÇAMENTOS</span><h3>Tudo registrado.<br>Nada perdido.</h3><p>Receitas, despesas e transferências no mesmo lugar. Organize a rotina e pare de procurar informações em arquivos soltos.</p><ul class="check-list"><li>Parcelamentos e recorrências</li><li>Anexos junto de cada lançamento</li><li>Exportação para acompanhar seus registros</li></ul></div>
    <div class="module-demo"><span class="tiny-label">LANÇAMENTOS · EXEMPLO ILUSTRATIVO</span><div class="preview-metrics"><div><span>Movimentações de junho</span><strong>Seu mês em ordem.</strong></div><i data-lucide="arrow-left-right" aria-hidden="true"></i></div><div class="demo-row"><span>Prestação de serviço</span><strong class="entry-positive">+ R$ 8.500</strong></div><div class="demo-row"><span>Fornecedor</span><strong>− R$ 2.400</strong></div><div class="demo-row"><span>Aluguel · recorrente</span><strong>− R$ 1.800</strong></div><div class="demo-note"><i data-lucide="paperclip" aria-hidden="true"></i> Comprovantes e informações juntos.</div></div>`,
  accounts: `
    <div class="module-copy"><span class="eyebrow">CONTAS A PAGAR E RECEBER</span><h3>Veja o que vem.<br>Antes de vencer.</h3><p>Enxergue os compromissos do caixa e os recebimentos previstos. Identifique pendências sem esperar o problema acontecer.</p><ul class="check-list"><li>Valores atrasados em destaque</li><li>Vencimentos de hoje e dos próximos 7 dias</li><li>Recebimentos futuros para planejar</li></ul></div>
    <div class="module-demo"><span class="tiny-label">CONTAS A RECEBER · EXEMPLO ILUSTRATIVO</span><div class="preview-metrics"><div><span>Total a receber</span><strong>R$ 24.800</strong></div><i data-lucide="calendar-days" aria-hidden="true"></i></div><div class="demo-row"><span>Atrasados</span><strong>R$ 3.800</strong></div><div class="demo-row"><span>Vencem hoje</span><strong>R$ 2.500</strong></div><div class="demo-row"><span>Próximos 7 dias</span><strong>R$ 8.500</strong></div><div class="demo-row"><span>Futuros</span><strong>R$ 10.000</strong></div></div>`,
  budget: `
    <div class="module-copy"><span class="eyebrow">ORÇAMENTO E CENTROS DE CUSTO</span><h3>Planeje com intenção.<br>Acompanhe de perto.</h3><p>Compare o planejado com o realizado e descubra onde o dinheiro está sendo consumido. Cada área com seu orçamento à vista.</p><ul class="check-list"><li>Orçamento por categoria</li><li>Acompanhamento por área e unidade</li><li>Mais informação para ajustar a rota</li></ul></div>
    <div class="module-demo"><span class="tiny-label">ORÇAMENTO UTILIZADO · DADOS ILUSTRATIVOS</span><div class="preview-metrics"><div><span>Planejado × realizado</span><strong>Sem perder a medida.</strong></div></div><div class="budget-row"><div><span>Marketing</span><strong>72%</strong></div><div class="budget-track" role="meter" aria-label="Orçamento de Marketing utilizado" aria-valuenow="72" aria-valuemin="0" aria-valuemax="100"><span style="width:72%"></span></div></div><div class="budget-row"><div><span>Pessoal</span><strong>81%</strong></div><div class="budget-track" role="meter" aria-label="Orçamento de Pessoal utilizado" aria-valuenow="81" aria-valuemin="0" aria-valuemax="100"><span style="width:81%"></span></div></div><div class="budget-row"><div><span>Operacional</span><strong>56%</strong></div><div class="budget-track" role="meter" aria-label="Orçamento Operacional utilizado" aria-valuenow="56" aria-valuemin="0" aria-valuemax="100"><span style="width:56%"></span></div></div></div>`,
};
const moduleTabs = [...document.querySelectorAll("[data-module]")];
function selectModule(tab) {
  moduleTabs.forEach((item) => {
    const selected = item === tab;
    item.setAttribute("aria-selected", String(selected));
    item.tabIndex = selected ? 0 : -1;
  });
  modulePanel.innerHTML = modules[tab.dataset.module];
  modulePanel.setAttribute("aria-labelledby", tab.id);
  icons();
}
moduleTabs.forEach((tab, index) => {
  tab.addEventListener("click", () => selectModule(tab));
  tab.addEventListener("keydown", (event) => {
    let next;
    if (event.key === "ArrowRight") next = (index + 1) % moduleTabs.length;
    else if (event.key === "ArrowLeft")
      next = (index - 1 + moduleTabs.length) % moduleTabs.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = moduleTabs.length - 1;
    else return;
    event.preventDefault();
    selectModule(moduleTabs[next]);
    moduleTabs[next].focus();
  });
});

if (
  "IntersectionObserver" in window &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches
) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.remove("is-pending");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.06 },
  );
  document.querySelectorAll(".reveal").forEach((element) => {
    if (element.getBoundingClientRect().top > window.innerHeight) {
      element.classList.add("is-pending");
      observer.observe(element);
    }
  });
}
