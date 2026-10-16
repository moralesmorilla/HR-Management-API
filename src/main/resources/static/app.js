const API_URL = `${window.location.origin === "null" ? "http://localhost:8080" : window.location.origin}/api/employee`;

const listElement = document.querySelector("#employee-list");
const countElement = document.querySelector("#employee-count");
const feedbackElement = document.querySelector("#feedback");
const formPanel = document.querySelector("#form-panel");
const employeeForm = document.querySelector("#employee-form");
const saveButton = document.querySelector("#save-employee");
let employees = [];

async function request(path = "", options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      ...(options.body ? { "Content-Type": "application/json" } : {}),
      ...options.headers
    }
  });

  if (!response.ok) {
    const body = await response.text();
    let message = body;
    try {
      const parsed = JSON.parse(body);
      message = parsed.message || parsed.detail || parsed.error || body;
    } catch {
      // Some Spring error responses are plain text.
    }
    throw new Error(message || `Error HTTP ${response.status}`);
  }

  if (response.status === 204) return null;
  return response.json();
}

function showFeedback(message, type = "info") {
  feedbackElement.textContent = message;
  feedbackElement.className = `feedback feedback-${type}`;
  feedbackElement.hidden = false;
}

function formatDate(date) {
  if (!date) return "—";
  return new Intl.DateTimeFormat("es-ES", { dateStyle: "medium", timeZone: "UTC" }).format(new Date(`${date}T00:00:00Z`));
}

function formatSalary(salary) {
  const value = Number(salary);
  return Number.isFinite(value)
    ? new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" }).format(value)
    : "—";
}

function makeCell(className, content) {
  const cell = document.createElement("td");
  if (className) cell.className = className;
  if (content instanceof Node) cell.append(content);
  else cell.textContent = content;
  return cell;
}

function renderEmployees(items) {
  employees = items;
  listElement.replaceChildren();
  countElement.textContent = `${items.length} ${items.length === 1 ? "empleado" : "empleados"}`;

  if (items.length === 0) {
    const row = document.createElement("tr");
    const empty = makeCell("empty-state", "No hay empleados para mostrar.");
    empty.colSpan = 6;
    row.append(empty);
    listElement.append(row);
    return;
  }

  for (const employee of items) {
    const row = document.createElement("tr");
    const identity = document.createElement("div");
    identity.className = "person-name";
    identity.textContent = `${employee.firstName} ${employee.lastName}`;
    const id = document.createElement("span");
    id.className = "person-id";
    id.textContent = `ID ${employee.id}`;
    identity.append(id);

    const contact = document.createElement("div");
    contact.className = "email-cell";
    contact.textContent = employee.email;
    const phone = document.createElement("span");
    phone.className = "person-id";
    phone.textContent = employee.phone;
    contact.append(phone);

    const status = document.createElement("span");
    status.className = `status ${employee.active ? "status-active" : "status-inactive"}`;
    status.textContent = employee.active ? "Activo" : "Inactivo";

    const actions = document.createElement("div");
    actions.className = "row-actions";
    actions.append(
      createAction("Ver", "view", employee.id),
      createAction("Editar", "edit", employee.id),
      createAction("Eliminar", "delete", employee.id)
    );

    row.append(
      makeCell("", identity),
      makeCell("", contact),
      makeCell("", formatDate(employee.hireDate)),
      makeCell("", formatSalary(employee.salary)),
      makeCell("", status),
      makeCell("", actions)
    );
    listElement.append(row);
  }
}

function createAction(label, action, id) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = `action-button${action === "delete" ? " action-delete" : ""}`;
  button.dataset.action = action;
  button.dataset.id = id;
  button.textContent = label;
  button.setAttribute("aria-label", `${label} empleado ${id}`);
  return button;
}

async function loadEmployees() {
  listElement.innerHTML = '<tr><td class="empty-state" colspan="6">Cargando empleados...</td></tr>';
  countElement.textContent = "Cargando empleados...";
  try {
    renderEmployees(await request());
  } catch (error) {
    listElement.innerHTML = '<tr><td class="empty-state" colspan="6">No se pudieron cargar los empleados. Comprueba que el backend esté iniciado.</td></tr>';
    countElement.textContent = "Error de conexión";
    showFeedback(`No se pudo conectar con ${API_URL}. ${error.message}`, "error");
  }
}

