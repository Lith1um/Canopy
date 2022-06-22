import { Observable } from 'rxjs';
import { debounceTime, filter, map, pairwise, startWith } from 'rxjs/operators';

export interface ResizeOptions {
  emitOnStart: boolean;
  direction: ResizeDirection;
  debounceTime: number;
}

export const enum ResizeDirection {
  All = 'all',
  Horizontal = 'horizontal',
  Vertical = 'vertical'
}

/**
 * Creates an rxjs observable from a resize observer tied to a specific element
 */
export const fromResize = (element: Element, options?: Partial<ResizeOptions>): Observable<DOMRect> => {
  // build the options
  const resolvedOptions: ResizeOptions = {
    ...options,
    ...{ direction: ResizeDirection.All, emitOnStart: true, debounceTime: 100 }
  };
  const initialRect = element.getBoundingClientRect();

  let resize$ = buildResize(element).pipe(debounceTime(resolvedOptions.debounceTime));

  if (resolvedOptions.direction !== ResizeDirection.All) {
    resize$ = withDirectionFilter(resize$, resolvedOptions.direction, initialRect);
  }

  if (resolvedOptions.emitOnStart) {
    resize$ = resize$.pipe(startWith(initialRect));
  }

  return resize$;
};

const buildResize = (element: Element): Observable<DOMRect> =>
  new Observable(subscriber => {
    const resizeObserver = new ResizeObserver(entries => {
      entries.forEach(entry => {
        if (entry.target === element) {
          subscriber.next(entry.contentRect);
        }
      });
    });

    resizeObserver.observe(element, { box: 'border-box' });

    return () => {
      resizeObserver.unobserve(element);
      resizeObserver.disconnect();
    };
  });

const withDirectionFilter = (
  resize$: Observable<DOMRect>,
  direction: ResizeDirection,
  initialRect: DOMRect
): Observable<DOMRect> => {
  return resize$.pipe(
    pairwise(),
    filter(([previous, current]) => {
      switch (direction) {
        case ResizeDirection.Horizontal:
          return previous.width !== current.width;
        case ResizeDirection.Vertical:
          return previous.height !== current.height;
        case ResizeDirection.All:
        default:
          return true;
      }
    }),
    map(([_, current]) => current)
  );
};
