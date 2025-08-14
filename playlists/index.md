---
layout: page
title: Playlists
permalink: /playlists/
---

Listas de reproducción con tutoriales y clases:

{% for p in site.playlists %}
- [{{ p.title }}]({{ p.url | relative_url }})
{% endfor %}
