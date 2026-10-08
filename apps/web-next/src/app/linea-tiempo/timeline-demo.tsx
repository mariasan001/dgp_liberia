'use client';

import { useMemo, useState } from 'react';
import {
  CheckCircle,
  FileText,
  Stamp,
  Tray,
  User,
  Warning,
} from '@phosphor-icons/react';

import {
  eventsFor,
  type TimelineEvent,
  type TimelineExample,
} from './timeline-data';
import local from './timeline.module.css';

const ICONS = {
  Tray,
  User,
  CheckCircle,
  Warning,
  FileText,
  Stamp,
} as const;

export function TimelineDemo({ example }: { example: TimelineExample }) {
  const variant = example.variant;
  const events = useMemo(() => eventsFor(variant), [variant]);
  const [active, setActive] = useState<string>(events[1]?.id ?? events[0]?.id ?? '');

  const showIcon = variant === 'icons' || variant === 'complete';
  const showNumber = variant === 'numbered';
  const showDate = variant === 'dates';
  const showStatus =
    variant === 'status' ||
    variant === 'complete' ||
    variant === 'cards' ||
    variant === 'icons';
  const showGrouped = variant === 'grouped';

  const blocks = useMemo(() => {
    if (!showGrouped) {
      return events.map((ev, index) => ({ type: 'item' as const, ev, index }));
    }
    const out: Array<
      | { type: 'group'; label: string }
      | { type: 'item'; ev: TimelineEvent; index: number }
    > = [];
    let last = '';
    events.forEach((ev, index) => {
      if (ev.group && ev.group !== last) {
        out.push({ type: 'group', label: ev.group });
        last = ev.group;
      }
      out.push({ type: 'item', ev, index });
    });
    return out;
  }, [events, showGrouped]);

  return (
    <div
      className={`${local.stageInner} ${variant === 'horizontal' ? local.stageWide : ''}`}
    >
      <gob-timeline
        key={example.id}
        variant={variant}
        tone="primary"
        className={local.timeline}
      >
        {blocks.map((block) => {
          if (block.type === 'group') {
            return (
              <div key={`g-${block.label}`} className="gob-tl-group">
                {block.label}
              </div>
            );
          }

          const { ev, index } = block;
          const Icon = ICONS[ev.icon];
          const isActive = active === ev.id;

          return (
            <div
              key={ev.id}
              className={`gob-tl-item ${local.clickable}`}
              role="listitem"
              tabIndex={0}
              data-active={isActive ? 'true' : undefined}
              onClick={() => setActive(ev.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setActive(ev.id);
                }
              }}
            >
              <div className="gob-tl-rail">
                {showIcon ? (
                  <span className="gob-tl-icon">
                    <Icon weight="thin" size={16} aria-hidden="true" />
                  </span>
                ) : showNumber ? (
                  <span className="gob-tl-num">{index + 1}</span>
                ) : (
                  <span className="gob-tl-dot" />
                )}
              </div>
              <div className="gob-tl-body">
                <div className="gob-tl-head">
                  {showDate ? (
                    <div className="gob-tl-when">
                      <p className="gob-tl-date">{ev.date}</p>
                      <p className="gob-tl-time">{ev.time}</p>
                    </div>
                  ) : (
                    <p className="gob-tl-time">{ev.time}</p>
                  )}
                  {showStatus ? (
                    <span className="gob-tl-pill" data-status={ev.statusKey}>
                      {ev.status}
                    </span>
                  ) : null}
                </div>
                <p className="gob-tl-title">{ev.title}</p>
                <p className="gob-tl-desc">{ev.desc}</p>
              </div>
            </div>
          );
        })}
      </gob-timeline>
      {active ? (
        <p className={local.flash}>
          Evento: {events.find((e) => e.id === active)?.title}
        </p>
      ) : null}
    </div>
  );
}
