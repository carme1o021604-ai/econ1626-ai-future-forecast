const progressBar = document.getElementById("progressBar");
window.addEventListener("scroll", () => {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
  progressBar.style.width = `${progress}%`;
});
const pyramidData = {
  "2025": { year: "2025 production model", title: "Human labour scales the firm.", text: "Large analyst cohorts conduct research and build the materials that support senior advice. Training occurs through repeated exposure to this work.", values: ["10", "30", "70", "140", "Limited"] },
  "2030": { year: "2030 forecast model", title: "Agent capacity scales the firm.", text: "Smaller junior cohorts supervise AI-enabled research and drafting. Human value shifts toward verification, judgement, relationships, and accountability.", values: ["12", "32", "64", "70", "Extensive"] }
};
document.querySelectorAll("[data-pyramid]").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll("[data-pyramid]").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    const year = button.dataset.pyramid;
    const data = pyramidData[year];
    const graphic = document.getElementById("pyramidGraphic");
    graphic.classList.toggle("forecast", year === "2030");
    document.getElementById("pyramidYear").textContent = data.year;
    document.getElementById("pyramidTitle").textContent = data.title;
    document.getElementById("pyramidText").textContent = data.text;
    graphic.querySelectorAll("b").forEach((value, index) => { value.textContent = data.values[index]; });
  });
});
const scenarioData = {
  baseline: { label: "Baseline scenario", title: "AI as a co-worker", description: "AI agents become standard tools across major consulting firms. Routine research, benchmarking, and documentation are increasingly automated, while people focus on client relationships and strategic judgement. Productivity rises and firms continue hiring graduates, though in smaller numbers.", metrics: ["Moderate–high", "Lower, not eliminated", "Mixed", "Uneven gains"], drivers: ["Steady improvement in agent capabilities", "Gradual organisational adoption", "Moderate support for workforce adaptation"] },
  upside: { label: "Upside scenario", title: "The democratisation of consulting", description: "AI agents dramatically reduce the cost of delivering advice. Small firms and independent consultants gain access to analytical capabilities that were previously available only to large organisations. Competition expands, services become more affordable, and new demand offsets some task displacement.", metrics: ["High", "Reconfigured and resilient", "Stronger", "Broadly shared"], drivers: ["Rapid capability improvement", "Falling deployment costs", "Interoperable and accessible AI", "Strong education and competition policy"] },
  downside: { label: "Downside scenario", title: "The hollowing-out of the profession", description: "AI adoption moves faster than organisational adaptation. Large firms automate substantial portions of junior-level work and sharply reduce graduate recruitment. The career pathway from analyst to manager weakens while advanced AI capabilities remain concentrated among dominant firms.", metrics: ["High for incumbents", "Sharply lower", "Weaker", "Concentrated"], drivers: ["Concentrated AI ownership", "Weak competition oversight", "Insufficient workforce adaptation", "Short-term cost cutting"] }
};
const metricIds = ["metricProductivity", "metricHiring", "metricCompetition", "metricDistribution"];
document.querySelectorAll("[data-scenario]").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll("[data-scenario]").forEach((item) => { item.classList.remove("active"); item.setAttribute("aria-selected", "false"); });
    button.classList.add("active");
    button.setAttribute("aria-selected", "true");
    const data = scenarioData[button.dataset.scenario];
    document.getElementById("scenarioLabel").textContent = data.label;
    document.getElementById("scenarioTitle").textContent = data.title;
    document.getElementById("scenarioDescription").textContent = data.description;
    metricIds.forEach((id, index) => { document.getElementById(id).textContent = data.metrics[index]; });
    const drivers = document.getElementById("scenarioDrivers");
    drivers.innerHTML = "";
    data.drivers.forEach((driver) => { const item = document.createElement("li"); item.textContent = driver; drivers.appendChild(item); });
  });
});
const competitionRange = document.getElementById("competitionRange");
const workerRange = document.getElementById("workerRange");
const skillsRange = document.getElementById("skillsRange");
function updateGains() {
  const competition = Number(competitionRange.value);
  const workerPower = Number(workerRange.value);
  const skillAccess = Number(skillsRange.value);
  const clientScore = 20 + competition * 0.65;
  const workerScore = 20 + workerPower * 0.45 + skillAccess * 0.35;
  const firmScore = 100 - competition * 0.45 - workerPower * 0.25 + (100 - skillAccess) * 0.2;
  const total = clientScore + workerScore + firmScore;
  const clientShare = Math.round((clientScore / total) * 100);
  const workerShare = Math.round((workerScore / total) * 100);
  const firmShare = 100 - clientShare - workerShare;
  [["clientsShare", clientShare], ["workersShare", workerShare], ["firmsShare", firmShare]].forEach(([id, value]) => { const element = document.getElementById(id); element.style.width = `${value}%`; element.querySelector("b").textContent = `${value}%`; });
  document.getElementById("competitionValue").textContent = competition;
  document.getElementById("workerValue").textContent = workerPower;
  document.getElementById("skillsValue").textContent = skillAccess;
}
[competitionRange, workerRange, skillsRange].forEach((range) => { range.addEventListener("input", updateGains); });
document.getElementById("resetGains").addEventListener("click", () => { competitionRange.value = 50; workerRange.value = 50; skillsRange.value = 50; updateGains(); });
updateGains();
