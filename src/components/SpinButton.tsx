import React, { useState, MouseEvent } from 'react';
import './SpinButton.css';

enum StatusType {
  INCREASE = '추가',
  DECREASE = '감소',
}

interface SpinButtonProps {
  label: string;
  minimum: number;
}

const SpinButton: React.FC<SpinButtonProps> = (props: SpinButtonProps) => {
  const { label, minimum } = props;

  const [count, setCount] = useState<number>(minimum);
  const [isTooltipVisible, setIsTooltipVisible] = useState<boolean>(false);
  const [status, setStatus] = useState<StatusType | null>(null);

  const onDecrease = () => {
    if (count <= minimum) return;

    setCount((prev) => prev - 1);
    setStatus(StatusType.DECREASE);
  };

  const onIncrease = () => {
    if (count >= 3) return;

    setCount((prev) => prev + 1);
    setStatus(StatusType.INCREASE);
  };

  const onChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(target.value);

    if (value < minimum || value > 3 || count === value) return;

    setCount(value);
    setStatus(value > count ? StatusType.INCREASE : StatusType.DECREASE);
  };

  const toggleTooltip = (event: MouseEvent<HTMLDivElement>) => {
    setIsTooltipVisible(!isTooltipVisible);
  };

  return (
    <section className="spinButtonContainer">
      <div>
        <div className="spinButtonLabel">
          <label>{label}</label>
          <div
            className="helpIcon"
            onMouseEnter={toggleTooltip}
            onMouseLeave={toggleTooltip}
          >
            ?
            {isTooltipVisible && (
              <span className="tooltip">최대 인원수는 3명까지 가능합니다</span>
            )}
          </div>
        </div>
        <button
          onClick={onDecrease}
          className="spinButton"
          aria-label="성인 탑승자 한명 줄이기"
          disabled={count === minimum}
          aria-disabled={count === minimum}
        >
          -
        </button>
        <input
          type="text"
          role="spinbutton"
          readOnly
          className="spinButtonInput"
          aria-valuemin={0}
          aria-valuemax={3}
          aria-valuenow={count}
          onChange={onChange}
          value={count}
        />
        <span
          role="alert"
          aria-live="assertive"
          style={{
            width: 1,
            height: 1,
            position: 'fixed',
            top: -100,
            overflow: 'hidden',
          }}
        >
          성인 승객 {status} {count}
        </span>

        <button
          onClick={onIncrease}
          className="spinButton"
          aria-label="성인 탑승자 한명 늘리기"
          disabled={count === 3}
          aria-disabled={count === 3}
        >
          +
        </button>
      </div>
    </section>
  );
};

export default SpinButton;
