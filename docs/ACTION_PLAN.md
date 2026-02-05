# Plan de acción: CoPilot Demo Portal (Mountain View Coffee)

Este documento traduce el Project Brief del PM en un plan ejecutable paso a paso, con aspectos técnicos y no técnicos, para convertir el landing actual en el portal unificado de demos descrito en el brief.

---

## 1. Resumen del objetivo

- **Producto:** Un solo portal de demos, protegido por login, para equipos internos (ventas, partners, liderazgo, producto).
- **Narrativa:** Todas las demos se contextualizan en **Mountain View Coffee**, una cafetería ficticia de alta tecnología.
- **Estructura:** Tres categorías de demos con requisitos y formatos distintos.
- **Admin:** Es una herramienta interna (gestión de usuarios, etc.); **no** forma parte del flujo de los usuarios finales del portal.

---

## 2. Estructura objetivo del portal

| Qué | Dónde | Quién lo ve |
|-----|--------|-------------|
| **Landing (hub)** | `/` | Todos los usuarios autenticados |
| **Categoría 1: Business Functions** | `/demos/business-functions` (índice) y subrutas por función | Todos |
| **Categoría 2: AI Agents** | `/demos/ai-agents` (índice) y subrutas por agente | Todos |
| **Admin** | `/admin` | Solo usuarios con rol admin (oculto en la navegación principal) |

---

## 3. Plan de acción detallado

### Fase 0: Alineación y configuración base

#### Paso 0.1 — Nomenclatura y branding (no técnico)

- [x] **Decidir nombre del producto en UI:** “CoPilot Demo Portal” vs “Demo Portal” vs “Mountain View Coffee – Demo Portal”.
- [x] **Fijar nombre de la narrativa:** “Mountain View Coffee” como negocio ficticio en todo el copy.
- [x] **Actualizar** `app/layout.tsx` (metadata: title, description) para reflejar el nombre elegido.
- [x] **Actualizar** texto del header (logo): por ejemplo “Mountain View Coffee” o “Demo Portal” según lo acordado.

**Salida:** Nombre de producto y de narrativa definidos; metadata y logo actualizados.

---

#### Paso 0.2 — Catálogo de demos (config-driven) (técnico)

- [x] Crear **archivo de configuración** del catálogo de demos (por ejemplo `lib/demo-catalog.ts` o `config/demos.ts`).
- [x] Definir **tipos TypeScript** para:
  - **Categoría 1 (Business Functions):** id, title, description, slug, narrative (cómo se enmarca en Mountain View Coffee), optional tags (HR, Marketing, Support, etc.).
  - **Categoría 2 (AI Agents):** id, title, description, slug, agentName, narrative (persona café), type: `"simulation"`.
- [x] Rellenar el catálogo con **placeholders** (ej. 1 demo por categoría) para poder construir la navegación y las páginas sin depender de contenido final.

**Salida:** `lib/demo-catalog.ts` (o equivalente) con tipos y datos mínimos; demos listadas por categoría.

---

#### Paso 0.3 — Rutas base para las tres categorías (técnico)

- [x] Crear **layout compartido** para demos (por ejemplo `app/demos/layout.tsx`) que reutilice el mismo shell de UI (header/nav) que el landing para “consistent UI shell and branding”.
- [x] Crear rutas **índice** por categoría:
  - [x] `app/demos/business-functions/page.tsx` — lista de demos de Business Functions.
  - [x] `app/demos/ai-agents/page.tsx` — lista de demos de AI Agents.
- [x] Cada página de índice debe **leer del catálogo** (config) y renderizar cards/enlaces; sin hardcodear lista de demos en el JSX.

**Salida:** Navegación a `/demos/business-functions` y `/demos/ai-agents` funcionando con contenido basado en config.

---

### Fase 1: Landing (hub) como pantalla principal

#### Paso 1.1 — Rediseño del landing como hub (técnico + no técnico)

