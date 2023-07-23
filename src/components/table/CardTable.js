import {
  ENEMY,
  GIFT,
  HERO,
  ITEM,
  MAGIC,
  PLAYER,
  SELECT_HERO,
  SELECT_MAP,
  WINNER,
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
                  <span
                    className={`${
                      item.status.hp < item.status.maxHp * 0.2
                        ? "hero-hp-danger"
                        : ""
                    }`}
                  >
                    {item.status.hp} / {item.status.maxHp}
                  </span>
                </td>
              </tr>

              <tr>
                <td>Mana</td>
                <td>
                  <span
                    className={`${
                      item.status.mp < item.status.maxMp * 0.2
                        ? "hero-mp-danger"
                        : ""
                    }`}
                  >
                    {item.status.mp} / {item.status.maxMp}
                  </span>
                </td>
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
                <td>Class</td>
                <td>{item.class}</td>
              </tr>
            </>
          )}

          {modalType === ITEM && (
            <>
              <tr>
                <td>Value</td>
                <td>{item.value}</td>
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
            </>
          )}

          {modalType === MAGIC && (
            <>
              <tr>
                <td>Value</td>
                <td>{item.value}</td>
              </tr>
              <tr>
                <td>Mana</td>
                <td>{item.mp}</td>
              </tr>
              <tr>
                <td>Type</td>
                <td>{item.type}</td>
              </tr>
            </>
          )}

          {modalType === WINNER && (
            <>
              <tr>
                <td>Type</td>
                <td>{item.type}</td>
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
