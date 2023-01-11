import React, { useReducer } from 'react';

import { Form } from '../form';
import { Layout } from './layout';
import { Dropdown } from '../dropdown/dropdown';
import { Table, Column, CheckBox } from '../table/table';
import { Tabs, Tab } from '../tabs/tabs';
import { EditableList } from '../list/list';
import { DATA } from '../../utils/types';
import { Input } from './examples';
import styles from './app.module.css';

const initialState = {
  items: DATA,
  selected: [],
};

function reducer(state, action) {
  //console.log('dispatch', action);
  const target = action.target;

  switch (action.type) {
    case 'select':
      return { ...state, selected: [...state.selected, target] };
      break;
    case 'unselect':
      return {
        ...state,
        selected: state.selected.filter((id) => id !== target),
      };
      break;
    case 'delete':
      if (target) {
        return {
          ...state,
          items: state.items.filter((item) => `${item.id}` !== target),
        };
      } else {
        return {
          ...state,
          items: state.items.filter(
            (item) => !state.selected.includes(`${item.id}`)
          ),
          selected: [],
        };
      }
      break;
    case 'up':
      const el = state.items.find((el) => `${el.id}` === target);
      const indexEl = state.items.indexOf(el);
      //console.log(indexEl, state.items);
      return {
        ...state,
        items: (() => {
          if (indexEl > 0) {
            const newArr = state.items.filter((item) => item !== el);
            newArr.splice(indexEl - 1, 0, el);
            return newArr;
          }
          return state.items;
        })(),
      };
      break;
    case 'down':
      const el1 = state.items.find((el) => `${el.id}` === target);
      const indexEl1 = state.items.indexOf(el1);
      //console.log(indexEl, state.items);
      return {
        ...state,
        items: (() => {
          const newArr = state.items.filter((item) => item !== el1);
          newArr.splice(indexEl1 + 1, 0, el1);
          return newArr;
        })(),
      };
      break;
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  //console.log(state);
  return (
    <Layout header={<h1>React base examples</h1>}>
      <section>
        <Tabs opened="table">
          <Tab name="table">
            <Table data={state.items}>
              <Column field="choice" header="Выбор">
                <input
                  className={styles.checkbox}
                  type="checkbox"
                  selected={state.selected}
                  onChange={(e) => {
                    return dispatch({
                      type: e.target.checked ? 'select' : 'unselect',
                      target: e.target.id,
                    });
                  }}
                />
              </Column>
              <Column field="name" header="Имя" />
              <Column field="phone" header="Телефон" />
              <Column field="email" header="Email" />
              <Column field="address" header="Address" />
              <Column field="action" header="Действие">
                <button
                  className={styles.button}
                  onClick={(e) =>
                    dispatch({
                      type: 'delete',
                      target: e.target.id,
                    })
                  }
                >
                  Удалить
                </button>

                <button
                  className={styles.button}
                  onClick={(e) => {
                    e.stopPropagation();
                    return dispatch({
                      type: 'up',
                      target: e.target.id,
                    });
                  }}
                >
                  Вверх
                </button>

                <button
                  className={styles.button}
                  onClick={(e) => {
                    e.stopPropagation();
                    return dispatch({
                      type: 'down',
                      target: e.target.id,
                    });
                  }}
                >
                  Вниз
                </button>
              </Column>
            </Table>
            <button
              className={styles.button}
              disabled={state.selected.length === 0}
              onClick={() =>
                dispatch({
                  type: 'delete',
                })
              }
            >
              Удалить выделенные
            </button>
          </Tab>
          <Tab name="editable">
            <EditableList />
          </Tab>
        </Tabs>
      </section>

      <section>
        <Form
          name="test"
          fields={{
            name: { value: '', label: 'Имя' },
            email: { value: '', label: 'Email', type: 'email' },
            address: { value: '', label: 'Адрес' },
          }}
        />
      </section>

      <section>
        <Dropdown label="dropdown panel" title="hidden content">
          HELLO WORLD!
        </Dropdown>
      </section>

      <section style={{ height: 500 }}></section>
    </Layout>
  );
}

export default App;
