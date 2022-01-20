import "./style/Nav.css";
import home from "../../img/home (3).png";
import home1 from "../../img/home (2).png";
import plus1 from "../../img/plus.png";
import plus from "../../img/plus (1).png";
import stats from "../../img/statistics.png";
import stats1 from "../../img/statistics (1).png";
function Nav({ window, setWindow }) {
  return (
    <div className="Nav">
      <div className="button" onClick={() => setWindow(0)}>
        <img src={window == 0 ? home : home1} alt="home" />
        Dashboard
      </div>
      <div className="button" onClick={() => setWindow(1)}>
        <img src={window == 1 ? plus : plus1} alt="Add" />
      </div>
      <div className="button" onClick={() => setWindow(2)}>
        <img src={window == 2 ? stats : stats1} alt="home" />
        Statistics
      </div>
    </div>
  );
}

export default Nav;
