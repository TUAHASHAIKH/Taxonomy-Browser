window.TaxonomyApp = (function() {
  const state = {
    data: null,
    selectedCategoryId: null,
    selectedSubcategoryId: null,
    selectedMethodId: null,
    selectedArtistId: null
  };

  async function loadData() {
    // Try absolute UI path first; then relative; then project root
    const paths = [
      '/ui/data/taxonomy-data.json',
      'data/taxonomy-data.json',
      '../taxonomy-data.json'
    ];
    for (const p of paths) {
      try {
        const res = await fetch(p);
        if (!res.ok) continue;
        try {
          return await res.json();
        } catch (parseErr) {
          console.warn(`Failed to parse JSON from ${p}:`, parseErr);
          continue;
        }
      } catch (e) {
        // try next path
        continue;
      }
    }
    throw new Error('Failed to load taxonomy-data.json');
  }

  function $(id) { return document.getElementById(id); }

  function renderMeta() {
    const meta = state.data.metadata || {};
    const parts = [];
    if (meta.version) parts.push(`v${meta.version}`);
    if (meta.lastUpdated) parts.push(new Date(meta.lastUpdated).toLocaleString());
    $("meta").textContent = parts.join(' • ');
  }

  function renderCategories() {
    const container = $("categories");
    container.innerHTML = '';
    const list = document.createElement('div');
    list.className = 'list';
    (state.data.categories || []).forEach(cat => {
      const item = document.createElement('div');
      item.className = 'item' + (state.selectedCategoryId === cat.id ? ' selected' : '');
      item.innerHTML = `<div class="title">${cat.name}</div>`;
      item.onclick = () => selectCategory(cat.id);
      list.appendChild(item);
    });
    container.appendChild(list);
  }

  function updateHash() {
    const parts = [];
    if (state.selectedCategoryId) parts.push(state.selectedCategoryId);
    if (state.selectedSubcategoryId) parts.push(state.selectedSubcategoryId);
    if (state.selectedMethodId) parts.push(state.selectedMethodId);
    if (state.selectedArtistId) parts.push(state.selectedArtistId);
    const hash = '#/' + parts.map(encodeURIComponent).join('/');
    if (window.location.hash !== hash) {
      window.location.hash = hash;
    }
  }

  function selectCategory(categoryId, suppressHash = false) {
    state.selectedCategoryId = categoryId;
    state.selectedSubcategoryId = null;
    state.selectedMethodId = null;
    state.selectedArtistId = null;
    renderCategories();
    renderSubcategories();
    renderMethods();
    renderDetails();
    if (!suppressHash) updateHash();
  }

  function getSelectedCategory() {
    return (state.data.categories || []).find(c => c.id === state.selectedCategoryId) || null;
  }

  function renderSubcategories() {
    const cat = getSelectedCategory();
    const container = $("subcategories");
    const header = $("subcat-header");
    container.innerHTML = '';
    if (!cat) { header.textContent = 'Subcategories'; return; }
    header.textContent = `${cat.name} — Subcategories`;
    const list = document.createElement('div');
    list.className = 'list';
    (cat.subcategories || []).forEach(sc => {
      const item = document.createElement('div');
      item.className = 'item' + (state.selectedSubcategoryId === sc.id ? ' selected' : '');
      const count = sc.methodCount != null ? `<span class="badge">${sc.methodCount}</span>` : '';
      item.innerHTML = `<div class="title">${sc.name}</div><div class="subtitle">${count}</div>`;
      item.onclick = () => selectSubcategory(sc.id);
      list.appendChild(item);
    });
    container.appendChild(list);
  }

  function selectSubcategory(subcategoryId, suppressHash = false) {
    state.selectedSubcategoryId = subcategoryId;
    state.selectedMethodId = null;
    state.selectedArtistId = null;
    renderSubcategories();
    renderMethods();
    renderDetails();
    if (!suppressHash) updateHash();
  }

  function getSelectedSubcategory() {
    const cat = getSelectedCategory();
    if (!cat) return null;
    return (cat.subcategories || []).find(s => s.id === state.selectedSubcategoryId) || null;
  }

  function renderMethods() {
    const container = $("methods");
    const header = $("methods-header");
    container.innerHTML = '';
    const sc = getSelectedSubcategory();
    if (!sc) { header.textContent = 'Methods'; return; }
    header.textContent = `${sc.name} — Methods`;
    const list = document.createElement('div');
    list.className = 'list';
    (sc.methods || []).forEach(m => {
      const item = document.createElement('div');
      item.className = 'item method' + (state.selectedMethodId === m.id ? ' selected' : '');
      const status = m.status === 'active' ? 'success' : (m.status === 'development' ? 'warn' : 'muted');
      const artistCount = typeof m.artistCount === 'number' ? m.artistCount : (m.artists ? m.artists.length : 0);
      item.innerHTML = `
        <div>
          <div class="title">${m.name}</div>
          <div class="subtitle">${m.description || ''}</div>
        </div>
        <div class="right">
          <span class="badge ${status}">${m.status || 'unknown'}</span>
          <span class="badge">${artistCount} artists</span>
        </div>`;
      item.onclick = () => selectMethod(m.id);
      list.appendChild(item);
    });
    container.appendChild(list);
  }

  function getSelectedMethod() {
    const sc = getSelectedSubcategory();
    if (!sc) return null;
    return (sc.methods || []).find(m => m.id === state.selectedMethodId) || null;
  }

  function selectMethod(methodId, suppressHash = false) {
    state.selectedMethodId = methodId;
    state.selectedArtistId = null;
    renderMethods();
    renderDetails();
    if (!suppressHash) updateHash();
  }

  function selectArtist(artistId, suppressHash = false) {
    state.selectedArtistId = artistId;
    renderDetails();
    if (!suppressHash) updateHash();
  }

  function renderDetails() {
    const container = $("details");
    const header = $("details-header");
    container.innerHTML = '';
    const method = getSelectedMethod();
    if (!method) { header.textContent = 'Details'; container.innerHTML = '<div class="empty">Select a method to see details.</div>'; return; }
    header.textContent = method.name;

    const grid = document.createElement('div');
    grid.className = 'details';

    // Left: artist list (and groups)
    const left = document.createElement('div');
    const artistList = document.createElement('div');
    artistList.className = 'list';

    // Build display list, optionally inserting grouped Edge Definition after Daumier
    const rawArtists = (method.artists || []);
    const displayItems = [];
    const edgeGroup = { type: 'group', id: 'group:edge-definition', title: 'Edge Definition', artistIds: ['durer', 'haynes'] };
    rawArtists.forEach(a => {
      if (method.id === 'line-weight') {
        // Skip individual Edge Definition variants
        if (a.id === 'durer' || a.id === 'haynes') {
          // defer to group
          return;
        }
        displayItems.push(a);
        // insert group immediately after Daumier
        if (a.id === 'daumier') {
          displayItems.push(edgeGroup);
        }
      } else {
        displayItems.push(a);
      }
    });

    displayItems.forEach(itemData => {
      if (itemData.type === 'group') {
        const item = document.createElement('div');
        const isSelected = state.selectedArtistId === itemData.id;
        item.className = 'item' + (isSelected ? ' selected' : '');
        item.innerHTML = `<div class="title">${itemData.title}</div><div class=\"subtitle\">shows ${itemData.artistIds.length} variants</div>`;
        item.onclick = () => selectArtist(itemData.id);
        artistList.appendChild(item);
        return;
      }
      const a = itemData;
      const item = document.createElement('div');
      item.className = 'item' + (state.selectedArtistId === a.id ? ' selected' : '');
      item.innerHTML = `<div class="title">${a.title || a.name}</div><div class="subtitle">${(a.keywords || []).join(', ')}</div>`;
      item.onclick = () => selectArtist(a.id);
      artistList.appendChild(item);
    });
    left.appendChild(artistList);

    // Right: details panel (render selected artist or group)
    const right = document.createElement('div');
    const content = document.createElement('div');
    content.className = 'section';

    const renderArtist = (artistObj) => {
      const kws = (artistObj.keywords || []).map(k => `<span class="keyword">${k}</span>`).join('');
      const refs = (artistObj.references || []).map(r => `<div>• <a href="/${r.path}" target="_blank" rel="noopener">${r.filename}</a></div>`).join('');
      // Media: render first gif/image if available from references
      let mediaHtml = '';
      const gifRef = (artistObj.references || []).find(r => (r.type === 'gif' || (r.filename||'').toLowerCase().endsWith('.gif')));
      const imgRef = (artistObj.references || []).find(r => (r.type === 'image' || /(png|jpg|jpeg|webp)$/i.test((r.filename||''))))
      if (gifRef) {
        mediaHtml = `<div class="media"><img src="/${gifRef.path}" alt="${artistObj.title || artistObj.name}"></div>`;
      } else if (imgRef) {
        mediaHtml = `<div class="media"><img src="/${imgRef.path}" alt="${artistObj.title || artistObj.name}"></div>`;
      }

      return `
        <div class="section"><h3>${artistObj.title || artistObj.name}</h3></div>
        <div class="section"><strong>Method</strong><div>${artistObj.description || ''}</div></div>
        <div class="section"><strong>Keywords</strong><div class="keywords">${kws}</div></div>
        ${mediaHtml}
        <div class="section"><strong>References</strong><div class="refs">${refs || '—'}</div></div>
        <hr/>
      `;
    };

    const isGroupSelection = typeof state.selectedArtistId === 'string' && state.selectedArtistId.startsWith('group:');
    if (isGroupSelection && state.selectedArtistId === 'group:edge-definition' && method.id === 'line-weight') {
      // Render all artists in the group stacked
      const artistsById = Object.fromEntries((method.artists || []).map(a => [a.id, a]));
      content.innerHTML = ['durer','haynes']
        .map(id => artistsById[id])
        .filter(Boolean)
        .map(renderArtist)
        .join('');
    } else {
      const a = (method.artists || []).find(x => x.id === state.selectedArtistId) || (method.artists || [])[0];
      if (a) {
        content.innerHTML = renderArtist(a);
      } else {
        content.innerHTML = '<div class="empty">No artist examples.</div>';
      }
    }

    right.appendChild(content);

    grid.appendChild(left);
    grid.appendChild(right);
    container.appendChild(grid);
  }

  function parseHashAndNavigate() {
    const h = (window.location.hash || '').replace(/^#\/?/, '');
    if (!h) return false;
    const parts = h.split('/').map(decodeURIComponent);
    const [cat, sub, method, artist] = parts;
    if (!cat) return false;
    // Apply with hash suppression to avoid loops
    selectCategory(cat, true);
    if (sub) selectSubcategory(sub, true);
    if (method) selectMethod(method, true);
    if (artist) selectArtist(artist, true);
    return true;
  }

  async function init() {
    try {
      state.data = await loadData();
    } catch (e) {
      console.error(e);
      const root = document.querySelector('.layout');
      if (root) {
        root.innerHTML = '<div class="empty">Failed to load data. Make sure /ui/data/taxonomy-data.json exists. </div>';
      }
      return;
    }
    renderMeta();
    // Try deep-link from hash; fallback to first items
    const applied = parseHashAndNavigate();
    if (!applied) {
      const firstCat = (state.data.categories || [])[0];
      state.selectedCategoryId = firstCat ? firstCat.id : null;
      const firstSub = firstCat && (firstCat.subcategories || [])[0];
      state.selectedSubcategoryId = firstSub ? firstSub.id : null;
      renderCategories();
      renderSubcategories();
      renderMethods();
      renderDetails();
      updateHash();
    }

    window.addEventListener('hashchange', () => {
      parseHashAndNavigate();
    });
  }

  return { init };
})();