function openForm(employee = null) {
  employeeForm.reset();
  document.querySelector("#employee-id").value = employee?.id ?? "";
  employeeForm.elements.firstName.value = employee?.firstName ?? "";
  employeeForm.elements.lastName.value = employee?.lastName ?? "";
  employeeForm.elements.email.value = employee?.email ?? "";
  employeeForm.elements.phone.value = employee?.phone ?? "";
  employeeForm.elements.hireDate.value = employee?.hireDate ?? "";
  employeeForm.elements.salary.value = employee?.salary ?? "";
  employeeForm.elements.active.checked = employee?.active ?? true;
  document.querySelector("#form-title").textContent = employee ? "Editar empleado" : "Nuevo empleado";
  document.querySelector("#active-field").hidden = !employee;
  saveButton.textContent = employee ? "Guardar cambios" : "Guardar empleado";
  formPanel.hidden = false;
  employeeForm.elements.firstName.focus();
}

function closeForm() {
  formPanel.hidden = true;
  employeeForm.reset();
}

async function findEmployee(id) {
  const employee = await request(`/${encodeURIComponent(id)}`);
  renderEmployees([employee]);
  showFeedback(`Empleado ${employee.id}: ${employee.firstName} ${employee.lastName}.`, "success");
}

document.querySelector("#new-employee").addEventListener("click", () => openForm());
document.querySelector("#close-form").addEventListener("click", closeForm);
document.querySelector("#cancel-form").addEventListener("click", closeForm);
document.querySelector("#show-all").addEventListener("click", () => {
  document.querySelector("#lookup-id").value = "";
  feedbackElement.hidden = true;
  loadEmployees();
});

document.querySelector("#lookup-form").addEventListener("submit", async (event) => {
  event.preventDefault();
  const id = document.querySelector("#lookup-id").value.trim();
  if (!id) return;
  try {
    await findEmployee(id);
  } catch (error) {
    showFeedback(`No se pudo consultar el empleado ${id}. ${error.message}`, "error");
  }
});

listElement.addEventListener("click", async (event) => {
  const button = event.target.closest("button[data-action]");
  if (!button) return;
  const { action, id } = button.dataset;

  try {
    if (action === "view") {
      await findEmployee(id);
    } else if (action === "edit") {
      openForm(await request(`/${encodeURIComponent(id)}`));
    } else if (action === "delete") {
      const employee = employees.find((item) => String(item.id) === id);
      const name = employee ? `${employee.firstName} ${employee.lastName}` : `el empleado ${id}`;
      if (!window.confirm(`¿Seguro que quieres eliminar a ${name}?`)) return;
      await request(`/${encodeURIComponent(id)}`, { method: "DELETE" });
      showFeedback(`${name} se eliminó correctamente.`, "success");
      await loadEmployees();
    }
  } catch (error) {
    showFeedback(`No se pudo completar la operación. ${error.message}`, "error");
  }
});

employeeForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!employeeForm.reportValidity()) return;

  const id = document.querySelector("#employee-id").value;
  const payload = {
    firstName: employeeForm.elements.firstName.value.trim(),
    lastName: employeeForm.elements.lastName.value.trim(),
    email: employeeForm.elements.email.value.trim(),
    phone: employeeForm.elements.phone.value.trim(),
    hireDate: employeeForm.elements.hireDate.value,
    salary: Number(employeeForm.elements.salary.value),
    active: employeeForm.elements.active.checked
  };

  saveButton.disabled = true;
  try {
    await request(id ? `/${encodeURIComponent(id)}` : "", {
      method: id ? "PUT" : "POST",
      body: JSON.stringify(payload)
    });
    closeForm();
    showFeedback(id ? "Los cambios se guardaron correctamente." : "El empleado se creó correctamente.", "success");
    document.querySelector("#lookup-id").value = "";
    await loadEmployees();
  } catch (error) {
    showFeedback(`No se pudo guardar el empleado. ${error.message}`, "error");
  } finally {
    saveButton.disabled = false;
  }
});

loadEmployees();
