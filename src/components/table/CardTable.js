import {
  ENEMY,
  GIFT,
  HERO,
  ITEM,
  PLAYER,
  SELECT_HERO,
  SELECT_MAP,
} from "../../constants";

const CardTable = ({ modalType, item }) => {
  return (
    <div className="app-card-body">
      <table>
        <thead>
          <tr>
            <th colSpan={2}>{item.name ? item.name : ""}</th>
          </tr>
        </thead>
        <tbody className="app-card-table">
          {(modalType === HERO || modalType === SELECT_HERO) && (
            <>
              <tr>
                <td>Health</td>
                <td>
                  {item.status.hp} / {item.status.maxHp}
                </td>
              </tr>

              <tr>
                <td>Mana</td>
                <td>
                  {item.status.mp} / {item.status.maxMp}
                </td>
              </tr>

              <tr>
                <td>Strength</td>
                <td>{item.status.strength}</td>
              </tr>
              <tr>
                <td>Intelligence</td>
                <td>{item.status.intelligence}</td>
              </tr>
              <tr>
                <td>Class</td>
                <td>{item.class}</td>
              </tr>
            </>
          )}

          {modalType === ENEMY && (
            <>
              <tr>
                <td>Health</td>
                <td>{item.status.hp}</td>
              </tr>
              <tr>
                <td>Max Health</td>
                <td>{item.status.maxHp}</td>
              </tr>
              <tr>
                <td>Strength</td>
                <td>{item.status.strength}</td>
              </tr>
              <tr>
                <td>Intelligence</td>
                <td>{item.status.intelligence}</td>
              </tr>
              <tr>
                <td>Class</td>
                <td>{item.class}</td>
              </tr>
              <tr>
                <td>Is Alive?</td>
                <td>{item?.status?.isAlive ? "Yes" : "No"}</td>
              </tr>
            </>
          )}

          {(modalType === ITEM || modalType === GIFT) && (
            <>
              <tr>
                <td>Value</td>
                <td>{item.value}</td>
              </tr>
              <tr>
                <td>Price</td>
                <td>{item.price}</td>
              </tr>
              <tr>
                <td>Class</td>
                <td>{item.class}</td>
              </tr>
            </>
          )}

          {modalType === SELECT_MAP && (
            <>
              <tr>
                <td>Length</td>
                <td>{item.length}</td>
              </tr>
              <tr>
                <td>Difficulty</td>
                <td>{item.difficulty}</td>
              </tr>
            </>
          )}

          {modalType === PLAYER && (
            <>
              <tr>
                <td>Name</td>
                <td>{item.name}</td>
              </tr>
              <tr>
                <td>Name</td>
                <td>{item.name}</td>
              </tr>
              <tr>
                <td>Name</td>
                <td>{item.name}</td>
              </tr>
              <tr>
                <td>Name</td>
                <td>{item.name}</td>
              </tr>
            </>
          )}

          {/* <tr>
            <td>ID</td>
            <td>
              <small>{item.id}</small>
            </td>
          </tr> */}
        </tbody>
      </table>
    </div>
  );
};

export default CardTable;
