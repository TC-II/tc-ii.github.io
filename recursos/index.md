---
layout: page
title: Recursos
permalink: /recursos/
---

Herramientas y enlaces útiles:

{% for r in site.recursos %}
- [{{ r.title }}]({{ r.url | relative_url }}) {% if r.tipo %}— {{ r.tipo }}{% endif %}
{% endfor %}
