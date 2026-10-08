'use client';

import Link from 'next/link';
import {
  ArrowRight,
  Bell,
  CirclesFour,
  House,
  MagnifyingGlass,
  Plus,
  Square,
  TextT,
  User,
} from '@phosphor-icons/react';
import { useDeferredValue, useMemo, useState } from 'react';

import {
  CATEGORIES,
  COMPONENTS,
  type ComponentCategory,
  type PreviewKind,
} from './components-catalog';
import { SiteNav } from './site-nav';
import s from './page.module.css';

function normalize(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

function Preview({ kind }: { kind: PreviewKind }) {
  if (kind === 'btn') {
    return (
      <>
        <span className={s.fakeBtnSolid}>
          <Plus weight="thin" size={14} />
          Aceptar
        </span>
        <span className={s.fakeBtnOutline}>Aceptar</span>
        <span className={s.fakeBtnGhost}>Aceptar</span>
      </>
    );
  }
  if (kind === 'pag') {
    return (
      <>
        <span className={s.fakePage}>1</span>
        <span className={`${s.fakePage} ${s.fakePageActive}`}>2</span>
        <span className={s.fakePage}>3</span>
        <span className={s.fakePage}>4</span>
      </>
    );
  }
  if (kind === 'type') {
    return (
      <div className={s.fakeType}>
        <span className={s.fakeTypeH}>Aa</span>
        <span className={s.fakeTypeLines}>
          <span />
          <span />
          <span />
        </span>
      </div>
    );
  }
  if (kind === 'color') {
    return (
      <div className={s.fakeColors}>
        <span style={{ background: '#9F2141' }} />
        <span style={{ background: '#BC945A' }} />
        <span style={{ background: '#1F8A55' }} />
        <span style={{ background: '#D0921A' }} />
      </div>
    );
  }
  if (kind === 'icon') {
    return (
      <div className={s.fakeIcons}>
        <House weight="thin" size={22} />
        <User weight="thin" size={22} />
        <Bell weight="thin" size={22} />
        <MagnifyingGlass weight="thin" size={22} />
      </div>
    );
  }
  if (kind === 'shell') {
    return (
      <div className={s.fakeShell} aria-hidden="true">
        <span className={s.fakeShellSide} />
        <span className={s.fakeShellMain}>
          <span className={s.fakeShellTop} />
          <span className={s.fakeShellBody} />
        </span>
      </div>
    );
  }
  if (kind === 'sidebar') {
    return (
      <div className={s.fakeSidebar} aria-hidden="true">
        <span className={s.fakeSidebarBrand} />
        <span className={s.fakeSidebarItemActive} />
        <span className={s.fakeSidebarItem} />
        <span className={s.fakeSidebarItem} />
        <span className={s.fakeSidebarItem} />
      </div>
    );
  }
  if (kind === 'topbar') {
    return (
      <div className={s.fakeTopbar} aria-hidden="true">
        <span className={s.fakeTopbarTitle} />
        <span className={s.fakeTopbarSearch} />
        <span className={s.fakeTopbarActions}>
          <i />
          <i />
        </span>
      </div>
    );
  }
  if (kind === 'page-header') {
    return (
      <div className={s.fakePageHeader} aria-hidden="true">
        <span className={s.fakePageHeaderCrumbs} />
        <span className={s.fakePageHeaderRow}>
          <span className={s.fakePageHeaderTitle} />
          <span className={s.fakePageHeaderActions}>
            <i />
            <i />
          </span>
        </span>
        <span className={s.fakePageHeaderDesc} />
      </div>
    );
  }
  if (kind === 'breadcrumb') {
    return (
      <div className={s.fakeBreadcrumb} aria-hidden="true">
        <span className={s.fakeBreadcrumbItem} />
        <i>/</i>
        <span className={s.fakeBreadcrumbItem} />
        <i>/</i>
        <span className={`${s.fakeBreadcrumbItem} ${s.fakeBreadcrumbCurrent}`} />
      </div>
    );
  }
  if (kind === 'container') {
    return (
      <div className={s.fakeContainer} aria-hidden="true">
        <span className={s.fakeContainerRail} />
        <span className={s.fakeContainerBody} />
      </div>
    );
  }
  if (kind === 'grid') {
    return (
      <div className={s.fakeGrid} aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
      </div>
    );
  }
  if (kind === 'divider') {
    return (
      <div className={s.fakeDivider} aria-hidden="true">
        <span className={s.fakeDividerLine} />
        <i>o</i>
        <span className={s.fakeDividerLine} />
      </div>
    );
  }
  if (kind === 'spacer') {
    return (
      <div className={s.fakeSpacer} aria-hidden="true">
        <span className={s.fakeSpacerBlock} />
        <span className={s.fakeSpacerGap} />
        <span className={s.fakeSpacerBlock} />
      </div>
    );
  }
  if (kind === 'kpi-card') {
    return (
      <div className={s.fakeKpi} aria-hidden="true">
        <span className={s.fakeKpiLabel} />
        <span className={s.fakeKpiValue} />
        <span className={s.fakeKpiTrend} />
      </div>
    );
  }
  if (kind === 'chart-card') {
    return (
      <div className={s.fakeChart} aria-hidden="true">
        <span className={s.fakeChartTitle} />
        <span className={s.fakeChartBars}>
          <i style={{ height: '40%' }} />
          <i style={{ height: '70%' }} />
          <i style={{ height: '55%' }} />
          <i style={{ height: '85%' }} />
        </span>
      </div>
    );
  }
  if (kind === 'tabla') {
    return (
      <div className={s.fakeTable} aria-hidden="true">
        <span className={s.fakeTableHead} />
        <span className={s.fakeTableRow} />
        <span className={s.fakeTableRow} />
        <span className={s.fakeTableRow} />
      </div>
    );
  }
  if (kind === 'data-grid') {
    return (
      <div className={s.fakeDataGrid} aria-hidden="true">
        <span className={s.fakeDataGridFilters} />
        <span className={s.fakeTableHead} />
        <span className={s.fakeTableRow} />
        <span className={s.fakeTableRow} />
        <span className={s.fakeTableRow} />
      </div>
    );
  }
  if (kind === 'filter-bar') {
    return (
      <div className={s.fakeFilterBar} aria-hidden="true">
        <span className={s.fakeFilterSearch} />
        <i />
        <i />
        <b />
      </div>
    );
  }
  if (kind === 'toolbar') {
    return (
      <div className={s.fakeToolbar} aria-hidden="true">
        <span className={s.fakeToolbarTitle} />
        <i />
        <i />
        <b />
      </div>
    );
  }
  if (kind === 'list') {
    return (
      <div className={s.fakeList} aria-hidden="true">
        <span className={s.fakeListRow}>
          <i />
          <b />
        </span>
        <span className={s.fakeListRow}>
          <i />
          <b />
        </span>
        <span className={s.fakeListRow}>
          <i />
          <b />
        </span>
      </div>
    );
  }
  if (kind === 'timeline') {
    return (
      <div className={s.fakeTimeline} aria-hidden="true">
        <span className={s.fakeTimelineRow}>
          <i />
          <b />
        </span>
        <span className={s.fakeTimelineRow}>
          <i />
          <b />
        </span>
        <span className={s.fakeTimelineRow}>
          <i />
          <b />
        </span>
      </div>
    );
  }
  if (kind === 'activity-feed') {
    return (
      <div className={s.fakeActivity} aria-hidden="true">
        <span className={s.fakeActivityRow}>
          <i />
          <b />
        </span>
        <span className={s.fakeActivityRow}>
          <i />
          <b />
        </span>
        <span className={s.fakeActivityRow}>
          <i />
          <b />
        </span>
      </div>
    );
  }
  if (kind === 'empty-state') {
    return (
      <div className={s.fakeEmpty} aria-hidden="true">
        <i />
        <b />
        <span />
      </div>
    );
  }
  if (kind === 'skeleton') {
    return (
      <div className={s.fakeSkeleton} aria-hidden="true">
        <i />
        <b />
        <span />
        <em />
      </div>
    );
  }
  if (kind === 'progress') {
    return (
      <div className={s.fakeProgress} aria-hidden="true">
        <b />
        <i />
      </div>
    );
  }
  if (kind === 'spinner') {
    return (
      <div className={s.fakeSpinner} aria-hidden="true">
        <i />
        <b />
      </div>
    );
  }
  if (kind === 'input') {
    return (
      <div className={s.fakeInput} aria-hidden="true">
        <b />
        <i />
      </div>
    );
  }
  if (kind === 'textarea') {
    return (
      <div className={s.fakeTextarea} aria-hidden="true">
        <b />
        <i />
        <i />
        <i />
      </div>
    );
  }
  if (kind === 'select') {
    return (
      <div className={s.fakeSelect} aria-hidden="true">
        <b />
        <i>
          <span />
        </i>
      </div>
    );
  }
  if (kind === 'combobox') {
    return (
      <div className={s.fakeCombobox} aria-hidden="true">
        <b />
        <i>
          <em />
          <span />
        </i>
      </div>
    );
  }
  if (kind === 'checkbox') {
    return (
      <div className={s.fakeCheckbox} aria-hidden="true">
        <i />
        <b />
      </div>
    );
  }
  if (kind === 'radio') {
    return (
      <div className={s.fakeRadio} aria-hidden="true">
        <i />
        <b />
      </div>
    );
  }
  if (kind === 'switch') {
    return (
      <div className={s.fakeSwitch} aria-hidden="true">
        <i>
          <em />
        </i>
        <b />
      </div>
    );
  }
  if (kind === 'datepicker') {
    return (
      <div className={s.fakeDatepicker} aria-hidden="true">
        <b />
        <i />
      </div>
    );
  }
  if (kind === 'timepicker') {
    return (
      <div className={s.fakeTimepicker} aria-hidden="true">
        <b />
        <i />
      </div>
    );
  }
  if (kind === 'file-upload') {
    return (
      <div className={s.fakeFileUpload} aria-hidden="true">
        <i />
        <b />
      </div>
    );
  }
  if (kind === 'slider') {
    return (
      <div className={s.fakeSlider} aria-hidden="true">
        <i>
          <em />
        </i>
      </div>
    );
  }
  if (kind === 'search-field') {
    return (
      <div className={s.fakeSearch} aria-hidden="true">
        <i />
        <b />
      </div>
    );
  }
  if (kind === 'form-field') {
    return (
      <div className={s.fakeFormField} aria-hidden="true">
        <em />
        <b />
        <i />
      </div>
    );
  }
  if (kind === 'form') {
    return (
      <div className={s.fakeForm} aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
      </div>
    );
  }
  if (kind === 'tabs') {
    return (
      <div className={s.fakeTabs} aria-hidden="true">
        <i />
        <b />
        <em />
      </div>
    );
  }
  if (kind === 'steps') {
    return (
      <div className={s.fakeSteps} aria-hidden="true">
        <i />
        <b />
        <em />
        <span />
      </div>
    );
  }
  if (kind === 'nav-menu') {
    return (
      <div className={s.fakeNavMenu} aria-hidden="true">
        <i />
        <b />
        <em />
      </div>
    );
  }
  if (kind === 'pagination-bar') {
    return (
      <div className={s.fakePaginationBar} aria-hidden="true">
        <em />
        <i />
        <b />
        <span />
      </div>
    );
  }
  if (kind === 'link') {
    return (
      <div className={s.fakeLink} aria-hidden="true">
        <i />
        <b />
      </div>
    );
  }
  if (kind === 'segmented') {
    return (
      <div className={s.fakeSegmented} aria-hidden="true">
        <i />
        <b />
        <em />
      </div>
    );
  }
  if (kind === 'icon-button') {
    return (
      <div className={s.fakeIconButton} aria-hidden="true">
        <i />
        <b />
        <em />
      </div>
    );
  }
  if (kind === 'button-group') {
    return (
      <div className={s.fakeButtonGroup} aria-hidden="true">
        <i />
        <b />
        <em />
      </div>
    );
  }
  if (kind === 'dropdown-menu') {
    return (
      <div className={s.fakeDropdownMenu} aria-hidden="true">
        <i />
        <b />
        <em />
        <span />
      </div>
    );
  }
  if (kind === 'split-button') {
    return (
      <div className={s.fakeSplitButton} aria-hidden="true">
        <i />
        <b />
      </div>
    );
  }
  if (kind === 'fab') {
    return (
      <div className={s.fakeFab} aria-hidden="true">
        <i />
      </div>
    );
  }
  if (kind === 'alert') {
    return (
      <div className={s.fakeAlert} aria-hidden="true">
        <i />
        <b />
        <em />
      </div>
    );
  }
  if (kind === 'toast') {
    return (
      <div className={s.fakeToast} aria-hidden="true">
        <i />
        <b />
        <em />
      </div>
    );
  }
  if (kind === 'banner') {
    return (
      <div className={s.fakeBanner} aria-hidden="true">
        <b />
        <em />
        <i />
      </div>
    );
  }
  if (kind === 'badge') {
    return (
      <div className={s.fakeBadge} aria-hidden="true">
        <i />
        <b />
        <em />
      </div>
    );
  }
  if (kind === 'tag') {
    return (
      <div className={s.fakeTag} aria-hidden="true">
        <i />
        <b />
      </div>
    );
  }
  if (kind === 'tooltip') {
    return (
      <div className={s.fakeTooltip} aria-hidden="true">
        <i />
        <b />
      </div>
    );
  }
  if (kind === 'helper-text') {
    return (
      <div className={s.fakeHelperText} aria-hidden="true">
        <i />
        <b />
        <em />
      </div>
    );
  }
  if (kind === 'modal') {
    return (
      <div className={s.fakeModal} aria-hidden="true">
        <i />
        <b />
        <em />
        <span />
      </div>
    );
  }
  if (kind === 'drawer') {
    return (
      <div className={s.fakeDrawer} aria-hidden="true">
        <i />
        <b />
        <em />
        <span />
      </div>
    );
  }
  if (kind === 'popover') {
    return (
      <div className={s.fakePopover} aria-hidden="true">
        <i />
        <b />
      </div>
    );
  }
  if (kind === 'sheet') {
    return (
      <div className={s.fakeSheet} aria-hidden="true">
        <i />
        <b />
        <em />
        <span />
      </div>
    );
  }
  if (kind === 'confirm-dialog') {
    return (
      <div className={s.fakeConfirm} aria-hidden="true">
        <i />
        <b />
        <em />
        <span />
      </div>
    );
  }
  if (kind === 'card') {
    return (
      <div className={s.fakeCard} aria-hidden="true">
        <i />
        <b />
        <em />
      </div>
    );
  }
  if (kind === 'avatar') {
    return (
      <div className={s.fakeAvatar} aria-hidden="true">
        <i />
        <b />
        <em />
      </div>
    );
  }
  if (kind === 'user-menu') {
    return (
      <div className={s.fakeUserMenu} aria-hidden="true">
        <i />
        <b />
        <em />
      </div>
    );
  }
  if (kind === 'accordion') {
    return (
      <div className={s.fakeAccordion} aria-hidden="true">
        <i />
        <b />
        <em />
      </div>
    );
  }
  if (kind === 'content-section') {
    return (
      <div className={s.fakeContentSection} aria-hidden="true">
        <i />
        <b />
        <em />
      </div>
    );
  }
  if (kind === 'hero-block') {
    return (
      <div className={s.fakeHeroBlock} aria-hidden="true">
        <i />
        <b />
        <em />
      </div>
    );
  }
  if (kind === 'footer') {
    return (
      <div className={s.fakeFooter} aria-hidden="true">
        <i />
        <b />
        <em />
      </div>
    );
  }
  if (kind === 'table-of-contents') {
    return (
      <div className={s.fakeToc} aria-hidden="true">
        <i />
        <b />
        <em />
      </div>
    );
  }
  if (kind === 'code-block') {
    return (
      <div className={s.fakeCodeBlock} aria-hidden="true">
        <i />
        <b />
        <em />
      </div>
    );
  }
  if (kind === 'stat-strip') {
    return (
      <div className={s.fakeStatStrip} aria-hidden="true">
        <i />
        <b />
        <em />
      </div>
    );
  }
  if (kind === 'notification-center') {
    return (
      <div className={s.fakeNotificationCenter} aria-hidden="true">
        <i />
        <b />
        <em />
      </div>
    );
  }
  if (kind === 'command-palette') {
    return (
      <div className={s.fakeCommandPalette} aria-hidden="true">
        <i />
        <b />
        <em />
      </div>
    );
  }
  return (
    <div className={s.fakeSoon}>
      <CirclesFour weight="thin" size={28} />
      <Square weight="thin" size={28} />
      <TextT weight="thin" size={28} />
    </div>
  );
}

export default function HomePage() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<ComponentCategory | 'all'>('all');
  const deferredQuery = useDeferredValue(query);

  const filtered = useMemo(() => {
    const q = normalize(deferredQuery);
    return COMPONENTS.filter((item) => {
      if (category !== 'all' && item.category !== category) return false;
      if (!q) return true;
      const haystack = normalize(
        [item.name, item.description, item.category, ...item.tags].join(' '),
      );
      return haystack.includes(q);
    });
  }, [deferredQuery, category]);

  const readyCount = filtered.filter((item) => item.status === 'ready').length;

  return (
    <div className={s.page}>
      <SiteNav active="componentes" />

      <main className={s.shell}>
        <header className={s.hero}>
          <p className={s.eyebrow}>Sistema de diseno</p>
          <h1 className={s.title}>Gob UI</h1>
          <p className={s.lead}>
            Catalogo para dashboards y paginas web. Filtra, elige uno y lo
            desarrollamos poco a poco.
          </p>
        </header>

        <section id="componentes" className={s.section} aria-label="Componentes">
          <div className={s.toolbar}>
            <div className={s.toolbarHead}>
              <div className={s.sectionHead}>
                <h2 className={s.sectionTitle}>Componentes</h2>
                <p className={s.sectionDesc}>
                  {filtered.length} de {COMPONENTS.length}
                  {query || category !== 'all' ? '' : ` · ${readyCount} listos`}
                </p>
              </div>

              <label className={s.search}>
                <MagnifyingGlass weight="thin" size={18} aria-hidden />
                <input
                  className={s.searchInput}
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Buscar componente..."
                  aria-label="Buscar componente"
                />
              </label>
            </div>

            <div className={s.catRow} role="tablist" aria-label="Categorias">
              {CATEGORIES.map((item) => {
                const active = item.id === category;
                return (
                  <button
                    key={item.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    className={`${s.catChip} ${active ? s.catChipActive : ''}`}
                    onClick={() => setCategory(item.id)}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>

          {filtered.length === 0 ? (
            <p className={s.empty}>
              No hay coincidencias. Prueba con dashboard, form o modal.
            </p>
          ) : (
            <div className={s.grid}>
              {filtered.map((item, index) => {
                const body = (
                  <>
                    <div className={s.cardPreview} aria-hidden="true">
                      <Preview kind={item.preview} />
                      {item.status === 'soon' ? <span className={s.soonBadge}>Pronto</span> : null}
                    </div>
                    <div className={s.cardBody}>
                      <p className={s.cardCat}>{item.category}</p>
                      <h3 className={s.cardTitle}>{item.name}</h3>
                      <p className={s.cardDesc}>{item.description}</p>
                      {item.status === 'ready' ? (
                        <span className={s.cardCta}>
                          Abrir
                          <ArrowRight weight="thin" size={14} />
                        </span>
                      ) : (
                        <span className={s.cardSoon}>En roadmap</span>
                      )}
                    </div>
                  </>
                );

                if (item.status === 'ready' && item.href) {
                  return (
                    <Link
                      key={item.id}
                      href={item.href}
                      className={s.card}
                      style={{ animationDelay: `${30 + Math.min(index, 12) * 25}ms` }}
                    >
                      {body}
                    </Link>
                  );
                }

                return (
                  <article
                    key={item.id}
                    className={`${s.card} ${s.cardSoonItem}`}
                    style={{ animationDelay: `${30 + Math.min(index, 12) * 25}ms` }}
                  >
                    {body}
                  </article>
                );
              })}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
