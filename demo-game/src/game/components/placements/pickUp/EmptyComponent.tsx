"use client";

import React from "react";
import MemoHelper from "game-engine/helper/MemoHelper";

const EmptyComponent = () => {
    return <div />;
};

export default MemoHelper.withValueEquality(EmptyComponent);
