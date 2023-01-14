import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import styles from './modal.module.css';
import clsx from 'clsx';

export const DropdownContainer = React.forwardRef(
  ({ children, className }, ref) => {
    return (
      <div ref={ref} className={clsx(styles.container, className)}>
        {children}
      </div>
    );
  }
); 

export const DropdownTrigger = React.forwardRef(
  ({ children, onClick }, ref) => {
    return (
      <div ref={ref} className={styles.trigger} onClick={onClick}>
        {children}
      </div>
    );
  }
);

function DropdownPanelHeader({ title, ...props }) {
  return <h2 {...props}>{title}</h2>;
}

export const DropdownPanel = React.forwardRef(
  ({ children, components, title, style, onClick }, ref) => {
    const { PanelHeader = DropdownPanelHeader } = components;
    return (
      <div ref={ref} className={styles.panel} style={style} onClick={onClick}>
        <PanelHeader title={title} className={styles.panel_title} />
        <div className={styles.panel_body}>{children}</div>
      </div>
    );
  }
);

const DEFAULT_COMPONENTS = {
  Container: DropdownContainer,
  Trigger: DropdownTrigger,
  Panel: DropdownPanel,
};

export function Modal({ label, title, children, components }) {
  const [isOpened, setOpened] = useState(false);
  const [position, setPosition] = useState({
    top: 0,
    left: 0,
  });
  const { Container, Trigger, Panel, ...otherComponents } = Object.assign(
    {},
    DEFAULT_COMPONENTS,
    components ?? {}
  );
  const containerRef = useRef(null);
  const triggerRef = useRef(null);
  const panelRef = useRef(null);

  useLayoutEffect(() => {
    setPosition({
      top: triggerRef.current.offsetTop + triggerRef.current.offsetHeight,
      left: triggerRef.current.offsetLeft,
    });
  }, [isOpened]);

  return (
    <Container components={otherComponents} ref={containerRef}>
      <Trigger
        components={otherComponents}
        onClick={() => setOpened(!isOpened)}
        ref={triggerRef}
      >
        {children}
      </Trigger>
      {isOpened
        ? createPortal(
            <Panel
              title={title}
              components={otherComponents}
              ref={panelRef}
              onClick={(e) => {
                //console.log(e.target.className.includes('modal_panel'));
                //setOpened(true);
              }}
              style={{
                position: 'absolute',
                top: position.top + 'px',
                left: position.left + 'px',
              }}
            >
              <>
                <h3>{label}</h3>
                <button
                  className={styles.button}
                  onClick={(e) => {
                    console.log(e);
                    setOpened(false);
                  }}
                >
                  Закрыть
                </button>
              </>
            </Panel>,
            document.body
          )
        : null}
    </Container>
  );
}
