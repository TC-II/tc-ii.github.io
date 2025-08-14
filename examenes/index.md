---
layout: page
title: Exámenes
permalink: /examenes/
---

Exámenes resueltos y enunciados:

{% assign items = site.examenes | sort: 'anio' | reverse %}
{% for e in items %}
- [{{ e.title }}]({{ e.url | relative_url }}) {% if e.anio %}— {{ e.anio }}{% endif %} {% if e.turno %}({{ e.turno }}){% endif %}
{% endfor %}
