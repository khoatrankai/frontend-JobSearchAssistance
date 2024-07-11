"use client";
import React, { useEffect as useIsomorphicLayoutEffect } from "react";
import { Provider } from "react-redux";

import { store } from "@/redux/store";
import HistoryPost from "@/components/HistoryComponent/History/history";
import CheckPageLogin from "@/util/CheckPageLogin";

type Props = {};

const Page = (props: Props) => {
  CheckPageLogin();
  useIsomorphicLayoutEffect(() => {}, []);

  return (
    <Provider store={store}>
      <HistoryPost />
    </Provider>
  );
};

export default Page;
