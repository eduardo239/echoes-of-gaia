import { ENEMY, HERO, ITEM } from "../constants";

const CardTable = ({ modalType, item }) => {
  return (
    <div className="app-card-body">
      <table>
        <thead>
          <tr>
            <th colSpan={2}>{item.name}</th>
          </tr>
        </thead>
        <tbody>
          {(modalType === HERO || modalType === ENEMY) && (
            <>
              <tr>
                <td>Health</td>
                <td>{item.hp}</td>
              </tr>
              {modalType === HERO && (
                <tr>
                  <td>Mana</td>
                  <td>{item.mp}</td>
                </tr>
              )}
              <tr>
                <td>Level</td>
                <td>{item.level}</td>
              </tr>
            </>
          )}
          <tr>
            <td>Strength</td>
            <td>{item.strength}</td>
          </tr>
          <tr>
            <td>Intelligence</td>
            <td>{item.intelligence}</td>
          </tr>
          <tr>
            <td>Class</td>
            <td>{item.class}</td>
          </tr>
          <tr>
            <td>Is Alive?</td>
            <td>{item.live ? "Yes" : "No"}</td>
          </tr>
          {modalType === ITEM && (
            <>
              <tr>
                <td>Value</td>
                <td>{item.value}</td>
              </tr>
              <tr>
                <td>Price</td>
                <td>{item.price}</td>
              </tr>
            </>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CardTable;
