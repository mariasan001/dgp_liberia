'use client';

import type { NotificationCenterExample } from './notification-center-data';
import local from './notification-center.module.css';

export function NotificationCenterDemo({
  example,
}: {
  example: NotificationCenterExample;
}) {
  return (
    <div className={local.stageInner}>
      <gob-notification-center
        key={example.id}
        className={local.tabs}
        variant={example.variant}
        title={example.centerTitle}
        items={example.items}
      />
    </div>
  );
}
