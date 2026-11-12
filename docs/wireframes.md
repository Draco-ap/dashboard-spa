# Wireframes de baja fidelidad (solo distribución espacial)

Úsalos como guía para dibujar los frames en Figma (móvil 390 px · escritorio 1440 px).

## Dashboard: móvil
```
┌──────────────────────┐
│ ☰  CloudWatch  ◐  ⚙ │  header fijo
├──────────────────────┤
│ Inicio › Dashboard   │
│ ┌──────────────────┐ │
│ │ CPU        42%   │ │
│ └──────────────────┘ │
│ ┌──────────────────┐ │
│ │ RAM        58%   │ │
│ └──────────────────┘ │
│ ┌──────────────────┐ │
│ │ Red  ~~/\/\~~    │ │
│ └──────────────────┘ │
│ │ Disco │ Tiempo │ … │
└──────────────────────┘
```

## Dashboard: escritorio (Bento Grid)
```
┌──────────────────────────────────────────────┐
│ CloudWatch                         ◐  Config │
├────────┬─────────────────────────────────────┤
│ ▸ Dash │ Inicio › Dashboard                  │
│   Serv │ ┌──────┬──────┬──────────────────┐  │
│   Comp │ │ CPU  │ RAM  │                  │  │
│        │ ├──────┼──────┤   Red (gráfica)  │  │
│        │ │Disco │Uptime│                  │  │
│        │ ├──────┴──────┴──────────────────┤  │
│        │ │ Estado de instancias           │  │
│        │ └────────────────────────────────┘  │
└────────┴─────────────────────────────────────┘
```

## Servidores: móvil
```
┌──────────────────────┐
│ ☰  CloudWatch  ◐  ⚙ │
│ Inicio › Servidores  │
│ [ Buscar...        ] │
│ [ Estado ▾         ] │
│ ┌──────────────────┐ │
│ │ web-01 Alerta ...│→ scroll horizontal
│ │ [Reiniciar][Elim]│ │
│ └──────────────────┘ │
│ [Anterior] 1/3 [Sig] │
└──────────────────────┘
```

## Drawer de configuración (desliza desde la derecha)
```
          ┌──────────────────┐
          │ Configuración  ✕ │
          │ [ Nombre       ] │
          │ [ Descripción  ] │
          │ [ Fecha  📅    ] │
          │ [ Región ▾     ] │
          │ Alertas  (●  )   │
          │ [Cancelar][Guardar]
          └──────────────────┘
```

## Modal de confirmación
```
   ┌────────────────────────────┐
   │ ¿Eliminar web-01?          │
   │ Esta acción no se puede    │
   │ deshacer.                  │
   │        [Cancelar][Eliminar]│
   └────────────────────────────┘
```
