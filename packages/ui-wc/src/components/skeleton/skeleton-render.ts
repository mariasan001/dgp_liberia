import {
  resolveSkeletonAnimated,
  resolveSkeletonRows,
  resolveSkeletonVariant,
  type SkeletonVariant,
} from './skeleton-constants';

function bone(cls: string): string {
  return `<span class="bone ${cls}" aria-hidden="true"></span>`;
}

function textLines(dense = false): string {
  const sm = dense ? ' sm' : '';
  return `<div class="stack">
  ${bone(`line lg${sm} w-75`)}
  ${bone(`line${sm} w-90`)}
  ${bone(`line${sm} w-60`)}
</div>`;
}

function avatarBlock(dense = false): string {
  const size = dense ? '' : ' lg';
  return `<div class="row">
  ${bone(`circle${size}`)}
  <div class="col">
    ${bone('line lg w-45')}
    ${bone('line w-75')}
    ${bone('line sm w-35')}
  </div>
</div>`;
}

function cardBlock(): string {
  return `<div class="stack">
  ${bone('block')}
  ${bone('line lg w-60')}
  ${bone('line w-90')}
  ${bone('line w-45')}
</div>`;
}

function mediaBlock(): string {
  return `<div class="media">
  ${bone('block sm')}
  <div class="col">
    ${bone('line lg w-75')}
    ${bone('line w-90')}
    ${bone('line w-60')}
    ${bone('line sm w-35')}
  </div>
</div>`;
}

function listBlock(rows: number): string {
  const items = Array.from({ length: rows }, () => {
    return `<div class="list-item">
  ${bone('circle')}
  <div class="col">
    ${bone('line lg w-60')}
    ${bone('line sm w-45')}
  </div>
</div>`;
  }).join('');
  return `<div class="stack">${items}</div>`;
}

function tableBlock(rows: number): string {
  const head = `<div class="table-head">
  ${bone('line sm')}
  ${bone('line sm')}
  ${bone('line sm')}
  ${bone('line sm')}
</div>`;
  const body = Array.from({ length: rows }, () => {
    return `<div class="table-row">
  ${bone('line')}
  ${bone('line')}
  ${bone('line')}
  ${bone('line w-60')}
</div>`;
  }).join('');
  return `<div class="table">${head}${body}</div>`;
}

function kpiBlock(): string {
  return Array.from({ length: 3 }, () => {
    return `<div class="kpi-card">
  ${bone('line sm w-45')}
  ${bone('line lg w-60')}
  ${bone('line sm w-35')}
</div>`;
  }).join('');
}

function formBlock(): string {
  return `<div class="stack">
  <div class="form-field">
    ${bone('form-label')}
    ${bone('form-input')}
  </div>
  <div class="form-field">
    ${bone('form-label')}
    ${bone('form-input')}
  </div>
  <div class="form-field">
    ${bone('form-label')}
    ${bone('form-input')}
  </div>
</div>`;
}

function completeBlock(rows: number): string {
  return `${avatarBlock()}
${bone('block sm')}
${tableBlock(Math.min(rows, 3))}`;
}

export function renderSkeletonMarkup(
  variant: SkeletonVariant,
  rows: number,
): string {
  switch (variant) {
    case 'avatar':
      return avatarBlock();
    case 'card':
      return cardBlock();
    case 'table':
      return tableBlock(rows);
    case 'list':
      return listBlock(rows);
    case 'media':
      return mediaBlock();
    case 'kpi':
      return kpiBlock();
    case 'form':
      return formBlock();
    case 'dense':
      return textLines(true);
    case 'complete':
      return completeBlock(rows);
    case 'text':
    default:
      return textLines(false);
  }
}

export {
  resolveSkeletonAnimated,
  resolveSkeletonRows,
  resolveSkeletonVariant,
};
