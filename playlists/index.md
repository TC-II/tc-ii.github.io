---
layout: page
title: Playlists
extra_css:
  - /assets/css/playlists.css
---

<section class="playlists container after-header">
  <p class="text-dim" style="margin:.25rem 0 1rem">
    Colecciones de clases y materiales. Se reproducen directo en el sitio.
  </p>

  {%- assign candidates = site.pages | where_exp: "p", "p.url contains '/playlists/' and p.url != '/playlists/'" -%}
  {%- assign items = "" | split: "" -%}
  {%- for p in candidates -%}
    {%- if p.layout == 'playlist_item' or p.tipo == 'Playlist' -%}
      {%- assign items = items | push: p -%}
    {%- endif -%}
  {%- endfor -%}

  {%- assign items = items | sort: 'date' | reverse -%}

  {%- if items == empty -%}
    <div class="pl-card"><p class="pl-desc">Todavía no hay playlists cargadas.</p></div>
  {%- else -%}
    <div class="pl-grid">
      {%- for it in items -%}
        {%- assign cover = it.cover_id | default: it.start_video_id -%}
        {%- if cover == nil and it.videos and it.videos.size > 0 -%}
          {%- assign cover = it.videos[0].id -%}
        {%- endif -%}
        {% include playlist.html
           title=it.title
           desc=it.desc
           url=it.url
           cover_id=cover %}
      {%- endfor -%}
    </div>
  {%- endif -%}
</section>
