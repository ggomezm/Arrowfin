# ArrowFin Technical Assessment – Architectural Solution

## ⏱ Tiempo estimado
Diseño conceptual y arquitectónico. La implementación de código se realizará posteriormente.

---

## 🔧 Backend Architecture (NestJS + Prisma)

### Objetivo
Construir un servicio backend que exponga un **endpoint de snapshot diario** para cada trader, garantizando aislamiento por tenant (`broker_id`) y protección de PII.

### Diseño del Endpoint
- **Ruta**: `GET /snapshot`
- **Scope**: Autenticado y limitado al `broker_id` del trader.
- **Datos retornados**:
  - Posiciones abiertas (instrumento, cantidad neta, precio promedio, precio de mercado).
  - P&L diario (realizado + no realizado).
  - Indicador de riesgo calculado con la fórmula:  
    `risk = min(100, abs(positions_notional) / account_balance × 100)`.

### Prisma Schema (Diseño conceptual)
- **Entidades principales**:
  - `Broker`: id, nombre, tipo.
  - `Trader`: id, broker_id, PII (nombre, email, teléfono, etc.).
  - `Account`: id, trader_id, balance, estado.
  - `Instrument`: id, símbolo, point_value_usd.
  - `Fill`: id, account_id, instrument_id, qty, price, commission, timestamp.
- **Índices recomendados**:
  - `index_trader_broker` en `trader(broker_id)` para aislamiento multi-tenant.
  - `index_fill_account` en `fill(account_id, timestamp)` para consultas rápidas de snapshot.

### Tests (Diseño conceptual)
- Validar cálculo de P&L con datos de prueba.
- Verificar que un trader no pueda acceder a datos de otro broker.
- Confirmar que el endpoint retorna datos correctos para sesiones actuales.

---

## 🎨 Frontend Architecture (Next.js + Tailwind)

### Objetivo
Construir un **widget de snapshot diario** que muestre posiciones, P&L y riesgo en tiempo real.

### Componentes
- **SnapshotWidget**: componente principal que renderiza la información.
- **SnapshotCard**: subcomponente para cada posición.
- **RiskIndicator**: visualización clara del riesgo (alerta >75).
- **Loading/Error States**: manejo de estados de carga y error.

### Flujo de Datos
1. **Carga inicial**: fetch al endpoint `/snapshot`.
2. **Actualización en tiempo real**: conexión WebSocket autenticada y tenant-scoped.
3. **Manejo de reconexión**:
   - Al reconectar, el cliente solicita un **resync completo** del snapshot.
   - Si no se implementa, se documenta que los números pueden quedar obsoletos.
4. **UI/UX**:
   - Dark mode por defecto.
   - Estados de riesgo alto resaltados visualmente.
   - Manejo de cuentas sin actividad o balances nulos.

---

## 🔐 Seguridad & PII

### Autenticación
- **REST**: JWT con `broker_id` embebido en el token.
- **WebSocket**: autenticación al momento de conexión, validando `broker_id`.

### Tenant Isolation
- Aislamiento garantizado en capa de acceso a datos (`WHERE broker_id = ?`).
- Validación en middleware para evitar accesos cruzados.

### PII Handling
- Campos sensibles: nombre, email, teléfono, dirección, tax ID, balances.
- Logs: redacción de PII, solo IDs internos.
- WebSocket: transmitir únicamente datos necesarios (sin PII adicional).

### Vulnerabilidad evitada
- **IDOR (Insecure Direct Object Reference)**: acceso a datos siempre filtrado por `broker_id`.

### Producción (no implementado en prueba)
- Rate limiting en endpoints.
- Audit logging estructurado.
- Redacción automática de PII en logs.
- Columnas sensibles cifradas con KMS.

---

## 🐧 Cómo correr la prueba (Podman)

### Servicios requeridos
- **PostgreSQL**: base de datos principal.
- **NestJS**: backend API.
- **Next.js**: frontend UI.
- **Redis (opcional)**: manejo de sesiones/caching.

### Pasos
1. Instalar Podman en el entorno local.
2. Crear contenedores individuales para:
   - PostgreSQL (con dataset cargado vía `psql \copy` o script).
   - Backend NestJS.
   - Frontend Next.js.
   - Redis (opcional).
3. Cargar dataset desde `README.md` usando scripts de inicialización.
4. Simular fills:
   - Usar opción 1 (endpoint dev) o opción 2 (timer en servidor) según `simulate-fills.md`.
   - Garantizar que el endpoint de simulación no esté disponible en producción.

---

## 📌 Conclusión
Este documento define la arquitectura y diseño conceptual para el assessment de ArrowFin.  
La implementación de código se realizará posteriormente siguiendo estas directrices.
