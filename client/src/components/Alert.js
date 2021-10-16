import { useSelector } from "react-redux";

const Alert = () => {
  const alerts = useSelector((state) => state.alert);

  const render = alerts.map((alert) => <div key={alert.id}>{alert.msg}</div>);

  return render;
};

export default Alert;