- [x] **Eliminar o reemplazar** secciones que no aporten al brief: “Most ordered”, “Tea & more”, CTA genérico, “About” genérico (o reconvertirlas en “Sobre el portal” / “Sobre Mountain View Coffee”).
- [x] **Estructura objetivo del landing:**
  - **Hero:** Título claro del portal + una línea que explique que las demos giran en torno a Mountain View Coffee (story-driven).
  - **Tres bloques principales** (o cards) que correspondan a las **tres categorías**, con:
    - Título de la categoría.
    - Descripción breve (lenguaje business-first).
    - CTA a la ruta índice de esa categoría (`/demos/business-functions`, `/demos/ai-agents`).
  - **Diferenciación visual/claridad:** Indicar de forma explícita en cada bloque:
    - **Business Functions:** “Demos integradas e interactivas”.
    - **AI Agents:** “Simulaciones de agentes (no sistemas en vivo)”.
- [x] Opcional: sección corta “Sobre Mountain View Coffee” (narrativa del negocio ficticio) y/o “Sobre este portal” (uso interno, reutilización de demos).

**Salida:** Landing en `/` que sirve como hub con tres entradas claras a las categorías y copy alineado al brief.

---

#### Paso 1.2 — Navegación global (header) (técnico)

- [x] **Actualizar** `LandingHeader` (o el componente de nav usado en `app/layout` / `app/demos/layout`):
  - Enlaces principales: **Home** (`/`), **Business Functions** (`/#business-functions`), **Digital Workforce** (`/#digital-workforce`).
  - Quitar o reemplazar enlaces que ya no existan (ej. Coffee, Tea, About como anclas) por las nuevas rutas.
- [x] Mantener **Admin** solo en el menú del avatar para usuarios con rol admin; **no** mostrar “Admin” en la barra principal.
- [x] Asegurar que el **mismo header** se use en `/`, `/demos/*` y, si aplica, en páginas hijas de cada categoría.

**Salida:** Navegación consistente entre landing y demos; mínimo de clics para llegar a una categoría.

---

### Fase 2: Categoría 1 — Business Functions

#### Paso 2.1 — Página índice (técnico)

- [x] En `app/demos/business-functions/page.tsx`, listar demos de tipo “business function” desde el catálogo.
- [x] Cada ítem: título, descripción corta, narrativa (Mountain View Coffee), link a `/demos/business-functions/[slug]`.
- [x] Diseño: cards o lista clara; lenguaje business-first (ej. “Contratación de baristas”, “Soporte al cliente”).

#### Paso 2.2 — Página individual de demo (técnico)

- [x] Crear ruta dinámica `app/demos/business-functions/[slug]/page.tsx`.
- [x] Obtener demo por `slug` desde el catálogo; 404 si no existe.
- [x] Página debe incluir:
  - Título y contexto narrativo (Mountain View Coffee).
  - Contenedor donde irá la **demo embebida** (iframe, componente React, o wrapper según el tipo de demo).
  - Por ahora se puede usar un **placeholder** (texto + área reservada) hasta tener la primera demo real.
- [ ] Requisitos del brief para esta categoría (a implementar cuando exista demo real):
  - Demos funcionales (versiones de producto real), no solo vídeo o estático.
  - Interacción en vivo.
  - Presentable y reutilizable.
  - Datos mockeados o pre-seeded; backend ligero y aislado si se necesita.

**Salida:** Índice de Business Functions y plantilla de página por demo; lista y rutas alimentadas por config.

---

### Fase 3: Categoría 2 — AI Agents

#### Paso 3.1 — Página índice (técnico)

- [x] En `app/demos/ai-agents/page.tsx`, listar demos de tipo “AI Agents” desde el catálogo.
- [x] Cada ítem: nombre del agente (café-themed), descripción, que deje claro que es **simulación** (no sistema en vivo).
- [x] Link a `/demos/ai-agents/[slug]`.

#### Paso 3.2 — Página individual de agente (técnico + no técnico)

- [x] Crear `app/demos/ai-agents/[slug]/page.tsx`.
- [x] Contenido:
  - Explicación clara de qué representa el agente (persona, capacidad).
  - Área de **simulación**: interacciones guionadas o semi-guiadas; flujo predecible; fácil de resetear.
