'use client';

import type { ContainerExample } from './container-data';
import local from './container.module.css';

export function ContainerDemo({
  example,
  radius,
  shadow,
}: {
  example: ContainerExample;
  radius: boolean;
  shadow: boolean;
}) {
  return (
    <div className={local.stage}>
      <div className={local.stageRail}>
        <span>Viewport demo</span>
        <span>{example.widthLabel}</span>
      </div>
      <div className={local.stageInner}>
        <gob-container
          key={`${example.id}-r${radius ? 1 : 0}-s${shadow ? 1 : 0}`}
          variant={example.variant}
          radius={radius ? 'true' : 'false'}
          shadow={shadow ? 'true' : 'false'}
        >
          {example.variant === 'prose' ? (
            <>
              <h2 className={local.proseTitle}>Lineamientos de operacion</h2>
              <p className={local.proseBody}>
                El contenedor limita el ancho de lectura para que el texto se mantenga
                comodo en pantallas amplias sin romper la jerarquia de la pagina.
              </p>
            </>
          ) : (
            <div className={local.block}>
              <strong>{example.title}</strong>
              <span>{example.widthLabel}</span>
              <p>{example.description}</p>
            </div>
          )}
        </gob-container>
      </div>
    </div>
  );
}
