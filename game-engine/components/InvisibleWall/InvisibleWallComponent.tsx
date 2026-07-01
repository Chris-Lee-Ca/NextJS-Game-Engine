"use client";

import MemoHelper from "../../helper/MemoHelper";

const InvisibleWallComponent = () => {
    return <div />;
};

export default MemoHelper.withValueEquality(InvisibleWallComponent);
