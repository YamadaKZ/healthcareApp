import React from "react";
import "./homeResult.scss";

const HomeResult = () => {
    return (
        <div className="results-section">
            <h3>結果</h3>
            <div className="results">1682 Calories/日</div>

            <div className="weight-modification">
                <div className="weight-modification-item">
                    <h4>体重を少し減らすなら…</h4>
                    <p>例: 0.25kg/週</p>
                </div>
                <div className="weight-modification-item">
                    <h4>体重をそこそこ減らすなら…</h4>
                    <p>例: 0.5kg/週</p>
                </div>
                <div className="weight-modification-item">
                    <h4>体重をとても減らすなら…</h4>
                    <p>例: 1kg/週</p>
                </div>
                <div className="weight-modification-item">
                    <h4>体重を少し増やすなら…</h4>
                    <p>例: 0.25kg/週</p>
                </div>
                <div className="weight-modification-item">
                    <h4>体重をそこそこ増やすなら…</h4>
                    <p>例: 0.5kg/週</p>
                </div>
                <div className="weight-modification-item">
                    <h4>体重をとても増やすなら…</h4>
                    <p>例: 1kg/週</p>
                </div>
            </div>
        </div>
    );
};

export default HomeResult;
