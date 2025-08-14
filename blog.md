---
layout: page
title: Blog
permalink: /blog/
---

{% assign posts_sorted = site.posts | sort: 'date' | reverse %}
{% for post in posts_sorted %}
- [{{ post.title }}]({{ post.url | relative_url }}) — {{ post.date | date: "%d/%m/%Y" }}
{% endfor %}
