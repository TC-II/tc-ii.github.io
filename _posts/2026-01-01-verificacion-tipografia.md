---
layout: post
title: "Verificación de tipografía y matemática"
date: 2026-01-01
author: Cátedra
toc: true
published: false
tags: [interno, verificación]
---

Página interna de control. Sirve para verificar de un vistazo la escala
tipográfica, el ancho de medida, el TOC y el renderizado de KaTeX.
No está publicada: `published: false`.

## Texto corrido

Un párrafo largo para comprobar que `--measure` corta la línea en un ancho
cómodo de leer y que el interlineado `--lh-normal` deja respirar al texto. La
impedancia de un circuito serie RLC depende de la frecuencia, y su módulo
alcanza un mínimo en resonancia, donde las reactancias inductiva y capacitiva
se cancelan mutuamente y solo queda la parte resistiva.

### Matemática en línea

La impedancia se escribe $Z = R + jX$, con reactancia
$X = \omega L - \frac{1}{\omega C}$.

### Matemática en bloque

$$
Z(\omega) = R + j\left(\omega L - \frac{1}{\omega C}\right)
$$

$$
\omega_0 = \frac{1}{\sqrt{LC}}
\qquad
Q = \frac{1}{R}\sqrt{\frac{L}{C}}
$$

Una ecuación deliberadamente larga, para verificar que en pantallas chicas
hace scroll horizontal dentro de su propio contenedor en vez de romper el
viewport:

$$
H(j\omega) = \frac{V_{\text{out}}}{V_{\text{in}}} = \frac{\frac{1}{j\omega C}}{R + j\omega L + \frac{1}{j\omega C}} = \frac{1}{1 - \omega^2 LC + j\omega RC} = \frac{\omega_0^2}{\omega_0^2 - \omega^2 + j\,\omega\,\omega_0/Q}
$$

## Código

Un bloque de código, para confirmar que la monoespaciada y el fondo funcionan:

```python
import numpy as np

def impedancia(R, L, C, w):
    return R + 1j * (w * L - 1 / (w * C))
```

Y `código en línea` dentro de un párrafo.

## Cita

> El material presentado es complementario a lo dictado en clase y no busca
> abarcar la totalidad del contenido.

## Tabla

| Componente | Impedancia      | Fase   |
|------------|-----------------|--------|
| Resistor   | $R$             | 0°     |
| Inductor   | $j\omega L$     | +90°   |
| Capacitor  | $1/j\omega C$   | −90°   |
