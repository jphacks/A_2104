import './Popup.css';

const Popup = ({ selectW, selectC, inVisible }) => {
  return (
    <div className="popup">
      <span className="box-title">移動手段の選択</span>
      <button
        className="btn-t"
        onClick={() => {
          selectW();
          inVisible();
        }}
      >
        徒歩
      </button>
      <button
        className="btn-t"
        onClick={() => {
          selectC();
          inVisible();
        }}
      >
        自家用車
      </button>
    </div>
  );
};

export default Popup;