- [x] Restricciones del brief: solo simulaciones; sin sistemas de IA en vivo; nombres y personalidades café.
- [x] Primera versión puede ser un **placeholder** (texto + botón “Iniciar simulación” que lleve a una vista estática o script simple).

**Salida:** Índice de AI Agents y plantilla por agente; mensaje claro “simulación” en UI y copy.

---



---

### Fase 5: Admin y acceso

#### Paso 5.1 — Admin fuera del flujo principal (no técnico + técnico)

- [x] **No** agregar “Admin” a la navegación principal del portal; solo en el menú del avatar para usuarios admin.
- [x] Comprobar que usuarios sin rol admin **no** puedan acceder a `/admin` (redirect o 403); ya debería estar cubierto por layout de admin.
- [x] Documentar en README o en este plan que Admin es solo para gestión interna (usuarios, etc.), no para usuarios finales del portal.

**Salida:** Admin accesible solo por URL o menú avatar; no promocionado en la navegación del portal.

---

### Fase 6: Consistencia y pulido

#### Paso 6.1 — UI y branding (no técnico)

- [x] Revisar que todas las páginas del portal (landing + `/demos/*`) usen el mismo header, footer y paleta (ya tenemos estilos tipo SoMa / cálidos).
- [x] Mensajes y microcopy en lenguaje **business-first** y **story-driven** (Mountain View Coffee).
- [x] Revisar que en cada categoría quede **explícito** el tipo de contenido: embebido, simulación o enlace externo.

#### Paso 6.2 — Configuración y mantenimiento (técnico)

- [x] Toda la lista de demos (las tres categorías) debe provenir del **catálogo en config**; evitar listas hardcodeadas en componentes.
- [x] Si más adelante se agrega CMS o API, el contrato (tipos) del catálogo puede mantenerse y solo cambiar el origen de datos.
- [x] **Demos en DB:** Tabla `demos` en la base de datos (enum `demo_category`, campos comunes + `metadata` jsonb) con datos de ejemplo; migración `0002_demos.sql` y script `npm run db:seed-demos`. La app sigue leyendo del config; la DB queda lista para cuando lleguen demos reales o se quiera origen admin/API.

#### Paso 6.3 — Documentación interna

- [x] Actualizar README con: propósito del portal, estructura de rutas, dónde está el catálogo de demos, cómo agregar una nueva demo en cada categoría.
- [ ] Opcional: documento corto “Guía para presentadores” (cómo navegar en vivo, qué decir en cada categoría).

---

## 4. Orden sugerido de ejecución

1. **Fase 0** (config + rutas base) — fundamento para el resto.
2. **Fase 1** (landing como hub + nav) — lo que ve el usuario al entrar.
3. **Fases 2 y 3** — se pueden hacer en paralelo; cada una con índice + página(s) individuales y placeholders donde haga falta.
4. **Fase 5** (admin) — verificación rápida.
5. **Fase 6** (consistencia y docs) — al final o en paralelo con contenido.

---

## 5. Criterios de éxito (alineados al brief)

- [x] Ventas/equipos pueden **encontrar** las demos desde el landing sin depender de conocimiento informal.
- [x] **Misma demo** reutilizable en varias presentaciones (rutas estables, contenido desde config).
- [x] **Narrativa consistente** (Mountain View Coffee) en las categorías del portal.
- [x] **Diferenciación clara** entre demos embebidas, simulaciones y enlaces externos.
- [x] Admin **no** forma parte de la experiencia del usuario final del portal.

---

## 6. Próximo paso concreto

**Siguiente paso recomendado:** Ejecutar **Fase 0** (Paso 0.1 + 0.2 + 0.3): definir nombre en UI, crear `lib/demo-catalog.ts` con tipos y placeholders, y las rutas `app/demos/layout.tsx`, `app/demos/business-functions/page.tsx`, `app/demos/ai-agents/page.tsx`. Después, Fase 1 para convertir el landing actual en el hub y la nueva navegación.
