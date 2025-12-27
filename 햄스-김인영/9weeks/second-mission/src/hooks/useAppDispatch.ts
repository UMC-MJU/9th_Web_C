import { useDispatch as useDefaultDispatch, useSelector as useDefaultSelector, type TypedUseSelectorHook } from "react-redux";
import type { AppDispatch, RootState } from "../store/store";

export const useDispatch: () => AppDispatch = useDefaultDispatch; //action 내보내기
export const useSelector: TypedUseSelectorHook<RootState> = useDefaultSelector; //state 어디서든 읽기, store 중 일부 state만 선택한다.