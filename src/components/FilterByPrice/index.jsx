import { useState } from "react";
import ReactSlider from "react-slider";

const FilterByPrice = () => {
  const min = 0;
  const max = 30;

  const [value, setValue] = useState([min, max]);

  return (
    <>
      <div className="price_slider_amount">
        <span>Selection:</span>
        <span>{value[0]}</span>
        <span>-</span>
        <span>{value[1]}</span>
      </div>

      <ReactSlider
        value={value}
        onChange={setValue}
        className="horizontal-slider"
        thumbClassName="filter-by-price-thumb"
        trackClassName="filter-by-price-track"
        renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
      />
    </>
  );
};

export default FilterByPrice;
