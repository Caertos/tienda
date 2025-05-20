# ✅ Checklist – App para Tienda de Barrio

## 🛠️ Configuración inicial
- [X] Instalar Node.js y Expo CLI
- [X] Crear el proyecto con `expo init tienda`
- [X] Ejecutar `expo start` y abrir la app en el celular (Expo Go)
- [X] Probar navegación entre pantallas básicas

## 📦 Base de datos local (SQLite)
- [X] Crear base de datos y conectar al backend
- [X] Crear tabla `cliente`
- [X] Crear tabla `pedido` (estructura correcta con monto_total)
- [X] Crear tabla `pago`
- [X] Probar inserción y consulta básica de datos
- [ ] Verificar que se mantiene al reiniciar la app

## 👤 Gestión de clientes
- [ ] Pantalla: crear cliente nuevo
- [ ] Lista de clientes con búsqueda
- [ ] Ver detalle del cliente (saldo, pedidos, pagos)

## 🛒 Registro de pedidos
- [ ] Pantalla para crear un nuevo pedido
- [ ] Celdas libres para descripción y monto
- [ ] Sumar automáticamente al estado de cuenta
- [ ] Mostrar confirmación tras guardar

## 💳 Registro de pagos
- [ ] Pantalla para agregar un pago
- [ ] Restar automáticamente del estado de cuenta
- [ ] Validar que no se ingresen pagos negativos o vacíos

## 🧾 Impresión de recibo
- [ ] Selección de impresora Bluetooth
- [ ] Función `imprimirRecibo` lista
- [ ] Impresión automática al guardar pedido
- [ ] Manejo de errores de impresora (sin papel, sin conexión)
- [ ] Ticket legible con fuente grande

## 🗂️ Historial de recibos
- [ ] Crear tabla `recibo` en SQLite
- [ ] Registrar cada impresión (estado ok/error)
- [ ] Pantalla con lista de recibos
- [ ] Función para reimprimir recibo desde historial

## 👓 Accesibilidad y usabilidad
- [ ] Aumentar tamaño de letra (mínimo 12pt)
- [ ] Probar visibilidad en celular con luz del día
- [ ] Íconos grandes, botones separados
- [ ] Flujo sencillo y directo (1–2 pasos por acción)

## 🧪 Pruebas y ajustes
- [ ] Pruebas en Android real con impresora Bluetooth
- [ ] Simular pérdida de conexión con impresora
- [ ] Probar sin internet (modo offline)
- [ ] Validar que la app no se trabe o cierre
- [ ] Corregir errores encontrados

## 🚀 Preparación para entrega
- [ ] Generar APK para instalación manual
- [ ] Crear guía simple de instalación y uso
- [ ] Prueba completa con un usuario real (el tendero)
- [ ] Entregar copia de seguridad del proyecto
