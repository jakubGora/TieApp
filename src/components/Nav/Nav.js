import "./style/Nav.css";
import home from "../../img/home (3).png";
import home1 from "../../img/home (2).png";
import plus1 from "../../img/plus.png";
import plus from "../../img/plus (1).png";
import stats from "../../img/statistics.png";
import stats1 from "../../img/statistics (1).png";
import history from "../../img/history (2).png";
import history1 from "../../img/history (2) — kopia.png";
import user1 from "../../img/user(1).png";
import user from "../../img/user.png";
function Nav({ window, setWindow }) {
  return (
    <div className="Nav">
      <div className="button" onClick={() => setWindow(0)}>
        <img src={window == 0 ? home : home1} alt="home" />
        Dashboard
      </div>

      <div className="button" onClick={() => setWindow(1)}>
        <img src={window == 1 ? stats : stats1} alt="home" />
        Statistics
      </div>
      <div className="button" onClick={() => setWindow(2)}>
        <img src={window == 2 ? plus : plus1} alt="Add" />
      </div>
      <div className="button" onClick={() => setWindow(3)}>
        <img src={window == 3 ? history1 : history} alt="home" />
        Family
      </div>
      <div className="button" onClick={() => setWindow(4)}>
        <img src={window == 4 ? user1 : user} alt="home" />
        User
      </div>
    </div>
  );
}

export default Nav;
