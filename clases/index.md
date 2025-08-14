---
layout: page
title: Clases
permalink: /clases/
---

Material de clases (apuntes, slides, ejemplos):

{% for c in site.clases %}
- [{{ c.title }}]({{ c.url | relative_url }}) {% if c.fecha %}— {{ c.fecha | date: "%d/%m/%Y" }}{% endif %}
{% endfor %}
